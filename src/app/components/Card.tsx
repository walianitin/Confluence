import Image from "next/image";
export default function Card() {
  return (
    <div className=" w-fit h-fit p-2 rounded-2xl">
      <div className=" bg-neutral-900 rounded-2xl">
        <Image src={"moon.svg"} height={300} width={300} alt="image" />
      </div>
      <div className="relative bg-white rounded-2xl text-left p-2  h-fit text-black text-2xl">
        {" "}
        Name
      </div>
      <div className="absolute text-purple-300 rounded-2xl bg-[radial-gradient(circle,_theme(colors.violet.900)_3%,_theme(colors.white)_100%)]">
        secratary-FineArts
      </div>
    </div>
  );
}
