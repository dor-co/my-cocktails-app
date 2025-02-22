import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import cocktailIcon from "../../assets/cocktail-icon.png";
import { IRecipe } from "../../common/Types";
import Loader from "../../components/Loader";
import "./style.scss";

const Recipe: React.FC = () => {
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const RECIPE_API_URL = import.meta.env.VITE_RECIPE_API_URL;
  const cocktailData = location.state?.cocktailItem;

  useEffect(() => {
    if (cocktailData.isAdded) {
      setRecipe(cocktailData);
      setLoading(false);
    } else {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get<{ drinks: IRecipe[] }>(
            `${RECIPE_API_URL}${id}`
          );
          setRecipe(response.data.drinks[0]);
        } catch (err) {
          setError("Failed to fetch recipe");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchRecipe();
    }
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className="recipe-container">
      <h1>{recipe?.strDrink}</h1>
      <div className="recipe-details">
        <div>
          <p>
            <strong>Ingredients: </strong>
            {recipe &&
              Object.keys(recipe)
                .filter((key) => key.startsWith("strIngredient"))
                .map((key) => recipe[key as keyof IRecipe])
                .filter((ingredient) => ingredient)
                .join(", ")}
          </p>
          <br />
          <p>
            <strong>Recipe: </strong>
            {recipe?.strInstructions}
          </p>
        </div>
        <img src={recipe?.strDrinkThumb || cocktailIcon} />
      </div>
    </div>
  );
};

export default Recipe;
