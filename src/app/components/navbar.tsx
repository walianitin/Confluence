'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const navbarContent=[{
    name:"home",
    link:"/"
},{
    name:"Developers",
    link:"/Developers"
},{
    name:"Teams",
    link:"/Teams"
},{
    name:"Sponsors",
    link:"/Sponsors"
},{
    name:"Gallery",
    link:"/Gallery"
},{
    name:"events",
    link:"/events"
},]
export default function Navbar(){
        const router=useRouter();
    return <>
        <div className="bg-transparent  flex flex-row  text-shadow-white text-xl font-extralight cursor-pointer ">
            <div className='min-w-1/3 flex flex-row items-center justify-center pl-30' onClick={() => router.push('/')}>
                <Image src={"/conflu25White.png"} width={250} height={200} alt={"Asdf"} />            </div>
                    <div className="flex flex-row min-w-2/3 gap-5  justify-end items-center pr-20 ">
                        {navbarContent.map((e, idx) => (
                            <div key={e.name ?? idx} className="capitalize" onClick={()=>router.push(e.link)}>
                                {e.name}
                            </div>
                    ))}
                    </div>
        </div>
    </>
}