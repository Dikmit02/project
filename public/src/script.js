$(function(){
    let tbl_doctor=$('#doctors')
    console.log("getting in")
    
    // function fetchUser(done){
    //     $.get('/user',function(data){
    //         console.log(data)
    //         done(data)
    //     })
    // }
    fetchUser(function (doctors) {
        tbl_doctor.append(
            `<tr>
            <th> bdhgdhj </th>
            </tr>`
        )

    })


})

    
   

    
    //     tbl_doctor
    //     tbl_doctor.append(
            
    //         `<tr>
    //         <th>Name</th>
    //         <th>Qualification</th>
    //         <th>YearOfExp</th>
    //         <th>Department</th>

    //     </tr>`
            
    //     )
    //     for(doctor of doctors){
    //         console.log(doctor)
    //         tbl_doctor.append(
    //             `<tr>
    //             <td>Dikshaa</td>
                
    //         </tr>`
    //         )
    //     }

    // })
