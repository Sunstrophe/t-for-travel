// ExpSquare.jsx
import React from "react";

function ExpSquare({ image, position, className }) {
  const backgroundImage = image
    ? `url(${image})`
    : 'url("https://upload.wikimedia.org/wikipedia/commons/8/8f/Stockholm_city_hall_050701.jpg")';

  return (
    <div
      className={`border-2 border-black rounded-lg size-20 bg-cover ${className}`}
      style={{ backgroundImage }}
    >
    </div>
  );
}

export default ExpSquare;
