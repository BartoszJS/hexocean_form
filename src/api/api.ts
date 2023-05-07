import { foodActions, Dish } from "../redux/foodSlice";
import { Dispatch } from "redux";

const API_URL =
  "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/";

export const addDish = async (
  formData: Dish,
  dispatch: Dispatch
): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      dispatch(foodActions.add(responseData));
    } else {
      const errorData = await response.json();
      console.error(errorData);
      throw errorData;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
