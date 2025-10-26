import "./card_styles.css";
import React, { useEffect, useState } from "react";
const Card = (props) => {
  const [eventLink, setEventLink] = useState(null);
  const extractLink = (description) => {
    // const regex = /https:\/\/[^\s\/]+\.com\/[^\s?]+\?\w+=\w+/;
    // const regex = /https?:\/\/[^\s"]+\.com\b/;
    const regex = /https?:\/\/[^\s"']+/g;

    const match = description.match(regex);
    setEventLink(match ? match[0] : null);
  };
  useEffect(() => {
    extractLink(props.description);
  }, []);
  return (
    <div className="card">
      <img src={props.image} alt="Event cover" className="event-card-image" />
      <div className="overlay">
        <h3 className="event-name uppercase">{props.eventName}</h3>
        <div className="details-container">
          {/* <p>{props.role}</p> */}
          {eventLink != null && (
            <a href={eventLink} target="blank">
              <button className="button-class">Register</button>
            </a>
          )}

          <div className="venue-club text-white">
            {props.venue != "" && (
              <p className="card-venue">Venue: {props.venue}</p>
            )}
            {props.clubName != "" && (
              <p className="card-club">{props.clubName}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
