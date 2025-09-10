import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateGermanWhitepaper() {
  try {
    console.log('Starting German whitepaper generation...');
    
    // Read the German HTML template
    const templatePath = path.join(process.cwd(), 'server', 'templates', 'whitepaper-german.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders
    const coverImagePath = path.join(process.cwd(), 'attached_assets', 'generated_images', 'Professional_whitepaper_cover_design_e5d7badf.png');
    const coverImageUrl = `file://${coverImagePath}`;
    const currentDate = new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });
    
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
    
    console.log('Generating German PDF...');
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
    
    // Save PDF to attached_assets for download
    const outputPath = path.join(process.cwd(), 'attached_assets', 'Body_Bagz_Whitepaper_German.pdf');
    fs.writeFileSync(outputPath, pdf);
    
    console.log(`✅ German whitepaper generated successfully: ${outputPath}`);
    console.log(`📄 File size: ${(pdf.length / 1024 / 1024).toFixed(2)} MB`);
    console.log('🇩🇪 Deutsche Version ist bereit zum Download!');
    
  } catch (error) {
    console.error('❌ Error generating German whitepaper:', error);
    process.exit(1);
  }
}

// Run the generator if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateGermanWhitepaper();
}

export { generateGermanWhitepaper };