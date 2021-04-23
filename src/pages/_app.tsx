import { Header } from "../components/Header";
import styles from "../styles/app.module.scss";
import { Player } from "../components/Player";
import { PlayerContextProvider } from "../contexts/PlayerContext";

import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
    return (
        <PlayerContextProvider>
            <div className={styles.appWrapper}>
                <main>
                    <Header />
                    <Component {...pageProps} />
                </main>
                <Player />
            </div>
            ;
        </PlayerContextProvider>
    );
}

export default MyApp;
