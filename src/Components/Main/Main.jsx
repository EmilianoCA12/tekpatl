import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";

import styles from './Main.module.css'
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap'
});

export default function Main() {
    return(
        <div>
            <div className={clsx(styles.video)}>
                <Image
                    src="/images/fondo1.jpeg"
                    alt="Video de muestra"
                    width={1920}
                    height={1080}
                    layout="responsive"></Image>
            </div>
            <p className={styles.titulo}>EXPLORA POR CATEGORÍA</p>
            <div className={styles.cards}>
                <Link href="/anillos" className={styles.cardAnillo}>
                    <p className={styles.cardTitle}>ANILLOS</p>
                </Link>
                <Link href="/anillos" className={styles.cardAretes}>
                    <p className={styles.cardTitle}>ARETES</p>
                </Link>
                <Link href="/anillos" className={styles.cardDijes}>
                    <p className={styles.cardTitle}>DIJES</p>
                </Link>
                <Link href="/anillos" className={styles.cardCollares}>
                    <p className={styles.cardTitle}>MINERALES</p>
                </Link>
            </div>
        </div>
    );
}