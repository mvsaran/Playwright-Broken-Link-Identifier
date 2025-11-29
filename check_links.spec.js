const { test, expect } = require('@playwright/test');

test('Check for broken links on redbus.in', async ({ page }) => {
    console.log('Starting broken link checker test for redbus.in...');

    // Use a real user agent to avoid being blocked
    await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });

    try {
        await page.goto('https://www.redbus.in', { waitUntil: 'domcontentloaded', timeout: 60000 });
    } catch (e) {
        console.error('Failed to load the main page:', e.message);
        throw e;
    }

    const links = await page.$$eval('a', anchors => anchors.map(a => a.href));
    const uniqueLinks = [...new Set(links)].filter(link => link.startsWith('http'));

    console.log(`Found ${uniqueLinks.length} unique links to check.`);

    const brokenLinks = [];

    for (const link of uniqueLinks) {
        try {
            const response = await page.request.get(link);
            const status = response.status();

            if (status >= 400) {
                console.log(`Broken link found: ${link} (Status: ${status})`);
                brokenLinks.push({ link, status });
            }
        } catch (e) {
            console.log(`Error checking link: ${link} (${e.message})`);
            brokenLinks.push({ link, error: e.message });
        }
    }

    if (brokenLinks.length > 0) {
        console.log('Broken links found:', brokenLinks);

        // Highlight broken links in red on the page
        await page.evaluate((brokenLinksList) => {
            // Add CSS for highlighting
            const style = document.createElement('style');
            style.textContent = `
        .broken-link-highlight {
          background-color: red !important;
          color: white !important;
          border: 3px solid darkred !important;
          padding: 5px !important;
          animation: pulse 1s infinite !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `;
            document.head.appendChild(style);

            // Highlight each broken link
            brokenLinksList.forEach(brokenLink => {
                const links = document.querySelectorAll('a');
                links.forEach(link => {
                    if (link.href === brokenLink.link) {
                        link.classList.add('broken-link-highlight');
                        link.title = `BROKEN LINK - Status: ${brokenLink.status || 'Error'}`;

                        // Scroll to the first broken link
                        if (brokenLinksList.indexOf(brokenLink) === 0) {
                            link.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                });
            });
        }, brokenLinks);

        // Wait to show the highlighted links
        await page.waitForTimeout(2000);

        // Take screenshot of the broken link
        await page.screenshot({
            path: 'broken-link-screenshot.png',
            fullPage: false
        });
        console.log('Screenshot saved as broken-link-screenshot.png');

        // Wait a bit more to show the highlighted link
        await page.waitForTimeout(3000);
    } else {
        console.log('No broken links found.');
    }

    // Log summary
    console.log(`\n=== Test Summary ===`);
    console.log(`Total links checked: ${uniqueLinks.length}`);
    console.log(`Broken links found: ${brokenLinks.length}`);
    if (brokenLinks.length > 0) {
        console.log(`Screenshot saved: broken-link-screenshot.png`);
    }
    console.log(`===================\n`);
});
