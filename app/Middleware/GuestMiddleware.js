/**
 * GuestMiddleware - fxd4 Framework
 */
module.exports = (req, res, next) => {
    // Jika user SUDAH login
    if (res.locals.user) {
        const dashboardPath = global.fxd4Routes ? global.fxd4Routes['dashboard'] : '/dashboard';
        
        // HANYA redirect jika user mencoba mengakses halaman guest (Login/Register)
        // Cek apakah path saat ini adalah bagian dari auth (login/register)
        const isAuthPage = req.path.includes('/login') || req.path.includes('/register');
        
        if (isAuthPage) {
            return res.redirect(dashboardPath);
        }
    }
    
    next();
};