const fs = require('fs');
const path = require('path');
const https = require('https');
const readline = require('readline');
const unzipper = require('unzipper');

const assetsDir = path.join(__dirname, '..', 'fontnotawesome-assets');
const assetsUrl = 'https://fontnotawesome.tlmreact.dev/fontnotawesome-assets.zip';
const zipPath = path.join(__dirname, '..', 'fontnotawesome-assets.zip');

function progressBar(progress) {
    const width = 30;
    const filled = Math.round(progress * width);
    const empty = width - filled;
    const pct = Math.round(progress * 100);
    process.stdout.write('\r[' + '#'.repeat(filled) + '-'.repeat(empty) + `] ${pct}%`);
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: HTTP ${response.statusCode}`));
                return;
            }

            const total = parseInt(response.headers['content-length'] || '0', 10);
            let downloaded = 0;

            response.on('data', chunk => {
                downloaded += chunk.length;
                if (total > 0) progressBar(downloaded / total);
            });

            response.pipe(file);
            file.on('finish', () => {
                process.stdout.write('\n');
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

function extractZip(zipFile, extractTo) {
    return new Promise(async (resolve, reject) => {
        const tempDir = path.join(path.dirname(zipFile), 'temp-extract');

        try {
            if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
            fs.mkdirSync(tempDir, { recursive: true });

            fs.createReadStream(zipFile)
                .pipe(unzipper.Extract({ path: tempDir }))
                .on('close', () => {
                    try {
                        if (fs.existsSync(extractTo)) fs.rmSync(extractTo, { recursive: true, force: true });

                        const entries = fs.readdirSync(tempDir, { withFileTypes: true });

                        if (entries.length === 1 && entries[0].isDirectory()) {
                            fs.renameSync(path.join(tempDir, entries[0].name), extractTo);
                            fs.rmSync(tempDir, { recursive: true, force: true });
                        } else {
                            fs.renameSync(tempDir, extractTo);
                        }

                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                })
                .on('error', reject);
        } catch (err) {
            reject(err);
        }
    });
}

function askQuestion(question) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
        });
    });
}

async function main() {
    try {
        if (fs.existsSync(assetsDir)) {
            console.log('📁 fontnotawesome-assets folder found.');
            const shouldRedownload = await askQuestion('Do you want to redownload it? (y/n): ');
            if (!shouldRedownload) {
                console.log('✓ Using existing fontnotawesome-assets folder.');
                return;
            }
            console.log('Removing existing folder...');
            fs.rmSync(assetsDir, { recursive: true, force: true });
        }

        console.log('📥 Downloading fontnotawesome-assets...');
        await downloadFile(assetsUrl, zipPath);

        console.log('📦 Extracting...');
        await extractZip(zipPath, assetsDir);

        console.log('🧹 Cleaning up...');
        fs.unlinkSync(zipPath);

        console.log('✓ fontnotawesome-assets downloaded and extracted successfully!');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();
