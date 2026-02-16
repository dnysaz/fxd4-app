const { execSync } = require('child_process');
const readline = require('readline');

/**
 * fxd4.js Entry Point
 * Authentically built by Ketut Dana
 */
try {
    const { startServer } = require('./core/app/Server');
    startServer();

} catch (error) {
    if (error.code === 'MODULE_NOT_FOUND' && error.message.includes('./core/app/Server')) {
        console.error('\x1b[31m%s\x1b[0m', '----------------------------------------------------------');
        console.error('\x1b[31m%s\x1b[0m', ' [fxd4 Error]: Core engine not found!');
        console.error('\x1b[31m%s\x1b[0m', '----------------------------------------------------------');

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Would you like to run "fx run:install" now? (y/n): ', (answer) => {
            if (answer.toLowerCase() === 'y') {
                try {
                    console.log('fxd4: Starting installation...');
                    // Menjalankan fx.js langsung dari sini
                    execSync('node fx.js run:install', { stdio: 'inherit' });
                    console.log('\x1b[32m%s\x1b[0m', 'fxd4: Core installed. Please restart the server.');
                } catch (installError) {
                    console.error('fxd4: Installation failed. Please run it manually.');
                }
            } else {
                console.log('fxd4: Manual installation required to start the server.');
            }
            rl.close();
            process.exit(1);
        });
    } else {
        console.error(error);
        process.exit(1);
    }
}