const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const bucketName = process.env.bucketName || '';
    const objectKey = 'input-file.txt';
    // S3 bucket
    /*
    const s3 = new AWS.S3();
    const params = { Bucket: bucketName, Key: objectKey };
    const response = await s3.getObject(params).promise();
    const dynamic_string = response.Body?.toString('utf-8') || 'dynamic string';
    */
    // Needs deleting when find out how to properly include S3 in this file
    let dynamic_string = 'dynamic string';
    let saved_string = `<h1>The saved string is a ${dynamic_string}</h1>`;
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ message: `${saved_string}` }),
    };
};