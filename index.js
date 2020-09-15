const express = require('express')
const User = require('../model/User')

const router = express.Router()


// router.get('/users', (req, res, next) => {

//     return res.json({
//         status: 200,
//         message: "success"
//     })
// })

router.get('/users', (req, res,next) =>{

    User.findAll((err, user) => {

        if (err)  return next(err)


        res.json({

            status:200,
            data: user
            
        })
    })
})
  
  
  
router.post('/users', (req, res,next) =>{

    const new_user = req.body.Firstname && req.body.Lastname && req.body.Age 
                     && req.body.Address && req.body.Mobile && req.body.status

                     console.log(new_user)
              
    if(new_user){

        User.create(req.body, (err, user) => {

            if (err){ 

                return next(err)
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
  

router.put('/users/:no', (req, res,next) => {

    const new_user = req.body.Firstname && req.body.Lastname && req.body.Age && req.body.Address 
                     && req.body.Mobile && req.body.status


    if(new_user) {
        
        User.findById(req.params.no, (err, user)=> {

            if (err) return next(err)

            if(user.length > 0){

                User.update(req.params.no, req.body, (err,user) => {

                    if (err){ 
            
                        next(err)
                    }
                    else{
            
                        res.json({ error:false, message: 'user successfully updated',data:user });
                    }
                })
            }
            else{

                res.json({

                    status:"404",
                    message:"don't have this id"

                }).status(404)
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
  
  
router.get('/users/:no', (req, res,next) => {

    User.findById(req.params.no, (err, user)=> {

        if (err) return next(err)

        if(user.length < 1){

            res.json({

                message:"Don't have this ID",
                data:user

            })
        }
        else{
            res.json({

                status:"200",
                data:user

            })
        }  
    }) 
})
  
  

  
router.delete('/users/:no', (req, res,next) => {

    User.findById(req.params.no, (err, user)=> {
        
        if (err){  
            
           next(err)

        }
        else if(user.length > 0){

            User.delete( req.params.no,(err) => {

                if (err){

                    next(err)
                    
                }
                else{
        
                    res.json({ 

                        error:false,
                        message: 'user successfully deleted',
                        status:"200" 

                    })
                } 
            })
        }
        else{

            res.json({

                message:"Don't have this ID",
                status:"404"

            }).status(404)
        }
    })      
})


module.exports = router