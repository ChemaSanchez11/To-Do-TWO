import React, { useState } from "react";
import { useForm } from "react-hook-form";

const FormLogin = () => {
  const [entradas, setEntradas] = useState([]);

  const {register,handleSubmit,formState:{ errors } } = useForm();
  // register pasa todos los nombres del formulario y las restricciones.

  const onSubmit = (data, e) => {
    console.log(data);
    // Limpiamos los componentes
    e.target.reset();
    // Guardamos en entradas lo de entradas + data
    setEntradas([...entradas, data]);
    console.log(entradas);
    // muestra el anterior ya que pinta el componente despues de esto ; es diferido
  };

  return (
    <div className="container my-5">
      <h2 className="mb-3">Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <input
          placeholder="Ingrese nombre de usuario..."
          className="form-control mb-2"
          name="username"
          {
            // Los pone los valores del array alineados. Los pondrá como propiedades
            ...register("username", {
              required: { value: "true", message: "Campo username requerido" },
            })
          }
        />
        <span className="text-danger text-small d-bloc mb-2">
            {errors?.username?.message}
            {/* Hay errores? es del campo username? muestralo */}
        </span>
        <input
          type="password"
          placeholder="Ingrese contraseña..."
          className="form-control mb-2"
          name="password"
          {
            // Los pone los valores del array alineados. Los pondrá como propiedades
            ...register("password", {
              required: { value: "true", message: "Campo password requerido" },
              minLength: 4,
            })
          }
        />
        <span className="text-danger text-small d-bloc mb-2">
            {errors?.username?.message}
            {/* Hay errores? es del campo username? muestralo */}
        </span>
        <button type="submit" className="btn btn-primary mt-4">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
