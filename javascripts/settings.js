var config = {
    apiKey: "AIzaSyAVONv-JNWkMiuN3hBV_u2Mx0J-fpM3_dQ",
    authDomain: "schurz-ica.firebaseapp.com",
    databaseURL: "https://schurz-ica.firebaseio.com",
    storageBucket: "schurz-ica.appspot.com",
    messagingSenderId: "795121797573"
};
firebase.initializeApp(config);
var position; //global for position with team

window.onload = function(){
    //get Team Name before page loads to pass back to home if need be 
    var tmp = location.search.split('team=')[1];
    var team_name = decodeURI(tmp);

    var a = document.getElementById("homeLink");
    a.href = 'home.html?team='+team_name;

    //load information
    loadInfo();

    //event handlers
    document.getElementById('picBtn').addEventListener('click', updatePic, false);
    document.getElementById('displayNameBtn').addEventListener('click',updateDisplayName, false);
    document.getElementById('positionBtn').addEventListener('click',updatePosition,false);
}

function loadInfo(){
    var user = firebase.auth().currentUser;
    var picURL;
    var name;
    var email;
    if(user != null){
        picURL = user.photoURL;
        name = user.displayName;
        email = user.email;
        if(name == null){
            name = email.split('@')[0];
        }
        if(picURL == null){
            picURL = 'https://lh3.googleusercontent.com/-ga3rdcSM4Ew/AAAAAAAAAAI/AAAAAAAAAAA/AxsyS8ZZ1xM/photo.jpg';
        }
        firebase.database().ref('/Users/'+email.split('@')[0]+'/').on('value', snapshot => { 
            var position = Object(snapshot.val()).position;
            var html_image = document.getElementById("userPic");
            var html_name = document.getElementById("displayName");
            var html_position = document.getElementById("displayPosition");
            var html_email = document.getElementById("displayEmail");
            html_image.src = picURL;
            html_name.innerHTML = name;
            html_position.innerHTML = position;
            html_email.innerHTML = email;
        });
    }
}

function updatePic(){
    //add url to photo URL associated with current user
    var user = firebase.auth().currentUser;
    user.updateProfile({photoURL:document.getElementById("newPicURL").value}).then(function(){
        location.reload();
    }).catch(function(error){
        alert(error.code+'\n'+error.message);
        console.log(error.code+'\n'+error.message);
    });
}

function updateDisplayName(){
    //udpate display name of user
    var user = firebase.auth().currentUser;
    user.updateProfile({displayName:document.getElementById("newDisplayName").value}).then(function(){
        location.reload();
    }).catch(function(error){
        alert(error.code+'\n'+error.message);
        console.log(error.code+'\n'+error.message);
    });
}

function updatePosition(){
    var user = firebase.auth().currentUser;
    var new_position = document.getElementById("newPosition").value;
    firebase.database().ref('/Users/'+user.email.split('@')[0]+'/position/').transaction(function(currentVal){
        return new_position;
    }).then(function(){
        location.reload(); 
    }).catch(function(error){
        alert(error.code+'\n'+error.message);
    });
}


