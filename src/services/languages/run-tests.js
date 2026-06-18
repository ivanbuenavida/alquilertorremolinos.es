import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const languagesDir = __dirname;
const tempOutputDir = path.join(languagesDir, 'temp_build');

console.log('--- Translation Unit Tests ---');
console.log('Compiling translation files to Javascript...');

// 1. Compile translation TS files to CommonJS/ESM JS in temp_build directory
try {
  if (fs.existsSync(tempOutputDir)) {
    fs.rmSync(tempOutputDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempOutputDir);

  // Get exact TS files in the directory to avoid shell wildcard expansion issues
  const tsFiles = fs.readdirSync(languagesDir)
    .filter(f => f.startsWith('translation-') && f.endsWith('.ts'))
    .map(f => `"${path.join(languagesDir, f)}"`)
    .join(' ');

  // Run tsc to compile all translation files to the temp directory
  execSync(
    `npx tsc ${tsFiles} --target ES2022 --module ESNext --moduleResolution Node --outDir "${tempOutputDir}" --skipLibCheck --noEmitOnError false`,
    { stdio: 'pipe' }
  );
  console.log('Compilation completed successfully.');
} catch (error) {
  console.error('Error during TS compilation:', error.message);
  process.exit(1);
}

// 2. Load compiled JS files
async function runTests() {
  let searchDir = tempOutputDir;
  if (fs.existsSync(path.join(tempOutputDir, 'languages'))) {
    searchDir = path.join(tempOutputDir, 'languages');
  }

  const files = fs.readdirSync(searchDir).filter(f => f.startsWith('translation-') && f.endsWith('.js'));
  
  if (files.length === 0) {
    console.error('No compiled translation modules found.');
    cleanUp();
    process.exit(1);
  }

  console.log(`Found ${files.length} translation files to test.`);

  // Load English as the base reference
  const englishFile = files.find(f => f === 'translation-en.js');
  if (!englishFile) {
    console.error('Base English translation file (translation-en.js) not found.');
    cleanUp();
    process.exit(1);
  }

  let englishModule;
  try {
    englishModule = await import(path.join(searchDir, englishFile));
  } catch (err) {
    console.error('Failed to load English translation module:', err);
    cleanUp();
    process.exit(1);
  }

  const baseLabels = englishModule.labels;
  const baseKeys = Object.keys(baseLabels);
  console.log(`Base English labels count: ${baseKeys.length}`);

  let failed = false;

  for (const file of files) {
    if (file === 'translation-en.js') continue;

    console.log(`Testing ${file}...`);
    let mod;
    try {
      mod = await import(path.join(searchDir, file));
    } catch (err) {
      console.error(`  [FAIL] Failed to load module ${file}:`, err.message);
      failed = true;
      continue;
    }

    // Check basic exports
    if (!mod.code || typeof mod.code !== 'string') {
      console.error(`  [FAIL] Module ${file} is missing 'code' export.`);
      failed = true;
    }
    if (!mod.name || typeof mod.name !== 'string') {
      console.error(`  [FAIL] Module ${file} is missing 'name' export.`);
      failed = true;
    }
    if (!mod.flag || typeof mod.flag !== 'string') {
      console.error(`  [FAIL] Module ${file} is missing 'flag' export.`);
      failed = true;
    }
    if (!mod.labels || typeof mod.labels !== 'object') {
      console.error(`  [FAIL] Module ${file} is missing 'labels' export.`);
      failed = true;
      continue;
    }

    const currentLabels = mod.labels;
    const currentKeys = Object.keys(currentLabels);

    // Find missing keys
    const missingKeys = baseKeys.filter(k => !currentKeys.includes(k));
    if (missingKeys.length > 0) {
      console.error(`  [FAIL] Missing translation keys in ${file}:`, missingKeys);
      failed = true;
    }

    // Find extra keys (which are not in English)
    const extraKeys = currentKeys.filter(k => !baseKeys.includes(k));
    if (extraKeys.length > 0) {
      console.error(`  [WARNING] Extra translation keys in ${file}:`, extraKeys);
    }

    // Validate type matching (string vs function)
    for (const key of baseKeys) {
      if (currentLabels[key]) {
        const baseType = typeof baseLabels[key];
        const currentType = typeof currentLabels[key];
        if (baseType !== currentType) {
          console.error(`  [FAIL] Type mismatch for key "${key}" in ${file}: expected ${baseType}, got ${currentType}`);
          failed = true;
        }
      }
    }

    if (!failed) {
      console.log(`  [PASS] All keys and types match English.`);
    }
  }

  cleanUp();

  if (failed) {
    console.error('\n--- TESTS FAILED ---');
    process.exit(1);
  } else {
    console.log('\n--- ALL TESTS PASSED ---');
    process.exit(0);
  }
}

function cleanUp() {
  console.log('Cleaning up temporary build files...');
  if (fs.existsSync(tempOutputDir)) {
    fs.rmSync(tempOutputDir, { recursive: true, force: true });
  }
}

runTests().catch(err => {
  console.error('Unhandled rejection during tests:', err);
  cleanUp();
  process.exit(1);
});
