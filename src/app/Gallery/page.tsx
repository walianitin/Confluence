"use client";
import { useState } from "react";
import Card from "../components/GalleryCard";
import { contentContainerClass } from "../components/layoutTokens";

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
    <div className="flex min-h-screen w-full items-center justify-center">
      <div
        className={`${contentContainerClass} flex flex-col items-center justify-center gap-6`}
      >
        <h1 className="mb-12 text-center text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Gallery
        </h1>

        <Card
          title={data[index].title}
          content={data[index].content}
          image={data[index].image}
          day={data[index].day}
          vector={data[index].vector}
        />

        <div className="flex items-center gap-4">
          <button
            onClick={prevItem}
            className="cursor-pointer rounded-lg bg-white/20 px-4 py-2 text-white transition-colors hover:bg-white/30"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => goToIndex(i)}
                className={`h-3 w-3 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextItem}
            className="cursor-pointer rounded-lg bg-white/20 px-4 py-2 text-white transition-colors hover:bg-white/30"
          >
            Next
          </button>
        </div>

        <div className="text-white/80">
          {index + 1} / {size}
        </div>
      </div>
    </div>
  );
}
