const fx = require('./config');
const route = fx.router;

// --- Public Routes ---
route.get('/', fx.HomeController.home).name('home');

// --- Auth Guest Group ---
route.group([fx.dbFeature, fx.guest], (route) => {
    route.get('/login', fx.AuthController.loginPage).name('login');
    route.get('/register', fx.AuthController.registerPage).name('register');
    
    route.post('/login', fx.AuthController.login).name('login.post');
    route.post('/register', fx.AuthController.register).name('register.post');
});

// --- Dashboard & Protected Group ---
route.group([fx.dbFeature, fx.auth], (route) => {
    route.get('/dashboard', fx.DashboardController.dashboard).name('dashboard');
    
    // Profile Management
    route.get('/dashboard/edit-profile', fx.DashboardController.editProfile).name('profile.edit');
    route.post('/dashboard/update-profile', fx.DashboardController.updateProfile).name('profile.update');
    
    // Session Management
    route.post('/logout', fx.AuthController.logout).name('logout');
});

module.exports = route;