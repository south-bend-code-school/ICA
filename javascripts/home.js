var config = {
    apiKey: "AIzaSyAVONv-JNWkMiuN3hBV_u2Mx0J-fpM3_dQ",
    authDomain: "schurz-ica.firebaseapp.com",
    databaseURL: "https://schurz-ica.firebaseio.com",
    storageBucket: "schurz-ica.appspot.com",
    messagingSenderId: "795121797573"
};
firebase.initializeApp(config);

var tmp = location.search.split('team=')[1];
var team_name = decodeURI(tmp);
var dataKeys;
window.onload = function(){
var a = document.getElementById("settingsLink");
a.href = "settings.html?team="+team_name;
}
/*Columns of data with given info*/
//Sync object changes
firebase.database().ref('Teams/'+team_name+'/Players/').on('value', snapshot=> {
    //get list of all players; use i for for each player and ".attribute" for specific value
    dataKeys = Object.values(snapshot.val());
    //for( i in dataKeys){
    var side = 2;
    var storageRef = firebase.storage();
    var imageRef;
    var imageURL;
    for( i in dataKeys){
        //make new div, h3, p, img for displaying database info
        //var div = document.createElement('div');
        var name = document.createElement('h3');
        var position = document.createElement('p');
        var left_div = document.createElement('div');
        var right_div = document.createElement('div');
        var div = document.createElement('div');
        var image = document.createElement('img');
        var aTag = document.createElement('a');
        aTag.setAttribute('href','player.html?player='+dataKeys[i].FName+dataKeys[i].LName+'&team='+team_name);

        //create text, load image to put into elements above
        var nameText = document.createTextNode(dataKeys[i].LName+','+dataKeys[i].FName);
        var positionText = document.createTextNode(dataKeys[i].Position);

        //get download image url from storage of firebase; if pic not present use default
        /*CODE WAS SUPPOSE TO RETURN FIREBASE STORAGE BUT THAT DIDNT WORK SO USING LOCAL STORAGE
        imageRef = storageRef.ref('/PlayerImages/'+dataKeys[i].FName+dataKeys[i].LName+'.png');
        imageRef.getDownloadURL().then(function(url){
            //TODO:then function running after loop
            imageURL = url;
            console.log(imageURL);
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
            console.log(errorCode+'\n'+errorMessage);
            image.src = 'https://lh3.googleusercontent.com/-ga3rdcSM4Ew/AAAAAAAAAAI/AAAAAAAAAAA/AxsyS8ZZ1xM/photo.jpg';
        });*/
        //set image source
        image.src = "../images/"+dataKeys[i].FName+dataKeys[i].LName+".jpg";
        image.onerror = function(){
            image.src = "../images/default.png";
        }

        //append text/pic to elements
        name.appendChild(nameText);
        position.appendChild(positionText);

        //add elements to div
        right_div.appendChild(name);
        right_div.appendChild(position);
        left_div.appendChild(image);

        //make div changes
        div.style.textAlign = "center";
//        div.style.border = "solid black 1px";
        div.style.float = "left";
        div.style.width = "100%";
        div.style.height = "100px";
        div.style.margin = "1em";
        div.style.display = "inline-block";
        div.style.borderRadius = "50% 0% 0% 50%";
//        div.style.borderLeftColor = "white";

        left_div.style.maxWidth = "25%";
        left_div.style.float = "left";
        left_div.style.clear = "both";
        right_div.style.width = "75%";
        right_div.style.textAlign = "left";
        right_div.style.float = "right";
        right_div.style.paddingTop = "10px";

        image.style.width = "75%";
        image.style.height = "100px";
        image.style.display = "block";
        image.style.clear = "both";
        image.style.borderRadius = "50%";

        //append divs
        div.appendChild(left_div);
        div.appendChild(right_div);
        aTag.appendChild(div);
        //append aTag (everything) to the body of the html document
        if(side % 2 == 0){
            var leftColumn = document.getElementById("leftListing");
            leftColumn.appendChild(aTag);
        }else{
            var rightColumn = document.getElementById("rightListing");
            rightColumn.appendChild(aTag);
        }
        side = side + 1;
    }
});

