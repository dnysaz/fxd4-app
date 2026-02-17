/**
 * HomeController - fxd4 Framework
 * Cleaned & Optimized
 */
class HomeController {
    
    static async home(process) {
        process.render('home', { 
            title: 'Halaman Beranda',
            message: 'Welcome to fxd4 Framework' 
        });
        
        process.error;
    }
}

module.exports = HomeController;