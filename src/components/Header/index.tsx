import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

import styles from "./styles.module.scss";

export function Header() {
    const currentDate = format(new Date(), "EEEEEE, d MMMM", {
        locale: ptBR,
    });
    return (
        <header className={styles.headerContainer}>
            <Link href="/">
                <a>
                    <img src="/logo.svg" alt="Podcastr" />
                </a>
            </Link>
            <p>O melhor para você ouvir sempre</p>
            <span>{currentDate}</span>
        </header>
    );
}
