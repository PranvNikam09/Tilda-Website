import React from "react";

const Colour = ({ setSelectedColor }) => {
  const colors = [
    "white",
    "black",
    "bluegrey",
    "graphitegrey",
    "pebble",
    "silvergrey",
    "stonegrey",
  ];

  return (
    <div>
      <ul className="list-group">
        {colors.map((color) => (
          <li
            type="button"
            className="list-group-item list-group-item-action"
            key={color}
            onClick={() => setSelectedColor(color)}
          >
            {color}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Colour;