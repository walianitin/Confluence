import React from 'react'
import EventSection from '../components/Eventsection'
import Navbar from '@/app/components/navbar'
export default function page() {
  return (
    <div style={{
      backgroundImage: `url('/bg2.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      width: '100%',  

     }} className='flex flex-col gap-10 p-2 m-auto items-center justify-center'>
      <Navbar></Navbar>
      <EventSection
        eventName="Photography"
        eventDescription="Capture the world through your lens! Join our Photography event to showcase your skills and creativity. Open to all levels, from beginners to pros."
        eventImage="/libas.jpg"
      />
               <EventSection
       
        eventName="Photography"
        eventDescription="Capture the world through your lens! Join our Photography event to showcase your skills and creativity. Open to all levels, from beginners to pros."
        eventImage="/libas.jpg"
      />
               <EventSection
     
        eventName="Photography"
        eventDescription="Capture the world through your lens! Join our Photography event to showcase your skills and creativity. Open to all levels, from beginners to pros."
        eventImage="/libas.jpg"
      />
                     <EventSection
       
        eventName="Photography"
        eventDescription="Capture the world through your lens! Join our Photography event to showcase your skills and creativity. Open to all levels, from beginners to pros."
        eventImage="/libas.jpg"
      />
                           <EventSection
      
        eventName="Photography"
        eventDescription="Capture the world through your lens! Join our Photography event to showcase your skills and creativity. Open to all levels, from beginners to pros."
        eventImage="/libas.jpg"
      />
                     <EventSection
       
        eventName="Photography"
        eventDescription="Capture the world through your lens! Join our Photography event to showcase your skills and creativity. Open to all levels, from beginners to pros."
        eventImage="/libas.jpg"
      />
            
            
            
      
    </div>
  )
}
