/* user stuff */


var storage = firebase.storage();
var storageRef = storage.ref();
var designs = storageRef.child('designs');
var baseURL = 'http://localhost:3000/'; // "https://api.ogier.io/"; 
var allMyCardIds = []
var total = 0;
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}

function LetMeOUT() {
    localStorage.setItem('token', null);
    document.location.href = "/auth/login/";
}

function checkStatusCard(id) {
    fetch(baseURL + 'card/check/status/' + id, { headers }).then(
        (d) => {
            getData();
        }
    )
}

(function($) {
    "use strict";
    var k = 0;

    function cardTableRow(c) {
        if (c.status != 'ACTIVE' && c.status != '!ACTIVE' && c.plan != 0 && c.plan != 9) return
            /* `
                   <tr  onclick=checkStatusCard(${c.id})>
                       <td>${k = k + 1}</td>
                       <td>${c.name + " " + c.surname} | <a onclick=checkStatusCard(${c.id})>
                           <i class="badge-pill align-self-center" style="text-align: center; color: white;font-size: 15px;  background-color: #ee0000;  padding-bottom:2px;">
                               Check Status
                           </i></a></td>
                       <td>${c.timeCreated.slice(3, 21)}  </td>
                       <td style="text-align: center;">
                           <i class="badge-pill align-self-center" style="text-align: center; color: white;font-size: 15px;  background-color: #800080;  padding-bottom:2px;">
                               Waiting..
                           </i>
                       </td>
                   </tr> <tr  class="white"> <td class="col-md-12" colspan="4"><div class="col col-md-12" id=""></div></td> </tr>`;*/
        if (c.plan === 0) return;
        if (c.plan == 1) return `
        <tr onclick="generateForBasicCard(${c.id})">
            <td>${k = k + 1}</td>
            <td>${c.name + " " + c.surname + " ~ " + c.tittle + " @ " + c.company}</td>
            <td>${c.timeCreated.slice(3, 21)} </td>
            <td style="text-align: center;">
                <i class="badge-pill align-self-center" style="text-align: center; color: black;font-size: 15px;  background-color: ;  padding-bottom:2px;">
                    Personal
                </i>
            </td>
        </tr>
        <tr class="whitew">
        <td class="col-md-12" colspan="4">
      <div class="col col-md-12" id="cardContainer${c.id}" style="display: flex; align-items: center; justify-content: center;"></div></td>
                </tr>`;
        if (c.plan == 7) return `
        <tr onclick="generateForBasicCard(${c.id})">
            <td>${k = k + 1}</td>
            <td>${c.name + " " + c.surname + " ~ " + c.tittle + " @ " + c.company}</td>
            <td>${c.timeCreated.slice(3, 21)} </td>
            <td style="text-align: center;">
                <i class="badge-pill align-self-center" style="text-align: center; color: black;font-size: 15px;  background-color: ;  padding-bottom:2px;">
                    Business
                </i>
            </td>
        </tr>
        <tr class="whitew">
        <td class="col-md-12" colspan="4">
        <div class="col col-md-12" id="cardContainer${c.id}" style="display: flex; align-items: center; justify-content: center;"></div></td>
                </tr>`;
        if (c.plan == 8) return `
        <tr onclick="generateForBasicCard(${c.id})">
            <td>${k = k + 1}</td>
            <td>${c.name + " " + c.surname + " ~ " + c.tittle + " @ " + c.company}</td>
            <td>${c.timeCreated.slice(3, 21)} </td>
            <td style="text-align: center;">
                <i class="badge-pill align-self-center" style="text-align: center; color: black;font-size: 15px;  background-color: ;  padding-bottom:2px;">
                    Business
                </i>
            </td>
        </tr>
        <tr class="whitew">
        <td class="col-md-12" colspan="4">
        <div class="col col-md-12" id="cardContainer${c.id}" style="display: flex; align-items: center; justify-content: center;"></div></td>
                </tr>`;
        if (c.plan == 2 && c.status != '!ACTIVE') return `
        <tr onclick="generateCard(${c.id}, 0);">
            <td>${k = k + 1}</td>
            <td>${c.name + " " + c.surname + " ~ " + c.tittle + " @ " + c.company}</td>
            <td>${c.timeCreated.slice(3, 21)} </td>
            <td style="text-align: center;">
                <i class="badge-pill align-self-center" style="text-align: center; color: black;font-size: 15px;  background-color: #C0C0C0;  padding-bottom:2px;">
                    Silver
                </i>
            </td>
        </tr>
        <tr class="whitew">
            <td class="col-md-12" colspan="4">
                <div class="col col-md-12" id="cardContainer${c.id}"></div>
            </td>
        </tr>`
        if (c.plan == 3 && c.status != '!ACTIVE') return `
        <tr onclick="generateCard(${c.id}, 0);">
            <td>${k = k + 1}</td>
            <td>${c.name + " " + c.surname + " ~ " + c.tittle + " @ " + c.company}</td>
            <td>${c.timeCreated.slice(3, 21)} </td>
            <td style="text-align: center;">
                <i class="badge-pill align-self-center" style="text-align: center; color: black;font-size: 15px;  background-color: #FFD700;  padding-bottom:2px;">
                    Gold
                </i>
            </td>
        </tr> <tr class="whitew"> <td class="col-md-12" colspan="4"><div class="col col-md-12" id="cardContainer${c.id}"></div></td> </tr>`;
        if (c.plan === 4 && c.status != '!ACTIVE') return `
        <tr onclick="generateCard(${c.id}, 0);">
            <td>${k = k + 1}</td>
            <td>${c.name + " " + c.surname + " ~ " + c.tittle + " @ " + c.company}</td>
            <td>${c.timeCreated.slice(3, 21)} </td>
            <td style="text-align: center;">
                <i class="badge-pill align-self-center" style="text-align: center; color: black;font-size: 15px;  background-color: #C0C0C0;  padding-bottom:2px;">
                    Silver
                </i>
            </td>
        </tr> <tr class="whitew"> <td class="col-md-12" colspan="4"><div class="col col-md-12" id="cardContainer${c.id}"></div></td> </tr>`;
        if (c.plan === 5 && c.status != '!ACTIVE') return `
        <tr onclick="generateCard(${c.id}, 0);">
            <td>${k = k + 1}</td>
            <td>${c.name + " " + c.surname + " ~ " + c.tittle + " @ " + c.company}</td>
            <td>${c.timeCreated.slice(3, 21)} </td>
            <td style="text-align: center;">
                <i class="badge-pill align-self-center" style="text-align: center; color: black;font-size: 15px;  background-color: #FFD700;  padding-bottom:2px;">
                    Gold
                </i>
            </td>
        </tr> <tr class="whitew"> <td class="col-md-12" colspan="4"><div class="col col-md-12" id="cardContainer${c.id}"></div></td> </tr>`;
        if (c.plan === 6 && c.status != '!ACTIVE') return `
        <tr onclick="generateCard(${c.id}, 0);">
            <td>${k = k + 1}</td>
            <td>${c.name + " " + c.surname + " ~ " + c.tittle + " @ " + c.company}</td>
            <td>${c.timeCreated.slice(3, 21)} </td>
            <td style="text-align: center;">
                <i class="badge-pill align-self-center" style="text-align: center; color: black;font-size: 15px;  background-color: #00ff00;  padding-bottom:2px;">
                    Diamond
                </i>
            </td>
        </tr> <tr class="whitew"> <td class="col-md-12" colspan="4"><div class="col col-md-12" id="cardContainer${c.id}"></div></td> </tr>`;
        if (c.status == '!ACTIVE') return `
        <tr onclick="generateForDeactivatedCard(${c.id}, 0);">
            <td>${k = k + 1}</td>
            <td>${c.name + " " + c.surname + " ~ " + c.tittle + " @ " + c.company}</td>
            <td>${c.timeCreated.slice(3, 21)} </td>
            <td style="text-align: center;">
            <i class="badge-pill align-self-center" style="text-align: center; color: white;font-size: 15px;  background-color: #aaa;  padding-bottom:2px;">
            Waiting..
        </i>
            </td>
        </tr> <tr class="whitew"> <td class="col-md-12" colspan="4">
        <div class="col col-md-12" id="cardContainer${c.id}" style="display: flex; align-items: center; justify-content: center;"> </div></td> </tr>`;
    }

    window.generateForBasicCard = function(id) {
        document.getElementById('cardContainer' + id).innerHTML = "More functionalities will be available soon!"
    }


    window.generateForDeactivatedCard = function(id) {
        document.getElementById('cardContainer' + id).innerHTML = `Please ship your physical Ogier Card back so that we deactivate your subscription! <a href="/make-the-planet-greener.html"> ..Why we do this? </a>`;
    }

    window.getData = function() {
        $('#cardContainer').html('');
        $('#lightBoxContainer').html(``);
        $('#putCardHere').html(``);
        k = 0;

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
                        total++;
                    }
                    if (result.myCards[i - 1].status === 'ACTIVE' && result.myCards[i - 1].plan === 7) {
                        total++;
                    }
                    if (result.myCards[i - 1].status === 'ACTIVE' && result.myCards[i - 1].plan === 8) {
                        total++;
                    }
                    $('#putCardHere').append(cardTableRow(result.myCards[i - 1]));
                    allMyCardIds.push(result.myCards[result.myCards.length - i].id)
                }

                userSettings();
            })
            .catch(error => console.log('error', error));
    }

    getData();

    function generateViewForCard(card) {
        var cardData = `
        <form id="card${card.id}form"  style="padding:9px;">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="">Update Card</h3>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-4">
                    <label for="company${card.id}">Company</label>
                    <input type="text" class="form-control" value="${card.company}" id="company${card.id}" name="company" required>
                </div>
                <div class="form-group col-md-4">
                    <label for="tittle${card.id}">Job Title</label>
                    <input type="text" class="form-control" value="${card.tittle}"  id="tittle${card.id}" name="Catch Line" required>
                </div>
                <div class="form-group col-md-4">
                    <label for="lin${card.id}">Catch Line</label>
                    <input type="text" class="form-control" value="${card.catchLine}"  id="lin${card.id}" name="Catch Line" required>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6">
                    <label for="name${card.id}">Name</label>
                    <input type="text" class="form-control" value="${card.name}" id="name${card.id}" name="name" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="surname${card.id}">Surname</label>
                    <input type="text" class="form-control" value="${card.surname}"  id="surname${card.id}" name="email" required>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6">
                    <label for="email${card.id}">Email</label>
                    <input type="text" class="form-control" value="${card.email}" id="email${card.id}" name="email" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="phone${card.id}">Phone</label>
                    <input type="text" class="form-control" value="${card.phone}" id="email${card.id}" name="email" required>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6">
                    <label for="url${card.id}">Landing Page</label>
                    <input type="text" class="form-control" value="${card.landingPage}" id="url${card.id}" name="Landing Page" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="address${card.id}">Address</label>
                    <input type="text" class="form-control" value="${card.address}" id="address${card.id}" name="address" required>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-3">
                    <label for="facebook${card.id}">Facebook</label>
                    <input name="Facebook" type="text" value="${card.facebook}" class="form-control" id="facebook${card.id}"></input>
                </div>
                <div class="form-group col-md-3">
                    <label for="instagram${card.id}">Instagram</label>
                    <input name="Instagram" type="text" value="${card.instagram}" class="form-control" id="instagram${card.id}"></input>
                </div>
                <div class="form-group col-md-3">
                    <label for="ln${card.id}">LinkedIn</label>
                    <input name="LinkedIn" type="text" value="${card.linkedIn}" class="form-control" id="ln${card.id}"></input>
                </div>
                <div class="form-group col-md-3">
                    <label for="twitter">Twitter</label>
                    <input name="Twitter${card.id}" type="text" value="${card.twitter}" class="form-control" id="twitter${card.id}"></input>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
            <button type="button" onClick="updateValue(${card.id});" style="color: white;" class="btn black save-update col-md-5 send-form">Update</button>
            <button type="button" onClick="deactivate(${card.id});" style="color: white;" class="btn black save-update col-md-5 send-form"> Deactivate</button>
            </div>
        </div>`;
        if (card.plan > 2) {
            var cardDesign = `
            <div id="card${card.id}design"  style="padding:9px;">
                <div class="row">
                    <div class="col-md-12">
                        <h3 class="">Update Card Design</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group drop-here col-md-5"  id="drop${card.id}">
                        <label for="design${card.id}">Upload/Drop Design </label>
                        <input type="file" class="form-control" id="design${card.id}"  style="border:0px;" accept=".jpg, .jpeg, .png">
                    </div>
                    <div class="form-group col-md-1">
                    </div>
                    <div class="form-group col-md-6">
                        <div class="row">
                            <label for="img${card.id}">Current Card Design</label>
                        </div>
                        <div class="row">
                            <embed src="${card.designURL}" width="100%" height="250px" />
                            <!--img id="img${card.id}" src="${card.designURL}" alt="${card.name + ' ' + card.company}" style="height: 250px"/-->
                        </div>
                    </div>
                </div>
                <div class="row d-flex justify-content-center">
                    <button type="button" onClick="updateDesign(${card.id});" style="color: white;" class="btn black save-update col-md-9 send-form">Update Design</button>
                </div>
            </div
            `;
        } else {
            var cardDesign = `
            <div id="card${card.id}design"  style="padding:9px;">
                <div class="row">
                    <div class="col-md-12">
                        <h3 class="">Update Card Design</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <p> Your subscription doesn't include dynamic design. </br>
                        If you want to change the virtual design of your card consider upgrading your <a href="#" > card plan. </a> </p>
                    </div>
                </div>
            </div>`
        }
        if (card.plan > 2) {
            var cardPromotion = `
            <div id="card${card.id}promotion"  style="padding:9px;">
                <div class="row">
                    <div class="col-md-12">
                        <h3 class="">Create Promotion</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <div class="row">
                            <div class="form-group col-md-9">
                                <label for="promotionTitle${card.id}">Promotion Title</label>
                                <input type="text" class="form-control" value="" placeholder="Title.." id="promotionTitle${card.id}" name="company" required>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="offer${card.id}">Price</label>
                                <input type="text" class="form-control" value="" placeholder="Price.." id="offer${card.id}" name="company" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-12">
                                <label for="desc${card.id}">Promotion Description</label>
                                <input type="text" class="form-control" value="" placeholder="Description.." id="desc${card.id}" name="company" required>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12" style="padding-right: 36px" id="dropPromotion${card.id}">
                            <label for="designPromotion${card.id}">Upload/Drop Promotion Image </label>
                            <input type="file" class="form-control" id="designPromotion${card.id}"  style="border:0px;" accept=".jpg, .jpeg, .png">
                        </div>
                    </div>
                </div>
                </div>
                <div class="row d-flex justify-content-center">
                    <button type="button" onClick="updatePromotion(${card.id});" style="color: white;" class="btn black save-update col-md-9 send-form">Publish Promotion</button>
                </div>
            </div
        `;
        } else {
            var cardPromotion = `
        <div id="card${card.id}promotion"  style="padding:9px;">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="">Create Promotion</h3>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <p> Your subscription doesn't include promotions. <br>
                     If you want to send promotions to your network consider upgrading your <a href="#" > card plan. </a> </p>
                </div>
            </div>
        </div>`
        }
        var cardServices = `
        <div id="card${card.id}promotion"  style="padding:9px;">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="">What do you offer? </h3>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <p>Coming Soon!</p>
                </div>
            </div>
        </div>`;
        var cardAnalytics = `
        <div id="card${card.id}promotion"  style="padding:9px;">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="">Analytics </h3>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <p>Coming Soon!</p>
                </div>
            </div>
        </div>`;
        return [cardData, cardDesign, cardPromotion, cardServices, cardAnalytics]
    }


    window.cardView = function(card) {
        var views = generateViewForCard(card)


        return [`
    <div class="row" id="${card.id}">
        <div class="col">
            <div style="padding: 64px;" align="center" class="">
                <div class="center">
                <div class="col-md-12 text-center">
                    <h3><b>${card.name + " " + card.surname + " " + card.tittle + " @ " + card.company}</b></h3>
                </div>
            </div>
            <div class="row center" style="color:black !important;">
                <a  class="popup-with-move-anim col centered" style="color:black !important"  href="#cardData${card.id}" >
                    <div class="whitew border lighten-3 col user-buttons waves-effect">
                    <i class="large material-icons">list</i>
                    <span class="indigo-text text-lighten-1"><h5>Data</h5></span>
                    </div>
                </a>
                <a  class="popup-with-move-anim col centered" style="color:black !important" href="#cardDesign${card.id}" >
                    <div class="whitew border lighten-3 col user-buttons waves-effect">
                    <i class="large material-icons">view_day</i>
                    <span class="indigo-text text-lighten-1"><h5>Design</h5></span>
                    </div>
                </a>
                <a  class="popup-with-move-anim col centered col" style="color:black !important"  href="#createPromotion${card.id}" >
                    <div class="whitew border lighten-3 col user-buttons waves-effect">
                    <i class="large material-icons">add_alert</i>
                    <span class="indigo-text text-lighten-1"><h5> Promotion</h5></span>
                    </div>
                </a>
                <a  class="popup-with-move-anim col centered" style="color:black !important" href="#cardServices${card.id}" >
                    <div class="whitew border user-buttons lighten-3 col waves-effect">
                    <i class="large material-icons">work_outline</i>
                    <span class="indigo-text text-lighten-1"><h5>Services</h5></span>
                    </div>
                </a>
                <a  class="popup-with-move-anim col centered"style="color:black !important"  href="#analytics${card.id}" >
                    <div class="whitew border user-buttons lighten-3 col waves-effect">
                    <i class="large material-icons">analytics</i>
                    <span class="indigo-text text-lighten-1"><h5>Analytics</h5></span>
                    </div>
                </a>
            </div>
        </div>
    `, `
    <div id="cardData${card.id}" class="overlay">
        <div class="popup">
		<a class="close" href="#">&times;</a>
              ${views[0]}
        </div>
    </div>`, `
    <div id="cardDesign${card.id}" class="overlay">
        <div class="popup">
		<a class="close" href="#">&times;</a>
              ${views[1]}
        </div>
    </div>`, `
    <div id="createPromotion${card.id}" class="overlay">
        <div class="popup">
		<a class="close" href="#">&times;</a>
                ${views[2]}
        </div>
    </div>`, `
    <div id="cardServices${card.id}" class="overlay">
        <div class="popup">
		<a class="close" href="#">&times;</a>
              ${views[3]}
        </div>
    </div>`, `
    <div id="analytics${card.id}" class="overlay">
        <div class="popup">
		<a class="close" href="#">&times;</a>
              ${views[4]}
        </div>
    </div>
    `, ]
    }

})(jQuery);


