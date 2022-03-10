import React from "react";

import "./Card.scss";

const Card = (props) => {
  const { card } = props;
  return (
    <>
      <li className="card-item">
        {card.cover && <img
          src={card.cover}
          alt="cover"
        />}
        {card.title}
      </li>
    </>
  );
};

export default React.memo(Card);
