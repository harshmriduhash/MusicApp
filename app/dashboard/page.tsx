"use client";
import AlbumSection from "@/components/AlbumSection";
import { SearchInput } from "@/components/UiElements";
import { useMusicController } from "@/hooks/useMusicController";
import { useEffect } from "react";
import data from "@/config/songs.json";
import MainDashboardLayout from "@/components/MainDashboardLayout";
let data2 = data;
let data3 = data.slice(-5, );

export default function DashboardLayout() {
    let MusicController = useMusicController();
    useEffect(() => {
        MusicController.init(data2);
    }, []);
    return (
        <>
            <MainDashboardLayout>
                <AlbumSection name="Continue listening" data={data} type={1} />
                <AlbumSection name="Continue listening" data={data2} type={2} />
                <AlbumSection name="Continue listening" data={data3} type={2} />
            </MainDashboardLayout>
        </>
    );
}
