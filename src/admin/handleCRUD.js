const api = 'http://localhost:3000'

export async function sendRequest(sendMethod, enpoint, data = null) {
    const url = `${api}/${enpoint}`;

    const options = {
        method: sendMethod,
        headers: {
            "Content-Type": "application/json"
        }
    }

    data ? options.body = JSON.stringify(data) : ''

    try {
        const response = await fetch(url, options);
        return await response.json()
    }
    catch (err) {
        console.log('Error: ' + err);
    }
}

export async function createData(data, enpoint) {
    try {
        const response = await sendRequest('POST', enpoint, data);
    }
    catch (err) {
        console.log('Error: ' + err);
    }
}

export async function updateData(id, data, enpoint) {
    try {
        const response = await sendRequest('PUT', `${enpoint}/${id}`, data);
    }
    catch (err) { console.log("Error: " + err) }
}

export async function deleteData(id, enpoint) {
    try {
        const response = await sendRequest('DELETE', `${enpoint}/${id}`);
    }
    catch (err) { console.log("Error: " + err) }
}

export async function getData(enpoint) {
    try {
        const response = await sendRequest('GET', enpoint, null);
        return response
    }
    catch (err) { console.log("Error: " + err) }
}