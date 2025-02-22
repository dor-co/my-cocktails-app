import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { ICocktail, IForm } from "../../common/Types";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import TSInput from "../../components/TSInput";
import TSButton from "../../components/TSButton";
import { Modal } from "antd";
import TSForm from "../../components/TSForm";
import { useDispatch, useSelector } from "react-redux";
import { setCocktailsList, setNumOfResults } from "../../redux/cocktailSlice";
import { RootState } from "../../redux/store";

const Home: React.FC = () => {
  const [cocktails, setCocktails] = useState<ICocktail[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cocktailAddedText, setCocktailAddedText] = useState<string>("");
  const numOfItemsInPage = 8;
  const COCKTAILS_API_URL = import.meta.env.VITE_COCKTAILS_API_URL;
  const SEARCH_API_URL = import.meta.env.VITE_SEARCH_API_URL;
  const dispatch = useDispatch();
  const { numOfResults, cocktailsList } = useSelector(
    (state: RootState) => state.cocktail
  );

  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      try {
        const response = await axios.get<{ drinks: ICocktail[] }>(
          COCKTAILS_API_URL
        );

        const drinks = [
          ...JSON.parse(
            localStorage.getItem("cocktailsData") || "[]"
          ).reverse(),
          ...response.data.drinks,
        ];

        dispatch(setNumOfResults(drinks.length));
        dispatch(setCocktailsList(drinks));
        setCocktails(drinks.filter((_, i) => i < numOfItemsInPage));
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
      const response =
        searchValue.trim() === ""
          ? cocktailsList
          : cocktailsList.filter((x) =>
              x.strDrink.toLowerCase().includes(searchValue.toLowerCase())
            );

      dispatch(setNumOfResults(response.length));
      setCocktails(response.filter((_, i) => i < numOfItemsInPage));
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
      cocktailsList.filter(
        (_, i) =>
          currPage * numOfItemsInPage <= i &&
          i <= currPage * numOfItemsInPage + numOfItemsInPage - 1
      )
    );
    setPage(currPage);
  };

  const onSubmit = (values: IForm) => {
    const existingData = JSON.parse(
      localStorage.getItem("cocktailsData") || "[]"
    );
    const updatedData = [
      ...existingData,
      { ...values, idDrink: createDrinkId(), isAdded: true },
    ];
    localStorage.setItem("cocktailsData", JSON.stringify(updatedData));
    setCocktailAddedText("Cocktail added successfully!");
  };

  const createDrinkId = (): string => {
    let newId: string;
    do {
      newId = Math.floor(10000 + Math.random() * 90000).toString();
    } while (cocktailsList.some((drink) => drink.idDrink === newId));
    return newId;
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setCocktailAddedText("");
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
          onCancel={onCloseModal}
          footer={null}
        >
          <TSForm onSubmit={onSubmit} cocktailAddedText={cocktailAddedText} />
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
            totalPages={Math.floor(numOfResults / numOfItemsInPage)}
            onClick={onHandleChangePage}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
