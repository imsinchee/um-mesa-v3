
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

var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("=");
var company_name = queries[1];
var student_list = [];
var current = 0;
var to_call = false;
var tem = 0;
var applicant_count = 0;

var number_student = 0;
var student_list = [];
var calling_number = 0;
var tem_to_store_all = 0;
console.log(student_list)


var on_refresh = db.ref('MESA/'+company_name);
on_refresh.on('value',function(get_all){
    tem_to_store_all = get_all.val();
    number_student = tem_to_store_all.count;
    student_list = tem_to_store_all.student;
    calling_number= tem_to_store_all.calling_now;
    var applicant_left = number_student-calling_number;
    if (applicant_left <= 0){
        document.getElementById("count").innerHTML = "0 Applicant left"
    }
    else{
        document.getElementById("count").innerHTML= applicant_left + " Applicants left"
    }
})

var applicant_countfunc = db.ref('MESA/'+company_name+"/student");
applicant_countfunc.on('value',function(snapshot){
    student_list=snapshot.val();
})

var applicant_counting = db.ref('MESA/'+company_name+"/count");
    applicant_counting.on('value',function(snapshot2){
        applicant_count = snapshot2.val();
        current = applicant_count;
})
    


function submit(){
    var name = document.getElementById('name').value.toLowerCase();
    var url = document.getElementById('link').value;
    if (name == ''){
        alert("Please write your name");
    }
    else{
        if (url == ""){
            url="#"
        }
        current = current +1;
        db.ref('MESA/'+company_name+"/student/a"+current+"/name").set(name);
        db.ref('MESA/'+company_name+"/student/a"+current+"/url").set(url);
        responsiveVoice.speak("Updated. Your Number is "+current)
    }
    db.ref('MESA/'+company_name+'/count').set(current);
    document.getElementById('name').value ='';
    document.getElementById('link').value ='';
    
    document.getElementById("your_number").innerHTML=current;
    
}


function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};


window.onload = function() {
    var read_calling_now = firebase.database().ref('MESA/'+company_name+"/calling_now");
    read_calling_now.on('value', function(snapshot) {
        var calling = snapshot.val();
        var applicant_number = 'a'+calling;
        var tem = calling+1;
        var next_applicant_number = 'a'+tem;
        var applicant_info = student_list[applicant_number].name;
        document.getElementById("current").innerHTML= "NOW: "+applicant_info.toUpperCase()+" ("+calling+")";
        try{
            var next_applicant_info = student_list[next_applicant_number].name;
            document.getElementById("next").innerHTML="NEXT: "+next_applicant_info.toUpperCase()+" ("+tem+")";
        }
        catch(err){
            document.getElementById("next").innerHTML='';
        }
        document.getElementById("myAudio").play();
        document.getElementById("myAudio").onended = function(){

            responsiveVoice.speak(company_name + " calling " + applicant_info);
        }

        var call_again = firebase.database().ref('MESA/'+company_name+"/call");
        call_again.on('value', function(snapshot) {
            var to_call = snapshot.val();
            if (to_call == 1){
                document.getElementById("myAudio").play();
                document.getElementById("myAudio").onended = function(){
                    responsiveVoice.speak(company_name + " calling " + applicant_info);
                }
                db.ref('MESA/'+company_name+'/call').set(0);
            }
        });
    });

}
