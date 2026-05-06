"use client"

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import "@/styles/manageProperty.scss"
import {uploadFile} from "@/.service/uploadsService";
import {getSessionUserId, getSessionUserRole} from "@/.service/sessionService";
import {addProperty} from "@/.service/propertiesService";
import {useRouter} from "next/navigation";
import sanitize from "@/lib/sanitize";
import validateFile from "@/app/gerer-propriete/_lib/validateFile";

/**
 * Page de création d'une nouvelle propriété immobilière.
 *
 * Formulaire complet permettant à un hôte connecté de publier un bien.
 * Gère les champs texte, les équipements (cases à cocher), les catégories
 * (avec possibilité d'en ajouter une personnalisée), ainsi que l'upload
 * de l'image de couverture et des photos du logement.
 *
 * À la soumission, les images sont uploadées sur le serveur, puis la propriété
 * est créée via l'API. En cas de succès, l'utilisateur est redirigé vers l'accueil.
 *
 * @returns {JSX.Element} Le formulaire de création de propriété.
 */

export default function ManageProperty(){
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [equipments, setEquipments] = useState<string[]>([]);
    const [cover, setCover] = useState<File | null>(null);
    const [pictures, setPictures] = useState<File[]>([]);
    const [categoriesList, setCategoriesList] = useState<string[]>([
        "Culture",
        "Famille",
        "Forêt",
        "Nature",
        "Night life",
        "Parc",
        "Pour les couples",
        "Touristique",
        "Vue sur mer",
    ]);
    const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
    const [categoryCustom, setCategoryCustom] = useState<string>("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const equipmentsList = [
        "Baie vitrée", "Baignoire", "Bouilloire", "Chambre séparée",
        "Cintres", "Clic-clac", "Climatisation", "Cuisine équipée",
        "Douche italienne", "Four", "Frigo", "Frigo américain",
        "Hotte", "Lit", "Machine à laver", "Micro-ondes",
        "Parking", "Rangements", "SDB", "Sèche cheveux",
        "Télévision", "Toilette sèches", "Vue parc", "WIFI"
    ]

    const router = useRouter();

    /**
     * Vérifie le rôle de l'utilisateur connecté au montage du composant.
     * Redirige vers l'accueil si le rôle est "client" ou si l'utilisateur n'est pas connecté.
     */
    useEffect(() => {
        const checkRole = async () => {
            const role = await getSessionUserRole();
            if (role !== "owner" && role !== "admin") {
                router.push("/");
            }
        };

        checkRole();
    }, []);

    /**
     * Coche ou décoche un équipement dans la liste des équipements sélectionnés.
     *
     * @param {string} equipment - Le nom de l'équipement à ajouter ou retirer.
     */

    const handleEquipments = (equipment: string) => {
        setEquipments(prev =>
            prev.includes(equipment)
                ? prev.filter(e => e !== equipment)
                : [...prev, equipment]
        );
    };

    /**
     * Sélectionne ou désélectionne une catégorie dans la liste des catégories choisies.
     *
     * @param {string} cat - Le nom de la catégorie à ajouter ou retirer.
     */

    const handleCategories = (cat: string) => {
        setCategoriesSelected(prev =>
            prev.includes(cat)
                ? prev.filter(c => c !== cat)
                : [...prev, cat]
        );
    };

    /**
     * Ajoute une catégorie personnalisée saisie par l'utilisateur.
     *
     * Si la catégorie n'existe pas encore dans la liste, elle y est ajoutée.
     * Elle est ensuite automatiquement sélectionnée.
     * Ne fait rien si le champ est vide.
     */

    const addCustomCategory = () => {
        if (!categoryCustom.trim()) return;

        if (categoryCustom && !categoriesList.includes(categoryCustom)) {
            setCategoriesList([...categoriesList, categoryCustom]);
        }

        setCategoriesSelected([...categoriesSelected, categoryCustom]);
    }

    /**
     * Valide tous les champs du formulaire avant soumission.
     *
     * Vérifie que les champs obligatoires sont remplis et que les fichiers
     * et sélections requis sont présents. Met à jour l'état des erreurs.
     *
     * @returns {boolean} true si le formulaire est valide, false sinon.
     */

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!title.trim()) newErrors.title = "Le titre est requis";
        if (!description.trim()) newErrors.description = "La description est requise";
        if (!location.trim()) newErrors.location = "La localisation est requise";
        if (!price || price <= 0) newErrors.price = "Le prix est invalide";
        if (equipments.length === 0) newErrors.equipments = "Ajoutez au moins un équipement";
        if (categoriesSelected.length === 0) newErrors.categories = "Ajoutez au moins une catégorie";
        if (!cover) newErrors.cover = "Image de couverture requise";
        if (pictures.length === 0) newErrors.pictures = "Ajoutez au moins une image";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    /**
     * Gère la soumission du formulaire de création de propriété.
     *
     * Étapes :
     * 1. Validation des champs du formulaire
     * 2. Upload de l'image de couverture
     * 3. Upload en parallèle de toutes les photos du logement
     * 4. Récupération de l'identifiant de l'hôte connecté
     * 5. Création de la propriété via l'API
     * 6. Redirection vers l'accueil en cas de succès
     *
     * @returns {Promise<void>}
     */

    const handleSubmit = async () => {
        console.log(categoriesSelected);
        if (!validate()) return;

        try{
            const coverUrl: string = cover ? await uploadFile(cover) : "";

            const picturesUrls: string[] = await Promise.all(
                pictures.map(pic => uploadFile(pic))
            );

            const hostId = await getSessionUserId();

            const body = {
                title: title,
                description: description,
                cover: coverUrl,
                location: location,
                price_per_night: price,
                host_id: hostId,
                pictures: picturesUrls,
                equipments: equipments,
                tags: categoriesSelected,
            };

            await addProperty(body);
            router.push('/');

        } catch (err){
            console.error(err);
        }
    }

    return (
        <main className="manageProperty">
            <Link href="/">
                <button className="goBackBtn">
                    <Image
                        src="/icons/left-arrow.svg"
                        alt="Icon flèche retour"
                        width={15}
                        height={15}
                    />
                    Retour aux annonces
                </button>
            </Link>
            <section className="managePropertyHeader">
                <h1>Ajouter une propriété</h1>
                <button onClick={handleSubmit}>Ajouter</button>
            </section>
            <section className="userInputs">
                <article className="category mainInfos">
                    <span className="input">
                        <label htmlFor="title">Titre de la propriété</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Ex : Appartement cosy au coeur de Paris"
                            value={title}
                            onChange={e => setTitle(sanitize(e.target.value))}
                        />
                        {errors.title && <p className="error">{errors.title}</p>}
                    </span>
                    <span className="input">
                        <label htmlFor="description">Description</label>
                        <textarea
                            rows={6}
                            id="description"
                            name="description"
                            placeholder="Décrivez votre propriété en détail..."
                            value={description}
                            onChange={e => setDescription(sanitize(e.target.value))}
                        />
                        {errors.description && <p className="error">{errors.description}</p>}
                    </span>
                    <span className="input">
                        <label htmlFor="localisation">Localisation</label>
                        <input
                            type="text"
                            id="localisation"
                            name="localisation"
                            value={location}
                            onChange={e => setLocation(sanitize(e.target.value))}
                        />
                        {errors.location && <p className="error">{errors.location}</p>}
                    </span>
                    <span className="input">
                        <label htmlFor="price">Prix par nuit</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={e => setPrice(parseInt(e.target.value))}
                        />
                        {errors.price && <p className="error">{errors.price}</p>}
                    </span>
                </article>
                <article className="category equipments">
                    <h2>Équipements</h2>
                    <div className="equipmentsGrid">
                        {equipmentsList.map(equipment => (
                            <span key={equipment} className="checkbox">
                                <input
                                    type="checkbox"
                                    id={equipment}
                                    name={equipment}
                                    checked={equipments.includes(equipment)}
                                    onChange={() => handleEquipments(equipment)}
                                />
                                <label htmlFor={equipment}>{equipment}</label>
                            </span>
                        ))}
                    </div>
                    {errors.equipments && <p className="error">{errors.equipments}</p>}
                </article>
                <article className="category files">
                    <div className="input">
                        <h2>Image de couverture</h2>
                        <span className="file">
                            <input
                                type="file"
                                id="cover"
                                accept=".jpg,.jpeg,.png"
                                onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const err = validateFile(file);
                                    if (err) { setErrors(prev => ({ ...prev, cover: err })); return; }
                                    setCover(file);
                                }}
                            />
                            <label htmlFor="cover" className="file-button">+</label>
                        </span>
                        {errors.cover && <p className="error">{errors.cover}</p>}
                    </div>
                    <div className="input">
                        <h2>Images de logement</h2>
                        <span className="file">
                            <input
                                type="file"
                                id="pictures"
                                multiple
                                accept=".jpg,.jpeg,.png"
                                onChange={e => {
                                    const files = Array.from(e.target.files ?? []);
                                    for (const file of files) {
                                        const err = validateFile(file);
                                        if (err) { setErrors(prev => ({ ...prev, pictures: err })); return; }
                                    }
                                    setPictures(files);
                                }}
                            />
                            <label htmlFor="pictures" className="file-button">+</label>
                        </span>
                        {errors.pictures && <p className="error">{errors.pictures}</p>}
                    </div>
                </article>
                <article className="category categories">
                    <h2>Catégories</h2>
                    <div className="categoriesFlex">
                        {categoriesList.map(cat => (
                            <span
                                key={cat}
                                className={categoriesSelected.includes(cat) ? "singleCategory active" : "singleCategory"}
                                onClick={() => {handleCategories(cat)}}
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                    <div className="input">
                        <h2>Ajouter une catégorie personnalisée</h2>
                        <span className="file">
                            <input
                                type="text"
                                id="tag"
                                name="tag"
                                placeholder="Nouveau tag"
                                value={categoryCustom}
                                onChange={e => {setCategoryCustom(sanitize(e.target.value))}}
                            />
                            <label
                                htmlFor="tag"
                                className="file-button"
                                onClick={() => addCustomCategory()}
                            >
                                +
                            </label>
                        </span>
                        {errors.categories && <p className="error">{errors.categories}</p>}
                    </div>
                </article>
            </section>
        </main>
    )
}