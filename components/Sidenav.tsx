import { faHouse, faMusic, faHeart } from "@fortawesome/free-solid-svg-icons";
import { NavBtn } from "./UiElements";
import data from "../config/navbar.json";

const Sidenav = () => {
    return (
        <div className="hidden md:flex md:flex-[0.15] lg:flex-[0.2] h-full z-10 rounded-r-2xl flex-col justify-start items-center sidenav inset-0 gap-4">
            <h1 className="logo text-2xl p-5">Vibe</h1>
            <div className="flex flex-col justify-start items-center w-full gap-4">
                {data.map((item, index) => {
                    if (item.image) {
                        return (
                            <NavBtn
                                image={item.image}
                                key={index}
                                icon={undefined}
                                text={item.text}
                                href={item.url}
                            />
                        );
                    } else {
                        return (
                            <NavBtn
                                key={index}
                                icon={item.icon==="faHouse" ? faHouse : item.icon==="faMusic" ? faMusic : faHeart}
                                text={item.text}
                                href={item.url}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Sidenav;
