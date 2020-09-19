const AWS = require('aws-sdk');

const {
  B2_ACCESS_KEY_ID,
  B2_SECRET_ACCESS_KEY,
  B2_ENDPOINT,
  B2_BUCKET,
  B2_URL_PREFIX,
} = process.env;

module.exports = () => {
  const creds = new AWS.Credentials(B2_ACCESS_KEY_ID, B2_SECRET_ACCESS_KEY);
  AWS.config.credentials = creds;
  const endpoint = new AWS.Endpoint(B2_ENDPOINT);
  const s3 = new AWS.S3({ endpoint });

  return new Promise((resolve, reject) => {
    s3.listObjects({ Bucket: B2_BUCKET }, (err, data) => {
      const files = data.Contents.map(item => `${B2_URL_PREFIX}${item.Key}`);
      resolve(files);
    })
  });
};
