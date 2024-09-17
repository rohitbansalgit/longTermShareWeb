function update_pass(){
    old_pass = $('#old_password0').val();
    new_pass = $('#password0').val();
    confirm_pass = $('#cpassword0').val();
    if(old_pass == '' || new_pass == '' || confirm_pass == ''){
        var toastHTML = 'Please fill all the fields';
        M.toast({html: toastHTML, classes: 'rounded'});
        return;
    }
    if(new_pass != confirm_pass){
        var toastHTML = 'Passwords and confirm password do not match';
        M.toast({html: toastHTML, classes: 'rounded'});
        return;
    }
    //check password length
    if(new_pass.length < 6){
        var toastHTML = 'New password should be atleast 6 characters long';
        M.toast({html: toastHTML, classes: 'rounded'});
        return;
    }
    $.ajax({
        url: '/update_password',
        type: 'POST',
        data: {
            old_pass: old_pass,
            new_pass: new_pass
        },
        success: function(response){
            console.log(response);
            if(response.message == 'success'){
                var toastHTML = 'Password updated successfully';
                M.toast({html: toastHTML, classes: 'rounded'});
                $('#old_password0').val('');
                $('#password0').val('');
                $('#cpassword0').val('');
            } else {
                var toastHTML = 'Old password is incorrect';
                M.toast({html: toastHTML, classes: 'rounded'});
            }
        }
    });
}

function validate() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    //check format of email
    var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(email_regex)) {
        var toastHTML = 'Invalid email format';
        M.toast({html: toastHTML, classes: 'rounded'});
        return false;
    }
    if (email == '' || password == '') {
        var toastHTML = 'Please fill all the fields';
        M.toast({html: toastHTML, classes: 'rounded'});
        return false;
    }
    $.ajax({
        url: '/',
        type: 'POST',
        data: {
            email: email,
            password: password
        },
        success: function(response){
            console.log(response);
            if(response.message == 'success'){
                window.location.href = '/dashboard';
            } else {
                var toastHTML = 'Email id or password is incorrect';
                M.toast({html: toastHTML, classes: 'rounded'});
            }
        }
    });
}

// if check_date_id update then update the database with ajax call
$(document).ready(function(){
    $('.datepicker').on('change', function(){
    var date = $(this).val();
//    alert(date);
    //update date format to yyyy-mm-dd

    if(date == ''){
       return;
    }
    date = date.split('/').reverse().join('-');
    var row_id = $(this).attr('id');
    // search : start_ in the row_id
    var start_index = row_id.indexOf('start_');
    if(start_index != -1){
        row_id = row_id.substring(start_index + 6);
        update_share_start_date(date, row_id);
    }else{
        update_check_date(date, row_id);
    }
//    alert(row_id);

});
});

function update_share_start_date(date, row_id){
    $.ajax({
        url: '/update_share_start_date',
        type: 'POST',
        data: {
            date: date,
            row_id: row_id
        },
        success: function(response){
            console.log(response);
            if(response.message == 'success'){
                var toastHTML = 'Start date updated successfully';
                M.toast({html: toastHTML, classes: 'rounded'});
            } else {
                var toastHTML = 'Start date could not be updated';
                M.toast({html: toastHTML, classes: 'rounded'});
            }
        }
    });
}

function update_check_date(date, row_id){
    $.ajax({
        url: '/update_check_date',
        type: 'POST',
        data: {
            date: date,
            row_id: row_id
        },
        success: function(response){
            console.log(response);
            if(response.message == 'success'){
                var toastHTML = 'Date updated successfully';
                M.toast({html: toastHTML, classes: 'rounded'});
            } else {
                var toastHTML = 'Date could not be updated';
                M.toast({html: toastHTML, classes: 'rounded'});
            }
        }
    });
}

function remove_check_date(row_id){
    $.ajax({
        url: '/remove_check_date',
        type: 'POST',
        data: {
            row_id: row_id
        },
        success: function(response){
            console.log(response);
            if(response.message == 'success'){

                var toastHTML = 'Date removed successfully';
                M.toast({html: toastHTML, classes: 'rounded'});
                // wait for 2 seconds and reload the page
                setTimeout(function(){
                    location.reload();
                }, 1000);
            }
        }
    });
}