
//regex: /[A-Za-z@.-_]/g
/**
 *
 * @type {{masterUsername: {title: string, required: boolean, alphaNumeric: boolean, min: number}, masterPassword: {title: string, required: boolean, format: {regex: RegExp}, min: number}, dbHost: {title: string}, dbName: {title: string}, dbUsername: {title: string}, dbPassword: {title: string}}}
 */
var rules = {
    'masterUsername': {
        title: 'Master Username',
        required: true,
        alphaNumeric: true,
        min: 8
    },
    'masterPassword': {
        title: 'Master Password',
        required: true,
        alphaNumeric: true,
        min: 8
    },
    'dbHost': {
        title:'Database Host'
    },
    'dbName': {
        title: 'Database Name'
    },
    'dbUsername': {
        title: 'Application Database User'
    },
    'dbPassword': {
        title: 'Application Database Password'
    }
};

var isValid = {
    'masterUsername': null,
    'masterPassword': null,
    'dbHost': null,
    'dbName': null,
    'dbUsername': null,
    'dbPassword': null
};

// Modal Id for displaying success message.
var modalId = '#successMessage';

$(function () {

    // Initializing modal
    $(modalId).modal({
        show: false
    });

    // redirect when modal is closed
    $('#btn-close').click(function(){
        console.log('close btn was clicked');
        window.location.replace('/');
    });


    // When form is submitted
    $('form').submit(function (event) {

        // Form data to be submitted
        var formdata = {};

        // get all input fields
        var inputs = $('form :input');

        // for each input in form
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            if (input.name in rules) {

                // validate input
                var result = approve.value(input.value, rules[input.name]);

                // Check results of input validation
                if (result.approved) {

                    // success
                    ShowError(result.approved, result.errors, input.name);
                    ShowResults('success', input.name);

                    // saves that input is validated
                    isValid[input.name] = result.approved;

                    // save form data
                    formdata[input.name] = input.value;
                }
                else {

                    // fail
                    ShowError(result.approved, result.errors, input.name);
                    ShowResults('error', input.name);

                    isValid[input.name] = result.approved;
                }
            }
        }

        if (checkIsValid()) {
            console.log('Check was valid');
            saveConfig(formdata);
        }
        else{
            console.log("Form was not valid");
        }

        event.preventDefault();
        return false;
    });
});

/**
 * Shows displays the constrains on the input field.
 * @param show
 * @param errors
 * @param name
 * @constructor
 */
function ShowError(show, errors, name) {
    var errorhelp = $('#' + name + 'Error');
    errorhelp.empty();
    if (!show) {
        var ul = $('<ul>');
        for (var e in errors) {
            ul.append($('<li>', {text: errors[e]}))
        }
        errorhelp.append(ul);
    }
}

/**
 * Added CSS styling for input errors and success
 * @param show
 * @param name
 * @constructor
 */
function ShowResults(show, name) {
    var group = $('#' + name + 'Group');

    if (show == 'error') {
        group.addClass('alert alert-danger');
    }
    else if (show == 'success') {
        group.removeClass('alert alert-danger');
        group.addClass('alert alert-success');
    }
}

function checkIsValid(formdata) {
    var valid = true;

    for(var v in isValid){
        if(isValid[v] == false){
            valid = false;
            break;
        }
    }
    return valid;
}

/**
 * Saves the informaion from setup form in to configuration
 * @param formdata
 */
function saveConfig(formdata) {
    $.ajax({
        type: "POST",
        async: true,
        url: 'setup',
        data: formdata
    })
        .done(function (data) {
            var result = JSON.parse(data);
            if (result) {
                // display success message
                $(modalId).modal({
                    show: true
                });
            }
            else {
                // display error message
            }

        })
        .fail(function () {
            console.log("Password Check failed");
        });
}