// userSettings();

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
                $('#nameHereGreeting').html('Welcome ' + u.name);
                $('#settingsContent').html(generateSettings(u));
                var type = u.accountType;
                surname = u.surname;
                if (type === 'business')
                    total = (total - 30) * -1;
                if (type === 'corporate')
                    total = (total - 90) * -1;

                var l = `Greetings ${u.username}!`;
                if (type === 'business')
                    l = `Greetings ${u.username}, you have ${total} ogier cards left from your Business Plan Account.`;
                if (type === 'corporate')
                    l = `Greetings ${u.username}, you have ${total} ogier cards left from your Corporate Plan Account.`;

                console.log(l)
                document.getElementById('countCardsS').innerHTML = l;
            })(jQuery);

        })
        .catch(error => console.log('error', error))
}

function generateSettings(user) {
    return `
    <form id="settings${user.id}form"  style="padding:9px;">
        <div class="row">
            <div class="col-md-12">
                <h3 class="">User Account</h3>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-6">
                <label for="name">Name</label>
                <input type="text" class="form-control" value="${user.name}" id="name" name="name" required>
            </div>
            <div class="form-group col-md-6">
                <label for="surname">Surname</label>
                <input type="text" class="form-control" value="${user.surname}"  id="surname" name="surname" required>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-6">
                <label for="username">Username</label>
                <input type="text" class="form-control" value="${user.username}" id="username" name="username" required>
            </div>
            <div class="form-group col-md-6">
                <label for="email">email</label>
                <input type="text" class="form-control" value="${user.email}" id="email" name="email" required>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-6">
                <label for="address1">Address Line 1</label>
                <input type="text" class="form-control" value="${user.addLine1}" id="address1" name="email" required>
            </div>
            <div class="form-group col-md-4">
                <label for="cityAdd">City</label>
                <input type="text" class="form-control" value="${user.city}"  id="cityAdd" name="password" required>
            </div>
            <div class="form-group col-md-2">
                <label for="zipCode">Zip Code</label>
                <input type="text" class="form-control" value="${user.zipCode}"  id="zipCode" name="password" required>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-4">
                <label for="address2">Address Line 2 </label>
                <input type="text" class="form-control" value="${user.addLine2}" id="address2" name="email" required>
            </div>
            <div class="form-group col-md-4">
                <label for="country">Country</label>
                <input type="text" class="form-control" value="${user.country}"  id="country" name="password" required>
            </div>
            <div class="form-group col-md-4">
                <label for="phone">Phone</label>
                <input type="text" class="form-control" value="${user.phone}"  id="phone" name="password" required>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <button type="button" onClick="updateUser(${user.id});" style="color: white;" class="btn black save-update col-md-9 send-form">Update</button>
        </div>
    </form>`;
}

