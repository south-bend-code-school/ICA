var config = {
    apiKey: "AIzaSyAVONv-JNWkMiuN3hBV_u2Mx0J-fpM3_dQ",
    authDomain: "schurz-ica.firebaseapp.com",
    databaseURL: "https://schurz-ica.firebaseio.com",
    storageBucket: "schurz-ica.appspot.com",
    messagingSenderId: "795121797573"
};
firebase.initializeApp(config);

window.onload = function(){
/*COMMENT IN IF WANT AUTOMATIC "REMEMBER ME" SIGN IN -- BUT THEN HOW WOULD TEAM BE KNOWN BEFORE
    firebase.auth().onAuthStateChanged( function(user) {
        if (user) {
            window.location = "views/home.html?team=";
        }
    });
*/
    document.getElementById('loginBtn').addEventListener('click', login, false);
}
/*LOG USER IN OR CREATE USER*/
function login(){
    var teamName = document.getElementById('teamSelection').value;
    var email = document.getElementById('emailTxt').value;
    var pwd = document.getElementById('passwordTxt').value;
 
    //check valid email and password lengths
    if (email.length < 4 && (email.includes("@") == true) && (email.includes(".") == true)) {
        alert('Please enter a valid email address.');
        return;
    }
    var username = email.split("@")[0];
    if (pwd.length < 5) {
        alert('Please enter a stronger password.');
        return;
    }
    //check if user is in system; is so check if userID matches with password in database
    firebase.auth().signInWithEmailAndPassword(email, pwd).then(function(){
        var user = firebase.auth().currentUser;
        if(user != null){
            var uid = user.uid;
        
            firebase.database().ref('Users/'+username).once('value').then(function(snapshot){
                console.log(snapshot.val());
                if(teamName == snapshot.val().team){
                    window.location = 'views/home.html?team='+teamName;
                }else{
                    alert('User is not associated with the '+teamName);
                }
            });
        }
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // if user not found; create user in DB, then with auth, then add uid to db, else display message
        if(errorCode == 'auth/user-not-found'){
            //second set to database doesn't work if first set is commented out; no idea why
            firebase.database().ref('Users/'+username).set({Team:teamName}).then(function(){
                firebase.auth().createUserWithEmailAndPassword(email,pwd).then(function(){
                    var user = firebase.auth().currentUser;
                    if(user != null){
                        firebase.database().ref('Users/'+username+'/').set({team:teamName,uid:user.uid});
                        window.location = 'views/home.html?team='+teamName;
                    }
                }).catch(function(error){
                    alert(error.code+'\n'+error.message);
                });
            }).catch(function(error){
                alert(errro.code+'\n'+error.message);
            });
            console.log("user created");
        }else{
            alert(error.code+'\n'+error.message);
            console.log(error);
        }
        // [END_EXCLUDE]
    });
}
//logout
/*TODO:MAY OR MAY NOT HAVE TO SIGN CURRENT USER OUT BEFORE SIGNING NEW USER IN
function logout(){
    firebase.auth().signOut().then(function(){
        window.location = "../index.html";
    },function(error){
        console.log("error occured")
        var errorCode = error.code;
        alert(errroCode); 
    });
}
*/
