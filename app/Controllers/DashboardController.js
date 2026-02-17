const User = require('../Models/User');

/**
 * DashboardController - fxd4 Framework
 * Optimized for Fast eXecutable Delivery
 */
class DashboardController {
    /**
     * Dashboard Page
     */
    static async dashboard(process) {
        const userId = process.user?.id || process.user?.sub;
        const dbUser = await User.find(userId);

        process.render('dashboard', { 
            title: 'Dashboard', 
            description: 'Overview of your application and system status.',
            userData: {
                id: userId,
                email: process.user?.email,
                fullName: dbUser?.full_name || 'User',
            }
        });

        process.error;
    }

    /**
     * Edit Profile Page
     */
    static async editProfile(process) {
        const userId = process.user?.id || process.user?.sub;
        const dbUser = await User.find(userId);

        process.render('profile.edit', { 
            title: 'Edit Profile',
            description: 'Update your personal information.',
            userData: {
                id: userId,
                email: process.user?.email,
                fullName: dbUser?.full_name || 'User'
            }
        });

        process.error;
    }

    /**
     * Update Profile Action
     */
    static async updateProfile(process) {
        const { fullName } = process.body;
        const userId = process.user?.id || process.user?.sub;

        if (!userId) throw new Error("Unauthorized.");

        await User.update(userId, {
            full_name: fullName 
        });

        process.redirect('dashboard');
        process.error;
    }
}

module.exports = DashboardController;