require('dotenv').config();

const AWS = require('aws-sdk');

// console.log("process.env",process.env);
console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, process.env.AWS_REGION);

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
//   region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

export const uploadToS3 = async (file) => {
    const params = {
        Bucket: 'bookimages-0', // replace with your bucket name
      Key: `book-covers/${Date.now()}-${file.name}`, // prefix with a folder name if needed
      Body: file,
    //   ACL: 'public-read', // so that the file is publicly accessible--- NO DONT INCLUDE THIS AT ALL, IT WAS CAUSING SO MUCH PROBLEM FOR ME
      ContentType: file.type
    };
  
    return new Promise((resolve, reject) => {
      s3.upload(params, (error, data) => {
        if (error) {
          console.log('Image Upload Error:', error);
          reject(error);
        } else {
          console.log('Successfully uploaded:', data.Location);
          resolve(data.Location); // URL of the uploaded file
        }
      });
    });
  };
  