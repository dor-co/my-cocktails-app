import React from "react";
import { ICocktail } from "../../common/Types";
import "./style.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Card: React.FC<ICocktail> = ({ strDrink, strDrinkThumb, idDrink }) => {
  const { cocktailsList } = useSelector((state: RootState) => state.cocktail);
  const cocktailItem = cocktailsList.filter((x) => x.idDrink === idDrink)[0];

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
