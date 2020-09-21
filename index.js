const express = require('express')
const User = require('../model/User')

const router = express.Router()

router.get('/user', (req, res) => {

    const page = parseInt(req.query.page)
    const limit = 9
    
    const startIndex = (page-1)*limit
    const endIndex = page *limit

    User.findAll((err, user) => {

        if (err)  return next(err)
        

        let total = Object.keys(user).length
        
        let results = user.slice(startIndex,endIndex)

        results.next= {

            page: page+1,
            limit: limit,
            total:total
        }

        results.previous ={
            page:page -1,
            limit: limit
        }
        console.log(results)
        
        res.render('index', {user: results})
       
    })
  })

router.get('/users', (req, res,next) =>{

    User.findAll((err, user) => {

        if (err)  return next(err)

        // console.log(user.length)   

        res.render('index', {user: user})

        // res.json({

        //     status:200,
        //     data: user
            
        // })
    })
})
  
  
  
router.post('/users', (req, res,next) =>{
    console.log(req.body)
   
    let status = req.body.status 

    status[1] == "on" ? status = 1: status = 0

    const new_user = req.body.Firstname && req.body.Lastname && req.body.Age 
                     && req.body.Address && req.body.Mobile && req.body.status;

    const data={

        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname ,
        Age: req.body.Age ,
        Address: req.body.Address,
        Mobile: req.body.Mobile,
        status: status
    }

   
              
    if(new_user){

        User.create(data, (err, user) => {

            if (err){ 

                return next(err)
            }
            else{
                        
                res.json({
    
                    error:false,
                    message:"status:200",
                    
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

    console.log(req.body)

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
            
                        res.json({ error:false, message: 'user successfully updated'});
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

            message:"bad request",
            status:400

                
        }).status(400)
    }
    
})
  
  
router.get('/users/:no', (req, res,next) => {

    User.findById(req.params.no, (err, user)=> {

        if (err) return next(err)

        if(user.length < 1){

            res.json({

                message:"Don't have this ID",
                status:404

            }).status(404)
        }
        else{

            res.render('index',{user:user})

            //     status:"200",
            //     data:user

            // })
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