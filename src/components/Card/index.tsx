import React from "react";
import { ICocktail } from "../../common/Types";
import "./style.scss";
import { Link } from "react-router-dom";

const Card: React.FC<ICocktail> = ({
  strDrink,
  strDrinkThumb,
  idDrink,
  cocktailItem,
}) => {
  return (
    <Link
      to={`/Recipe?id=${idDrink}`}
      className="card-container"
      state={{ cocktailItem }}
    >
      <img className="image" src={strDrinkThumb} />
      <h2 className="title">{strDrink}</h2>
    </Link>
  );
};

export default Card;
