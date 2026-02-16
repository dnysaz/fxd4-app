const express = require('express');
const router = express.Router(); 

// Controllers
const HomeController = require('../app/Controllers/HomeController');
const AuthController = require('../app/Controllers/AuthController');
const DashboardController = require('../app/Controllers/DashboardController');

// App Middlewares
const auth = require('../app/Middleware/AuthMiddleware');
const guest = require('../app/Middleware/GuestMiddleware');

// Core Middlewares
const dbFeature = require('../core/middleware/DatabaseFeatureMiddleware');

/**
 * fxd4 Route Mapping
 */

// Public
router.get('/', HomeController.home);

// Dashboard (Protected by DB Feature & Auth)
router.get('/dashboard', [dbFeature, auth], DashboardController.dashboard);
router.post('/logout', [dbFeature, auth], AuthController.logout);

// Authentication (Protected by DB Feature & Guest Check)
router.get('/login', [dbFeature, guest], AuthController.loginPage);
router.get('/register', [dbFeature, guest], AuthController.registerPage);
router.post('/login', [dbFeature, guest], AuthController.login);
router.post('/register', [dbFeature, guest], AuthController.register);

module.exports = router;