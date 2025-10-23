import Image from "next/image"

export default function Moon(){
    return (
        <div className=" skew-y-4">
            <Image src="/moon.svg" alt="moon" width={600} height={300} className="-translate-y-50"/>
        </div>
    )
}