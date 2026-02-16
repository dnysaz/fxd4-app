const supabase = require('../../core/config/Database');
const User = require('../Models/User');

/**
 * AuthController - fxd4 Framework
 * Optimized for High Performance and Minimal Latency
 */
class AuthController {
    
    // Display Login Page
    static async loginPage(req, res, next) {
        try {
            res.render('auth/login', { 
                layout: 'layouts/guest',
                title: 'Login', 
                message: 'Please Login before continue!' 
            });
        } catch (error) {
            next(error); 
        }
    }

    // Display Register Page
    static async registerPage(req, res, next) {
        try {
            res.render('auth/register', { 
                layout: 'layouts/guest',
                title: 'Register', 
                message: 'Please Register before continue!' 
            });
        } catch (error) {
            next(error); 
        }
    }

    // Process Registration
    static async register(req, res, next) {
        try {
            const { name, email, password, password_confirmation } = req.body;
    
            // 1. Basic Validation
            if (password !== password_confirmation) {
                return res.render('auth/register', {
                    layout: 'layouts/guest',
                    title: 'Register',
                    errorMessage: 'Password confirmation does not match.',
                    oldData: { name, email }
                });
            }

            // 2. Direct SignUp via Supabase Auth
            // Removed User.findByEmail(email) to eliminate 1 round-trip latency.
            // Supabase will automatically return an error if email exists.
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: { 
                    data: { full_name: name } 
                }
            });
    
            if (error) {
                return res.render('auth/register', {
                    layout: 'layouts/guest',
                    title: 'Register',
                    errorMessage: error.message,
                    oldData: { name, email }
                });
            }
    
            res.render('auth/login', {
                layout: 'layouts/guest',
                title: 'Login',
                message: 'Registration successful! Please check your email for confirmation.'
            });
        } catch (error) {
            next(error);
        }
    }

    // Process Login
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // 1. Authenticate via Supabase Core
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                return res.render('auth/login', {
                    layout: 'layouts/guest',
                    title: 'Login',
                    errorMessage: error.message,
                    oldEmail: email
                });
            }

            // 2. Save Session to Cookie
            // Using httpOnly and secure flags for security
            res.cookie('fxd4_session', data.session.access_token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000 // 1 Hour
            });

            // Fast Redirect to Dashboard
            res.redirect('/dashboard');
        } catch (error) {
            next(error);
        }
    }

    // Process Logout (Instant Speed)
    static async logout(req, res, next) {
        try {
            // Trigger signOut but don't 'await' it to avoid blocking the response
            // The cookie clearing is what matters most for the client's state
            supabase.auth.signOut(); 
            
            res.clearCookie('fxd4_session'); 
            res.redirect('/login');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;