var mongoose = require('mongoose');
var Course = mongoose.model('Course');
module.exports = {
		render: function(req, res){
			Course.findOne({_id: "Math"}, function(err, course) {
					if(err){
						res.render('index', { title: 'Postero', success: false, msg: "DataBase error while installing" });
					}else{
						if(course == null){
							var reqData = {
									 _id: "Math",
									  instructor: "Instructor 1",
									  questions: ["How","What"],
									  averageScore: 0,
									  individualScore: {k:"v"}
							};
							var course = new Course(reqData);
							course.save(function(err){
								if(err){
									res.render('index', { title: 'Postero', success: false, msg: "DataBase error while installing" });
								}else{
									//res.render('index', { title: 'Postero', success: true });
								}
							});
							reqData = {
									 _id: "Computer",
									  instructor: "Instructor 1",
									  questions: ["How","What"],
									  averageScore: 0,
									  individualScore: {k:"v"}
							};
							course = new Course(reqData);
							course.save(function(err){
								if(err){
									res.render('index', { title: 'Postero', success: false, msg: "DataBase error while installing" });
								}else{
									//res.render('index', { title: 'Postero', success: true });
								}
							});
							reqData = {
									 _id: "Arts",
									  instructor: "Instructor 2",
									  questions: ["How","What"],
									  averageScore: 0,
									  individualScore: {k:"v"}
							};
							course = new Course(reqData);
							course.save(function(err){
								if(err){
									res.render('index', { title: 'Postero', success: false, msg: "DataBase error while installing" });
								}else{
									res.render('index', { title: 'Postero', success: true });
								}
							});
						}else{
							console.log(course);
							res.render('index', { title: 'Postero', success: true });
						}
					}
			  	
						});
			  //res.render('index', { title: 'Express' });
		},
		getAllCourseNames: function(req, res){
			Course.find({}, function(err, response) {
				  if(err){
					  console.log(err);
				  }else{
					  res.send({data: response});
				  }
				});

		},
		saveQuestions: function(req, res){
			var courseObj = req.body;
			Course.findByIdAndUpdate(courseObj._id, courseObj, function(err, course) {
				 if(err){
					 res.send(false);
				 }else{
					 res.send(true);
				 }
			 });
		}
}