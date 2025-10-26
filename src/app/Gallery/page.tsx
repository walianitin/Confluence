"use client";
import { useState, type CSSProperties } from "react";
import Card from "../components/GalleryCard";
const backgroundStyle: CSSProperties = {
  backgroundImage: 'url("/Evente_bg.svg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100vw",
  minHeight: "100vh",
  scale: "1",
  margin: 0,
  opacity: 0.8,
  padding: 0,
};
const data = [
  {
    title: "libas",
    content: "contene",
    image: "/adsfa",
    day: "day1",
    vector: "asd",
  },
  {
    title: "libas",
    content: "contene",
    image: "/adsfa",
    day: "day1",
    vector: "asd",
  },
  {
    title: "photog",
    content: "contene",
    image: "/adsfa",
    day: "day1",
    vector: "asd",
  },
  {
    title: "libas",
    content: "contene",
    image: "/adsfa",
    day: "day1",
    vector: "asd",
  },
  {
    title: "libas0",
    content: "contene",
    image: "/adsfa",
    day: "day1",
    vector: "asd",
  },
];
export default function Gallery() {
  const [index, setIndex] = useState(0);
  const size = data.length;

  const nextItem = () => {
    setIndex((prev) => (prev + 1) % size);
  };

  const prevItem = () => {
    setIndex((prev) => (prev - 1 + size) % size);
  };

  const goToIndex = (newIndex: number) => {
    setIndex(newIndex);
  };

  return (
    <>
      <div
        className="w-screen h-screen flex flex-col items-center justify-center "
        style={backgroundStyle}
      >
        {/* Gallery Card */}
        <Card
          title={data[index].title}
          content={data[index].content}
          image={data[index].image}
          day={data[index].day}
          vector={data[index].vector}
        />

        {/* Navigation Controls */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={prevItem}
            className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-lg hover:bg-white/30 transition-colors cursor-pointer"
          >
            Previous
          </button>

          <div className="flex gap-2 items-center">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => goToIndex(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextItem}
            className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-lg hover:bg-white/30 transition-colors cursor-pointer "
          >
            Next
          </button>
        </div>

        {/* Counter */}
        <div className="mt-4 text-white/80 ">
          {index + 1} / {size}
        </div>
      </div>
    </>
  );
}
