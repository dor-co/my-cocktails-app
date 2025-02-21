export interface ICocktail {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

export interface IRecipe {
  strInstructions: string;
  strDrink: string;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
}

export interface IPagination {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}
