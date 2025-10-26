import React from "react";
import Footer from "../Footer/footer.jsx";
import CardsContainer from "./cards_container.jsx";
const event_bg = "https://res.cloudinary.com/dwuy4lzhb/image/upload/v1739126064/confluLogo-removebg-preview_jibrhe.png";
const Events = () => {
  return (
    <>
      <div className="bg-image events-sec">
        <div className="p-[1vw] flex flex-col justify-center items-center pt-16 lg:pt-0">
          <div className="page-head mt-12 lg:mt-32 m-[2vh]">
            Events
          </div>
          <div className="flex flex-col items-center">
            <img src={event_bg} alt="events" className="lg:w-3/5" />
          </div>
          <CardsContainer />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Events;
