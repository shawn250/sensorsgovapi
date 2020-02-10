const express = require("express");
const app = express();
const SensorsRouter = express.Router(); //based on mongoose schema library
const fs = require('file-system');
const multer = require("multer");
var upload = multer({ dest: 'uploads/', inMemory: true });

//Utils function
const utilsModule = require('../utils/Utils');

//Schema
const ModelInit = require("../models/sequeliseInit");

//Post method for saving record to database
SensorsRouter.post("/add", upload.single('file'), function (req, res) {
  //Examine the request body
  let valueName = {};
  const file = req.file;
  //const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

  console.log(file.originalname); //human readable filename
  console.log(file.path); //path where is being uploaded (based on the path defined in multer)
  console.log(file.filename); //uploaded filename which is encrypted
  console.log(file);
  console.log(req.body);
  console.log("FILENAME " + req.body.name); //undefined as is object which need to iterate through
  Object.keys(req.body).forEach(function (key) {
    let keyName = key;
    valueName = req.body[key];
    console.log("key " + keyName + " value " + valueName);
  });

  //Saving sensor dataset record to dataset table (Db table column name: req fields name)
  ModelInit.dataset.create({
    project_name : req.body.projectName,
    project_description: req.body.projectDescription,
    owner_agency: req.body.ownerAgency,
    sensor_type: req.body.sensorType,
    sensor_count: req.body.sensorCount,
    project_scale: req.body.projectScale,
    sensor_dataset_description: req.body.sensorDataSetDescription,
    sensor_dataparams: req.body.sensorDataParams,
    sensor_dataclassification: req.body.sensorDataClassification,
    sensor_dataupdatefreq: req.body.sensorDataUpdateFreq,
    sensor_datafileformat: req.body.sensorDataFileFormat,
    created_at: Date.now(),
    updated_at: Date.now()
  }).then(function(dataset) {
    console.log("Sensor information added successfully")
    res.json(dataset);
  })
  .catch(err => {
    console.log(err); //print out error
    res.status(400).send("unable to save sensor information to database");
  }); 

  //fs will read the file and output to bufferData variable, store the file in AWS S3
  fs.readFile(file.path, function (err, bufferData) {
    if (err) throw err;
    // data will contain your file contents
    console.log("the data is : ", bufferData)
    utilsModule.uploadFileToS3(file, bufferData);
  });

  //Read and process the sensor data file and save the fields to database
  utilsModule.processMetaDataFile(file, ModelInit);
});

//Get method to retrieve records from dataset table based on search conditions (Proj name, owner agency, sensor type)
SensorsRouter.route("/").get(function (req, res) {

  //Initialise an empty object to hold key,value pairing
  let filters = {};

  //Iterate the parameters
  for (const key in req.query) {
    console.log("Key " + key + " Value " + req.query[key]);
    filters[key] = req.query[key];
  }

  ModelInit.dataset.findAll({
     where: [filters]
  }).then(function (sensors) {
    //console.log("LENGTH " + serverports.length);
    if (!sensors) {
      console.log("No data found");
      console.log(err);
    } else {
      //console.log(serverports);
      res.json(sensors);
    }
  });
});

//Post method to handle the enquiry form sent from ContactUs web page
//Detailed logic to implement in future
SensorsRouter.post("/contactUsAdd", function (req, res) {  
  res.status(200).send("Enquiry sent successfully!");
});

//Another get module by getting all sensor records from metadata table
SensorsRouter.route("/getAllSensorLocations").get(function (req, res) {

  ModelInit.metadata.findAll({
    attributes: ['sensor_id', 'sensor_type', 'type_of_employment', 'existing_planned_or_envisioned',
				 'latitude', 'longitude', 'location_descriptor', 
				 'sensor_model', 'data_resolution', 'unit', 'project_name', 'owner_agency'], //selected column fields to return
  }).then(function (sensors) {
    //console.log("LENGTH " + serverports.length);
    if (!sensors) {
      console.log("No data found");
      console.log(err);
    } else {
      //console.log(serverports);
      res.json(sensors);
    }
  });
});

//Get the location based on location descriptor
SensorsRouter.route("/getSensorLocation/:location_descriptor").get(function (req, res) {

  //Initialise an empty object to hold key,value pairing
  let filters = {};

  console.log(req.params.location_descriptor)
  filters["location_descriptor"] = req.params.location_descriptor

  ModelInit.metadata.findAll({
     attributes: ['sensor_id', 'sensor_type', 'type_of_employment', 'existing_planned_or_envisioned',
				 'latitude', 'longitude', 'location_descriptor', 
				 'sensor_model', 'data_resolution', 'unit', 'project_name', 'owner_agency'], //selected column fields to return
     where: [filters]
  }).then(function (sensors) {
    //console.log("LENGTH " + serverports.length);
    if (!sensors) {
      console.log("No data found");
      console.log(err);
    } else {
      //console.log(serverports);
      res.json(sensors);
    }
  });
});

//Another get module by taking in multiple parameters (Example is sensorId, projectName)
 //Initialise an empty object to hold key,value pairing
 SensorsRouter.route("/getSensorLocation").get(function (req, res) {

  //Initialise an empty object to hold key,value pairing
  let filters = {};

  //Iterate the parameters
  for (const key in req.query) {
    console.log("Key " + key + " Value " + req.query[key]);
    filters[key] = req.query[key];
  }

  ModelInit.metadata.findAll({
      attributes: ['sensor_id', 'sensor_type', 'type_of_employment', 'existing_planned_or_envisioned',
				 'latitude', 'longitude', 'location_descriptor', 
				 'sensor_model', 'data_resolution', 'unit', 'project_name', 'owner_agency'], //selected column fields to return
     where: [filters]
  }).then(function (sensors) {
    //console.log("LENGTH " + serverports.length);
    if (!sensors) {
      console.log("No data found");
      console.log(err);
    } else {
      //console.log(serverports);
      res.json(sensors);
    }
  });
});

module.exports = SensorsRouter;
