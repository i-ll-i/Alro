const fs = require('fs');


exports.CreatingANewDirectory = ( req, res, next ) => {


    try {

        fs.mkdirSync( 'E:/Developed/Alro/alto1.0/server/AD/CONTENT/' + req.body.section_title );

        req.body.path_to_the_directory = 'E:/Developed/Alro/alto1.0/server/AD/CONTENT/' + req.body.section_title;
    
    } catch ( err ) {
    
        console.log( err );
    
    }

    next();


};