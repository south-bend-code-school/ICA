var config = {
    apiKey: "AIzaSyAVONv-JNWkMiuN3hBV_u2Mx0J-fpM3_dQ",
    authDomain: "schurz-ica.firebaseapp.com",
    databaseURL: "https://schurz-ica.firebaseio.com",
    storageBucket: "schurz-ica.appspot.com",
    messagingSenderId: "795121797573"
};
firebase.initializeApp(config);


window.onload = function(){
    initPlayerData();

}

/*initialize columns of players with given data*/
function initPlayerData(){
    //get Team Name
    var tmp = location.search.split('team=')[1];
    var team_name = decodeURI(tmp);

}
/*
//Sync object changes
firebase.database().ref('Teams/'+team_name+'/Players/).on('value', snapshot=> {
    //get list of all players
    var dataKeys = Object.keys(snapshot.val());
    console.log(dataKeys);
    console.log(snapshot.val());
    for( i in dataKeys){
        //make new div, h3, p, img for displaying database info
        //var div = document.createElement('div');
        var name = document.createElement('h3');
        var description = document.createElement('p');
        var upper_div = document.createElement('div');
        var lower_div = document.createElement('div');
        var div = document.createElement('div');
        var image = document.createElement('img');
        var aTag = document.createElement('a');
        aTag.setAttribute('href','chat.html?room='+dataKeys[i]);
        /*
        //create text, load image to put into elements above
        var nameText = document.createTextNode(dataKeys[i]);
        if( snapshot.val()[dataKeys[i]]["Description"] ){
            var descriptionText = document.createTextNode(snapshot.val()[dataKeys[i]]["Description"]);
        } else {
            var descriptionText = document.createTextNode("No Description");
        }
        if( snapshot.val()[dataKeys[i]]["ImageURL"] ){
            var imageURL = https://lh3.googleusercontent.com/-ga3rdcSM4Ew/AAAAAAAAAAI/AAAAAAAAAAA/AxsyS8ZZ1xM/photo.jpg;
        } else {
            var imageURL = "No Description";
        }
        //OTHER START-BACKSLASH WILL GO HERE
        var imageURL = 'https://lh3.googleusercontent.com/-ga3rdcSM4Ew/AAAAAAAAAAI/AAAAAAAAAAA/AxsyS8ZZ1xM/photo.jpg';
        //append text/pic to elements
        name.appendChild(nameText);
        description.appendChild(descriptionText);
        //add elements to div
        upper_div.appendChild(name);
        upper_div.appendChild(description);
        //make div changes
        div.style.textAlign = "center";
        div.style.border = "solid black 5px";
        div.style.float = "left";
        div.style.width = "300px";
        div.style.height = "300px";
        div.style.margin = "1em";
        div.style.display = "inline-grid";
        div.style.backgroundColor = "LightBlue";
        div.style.backgroundImage = "url("+imageURL+")";
        div.style.backgroundSize = "contain";
        upper_div.style.marginTop = "100px";
        upper_div.style.height = "25%";
        //append divs
        div.appendChild(upper_div);
        aTag.appendChild(div);
        //append a ref tag (everything) to the body of the html document
        var middle = document.getElementById("middle");
        middle.appendChild(aTag);
    }
});
*/
