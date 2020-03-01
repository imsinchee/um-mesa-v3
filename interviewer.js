
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
//Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
var number_student = 0;
var student_list = [];
var calling_number = 0;
var tem_to_store_all = 0;


var on_refresh = db.ref('MESA/'+company_name);
on_refresh.on('value',function(get_all){
    tem_to_store_all = get_all.val();
    number_student = tem_to_store_all.count;
    student_list = tem_to_store_all.student;
    calling_number= tem_to_store_all.calling_now;
    var applicant_left = number_student-calling_number;
    if (applicant_left <= 0){
        display_count.innerText = "0 Applicant left"
    }
    else{
        display_count.innerText = applicant_left + " Applicants left"
    }
})


function call_next(){
    if (calling_number<number_student){
        calling_number = calling_number+1;
        var call_num = 'a'+calling_number;
        db.ref('MESA/'+company_name+"/calling_now").set(calling_number);
        document.getElementById("applicant_name").innerHTML = student_list[call_num].name.toUpperCase();
        document.getElementById("resumeurl").href = student_list[call_num].url;
    }
    else{
        alert("No More Applicant")
    }
    
}

function call_again(){
    db.ref('MESA/'+company_name+"/call").set(1);
}

