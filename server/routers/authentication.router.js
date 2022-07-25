module.exports = app => {

    
    const controller = require('../controllers/authentication.controller.js');


    let router = require('express').Router();


    //  Требуются: login, password      Возвращает: http-status - 201
    app.post( '/private/adding-an-administrator', controller.AddingAnAdministrator );


    //  Требуются: login, password      Возвращает: http-status - 401/200, send - login( boolean ), password( boolean )
    app.post( '/private/administrator-authorization', controller.AdministratorAuthorization );


    app.use( '/', router );


};