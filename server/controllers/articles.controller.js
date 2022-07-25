const fs = require('fs');
const { pool } = require('../dp-config/config/config.js');


const error = ( res, err ) => {

    console.error( err );

    return res.status( 500 ).send({
        status: 'Произошла ошибка. Для просмотра подробностей обратитесь к консоли сервера.'
    });

};


exports.UploadACoverImage = ( req, res ) => {


    res.status( 200 ).json({
        file: {
            url: `http://localhost:9000/${ req.file.originalname }`
        }
    });


};


exports.UploadingArticleImages = ( req, res ) => {
    

    res.json({
        success: 1,
        file: {
            url: `http://localhost:9000/${ req.file.filename }`
        }
    });


};


exports.RecordingArticleData = ( req, res ) => {


    pool.connect( ( err, client, release ) => {

        if ( err ) { 
            error( res, err ); 
        }

        client.query( `
            INSERT INTO "${ req.body.section_title }" ( 
                "address_of_the_cover_image", 
                "title_of_the_article", 
                "text_under_the_heading", 
                "date_of_creation", 
                "update_date"
            ) VALUES ( 
                '${ req.body.address_of_the_cover_image }', 
                '${ req.body.title_of_the_article }', 
                '${ req.body.text_under_the_heading }', 
                '${ req.body.date_of_creation }', 
                '${ req.body.update_date }'
            );`, (err, result) => {

            if ( err ) { 
                error( res, err ); 
            }
    
            release( true );

        });

    });

    
    try {

        let readingTheSelectedDirectory = fs.readdirSync( 'E:/Developed/Alro/alto1.0/server/AD/CONTENT/' + req.body.section_title );

        fs.writeFileSync( 'E:/Developed/Alro/alto1.0/server/AD/CONTENT/' + req.body.section_title + '/' + `${ readingTheSelectedDirectory.length + 1 }` + '.json', req.body.data );

        res.status( 201 ).send({
            status:  'Создание статьи прошло успешно.'
        });

    } catch ( err ) {
        error( res, err );
    }

};


exports.GettingThePrimaryDataOfArticles = ( req, res ) => {


    pool.connect( ( err, client, release ) => {

        if ( err ) {
            error( res, err );
        }

        client.query( `SELECT * FROM "${ req.body.section_title }";`, ( err, result ) => {

            if ( err ) {
                error( res, err );
            }

            res.status( 200 ).send( result.rows );
    
            release( true );

        });

    });


};


exports.GettingArticleData = ( req, res ) => {


    let theseArticles = require(`../AD/CONTENT/${ req.body.section_title }/${ req.body.article_id }.json`);

    res.status( 200 ).send({
        data: theseArticles
    });


};


exports.DeletingAnArticle = ( req, res ) => {


    pool.connect( ( err, client, release ) => {

        if ( err ) {
            error( res, err );
        }

        client.query( `DELETE FROM "${ req.body.section_title }" WHERE "id" = '${ req.body.article_id }'`, ( err, result ) => {

            if ( err ) {
                error( res, err );
            }

            release( true );

        });
        
    });


    fs.unlink( `E:/Developed/Alro/alto1.0/server/AD/CONTENT/${ req.body.section_title }/${ req.body.article_id }.json`, ( err ) => {
        error( res, err );
    });


    res.status( 200 ).send({
        status: 'Удаление статьи прошло успшно.'
    });


};


// exports.GettingAnImage = ( req, res ) => {

//     console.log( req.fileds );

// };