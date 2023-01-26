import React, { useState } from "react";
import { useForm } from "react-hook-form";

const FormRegister = () => {
    const [entradas, setEntradas] = useState([]);
    
    const {register,handleSubmit,formState:{ errors } } = useForm();
    // register pasa todos los nombres del formulario y las restricciones.
    
    const onSubmit = (data,e) => {
        console.log(data);
        // Limpiamos los componentes
        e.target.reset();
        // Guardamos en entradas lo de entradas + data
        setEntradas([...entradas,data]);
        console.log(entradas);
        // muestra el anterior ya que pinta el componente despues de esto ; es diferido
    }

  return (
    <div className="container my-5">
      <h2 className="mb-3">Registro</h2>
      <form  onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <input
          placeholder="Ingrese nombre de usuario..."
          className="form-control mb-2"
          name="username"
          {
            // Los pone los valores del array alineados. Los pondrá como propiedades
            ...register("username",
            {
                required : {value:"true", message: "Campo username requerido"}
            }
            )
          }
        />
        <input
          placeholder="Ingrese correo..."
          className="form-control mb-2"
          name="email"
          {
            // Los pone los valores del array alineados. Los pondrá como propiedades
            ...register("email",
            {
                required : {value:"true", message: "Campo username requerido"},
                pattern : {value : /^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,4}$/i , message: "Campo email no valido"}
            }
            )
          }
        />
        <span className="text-danger text-small d-bloc mb-2">
            {errors?.email?.message}
            {/* Hay errores? es del campo username? muestralo */}
        </span>
        <input
          type="password"
          placeholder="Ingrese contraseña..."
          className="form-control mb-2"
          name="password"
          {
            // Los pone los valores del array alineados. Los pondrá como propiedades  
            ...register("password",
            { 
                required : {value:"true", message: "Campo password requerido"}, 
                minLength :4
            }
            )    
          }
        />
        <button type="submit" className="btn btn-primary mt-4">Enviar</button>
      </form>
    </div>
  );
};

export default FormRegister;