import { DM_Sans } from "next/font/google";

import Image from "next/image";
import Link from "next/link";

import Header from "@/Components/Header/Header";
import Main from "@/Components/Main/Main";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap'
});

export default function Home() {
  return (
    <main>
      <Main></Main>
    </main>
  );
}
