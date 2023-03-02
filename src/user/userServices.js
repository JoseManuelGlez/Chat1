var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
       var userModelData = new userModel();

       userModelData.firstname = userDetails.firstname;
       userModelData.lastname = userDetails.lastname;
       userModelData.email = userDetails.email;
       userModelData.password = userDetails.password;
       var encrypted = encryptor.encrypt(userDetails.password);
       userModelData.password = encrypted;

       userModelData.save(function resultHandle(error, result) {

           if (error) {
               resolve(false);
           } else {
               resolve(true);
           }
       });
   });
}

module.exports.finduserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Something is wrong"});
         }
         else {
            if(result !=undefined &&  result !=null) {

               if(result.email== userDetails.email) {
                  resolve({status: true,msg: "The user exists"});
               }
               else {
                  reject({status: false,msg: "User doesn't exists"});
               }
            }
            else {
               reject({status: false,msg: "No user found"});
            }
         }
      });
   });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.deleteuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOneAndDelete({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Something is wrong"});
         }
         else {
            if(result !=undefined &&  result !=null) {

               if(result.email== userDetails.email) {
                  resolve({status: true,msg: "User found"});
               }
               else {
                  reject({status: false,msg: "User doesn't exists"});
               }
            }
            else {
               reject({status: false,msg: "No user found"});
            }
         }
      });
   });
}

/*module.exports.updateuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Something is wrong"});
         }
         else {
            if(result !=undefined &&  result !=null) {

               if(result.email== userDetails.email) {
                                                var userModelData = new userModel();

                                                userModelData.firstname = userDetails.firstname;
                                                userModelData.lastname = userDetails.lastname;
                                                //userModelData.email = userDetails.email;
                                                userModelData.password = userDetails.password;
                                                var encrypted = encryptor.encrypt(userDetails.password);
                                                userModelData.password = encrypted;

                                                userModelData.updateOne(function resultHandle(error, result) {

                                                   if (error) {
                                                         resolve(false);
                                                   } else {
                                                         resolve(true);
                                                   }
                                                });
                  resolve({status: true,msg: "Usuario actualizado correctamente"});
               }
               else {
                  reject({status: false,msg: "User doesn't exists"});
               }
            }
            else {
               reject({status: false,msg: "No user found"});
            }
         }
      });
   });
}*/

module.exports.updateuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOneAndUpdate(userDetails.email, 
         {
            $set : {
               firstname: userDetails.firstname,
               lastname: userDetails.lastname,
               //email: userDetails.email,
               password: userDetails.password
             }
         },

         (err, user) => {
              if (err) {
               resolve(false);
           } else {
               resolve(true);
           }
            }
         );
   });
}