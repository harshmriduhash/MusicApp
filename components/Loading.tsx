import React from "react";

export default function Loading(props: {
    loading: boolean;
    children: React.ReactNode;
}) {
    return (
        <>
            {props.loading ? (
                <>
                    <div className="flex-[0.8] flex items-center justify-center h-full">
                        <img src="/loading.svg" alt="Loading" className="" />
                    </div>
                </>
            ) : (
                <>{props.children}</>
            )}
        </>
    );
}
