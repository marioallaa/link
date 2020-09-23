var storage = firebase.storage();
var storageRef = storage.ref();
var designs = storageRef.child('designs');
var baseURL = 'http://localhost:3000/'; // "https://api.ogier.io/";
userSettings();
var cont;
var username;
var name = '',
    tp = '',
    nr = 0,
    surname = '',
    company = '',
    position = '',
    phone = '',
    email = '',
    type = '',
    landingPage = '',
    facebook = '',
    instagram = '',
    linkedIn = '',
    twitter = '',
    designUrl = null;

var newCard = {};

function handleDrop(e) {
    var dt = e.dataTransfer
    handleFiles(dt.files);
}

function handleFiles(files) {
    swal_ajax('load');
    files = [...files]
    console.log(files)
    var l = false
    var accept = ['pdf', 'docx', 'pptx', 'doc', "ppt", ]
    accept.forEach(a => {
        if (files[0].name.split('.')[files[0].name.split('.').length - 1] == a) {
            upload(files[0], );
            l = true;
        }
    })
    if (!l) {
        console.log(files[0])
        swal_ajax('error');
        var x = document.getElementById("designConfirm");
        x.innerHTML = x.innerHTML + `
                <label for="cdesign" style="color:red">Unacceptable file! Accepted file types: .pdf, .docx, .pptx</label>
                `;
        return;
    }
}

function upload(file, ) {
    location.hash = "";
    var ref = designs.child(Date.now() + '.' + file.name.split('.')[file.name.split('.').length - 1])
    ref.put(file).then(function(snapshot) {}).then(function() {
        ref.getDownloadURL().then(function(url) {
            swal_ajax('success');
            document.getElementById("designConfirm").innerHTML = `<h5>Uploaded: <a href="${url}"> ${file.name}</a></h5>`;
            designUrl = url;
            next();
        });
    });
}


function userSettings() {
    fetch(baseURL + "who/am/i", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then(response => response.json())
        .then(u => {
            var total = 0;
            var y = 9;
            email = u.email;
            name = u.name;
            username = u.username;
            type = u.accountType;
            tp = type
            surname = u.surname;
            if (type === 'business')
                total = 30;
            if (type === 'corporate')
                total = 90;



            fetch(baseURL + "card/mine/", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                })
                .then(response => response.json())
                .then(result => {
                    for (var i = result.myCards.length; i > 0; i--) {
                        if (result.myCards[i - 1].status === 'ACTIVE' && result.myCards[i - 1].plan === 1) {
                            total--;
                        }
                        if (result.myCards[i - 1].status === 'ACTIVE' && result.myCards[i - 1].plan === 7) {
                            total--;
                        }
                        if (result.myCards[i - 1].status === 'ACTIVE' && result.myCards[i - 1].plan === 8) {
                            total--;
                        }
                    }
                    nr = total;

                    if (type === 'personal' || total < 0) {
                        document.getElementById('cnotif').innerHTML = '<i style="margin-top:25px;"> Ready to purchase a new ogier card? </i>';
                        document.getElementById('orderNow').innerHTML = 'Purchase';
                        document.getElementById('planStuff').innerHTML = 'Personal Plan';
                        cont = payForCard;
                    }
                    if (type === 'business' && total <= 30 && u.role === y && total >= 0) {
                        document.getElementById('cnotif').innerHTML = `Hello ${u.name} ${u.surname}! You have ${total} ogier cards left to order.`;
                        document.getElementById('orderNow').innerHTML = 'Order Now';
                        document.getElementById('planStuff').innerHTML = 'Business Plan';
                        cont = orderBusiness;
                    } else if (type === 'business' && total <= 30 && u.role !== y && total >= 0) {
                        document.getElementById('cnotif').innerHTML = `Hello ${u.name} ${u.surname}! You have to pay € 236.31 for the Business Plan that you have chosen while ordering this card.`;
                        document.getElementById('orderNow').innerHTML = 'Purchase';
                        document.getElementById('planStuff').innerHTML = 'Business Plan';
                        cont = payBusiness;
                    }
                    if (type === 'corporate' && total <= 90 && u.role === y && total >= 0) {
                        document.getElementById('cnotif').innerHTML = `Hello ${u.name} ${u.surname}! You have ${total} ogier cards left to order.`;
                        document.getElementById('orderNow').innerHTML = 'Order Now';
                        document.getElementById('planStuff').innerHTML = 'Corporate Plan';
                        cont = orderCorporate;
                    } else if (type === 'corporate' && total <= 90 && u.role !== y && total >= 0) {
                        document.getElementById('cnotif').innerHTML = ` Hello ${u.name} ${u.surname}! You have to pay € 699.00 for the Corporate Plan that you have chosen while ordering this card.`;
                        document.getElementById('orderNow').innerHTML = 'Purchase';
                        document.getElementById('planStuff').innerHTML = 'Corporate Plan';
                        cont = payCorporate;
                    }


                })
                .catch(error => console.log('error', error));

        })
        .catch(error => console.log('error', error))
}


function orderNow() { return "minus one"; }

function orderBusiness() { return justOrderNewCard(7); }

function orderCorporate() { return justOrderNewCard(8); }

function payBusiness() { return payForCard(7); }

function payCorporate() { return payForCard(8); }

function orderNewCard() {
    return {
        name,
        surname,
        email: email,
        address: '',
        landingPage,
        tittle: position,
        timeCreated: Date(),
        catchLine: '',
        company: company,
        facebook,
        instagram,
        linkedIn,
        twitter,
        designURL: designUrl,
        phone,
        prevVersionID: null,
        userID: username,
    };
};
var a = 'ACTIVE';



