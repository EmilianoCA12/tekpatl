import clsx from "clsx";

import { DM_Sans } from "next/font/google";

import styles from "./not-found.module.css";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap'
});


export default function NotFound() {
    return(
        <main className={styles.principal}>
            <h1 className={styles.titulo}>No encontrado</h1>
            <p className={dmSans.className}>No se encontró la página o recurso solicitad</p>
        </main>
    );
}