var config = {
    apiKey: "AIzaSyAVONv-JNWkMiuN3hBV_u2Mx0J-fpM3_dQ",
    authDomain: "schurz-ica.firebaseapp.com",
    databaseURL: "https://schurz-ica.firebaseio.com",
    storageBucket: "schurz-ica.appspot.com",
    messagingSenderId: "795121797573"
};
firebase.initializeApp(config);

window.onload = function(){
    document.getElementById('loginBtn').addEventListener('click', login, false);
}

function login(){
    var teamName = document.getElementById('teamTxt').value;
    var username = document.getElementById('usernameTxt').value;
    var pwd = document.getElementById('passwordTxt').value;

    //check if teams exists, if that user belongs to that team, and password matches user password in database
    //TODO:Log user in using "logUserInWithEmailAndPassword"
    return firebase.database().ref('Teams/'+teamName+'/Users/'+username).once('value').then(function(snapshot){
        if (pwd == snapshot.val().Password){
            window.location = 'views/home.html?team='+teamName;
        }
    }).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode+"\n"+errorMessage);
        console.log(error);
    });
}
