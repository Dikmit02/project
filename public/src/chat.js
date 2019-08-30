
// Make connection
window.onload = function(){
    var socket = io.connect();
    
    // Query DOM
    var message = document.getElementById('message'),
          handle = document.getElementById('handle'),
          btn = document.getElementById('send'),
          output = document.getElementById('output'),
          feedback = document.getElementById('feedback');
    
          getID(function (users){
            console.log(users)
        })
        getUserbyId('5d67be338a13353d18375b8b',function(uers){
            console.log(uers)
        })
        me(function(me){
            console.log(me[0].name)
        
    
    // Emit events
    btn.addEventListener('click', function(){
        socket.emit('chat', {
            message: message.value,
            handle: me[0].name
        });
        message.value = "";
    });
})
    message.addEventListener('keypress', function(){
        socket.emit('typing', handle.value);
    })
    
    // Listen for events
    socket.on('chat', function(data){
        feedback.innerHTML = '';
        output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    });
    
    socket.on('typing', function(data){
        feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    });
    }

    