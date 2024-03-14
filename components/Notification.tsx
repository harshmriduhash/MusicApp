import { NotificationContext } from "@/contexts/NotificationContext";
import React, { useContext } from "react";

export default function Notification() {
    let NotificationCtx = useContext(NotificationContext);
    return (
        <div
            className={`z-50 absolute md:right-7 right-1/2 translate-x-1/2 md:translate-x-0 md:top-10 bottom-36 md:h-12 md:w-80 h-10 rounded-lg bg-[#323551] items-center p-4 ${
                NotificationCtx.show ? "flex" : "hidden"
            }`}
        >
            <h1 className="opacity-60 text-md">{NotificationCtx.text}</h1>
        </div>
    );
}
