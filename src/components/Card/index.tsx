import React from "react";
import cocktailIcon from "../../assets/cocktail-icon.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ICocktail } from "../../common/Types";
import { RootState } from "../../redux/store";
import "./style.scss";
const Card: React.FC<ICocktail> = ({ strDrink, strDrinkThumb, idDrink }) => {
  const { cocktailsList } = useSelector((state: RootState) => state.cocktail);
  const cocktailItem = cocktailsList.find((x) => x.idDrink === idDrink);

  return (
    <Link
      to={`/Recipe?id=${idDrink}`}
      className="card-container"
      state={{ cocktailItem }}
    >
      <img className="image" src={strDrinkThumb || cocktailIcon} />
      <h2 className="title">{strDrink}</h2>
    </Link>
  );
};

export default Card;
