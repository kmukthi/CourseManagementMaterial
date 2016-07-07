var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  _id: String,
  instructor: String,
  questions: [String],
  averageScore: { type: Number, min: 0, max: 100 },
  individualScore: Schema.Types.Mixed
});

mongoose.model('Course', CourseSchema);