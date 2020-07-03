var usersIn = document.getElementsByClassName('usersIn');
var amir=JSON.parse(localStorage.getItem("Users"));
var xhttp = new XMLHttpRequest();
var allData;
xhttp.open('GET', "readUsers", true);
xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        var data = xhttp.responseText;
        allData = JSON.parse(data);
     
    }
};
xhttp.send();

function enterMainPage(){
    if(!usersIn[0].value){
        alert('You need a username!');
            return;
    }
    if(usersIn[1].value ==""){
        alert('You need a password!');
            return;
    }


    for (t = 0; t < allData.length;t++){
        if(usersIn[0].value == allData[t].username && usersIn[1].value == allData[t].password){
            console.log(usersIn[0].value + " is logged in!!!");
            document.location.href = 'http://localhost:8080/main';
            return
        } 
    }
            alert("Wrong username or password");
    
 


   /* var xhttp = new XMLHttpRequest();
        xhttp.open('GET', "main", true);
        xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        
        
    }
};
xhttp.send();
*/

}