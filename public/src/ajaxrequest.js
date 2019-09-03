function fetchUser(done){
    $.get('/user',function(data){
        console.log("Diksha"+data)
        done(data)
    })
}


function getUserId(member_id){
    
    $.post('/conversation',{to:member_id},(data)=>{
        // getting unique id
        console.log(data._id)
    })
   
}

// function getID(done){
//     $.get('/conversation',function(data){
//         done(data)
//     })
// }

// function getUserbyId(user_id,done){
//     $.get('/user/'+user_id,function(data){
//         done(data)
//     })
// }

function me(done){
    $.get('/me',function(data){
        done(data)
    })
}

function gettofrom(to,from,message,done){
    $.post('/conversation/'+to+'/'+from)
}