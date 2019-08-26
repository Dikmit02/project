$(function(){
    let tbl_doctor=$('#doctors')

    fetchUser(function (doctors) {
        tbl_doctor.append(
            `<tr>
            <th> bdhgdhj </th>
            </tr>`
        )
        for(doctor of doctors){
            tbl_doctor.append(
                `<tr>
                <td>${doctor.name}</td>
                
            </tr>`
            )
        }

    })


    $('form').submit((event)=>{
       
        event.preventDefault()
        const name=$('#username').val()
        const email=$('#email').val()
        const password=$('#password').val()   
        
       
            $.post('/user/login',{email,password},(data)=>{
                if(!data.status){
                    alert(data.error)
                }
                else{
                    window.location='http://localhost:9000/allcontacts'
                }
            })

            
        

        
        
    })
    
})


   