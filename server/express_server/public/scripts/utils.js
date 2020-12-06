async function postFetch(url = "", objectSend = {}) {
    let response = await fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify(objectSend),
            headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem("token") }
        }
    )
    var data = await response.json()
    return data
}

function resetCredentials() {
    sessionStorage.setItem("username", null); 
    sessionStorage.setItem("token", null);
}