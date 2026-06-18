const fs = require('fs');
const path = require('path');

const dir = '/Users/ivanbenavides/Documents/projects/alquilertorremolinos.es/src/services/languages';

const replacements = {
  'es': {
    would_like: '"me gustaría reservar el alojamiento"',
    interest: '"estoy interesado en el alojamiento"'
  },
  'en': {
    would_like: '"I would like to book the accommodation"',
    interest: '"I am interested in the accommodation"'
  },
  'de': {
    would_like: '"ich möchte die Unterkunft buchen"',
    interest: '"ich bin an der Unterkunft interessiert"'
  },
  'fr': {
    would_like: '"je souhaiterais réserver l\'hébergement"',
    interest: '"je suis intéressé par l\'hébergement"'
  },
  'it': {
    would_like: '"vorrei prenotare l\'alloggio"',
    interest: '"sono interessato all\'alloggio"'
  },
  'pt': {
    would_like: '"gostaria de reservar o alojamento"',
    interest: '"estou interessado no alojamento"'
  },
  'nl': {
    would_like: '"ik zou graag de accommodatie willen boeken"',
    interest: '"ik ben geïnteresseerd in de accommodatie"'
  },
  'sv': {
    would_like: '"jag skulle vilja boka boendet"',
    interest: '"jag är intresserad av boendet"'
  },
  'zh': {
    would_like: '"我想预订房源："',
    interest: '"我想咨询房源："'
  }
};

for (const [lang, vals] of Object.entries(replacements)) {
  const file = path.join(dir, `translation-${lang}.ts`);
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(/wa_would_like:\s*".*?",/, `wa_would_like: ${vals.would_like},`);
  content = content.replace(/wa_interest:\s*".*?",/, `wa_interest: ${vals.interest},`);
  
  fs.writeFileSync(file, content);
}
console.log('Done!');
