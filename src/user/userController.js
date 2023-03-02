var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    try {
    var status = await userService.createUserDBService(req.body);

    if (status) {
        res.send({ "status": true, "message": "Usuario creado" });
    } else {
        res.send({ "status": false, "message": "Error creando usuario" });
    }
    }
    catch(err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var findUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.finduserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var deleteUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.deleteuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var updateUserControllerFunc = async (req, res) =>  {
    try {
    var status = await userService.updateuserDBService(req.body);

    if (status) {
        res.send({ "status": true, "message": "Usuario actualizado" });
    } else {
        res.send({ "status": false, "message": "Error actualizando usuario" });
    }
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, findUserControllerFunc, deleteUserControllerFunc, updateUserControllerFunc};