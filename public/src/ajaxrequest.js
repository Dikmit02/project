function fetchUser(done){
    $.get('/user',function(data){
        
        done(data)
    })
}


function getUserId(member_id){

    $.post('/conversation',{
        to:member_id
    },function(data){
       
        done(data)
    })
}

function getID(done){
    $.get('/conversation',function(data){
        done(data)
    })
}