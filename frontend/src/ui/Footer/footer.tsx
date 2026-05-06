import Image from "next/image";
import "@/styles/footer.scss"

export default function Footer() {
    return (
        <footer>
            <Image
                src="/logo/logo-tiny.svg"
                alt="Petit logo de Kasa"
                width={50}
                height={50}
                priority
            />
            <p>© 2025 Kasa. All rights reserved</p>
        </footer>
    )
}