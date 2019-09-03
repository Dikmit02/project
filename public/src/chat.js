var gloaluser=""
// Make connection
$(function(){
  
    var socket = io.connect();
    
    // Query DOM
    var message = $('#message'),
        btn = $('#send'),
      output = $('#output'),
          feedback = $('#feedback');
          tbl_user=$('#users')
          
           
        
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
             
            getUserId(userclick)
            // getID(userclick)
           
           
            gloaluser=userclick
                
        })


     me(function(me){
     
    // Emit events
    btn.click(function(){
       
        socket.emit('chat', {
            message: message.val(),
            handle: me[0].name 
        });
          
            gettofrom(userclick,me[0]._id)

           


        message.value = "";
    });

    message.keypress(function(){
        socket.emit('typing', me[0].name);
    })
})
    // Listen for events
    socket.on('chat', function(data){
        feedback.html('')
        output.append('<p><strong>' + data.handle + ': </strong>' + data.message + '</p>')
    });
    
    socket.on('typing', function(data){
        feedback.html('<p><em>' + data + ' is typing a message...</em></p>')
    });





    })

    