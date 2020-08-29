var baseURL = "http://" + window.location.host + "/";
var token = localStorage.getItem('token')
fetch(baseURL + "who/am/i/", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(response => response.json())
    .catch(error => {

        document.location.href = "/auth/login/";
        console.log('error', error)
    })
    .then(result => {
        if (result.username === 'null' || result.username === undefined) {
            document.location.href = "/auth/login/";
        } else {
            console.log('welcome ' + result.username)
        }

    })
    .catch(error => {

        document.location.href = "/auth/login/";
        console.log('error', error)
    });