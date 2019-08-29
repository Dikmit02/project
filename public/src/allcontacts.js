$(function(){
    let tbl_user=$('#users')
    let userclick=0

    fetchUser(function (users) {
        
        for(user of users){
            tbl_user.append(
            `<li class="list-group-item list-group-item-action" id="${user._id}">${user.name}</li>`
            // $('<li>').attr('class','list-group-item').attr('class','list-group-item-action').attr('id',`user${i}`).text(`${user.name}`)

            )
            
        }

    })
    
    $('#users').on('click','li',function(){
        userclick=$(this).attr('id')
        
        getUserId(userclick,
            function(addeduser){
                window.alert("Addded "+addeduser)
            })

        
        
    })


})