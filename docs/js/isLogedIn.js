var baseURL = "https://api.ogier.io/"; // 'http://localhost:3000/'; // "https://api.ogier.io/";
var token = localStorage.getItem('token')
fetch(baseURL + "who/am/i/", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    .then(response => response.json())
    .catch(error => {
        console.log('error', "unauthorized")
    })
    .then(result => {
        if (result.username === 'null' || result.username === undefined) {} else {
            console.log('welcome ' + result.username)
            document.location.href = "/user/";
        }

    })
    .catch(error => {
        console.log('error', "unauthorized")
    });