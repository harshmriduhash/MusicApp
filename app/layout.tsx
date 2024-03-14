"use client";
import MediaControl from "@/components/MediaControl";
import Sidenav from "@/components/Sidenav";
import { useContext, useEffect, useState } from "react";
import "./globals.css";
import { MusicControllerContext } from "@/contexts/MusicControllerContext";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { NotificationContext } from "@/contexts/NotificationContext";
import Notification from "@/components/Notification";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const state = useContext(MusicControllerContext);
    const NotificationCtx = useContext(NotificationContext);
    const [playing, setPlaying] = useState(false);
    const [queue, setQueue] = useState<object[]>([]);
    const [currentSongName, setCurrentSongName] = useState("");
    const [currentSongArtist, setCurrentSongArtist] = useState("");
    const [currentSongAlbum, setCurrentSongAlbum] = useState("");
    const [currentSongArt, setCurrentSongArt] = useState("");
    const [currentSongDuration, setCurrentSongDuration] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [songPlayer, setSongPlayer] = useState<HTMLAudioElement | null>(null);
    const [initiallized, setInitiallized] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    state.playing = playing;
    state.queue = queue;
    state.currentSongName = currentSongName;
    state.currentSongArtist = currentSongArtist;
    state.currentSongAlbum = currentSongAlbum;
    state.currentSongArt = currentSongArt;
    state.currentSongDuration = currentSongDuration;
    state.currentSongIndex = currentSongIndex;
    state.songPlayer = songPlayer;
    state.volume = volume;
    state.initiallized = initiallized;
    state.currentTime = currentTime;
    state.analyser = analyser;
    state.audioContext = audioContext;

    state.setCurrentTime = setCurrentTime;
    state.setPlaying = setPlaying;
    state.setQueue = setQueue;
    state.setCurrentSongName = setCurrentSongName;
    state.setCurrentSongArtist = setCurrentSongArtist;
    state.setCurrentSongAlbum = setCurrentSongAlbum;
    state.setCurrentSongArt = setCurrentSongArt;
    state.setCurrentSongDuration = setCurrentSongDuration;
    state.setCurrentSongIndex = setCurrentSongIndex;
    state.setSongPlayer = setSongPlayer;
    state.setVolume = setVolume;
    state.setInitiallized = setInitiallized;
    state.setAnalyser = setAnalyser;
    state.setAudioContext = setAudioContext;

    let [show, setShow] = useState(false);
    let [text, setText] = useState("");

    NotificationCtx.show = show;
    NotificationCtx.text = text;

    NotificationCtx.setShow = setShow;
    NotificationCtx.setText = setText;

    const router = useRouter();
    useEffect(() => {
        router.push("/dashboard");
    }, []);
    let [view, setView] = useState(false);
    return (
        <html lang="en">
            <head>
                <title>Vibe</title>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#21142a" />
                <meta name="description" content="Vibe" />
                <link rel="apple-touch-icon" href="/icons/icon192x192.png" />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </head>
            <body>
                <Notification />
                <Sidenav />
                {children}
                <MediaControl view={view} setView={setView} />
                <BottomNav view={view} />
            </body>
        </html>
    );
}
