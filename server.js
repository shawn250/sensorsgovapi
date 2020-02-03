const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 4000;
const cors = require('cors');
//const config = require('./DB');
const config = require('./models/sequeliseInit');
const SensorsRouter = require('./routes/SensorsRouter');
let {PythonShell} = require('python-shell');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/sensors', SensorsRouter);

app.listen(PORT, function(){
  console.log('Server is running on Port: ',PORT);
});

//Start the python shell for initialising the 3D viewer
/* PythonShell.run('../client/3DViewer/webServer.py', null, function (err, results) {
  if (err) throw err;
  console.log('finished');
}); */