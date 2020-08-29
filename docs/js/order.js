var storage = firebase.storage();
var storageRef = storage.ref();
var designs = storageRef.child('designs');
var baseURL = "http://" + window.location.host + "/";
userSettings();
var go = false;
var name = '',
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
    designUrl = null,
    newCard;

function handleDrop(e) {
    var dt = e.dataTransfer
    handleFiles(dt.files);
}

function handleFiles(files) {
    swal_ajax('load');
    files = [...files]
    var l = false
    var accept = ['pdf', 'docx', 'pptx']
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
            go = true;
            document.getElementById("designConfirm").innerHTML = `<h5>Uploaded: <a href="${url}"> ${file.name}</a></h5>`;
            console.log(url)
            designUrl = url;
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
            (function($) {
                "use strict";
                email = u.email;
                name = u.name;
                type = u.accountType;
                surname = u.surname;
            })(jQuery);

        })
        .catch(error => console.log('error', error))
}


function orderNewCard() {
    fetch(baseURL + "who/am/i/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
        .then(response => response.json())
        .then(result => {
            newCard = {
                name,
                surname,
                email: result.email,
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
                userID: result.username,
            };
            (function($) {
                "use strict";

            })(jQuery);

        })
        .catch(error => console.log('error', error));
};

function next() {
    (function($) {
        "use strict";
        if ($('#cname').val() === $('#control').val()) {
            document.getElementById('forname').innerHTML = 'Name is required*';
            document.getElementById('forname').style.color = "red";
            go = false;
        } else {
            name = $('#cname').val();
            go = true;
        }
        if ($('#csurname').val() === $('#control').val()) {
            document.getElementById('forsurname').innerHTML = 'Surname is required*';
            document.getElementById('forsurname').style.color = "red";
            go = false;
        } else {
            go = true;
            surname = $('#csurname').val();
        }
        if ($('#ccompany').val() === $('#control').val()) {
            document.getElementById('forcompany').innerHTML = 'Company is required*';
            document.getElementById('forcompany').style.color = "red";
            go = false;
        } else {
            go = true;
            company = $('#ccompany').val();
        }
        if ($('#ctitle').val() === $('#control').val()) {
            document.getElementById('forposition').innerHTML = 'Position is required*';
            document.getElementById('forposition').style.color = "red";
            go = false;
        } else {
            go = true;
            position = $('#ctitle').val();
        }
        if ($('#cphone').val() === $('#control').val()) {
            document.getElementById('forphone').innerHTML = 'Phone number is equired*';
            document.getElementById('forphone').style.color = "red";
            go = false;
        } else {
            go = true;
            phone = $('#cphone').val();
        }

        landingPage = $('#cLandingPage').val();
        facebook = $('#cfb').val();
        instagram = $('#cig').val();
        linkedIn = $('#cln').val();
        twitter = $('#ctw').val();
        console.log(designUrl)
        if (designUrl === undefined || designUrl === null) {
            var x = document.getElementById("cdesign");
            if ('files' in x) {
                if (x.files.length == 0) {} else {
                    for (var i = 0; i < x.files.length; i++) {
                        var file = x.files[i];
                        handleFiles([file]);
                        go = false;
                        swal_ajax('load');
                        document.getElementById('cnotif').innerHTML = '<h5 style="margin-top:25px; color:red;"> Please wait until we upload your design and try again </h5>';
                    }
                }
            }
        } else {
            go = true;
        }

        if (!go) {
            document.getElementById('cnotif').innerHTML = '<h5 style="margin-top:25px; color:red;"> Please check your data and try again! </h5>';
        } else {
            orderNewCard();
            if (type === 'Business') {
                nextBusiness();
            } else {
                nextIndividual();
            }
        }

    })(jQuery);
}


function payForCard(plan) {
    newCard.plan = plan;
    newCard.status = 7;
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