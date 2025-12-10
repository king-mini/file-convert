import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'fs';
import path from 'path';

const inputSvg = path.join(process.cwd(), 'public', 'lokit-icon.svg');
const outputIco = path.join(process.cwd(), 'public', 'favicon.ico');
const sizes = [32, 48, 64];

async function generateFavicon() {
    try {
        console.log('Generating PNGs from SVG...');
        const tempFiles = [];

        for (const size of sizes) {
            const fileName = `favicon-${size}.png`;
            const filePath = path.join(process.cwd(), 'public', fileName);
            await sharp(inputSvg)
                .resize(size, size)
                .png()
                .toFile(filePath);
            tempFiles.push(filePath);
            console.log(`Generated ${size}x${size} PNG`);
        }

        console.log('Generating multi-size ICO...');
        const buf = await pngToIco(tempFiles);
        fs.writeFileSync(outputIco, buf);

        // Keep 48x48 as favicon.png for the link tag
        const favPngPath = path.join(process.cwd(), 'public', 'favicon.png');
        fs.copyFileSync(path.join(process.cwd(), 'public', 'favicon-48.png'), favPngPath);

        // Clean up temp files
        for (const file of tempFiles) {
            fs.unlinkSync(file);
        }

        console.log('Favicon generation complete!');
    } catch (error) {
        console.error('Error generating favicon:', error);
        process.exit(1);
    }
}

generateFavicon();
