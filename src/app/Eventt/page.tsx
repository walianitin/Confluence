import React from 'react'
import EventSection from '@/app/Eventt/components/section'
import Navbar from '@/app/components/navbar'
export default function page() {
  return (
    <div>
      <Navbar></Navbar>
      <EventSection
        planetSvg="/moon.svg"
        eventName="Photography"
        eventDescription="Capture the world through your lens! Join our Photography event to showcase your skills and creativity. Open to all levels, from beginners to pros."
        eventImage="/libas.jpg"
      />
               <EventSection
        planetSvg="/moon.svg"
        eventName="Photography"
        eventDescription="Capture the world through your lens! Join our Photography event to showcase your skills and creativity. Open to all levels, from beginners to pros."
        eventImage="/libas.jpg"
      />
               <EventSection
        planetSvg="/moon.svg"
        eventName="Photography"
        eventDescription="Capture the world through your lens! Join our Photography event to showcase your skills and creativity. Open to all levels, from beginners to pros."
        eventImage="/libas.jpg"
      />
            
      
    </div>
  )
}
