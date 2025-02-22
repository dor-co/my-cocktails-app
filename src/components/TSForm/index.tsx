import React from "react";
import "./style.scss";
import { IForm, IFormProps } from "../../common/Types";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TSInput from "../TSInput";
import TSButton from "../TSButton";

const TSForm: React.FC<IFormProps> = ({ onSubmit }) => {
  return (
    <Formik<IForm>
      initialValues={{
        cocktailName: "",
        cocktailIngredients: "",
        cocktailInstructions: "",
      }}
      validationSchema={Yup.object({
        cocktailName: Yup.string().required("Cocktail name is required"),
        cocktailIngredients: Yup.string().required(
          "Cocktail ingredients is required"
        ),
        cocktailInstructions: Yup.string().required(
          "Cocktail Instructions is required"
        ),
      })}
      onSubmit={(values: IForm, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ values, errors, handleChange, touched }) => (
        <Form className="form-container">
          <div>
            <TSInput
              name="cocktailName"
              value={values.cocktailName}
              onChange={handleChange}
              placeholder="Cocktail Name"
            />
            {errors.cocktailName && touched.cocktailName && (
              <div className="error">{errors.cocktailName}</div>
            )}
          </div>

          <div>
            <TSInput
              name="cocktailIngredients"
              value={values.cocktailIngredients}
              onChange={handleChange}
              placeholder="Cocktail Ingredients"
            />
            {errors.cocktailIngredients && touched.cocktailIngredients && (
              <div className="error">{errors.cocktailIngredients}</div>
            )}
          </div>

          <div>
            <TSInput
              name="cocktailInstructions"
              value={values.cocktailInstructions}
              onChange={handleChange}
              placeholder="Cocktail Instructions"
            />
            {errors.cocktailInstructions && touched.cocktailInstructions && (
              <div className="error">{errors.cocktailInstructions}</div>
            )}
          </div>

          <TSButton label="Add" htmlType="submit" />
        </Form>
      )}
    </Formik>
  );
};

export default TSForm;
