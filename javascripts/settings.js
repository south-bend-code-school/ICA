var config = {
    apiKey: "AIzaSyAVONv-JNWkMiuN3hBV_u2Mx0J-fpM3_dQ",
    authDomain: "schurz-ica.firebaseapp.com",
    databaseURL: "https://schurz-ica.firebaseio.com",
    storageBucket: "schurz-ica.appspot.com",
    messagingSenderId: "795121797573"
};
firebase.initializeApp(config);

window.onload = function(){
    //get Team Name before page loads
    var tmp = location.search.split('team=')[1];
    var team_name = decodeURI(tmp);

    var a = document.getElementById("homeLink");
    a.href = 'home.html?team='+team_name;

}

