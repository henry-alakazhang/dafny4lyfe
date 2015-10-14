var years = moment().year()-1850;
$("#slider").slider({
    min: 0,
    max: years,
    step: 1,
    values: [0, years],
    range: true,
    slide: function(event, ui) {
        var delay = function() {
            var handleIndex = $(ui.handle).index();
            var label = handleIndex == 3 ? '#min' : '#max';
            $(label).html("01 Jan " + (1850 + ui.value)).position({
                my: 'center bottom-15',
                at: 'center top',
                of: ui.handle,
                offset: "0, 10"
            });
        };
        
        // wait for the ui.handle to set its position
        setTimeout(delay, 5);
    }
});        
                            
$('#min').text("01 Jan " + (1850+$("#slider").slider("values",0))).position({
    my: 'center bottom-15',
    at: 'center top',
    of: $(".ui-slider-handle")[0]
});

$('#max').text(moment().format('DD MMM YYYY')).position({
    my: 'center bottom-15',
    at: 'center top',
    of: $(".ui-slider-handle")[1]
});