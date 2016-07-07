module.exports = {
		init: function(app){
			var configurationVariables = require('./env/' + app.get('env') + '.js');
			return configurationVariables;
		}
};