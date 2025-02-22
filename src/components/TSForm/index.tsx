import React, { useState } from "react";
import "./style.scss";
import { IForm, IFormProps } from "../../common/Types";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TSInput from "../TSInput";
import TSButton from "../TSButton";

const TSForm: React.FC<IFormProps> = ({ onSubmit, cocktailAddedText }) => {
  const [imageName, setImageName] = useState<string>("");

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
            strDrinkThumb: "",
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
          {({ values, errors, handleChange, touched, setFieldValue }) => (
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

              <div>
                <input
                  type="file"
                  id="file"
                  name="strDrinkThumb"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageName(file.name);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFieldValue("strDrinkThumb", reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label className="file-label" htmlFor="file">
                  {imageName ? imageName : "Upload Cocktail Image"}
                </label>
                {errors.strDrinkThumb && touched.strDrinkThumb && (
                  <div className="error">{errors.strDrinkThumb}</div>
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
