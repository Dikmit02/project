$(function(){
    let tbl_doctor=$('#doctors')
    let i=0;
    let userclick=$('#user')

    fetchUser(function (doctors) {
        i++;
        for(doctor of doctors){
            tbl_doctor.append(
            `<li class="list-group-item list-group-item-action" id="${doctor._id}">${doctor.name}</li>`
            // $('<li>').attr('class','list-group-item').attr('class','list-group-item-action').attr('id',`user${i}`).text(`${doctor.name}`)

            )
            i++;
        }

    })
    
    $('#doctors').on('click','li',function(){
        let id=$(this).attr('id')
        
        
    })
    
    
    


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



   