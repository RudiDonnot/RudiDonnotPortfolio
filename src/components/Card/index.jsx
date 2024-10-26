import React, { useState, useEffect } from "react";
import "./style.css";

function Card({
  cardPosition,
  cardPositionmedium,
  cardPositionsmall,
  cardSrc,
  cardUrl,
  cardAlt,
  cardText,
}) {
  const [clicked, setClicked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [initialAnimation, setInitialAnimation] = useState(true);
  const [responsiveCardPosition, setResponsiveCardPosition] =
    useState(cardPosition);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 400) {
        setResponsiveCardPosition(cardPositionsmall);
      } else if (window.innerWidth <= 700) {
        setResponsiveCardPosition(cardPositionmedium);
      } else {
        setResponsiveCardPosition(cardPosition);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [cardPosition, cardPositionmedium, cardPositionsmall]);

  useEffect(() => {
    const timer = setTimeout(() => setInitialAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setClicked(!clicked);
    setShowOverlay(!showOverlay);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    window.open(cardUrl, "_blank");
  };

  const handleOverlayClick = () => {
    setClicked(false);
    setShowOverlay(false);
  };

  return (
    <>
      {showOverlay && (
        <div className="overlay" onClick={handleOverlayClick}></div>
      )}

      <article
        className={`card ${initialAnimation ? "initial-animation" : ""} ${
          clicked ? "clicked" : ""
        }`}
        style={{ gridArea: responsiveCardPosition }}
        onClick={handleClick}
      >
        <img src={cardSrc} alt={cardAlt} />
        {clicked && (
          <div className="buttontext">
            <p className="card-text">{cardText}</p>
            <button className="buttoncard" onClick={handleButtonClick}>
              Visiter le site en un clic
            </button>
          </div>
        )}
      </article>
    </>
  );
}

export default Card;
