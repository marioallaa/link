var token = localStorage.getItem('token')
if (token === 'null' || !token) {
    document.location.href = "/auth/login/";
}