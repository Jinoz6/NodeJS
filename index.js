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

    User.findAll(function(err, user) {
      console.log('controller')
      if (err)
      res.send(err);
      console.log('res', user);
      res.send(user);
    })
  })
  
  
  router.post('/users', (req, res,) =>{
     const new_user = req.body;
      console.log(req.body)
      User.create(new_user, function(err, user) {
                  if (err)
                  res.send(err);
                  res.json({error:false,message:"user added successfully!",data:user.no});
              })
  
      //handles null error 
    //  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    //       res.status(400).send({ error:true, message: 'Please provide all required field' });
    //   }else{
    //       
    //   }
  })
  

  router.put('/users/:no', (req, res,) => {

      if(req.body.constructor === Object && Object.keys(req.body).length === 0){
          res.status(400).send({ error:true, message: 'Please provide all required field' });
      }else{
          User.update(req.params.no, req.body, function(err,user) {
              if (err)
              res.send(err);
              res.json({ error:false, message: 'user successfully updated',data:user });
          })
      }
    
  })
  
  
  router.get('/users/:no', (req, res,) => {
      User.findById(req.params.no, function(err, user) {
          if (err)
          res.send(err);
          res.json(user);
      })
  })
  
  

  
  router.delete('/users/:no', (req, res,) => {
    User.delete( req.params.no, function(err, user) {
      if (err)
      res.send(err);
      res.json({ error:false, message: 'user successfully deleted' })
    })
  })


module.exports = router