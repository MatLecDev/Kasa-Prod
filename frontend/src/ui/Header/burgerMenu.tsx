'use client'

import Image from "next/image";
import {useState} from "react";
import Link from "next/link";

export default function BurgerMenu() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button onClick={() => {setIsOpen(!isOpen)}}>
                <Image
                    src="/icons/menu.svg"
                    alt="icon Kasa"
                    width={50}
                    height={50}
                />
            </button>
            {isOpen && (
                <nav className="burger-nav">
                    <Link href="/" onClick={() => setIsOpen(!isOpen)}>
                        Accueil
                    </Link>
                    <Link href="/a-propos" onClick={() => setIsOpen(!isOpen)}>
                        A propos
                    </Link>
                    <Link href="/messagerie" onClick={() => setIsOpen(!isOpen)}>
                        Messagerie
                    </Link>
                    <Link href="/favoris" onClick={() => setIsOpen(!isOpen)}>
                        Favoris
                    </Link>
                    <Link href="/gerer-propriete" onClick={() => setIsOpen(!isOpen)}>
                        <button>Ajouter un logement</button>
                    </Link>
                </nav>
            )}
        </>
    )
}