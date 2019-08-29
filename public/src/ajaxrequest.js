function fetchUser(done){
    $.get('/user',function(data){
        
        done(data)
    })
}


function getUserId(member_id){

    $.post('/conversation',{
        members:[member_id]
    },function(data){
       
        done(data)
    })
}