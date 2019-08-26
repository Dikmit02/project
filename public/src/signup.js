$(function(){
    $('form').submit((event)=>{
        event.preventDefault()
        const name=$('#username').val()
        const email=$('#email').val()
        const password=$('#password').val() 
        $.post('/register',{name,email,password},(data)=>{
                if(!data.status){
                    alert(data.error)
                }else{
                   window.location='http://localhost:9000/login'
                }
            })
    })

})