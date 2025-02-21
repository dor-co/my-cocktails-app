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
  totalPages: number;
  onClick: (value: number) => void;
}

export interface IButton {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  htmlType?: "submit" | "button" | "reset";
}

export interface IInput {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
}

export interface IForm {
  cocktailName: string;
  cocktailIngredients: string;
  cocktailInstructions: string;
}
