"use client";
import React, { useEffect, useState } from "react";
import { FaBasketballBall } from "react-icons/fa";
const TitleComponent = () => {
  const [showBall, setShowBall] = useState(true);
  //   useEffect(() => {
  //     // Hide the ball after the animation completes
  //     const timer = setTimeout(() => setShowBall(false), 3000);
  //     return () => clearTimeout(timer);
  //   }, []);
  return (
    <h1 className="text-4xl mt-10 font-bold text-white flex flex-row min-w-full items-center">
      Watch&Track
      {showBall && <FaBasketballBall className="basketball" />}
    </h1>
  );
};

export default TitleComponent;
