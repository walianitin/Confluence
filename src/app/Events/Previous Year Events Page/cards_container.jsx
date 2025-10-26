import React, { useEffect, useState } from "react";
import Card from "./card";
import "./cards_container_styles.css";
import eventsActions from "../../actions/events.Actions";
import { clubNames } from "../../assets/constants/clubs";
import Lottie from "lottie-react";
const animationData =
  "https://lottie.host/embed/30b8f987-00e6-40c6-bf89-fb26c438247e/2RqES0n1ZW.json";

const CardsContainer = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState("Select a Club");
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (club) => {
    setSelectedClub(club);
    setIsOpen(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (selectedClub != "Select a Club") fetch1(selectedClub);
  }, [selectedClub]);

  const fetch = () => {
    let text = "";
    eventsActions.getEvent(text, (err, res) => {
      if (err) {
        console.log("Error: ", err);
      } else {
        setEvents(res.data);
        setLoading(false);
      }
    });
  };
  const fetch1 = (text) => {
    setLoading(true);
    eventsActions.Search(text, (err, res) => {
      if (err) {
        console.log("Error: ", err);
      } else {
        setEvents(res.data);
        setLoading(false);
      }
    });
  };
  return (
    <div className="mt-24 flex flex-col gap-4 w-full lg:px-32">
      <div className="relative flex justify-end">
        <div
          className={
            "lg:w-[20vw] w-full flex justify-between items-center bg-white bg-opacity-20 backdrop-blur-md border border-white rounded-lg p-2 text-white cursor-pointer"
          }
          onClick={toggleDropdown}
        >
          <span className="text-white">{selectedClub}</span>
          <svg
            className={`w-4 h-4 text-white ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 9l6 6 6-6"
            />
          </svg>
        </div>
        {isOpen && (
          <ul
            className={
              "absolute h-[200px] overflow-y-scroll mt-1 lg:w-[20vw] w-full bg-white bg-opacity-20 backdrop-blur-md border border-white rounded-lg z-10 top-[40px]"
            }
          >
            {clubNames.map((club) => (
              <li
                key={club}
                className="text-white bg-transparent hover:bg-white hover:bg-opacity-10 p-2 cursor-pointer"
                onClick={() => handleSelect(club)}
              >
                {club}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedClub != "Select a Club" ? (
        <div className="text-center font-roc text-4xl lg:text-6xl text-white mt-4">
          {selectedClub}
        </div>
      ) : (
        <></>
      )}
      {loading ? (
        <div className="flex items-center justify-center">
          <img src="/loader.gif" alt="loader" />
        </div>
      ) : events.length === 0 ? (
        <div className="flex items-center justify-center">
          <iframe
            src="https://lottie.host/embed/30b8f987-00e6-40c6-bf89-fb26c438247e/2RqES0n1ZW.json"
            width="500"
            height="500"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="cards-container">
          {events.map((event) => (
            <Card
              key={event._id}
              className="event-card"
              eventName={event.eventName}
              description={event.description}
              venue={event.venue}
              image={event.image || "https://res.cloudinary.com/dwuy4lzhb/image/upload/v1739121021/placeholder1_its26m.png"}
              clubName={event.clubName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardsContainer;
