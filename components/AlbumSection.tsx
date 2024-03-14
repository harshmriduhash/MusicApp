import Album from "./Album";
export default function AlbumSection(props: {
    name: string;
    data: Array<any>;
    type: Number;
}) {
    return (
        <>
            <div className="w-full">
                <div className="flex justify-between w-full pb-4">
                    <h1 className="font-bold text-xl text-[#dcdcdc]">
                        {props.name}
                    </h1>
                </div>
                <div
                    className={`md:w-[94%] ${
                        props.type == 1 ? "custom-grid-1" : "custom-grid"
                    }`}
                >
                    {props.data?.map((item, index) => (
                        <Album
                            name={item.name}
                            cover={item.cover}
                            artist={item.artist}
                            src={item.src}
                            playlist={item.playlist}
                            _id={item._id}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
