import React, {useEffect, useState} from 'react'
import {Card} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
// import getJSON from '../helpers/getJSON';

// Variables
const url = "http://localhost:3500/tareas/"

const CardShow = ({ tareas , setTareas }) => {
    // Estados

    // Efectos
    useEffect(() => {
    }, [tareas])


    const handleEliminar = async (e) => {
        e.preventDefault();
        const id = e.target.dataset.id;
        setTareas(tareas.filter(tarea => (tarea.id != id)));

    }

    const handleCambiarForm = (e) => {
        e.preventDefault();

        document.querySelector(".tareanombre").value = e.target.dataset.tarea;
        document.querySelector(".importancia").value = e.target.dataset.importancia;

        document.querySelector(".modificar").setAttribute("class", "modificar d-inline btn btn-primary");
        document.querySelector(".modificar").setAttribute("data-id", e.target.dataset.id);

        document.querySelector(".enviar").setAttribute("class", "enviar d-none btn btn-primary");
    }

    return (
        tareas.reverse().map((tarea) => {
            return (
                <Card style={{width: '18rem'}} className='m-4 d-flex text-dark' key={tarea.id}>
                    <Card.Header>{tarea.tarea}</Card.Header>
                    <Card.Body>
                        <Card.Subtitle>Importancia: {tarea.importancia}</Card.Subtitle>
                    </Card.Body>
                    <Card.Body className='d-flex flex-column'>
                        <Button data-id={tarea.id} data-tarea={tarea.tarea} data-importancia={tarea.importancia}
                                className='mb-2' onClick={(e) => handleCambiarForm(e)}>Modificar tarea</Button>
                        <Button data-id={tarea.id} data-tarea={tarea.tarea} data-importancia={tarea.importancia}
                                onClick={(e) => handleEliminar(e)}>Eliminar tarea</Button>
                    </Card.Body>
                </Card>
            )
        })
    )
}

export default CardShow