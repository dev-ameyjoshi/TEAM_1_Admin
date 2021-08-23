$(document).ready(function(){

    const getReq = (url, isProtected) => {
        let jwt;
        if(isProtected){
            jwt = localStorage.getItem("jwtToken");
        }
        $.ajax({
            type: 'GET',
            url: url,
            beforeSend:
                function(xhr){
                    xhr.setRequestHeader("authorization", "BEARER " + jwt);
                },
            success:
                function(res){
                    console.log(res);
                }
        })
    }

    const $loginForm = $("#loginForm");
    $loginForm.on('submit', (e) => {
        e.preventDefault();
        console.log($loginForm.serialize());
        $.ajax({
            type: 'POST',
            url: '/auth/login',
            data: $loginForm.serialize(),
            success: 
                function(res){
                    localStorage.setItem("jwtToken", res.token);
                    console.log(res);
                    getReq("/dashboard", true);
                },
            error: 
                function(res){
                    console.log(res);
                }
        })
    })


})