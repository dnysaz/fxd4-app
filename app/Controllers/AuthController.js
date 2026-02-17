const supabase = require('../../core/config/Database');
const User = require('../Models/User');

/**
 * AuthController - fxd4 Framework
 * Simplified with Process Object & Named Routes
 */
class AuthController {
    
    // Display Login Page
    static async loginPage(process) {
        process.render('auth.login', { 
            layout: 'layouts.guest',
            title: 'Login', 
            message: 'Please Login before continue!' 
        });
        process.error;
    }

    // Display Register Page
    static async registerPage(process) {
        process.render('auth.register', { 
            layout: 'layouts.guest',
            title: 'Register', 
            message: 'Please Register before continue!' 
        });
        process.error;
    }

    // Process Registration
    static async register(process) {
        const { name, email, password, password_confirmation } = process.body;

        // 1. Basic Validation
        if (password !== password_confirmation) {
            return process.render('auth.register', {
                layout: 'layouts.guest',
                title: 'Register',
                errorMessage: 'Password confirmation does not match.',
                oldData: { name, email }
            });
        }

        // 2. Supabase Auth SignUp
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: name } }
        });

        if (error) {
            return process.render('auth.register', {
                layout: 'layouts.guest',
                title: 'Register',
                errorMessage: error.message,
                oldData: { name, email }
            });
        }

        process.render('auth.login', {
            layout: 'layouts.guest',
            title: 'Login',
            message: 'Registration successful! Please check your email for confirmation.'
        });
        process.error;
    }

    // Process Login
    static async login(process) {
        const { email, password } = process.body;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return process.render('auth.login', {
                layout: 'layouts.guest',
                title: 'Login',
                errorMessage: error.message,
                oldEmail: email
            });
        }

        // PERBAIKAN: Gunakan global.process untuk mengakses environment variables
        const isProduction = global.process.env.NODE_ENV === 'production';

        // Save Session to Cookie (via process.res for direct cookie access)
        process.res.cookie('fxd4_session', data.session.access_token, {
            httpOnly: true, 
            secure: isProduction,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000 
        });

        // Fast Redirect using Route Name
        process.redirect('dashboard');
        process.error;
    }

    // Process Logout
    static async logout(process) {
        // Sign out from Supabase
        await supabase.auth.signOut(); 
        
        process.res.clearCookie('fxd4_session'); 
        process.redirect('login');
        process.error;
    }
}

module.exports = AuthController;