var config = {
    apiKey: "AIzaSyAVONv-JNWkMiuN3hBV_u2Mx0J-fpM3_dQ",
    authDomain: "schurz-ica.firebaseapp.com",
    databaseURL: "https://schurz-ica.firebaseio.com",
    storageBucket: "schurz-ica.appspot.com",
    messagingSenderId: "795121797573"
};
firebase.initializeApp(config);

window.onload = function(){
    getPlayerInfo();
}

function getPlayerInfo(){
    var tmp = location.search.split("player=")[1];
    var team_name = decodeURI(tmp.split("&team=")[1]);
    var player_name = decodeURI(tmp.split("&team=")[0]);

    var dbRef = firebase.database().ref("Teams/"+team_name+"/Players");

    dbRef.once('value', snapshot=> {
        console.log(snapshot);
    });
    
//    var player_name = location.search.split('player=')[1];
//    document.getElementById('playerName').innerHTML = player_name; 
}
