const { pool } = require('../dp-config/config/config.js');

const bcrypt = require('bcrypt');


const error = ( res, err ) => {

    console.error( err );
  
    return res.status( 500 ).send({ 
      status: 'Произошла ошибка. Для просмотра подробностей обратитесь к консоли сервера.' 
    });
  
  };


exports.AddingAnAdministrator = ( req, res ) => {
    

    let salt = bcrypt.genSaltSync(10);

    pool.connect( ( err, client, release ) => {

        if ( err ) {
            error( res, err );
        }

        client.query( `INSERT INTO "admins" ( "login", "password", "salt" ) VALUES ( '${ req.body.login }', '${ bcrypt.hashSync( req.body.password, salt ) }', '${ salt }' );`, ( err, result ) => {

            if ( err ) {
                error( res, err );
            }

            res.status( 201 ).send({
                status: 'Добавление администратора прошло успешно.'
            });

            release( true );

        });

    });


};


exports.AdministratorAuthorization = ( req, res ) => {


    pool.connect( ( err, client, release ) => {

        if ( err ) {
            error( res, err );
        }

        client.query( `SELECT * FROM admins WHERE login = '${ req.body.login }';`, ( err, result ) => {

            if ( err ) {
                
                res.status( 401 ).send({
                    status: 'Фатальное завершение аутентификации администратора.',
                    login: false,
                    password: false
                });
                
            } else {

                if ( bcrypt.hashSync( req.body.password, result.rows[0]['salt'] ) === result.rows[0]['password'] ) {

                    res.status( 200 ).send({
                        status: 'Аутентификация администратора прошла успешно.',
                        login: true,
                        password: true
                    });
    
                } else {
    
                    res.status( 401 ).send({
                        status: 'Фатальное завершение аутентификации администратора.',
                        login: true,
                        password: false
                    });
    
                }

            }

            release( true );

        });

    });


};