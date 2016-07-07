
/*
 * GET home page.
 */

/*exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};*/
module.exports = function(app){
	var index  = require('../controllers/index.server.controller');
	app.get('/', index.render);
	app.post('/saveQuestions',index.saveQuestions);
	app.get('/getAllCourseNames',index.getAllCourseNames);
};