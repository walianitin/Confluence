
import Fonts from "./Fonts";

export default function AstroAndFont() {
    return (
        <div className="flex flex-col  items-center justify-center gap-4">
            <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                        style={{
                            width: 340,
                            height: 340,
                            background:
                                'radial-gradient(circle at 50% 40%, rgba(173,216,255,0.85) 0%, rgba(120,170,255,0.45) 30%, rgba(80,120,200,0.12) 60%, transparent 75%)',
                            filter: 'blur(36px)',
                            transform: 'translateY(-6px) scale(1)'
                        }}
                        className="rounded-full opacity-80 "
                    />
                </div>   
                <div className="relative translate-y-25 rotate-2  " style={{
                   
                }}>
                    
     {/* <Image src="/astronaut.svg" alt="astronaut" width={200} height={200} className="" /> */}
                </div>
            </div>
                <Fonts></Fonts>
        </div>
    );
}