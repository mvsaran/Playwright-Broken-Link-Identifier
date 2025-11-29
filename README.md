# Playwright Broken Link Identifier

A Playwright-based automated testing solution that identifies, highlights, and captures screenshots of broken links on web pages.

## 🎯 Overview

This project provides an automated way to detect broken links on websites using Playwright. It visually highlights broken links in red with a pulsing animation and captures screenshots for documentation purposes.

## ✨ Features

- **Automated Link Detection**: Scans all links on a webpage
- **HTTP Status Validation**: Checks each link's HTTP response status
- **Visual Highlighting**: Highlights broken links in red with pulsing animation
- **Screenshot Capture**: Automatically captures screenshots of pages with broken links
- **Headed Mode**: Runs in visible browser mode for real-time observation
- **Detailed Reporting**: Provides console logs with comprehensive test results

## 🚀 What We Accomplished

### 1. Broken Link Detection
- Extracts all unique HTTP/HTTPS links from the target webpage
- Validates each link by sending HTTP requests
- Identifies links returning status codes ≥ 400 or connection errors

### 2. Visual Feedback
- **Red Background**: Broken links are highlighted with a red background
- **White Text**: Link text turns white for better contrast
- **Dark Red Border**: 3px solid dark red border around broken links
- **Pulsing Animation**: Animated effect to draw attention
- **Auto-Scroll**: Automatically scrolls to the first broken link

### 3. Screenshot Documentation
- Captures screenshots showing highlighted broken links
- Saves screenshots as `broken-link-screenshot.png`
- Provides visual proof of broken links for reporting

### 4. Test Results
When tested on `https://www.redbus.in`:
- **Total Links Checked**: 177
- **Broken Links Found**: 1
- **Broken Link**: `https://www.facebook.com/redbus.in/` (Status: 400)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone or navigate to the project directory:
```bash
cd AIBROKENLINK
```

2. Install dependencies:
```bash
npm install
```

## 📦 Dependencies

- `playwright`: ^1.57.0
- `@playwright/test`: ^1.57.0

## 🎮 Usage

Run the broken link checker test:

```bash
npx playwright test check_links.spec.js
```

### Configuration

The test is configured in `playwright.config.js`:
- **Timeout**: 5 minutes (300,000ms)
- **Browser**: Chrome (headed mode)
- **HTTPS Errors**: Ignored
- **HTTP2**: Disabled for compatibility

## 📁 Project Structure

```
AIBROKENLINK/
├── check_links.spec.js          # Main test file
├── playwright.config.js         # Playwright configuration
├── package.json                 # Project dependencies
├── broken-link-screenshot.png   # Generated screenshot
└── README.md                    # This file
```

## 🔍 How It Works

1. **Navigate to Target URL**: Opens the specified website
2. **Extract Links**: Collects all anchor tags and extracts href attributes
3. **Filter Links**: Filters for valid HTTP/HTTPS links
4. **Validate Links**: Sends HTTP requests to each unique link
5. **Identify Broken Links**: Marks links with status ≥ 400 as broken
6. **Highlight on Page**: Injects CSS to visually highlight broken links
7. **Capture Screenshot**: Takes a screenshot of the page with highlights
8. **Generate Report**: Outputs summary to console

## 📊 Test Output

```
=== Test Summary ===
Total links checked: 177
Broken links found: 1
Screenshot saved: broken-link-screenshot.png
===================
```

## 🎨 Visual Highlighting CSS

Broken links are styled with:
```css
.broken-link-highlight {
  background-color: red !important;
  color: white !important;
  border: 3px solid darkred !important;
  padding: 5px !important;
  animation: pulse 1s infinite !important;
}
```

## ✅ Test Behavior

- **Passes**: The test passes even when broken links are found
- **Purpose**: Identifies and documents broken links without failing the test suite
- **Output**: Provides detailed console logs and visual screenshots

## 🔧 Customization

### Change Target URL
Edit `check_links.spec.js` line 12:
```javascript
await page.goto('https://your-website.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
```

### Adjust Screenshot Settings
Modify screenshot options in `check_links.spec.js`:
```javascript
await page.screenshot({ 
  path: 'custom-screenshot-name.png', 
  fullPage: true  // Capture full page
});
```

### Change Highlight Color
Update the CSS in the `page.evaluate()` section to customize colors.

## 🐛 Troubleshooting

### HTTP2 Protocol Errors
The configuration disables HTTP2 to avoid protocol errors. If issues persist, check your network settings.

### Timeout Issues
Increase the timeout in `playwright.config.js` if checking many links:
```javascript
timeout: 600000, // 10 minutes
```

## 📝 License

ISC

## 👥 Author

Created with Playwright Test Framework

---

**Note**: This tool is designed for testing and quality assurance purposes. Always respect website terms of service and robots.txt when scanning external sites.
