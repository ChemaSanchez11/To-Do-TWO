import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Variables
const url = "http://localhost:3500/tareas/"

const FormularioTarea = () => {

    // Funciones
    const handleEnviarTarea = async (e) =>{
        e.preventDefault();

        const $nombreTarea = document.querySelector(".tareanombre");
        const $importanciaTarea = document.querySelector(".importancia");

        const nuevaTarea = {
            tarea: $nombreTarea.value,
            importancia: $importanciaTarea.value
        }
        try {
            const options = {
                method: "POST",
                headers: {
                "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(nuevaTarea),
            }

            const enlace = await fetch(url, options),
            json = await enlace.json();

            if (enlace.ok) {
                console.log("Se ha añadido una nueva tarea");
            } else throw {
                status: enlace.status,
                statusText: enlace.statusText
            };
        } catch (error) {
            console.error(error.statusText);
        }
    }

    const handleModificarTarea = async (e) =>{
        e.preventDefault();
        try {
            const options = {
                method : "PUT",
                headers : {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    tarea: document.querySelector(".tareanombre").value,
                    importancia: document.querySelector(".importancia").value,
                }),
            };

            const urlModificar = url + e.target.dataset.id;
            const enlace = await fetch(urlModificar, options);

            const json = await enlace.json();
            if(!enlace.ok) throw { status: enlace.status, message: enlace.statusText};

            document.querySelector(".modificar").setAttribute("class","modificar d-none btn btn-primary");

            document.querySelector(".enviar").setAttribute("class","enviar d-inline btn btn-primary");

            document.querySelector(".tareanombre").value = "";
            document.querySelector(".importancia").value = 1;

        } catch (error) {
            const miError = error.statusText || "Error al cargar los datos";
            console.log(miError);
        }
    }
    
  return (
    <div>
        <Form>
        <Form.Group className='mb-3' controlId="formInput">
            <Form.Label>Tarea</Form.Label>
            <Form.Control className='tareanombre' type="text" placeholder="Introduzca su tarea" />
        </Form.Group>
        <Form.Group className='mb-3' controlId="exampleForm.ControlSelect1">
            <Form.Label>Importancia de la Tarea</Form.Label>
            <Form.Control as="select" className='importancia'>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </Form.Control>
        </Form.Group>
        <Button className='enviar d-inline btn btn-primary' type="submit" onClick={(e)=>handleEnviarTarea(e)}>
            Enviar tarea
        </Button>
        <Button className='modificar d-none btn-primary' type="submit" onClick={(e)=>handleModificarTarea(e)}>
            Modificar tarea
        </Button>
    </Form>
    </div>
  )
}

export default FormularioTarea