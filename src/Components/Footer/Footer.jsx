import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.css";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    display: 'swap'
});

export default function Footer() {
    return(
        <footer className={clsx(styles.footer, dmSans.className)}>
            <div className={styles.info}>
                <div>
                    <Image
                        src="/Horizontaljade.svg"
                        alt="Tektpatl"
                        width={250}
                        height={95}
                        priority
                    ></Image>
                    <p className={styles.centrar}>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="#918f7c"  className="icon icon-tabler icons-tabler-filled icon-tabler-location"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.891 2.006l.106 -.006l.13 .008l.09 .016l.123 .035l.107 .046l.1 .057l.09 .067l.082 .075l.052 .059l.082 .116l.052 .096c.047 .1 .077 .206 .09 .316l.005 .106c0 .075 -.008 .149 -.024 .22l-.035 .123l-6.532 18.077a1.55 1.55 0 0 1 -1.409 .903a1.547 1.547 0 0 1 -1.329 -.747l-.065 -.127l-3.352 -6.702l-6.67 -3.336a1.55 1.55 0 0 1 -.898 -1.259l-.006 -.149c0 -.56 .301 -1.072 .841 -1.37l.14 -.07l18.017 -6.506l.106 -.03l.108 -.018z" /></svg>
                        <Link className={styles.hov} href="https://maps.app.goo.gl/JsBtSHNiZqsCMnCq8">República de Guatemala 20, Centro, Cuauhtémoc, 06000 Ciudad de México, CDMX</Link>
                    </p>
                    <p className={styles.nombre}>CONTACTO</p>
                    <div className={styles.centrar}>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#918f7c"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-phone-call"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 7a2 2 0 0 1 2 2" /><path d="M15 3a6 6 0 0 1 6 6" /></svg>
                        <a className={styles.hov} href="tel:+525560041457">+52 55 6004 1457</a>
                    </div>
                    <br></br>
                    <div className={styles.centrar}>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#918f7c"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
                        <a className={styles.hov} href="mailto:joyeriatekpatl@gmail.com">joyeriatekpatl@gmail.com</a>
                    </div>
                </div>
                <div className={styles.columna}>
                    <p className={styles.nombre}>MAPA DE SITIO</p>
                    <Link className={styles.hov} href="/">INICIO</Link>
                    <Link className={styles.hov} href="/">BLOG</Link>
                    <Link className={styles.hov} href="/">NUESTRA HISTORIA</Link>
                </div>
                <div className={styles.columna}>
                    <p className={styles.nombre}>PÁGINAS DE AYUDA</p>
                    <Link className={styles.hov} href="/">GARANTÍA, CAMBIOS Y DEVOLUCIONES</Link>
                    <Link className={styles.hov} href="/">PAGOS Y ENVÍOS</Link>
                    <Link className={styles.hov} href="/">PREGUNTAS FRECUENTES</Link>
                    <Link className={styles.hov} href="/">AVISO DE PRIVACIDAD</Link>
                    <Link className={styles.hov} href="/">TÉRMINOS DEL SERVICIO</Link>
                </div>
                <div className={styles.redes}>
                    <p className={styles.nombre}>SÍGUENOS EN REDES SOCIALES</p>
                    <div className={styles.redesLogos}>
                        <Link href="/">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#918f7c"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>
                        </Link>
                        <Link href="/">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#918f7c"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.abajo}>
                <p>Powered by <span className={styles.nombre}>Tech Control</span></p>
                <p><span className={styles.nombre}>TEKPATL JOYERÍA ©</span> 2023 TODOS LOS DERECHOS RESERVADOS</p>
                <Image
                    src="/images/logo-stripe.png"
                    width={160}
                    height={50}
                    alt="Opciones de pago"
                    priority
                ></Image>
            </div>
        </footer>
    );
}