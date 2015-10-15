var years = moment().year();
$("#slider").slider({
    min: 1970,
    max: years,
    step: 1,
    values: [0, years],
    range: true,
    slide: function(event, ui) {
        var delay = function() {
            var handleIndex = $(ui.handle).index();
            var label = handleIndex == 1 ? '#min' : '#max';
            console.log(handleIndex);
            var timePicker = label == '#min' ? '#minDate' : '#maxDate';
            var date = $(timePicker).datepicker("getDate");
            $(label).html(moment(date).format("DD MMM ") + ui.value).position({
                my: 'center bottom-15',
                at: 'center top',
                of: ui.handle,
                offset: "0, 10"
            });
            $(timePicker).stop(true,false).fadeTo(100,1,function() {
                $(this).mouseover(function() {
                    //console.log("Mouse over");        
                    $(this).stop(true,true).fadeTo(100,1); 
                });
            }).delay(2000).fadeTo(1000,0,function() {
                $(this).unbind('mouseover').datepicker("hide");
            }).datepicker("setDate",moment(date).format("DD/MM/"+ui.value)).position({
                my: 'center bottom',
                at: 'center bottom',
                of: $(label)
            });
        };
        
        // wait for the ui.handle to set its position
        setTimeout(delay, 5);
    }
});        
 
$('#minDate').datepicker({
    changeMonth: true,
}).datepicker("setDate","1/1/1970").position({
    my: 'center bottom',
    at: 'center bottom',
    of: $("#min")
    }).mouseover(function() {
        //console.log("Mouse over");        
       $(this).stop(true,true).fadeTo(100,1); 
    }).mouseleave(function() {
       //console.log("Mouse gone");
       $(this).delay(2000).fadeTo(1000,0,function() {
           $(this).unbind('mouseover').datepicker("hide");
       }); 
    }).delay(2000).fadeTo(1000,0,function() {
           $(this).unbind('mouseover').datepicker("hide");
       });

       

$('#maxDate').datepicker({
    changeMonth: true    
}).position({
    my: 'center bottom',
    at: 'center bottom',
    of: $("#max")
    }).mouseover(function() {
        //console.log("Mouse over");        
       $(this).stop(true,true).fadeTo(100,1); 
    }).mouseleave(function() {
       //console.log("Mouse gone");
       $(this).delay(2000).fadeTo(1000,0,function() {
           $(this).unbind('mouseover').datepicker("hide");
       }); 
    }).delay(2000).fadeTo(1000,0,function() {
           $(this).unbind('mouseover').datepicker("hide");
       });                           
$('#min').text("01 Jan " + $("#slider").slider("values",0)).position({
    my: 'center bottom-15',
    at: 'center top',
    of: $(".ui-slider-handle")[0]
});

$('#max').text(moment().format('DD MMM YYYY')).position({
    my: 'center bottom-15',
    at: 'center top',
    of: $(".ui-slider-handle")[1]
});


