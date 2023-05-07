import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";

import type { Dish } from "../../redux/foodSlice";
import { addDish } from "../../api/api";
import styles from "./Form.module.scss";
import TimePickerComponent from "./TimePickerComponent";
import NotificationToast from "./NotificationToast";
import Loader from "../Loader/Loader";

const Form = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Dish>();

  const onSubmit: SubmitHandler<Dish> = async (formData) => {
    try {
      setLoading(true);
      await addDish(formData, dispatch);
      reset();
      toast.success("Dish added");
    } catch (error: any) {
      for (const key in error) {
        toast.error(`${key}: ${error[key]}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChange = (newValue: Date | null) => {
    if (newValue !== null) {
      const parsedTime = parseISO(newValue.toISOString());
      const formattedTime = format(parsedTime, "HH:mm:ss");
      setValue("preparation_time", formattedTime);
    }
  };

  const clearProperties = (dishType: string) => {
    if (dishType === "pizza") {
      setValue("spiciness_scale", undefined);
      setValue("slices_of_bread", undefined);
    } else if (dishType === "soup") {
      setValue("diameter", undefined);
      setValue("slices_of_bread", undefined);
      setValue("no_of_slices", undefined);
    } else if (dishType === "sandwich") {
      setValue("diameter", undefined);
      setValue("spiciness_scale", undefined);
      setValue("no_of_slices", undefined);
    }
  };

  const dishType = watch("type");
  clearProperties(dishType);

  return (
    <div className={styles.container}>
      <NotificationToast />
      {loading && <Loader />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.form__title}>ADD DISH</h1>
        <label>
          <div className={styles.form__input_box}>
            <input
              type='name'
              className={styles.form__input}
              required
              {...register("name", { required: true })}
            />
            <span>Name</span>
          </div>
          {errors.name && (
            <p className={styles.form__error}>Enter a valid name</p>
          )}
        </label>
        <TimePickerComponent handleTimeChange={handleTimeChange} />
        <label>
          <div className={styles.form__input_box}>
            <select
              placeholder='type'
              className={styles.form__select}
              required
              {...register("type", { required: true })}
            >
              <option></option>
              <option value='pizza'>Pizza</option>
              <option value='soup'>Soup</option>
              <option value='sandwich'>Sandwich</option>
            </select>
            <span>Select type</span>
          </div>
          {errors.type && (
            <p className={styles.form__error}>Enter a valid type</p>
          )}
        </label>

        {dishType === "pizza" && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.form__input_box}>
              <input
                className={styles.form__input}
                type='number'
                min={1}
                {...register("no_of_slices", { required: true, min: 1 })}
                required
              />
              <span>Number of Slices:</span>
              {errors.no_of_slices && (
                <p className={styles.form__error}>
                  This field is required and should be greater than 0
                </p>
              )}
            </div>

            <div className={styles.form__input_box}>
              <input
                className={styles.form__input}
                type='number'
                step='0.1'
                min={0.1}
                {...register("diameter", {
                  required: true,
                  min: 0.1,
                })}
                required
              />
              <span>Diameter:</span>

              {errors.diameter && (
                <p className={styles.form__error}>
                  This field is required and should be greater than 0.1
                </p>
              )}
            </div>
          </motion.div>
        )}

        {dishType === "soup" && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.form__input_box}
          >
            <input
              className={styles.form__input}
              {...register("spiciness_scale", {
                required: true,
                max: 10,
                min: 1,
              })}
              required
              type='number'
              max={10}
              min={1}
            />
            <span>Spiciness Scale:</span>

            {errors.spiciness_scale && (
              <p className={styles.form__error}>
                This field is required and should be between 1-10
              </p>
            )}
          </motion.div>
        )}

        {dishType === "sandwich" && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.form__input_box}
          >
            <input
              type='number'
              className={styles.form__input}
              min={1}
              {...register("slices_of_bread", { required: true, min: 1 })}
              required
            />
            <span>Number of Slices of Bread:</span>

            {errors.slices_of_bread && (
              <p className={styles.form__error}>
                This field is required and should be greater than 0
              </p>
            )}
          </motion.div>
        )}

        <button className={styles.form__submit}>Submit</button>
      </form>
    </div>
  );
};

export default Form;
