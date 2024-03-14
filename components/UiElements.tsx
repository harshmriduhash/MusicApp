import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faMagnifyingGlass,
    faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { useMusicController } from "@/hooks/useMusicController";

function NavBtn(props: {
    image?: string;
    icon: IconProp | undefined;
    text: string;
    href: string;
    className?: string;
}) {
    return (
        <Link
            href={props.href}
            className={
                "w-[83%] flex justify-start items-center gap-3 bg-[rgba(66,66,66,0.4)] rounded-lg " +
                props.className
            }
        >
            {props.icon ? (
                <FontAwesomeIcon
                    icon={props.icon}
                    className="text-white h-[20px] w-[20px] m-3 ml-[22px]"
                />
            ) : (
                <img
                    src={props.image}
                    alt={"profile"}
                    height={20}
                    width={20}
                    className="object-cover h-[20px] w-[20px] rounded-full m-3 ml-[22px]"
                />
            )}
            <h3>{props.text}</h3>
        </Link>
    );
}

function NavBtnMobile({ icon, url }: { icon: IconProp; url: string }) {
    return (
        <Link
            href={url}
            className="w-full h-full rounded-2xl bg-[rgba(66,66,66,0.25)]"
            onClick={() => {
                navigator.vibrate(50);
            }}
        >
            <div className="flex h-full w-full justify-center items-center">
                <FontAwesomeIcon
                    icon={icon}
                    className="text-white h-[20px] w-[20px]"
                />
            </div>
        </Link>
    );
}

function SearchInput({ className }: { className: string }) {
    return (
        <div
            className={
                "h-9 flex justify-center items-center rounded-lg bg-[rgba(128,128,128,0.24)] w-full md:w-96 " +
                className
            }
        >
            <label
                htmlFor="search"
                className="h-full flex gap-1 justify-center items-center pl-3"
            >
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="font-bold"
                />
            </label>
            <input
                placeholder="Search..."
                id="search"
                className="w-full h-full border-none flex-1 outline-none pl-2 text-white font-semibold bg-transparent placeholder:text-[#ffffff100]"
            ></input>
        </div>
    );
}

function Button(props: {
    icon?: IconProp;
    image?: string;
    onClick: (e: any) => void;
    className: string;
    iconClassName?: string;
}) {
    return (
        <button
            className={`rounded-full bg-[rgba(157,165,208,0.2)] flex justify-center items-center ${props.className}`}
            onClick={props.onClick}
        >
            {" "}
            {props.image ? (
                <img
                    src={props.image}
                    alt={"profile"}
                    height={20}
                    width={20}
                    className="object-cover h-[98%] w-[98%] rounded-full border-2 border-white"
                />
            ) : (
                props.icon && (
                    <FontAwesomeIcon
                        icon={props.icon}
                        className={"text-white h-[45%] "+props.iconClassName}
                    />
                )
            )}
        </button>
    );
}

function MusicButton(props: {
    playlist:
        | {
              name: string;
              cover: string;
              src: string;
              artist: string;
              playlist: string;
              _id: string;
          }
        | undefined;
}) {
    const [liked, setLiked] = useState(false);
    let state = useMusicController();
    function play() {
        console.log("play");
        state.playSong(
            props.playlist!.src,
            props.playlist!.name,
            props.playlist!.artist,
            props.playlist!.cover
        );
    }
    return (
        <>
            {props.playlist && (
                <div className="w-full h-14 rounded-md bg-[rgba(157,165,208,0.2)] flex justify-between items-center gap-6 px-6">
                    <Button
                        icon={faPlay}
                        onClick={() => {
                            play();
                        }}
                        className="h-9 w-9"
                    />
                    <div className="flex flex-col justify-center items-start flex-1">
                        <h3 className="text-white font-semibold text-lg">
                            {props.playlist.name}
                        </h3>
                        <h4 className="text-[#ffffff80]">
                            {props.playlist.artist}
                        </h4>
                    </div>
                    {liked ? (
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="text-[#D09DA6] text-2xl cursor-pointer"
                            onClick={() => {
                                setLiked(false);
                                navigator.vibrate([50,50]);
                            }}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faHeartRegular}
                            className="text-[#D09DA6] text-2xl cursor-pointer"
                            onClick={() => {
                                setLiked(true);
                                navigator.vibrate(100);
                            }}
                        />
                    )}
                </div>
            )}
        </>
    );
}

export { NavBtn, SearchInput, Button, NavBtnMobile, MusicButton };
