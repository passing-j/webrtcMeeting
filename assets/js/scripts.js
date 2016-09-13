
jQuery(document).ready(function() {

    $('.page-container form').submit(function(){
        var username = $(this).find('.username').val();
        var password = $(this).find('.password').val();
        var username2 = $(this).find('.username2').val();
        var password2 = $(this).find('.password2').val();
        var password2_2 = $(this).find('.password2_2').val();
        if(username == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '0');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.username').focus();
            });
            return false;
        }
        if(password == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '44px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
        }
        if(username2 == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '0');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.username2').focus();
            });
            return false;
        }
        if(password2 == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '44px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password2').focus();
            });
            return false;
        }
        if(password2_2 == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '88px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password2_2').focus();
            });
            return false;
        }
    });

    $('.page-container form .username, .page-container form .password').keyup(function(){
        $(this).parent().find('.error').fadeOut('fast');
    });

});
