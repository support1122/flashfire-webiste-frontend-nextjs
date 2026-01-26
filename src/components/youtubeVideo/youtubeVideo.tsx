"use client";
import { useState } from "react";
import { Play } from "lucide-react";

const shorts = [
    {
        id: 1,
        videoId: "r89JWWj7880",
       
    },
    {
        id: 2,
        videoId: "VyCPq7l4nh4",
       
    },
    {
        id: 3,
        videoId: "rR6SdGzDpKs",
      
    },
    {
        id: 4,
        videoId: "h9_U-5bQDJg",
       
    },
];

export default function YouTubeVideo() {
    const [playingId, setPlayingId] = useState<number | null>(null);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-extrabold mb-3 text-black">
                    Watch Flashfire <span className="text-[#F55D1D]">in Action</span>
                    </h2>
                    <p className="text-gray-600 text-lg font-semibold">
                    See how real users use Flashfire to land interviews faster and smarter.                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                    {shorts.map((short) => {
                        const isPlaying = playingId === short.id;

                        return (
                            <div
                                key={short.id}
                                className="relative w-[260px] h-[420px] rounded-2xl overflow-hidden shadow-xl bg-black"
                            >
                                {!isPlaying ? (
                                    <>
                                        {/* Thumbnail */}
                                        <div
                                            className="absolute inset-0 bg-center bg-cover"
                                            style={{
                                                backgroundImage: `url(https://img.youtube.com/vi/${short.videoId}/hqdefault.jpg)`,
                                                transform: "scale(1.4)",
                                            }}
                                        />


                                        {/* Play Overlay */}
                                        <button
                                            onClick={() => setPlayingId(short.id as number)}
                                            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition"
                                        >
                                            <div className="bg-white/90 p-3 rounded-full">
                                                <Play className="w-6 h-6 text-black" />
                                            </div>
                                        </button>

                                       
                                    </>
                                ) : (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${short.videoId}?autoplay=1`}
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
