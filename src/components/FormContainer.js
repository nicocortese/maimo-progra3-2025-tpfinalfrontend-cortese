"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import { usePageContext } from "@/contexts/PageContext";

function validateName(value) {
  if (!value) return "El nombre es requerido";
}
function validateSurname(value) {
  if (!value) return "El apellido es requerido";
}
function validateEmail(value) {
  if (!value) return "El email es requerido";
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
    return "Email inválido";
}

export const FormContainer = ({ showModal }) => {
  const { favorites, createOrder } = usePageContext();

  const handleSubmitForm = async (values, { resetForm }) => {
    if (favorites.length === 0) {
      showModal("Agrega al menos un favorito antes de finalizar");
      return;
    }

    const orderData = {
      order: { 
        name: values.name,
        surname: values.surname,
        email: values.email,
      },
      favorites,
    };

    try {
      await createOrder(orderData);
      resetForm();
      showModal("¡Registro finalizado con tus favoritos!");
    } catch (error) {
      showModal("Error al guardar el registro. Intenta nuevamente");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#272727] p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-[#DAC07D] text-center uppercase">
          Datos del participante
        </h2>

        <Formik
          initialValues={{ name: "", surname: "", email: "" }}
          onSubmit={handleSubmitForm}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm mb-2 font-semibold text-[#FEFCF4]">
                  Nombre
                </label>
                <Field
                  name="name"
                  validate={validateName}
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
                  className="w-full px-4 py-3 rounded-lg bg-[#dac07d] border border-[#726540] focus:border-[#FEFCF4] focus:outline-none text-[#FEFCF4]"
                />
                {errors.surname && touched.surname && (
                  <div className="text-[#fefcf4] text-sm mt-1">{errors.surname}</div>
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
                  className="w-full px-4 py-3 rounded-lg bg-[#dac07d] border border-[#726540] focus:border-[#FEFCF4] focus:outline-none text-[#FEFCF4]"
                />
                {errors.email && touched.email && (
                  <div className="text-[#fefcf4] text-sm mt-1">{errors.email}</div>
                )}
              </div>

              <button
                type="submit"
                className="mt-6 bg-[#726540] hover:bg-[#DAC07D] text-[#FEFCF4] font-bold py-3 rounded-lg text-lg transition-transform duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
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
