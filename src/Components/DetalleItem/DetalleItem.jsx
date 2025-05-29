"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./DetalleItem.module.css";

import { DM_Sans } from "next/font/google";
import clsx from "clsx";

import useCartStore from "@/store/cartStore";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap'
});

const colores = [
  { nombre: "Azul marino", hex: "#2E4053" },
  { nombre: "Azul cielo", hex: "#A0D8EF" },
  { nombre: "Verde", hex: "#4CAF50" },
  { nombre: "Rosa", hex: "#F48FB1" },
  { nombre: "Amarillo", hex: "#FFEB3B" },
  { nombre: "Blanco", hex: "#FFFFFF" },
  { nombre: "Morado", hex: "#9C27B0" }
];

const tallas = Array.from({ length: 10 }, (_, i) => 6 + i);

export default function DetalleItem({ nombre, costo, incremento, id, lank, imagenes, descripcion, brillante, multiTallas }) {
    const [isMobile, setIsMobile] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const imagenPrincipal = imagenes[currentIndex]?.direccion;

    const [colorSeleccionado, setColorSeleccionado] = useState(null);
    const [tallaSeleccionada, setTallaSeleccionada] = useState(null);

    const [cantidad, setCantidad] = useState(1);

    const addToCart = useCartStore((state) => state.addToCart);

    function handleAgregarAlCarrito() {
        const item = {
            id,
            nombre,
            costo,
            color: colorSeleccionado,
            talla: tallaSeleccionada,
            cantidad,
            subtotal: costo * cantidad,
            direccion: imagenes[0].direccion
        };

        addToCart(item);
        alert("Producto añadido al carrito");
    }

    function handleArrow(dir) {
        if (dir === "left") {
            setCurrentIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
        } else {
            setCurrentIndex((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
        }
    }

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 815);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
        <div className={dmSans.className}>
            <div className={styles.centrar}>
                <p className={styles.enlaces}><Link className={styles.enlace} href="/">Home</Link> / <Link href={`/${lank}`} className={styles.actual}>{lank}</Link></p>
            </div>
            <div className={styles.main}>
                <div className={styles.contenedor}>
                    {!isMobile && (
                        <div className={styles.gallery}>
                            <div className={styles.thumbnails}>
                                {imagenes.map(imagen =>
                                    <div className={clsx(styles.thumbnail, imagen.direccion === imagenPrincipal && styles.activa)} key={imagen.id} onClick={() => setCurrentIndex(imagenes.findIndex(img => img.direccion === imagen.direccion))}>
                                        <Image src={imagen.direccion} alt="Miniatura" height={125} width={109}></Image>
                                    </div>
                                )}
                            </div>
                            <div className={styles.imagen}>
                                <Image src={imagenPrincipal} alt={nombre} className={styles.fadeImage} height={150} width={150}></Image>
                            </div>
                        </div>
                    )}
                    {isMobile && (
                        <div className={styles.carouselWrapper}>
                            <button className={styles.arrowLeft} onClick={() => handleArrow("left")}>&lt;</button>
                            
                            <div className={styles.carouselItem}>
                                <Image src={imagenPrincipal} alt="Imagen" fill style={{ objectFit: "contain" }} className={styles.fadeImage}/>
                            </div>

                            <button className={styles.arrowRight} onClick={() => handleArrow("right")}>&gt;</button>
                        </div>
                    )}
                    <div className={styles.detalles}>
                        <h1 className={styles.titulo}>{nombre}</h1>
                        <p>${costo}</p>
                        <div className={styles.formulario}>
                            {brillante === 1 && (
                                <div>
                                    <p>Color: <span className={styles.text}>{colorSeleccionado ?? "Seleccionar"}</span></p>
                                    <div className={styles.colores}>
                                        {colores.map((color) => (
                                        <button
                                            key={color.nombre}
                                            className={`${styles.colorBtn} ${colorSeleccionado === color.nombre ? styles.activo : ""}`}
                                            style={{ backgroundColor: color.hex }}
                                            onClick={() => setColorSeleccionado(color.nombre)}
                                        />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {multiTallas === 1 && (
                                <div>
                                    <div className={styles.sizeRow}>
                                        <p>Tamaño: <span className={styles.text}>{tallaSeleccionada ?? "Seleccionar"}</span></p>
                                    </div>
                                    <div className={styles.tallas}>
                                        {tallas.map((talla) => (
                                        <button
                                            key={talla}
                                            className={`${styles.tallaBtn} ${tallaSeleccionada === talla ? styles.activa : ""}`}
                                            onClick={() => setTallaSeleccionada(talla)}
                                        >
                                            {talla}
                                        </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <label className={styles.label}>Cantidad:</label>
                            <div className={styles.cantidadControl}>
                                <button onClick={() => setCantidad(c => Math.max(1, c - 1))}>−</button>
                                <span>{cantidad}</span>
                                <button onClick={() => setCantidad(c => c + 1)}>+</button>
                            </div>

                            <button className={styles.botonCarrito} onClick={handleAgregarAlCarrito}>Añadir al carrito</button>
                        </div>
                        <p>DESCRIPCIÓN</p>
                        <p>{descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}