import React from "react";
import "./style.scss";
import { IForm, IFormProps } from "../../common/Types";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TSInput from "../TSInput";
import TSButton from "../TSButton";

const TSForm: React.FC<IFormProps> = ({ onSubmit, cocktailAddedText }) => {
  return (
    <>
      {cocktailAddedText ? (
        <h2>{cocktailAddedText}</h2>
      ) : (
        <Formik<IForm>
          initialValues={{
            strDrink: "",
            strIngredient: "",
            strInstructions: "",
          }}
          validationSchema={Yup.object({
            strDrink: Yup.string().required("Cocktail name is required"),
            strIngredient: Yup.string().required(
              "Cocktail ingredients is required"
            ),
            strInstructions: Yup.string().required(
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
                  name="strDrink"
                  value={values.strDrink}
                  onChange={handleChange}
                  placeholder="Cocktail Name"
                />
                {errors.strDrink && touched.strDrink && (
                  <div className="error">{errors.strDrink}</div>
                )}
              </div>

              <div>
                <TSInput
                  name="strIngredient"
                  value={values.strIngredient}
                  onChange={handleChange}
                  placeholder="Cocktail Ingredients"
                />
                {errors.strIngredient && touched.strIngredient && (
                  <div className="error">{errors.strIngredient}</div>
                )}
              </div>

              <div>
                <TSInput
                  name="strInstructions"
                  value={values.strInstructions}
                  onChange={handleChange}
                  placeholder="Cocktail Instructions"
                />
                {errors.strInstructions && touched.strInstructions && (
                  <div className="error">{errors.strInstructions}</div>
                )}
              </div>

              <TSButton label="Add" htmlType="submit" />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default TSForm;
