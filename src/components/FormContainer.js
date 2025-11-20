"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import { usePageContext } from "@/contexts/PageContext";

// Validaciones simplificadas
function validateName(value) {
  let error;
  if (!value) error = "El nombre es requerido";
  return error;
}

function validateSurname(value) {
  let error;
  if (!value) error = "El apellido es requerido";
  return error;
}

function validateEmail(value) {
  let error;
  if (!value) {
    error = "El email es requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    error = "Email inválido";
  }
  return error;
}

export const FormContainer = () => {
  const { addFavorite } = usePageContext();

  const handleAddFavorite = async (values, { resetForm }) => {
    await addFavorite({
      name: values.name,
      discipline: values.surname,
      image: "https://via.placeholder.com/150", // placeholder
    });
    resetForm();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#272727] p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-[#DAC07D] text-center uppercase">
          Datos del comprador
        </h2>

        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
          }}
          onSubmit={handleAddFavorite}
        >
          {({ errors, touched, values }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm mb-2 font-semibold text-[#FEFCF4]">
                  Nombre
                </label>
                <Field
                  name="name"
                  validate={validateName}
                  value={values.name || ""}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#dac07d] border border-[#726540] focus:border-[#FEFCF4] focus:outline-none text-[#FEFCF4]"
                />
                {errors.name && touched.name && (
                  <div className="text-[#fefcf4] text-sm mt-1">{errors.name}</div>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2 font-semibold text-[#FEFCF4]">
                  Apellido
                </label>
                <Field
                  name="surname"
                  validate={validateSurname}
                  value={values.surname || ""}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#dac07d] border border-[#726540] focus:border-[#FEFCF4] focus:outline-none text-[#FEFCF4]"
                />
                {errors.surname && touched.surname && (
                  <div className="text-r[#fefcf4] text-sm mt-1">{errors.surname}</div>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2 font-semibold text-[#FEFCF4]">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  validate={validateEmail}
                  value={values.email || ""}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#dac07d] border border-[#726540] focus:border-[#FEFCF4] focus:outline-none text-[#FEFCF4]"
                />
                {errors.email && touched.email && (
                  <div className="text-[#fefcf4] text-sm mt-1">{errors.email}</div>
                )}
              </div>

              <button
                type="submit"
                className="cursor-pointermt-6 bg-[#726540] hover:bg-[#DAC07D] text-[#FEFCF4] font-bold py-3 rounded-lg text-lg transition-transform duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                Finalizar inscripción
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
