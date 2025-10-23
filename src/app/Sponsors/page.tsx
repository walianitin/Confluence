"use client "
import Spline from '@splinetool/react-spline/next';
import Navbar from '../components/navbar';
export default function Sponsors() {
  return (
    <div className='min-w-screen min-h-screen gap-10 p-2 m-3'>
            <Navbar></Navbar>
                <div className=' min-h-1/2 min-w-1/2 overscroll-none'>
            <Spline className=' scale-100 ' scene='https://prod.spline.design/kqxY240nDAWDqFSZ/scene.splinecode'/>   
                </div>
    </div>
  );
}
