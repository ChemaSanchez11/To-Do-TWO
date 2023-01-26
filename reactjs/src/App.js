import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import Tareas from "./components/Tareas";
import getTest from "./helpers/getTest";
import FormularioTarea from "./components/FormularioTarea";
import {Col, Row} from "react-bootstrap";

import CardShow from "./components/CardShow";
import uuid from "react-uuid";

const initialStateTareas = [
    {
        id: uuid(),
        tarea: 'dfgdg',
        importancia: 5
    },
    {
        id: uuid(),
        tarea: 'sdfsefds',
        importancia: 5
    },
    {
        id: uuid(),
        tarea: 'ghfdfgh',
        importancia: 5
    },
];

function App() {

    const [tareas, setTareas] = useState(initialStateTareas);

    return (
        <Row className="App row">

            <Col md={6} className="Formulario d-flex">
                <FormularioTarea tareas={tareas} setTareas={setTareas}></FormularioTarea>
            </Col>
            <Col md={6} className="Tareas">
                <CardShow tareas={tareas} setTareas={setTareas}></CardShow>
            </Col>
        </Row>
    );
}

export default App;
