import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICocktail, ICocktailState } from "../common/Types";

const initialState: ICocktailState = {
  cocktailsList: [],
  numOfResults: 0,
};

const cocktailSlice = createSlice({
  name: "cocktail",
  initialState,
  reducers: {
    setCocktailsList: (state, action: PayloadAction<ICocktail[]>) => {
      state.cocktailsList = action.payload;
    },
    setNumOfResults: (state, action: PayloadAction<number>) => {
      state.numOfResults = action.payload;
    },
  },
});

export const { setCocktailsList, setNumOfResults } = cocktailSlice.actions;
export default cocktailSlice.reducer;
