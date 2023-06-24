import React from "react";

const Header = ({ name, title }) => {
  return (
    <div>
      <p>{title}</p>
      <h2>{name}</h2>
    </div>
  );
};

export default Header;
