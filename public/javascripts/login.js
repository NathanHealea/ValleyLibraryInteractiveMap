// var is = Validator.assert();
// var validator = Validator.validator();
//
// var constraints = {
//     'username':[ is.notBlank(), is.ofLength( { min: 4, max: 25 } ) ],
//     'password':is.notBlank()
// };
//
// var validInput = {
//     'username' : null,
//     'password' : null
//
// };

$(function () {

    // When form is submited
    $('form').submit(function (event) {
        var logindata = {
            'username':null,
            'password':null
        };

        // get all input fields
        var inputs = $('form :input');

        // for each input in form
        for(var i = 0; i < inputs.length; i++){
            var input = inputs[i];
            if(input.name  in logindata){
                logindata[input.name] = input.value;
            }
        }



        // Check to see if password matches
        $.ajax({
            type: "POST",
            async: true,
            url: 'login',
            data: logindata
        })
            .done(function (data) {
                console.log(data);
                var result = JSON.parse(data);
                console.log(result);
                if (result) {
                    ShowError(false);
                    window.location.replace('/dashboard');
                }
                else{
                    ShowError(true);
                }

            })
            .fail(function () {
                console.log("Password Check failed");
            });

        event.preventDefault();
        return false;
    });
});

// Shoes error login informaion
function ShowError(display){
    var error = $('#error-message');
    if(display == true){
        error.attr('hidden',false);
    }
    else if(display == false){
        error.attr('hidden',true);
    }
}
