const getJSON = async () => {
    const url = "http://localhost:4000/tareas";

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default getJSON;