//Container to hold times
var timeContainerEl = $(".container");
//Dictionary to hold the schedule
var schedObj = {};

//Date display function
var dayDisplay = function(){
    var pDisplay= $("#currentDay");
    //Display the day in the page on the top
    $(pDisplay)[0].textContent = moment().format('dddd, MMMM Do');
}

//Check if current time is before 9AM, between 9 to 5 or after 5 PM
var isPastPresentFuture =  function(time){
    var currentTimeHour = moment().hour();
    //time block is in the future - color green
    if(time >  currentTimeHour){
        return "future";
    }
    else if(time < currentTimeHour){   //time block in the past - color grey
        return "past";
    }
    else{                             //time block is current  - color green
        return "present";    
    }
}

//Get data from local storage
var loadSched = function(id){
   //Check if local storage has any data 
   if (JSON.parse(localStorage.getItem("schedObj")) !== null){
       // check if local storage has data corresponding a particular time.
    if (JSON.parse(localStorage.getItem("schedObj"))[id] !== null && JSON.parse(localStorage.getItem("schedObj"))[id] !== undefined){
        schedObj = JSON.parse(localStorage.getItem("schedObj"));
        var value  = schedObj[id];
        return value
    }
    else{ 
        schedObj[id] = " ";
        var value = " ";
        return value;
    }
   }
}

//Save the schedule in local storage
var saveSched = function(){
    localStorage.setItem("schedObj",JSON.stringify(schedObj));
}


//When save button is clicked, data is saved in the dictionary and in local storage
$(timeContainerEl).click(function(event){
    console.log(event.target);
    if ($(event.target).is("button") || $(event.target).is("i") ){
        var id = $(event.target).data('save');
        var parent = ($(this).children(id-9)[id-9]);
        var textDiv = ($(parent).children()[1]);
        var text = $(textDiv).children(0);
        //Modal called asking user to enter a valid activity
        console.log(text.val())
        if (text.val() === " "){
              $("#myModal").modal();
        }
        else{
            schedObj[id]=text.val();
            saveSched();
        }
    }
})


//Main function - creates the elements for the scheduler
var createTimeBlockFunc =  function(){
  
  for (var i=9;i<18;i++){
    var rowDivEl = $("<div></div>");
    $(rowDivEl).addClass("row");
    //Container for time (9 AM to 5PM)
    var timeDivEl = $("<div></div>");
    $(timeDivEl).addClass(["col-lg-1", "col-md-2", "col-sm-12", "hour"]);
    var timeEl = $("<h3></h3>");
    $(timeEl).addClass("h3El");
    var time = moment().set({h:i}).format('h A');
    $(timeEl)[0].textContent = time;
    $(timeDivEl)[0].append($(timeEl)[0]);
    //Container to hold the schedule
    var schedDivEl =  $("<div></div>");
    var timeframe = isPastPresentFuture(i);
    $(schedDivEl).addClass(["col-lg-10", "col-md-9", "col-sm-12","divTextEl",timeframe]);
    var schedChangeEl = $("<textarea></textarea>");
    $(schedChangeEl).addClass(["textarea","description"]);
    $(schedChangeEl).attr('data-time',i);
    $(schedChangeEl)[0].textContent = loadSched(i); 
    $(schedDivEl).append($(schedChangeEl)[0]);
    //Save button
    var saveEl = $("<div></div>");
    $(saveEl).addClass(["col-lg-1", "col-md-1", "col-sm-12","saveEl"]);
    var saveBtnEl = $("<button></button>");
    $(saveBtnEl).addClass("saveBtn");
    var text1 = $("<i></i>");
    $(text1).addClass(["fas", "fa-save"]);
    $(text1).attr('data-save',i);
    $(saveBtnEl).append($(text1));
    $(saveBtnEl).attr('data-save',i);
    $(saveEl).append($(saveBtnEl));
    var saveElcon = $(saveEl)[0];
    //Add all to the main row container
    rowDivEl.append($(timeDivEl)[0]);
    rowDivEl.append($(schedDivEl)[0]);
    rowDivEl.append($(saveElcon)[0]);
    //add the row container to the main container
    timeContainerEl.append($(rowDivEl)[0]);
  }  
}

//Calling functions to display date and main function for the schedule.
dayDisplay();
createTimeBlockFunc();
