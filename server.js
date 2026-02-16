/**
 * fxd4.js Entry Point
 * Authentically built by Ketut Dana
 */
try {
    // Mencoba memanggil engine core
    const { startServer } = require('./core/app/Server');
    
    // Jalankan server
    startServer();

} catch (error) {
    // Jika error karena folder core tidak ada
    if (error.code === 'MODULE_NOT_FOUND' && error.message.includes('./core/app/Server')) {
        console.error('\x1b[31m%s\x1b[0m', '----------------------------------------------------------');
        console.error('\x1b[31m%s\x1b[0m', ' [fxd4 Error]: Core engine not found!');
        console.error('\x1b[31m%s\x1b[0m', ' Did you forget to run "node fx run:install"?');
        console.error('\x1b[31m%s\x1b[0m', '----------------------------------------------------------');
    } else {
        // Jika error lain, tetap tampilkan error aslinya
        console.error(error);
    }
    process.exit(1);
}