function next() {
    var go = true;
    (function($) {
        "use strict";
        if ($('#cname').val() === $('#control').val()) {
            document.getElementById('forname').innerHTML = 'Name is required*';
            document.getElementById('forname').style.color = "red";
            go = false;
        } else {
            document.getElementById('forname').innerHTML = 'Name*';
            document.getElementById('forname').style.color = "grey";
            name = $('#cname').val().toLowerCase();
            name = name.charAt(0).toUpperCase() + name.slice(1);
        }
        if ($('#csurname').val() === $('#control').val()) {
            document.getElementById('forsurname').innerHTML = 'Surname is required*';
            document.getElementById('forsurname').style.color = "red";
            go = false;
        } else {
            document.getElementById('forsurname').innerHTML = 'Surname*';
            document.getElementById('forsurname').style.color = "grey";
            surname = $('#csurname').val().toLowerCase();
            surname = surname.charAt(0).toUpperCase() + surname.slice(1);
        }
        if ($('#cmail').val() === $('#control').val()) {
            document.getElementById('formail').innerHTML = 'Email is required*';
            document.getElementById('formail').style.color = "red";
            go = false;
        } else {
            document.getElementById('formail').innerHTML = 'Email*';
            document.getElementById('forsurname').style.color = "grey";
            email = $('#cmail').val().toLowerCase();
        }
        if ($('#ccompany').val() === $('#control').val()) {
            document.getElementById('forcompany').innerHTML = 'Company is required*';
            document.getElementById('forcompany').style.color = "red";
            go = false;
        } else {
            document.getElementById('forcompany').innerHTML = 'Company**';
            document.getElementById('forcompany').style.color = "grey";
            company = $('#ccompany').val().toLowerCase();
            company = company.charAt(0).toUpperCase() + company.slice(1);
        }
        if ($('#ctitle').val() === $('#control').val()) {
            document.getElementById('forposition').innerHTML = 'Position is required*';
            document.getElementById('forposition').style.color = "red";
            go = false;
        } else {
            document.getElementById('forposition').innerHTML = 'Position*';
            document.getElementById('forposition').style.color = "grey";
            position = $('#ctitle').val();
        }
        if ($('#cphone').val() === $('#control').val()) {
            document.getElementById('forphone').innerHTML = 'Phone number is equired*';
            document.getElementById('forphone').style.color = "red";
            go = false;
        } else {
            document.getElementById('forphone').innerHTML = 'Phone*';
            document.getElementById('forphone').style.color = "grey";
            phone = $('#cphone').val();
        }

        landingPage = $('#cLandingPage').val();
        facebook = $('#cfb').val();
        instagram = $('#cig').val();
        linkedIn = $('#cln').val();
        twitter = $('#ctw').val();
        console.log(designUrl)
        console.log(go)
        if (designUrl === undefined || designUrl === null) {
            var x = document.getElementById("cdesign");
            go = false;
            if ('files' in x) {
                if (x.files.length == 0) {} else {
                    for (var i = 0; i < x.files.length; i++) {
                        var file = x.files[i];
                        handleFiles([file]);
                        swal_ajax('load');
                        document.getElementById('cnotif').innerHTML = '<h5 style="margin-top:25px; color:red;"> Please wait until we upload your design and try again </h5>';
                    }
                }
            }
        }
        if (!go) {
            document.getElementById('cnotif').innerHTML =
                `<h5 style="color:red;"> Please check your data and try again! <br>` +
                `If you don't have a design already,<br>  <b> <a href="#"> talk with our designers. </a> </b>  </h5>`;
        } else {
            cont();

        }

    })(jQuery);
}



function justOrderNewCard(plan) {
    newCard = orderNewCard();
    newCard.plan = plan;
    newCard.status = a;
    swal_ajax('load');
    location.hash = "";
    (function($) {
        "use strict";
        $.ajax({
            type: "POST",
            data: JSON.stringify(newCard),
            url: baseURL + "card/create",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            beforeSend: function() {
                swal_ajax('load');
            },
            success: function(json) {
                swal_ajax('success');
                nr--;
                var d = { msg: `${username} just ordered a new ogier card for ${newCard.name + " " + newCard.surname}. ${username} has ${nr} cards left from his ${tp}. Card ID ${json.PaymentSaved.OgierCard}, Ogier card design url: ${newCard.designURL}` }
                console.log(d);
                $.ajax({
                    type: "POST",
                    url: baseURL + "telegram/send/msg",
                    data: d,
                    success: function(text) { document.location.href = '/user/' },
                    error: function(error) { console.log('error', error) }
                });
                // setTimeout(document.location.href = json.gotoLink, 250);
            },
            error: function() {
                swal_ajax('error');
                return false;
            }
        });

    })(jQuery);
}



function payForCard(plan = 1) {
    newCard = orderNewCard();
    newCard.plan = plan;
    newCard.status = 7;
    console.log(newCard)
    swal_ajax('load');
    location.hash = "";
    (function($) {
        "use strict";
        $.ajax({
            type: "POST",
            data: JSON.stringify(newCard),
            url: baseURL + "card/create",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            beforeSend: function() {
                swal_ajax('load');
            },
            success: function(json) {
                swal_ajax('success');
                var d = { msg: `${newCard.name + " " + newCard.surname} Just ordered a new Card. Wait for payment and proceed with the order, Card ID ${json.PaymentSaved.OgierCard}` }
                console.log(d);
                $.ajax({
                    type: "POST",
                    url: baseURL + "telegram/send/msg",
                    data: d,
                    success: function(text) { document.location.href = json.gotoLink },
                    error: function(error) { console.log('error', error) }
                });
                // setTimeout(document.location.href = json.gotoLink, 250);
            },
            error: function() {
                swal_ajax('error');
                return false;
            }
        });

    })(jQuery);
}