var prevId = 0;

function generateCard(id, i) {
    if (prevId) {
        $(`#cardContainer${prevId}`).html("");
    }
    prevId = id;
    (function($) {
        "use strict";
        fetch(baseURL + "card/give/me/" + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
            .then(response => response.json())
            .then(c => {
                $('#cardContainer' + c.id).html(cardView(c)[0]);
                $('#lightBoxContainer').append(cardView(c)[1]);
                $('#lightBoxContainer').append(cardView(c)[2]);
                $('#lightBoxContainer').append(cardView(c)[3]);
                $('#lightBoxContainer').append(cardView(c)[4]);
                $('#lightBoxContainer').append(cardView(c)[5]);
                createDesignDrgNDrop(c);
            })
            .catch(error => console.log('error', error));

    })(jQuery);

}

function createDesignDrgNDrop(c) {
    // ************************ Drag and drop ***************** //
    var dropArea = document.getElementById("drop" + c.id);
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
        document.body.addEventListener(eventName, preventDefaults, false)
    });
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    });
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    });
    dropArea.addEventListener('drop', handleDrop, false)

    function preventDefaults(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    function highlight(e) {
        dropArea.classList.add('highlight')
    }

    function unhighlight(e) {
        dropArea.classList.remove('highlight')
    }

    function handleDrop(e) {
        var dt = e.dataTransfer
        var file = dt.files

        handleFiles(file, c.id)
    }
}

