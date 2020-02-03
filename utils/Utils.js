const csv = require('csv');
const dbStreamer = require('db-streamer');
const csvParser = require('csv-parse');
const pg = require('pg');
const fastcsv = require('fast-csv');
const fs = require('file-system');
var AWS = require("aws-sdk");

//Define what kind of db environment
const env="development";
const config = require(`${__dirname}/../config/config.json`)[env];

//Using the csvparser read the data + use async callback to iterate and push in
const processMetaDataFile = async (file, ModelInit) => {
  let stream = fs.createReadStream(file.path);
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push(data);
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();

      //Config pool connection read from config.json file
      const poolConfig = {
        host: config.host,
        database: config.database,
        user: config.username,
        password: config.password,
        port: config.port
      };

      //The sql string has preventive SQL injection because of the parameters
      const pool = new pg.Pool(poolConfig);
      const query =
        "INSERT INTO metadata (sensor_id, sensor_type, type_of_employment, existing_planned_or_envisioned, postal_code, "
        + "quantity_per_postalcode, pos_x, pos_y, pos_z, latitude, longitude, location_descriptor, "
        + "compass_bearing, sensor_model, data_resolution, sensor_coverage, unit, project_name, "
        + "owner_agency, created_at, updated_at) "
        + "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, now(), now())";

      pool.connect(function (err, client, done) {
        if (err) {
          console.log("Can not connect to the DB" + err);
        }
        try {
          csvData.forEach(row => {
            client.query(query, row, (err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                console.log("inserted " + res.rowCount + " row:", row);
              }
            });
          });
        }
        finally {
          done();
        }
      });
    });

  stream.pipe(csvStream);
}

//const uploadFileToS3 = async (file, bufferData) => {
const uploadFileToS3 = async (file, bufferData) => {

  console.log("UPLOAD_ARG " + file.path);

  //AWS upload
  let s3bucket = new AWS.S3({
    accessKeyId: "AKIAIEO6OF62ADRWISOA",
    secretAccessKey: "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",
    region: "ap-southeast-1"
  });

  console.log("AWS_ACCESS_KEY " + s3bucket.accessKeyId);
  console.log("AWS_SECRET_KEY " + s3bucket.secretAccessKey);

  //Where you want to store your file
  var params = {
    Bucket: "sensorassetmetadatas",
    Key: file.originalname,
    Body: bufferData,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  //Upload logic to store file in AWS S3
  s3bucket.upload(params, function (err, data) {
    if (err) {
      console.log(err);
      //res.status(500).json({ error: true, Message: err });
    } else {
      //res.send({ data });
      var newFileUploaded = {
        //description: req.body.description,
        //description: 'abc',
        //fileLink: s3FileURL + file.originalname,
        s3_key: params.Key
      };
      //This is saved the file url link to database (I need think about it)
     /*  var document = new DOCUMENT(newFileUploaded); 
      document.save(function (error, newFile) {
        if (error) {
          throw error;
        }
      }); */
    }
  });
}

module.exports = {processMetaDataFile, uploadFileToS3};
