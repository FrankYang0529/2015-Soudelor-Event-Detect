$(document).ready(function() {
    //set initial state.
    $('#checkbox_RuleA').val($(this).is(':checked'));
    $('#checkbox_RuleB').val($(this).is(':checked'));

    $('#checkbox_RuleA').change(function() {
        if($(this).is(":checked")) {
            $('.RuleA').show();
        }
        else{
        	$('.RuleA').hide();
        }
    });
    $('#checkbox_RuleB').change(function() {
        if($(this).is(":checked")) {
            $('.RuleB').show();
        }
        else{
        	$('.RuleB').hide();
        }
    });
	
});
