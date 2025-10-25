const backgroundStyle: React.CSSProperties = {
  backgroundImage: 'url("/cosmic.svg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  minHeight: "100%",
  margin: 0,
  opacity: 0.8,
  padding: 0,
};
export default function Circle() {
  return (
    <div className=" min-w-screen min-h-screen bg-black ">
      <div
        className="  rounded-bl-full rounded-br-full mask-auto h-svh border-amber-50 m-10"
        style={backgroundStyle}
      >
      </div>
    </div>
  );
}
