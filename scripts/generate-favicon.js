import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'fs';
import path from 'path';

const inputSvg = path.join(process.cwd(), 'public', 'lokit-icon.svg');
const outputPng = path.join(process.cwd(), 'public', 'favicon.png');
const outputIco = path.join(process.cwd(), 'public', 'favicon.ico');

async function generateFavicon() {
    try {
        console.log('Generating PNG from SVG...');
        await sharp(inputSvg)
            .resize(48, 48)
            .png()
            .toFile(outputPng);

        console.log('Generating ICO from PNG...');
        const buf = await pngToIco(outputPng);
        fs.writeFileSync(outputIco, buf);

        // Clean up intermediate PNG if desired, or keep it. 
        // GSC likes having both.
        console.log('Favicon generation complete!');
    } catch (error) {
        console.error('Error generating favicon:', error);
        process.exit(1);
    }
}

generateFavicon();
