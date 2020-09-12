const connect = require('../config/connect-db')



var User = function(user){

    this.no = user.no
    this.firstname = user.firstname
    this.lastname = user.lastname
    this.age = user.age
    this.address = user.address
    this.mobile = user.mobile
    this.status = user.status
}

User.create = function (newUser, result) {    
    connect.query("INSERT INTO user set ?", newUser, function (err, res) {
        if(err) {
            console.log("error: ", err)
            result(err, null)
        }
        else{
            console.log(res)
            result(null, res)
        }
    })         
}

User.findById = function (no, result) {
    connect.query("Select * from user where no = ? ", no, function (err, res) {             
        if(err) {
            console.log("error: ", err)
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

User.findAll = function(result){
    connect.query("Select * from user", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('user : ', res);  
            result(null, res);
        }
    })
}

User.update = function(no, user, result){
    connect.query("UPDATE user SET Firstname=?,Lastname=?,Age=?,Address=?,Mobile=?,status=? WHERE no = ?", 
    [user.Firstname,user.Lastname,user.Age,user.Address,user.Mobile,user.status, no], function (err, res) {
          if(err) {
              console.log("error: ", err);
              result(null, err);
          }else{   
              result(null, res);
          }
      }) 
  }
  User.delete = function(no, result){
       connect.query("DELETE FROM `user` WHERE no = ?", [no], function (err, res) {
          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              result(null, res);
          }
      }) 
  }

module.exports = User