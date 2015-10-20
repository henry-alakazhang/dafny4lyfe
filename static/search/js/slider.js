var years = moment().year();
$("#slider").slider({
    min: 1970,
    max: years,
    step: 1,
    values: [0, years],
    range: true,
    change: function(event, ui) {
        var delay = function() {
            var handleIndex = $(ui.handle).index();
            var label = handleIndex == 1 ? '#min' : '#max';
            var datePicker = label == '#min' ? '#minDate' : '#maxDate';
            //console.log(handleIndex);
            //console.log(ui.value);
            $(label).html(moment($(label).text(),"DD MMM YYYY").format("DD MMM ") + ui.value).position({
                my: 'center bottom',
                at: 'center top-' + (15 + $(label).height()*1.5),
                of: ui.handle
            });
            
            $(datePicker).position({
                my: 'center bottom',
                at: 'center top',
                of: $(label)
            });
        };        
        // wait for the ui.handle to set its position
        setTimeout(delay, 5);        
    },
    slide: function(event, ui) {
        var delay = function() {
            var handleIndex = $(ui.handle).index();
            var label = handleIndex == 1 ? '#min' : '#max';
            var otherLabel = label == '#min' ? '#max' : '#min';
            var datePicker = label == '#min' ? '#minDate' : '#maxDate';
            //console.log(handleIndex);
            //console.log(ui.value);
            if ($(label).offset().top > $(otherLabel).offset().top) {
                $(otherLabel).position({
                    my: 'center bottom',
                    at: 'center bottom+' + $(otherLabel).height()*1.5,
                    of: otherLabel                
                });
            }
            $(label).html(moment($(label).text(),"DD MMM YYYY").format("DD MMM ") + ui.value).position({
                my: 'center bottom',
                at: 'center top-' + (15 + $(label).height()*1.5),
                of: ui.handle
            });            
            
            $(datePicker).position({
                my: 'center bottom',
                at: 'center top',
                of: $(label)
            });
        };        
        // wait for the ui.handle to set its position
        setTimeout(delay, 5);
    }
});        

var hand0 = $(".ui-slider-handle")[0];
var hand1 = $(".ui-slider-handle")[1];                      
$('#min').text("01 Jan " + $("#slider").slider("values",0)).position({
    my: 'center bottom-15',
    at: 'center top',
    of: hand0
}).click(function() {        
    $('#maxDate').datepicker("destroy");
    $('#minDate').stop(true,true).datepicker("destroy").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1970:" + years,
        maxDate: moment($("#max").text(),"DD MMM YYYY").subtract(1, 'days').format("MM/DD/YYYY"),
        onChangeMonthYear: function(y,m,i) {
            var delay = function() {
                $('#slider').slider("values",0,y);
                $('#minDate').position({
                    my: 'center bottom',
                    at: 'center top',
                    of: $("#min")
                });
            };
            setTimeout(delay, 5);
        },
        onSelect: function(date,inst) {
            $('#min').text(moment(date,"MM/DD/YYYY").format("DD MMM YYYY"));  
        },
    }).datepicker("setDate", moment($('#min').text(),"DD MMM YYYY").format("MM/DD/YYYY")).position({
        my: 'center bottom',
        at: 'center top',
        of: $("#min")
    }).fadeTo(100,1).mouseover(function() {
//         console.log("Mouse over");        
       $(this).stop(true,true).fadeTo(100,1); 
    }).mouseleave(function() {
       //console.log("Mouse gone");
       $(this).delay(2000).fadeTo(1000,0,function() {
           $(this).unbind('mouseover').datepicker("destroy");
       }); 
    }).delay(2000).fadeTo(1000,0,function() {
        $(this).unbind('mouseover').datepicker("destroy");
    });
});

$('#max').text(moment().format("DD MMM YYYY")).position({
    my: 'center bottom-15',
    at: 'center top',
    of: hand1
}).click(function() {
//     console.log("maxClick");
    $('#minDate').datepicker("destroy");
    $('#maxDate').stop(true,true).datepicker("destroy").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1970:" + years,
        maxDate: 0,
        onChangeMonthYear: function(y,m,i) {
            var delay = function() {
                $('#slider').slider("values",1,y);
                $('#maxDate').position({
                    my: 'center bottom',
                    at: 'center top',
                    of: $("#max")
                });
            };
            setTimeout(delay, 5);
        },
        onSelect: function(date,inst) {
            $('#max').text(moment(date,"MM/DD/YYYY").format("DD MMM YYYY"));  
        },
    }).datepicker("setDate",moment($('#max').text(),"DD MMM YYYY").format("MM/DD/YYYY")).position({
        my: 'center bottom',
        at: 'center top',
        of: $("#max")
    }).fadeTo(100,1).mouseover(function() {
//         console.log("Mouse over");        
       $(this).stop(true,true).fadeTo(100,1); 
    }).mouseleave(function() {
       //console.log("Mouse gone");
       $(this).delay(2000).fadeTo(1000,0,function() {
           $(this).unbind('mouseover').datepicker("destroy");
       }); 
    }).delay(2000).fadeTo(1000,0,function() {
        $(this).unbind('mouseover').datepicker("destroy");
    });
});   

$(window).resize(function() {
    $('#min').position({
        my: 'center bottom-15',
        at: 'center top',
        of: hand0
    });
    
    $('#max').position({
        my: 'center bottom-15',
        at: 'center top',
        of: hand1
    });
    
    $('#minDate').position({
        my: 'center bottom',
        at: 'center top',
        of: $("#min")
    });
    
    $('#maxDate').position({
        my: 'center bottom',
        at: 'center top',
        of: $("#max")
    })
 
})
