import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Dish {
  id?: number;
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}

interface FoodState {
  list: Dish[];
}

const initialState: FoodState = {
  list: [],
};

export interface RootState {
  food: {
    list: Dish[];
  };
}

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Dish>) => {
      const id = state.list.length;
      const payloadWithId = { ...action.payload, id };
      state.list.push(payloadWithId);
    },
  },
});

export const foodActions = foodSlice.actions;
