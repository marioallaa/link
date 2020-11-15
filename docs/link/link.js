console.log('it works');
var id = getParameterByName('c');
var baseURL = "https://api.ogier.io/"; //  'http://localhost:3000/'; // "https://api.ogier.io/";
var sm = getParameterByName('ahsdbfkhabsdfhbajlsdhfbajhldsbfljhb');
document.getElementById('linksName').innerHTML = `Social Links for card No. ${id}`;

if (id === sm) {
    document.location.href = "/";
}
fetch(baseURL + "card/give/me/" + id, {})
    .then(response => response.json()).catch(() => { idk() })
    .then(result => {
        if (result === undefined || result.plan === 0) {
            idk('Ogier Card Not Found :(');
        }
        if (result.status !== 'ACTIVE') {
            idk('Sorry, This Ogier Card is Inactive');
        }
        var h = false;
        document.getElementById('linksName').innerHTML = `${result.name} ${result.surname}'s ogier links`;
        if (result.landingPage) {
            h = true;
            if (result.landingPage.startsWith('https://') || result.landingPage.startsWith('http://')) {
                document.getElementById('lPage').innerHTML = `<a href="${result.landingPage}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fa fa-globe fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10">
                                                            ${result.landingPage.split('://')[1]} </div> </div></button> </a>`
            } else {
                var url = 'http://' + result.landingPage;
                document.getElementById('lPage').innerHTML = `<a href="${url}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fa fa-globe fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10">
                                                            ${result.landingPage} </div> </div></button> </a>`
            }
        }
        if (result.facebook) {
            h = true;
            if (result.facebook.startsWith('https://') || result.facebook.startsWith('http://')) {
                document.getElementById('facebook').innerHTML = `<a href="${result.facebook}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-facebook fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10">
                                                            Facebook </div> </div></button> </a>`
            } else {
                var url = 'https://facebook.com/' + result.facebook;
                document.getElementById('facebook').innerHTML = `<a href="${url}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-facebook fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10">
                                                            Facebook </div> </div></button> </a>`
            }
        }
        if (result.instagram) {
            h = true;
            if (result.instagram.startsWith('https://') || result.instagram.startsWith('http://')) {
                document.getElementById('ig').innerHTML = `<a href="${result.instagram}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-instagram fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10">
                                                            Instagram </div> </div></button> </a>`
            } else {
                var url = 'https://instagram.com/' + result.instagram;
                document.getElementById('ig').innerHTML = `<a href="${url}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-instagram fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10">
                                                            Instagram </div> </div></button> </a>`
            }
        }
        if (result.twitter) {
            h = true;
            if (result.twitter.startsWith('https://') || result.twitter.startsWith('http://')) {
                document.getElementById('twitter').innerHTML = `<a href="${result.twitter}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-twitter fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10">
                                                            Twitter </div> </div></button> </a>`
            } else {
                var url = 'https://twitter.com/' + result.twitter;
                document.getElementById('twitter').innerHTML = `<a href="${url}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-twitter fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10">
                                                            Twitter </div> </div></button> </a>`
            }
        }
        if (result.linkedIn) {
            h = true;
            if (result.linkedIn.startsWith('https://') || result.linkedIn.startsWith('http://')) {
                document.getElementById('linkedIn').innerHTML = `<a href="${result.linkedIn}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-linkedin fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10">
                                                            LinkedIn </div> </div></button> </a>`
            } else {
                var url = 'https://linkedin.com/in/' + result.linkedIn;
                document.getElementById('linkedIn').innerHTML = `<a href="${url}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-linkedin fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10">
                                                            LinkedIn </div> </div></button> </a>`
            }
        }
        if (result.email) {
            h = true;
            document.getElementById('email').innerHTML = `<a href="mailto:${result.email}" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fa fa-envelope fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10">
                                                            ${result.email} </div> </div></button> </a>`
        }
        if (result.phone) {
            h = true;
            if (result.phone.startsWith('+')) {
                document.getElementById('whatsapp').innerHTML = `<a href="https://api.whatsapp.com/send?phone=${result.phone}&text=Your ogier card is cool&source=ogiercard&data=ogiercard&app_absent=ogiercard" target="_blank"><button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fab fa-whatsapp fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10 ">
                                                            ${result.phone} </div> </div></button> </a>`
            } else {
                document.getElementById('whatsapp').innerHTML = `<a href="tel:${result.phone}" target="_blank" class="mytext"><button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                                            <div class="row">
                                                            <i class="fa fa-phone fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10 ">
                                                            ${result.phone} </div> </div></button> </a>`
            }
        }
        if (result.address) {
            h = true;
            document.getElementById('address').innerHTML = `<a href="https://www.google.com/search?q=${result.address}" target="_blank" class="text-link">
                                    <button type="button" style="border-radius: 25px;color: white; " class="btn1 black save-update col-md-11 send-form">
                                    <div class="row">
                                    <i class="fa fa-map-pin fa-2x col-md-2"style="color: white;"> </i> <div class="col-md-10 text-link">
                                    ${result.address} </div> </div></button> </a>`
        }
        if (!h) {
            idk();
        }
    })

function idk(l = 'no card found :( ') {
    document.getElementById('signUpForm2').innerHTML = `
            <div class="form-group">
                <h3> Ogier Links  </h3>
            </div>
            <div class="image-container">
            <div class="img-wrapper">
                <img class="img-fluid" src="/images/logo-b.png" style="width: 350px" alt="alternative">
            </div>
        </div>
            <div class="form-group">
                <h5 style="color: grey;">${l} </h3>
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