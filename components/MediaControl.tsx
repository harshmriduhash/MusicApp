import { use, useContext, useEffect, useRef, useState } from "react";
import { useMusicController } from "@/hooks/useMusicController";
import { MusicControllerContext } from "@/contexts/MusicControllerContext";
import {
    faBackwardStep,
    faPause,
    faPlay,
    faForwardStep,
    faVolumeUp,
    faVolumeMute,
    faUpRightAndDownLeftFromCenter,
    faDownLeftAndUpRightToCenter,
    faChevronDown,
    faVolumeDown,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "./UiElements";
import { Palette, usePalette } from "color-thief-react";

export default function MediaControl({
    view,
    setView,
}: {
    view: boolean;
    setView: any;
}) {
    let MusicController = useMusicController();
    let state = useContext(MusicControllerContext);
    useEffect(() => {
        window.addEventListener("popstate", () => {
            setView(false);
        });
    }, []);
    let [touchStartX, setTouchStartX] = useState<number | null>(null);
    let [touchStartY, setTouchStartY] = useState<number | null>(null);
    let [changedSong, setChangedSong] = useState(false);
    // let canvas = useRef<HTMLCanvasElement>(null);
    // let ctx: CanvasRenderingContext2D | null;
    // let bufferLength: number | undefined;
    // let dataArray: Uint8Array;
    // let barWidth: number;
    // useEffect(() => {
    //     console.log(state.analyser);
    //     if (canvas.current && state.analyser) {
    //         if (canvas && canvas.current) {
    //             ctx = canvas.current?.getContext("2d");
    //             bufferLength = state.analyser?.frequencyBinCount;
    //             dataArray = new Uint8Array(bufferLength!);
    //             barWidth = canvas.current.width / bufferLength!;
    //             animate();
    //         }
    //     }
    // }, [canvas, state.analyser]);
    // function animate() {
    //     if (bufferLength && barWidth && dataArray && ctx && canvas.current) {
    //         let x = 0;
    //         ctx?.clearRect(0, 0, canvas.current!.width, canvas.current!.height);
    //         state.analyser?.getByteFrequencyData(dataArray);
    //         for (let i = 0; i < bufferLength; i++) {
    //             let barHeight = dataArray[i];
    //             ctx.fillStyle = "red";
    //             ctx.fillRect(
    //                 x,
    //                 canvas.current.height - barHeight,
    //                 barWidth,
    //                 barHeight
    //             );
    //             console.log(barHeight);
    //             x += barWidth;
    //         }
    //         requestAnimationFrame(animate);
    //     }
    // }

    useEffect(() => {
        if (state.initiallized) {
            let input = document.querySelector(".seeker") as HTMLInputElement;
            var r = document.querySelector(":root") as HTMLElement;
            r!.style.setProperty(
                "--percent",
                (
                    (parseFloat(input.value) / state.currentSongDuration) *
                    100
                ).toString() + "%"
            );
        }
    }, [state.currentSongDuration, state.currentTime]);
    useEffect(() => {
        if (state.initiallized) {
            let volumeInput = document.querySelector(
                ".volume"
            ) as HTMLInputElement;
            var r = document.querySelector(":root") as HTMLElement;
            r!.style.setProperty(
                "--volume-percent",
                parseFloat(volumeInput.value).toString() + "%"
            );
        }
    }, [state.volume]);
    return (
        <>
            <div
                className={`bg-[#101024] transition-opaci duration-700 pointer-events-none flex w-[96vw] md:w-[99vw] h-[4.5rem] absolute bottom-20 md:bottom-[10px] z-30 justify-center items-start md:items-center rounded-lg shadow-[0px_-30px_53px_0px_rgba(0,0,0,0.95)] ${
                    view ? "h-[97%] opacity-100 bottom-[10px]" : "opacity-0"
                }
                ${state.initiallized ? " block" : " hidden"}
                `}
            >
                <img
                    src={state.currentSongArt}
                    alt="cover"
                    className={`w-[70vh] hidden md:block rounded-lg duration-[3000ms] transition-opacity brightness-50 ${
                        view ? "h-[60vh] opacity-100" : "h-0 opacity-0"
                    }`}
                />
                <Palette src={state.currentSongArt} colorCount={4} format="hex">
                    {({ data, loading, error }) =>
                        data && (
                            <div
                                style={{
                                    background: `radial-gradient(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`,
                                }}
                                className={`md:w-[70vh] w-[80vw] rounded-lg duration-[3000ms] transition-opacity md:brightness-75 absolute block ${
                                    view
                                        ? "md:h-[60vh] h-[50vh] top-5 md:top-0 md:opacity-50"
                                        : "h-0 opacity-0"
                                }`}
                            ></div>
                        )
                    }
                </Palette>
            </div>
            <div
                className={`w-[96vw] md:w-[99vw] absolute  md:bottom-[10px] z-30 flex justify-center items-center rounded-lg duration-100 md:duration-500 ease-in-out ${
                    view
                        ? "h-[97%] backdrop-blur-3xl bg-[#24222e6c] bottom-[10px]"
                        : " h-[4rem] bg-[#24222e] bottom-16"
                }
                ${
                    state.initiallized
                        ? " translate-y-0 shadow-[0px_-30px_53px_0px_rgba(0,0,0,0.95)]"
                        : " md:translate-y-[150%] translate-y-[200%] shadow-transparent"
                }
                `}
                onClick={() => {
                    if (!view) {
                        window.history.pushState({}, "", "#music");
                    }
                    setView(true);
                }}
                onTouchStart={(e) => {
                    setTouchStartY(e.touches[0].clientY);
                    setTouchStartX(e.touches[0].clientX);
                }}
                onTouchMove={(e) => {
                    if (
                        touchStartY &&
                        e.touches[0].clientY - touchStartY > 100
                    ) {
                        setView(false);
                    } else if (
                        touchStartY &&
                        touchStartY - e.touches[0].clientY > 100
                    ) {
                        setView(true);
                    }

                    if (
                        touchStartX &&
                        e.touches[0].clientX - touchStartX > 100
                    ) {
                        if (!changedSong) {
                            MusicController.previousSong();
                            setChangedSong(true);
                        }
                    } else if (
                        touchStartX &&
                        touchStartX - e.touches[0].clientX > 100
                    ) {
                        if (!changedSong) {
                            MusicController.nextSong();
                            setChangedSong(true);
                        }
                    }
                }}
                onTouchEnd={() => {
                    setChangedSong(false);
                }}
            >
                <div
                    className={`flex w-full h-full px-4 items-center ${
                        view
                            ? "flex-col justify-start md:justify-end mb-8 md:gap-8 gap-12"
                            : "justify-between"
                    }`}
                >
                    <div
                        className={`flex items-center gap-4 w-[100%] md:w-auto justify-start md:justify-center ${
                            view
                                ? "flex-col h-auto mt-[40%] md:mt-0"
                                : "h-full md:flex-[0.25]"
                        }`}
                    >
                        {state.initiallized && (
                            <>
                                {/* <canvas
                                    ref={canvas}
                                    width={500}
                                    height={200}
                                    className="bg-white"
                                /> */}
                                <img
                                    src={state.currentSongArt}
                                    alt="cover"
                                    className={`rounded-lg object-contain ${
                                        view
                                            ? "h-[35vh] md:h-[55vh] w-fit"
                                            : "h-[80%] w-auto"
                                    }`}
                                />
                            </>
                        )}
                        <div
                            className={`flex flex-col justify-center h-full overflow-hidden ${
                                view ? "item-center" : "items-start w-[70%]"
                            }`}
                        >
                            <h1
                                className={`p-0 capitalize font-bold overflow-hidden whitespace-nowrap ${
                                    view ? "text-center text-2xl" : "text-lg"
                                }`}
                            >
                                {state.currentSongName}
                            </h1>
                            <h3
                                className={`p-0 text-slate-400 ${
                                    view ? "text-center text-lg" : "text-sm"
                                }`}
                            >
                                {state.currentSongArtist}
                            </h3>
                        </div>
                    </div>

                    <div
                        className={`w-[50%] h-fit flex justify-end md:justify-center items-center md:py-3 ${
                            view
                                ? "flex-col-reverse gap-5 md:gap-0 md:flex-col relative w-[98%] md:w-[50%]"
                                : "relative flex-[0.5] gap-4"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-center items-center gap-3">
                            <Button
                                icon={faBackwardStep}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    MusicController.previousSong();
                                }}
                                className={` ${
                                    view
                                        ? "h-12 w-12"
                                        : " h-8 w-8 hidden md:block"
                                }`}
                            />
                            <Button
                                icon={state.playing ? faPause : faPlay}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    MusicController.togglePlay();
                                    // if(!source || !analyser){
                                    //     audioContext= new AudioContext()
                                    //     analyser = audioContext.createAnalyser();
                                    //     source = audioContext.createMediaElementSource(state.songPlayer as HTMLAudioElement);
                                    // }
                                }}
                                className={`!bg-[rgba(157,165,208,0.4)]
                                    ${
                                        view
                                            ? "h-14 w-14"
                                            : "h-10 w-10 md:h-9 md:w-9"
                                    }
                                `}
                            />
                            <Button
                                icon={faForwardStep}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    MusicController.nextSong();
                                }}
                                className={`${
                                    view
                                        ? "h-12 w-12"
                                        : "h-8 w-8 hidden md:block"
                                }`}
                            />
                        </div>
                        <div
                            className={`w-full justify-center items-center flex-col gap-3
                        ${view ? "flex" : "hidden md:flex"}`}
                        >
                            <div className="flex w-full justify-between">
                                <span className="text-xs text-slate-400">
                                    {Math.floor(
                                        state.currentTime / 60
                                    ).toString().length == 1
                                        ? `0${Math.floor(
                                              state.currentTime / 60
                                          )}`
                                        : Math.floor(state.currentTime / 60)}
                                    :
                                    {Math.ceil(
                                        state.currentTime % 60
                                    ).toString().length == 1
                                        ? `0${Math.ceil(
                                              state.currentTime % 60
                                          )}`
                                        : Math.ceil(state.currentTime % 60)}
                                </span>
                                <span className="text-xs text-slate-400 float-right">
                                    {Math.floor(
                                        state.currentSongDuration / 60
                                    ).toString().length == 1
                                        ? `0${Math.floor(
                                              state.currentSongDuration / 60
                                          )}`
                                        : Math.floor(
                                              state.currentSongDuration / 60
                                          )}
                                    :
                                    {Math.ceil(
                                        state.currentSongDuration % 60
                                    ).toString().length == 1
                                        ? `0${Math.ceil(
                                              state.currentSongDuration % 60
                                          )}`
                                        : Math.ceil(
                                              state.currentSongDuration % 60
                                          )}
                                </span>
                            </div>

                            <input
                                type="range"
                                className="w-full input-slider seeker"
                                max={state.currentSongDuration}
                                value={state.currentTime}
                                onChange={(e) => {
                                    MusicController.seek(
                                        parseInt(e.target.value)
                                    );
                                }}
                            />
                        </div>
                    </div>

                    <div
                        className={`h-[80%] justify-end items-center gap-4 ${
                            view ? "hidden" : "hidden md:flex flex-[0.25]"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-center gap-1 rounded-3xl volume-controller">
                            <Button
                                icon={
                                    state.volume != 0
                                        ? state.volume > 0.5
                                            ? faVolumeUp
                                            : faVolumeDown
                                        : faVolumeMute
                                }
                                onClick={MusicController.toggleMute}
                                className="h-8 w-8"
                            />
                            <input
                                type="range"
                                className="volume input-slider"
                                max={100}
                                value={state.volume * 100}
                                onChange={(e) => {
                                    MusicController.setVolume(
                                        parseInt(e.target.value) / 100
                                    );
                                }}
                            />
                        </div>
                        <Button
                            icon={faUpRightAndDownLeftFromCenter}
                            onClick={() => {
                                if (!view) {
                                    window.history.pushState(
                                        {},
                                        "",
                                        "/dashboard#music"
                                    );
                                }
                                view ? setView(false) : setView(true);
                                document
                                    .querySelector("body")!
                                    .requestFullscreen();
                            }}
                            className="h-8 w-8"
                        />
                    </div>
                </div>
                <Button
                    icon={faDownLeftAndUpRightToCenter}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (document.fullscreenElement)
                            document.exitFullscreen();
                        history.back();
                    }}
                    className={`h-9 w-9 absolute bottom-6 right-6 ${
                        view ? "hidden md:flex" : "hidden"
                    }`}
                />
                <Button
                    icon={faChevronDown}
                    onClick={(e) => {
                        e.stopPropagation();
                        history.back();
                    }}
                    className={`h-9 w-9 absolute top-6 left-6 ${
                        view ? "md:hidden flex" : "hidden"
                    }`}
                />
            </div>
        </>
    );
}
