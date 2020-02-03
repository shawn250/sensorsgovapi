'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dataset', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_name: {
        type: Sequelize.STRING
      },
      project_description: {
        type: Sequelize.STRING
      },
      owner_agency: {
        type: Sequelize.STRING
      },
      sensor_type: {
        type: Sequelize.STRING
      },
      sensor_count: {
        type: Sequelize.STRING
      },
      project_scale: {
        type: Sequelize.STRING
      },
      sensor_dataset_description: {
        type: Sequelize.STRING
      },
      sensor_dataparams: {
        type: Sequelize.STRING
      },
      sensor_dataclassification: {
        type: Sequelize.STRING
      },    
      sensor_dataupdatefreq: {
        type: Sequelize.STRING
      },
      sensor_datafileformat: {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dataset');
  }
};