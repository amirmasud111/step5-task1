var userInfo = document.getElementsByClassName('users');
var allUsersTasks = [];



function submitIt(){

    if(!userInfo[0].value){
        alert('You need a username!');
            return;
    }
    if(userInfo[1].value ==""){
        alert('You need a password!');
            return;
    }
    var mydata = {
        username:userInfo[0].value,
        password: userInfo[1].value
    };
    allUsersTasks.push(mydata);
    userInfo[0].value = "";
    userInfo[1].value = "";


    var data = allUsersTasks;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
		
		}
	}
	xhttp.open('POST', "writeUsers", true);
	xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.send(JSON.stringify(data));
    

    
   
}   
