import React from "react";
import { ICocktail } from "../../common/Types";
import "./style.scss";

const Card: React.FC<ICocktail> = ({ strDrink, strDrinkThumb, idDrink }) => {
  return (
    <a href={`/Recipe?id=${idDrink}`} className="card-container">
      <img className="image" src={strDrinkThumb} />
      <h2 className="title">{strDrink}</h2>
    </a>
  );
};

export default Card;
