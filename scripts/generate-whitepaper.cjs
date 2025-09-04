const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateWhitepaper() {
  try {
    console.log('Starting whitepaper generation...');
    
    // Read the HTML template
    const templatePath = path.join(process.cwd(), 'server', 'templates', 'whitepaper.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders
    const coverImagePath = path.join(process.cwd(), 'attached_assets', 'generated_images', 'Professional_whitepaper_cover_design_e5d7badf.png');
    const coverImageUrl = `file://${coverImagePath}`;
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    htmlContent = htmlContent.replace('{{COVER_IMAGE_URL}}', coverImageUrl);
    htmlContent = htmlContent.replace('{{DATE}}', currentDate);
    
    console.log('Launching browser...');
    
    // Launch puppeteer and generate PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding'
      ]
    });
    
    const page = await browser.newPage();
    console.log('Setting content...');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    console.log('Generating PDF...');
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1in',
        right: '1in',
        bottom: '1in',
        left: '1in'
      }
    });
    
    await browser.close();
    
    // Save PDF to filesystem
    const outputPath = path.join(process.cwd(), 'attached_assets', 'Body_Bagz_Whitepaper.pdf');
    fs.writeFileSync(outputPath, pdf);
    
    console.log(`✅ Whitepaper generated successfully: ${outputPath}`);
    console.log(`📄 File size: ${(pdf.length / 1024 / 1024).toFixed(2)} MB`);
    
  } catch (error) {
    console.error('❌ Error generating whitepaper:', error);
    process.exit(1);
  }
}

generateWhitepaper();