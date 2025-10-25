

interface inputProps {
  title: string;
  content: string;
  image: string;
  vector: string;
  day: string;
}

export default function Card(Props: inputProps) {
  return (
    <>
      <div className="flex flex-row  w-4/5 h-4/5 items-center justify-center gap-15 pl-30 pr-30 ">
        {/* Left Column */}
        <div className="w-1/4 h-4/5 backdrop-blur-xs border-0 border-sky-700 bg-transparent flex flex-col justify-center items-center gap-12">
          <div
            className="w-full h-[30%] border-1 rounded-2xl flex justify-center items-center"
            style={{
              backgroundImage: "url(/Gallery/Title_bg.jpg)",
              scale: 1,
              opacity: 0.8,
              backgroundSize: "cover",
              backgroundPosition: "center", // or 'top left', 'bottom right', etc.
              backgroundRepeat: "no-repeat",
            }}
          >
            {Props.title}
          </div>
          <div className="w-full h-[68%] border-1 rounded-2xl flex justify-center items-center"     style={{
                backgroundImage: "url(/Gallery/Day_bg.svg)",
                backgroundSize: "cover",
                backgroundPosition: "center", // or 'top left', 'bottom right', etc.
                backgroundRepeat: "no-repeat",
              }}>
            {Props.content}
          </div>
        </div>
        {/* Right Column */}
        <div className="w-3/4 h-4/5 backdrop-blur-xs border-0 border-sky-700 bg-transparent flex flex-row gap-12 ">
          <div
            className="w-4/5 h-full border-2
       rounded-2xl flex justify-center items-center"
          >
            {Props.image}
          </div>
          <div className="w-3/4 h-full rounded-2xl flex flex-col justify-center items-center gap-10">
            <div
              className="w-full h-1/5 border-2 rounded-2xl"
              style={{
                backgroundImage: "url(/Gallery/Day_bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center", // or 'top left', 'bottom right', etc.
                backgroundRepeat: "no-repeat",
              }}
            >
              {Props.day}
            </div>
            <div className="w-full h-4/5 border-2 rounded-2xl">
              {Props.vector}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
