function fetchUser(done){
    $.get('/user',function(data){
        
        done(data)
    })
}


function getUserId(member_id){

    $.post('/conversation',{
        to:member_id
    })
}

function getID(done){
    $.get('/conversation',function(data){
        done(data)
    })
}

function getUserbyId(user_id,done){
    $.get('/user/'+user_id,function(data){
        done(data)
    })
}

function me(done){
    $.get('/me',function(data){
        done(data)
    })
}