import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import getJSON from '../helpers/getJSON';

// Variables
const initialStateTareas = [];
const url = "http://localhost:3500/tareas/"

const CardShow = () => {
    // Estados
    const [tareas, setTareas] = useState(initialStateTareas);
    // Efectos
    useEffect(() => {
      traerJSON();
    }, [tareas])
    

    // Funciones
    const traerJSON = () =>{
        getJSON()
        .then((json)=>setTareas(json))
        .catch((error)=>console.error(error))
    }

    const handleEliminar = async (e) =>{
        e.preventDefault();

        try {
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            };
            const urleliminar = url + e.target.dataset.id;
            const enlace = await fetch(urleliminar, options);
            const json = await enlace.json();

            if(!enlace.ok) throw { status: enlace.status, message: enlace.statusText};

            localStorage.setItem(e.target.dataset.tarea, "Importancia: "+e.target.dataset.importancia);

        } catch (error) {
            const miError = error.statusText || "Error al cargar los datos";
            console.log(miError);
        }
    }

    const handleCambiarForm = (e) =>{
        e.preventDefault();

        document.querySelector(".tareanombre").value = e.target.dataset.tarea;
        document.querySelector(".importancia").value = e.target.dataset.importancia;

        document.querySelector(".modificar").setAttribute("class","modificar d-inline btn btn-primary");
        document.querySelector(".modificar").setAttribute("data-id",e.target.dataset.id);

        document.querySelector(".enviar").setAttribute("class","enviar d-none btn btn-primary");
    }

  return (
    tareas.reverse().map((tarea)=>{
        return(
        <Card style={{ width: '18rem' }} className='m-4 d-flex' key={tarea.id}>
        <Card.Header>{tarea.tarea}</Card.Header>
        <Card.Body>
            <Card.Subtitle>Importancia: {tarea.importancia}</Card.Subtitle>
        </Card.Body>
        <Card.Body className='d-flex flex-column'>
            <Button data-id={tarea.id} data-tarea={tarea.tarea} data-importancia={tarea.importancia} className='mb-2' onClick={(e)=>handleCambiarForm(e)}>Modificar tarea</Button>
            <Button data-id={tarea.id} data-tarea={tarea.tarea} data-importancia={tarea.importancia} onClick={(e)=>handleEliminar(e)}>Eliminar tarea</Button>
        </Card.Body>
    </Card>
        )
    })
  )
}

export default CardShow