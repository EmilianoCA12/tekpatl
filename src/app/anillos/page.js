import { DM_Sans } from "next/font/google";

import Image from "next/image";
import Link from "next/link";

import Joyas from "@/Components/Joyas/Joyas";

import { getAnillos } from "../../../lib/joyas";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap'
});

export default function Mostrar() {
  const joyas = getAnillos();

  return(
      <main>
        <Joyas joyas={joyas}></Joyas>
      </main>
  );
}