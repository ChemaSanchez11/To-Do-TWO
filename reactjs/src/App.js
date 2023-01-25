import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import Tareas from "./components/Tareas";

const initStateConectado = true;

function App() {

    const [conectado, setConectado] = useState(initStateConectado);

    return (
    <div className="App">
        <img className="App-logo" src={logo} alt="Logo"/>
        {
            conectado ? <Tareas/> : <h2>Login</h2>
        }
    </div>
  );
}

export default App;
