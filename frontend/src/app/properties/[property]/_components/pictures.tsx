"use client"

import Image from "next/image";
import {useState, useEffect} from "react";
import "@/styles/modale.scss"

/** @typedef {"left" | "right"} Direction - Direction de navigation dans la modale. */

type Direction = "left" | "right";

/**
 * Galerie de photos d'une propriété avec modale de visualisation plein écran.
 *
 * Affiche jusqu'à 5 photos en grille. Au clic sur une image, une modale s'ouvre
 * et permet de naviguer entre toutes les photos via des boutons ou les touches
 * fléchées du clavier. La touche Échap ferme la modale.
 *
 * @param {string[]} propertyPictures - La liste complète des URLs des photos de la propriété.
 * @returns {JSX.Element} La galerie de photos et la modale associée.
 *
 * @example
 * <Pictures propertyPictures={["https://example.com/img1.jpg", "https://example.com/img2.jpg"]} />
 */

export default function Pictures({propertyPictures}: {propertyPictures: string[]}) {
    const [isModaleOpen, setIsModaleOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [direction, setDirection] = useState<Direction>("right");
    const [animating, setAnimating] = useState(false);

    const fivePictures = propertyPictures.slice(0,5);

    /**
     * Ouvre ou ferme la modale et positionne l'index sur l'image choisie.
     *
     * @param {number} index - L'index de l'image à afficher à l'ouverture.
     * @param {boolean} bool - true pour ouvrir la modale, false pour la fermer.
     */

    const handleModale = (index: number, bool: boolean) => {
        setIsModaleOpen(bool);
        setImageIndex(index);
    }

    /**
     * Navigue vers l'image précédente ou suivante dans la modale, avec une animation de transition.
     * La navigation est cyclique : après la dernière image, on revient à la première.
     * Si une animation est déjà en cours, l'appel est ignoré.
     *
     * @param {Direction} dir - La direction de navigation ("left" ou "right").
     */

    const navigate = (dir: Direction) => {
        if (animating) return;
        setDirection(dir);
        setAnimating(true);

        setTimeout(() => {
            setImageIndex((prev) => {
                if (dir === "left") return prev === 0 ? propertyPictures.length - 1 : prev - 1;
                return prev === propertyPictures.length - 1 ? 0 : prev + 1;
            });
            setAnimating(false);
        }, 300);
    };

    /**
     * Ajoute un écouteur clavier lorsque la modale est ouverte.
     * - Flèche gauche / droite : navigation entre les images
     * - Échap : fermeture de la modale
     *
     * L'écouteur est automatiquement retiré à la fermeture de la modale.
     */

    useEffect(() => {
        if (!isModaleOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft"  && propertyPictures.length > 1) navigate("left");
            if (e.key === "ArrowRight" && propertyPictures.length > 1) navigate("right");
            if (e.key === "Escape")     handleModale(0, false);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModaleOpen, imageIndex]);

    return (
         <>
             <article className="propertyPictures">
                 <Image
                     src={fivePictures[0]}
                     alt="Image principale du logement"
                     width={1028}
                     height={1028}
                     className="cover"
                     onClick={() => {handleModale(0, true)}}
                     priority
                     sizes="(max-width: 768px) 50vw, 50vw"
                     quality={60}
                 />
                 <div className="pictures">
                     {fivePictures.map((picture: string, index: number) => (
                         index !== 0 && (
                             <Image
                                 key={index}
                                 src={picture}
                                 alt={"Image secondaire n°" + index + " du logement "}
                                 width={1028}
                                 height={1028}
                                 className="cover"
                                 onClick={() => {handleModale(index, true)}}
                                 priority
                                 sizes="(max-width: 768px) 50vw, 50vw"
                                 quality={60}
                             />
                         )
                     ))}
                 </div>
             </article>
             {isModaleOpen && (
                 <dialog
                     className="modaleBackground"
                     open={isModaleOpen}
                     onClick={(e) => { if (e.target === e.currentTarget) handleModale(0, false); }}
                 >
                     <div className="modale">
                         <button onClick={() => {handleModale(0, false)}} className="closeBtn">
                             <Image
                                 src="/icons/close.svg"
                                 alt="Icone fermer la modale"
                                 width={50}
                                 height={50}
                             />
                         </button>
                         {propertyPictures.length > 1 && (
                             <button className="indexBtn" onClick={() => navigate("left")}>
                                 <Image
                                     src="/icons/chevron-left.svg"
                                     alt="Icone afficher l'image suivante"
                                     width={50}
                                     height={50}
                                 />
                             </button>
                         )}
                         <div className="imageWrapper">
                             <div className={`slideWrapper ${animating ? `slide-out-${direction}` : "slide-in"}`}>
                                 <Image
                                     src={propertyPictures[imageIndex]}
                                     alt="Image du logement"
                                     width={1920}
                                     height={1080}
                                     priority
                                     sizes="(max-width: 768px) 50vw, 50vw"
                                     quality={60}
                                 />
                             </div>
                         </div>
                         {propertyPictures.length > 1 && (
                             <button className="indexBtn" onClick={() => navigate("right")}>
                                 <Image
                                     src="/icons/chevron-right.svg"
                                     alt="Icone afficher l'image suivante"
                                     width={50}
                                     height={50}
                                 />
                             </button>
                         )}
                     </div>
                 </dialog>
             )}
         </>
    )
}