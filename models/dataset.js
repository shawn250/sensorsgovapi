'use strict';

module.exports = (sequelize, DataTypes) => {
  const dataset = sequelize.define('dataset', {
    project_name: DataTypes.STRING,
    project_description: DataTypes.STRING,
    owner_agency: DataTypes.STRING,
    sensor_type: DataTypes.STRING,
    sensor_count: DataTypes.STRING,
    project_scale: DataTypes.STRING,
    sensor_dataset_description: DataTypes.STRING,
    sensor_dataparams: DataTypes.STRING,
    sensor_dataclassification: DataTypes.STRING,
    sensor_dataupdatefreq: DataTypes.STRING,
    sensor_datafileformat: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false  //Will not auto generate createdAt and updatedAt
  });
  dataset.associate = function(models) {
    // associations can be defined here
    /* dataset.hasMany(models.metadata, {
      foreignKey: 'datasetOwnerAgency',
      as: 'items',
    }); */
  };
  return dataset;
};