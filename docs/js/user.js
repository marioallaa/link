/* user stuff */



(function($) {
    "use strict";
    var baseURL = "http://localhost:300/"


    function getData() {
        fetch(baseURL + "card/mine/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    getData();

    function generateViewForCard(card) {
        var cardData = `
        <form id="my-form" novalidate="novalidate">
            <div class="row">
                <div class="col-md-12 text-center">
                    <h1 class="form-title">Update Card ${card}</h1>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" name="name" required="">
                </div>
                <div class="form-group col-md-6">
                    <label for="email">E-mail</label>
                    <input type="text" class="form-control" id="email" name="email" required="">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-6">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" name="name" required="">
                </div>
                <div class="form-group col-md-6">
                    <label for="email">E-mail</label>
                    <input type="text" class="form-control" id="email" name="email" required="">
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <label for="something">Something</label>
                    <textarea name="something" class="form-control" id=""></textarea>
                </div>
            </div>
            <button type="submit" class="btn send-form">Send</button>
        </form>`;
        var cardDesign = null;
        var cardPromotion = null;
        var cardServices = null;
        var cardAnalytics = null;
        return [cardData, cardDesign, cardPromotion, cardServices, cardAnalytics]
    }




    function cardView(cardID) {
        var card = generateViewForCard(cardID)

        return [`
    <div class="row" id="${cardID}">
        <div class="col">
            <div style="padding: 64px;" align="center" class="card">
                <div class="center">
                <div class="col-md-12 text-center">
                <h3><b>Card No. ${cardID} </b></h3>
                </div>
            </div>
                <div class="row center">
                <a  class="popup-with-move-anim col centered"  href="#cardData${cardID}" >
                    <div class="white border lighten-3 col user-buttons waves-effect">
                    <i class="indigo-text text-lighten-1 large material-icons">list</i>
                    <span class="indigo-text text-lighten-1"><h5>Data</h5></span>
                    </div>
                </a>
                <a  class="popup-with-move-anim col centered"  href="#cardDesign${cardID}" >
                    <div class="white border lighten-3 col user-buttons waves-effect">
                    <i class="indigo-text text-lighten-1 large material-icons">view_day</i>
                    <span class="indigo-text text-lighten-1"><h5>Design</h5></span>
                    </div>
                </a>
                <a  class="popup-with-move-anim col centered col"  href="#promotion${cardID}" >
                    <div class="white border lighten-3 col user-buttons waves-effect">
                    <i class="indigo-text text-lighten-1 large material-icons">add_alert</i>
                    <span class="indigo-text text-lighten-1"><h5> Promotion</h5></span>
                    </div>
                </a>
                <a  class="popup-with-move-anim col centered"  href="#cardServices${cardID}" >
                    <div class="white border user-buttons lighten-3 col waves-effect">
                    <i class="indigo-text text-lighten-1 large material-icons">work_outline</i>
                    <span class="indigo-text text-lighten-1"><h5>Services</h5></span>
                    </div>
                </a>
                <a  class="popup-with-move-anim col centered"  href="#analytics${cardID}" >
                    <div class="white border user-buttons lighten-3 col waves-effect">
                    <i class="indigo-text text-lighten-1 large material-icons">analytics</i>
                    <span class="indigo-text text-lighten-1"><h5>Analytics</h5></span>
                    </div>
                </a>
            </div>
        </div>
    </div>`, `
    <div id="cardData${cardID}" class="overlay">
        <div class="popup">
		<a class="close" href="#">&times;</a>
              ${card[0]}
        </div>
    </div>

    <div id="cardDesign${cardID}" class="overlay">
        <div class="popup">
		<a class="close" href="#">&times;</a>
              ${card[1]}
        </div>
    </div>

    <div id="promotion${cardID}" class="overlay">
        <div class="popup">
		<a class="close" href="#">&times;</a>
              ${card[2]}
        </div>
    </div>

    <div id="cardServices${cardID}" class="overlay">
        <div class="popup">
		<a class="close" href="#">&times;</a>
              ${card[3]}
        </div>
    </div>

    <div id="analytics${cardID}" class="overlay">
        <div class="popup">
		<a class="close" href="#">&times;</a>
              ${card[4]}
        </div>
    </div>
    `, ]
    }


    let cardID = 0;
    $('#create-new-card').click(function() {
        cardID++;
        $('#cardContainer').append(cardView(cardID)[0]);
        $('#lightBoxContainer').append(cardView(cardID)[1]);
    });



})(jQuery);