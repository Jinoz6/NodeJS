const express = require('express')
const User = require('../model/User')

const router = express.Router()


// router.get('/users', (req, res, next) => {

//     return res.json({
//         status: 200,
//         message: "success"
//     })
// })

router.get('/users', (req, res,) =>{

    User.findAll((err, user) => {

        if (err)  return res.json({message:err})


        res.json({

            status:200,
            message: user
            
        })

    })

})
  
  
  
router.post('/users', (req, res,) =>{

    const new_user = req.body.No && req.body.Firstname && req.body.Lastname && req.body.Age && req.body.Address && req.body.Mobile && req.body.Status
              

    if(new_user){

        User.create(req.body, (err, user) => {

            if (err){ 

                res.json({message:err})
            }
            else{
                        
                res.json({
    
                    error:false,
                    message:"status:200",
                    data:user
                })
            }

        })
        
    }
                 
    else
    {
            
        res.json({

            message:"Please provide all required field"  
            
        })
    
    }
 
})
  

router.put('/users/:no', (req, res,) => {

    const new_user = req.body.Firstname && req.body.Lastname && req.body.Age && req.body.Address && req.body.Mobile && req.body.Status


    if(new_user) {

        User.update(req.params.no, req.body, (err,user) => {

            if (err){ 

                res.json({message:err})
            }
            else{

                res.json({ error:false, message: 'user successfully updated',data:user });
            }
        })
    }
    else
    {

        res.json({

            message:"Please check the table header spelling"
                
        })
    }
    
})
  
  
router.get('/users/:no', (req, res,) => {


    User.findById(req.params.no, (err, user)=> {

        if (err) return res.json({message:err}) 

        if(user.length < 1){

            res.json({

                    message:"Don't have this ID",data:user

            })

        }
        else{

            res.json(user)
        }
    
    })
   
})
  
  

  
router.delete('/users/:no', (req, res,) => {

    User.findById(req.params.no, (err, user)=> {
        console.log(user)
        if (err) 
        {  
            res.json({message:err})
        }
        

        else if(user.length > 0){

            User.delete( req.params.no,(err) => {

                //find the id before delete
    
               if (err){

                   res.json({message:err})
                
                }
                else

                {
    
                res.json({ error:false, message: 'user successfully deleted',status:"200" })

                }
                
            })

        }
        else{

        res.json({

            message:"Don't have this ID",
            status:"400"

        })
    }
    
    })     
   
})


module.exports = router