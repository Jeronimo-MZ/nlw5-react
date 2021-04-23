import { Header } from "../components/Header";
import styles from "../styles/app.module.scss";
import { Player } from "../components/Player";
import { PlayerContext } from "../contexts/PlayerContext";

import "../styles/global.scss";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    function play(episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                togglePlay,
                isPlaying,
            }}
        >
            <div className={styles.appWrapper}>
                <main>
                    <Header />
                    <Component {...pageProps} />
                </main>
                <Player />
            </div>
        </PlayerContext.Provider>
    );
}

export default MyApp;
