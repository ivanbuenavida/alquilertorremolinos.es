const fs = require('fs');
const path = require('path');

const dir = '/Users/ivanbenavides/Documents/projects/alquilertorremolinos.es/src/services/languages';

const translations = {
  'es': { from: '"desde el día"', to: '"hasta el día"' },
  'en': { from: '"from"', to: '"to"' },
  'de': { from: '"vom"', to: '"bis zum"' },
  'fr': { from: '"du"', to: '"au"' },
  'it': { from: '"dal"', to: '"al"' },
  'pt': { from: '"do dia"', to: '"até o dia"' },
  'nl': { from: '"van"', to: '"tot"' },
  'sv': { from: '"från"', to: '"till"' },
  'zh': { from: '"从"', to: '"至"' }
};

for (const [lang, vals] of Object.entries(translations)) {
  const file = path.join(dir, `translation-${lang}.ts`);
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace wa_date_to and insert wa_date_from
  // Previous: wa_date_to: "...",
  content = content.replace(/wa_date_to:\s*".*?",/, `wa_date_from: ${vals.from},\n  wa_date_to: ${vals.to},`);
  
  fs.writeFileSync(file, content);
}

// Update translation-service.ts
const serviceFile = '/Users/ivanbenavides/Documents/projects/alquilertorremolinos.es/src/services/translation-service.ts';
let serviceContent = fs.readFileSync(serviceFile, 'utf8');
serviceContent = serviceContent.replace(/wa_date_to:\s*string;/, `wa_date_from: string;\n  wa_date_to: string;`);
fs.writeFileSync(serviceFile, serviceContent);

console.log('Translations updated.');