function handleFiles(files, id) {
    files = [...files]
    var accept = ['jpg', 'png', 'jpeg', 'pdf', 'docx']
    accept.forEach(a => {
        if (files[0].name.split('.')[files[0].name.split('.').length - 1] == a) {
            var x = document.getElementById("drop" + id);
            x.innerHTML = x.innerHTML + `
                <label for="d">   Uploaded: ${files[0].name}  </label>
                <input type="hidden" class="form-control" id="d" >
                `;
            upload(files[0], id, 'design');

        } else {
            var x = document.getElementById("drop" + id);
            x.innerHTML = x.innerHTML + `
                <label for="d">Unacceptable file type  </label>
                `;

        }
    })
}

function upload(file, id, type) {
    location.hash = "";
    var ref = designs.child(Date.now() + '.' + file.name.split('.')[file.name.split('.').length - 1])
    swal_ajax('load');
    ref.put(file).then(function(snapshot) {}).then(function() {
        ref.getDownloadURL().then(function(url) {
            switch (type) {
                case 'design':
                    updateCardDesign(url, id);
                    break;
                case 'promotion':
                    publishPromotion(url, id);
                    break;
            }
        });
    });
}

function publishPromotion(url, id) {
    (function($) {
        "use strict";
        var payload = {
            cardID: id,
            title: $('#promotionTitle' + id).val(),
            description: $('#desc' + id).val(),
            photoURL: url,
            price: $('#offer' + id).val(),
        }


        $.ajax({
            type: "POST",
            data: JSON.stringify(payload),
            url: baseURL + "promotion/publish",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function(json) {
                swal_ajax('success');
                getData();
            },
            error: function(e) {
                swal_ajax('error');
                return false;
            }
        });

    })(jQuery);
}

