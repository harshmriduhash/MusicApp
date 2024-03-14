"use client";

import { useEffect, useState } from "react";
import MainDashboardLayout from "@/components/MainDashboardLayout";
import data from "@/config/songs.json";
import { Button, MusicButton } from "@/components/UiElements";
import { useMusicController } from "@/hooks/useMusicController";
import {
    faHeart,
    faPlay,
    faPlus,
    faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Palette } from "color-thief-react";

interface PlaylistId {
    id: string;
}

interface Playlist {
    name: string;
    cover: string;
    src: string;
    artist: string;
    playlist: string;
    _id: string;
}

export default function Page({ params }: { params: PlaylistId }) {
    let { id } = params;
    let [loading, setLoading] = useState(true);
    let [playlist, setPlaylist] = useState<Playlist | undefined>(undefined);
    let [liked, setLiked] = useState(false);
    useEffect(() => {
        setPlaylist(data.find((playlist) => playlist._id === id));
        setLoading(false);
    }, []);
    let state = useMusicController();
    function play() {
        console.log("play");
        state.playSong(
            playlist!.src,
            playlist!.name,
            playlist!.artist,
            playlist!.cover
        );
    }
    return (
        <>
            <MainDashboardLayout className="relative" loading={loading}>
                <div className="w-full h-max pb-10 flex flex-col md:gap-10 gap-4 relative ">
                    {playlist?.cover && (
                        <Palette
                            src={playlist?.cover}
                            colorCount={4}
                            format="hex"
                        >
                            {({ data, loading, error }) =>
                                data && (
                                    <div
                                        style={{
                                            background: `linear-gradient(to right, ${data[0]} 0%, ${data[1]} 8%, ${data[2]} 17%, ${data[3]} 25%, transparent 100%)`,
                                        }}
                                        className={`md:w-[40%] md:h-36 h-[90vw] w-[30vh] md:top-0 -top-12 md:left-0 left-1/2 md:translate-x-0 -translate-x-1/2 rounded-lg rotate-90 md:rotate-0 absolute md:block`}
                                    ></div>
                                )
                            }
                        </Palette>
                    )}
                    <div className="md:pt-2 pt-14 pl-2 rounded-lg backdrop-blur-3xl z-10 w-full flex md:h-60 items-center justify-center md:justify-start md:gap-6 gap-3 md:flex-row flex-col">
                        <img
                            src={playlist?.cover}
                            alt="cover"
                            className="w-auto md:h-full h-[28svh] rounded-lg"
                        />
                        <div className="flex flex-col gap-3 overflow-x-hidden w-full h-full items-center md:items-start">
                            <div className="flex items-center md:justify-start justify-center gap-4 w-full">
                                <div className="max-w-[75%] overflow-hidden">
                                    <h1 className="md:text-6xl text-2xl font-bold p-0 m-0 whitespace-nowrap">
                                        {playlist?.name}
                                    </h1>
                                </div>
                                {liked ? (
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        className="text-[#D09DA6] text-3xl cursor-pointer hidden md:block"
                                        onClick={() => {
                                            setLiked(false);
                                            navigator.vibrate([50,50]);
                                        }}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faHeartRegular}
                                        className="text-[#D09DA6] text-3xl cursor-pointer hidden md:block"
                                        onClick={() => {
                                            setLiked(true);
                                            navigator.vibrate([50,50]);
                                        }}
                                    />
                                )}
                            </div>
                            <h2 className="md:text-xl text-md font-bold opacity-70 p-0 m-0">
                                {playlist?.artist}
                            </h2>
                            <div className="flex items-center justify-between gap-3 w-fit">
                                <Button
                                    icon={faPlay}
                                    onClick={() => {
                                        play();
                                    }}
                                    className="h-12 w-12 bg-[rgba(157,165,208,0.4)]"
                                />
                                <Button
                                    icon={faPlus}
                                    onClick={() => {
                                        state.enqueue([playlist!]);
                                    }}
                                    className="md:h-9 md:w-9 h-12 w-12"
                                />
                                <Button
                                    icon={faShareNodes}
                                    onClick={() => {
                                        let d = {
                                            title: playlist?.name,
                                            text: playlist?.artist,
                                            url: window.location.href,
                                        };
                                        navigator.share(d);
                                    }}
                                    className="md:h-9 md:w-9 h-12 w-12"
                                />
                                {liked ? (
                                    <Button
                                        icon={faHeart}
                                        className="bg-red-300/70 h-12 w-12 md:hidden block"
                                        onClick={() => {
                                            setLiked(false);
                                            navigator.vibrate([50,50]);
                                        }}
                                    />
                                ) : (
                                    <Button
                                        icon={faHeartRegular}
                                        className="h-12 w-12 md:hidden block"
                                        onClick={() => {
                                            setLiked(true);
                                            navigator.vibrate([50,50]);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <hr className="w-full md:w-[94%] md:border-2 border-[0px] rounded-lg border-[#9da5d080] md:mt-6" />
                    <div className="w-full md:w-[94%] flex flex-col gap-4 h-auto">
                        <MusicButton playlist={playlist} />
                    </div>
                </div>
            </MainDashboardLayout>
        </>
    );
}
