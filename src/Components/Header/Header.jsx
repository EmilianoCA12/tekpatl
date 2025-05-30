// ✅ Header.js corregido
"use client"

import clsx from "clsx";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./Header.module.css";
import { DM_Sans } from "next/font/google";
import CartPreview from "../CartPreview/CartPreview";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap'
});

function useMobileView() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const isMobile = useMobileView();

  const logoSrc = isMobile
    ? (hovered ? "IconoBeige.svg" : "Iconojade.svg")
    : (hovered ? "Horizontalbeige.svg" : "Horizontaljade.svg");

  return (
    <nav className={styles.headerContainer}>
      <div className={styles.upperNav}>
        <div>
          <svg className={clsx("icon icon-tabler icon-tabler-menu-2", styles.hov, styles.upperNavHam)} onClick={() => setMenuOpen(!menuOpen)} xmlns="http://www.w3.org/2000/svg" width={isMobile ? 30 : 40} height={isMobile ? 30 : 40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
        </div>
        <Link className={styles.logo} href="/">
          <Image
            src={`/${logoSrc}`}
            alt="Tekpatl"
            width={isMobile ? 100 : 212}
            height={isMobile ? 70 : 50}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={styles.logoImage}
            priority
          />
        </Link>
        <div className={styles.acciones}>
          <svg className={clsx(styles.hov, "icon icon-tabler icons-tabler-outline icon-tabler-user")} xmlns="http://www.w3.org/2000/svg" width={isMobile ? 30 : 40} height={isMobile ? 30 : 40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
          <svg onClick={() => setCartOpen(true)} className={clsx(styles.upperNavMini, styles.hov, "icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart")} xmlns="http://www.w3.org/2000/svg" width={isMobile ? 30 : 40} height={isMobile ? 30 : 40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
        </div>
      </div>

      <div
        className={clsx(styles.menuOverlay, {
          [styles.open]: menuOpen,
          [styles.closed]: !menuOpen
        })}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={clsx(styles.mobileMenu, {
            [styles.open]: menuOpen,
            [styles.closed]: !menuOpen
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <svg onClick={() => setMenuOpen(!menuOpen)} className={clsx(styles.hov, "icon icon-tabler icons-tabler-outline icon-tabler-x")} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          <p className={clsx(dmSans.className, styles.links)}><Link href="/anillos">ANILLOS</Link></p>
          <p className={clsx(dmSans.className, styles.links)}><Link href="/collares">COLLARES</Link></p>
          <p className={clsx(dmSans.className, styles.links)}><Link href="/aretes">ARETES</Link></p>
          <p className={clsx(dmSans.className, styles.links)}><Link href="/diges">DIJES</Link></p>
          <p className={clsx(dmSans.className, styles.links)}><Link href="/seguimiento">SEGUIMIENTO DE PEDIDO</Link></p>
        </div>
      </div>

      <CartPreview isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}