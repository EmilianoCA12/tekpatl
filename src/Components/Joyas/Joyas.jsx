import clsx from "clsx";

import styles from "./Joyas.module.css";

import { DM_Sans } from "next/font/google";
import Item from "../Items/Items";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap'
});

export default function Joyas({ joyas }){

    return(
        <ul className={styles.grid}>
            {joyas.map(joya => 
                <li className={styles.item} key={joya.id}>
                    <Item {...joya}></Item>
                </li>
            )}
        </ul>
    );
}