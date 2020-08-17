var timeContainerEl = document.querySelector(".container")
var dayDisplay = function(){
    var pDisplay= document.querySelector("#currentDay");
    //Display the day in the page on the top
    pDisplay.textContent = moment().format('dddd, MMMM Do');
}

var isPastPresentFuture =  function(time){
    var currentTimeHour = moment().hour();
    
    if(time >  currentTimeHour){
        return "future";
    }
    else if(time < currentTimeHour){
        return "past";
    }
    else{
        return "present";
    }
}

$(timeContainerEl).click(function(event){
    console.log(event.target);
    if ($(event.target).is("button") || $(event.target).is("i") ){
        var id = $(event.target).data('save');
        console.log(id);
        var parent = ($(this).children(id-9)[id-9]);
        var textDiv = ($(parent).children()[1]);
        var text = $(textDiv).children(0);
        if (text.val() === ""){
              $("#myModal").modal();
        }
    }
})

var createTimeBlockFunc =  function(){
  
  for (var i=9;i<18;i++){
    var rowDivEl = document.createElement("div");
    rowDivEl.className="row";
    var timeDivEl = document.createElement("div");
    timeDivEl.classList = "col-lg-1 col-md-1 col-sm-1 hour";
    var timeEl = document.createElement("h3");
    timeEl.className = "h3El";
    var time = moment().set({h:i}).format('h A')
    timeEl.textContent = time;
    timeDivEl.appendChild(timeEl);
    var schedDivEl =  document.createElement("div");
    var timeframe = isPastPresentFuture(i);
    schedDivEl.classList = "col-lg-10 col-md-10 col-sm-10 " + timeframe;
    var schedChangeEl = document.createElement("textarea");
    schedChangeEl.className =  "textareaEl";
    schedChangeEl.setAttribute('data-time',i);
    schedDivEl.appendChild(schedChangeEl);
    var saveEl = document.createElement("div");
    saveEl.classList = "col-lg-1 col-md-1 col-sm-1 saveEl";
    var saveBtnEl = document.createElement("button");
    saveBtnEl.className = "saveBtn";
    var text1 = document.createElement("i");
    text1.classList = "fas fa-save";
    saveBtnEl.appendChild(text1);
    saveBtnEl.setAttribute('data-save',i);
    text1.setAttribute('data-save',i);
    if (timeframe === "past"){
        schedChangeEl.disabled = "true";
        saveBtnEl.disabled = "true";
        text1.disabled = "true";
    }
    saveEl.appendChild(saveBtnEl);
    rowDivEl.appendChild(timeDivEl);
    rowDivEl.appendChild(schedDivEl);
    rowDivEl.appendChild(saveEl);
    timeContainerEl.appendChild(rowDivEl);
  }  
}

dayDisplay();
createTimeBlockFunc();
