import { NavBtnMobile } from "./UiElements";
import data from "../config/navbar.json";
import { faHeart, faHouse, faMusic } from "@fortawesome/free-solid-svg-icons";
export default function BottomNav({ view }: { view: boolean }) {
    return (
        <div
            className={`flex md:hidden fixed bottom-0 w-full h-16 justify-center items-center gap-4 bg-[rgba(66,66,66,0.1)] p-3
            ${view ? "hidden" : "flex"}
        `}
        >
            {data.map((item, index) => {
                if (item.onMobile) {
                    return (
                        <NavBtnMobile
                            key={index}
                            icon={
                                item.icon === "faHouse"
                                    ? faHouse
                                    : item.icon === "faMusic"
                                    ? faMusic
                                    : faHeart
                            }
                            url={item.url}
                        />
                    );
                }
            })}
        </div>
    );
}
