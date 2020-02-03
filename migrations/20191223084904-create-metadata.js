'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('metadata', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sensor_id: {
        type: Sequelize.STRING
      },
      sensor_type: {
        type: Sequelize.STRING
      },
      type_of_employment: {
        type: Sequelize.STRING
      },
      existing_planned_or_envisioned: {
        type: Sequelize.STRING
      },
      postal_code: {
        type: Sequelize.STRING
      },
      quantity_per_postalcode: {
        type: Sequelize.STRING
      },
      pos_x: {
        type: Sequelize.STRING
      },
      pos_y: {
        type: Sequelize.STRING
      },
      pos_z: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      location_descriptor: {
        type: Sequelize.STRING
      },
      compass_bearing: {
        type: Sequelize.STRING
      },
      sensor_model: {
        type: Sequelize.STRING
      },
      data_resolution: {
        type: Sequelize.STRING
      },
      sensor_coverage: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING
      },
      project_name: {
        type: Sequelize.STRING
      },
      owner_agency: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
      /* datasetOwnerAgency: {
        type: Sequelize.STRING,
        references: {
          model: 'dataset',
          key: 'ownerAgency',
          as: 'datasetOwnerAgency',
        },
      }, */
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('metadata');
  }
};