'use strict';
var AWS = require('aws-sdk');

var elasticTranscoder = new AWS.ElasticTranscoder({
	
	region: 'us-east-1'
	
});

exports.handler = function(event, context, callback){
		
	// identifies object in bucket
	var key = event.Records[0].s3.object.key;
	 
	// s3 key names are url encoded
   var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));
	 
	// removing file extension
   var outputKey = sourceKey.split('.')[0];

   var params = {
       PipelineId: '<PIPELINE ID HERE>', // elastic transcoder id
       Input: {
           Key: sourceKey
       },
       Outputs: [
           {
               Key: outputKey + '-720p' + '.mp4', // 720p mp4
               PresetId: '1351620000001-000010' // system preset specifies output of elastic transcoder
           }
       ]};

   elasticTranscoder.createJob(params, function(error, data){
       if (error){
			 
           callback(error); // if job fails then write error to CloudWatchs
			  
       }
		 
    });
	 
};







