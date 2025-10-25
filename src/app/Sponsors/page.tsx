"use client "
import Spline from '@splinetool/react-spline/next';
import Navbar from '../components/navbar';
export default function Sponsors() {
  return (
    <div className='h-screen w-screen gap-10 p-2 m-3 flex flex-col' >
            <Navbar></Navbar>
                <div className='h-full w-full flex flex-row items-center justify-center'>
                  <Spline className=' scale-100 ' scene='https://prod.spline.design/kqxY240nDAWDqFSZ/scene.splinecode'/>   
                </div>
    </div>
  );
}
