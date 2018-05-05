'use strict';

var AWS = require('aws-sdk');

var async = require('async');

var s3 = new AWS.S3();

// creates configuration for S3 listObjects function
function bucketParams(next) {
	
	var params = {
		
		Bucket: process.env.BUCKET
		
	};

	next(null, params);
	
}

// function uses S3 SDK to get a list of objects from bucket
function getVideos(params, next) {
	s3.listObjects(params, function(err, data){
		if (err) {
			
			next(err);
			
		} else {
			
			next(null, data);
		
		}
		
  });
}

// loops through data and creates array of objects
function videoList(data, next) {
	
	var files = [];
	
	for (var i = 0; i < data.Contents.length; i++) {
		
		var file = data.Contents[i];
		
		files.push({
			'filename': file.Key,
			'eTag': file.ETag.replace(/"/g,""),
			'size': file.Size	
		});
	 
	}
	
	var result = {
		
		domain: process.env.BASE_URL,
		bucket: process.env.BUCKET,
		files: files
		
  }
  
  next(null, result)
  
}

exports.handler = function(event, context, callback){
	async.waterfall([bucketParams, getVideos, videoList],
	function (err, result) {
		
		if (err) {
			
			callback(err);
			
		} else {
			
			callback(null, result); // Lambda callback returns list of URLs together with baseUrl and bucket name  
		
		}
  });
  
};
