import Link from "next/link";
import Image from "next/image";
import '@/styles/header.scss'
import BurgerMenu from "@/ui/Header/burgerMenu";

export default function Header(){
    return (
        <header>
            <div className="wide-screen">
                <nav>
                    <Link href="/">
                        Accueil
                    </Link>
                    <Link href="/a-propos">
                        A propos
                    </Link>
                    <Image
                        src="/logo/logo-full.svg"
                        alt="icon Kasa"
                        width={100}
                        height={100}
                        priority
                    />
                    <Link href="/gerer-propriete" style={{color: '#99331A'}}>
                        +Ajouter un logement
                    </Link>
                    <Link href="/favoris">
                        <Image
                            src="/icons/favorite-outline-red.svg"
                            alt="add favorite icon"
                            width={25}
                            height={25}
                        />
                    </Link>
                    <Link href="/messagerie">
                        <Image
                            src="/icons/message-red.svg"
                            alt="message icon"
                            width={20}
                            height={20}
                        />
                    </Link>
                </nav>
            </div>
            <div className="narrow-screen">
                <Image
                    src="/logo/logo-tiny.svg"
                    alt="icon Kasa"
                    width={50}
                    height={50}
                    priority
                />
                <BurgerMenu />
            </div>
        </header>
    )
}