"use client";
import { useMusicController } from "@/hooks/useMusicController";
import { useEffect, useRef } from "react";
import { Button } from "./UiElements";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function Album(props: {
    cover: string;
    name: string;
    artist: string;
    src: string;
    playlist: string;
    _id: string;
}) {
    let cover = useRef<HTMLDivElement>(null);
    let coverAmbient = useRef<HTMLDivElement>(null);
    let state = useMusicController();
    const router = useRouter();
    useEffect(() => {
        if (cover && coverAmbient) {
            cover.current!.style.backgroundImage = `url(${props.cover})`;
            coverAmbient.current!.style.backgroundImage = `url(${props.cover})`;
        }
    }, []);
    function play() {
        console.log("play");
        state.playSong(props.src, props.name, props.artist, props.cover);
    }
    return (
        <div
            className="album relative"
            onClick={() => {
                router.push(`/playlist/${props._id}`);
            }}
        >
            <div
                className="aspect-square hidden md:block w-[85%] bg-cover rounded-lg opacity-70 overflow-hidden absolute top-[50%] inset-x-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                ref={coverAmbient}
            ></div>
            <div className="w-full h-full bg-cover rounded-lg overflow-hidden bg-center opacity max-h-[300px] max-w-[300px] p-[0.6rem] md:p-4 bg-[rgba(62,62,62,0.8)] md:bg-[rgba(62,62,62,0.6)] z-20 relative md:backdrop-blur-xl">
                <div
                    className="aspect-square w-full bg-cover rounded-lg overflow-hidden relative"
                    ref={cover}
                >
                    <div className="absolute inset-0 w-full h-full bg flex justify-center items-center opacity-0 hover:opacity-100 transition-all cursor-pointer"></div>
                </div>
                <div className="flex justify-between items-center mt-2 md:h-10 relative">
                    <h2 className="cursor-pointer font-semibold text-md text-[#d7d7d7] capitalize max-w-[100%] w-[10rem] overflow-hidden whitespace-nowrap">
                        {props.name}
                    </h2>
                    <Button
                        icon={faPlay}
                        className={
                            "!bg-[#6475d3] h-10 w-10 hidden md:block absolute right-0 top-0 shadow-xl play-btn"
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                            play();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
