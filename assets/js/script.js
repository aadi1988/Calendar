//Container to hold times
var timeContainerEl = $(".container");
//Dictionary to hold the schedule
var schedObj = {};

//Date display function
var dayDisplay = function(){
    var pDisplay= $("#currentDay");
    //Display the day in the page on the top
    $(pDisplay).text(moment().format('dddd, MMMM Do'));
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
$(timeContainerEl).on('click','.saveEl',function(event){

        var id  = $(this).find('.saveBtn').data('save');
        var text = $(this).prev().find('.textarea');
        //Modal called asking user to enter a valid activity
        if (text.val() === " "){
              $("#myModal").modal();
        }
        else{
            schedObj[id]=text.val();
            saveSched();
        }
   // }
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
    $(timeEl).text(time);
    $(timeDivEl).append($(timeEl));
    //Container to hold the schedule
    var schedDivEl =  $("<div></div>");
    var timeframe = isPastPresentFuture(i);
    $(schedDivEl).addClass(["col-lg-10", "col-md-9", "col-sm-12","divTextEl",timeframe]);
    var schedChangeEl = $("<textarea></textarea>");
    $(schedChangeEl).addClass(["textarea","description"]);
    $(schedChangeEl).attr('data-time',i);
    $(schedChangeEl).text(loadSched(i)); 
    $(schedDivEl).append($(schedChangeEl));
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
    
    //Add all to the main row container
    rowDivEl.append($(timeDivEl));
    rowDivEl.append($(schedDivEl));
    rowDivEl.append($(saveEl));
    //add the row container to the main container
    timeContainerEl.append($(rowDivEl));
  }  
}

//Calling functions to display date and main function for the schedule.
dayDisplay();
createTimeBlockFunc();
