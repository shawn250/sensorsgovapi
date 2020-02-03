'use strict';

module.exports = (sequelize, DataTypes) => {
  const metadata = sequelize.define('metadata', {
    sensor_id: DataTypes.STRING,
    sensor_type: DataTypes.STRING,
    type_of_employment: DataTypes.STRING,
    existing_planned_or_envisioned: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    quantity_per_postalcode: DataTypes.STRING,
    pos_x: DataTypes.STRING,
    pos_y: DataTypes.STRING,
    pos_z: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    location_descriptor: DataTypes.STRING,
    compass_bearing: DataTypes.STRING,
    sensor_model: DataTypes.STRING,
    data_resolution: DataTypes.STRING,
    sensor_coverage: DataTypes.STRING,
    unit: DataTypes.STRING,
    project_name: DataTypes.STRING,
    owner_agency: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false  //Will not auto generate createdAt and updatedAt
  });
  metadata.associate = function(models) {
    // associations can be defined here
   /*  metadata.belongsTo(models.dataset, {
      foreignKey: 'datasetOwnerAgency'
    }); */
  };
  return metadata;
};