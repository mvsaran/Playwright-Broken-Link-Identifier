// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './',
    timeout: 300000, // 5 minutes
    use: {
        headless: false,
        ignoreHTTPSErrors: true,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        channel: 'chrome',
        launchOptions: {
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-http2']
        },
    },
});
