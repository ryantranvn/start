// site
if (env === 'maintaining') {
	module.exports = {
		index : function(req, res, next){
	       res.render('site/maintaining', { title: 'Maintaining Site' });
	    }
	}
}
else {
	module.exports = {
		index : function(req, res, next){
	       res.render('site/home', { title: 'Express Site' })
	    }
	}
}
