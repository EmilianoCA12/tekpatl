import { notFound } from "next/navigation";
import { getAnillo, getImagenesAnillos } from "../../../../lib/joyas";

import DetalleItem from "@/Components/DetalleItem/DetalleItem";

export default async function MostrarAnillos({ params }){

    const { slug } = await params;
    const anillo = getAnillo(slug);

    if(!anillo) {
        notFound();
    }

    anillo.lank = "anillos";

    const imagenes = getImagenesAnillos(slug);

    return(
        <DetalleItem {...anillo} imagenes={imagenes}></DetalleItem>
    );
}