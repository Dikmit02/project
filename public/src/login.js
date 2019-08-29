$(function(){

    $('form').submit((event)=>{
       
        event.preventDefault()
       
        const email=$('#email').val()
        const password=$('#password').val()   
        
       
            $.post('/user/login',{email,password},(data)=>{
                if(!data.status){
                    alert(data.error)
                    window.location='http://localhost:9000/signup'
                }
                else{
                   
                   window.location='http://localhost:9000/'
                }
            })

            
        

        
        
    })
    
})



   