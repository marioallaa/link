var baseURL = "https://api.ogier.io/"; //  'http://localhost:3000/'; // "https://api.ogier.io/";
var token = localStorage.getItem('token')
fetch(baseURL + "who/am/i/", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(response => response.json())
    .catch(error => {
        console.log('error', error)
        document.location.href = "/auth/login/";
    })
    .then(result => {
        if (result.username === undefined) {
            document.location.href = "/auth/login/";
        }

        console.log('welcome ' + result.username)

    })