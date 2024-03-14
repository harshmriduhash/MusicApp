import {
    faAngleLeft,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useEffect, useState } from "react";
import { Button, SearchInput } from "./UiElements";
import data from "@/config/navbar.json";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

export default function MainDashboardLayout({
    className,
    loading = false,
    children,
}: {
    className?: string;
    loading?: boolean;
    children: ReactNode;
}) {
    let router = useRouter();
    let [url, setUrl] = useState("false");
    useEffect(() => {
        if (
            window?.location?.pathname === "/dashboard" ||
            window?.location?.pathname === "/profile" ||
            window?.location?.pathname === "/liked" ||
            window?.location?.pathname === "/playlist"
        ) {
            setUrl("show");
        } else {
            setUrl("");
        }
    }, []);
    return (
        <Loading loading={loading}>
            <div
                className={
                    "flex-1 md:flex-[0.85] lg:flex-[0.8] h-[calc(100vh-20px)] w-full overflow-hidden scroll-smooth " +
                    className
                }
            >
                <div className="h-16 w-full flex justify-start items-center gap-2 top-0 p-4 md:pl-4 z-40 bg-[rgba(66,66,66,0.3)] md:bg-transparent">
                    <h2 className="logo text-3xl block md:hidden flex-1">
                        {url === "" ? (
                            <Button
                                icon={faAngleLeft}
                                onClick={() => router.back()}
                                className="h-9 w-9 bg-transparent"
                            />
                        ) : (
                            "Vibe"
                        )}
                    </h2>
                    <Button
                        className="md:hidden h-9 w-9"
                        onClick={() => {}}
                        icon={faSearch}
                    />
                    <Button
                        className="md:hidden h-9 w-9"
                        onClick={() => {
                            router.push("/profile");
                        }}
                        image={data[3].image!}
                    />
                    <SearchInput className="hidden md:flex" />
                </div>
                <div className="px-4 w-full h-[78svh] md:h-[90%] pt-4 flex flex-col gap-8 last:pb-16 md:last:pb-24 overflow-y-auto overflow-x-hidden">
                    {children}
                </div>
            </div>
        </Loading>
    );
}
