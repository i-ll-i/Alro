const { pool } = require('../dp-config/config/config.js');
const fs = require('fs');


const error = ( res, err ) => {

  console.error( err );

  return res.status( 500 ).send({ 
    status: 'Произошла ошибка. Для просмотра подробностей обратитесь к консоли сервера.' 
  });

};


exports.CreatingASection = ( req, res ) => {


  pool.connect( ( err, client, release ) => {

    if ( err ) {
      error( res, err );
    }

    client.query( `
      CREATE TABLE ${ req.body.section_title } ( 
        id SERIAL, 
        address_of_the_cover_image varchar(255) NOT NULL, 
        title_of_the_article varchar(255) NOT NULL, 
        text_under_the_heading TEXT NOT NULL, 
        date_of_creation DATE NOT NULL, 
        update_date DATE
      ); 
      INSERT INTO "sections" ( 
        "title", 
        "title_in_russian" 
      ) VALUES ( 
        '${ req.body.section_title }',
        '${ req.body.section_title_in_russian }'
      );`, (err, result) => {

        if ( err ) {
          error( res, err );
        }

        client.query( 'SELECT * FROM sections;', ( err, result ) => {

      
          if ( err ) {
            error( res, err );
          }

          res.status( 201 ).send({
            status: 'Создание раздела завершилось успешно.',
            section_data: result.rows
          });

          release( true );

        });

    });

  });


};


exports.DeletingAPartition = ( req, res ) => {


  pool.connect( ( err, client, release ) => {

    if ( err ) {
      error( res, err );
    }

    client.query( `
      DROP TABLE "${ req.body.section_title.toLowerCase() }";
      DELETE FROM "sections"
      WHERE "title" = '${ req.body.section_title }';`, ( err, result ) => {

        if ( err ) {
          error( res, err );
        }

        client.query( 'SELECT * FROM sections;', ( err, result ) => {

      
          if ( err ) {
            error( res, err );
          }

          res.status( 200 ).send({
            status: 'Удаление раздела завершилось успешно.',
            section_data: result.rows
          });

          release( true );

        });

    });

  });


};


exports.GettingSectionNames = ( req, res ) => {


    pool.connect( ( err, client, release ) => {

      if ( err ) {
        error( res, err );
      }

      client.query( 'SELECT * FROM sections;', ( err, result ) => {

        if ( err ) {
          error( res, err );
        }

        res.status( 200 ).send( result.rows );

        release( true );

      });

    });
    

};