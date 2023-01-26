import data from "bootstrap/js/src/dom/data";

async function getTest() {
    const url = `http://192.168.35.115:8000/main`; //
    try {
        const response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
    }
}

export default getTest;