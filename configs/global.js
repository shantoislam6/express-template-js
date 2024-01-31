const path = require('path');

// .env
require('dotenv').config();

// global contants
global.PORT = process.env.PORT ?? 8080;
global.app_ = process.cwd();

global.getController = (controllerName) => {
  try {
    const controllerPath = path.join(
      app_,
      'controllers',
      `controller.${controllerName}`
    );
    return require(controllerPath);
  } catch (error) {
    // Handle error
    console.error(`Error loading controller '${controllerName}':`, error);
    return {};
  }
};

global.getModel = (modelName) => {
  try {
    const modelPath = path.join(app_, 'models', `model.${modelName}`);
    return require(modelPath);
  } catch (error) {
    // Handle error
    console.error(`Error loading model '${modelName}':`, error);
    return {};
  }
};