function updateCardDesign(url, id) {
    fetch(baseURL + "card/give/me/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
        .then(response => response.json())
        .then(result => {
            result.designURL = url;

            (function($) {
                "use strict";
                location.hash = "";
                $.ajax({
                    type: "POST",
                    data: JSON.stringify(result),
                    url: baseURL + "card/update",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    success: function(json) {
                        swal_ajax('success');
                        getData();
                    },
                    error: function() {
                        swal_ajax('error');
                        return false;
                    }
                });

            })(jQuery);

        })
        .catch(error => console.log('error', error));
}

function deactivate(id) {
    (function($) {
        "use strict";
        location.hash = "";
        $.ajax({
            type: "POST",
            url: baseURL + "card/deactivate/" + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function(json) {
                swal_ajax('success');
                getData();
            },
            error: function() {
                swal_ajax('error');
                return false;
            }
        });

    })(jQuery);
}

function deleteCard(id) {
    (function($) {
        "use strict";
        location.hash = "";
        $.ajax({
            type: "DELETE",
            url: baseURL + "card/delete/" + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function(json) {
                swal_ajax('success');
                getData();
            },
            error: function() {
                swal_ajax('error');
                return false;
            }
        });

    })(jQuery);
}

function activate(id) {
    (function($) {
        "use strict";
        location.hash = "";
        $.ajax({
            type: "PUT",
            url: baseURL + "card/reActivate/" + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function(json) {
                swal_ajax('success');
                getData();
            },
            error: function() {
                swal_ajax('error');
                return false;
            }
        });

    })(jQuery);
}

function updateDesign(id) {
    location.hash = "";
    var x = document.getElementById("design" + id);
    if ('files' in x) {
        if (x.files.length == 0) {} else {
            for (var i = 0; i < x.files.length; i++) {
                var file = x.files[i];
                upload(file, id, 'design')
            }
        }
    }
}

function updatePromotion(id) {
    location.hash = "";
    var x = document.getElementById("designPromotion" + id);
    if ('files' in x) {
        if (x.files.length == 0) {} else {
            for (var i = 0; i < x.files.length; i++) {
                var file = x.files[i];
                upload(file, id, 'promotion')
            }
        }
    }
}

function updateValue(id) {
    (function($) {
        "use strict";
        location.hash = "";

        var name = $("#name" + id).val();
        var surname = $("#surname" + id).val();
        var email = $("#email" + id).val();
        var address = $("#address" + id).val(); /**  TODO: fix the shipping problem u dumb ass */
        var url = $("#url" + id).val();
        var tittle = $("#tittle" + id).val();
        var company = $("#company" + id).val();
        var catchLine = $("#lin" + id).val();
        var fb = $("#facebook" + id).val();
        var ig = $("#instagram" + id).val();
        var ln = $("#ln" + id).val();
        var tw = $("#twitter" + id).val();


        fetch(baseURL + "card/give/me/" + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
            .then(response => response.json())
            .then(result => {
                result.name = name;
                result.surname = surname;
                result.email = email;
                result.address = address;
                result.landingPage = url;
                result.tittle = tittle;
                result.catchLine = catchLine;
                result.company = company;
                result.facebook = fb;
                result.instagram = ig;
                result.linkedIn = ln;
                result.twitter = tw;

                $.ajax({
                    type: "POST",
                    data: JSON.stringify(result),
                    url: baseURL + "card/update",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    beforeSend: function() {
                        swal_ajax('load');
                    },
                    success: function(json) {
                        swal_ajax('success');
                        getData();
                    },
                    error: function() {
                        swal_ajax('error');
                        return false;
                    }
                });

            })
            .catch(error => console.log('error', error));


    })(jQuery);
}

function updateUser(id) {
    (function($) {
        "use strict";

        if ($("#password").val() != $("#confPass").val()) {
            $("#errPas").html('<b style="color: red;">Passwords should match </b>');
            $("#errPas1").html('<b style="color: red;">Passwords should match </b>');
            return;
        }

        $("#errPas").html("Password");
        $("#errPas1").html("Confirm Password");
        location.hash = "";

        fetch(baseURL + "who/am/i/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
            .then(response => response.json())
            .then(result => {
                result.name = $("#name").val();
                result.surname = $("#surname").val();
                result.email = $("#email").val();
                result.username = $("#username").val();
                result.addLine1 = $("#address1").val();
                result.addLine2 = $("#address2").val();
                result.zipCode = $("#zipCode").val();
                result.country = $("#country").val();
                result.city = $("#cityAdd").val();
                result.phone = $("#phone").val();


                $.ajax({
                    type: "POST",
                    data: JSON.stringify(result),
                    url: baseURL + "user/update",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    beforeSend: function() {
                        swal_ajax('load');
                    },
                    success: function(json) {
                        swal_ajax('success');
                        userSettings();
                    },
                    error: function() {
                        swal_ajax('error');
                        return false;
                    }
                });

            })
            .catch(error => console.log('error', error));


    })(jQuery);
}

function swal_ajax(type) {
    switch (type) {
        case 'load':
            Swal.fire({
                title: 'Loading!',
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
                onClose: () => {
                    clearInterval(1000)
                }
            });
            break;
        case 'error':
            Swal.fire(
                'ERROR!',
                'Something went wrong, please try again!',
                'error', {
                    timer: 2000,
                    timerProgressBar: true,
                }
            )
            setTimeout(function() { Swal.close() }, 1500);
            break;
        case 'success':
            Swal.fire(
                'Success!',
                'Card updated successfully!',
                'success', {
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timer: 750,
                });
            setTimeout(function() { Swal.close() }, 1500);
            break;
    }
}