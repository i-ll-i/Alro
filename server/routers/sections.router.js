const middleware = require('../commonly used/DirectoryData.function.js');


module.exports = app => {


    const controller = require('../controllers/sections.controller.js');


    let router = require('express').Router();


    //  Требуются: section_title, section_title_in_russian  Возвращает: http-status - 201, send - section_data( rows )
    app.post('/private/creating-a-section', middleware.CreatingANewDirectory, controller.CreatingASection );

    //  Требуются: section_title  Возвращает: http-status - 200, send - section_data( rows )
    app.post('/private/deleting-a-partition', controller.DeletingAPartition );

    //  Возвращает: http-status - 200, send - ( result.rows )
    app.get('/public/getting-section-names', controller.GettingSectionNames );


    app.use( '/', router );


}; 