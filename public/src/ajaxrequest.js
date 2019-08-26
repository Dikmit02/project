function fetchUser(done){
    $.get('/user',function(data){
        console.log(data)
        done(data)
    })
}


