import Link from 'next/link';
import Image from 'next/image';

import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
    return(
        <Link
            href="https://wa.me/525560041457"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatAppButton}>
                <Image
                    src="/images/whatsapp.png"
                    alt="WhatsApp"
                    width={60}
                    height={60}
                    priority></Image>
        </Link>
    );
}