console.log('it works');
var id = getParameterByName('c');
var baseURL = "https://api.ogier.io/"; //  'http://localhost:3000/'; // "https://api.ogier.io/";
var sm = getParameterByName('ahsdbfkhabsdfhbajlsdhfbajhldsbfljhb');
console.log(id);
document.getElementById('linksName').innerHTML = `Social Links for card No. ${id}`;

if (id === sm) {
    document.location.href = "/";
}
fetch(baseURL + "card/give/me/" + id, {})
    .then(response => response.json()).catch(() => { idk() })
    .then(result => {
        if (result === undefined) {
            idk();
        }
        var h = false;
        document.getElementById('linksName').innerHTML = `${result.name} ${result.surname}'s ogier links`;
        if (result.landingPage) {
            h = true;
            if (result.landingPage.startsWith('https://') || result.landingPage.startsWith('http://')) {
                document.getElementById('lPage').innerHTML = `<a href="${result.landingPage}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fa fa-globe fa-2x col-md-4"style="color: white;"> </i> <div class="col-md-4">
                                                            ${result.landingPage.split('://')[1]} </div> </div></button> </a>`
            } else {
                var url = 'http://' + result.landingPage;
                document.getElementById('lPage').innerHTML = `<a href="${url}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fa fa-globe fa-2x col-md-4"style="color: white;"> </i> <div class="col-md-4">
                                                            ${result.landingPage} </div> </div></button> </a>`
            }
        }

        if (result.facebook) {
            h = true;
            if (result.facebook.startsWith('https://') || result.facebook.startsWith('http://')) {
                document.getElementById('facebook').innerHTML = `<a href="${result.facebook}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-globe fa-2x col-md-4"style="color: white;"> </i> <div class="col-md-4">
                                                            Facebook </div> </div></button> </a>`
            } else {
                var url = 'https://facebook.com/' + result.facebook;
                document.getElementById('facebook').innerHTML = `<a href="${url}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-facebook fa-2x col-md-4"style="color: white;"> </i> <div class="col-md-4">
                                                            Facebook </div> </div></button> </a>`
            }
        }
        if (result.instagram) {
            h = true;
            if (result.instagram.startsWith('https://') || result.instagram.startsWith('http://')) {
                document.getElementById('ig').innerHTML = `<a href="${result.instagram}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-instagram fa-2x col-md-4"style="color: white;"> </i> <div class="col-md-4">
                                                            Instagram </div> </div></button> </a>`
            } else {
                var url = 'https://instagram.com/' + result.facebook;
                document.getElementById('ig').innerHTML = `<a href="${url}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-instagram fa-2x col-md-4"style="color: white;"> </i> <div class="col-md-4">
                                                            Instagram </div> </div></button> </a>`
            }
        }
        if (result.twitter) {
            h = true;
            if (result.twitter.startsWith('https://') || result.twitter.startsWith('http://')) {
                document.getElementById('twitter').innerHTML = `<a href="${result.twitter}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-twitter fa-2x col-md-4"style="color: white;"> </i> <div class="col-md-4">
                                                            Twitter </div> </div></button> </a>`
            } else {
                var url = 'https://twitter.com/' + result.twitter;
                document.getElementById('twitter').innerHTML = `<a href="${url}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-twitter fa-2x col-md-4"style="color: white;"> </i> <div class="col-md-4">
                                                            Twitter </div> </div></button> </a>`
            }
        }
        if (result.linkedIn) {
            h = true;
            if (result.linkedIn.startsWith('https://') || result.linkedIn.startsWith('http://')) {
                document.getElementById('linkedIn').innerHTML = `<a href="${result.linkedIn}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-lnikedin fa-2x col-md-4"style="color: white;"> </i> <div class="col-md-4">
                                                            LinkedIn </div> </div></button> </a>`
            } else {
                var url = 'https://linkedin.com/in/' + result.linkedIn;
                document.getElementById('twitter').innerHTML = `<a href="${url}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-linkedin fa-2x col-md-4"style="color: white;"> </i> <div class="col-md-4">
                                                            LinkedIn </div> </div></button> </a>`
            }
        }
        if (!h) {
            idk()
        }
    })

function idk() {
    document.getElementById('signUpForm2').innerHTML = `
            <div class="form-group">
                <h3> Ogier Links  </h3>
            </div>
            <div class="image-container">
            <div class="img-wrapper">
                <img class="img-fluid" src="/images/logo-b.png" style="height: 350px; width: 350px" alt="alternative">
            </div>
        </div>
            <div class="form-group">
                <h5 style="color: grey;"> no links found :( </h3>
            </div> `
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}