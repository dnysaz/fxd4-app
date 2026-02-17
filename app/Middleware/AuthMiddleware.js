/**
 * AuthMiddleware - fxd4 Framework
 * Optimized with Named Routes logic
 */
module.exports = (req, res, next) => {
    /**
     * res.locals.user diisi oleh Global Middleware di Server.js
     */
    if (!res.locals.user) {
        // Cari path untuk route bernama 'login'
        const loginPath = global.fxd4Routes ? global.fxd4Routes['login'] : '/login';
        
        // Proteksi: Jika user sudah di halaman login, jangan redirect lagi (cegah loop)
        if (req.path === loginPath) {
            return next();
        }

        return res.redirect(loginPath);
    }
    
    next();
};