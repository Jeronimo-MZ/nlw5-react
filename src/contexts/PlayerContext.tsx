import { Children, createContext, useContext, useState } from "react";
type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    isPlaying: boolean;
    setPlayingState: (state: boolean) => void;
    hasNext: boolean;
    hasPrevious: boolean;
    isLooping: boolean;
    toggleLoop: () => void;
    isShuffling: boolean;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: React.ReactNode;
};

export const PlayerContextProvider = ({
    children,
}: PlayerContextProviderProps) => {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function clearPlayerState() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    const hasNext =
        (isShuffling && episodeList.length > 1) ||
        currentEpisodeIndex + 1 < episodeList.length;
    const hasPrevious = currentEpisodeIndex > 0;

    function playNext() {
        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(
                Math.random() * episodeList.length
            );
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
            setIsPlaying(true);
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
            setIsPlaying(true);
        }
    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
            setIsPlaying(true);
        }
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                togglePlay,
                isPlaying,
                setPlayingState,
                playList,
                playNext,
                playPrevious,
                hasNext,
                hasPrevious,
                isLooping,
                toggleLoop,
                isShuffling,
                toggleShuffle,
                clearPlayerState,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);
