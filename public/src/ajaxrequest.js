function fetchUser(done){
    $.get('/user',function(data){
        
        done(data)
    })
}


