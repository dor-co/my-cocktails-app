import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { ICocktail, IForm } from "../../common/Types";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import TSInput from "../../components/TSInput";
import TSButton from "../../components/TSButton";
import { Modal } from "antd";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TSForm from "../../components/TSForm";

const Home: React.FC = () => {
  const [cocktails, setCocktails] = useState<ICocktail[]>([]);
  const [allCocktails, setAllCocktails] = useState<ICocktail[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const numOfItemsInPage = 8;
  const COCKTAILS_API_URL = import.meta.env.VITE_COCKTAILS_API_URL;
  const SEARCH_API_URL = import.meta.env.VITE_SEARCH_API_URL;

  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ drinks: ICocktail[] }>(
          COCKTAILS_API_URL
        );
        setTotalResults(response.data.drinks.length);
        setAllCocktails(response.data.drinks);
        setCocktails(
          response.data.drinks.filter((_, i) => i < numOfItemsInPage)
        );
      } catch (err) {
        setError("Failed to fetch cocktails");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, []);

  const onHandleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSearch = async () => {
    setPage(0);
    setLoading(true);
    try {
      const response = await axios.get<{ drinks: ICocktail[] }>(
        `${SEARCH_API_URL}${searchValue}`
      );
      setTotalResults(response.data.drinks.length);
      setAllCocktails(response.data.drinks);
      setCocktails(response.data.drinks.filter((_, i) => i < numOfItemsInPage));
    } catch (err) {
      setError("Failed to fetch search cocktails");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onHandleChangePage = (value: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const currPage = page + value;

    setCocktails(
      allCocktails.filter(
        (_, i) =>
          currPage * numOfItemsInPage <= i &&
          i <= currPage * numOfItemsInPage + numOfItemsInPage - 1
      )
    );
    setPage(currPage);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="actions-container">
        <div className="search-container">
          <TSInput
            value={searchValue}
            onChange={onHandleChangeSearch}
            placeholder="Cocktail name..."
          />
          <TSButton label="Search" onClick={onSearch} />
        </div>
        <TSButton
          label="Add Cocktail"
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
        <Modal
          title="Add Cocktail"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <TSForm />
        </Modal>
      </div>
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

        <div className="pagination-container">
          <Pagination
            page={page}
            totalPages={Math.floor(totalResults / numOfItemsInPage)}
            onClick={onHandleChangePage}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
