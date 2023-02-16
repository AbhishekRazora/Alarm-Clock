// set audio
let audio=new Audio("audio/ringtone.mp3")
audio.loop=true;


// set variables
let alarmTime;
let alarmCount=0;
let alarmListArr=[]
const selectMenu=document.querySelectorAll('select')
const setAlarmBtn=document.querySelector('#btn-setAlarm')


// update Time and Date


function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        se = "AM";

        if(hou==0){
            hou = 12;
        }

        if(hou>12){
            hou -=12;
            se = "PM";
        }

        Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length<digits; n=0+n);
            return n;
        }

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var ids =["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "session"];
        var values = [week[dname], months[mo], dnum.pad(2),yr,hou.pad(2),min.pad(2),sec.pad(2),se];
        // console.log(values)
        for(var i=0; i<ids.length;i++){
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }

        for(let i=0; i<alarmListArr.length;i++){
            if(alarmListArr[i]==`${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${se}`){
                console.log("Alarm ringing...");
                // alert('Wake up .......')
                audio.load();
                audio.play();
                document.querySelector("#stopAlarm").style.visibility= "visible";
                // document.querySelector('#snooze').style.visibility='visible';

            }
        }
}

function Clock() {
    updateClock();
    window.setInterval("updateClock()",1000);
}


//Set Alarm section


for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

//add alarm 


function setAlarm(){
    document.querySelector("#alarm-h3").innerText = " Upcoming Alarms List";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}: ${selectMenu[3].value}`;
    if(time.includes("setHour") || time.includes("setMinute") ||time.includes("setSecond") ||time.includes("AM/PM")){
        alert("Please, Select Valide Input");
    }else{
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
        console.log("alarm will ring at time ",alarmTime)
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
    }

}
// calling of set alarm function when button is clicked
setAlarmBtn.addEventListener("click",setAlarm);

//delete alarm

function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
}

// function for stop the alarm
function stopAlarm(){
    audio.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
}
