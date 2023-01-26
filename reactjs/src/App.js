import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import Tareas from "./components/Tareas";
import getTest from "./helpers/getTest";
import FormularioTarea from "./components/FormularioTarea";
import {Col, Row} from "react-bootstrap";

import CardShow from "./components/CardShow";

const initStateConectado = false;

function App() {

    const [conectado, setConectado] = useState(initStateConectado);

    getTest().then(r => console.log(r));

    return (
        <Row className="App row">

            <Col md={6} className="Formulario d-flex">
                <FormularioTarea></FormularioTarea>
            </Col>
            <Col md={6}  className="Tareas">
                <CardShow></CardShow>
            </Col>
        </Row>
    );
}

export default App;
