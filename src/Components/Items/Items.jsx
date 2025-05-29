import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";

import styles from "./Items.module.css";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap'
});

export default function Items({ nombre, costo, incremento, descripcion, direccion, id }){
    return(
        <Link href={`/anillos/${id}`} className={styles.card}>
            <header>
                <div className={styles.imagen}>
                    <Image src={direccion} alt={nombre} fill></Image>
                </div>
                <div>
                    <h2 className={styles.titulo}>{nombre}</h2>
                    <p className={dmSans.className}>$ {costo}</p>
                </div>
            </header>
        </Link>
    );
}