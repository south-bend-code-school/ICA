var config = {
    apiKey: "AIzaSyAVONv-JNWkMiuN3hBV_u2Mx0J-fpM3_dQ",
    authDomain: "schurz-ica.firebaseapp.com",
    databaseURL: "https://schurz-ica.firebaseio.com",
    storageBucket: "schurz-ica.appspot.com",
    messagingSenderId: "795121797573"
};
firebase.initializeApp(config);

var tmp;
var team_name;
var start_seconds = new Date().getTime() / 1000;

window.onload = function(){
    var team = location.search.split('team=')[1];
    var aHome = document.getElementById("homeLink");
    var aSettings = document.getElementById("settingsLink"); 
    aHome.href = "home.html?team="+team;
    aSettings.href = "settings.html?team="+team;
    getPlayerInfo();
    updateGraph();
}

//when change in database occurs; get current time (record when x jumps greater than ... after how many seconds since db started updating)
function updateGraph(){
    var dbRef = firebase.database().ref("Teams/"+team_name+"/Chips/Chip1/accelerationData");
    dbRef.on('value',function(snapshot){
      var seconds = new Date().getTime() / 1000;
      var acc = Object(snapshot.val());
      var svg = document.getElementById('svg');

      var point = svg.createSVGPoint();
      var final_seconds = new Date().getTime() / 1000;
      var time = (final_seconds - start_seconds)*10;
      console.log(time);
      var y_val = acc.x*10;
      point.x = time;
      point.y = y_val;
      console.log(point);
      var polyline= document.getElementById('hits_polyline');
      polyline.points.appendItem(point);

      //p.getAtt
      //var points = polyline.getAttribute("hits_polyline");
      //  points += "10, 20";
      //  polyline.setAttribute(points);
    });
    
}

function getPlayerInfo(){
    //get name and team
    tmp = location.search.split("player=")[1];
    team_name = decodeURI(tmp.split("&team=")[1]);
    var player_name = decodeURI(tmp.split("&team=")[0]);
    var player_name_spaced = player_name.split(/(?=[A-Z])/).join(" ");
    var player_first = player_name_spaced.split(" ")[0];
    var player_last = player_name_spaced.split(" ")[1];
    //db reference
    var dbRef = firebase.database().ref("Teams/"+team_name+"/Players");
    //get html elements
    var pic = document.getElementById("playerPic");
    var name = document.getElementById("playerName");
    var position = document.getElementById("playerPosition");
    var stat = document.getElementById("playerStatus");
    dbRef.once('value').then(function(snapshot) {
        snapshot.forEach(function(childsnap){
            player_data = Object(childsnap.val());
            //change player info
            if(player_data.FName == player_first && player_data.LName == player_last){
                pic.src = "../images/"+player_name+".jpg";
                position.innerHTML = player_data.Position;
                name.innerHTML = player_name_spaced;
            }
        });
    });
    
//    var player_name = location.search.split('player=')[1];
//    document.getElementById('playerName').innerHTML = player_name; 
}
