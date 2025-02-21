import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { ICocktail } from "../../common/Types";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import Input from "../../components/Input";

const Home: React.FC = () => {
  const [cocktails, setCocktails] = useState<ICocktail[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const numOfItemsInPage = 8;

  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ drinks: ICocktail[] }>(
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
        );
        setTotalResults(response.data.drinks.length);
        setCocktails(
          response.data.drinks.filter(
            (_, i) =>
              page * numOfItemsInPage <= i &&
              i <= page * numOfItemsInPage + numOfItemsInPage - 1
          )
        );
      } catch (err) {
        setError("Failed to fetch cocktails");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, [page]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Input />
      <button>Search</button>
      <button>Add Cocktail</button>
      <div className="home-container">
        {cocktails.map((item) => {
          return (
            <Card
              strDrink={item.strDrink}
              strDrinkThumb={item.strDrinkThumb}
              idDrink={item.idDrink}
            />
          );
        })}

        <Pagination
          page={page}
          setPage={setPage}
          totalPages={Math.floor(totalResults / numOfItemsInPage)}
        />
      </div>
    </>
  );
};

export default Home;
