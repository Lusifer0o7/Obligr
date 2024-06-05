//getting routes and saving in permissions
const { Permission } = require("../models/roleModel");

const getRoutes = (app) => {
  const routes = [];
  app._router.stack.forEach(function (middleware) {
    if (middleware.route) {
      // Routes registered directly on the app
      routes.push(middleware.route);
    } else if (middleware.name === "router") {
      // Router middleware
      middleware.handle.stack.forEach(function (handler) {
        const route = handler.route;
        if (route) {
          routes.push(route);
        }
      });
    }
  });

  // Check if each route is already in permissions collection
  routes.forEach(async (route) => {
    const existingPermission = await Permission.findOne({
      name: route.name,
      path: route.path,
    });

    if (!existingPermission) {
      // If route is not in permissions collection, save it
      const newPermission = new Permission({
        name: route.name,
        path: route.path,
      });
      await newPermission.save();
    }
  });

  return;
};

module.exports = getRoutes;
