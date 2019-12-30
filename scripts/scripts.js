/**
 * Check if the username or password or password confirmation is empty
 */
function registration() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmation = document.getElementById('confirmation').value;
    // var password = document.forms["RegForm"]["Password"];
    // var confirmation = document.forms[ "RegForm"]["Confirmation"];

    if (username == "") {
        window.alert("Please enter your username.");
        name.focus();
        return false;
    }
    if (password == "") {
        window.alert("Please enter your password");
        password.focus();
        return false;
    }
    if (confirmation == "") {
        window.alert("Please confirm your password");
        password.focus();
        return false;
    }
    return true;
}

/**
 * Check if the username or password is empty
 */
function signin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username == "") {
        window.alert("Please enter your username.");
        name.focus();
        return false;
    }
    if (password == "") {
        window.alert("Please enter your password");
        password.focus();
        return false;
    }
    return true;
}


/**
 * Insert the google map
 */
function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 43.258551,
            lng: -79.918679
        },
        zoom: 14
    });

    // This is HTML5 geolocation. Get current location
    currentlocationWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            currentlocationWindow.setPosition(pos);
            currentlocationWindow.setContent('You are here.');
            currentlocationWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, currentlocationWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, currentlocationWindow, map.getCenter());
    };

    /**
     * This is for the Lable on markers on the map
     */
    var locations = [
        ['Steel City Billiards', 43.252641, -79.938498, 4],
    ];
    var marker, i;
    var contentString = 'ha';
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
    });
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            animation: google.maps.Animation.DROP, //map markers droppin animation


        });




        //listener for the click on markers
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));


    };

}

/**
 * Insert the google map
 */

function initMapView() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 43.258551,
            lng: -79.918679
        },
        zoom: 11
    });

    // This is HTML5 geolocation. Get the current location and tell user where they are by infowindow
    currentlocationWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            currentlocationWindow.setPosition(pos);
            currentlocationWindow.setContent('You are here.');
            currentlocationWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, currentlocationWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, currentlocationWindow, map.getCenter());
    };

    //Contents in the label on steel city billiards marker
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Steel City Billiards</h1>' +
        '<div id="bodyContent">' +
        '<p>This is the best billiards pool hall in the city, you will not regret to play pool here, but please notice: they do not provide pool cue, you have to bring your own one! <a href="sample_1object_page.html">' +
        '/sample_1object_page.html/' +
        '</div>' +
        '</div>';
    //Location for all markers
    var locations = [
        ['Steel City Billiards', 43.252641, -79.938498, 4],
        ['Boulevard Billiards', 43.262850, -79.877766, 5],
        ['Mighty Mikes Pub & Billiards', 43.254065, -79.866031, 3],
        ['End Pocket The', 43.223680, -79.884430, 2],
        ['Krooked Q Billiards', 43.254523, -79.827387, 1]
    ];
    var marker, i;


    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            animation: google.maps.Animation.DROP,


        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                if (i == 0) {
                    var infowindowForMark = new google.maps.InfoWindow();
                    infowindowForMark.setContent(contentString);
                    infowindowForMark.open(map, marker);

                } else {
                    var infowindowForMark = new google.maps.InfoWindow();
                    infowindowForMark.setContent(locations[i][0]);
                    // infowindow.setContent.contentString(locations = ['Steel City Billiards', 43.252641, -79.938498, 4]);
                    infowindowForMark.open(map, marker);
                }
            }
        })(marker, i));
    };
    var infowindow = new google.maps.InfoWindow();
}

function handleLocationError(browserHasGeolocation, currentlocationWindow, pos) {
    currentlocationWindow.setPosition(pos);
    currentlocationWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    currentlocationWindow.open(map);
}
/**
 * Get coordiante for current location, x is latitude y is longitude
 */
function getLocation(x, y) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.value = position.coords.latitude;
    y.value = position.coords.longitude;
}

function getFile(type) { //Simulate click event to the hidden file input element of our form (because I used a customized file input button)
    document.getElementById(type).click();
}

function sub(obj, type) { //Change name of our customized button to the file name
    var file = obj.value;
    if (file != "") {
        var fileName = file.split("\\");
        document.getElementById(type).innerHTML = fileName[fileName.length - 1]; //Change name of button
    } else {
        If(type == "upImageFileButton")
        document.getElementById("upfileButton").innerHTML = "<style='font-size:10px' id='upfileButton'>Upload Image <i class='fa fa-camera-retro'></i>"; //If use chooses nothing, change back to initial style
        If(type == "upVideoFileButton")
        document.getElementById("upfileButton").innerHTML = "<style='font-size:10px' id='upVideoFileButton'>Upload Video <i class='fa fa-film'></i>";
    }
}