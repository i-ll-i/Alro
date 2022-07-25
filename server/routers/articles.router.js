const multer = require('multer');


let storageCover = multer.diskStorage({
    destination: function( req, file, callback ) {
        callback( null, '../server/AD/COVERS' );
    },
    filename: function( req, file, callback ) {
        callback( null, file.originalname );
    }
});

let storageImages = multer.diskStorage({
    destination: function( req, file, callback ) {
        callback( null, '../server/AD/PICTURES' );
    },
    filename: function( req, file, callback ) {
        callback( null, file.originalname );
    }
});

let coverStorage = multer({ storage: storageCover });

let imageStorage = multer({ storage: storageImages });


module.exports = app => {


    const controller = require('../controllers/articles.controller.js');


    let router = require('express').Router();


    //  Требуется: file  Возвращает: http-status - 200, send - file( url( string ) )
    app.post('/private/upload-a-cover-image', coverStorage.single('cover'), controller.UploadACoverImage );

    //  Требуется: file  Возвращает: send - success, file( url( string ) )
    app.post('/private/uploading-article-images', imageStorage.single('image'), controller.UploadingArticleImages );

    //  Требуются: section_title, address_of_the_cover_image, title_of_the_article, text_under_the_heading, date_of_creation, update_date, data  Возвращет: http-status - 201
    app.post('/private/recording-article-data', controller.RecordingArticleData );

    // app.post('/private/updating-article-data', controller.UpdatingArticleData );


    //  Требуются: section_title,  Возвращает: http-status - 200, send - ( result.rows )
    app.post('/public/primary-data-of-articles', controller.GettingThePrimaryDataOfArticles );

    //  Требуются: section_title, article_id  Возвращает: http-status - 200, send - data( файл json )
    app.post('/public/getting-article-data', controller.GettingArticleData );


    //  Требуются: section_title, article_id  Возвращает: http-status - 200
    app.post('/private/deleting-an-article', controller.DeletingAnArticle );


    // app.all('/getting-an-image', controller.GettingAnImage );

    
    app.use( '/', router ); 


}; 