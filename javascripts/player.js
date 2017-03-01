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
    var hit_distance_start = 0.0;
    var hit_distance_final = 0.0;
    var previous_seconds = 0.0;
    var final_seconds = 0.0;
    var major_hit = 0;
    var hit_time = [0];
    var dbRef = firebase.database().ref("Teams/"+team_name+"/Chips/Chip1/accelerationData");
    dbRef.on('value',function(snapshot){
      //record previous seconds for array
      previous_seconds = final_seconds;
      final_seconds = new Date().getTime() / 1000;

      var acc = Object(snapshot.val());
      var svg = document.getElementById('svg');
      var polyline= document.getElementById('hits_polyline');
      var point = svg.createSVGPoint();
      var time = (final_seconds - start_seconds)*10;
      console.log(time);
      hit_distance_start = hit_distance_final;
      hit_distance_final = acc.x*10;

      //if distance is too great, add another hit with the time since last hit
      if((hit_distance_final - hit_distance_start) > 1.0){
        major_hit += 1;
        var since_last = final_seconds - previous_seconds;
        hit_time.push(since_last);
      }
      checkDamage(hit_time);

      point.x = time;
      point.y = major_hit;
      console.log(point);
      polyline.points.appendItem(point);

    });
}

//decrease health bar for hits that happend every 5 seconds; increase otherwise
function checkDamage(a){
    var len = a.length;
    for(var i; i < len; i++){
      if( a[i] <= 5.0){
        decreaseHealth();
      } else if (a[i] > 5.0){
        increaseHealth();
      }
    }
}

function decreaseHealth(){
    var bar = document.getElementById('status');
    var list = document.getElementById('recommendations').value;
    var current_percent = bar.offsetWidth;
    console.log(current_percent);
    //boundary condition
    if(current_percent >= 0){
      var new_percent = current_percent - 5;
      bar.style.width = new_percent;
    }

    if(new_precent < (360*.75)){
      bar.style.backgroundColor = "orange";
    } else if( new_percent < (360*.50)){
      bar.style.backgroundColor = "darkOrange";
    } else if( new_percent < (360*.40)){
      bar.style.backgroundColor = "red";
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode("Player needs to be taken out of the game"));
      list.appendChild(entry);
    } else{
      bar.style.backgroundColor = "limegreen";
    }
}

function increaseHealth(){
    var bar = document.getElementById('status');
    var current_percent = bar.style.offsetWidth;
    console.log(current_percent);
    //bondary condition
    if(current_percent <= 360){
      var new_percent = current_percent + 5;
      bar.style.width = new_percent;
    }
    if(new_precent < (360*.75)){
      bar.style.backgroundColor = "orange";
    } else if( new_percent < (360*.50)){
      bar.style.backgroundColor = "darkOrange";
    } else if( new_percent < (360*.40)){
      bar.style.backgroundColor = "red";
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode("Player needs to be taken out of the game"));
      list.appendChild(entry);
    } else{
      bar.style.backgroundColor = "limegreen";
    }

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
