
var config = {
    apiKey: "AIzaSyCXM3eVPdinynCUbU1RkGVq2V5LNzv6DpY",
    authDomain: "mainserver-c1560.firebaseapp.com",
    databaseURL: "https://mainserver-c1560.firebaseio.com",
    projectId: "mainserver-c1560",
    storageBucket: "mainserver-c1560.appspot.com",
    messagingSenderId: "107380399049",
    appId: "1:107380399049:web:0e2f8086f44986b940a618",
    measurementId: "G-SRTPSCM310"
};

firebase.initializeApp(config);
var db = firebase.database();
console.log("Ready")

function interviewer(){
    var com_name = document.getElementById("company_name").value.toUpperCase();
    var pass_code = document.getElementById("passcode").value;
    var userRef = db.ref("MESA");
    if (com_name !=""){
        userRef.once('value', function(snapshot_check){
            if (snapshot_check.hasChild(com_name)){
                var verify = db.ref("MESA/"+com_name+"/password");
                verify.once('value', function(snap_in){
                    if (snap_in.val() == pass_code){
                        alert("Welcome Back")
                        window.location.href = "interviewer.html" +"?para1="+ com_name;
                    }
                    else{
                        alert("Wrong Password")
                    }
                    
                })
            }
            else {
                db.ref('MESA/' + com_name).set({
                    password: pass_code,
                    name: com_name,
                    student: 0,
                    count: 0,
                    call: 0,
                    calling_now: 0,
                    loc: "Yet to be Announced"
                });
                alert(com_name+" registered")
                window.location.href = "interviewer.html" +"?para1="+ com_name;
            }
        });
    }
    else{
        alert("Please Enter Company Name")
    }
    
}

function interviewee(){
    var com_name = document.getElementById("company_name").value.toUpperCase();
    if (com_name != ""){
        window.location.href = "interviewee.html" +"?para1="+ com_name;
    }
    else{
        alert("Please Enter Company Name")
    }
}


document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    console.log("I am Ready")
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
});

window.onload = function(){
    var get_kvc = db.ref("MESA/KVC/count");
    get_kvc.on('value', function(snapshot){
        document.getElementById("total-kvc").innerHTML="Total: " + snapshot.val()
    })
    var get_kvc = db.ref("MESA/THK JAPAN/count");
    get_kvc.on('value', function(snapshot){
        document.getElementById("total-thk").innerHTML="Total: " + snapshot.val()
    })
    var get_kvc = db.ref("MESA/WESTERN DIGITAL/count");
    get_kvc.on('value', function(snapshot){
        document.getElementById("total-wd").innerHTML="Total: " + snapshot.val()
    })
    var get_kvc = db.ref("MESA/PESTECH/count");
    get_kvc.on('value', function(snapshot){
        document.getElementById("total-pestech").innerHTML="Total: " + snapshot.val()
    })
    var get_kvc = db.ref("MESA/NESTLE/count");
    get_kvc.on('value', function(snapshot){
        document.getElementById("total-nestle").innerHTML="Total: " + snapshot.val()
    })

    var get_kvc = db.ref("MESA/KVC/calling_now");
    get_kvc.on('value', function(snapshot){
        document.getElementById("current-kvc").innerHTML="Current: " + snapshot.val()
    })
    var get_kvc = db.ref("MESA/THK JAPAN/calling_now");
    get_kvc.on('value', function(snapshot){
        document.getElementById("current-thk").innerHTML="Current: " + snapshot.val()
    })
    var get_kvc = db.ref("MESA/WESTERN DIGITAL/calling_now");
    get_kvc.on('value', function(snapshot){
        document.getElementById("current-wd").innerHTML="Current: " + snapshot.val()
    })
    var get_kvc = db.ref("MESA/PESTECH/calling_now");
    get_kvc.on('value', function(snapshot){
        document.getElementById("current-pestech").innerHTML="Current: " + snapshot.val()
    })
    var get_kvc = db.ref("MESA/NESTLE/calling_now");
    get_kvc.on('value', function(snapshot){
        document.getElementById("current-nestle").innerHTML="Current: " + snapshot.val()
    })

    var get_kvc = db.ref("MESA/KVC/loc");
    get_kvc.on('value', function(snapshot){
        document.getElementById("loc-kvc").innerHTML=snapshot.val()
    })
    var get_kvc = db.ref("MESA/THK JAPAN/loc");
    get_kvc.on('value', function(snapshot){
        document.getElementById("loc-thk").innerHTML=snapshot.val()
    })
    var get_kvc = db.ref("MESA/WESTERN DIGITAL/loc");
    get_kvc.on('value', function(snapshot){
        document.getElementById("loc-wd").innerHTML=snapshot.val()
    })
    var get_kvc = db.ref("MESA/PESTECH/loc");
    get_kvc.on('value', function(snapshot){
        document.getElementById("loc-pestech").innerHTML=snapshot.val()
    })
    var get_kvc = db.ref("MESA/NESTLE/loc");
    get_kvc.on('value', function(snapshot){
        document.getElementById("loc-nestle").innerHTML=snapshot.val()
    })

    
}



