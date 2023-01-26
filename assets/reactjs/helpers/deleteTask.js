const deleteTask = async () => {
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

        if (!enlace.ok) throw {status: enlace.status, message: enlace.statusText};

        localStorage.setItem(e.target.dataset.tarea, "Importancia: " + e.target.dataset.importancia);

    } catch (error) {
        const miError = error.statusText || "Error al cargar los datos";
        console.log(miError);
    }
}

export default deleteTask;
