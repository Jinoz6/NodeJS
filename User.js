const connect = require('../config/connect-db')

module.exports = {

    create: (user, callback)=> { 

        connect.query(

            "INSERT INTO user (Firstname,Lastname,Age,Address,Mobile,status) VALUES (?,?,?,?,?,?)",
            [user.Firstname,user.Lastname,user.Age,user.Address,user.Mobile,user.status,],
            callback
            
        )
                
    },

    findById: (no, callback)=> {

        connect.query("SELECT * from user WHERE no = ? AND deleted_at IS NULL ", [no], callback )  

    },

    findAll: (callback)=>{

        connect.query("SELECT * from user WHERE deleted_at IS NULL", [], callback)
    },

    update: (no, user, callback) =>{

        connect.query("UPDATE user SET Firstname=?,Lastname=?,Age=?,Address=?,Mobile=?,status=? WHERE no = ? AND deleted_at IS NULL", 
        [user.Firstname,user.Lastname,user.Age,user.Address,user.Mobile,user.status, no], callback) 
    },

    delete: (no, callback)=>{

        connect.query("UPDATE user SET  deleted_at= CURRENT_TIMESTAMP WHERE no = ? ", [no],callback) 
    }

}