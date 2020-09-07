$(document).ready(function(){

var schedule = $("#schedule");

var currentHour = parseInt(moment().format("H")); 

$("#currentDay").text(moment().format('M/D/YYYY, h:mmA'));
// console.log(eventDesc);

var timeSlot;
var timeClass;

for (var i = 8; i < 18; i++) {
    createHour(i);
}

function createHour(hour) {
    var eventDesc = JSON.parse(localStorage.getItem("activities"));
    timeSlot = moment(hour, "H").format("hA");
    timeClass = "past";

    if (hour === currentHour) {
        timeClass = "present"
    } else if (hour > currentHour) {
        timeClass = "future"
    }

    var row = $("<div>");
    $("#schedule").append(row);
    row.addClass("row time-block");

    var column1 = $("<div>");
    row.append(column1)
    column1.addClass("col-1 hour");
    column1.text(timeSlot);
    
    var column2 = $("<textarea>");
    row.append(column2);
    column2.addClass("col-10 description");
    column2.addClass(timeClass); 
    
    var column3 = $("<div>");
    row.append(column3);
    column3.addClass("col-1 saveBtn");
    var icon = $("<i>");
    icon.addClass("fas fa-save");
    column3.append(icon);

    if (Array.isArray(eventDesc)) {
        for (var i = 0; i < eventDesc.length; i++) {
            if(eventDesc[i].slot == timeSlot) {
                column2.val(eventDesc[i].description);
            }
        } 
    } else {
        var newArray = [];
        newArray.push({
            slot: "",
            description: ""
        });
        localStorage.setItem("activities", JSON.stringify(newArray))
    }
}

function logEvent() {
    var oldArray = JSON.parse(localStorage.getItem("activities"));
    var hour = $(this.parentElement.children[0]).text();
    var eventText = $(this.parentElement.children[1]).val();
    if (Array.isArray(oldArray)) {
        oldArray.push({
            slot: hour,
            description: eventText
        });
        localStorage.setItem("activities", JSON.stringify(oldArray));
    } else {
        var newArray = [];
        newArray.push({
            slot: hour,
            description: eventText
        });
        localStorage.setItem("activities", JSON.stringify(newArray))
    }
}

$(document).on("click", ".saveBtn", logEvent);



  
  }); 