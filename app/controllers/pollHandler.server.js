'use strict';

var Users = require('../models/users.js');
var qs = require('qs')

function PollHandler () {
	
	this.remPoll = function (req, res) {
		var body = '';
		
		req.on('data', function(data){
			body+=data;
		});
		
		req.on('end', function () {
			Users.findOne({ 'github.id': req.user.github.id },function(err,data){
				if (err) {throw err;}
				data.pollitems.pollitem.forEach(function(elm,idx){
					if(elm.pollname.toString()===body.toString()){
						data.pollitems.pollitem[idx].remove();
						//console.log("match");
						//console.log(elm.pollname.toString()+body.toString())
					}
				});
			});
		});
	};
	
	
	this.getPolls = function (req, res) {
		var catname = [];
		var query = { 'github.id': req.user.github.id };
		
		Users.findOne(query,function(err,data){
			if (err) {throw err;}
			
			data.pollitems.pollitem.forEach(function(elm){
				catname.push(elm.pollname);
				//console.log(qs.parse(elm));
				//console.log(elm);
			});
			res.json(catname);
			//console.log(catname);
		});
	};

	/*this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};*/

}

module.exports = PollHandler;
