var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
console.log(baseUrl);

if(getUrl.pathname == "/admins/viewcamps"){
  getcamps();
}

function getcamps(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      for(i = 0; i < data.length; i++){
            document.getElementById('cont').innerHTML += "<p id='id"+i+"'>"+data[i]._id+
            "</p><br><input class='form-control' id='campname"+[i]+"' type='text' value="+data[i].name+
            "><br><textarea class='form-control' id='campaddress"+[i]+"'>"+data[i].address+
            "</textarea><br> <input class='form-control' id='campsponname"+[i]+"' type='text' value="+data[i].sponsor.name+
            "><br> <input class='form-control' id='campsponnum"+[i]+"' type='number' value="+data[i].sponsor.number+
            "><br> <input class='form-control' id='campdate"+[i]+"' value="+data[i].date+
            " type='date'><br><input class='form-control' type='time' id='camptime"+[i]+"' value="+data[i].time+
            "><br><input class='form-control' type='button' value='edit' onclick='editit(id"+[i]+".innerHTML, "+i+")'><br><hr><br>";
      }
    }
  }
  xhttp.open("GET", baseUrl+"/getallcamps", true);
  xhttp.send();
}

function editit(x, y){
  console.log(y);
  var name = document.getElementById('campname'+y).value;
  var address = document.getElementById('campaddress'+y).value;
  var sponsor_name = document.getElementById('campsponname'+y).value;
  var sponsor_numb = document.getElementById('campsponnum'+y).value;
  var date = document.getElementById('campdate'+y).value;
  var time = document.getElementById('camptime'+y).value;

  var params = "name="+name+"&address="+address+"&sponsor_name="+sponsor_name+"&sponsor_numb="+sponsor_numb+"&spondate="+date+"&spontime="+time;

  console.log(params);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = ()=>{
    if (this.readyState == 4 && this.status == 200) {
      // getcamps();
    }
  }

  xhttp.open("PUT", baseUrl+"/updatecamps/"+x, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
}

function searchit(){
  document.getElementById('search-cont').innerHTML = "";
  var key = document.getElementById('blood_key').value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      for(i = 0; i < data.length; i++){
        document.getElementById('search-cont').innerHTML += '<div class="row"><div class="col-sm-3"><h2>'+data[i].bloodgroup+'</h2></div><div class="col-sm-3"><p><h4>'+data[i].fullname+'</h4></p></div><div class="col-sm-3"><p><h4>'+data[i].city+'</h4></p></div><div class="col-sm-3"><p><h4>'+data[i].phonenumber+'</h4></p></div></div>  ';
      }
    }
  }
  xhttp.open("GET", baseUrl+"/getblood/"+key, true);
  xhttp.send();
}
