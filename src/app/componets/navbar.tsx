'use client'
import { useRouter } from 'next/navigation';
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
        <div className="bg-transparent p-auto flex-row justify-center items-center text-shadow-white text-xl font-extralight mask-b-from-blue-100">
                    <div className="flex flex-row-1 gap-5 p-2 items-center justify-center">
                        {navbarContent.map((e, idx) => (
                            <div key={e.name ?? idx} className="capitalize" onClick={()=>router.push(e.link)}>
                                {e.name}
                            </div>
                    ))}
                    </div>
        </div>
    </>
}