const express = require('express');
const wrap = require('../core/utils/RouteWrapper');

const fx = {
    // Core Router Instance
    router: wrap(express.Router()),

    // Controllers
    HomeController: require('../app/Controllers/HomeController'),
    AuthController: require('../app/Controllers/AuthController'),
    DashboardController: require('../app/Controllers/DashboardController'),

    // Middlewares
    auth: require('../app/Middleware/AuthMiddleware'),
    guest: require('../app/Middleware/GuestMiddleware'),
    dbFeature: require('../core/middleware/DatabaseFeatureMiddleware')
};

module.exports = fx;