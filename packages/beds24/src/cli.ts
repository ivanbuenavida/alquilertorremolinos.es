import { Beds24Client } from './client.js';
import { loadBeds24Config } from './config.js';

function getArg(args: string[], flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index === -1 || index + 1 >= args.length) return undefined;
  return args[index + 1];
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] ?? 'status';
  const propertyId = getArg(args, '--property') ?? process.env.BEDS24_DEFAULT_PROPERTY_ID ?? 'torremolinos-centro';
  const from = getArg(args, '--from');
  const to = getArg(args, '--to');

  const config = loadBeds24Config();
  const client = new Beds24Client(config);

  if (command === 'status') {
    const result = await client.healthCheck();
    console.log(JSON.stringify({ provider: client.providerName, ...result, configuredProperties: Object.keys(config.roomMap) }, null, 2));
    process.exit(result.ok ? 0 : 1);
  }

  if (command === 'rates') {
    if (!from || !to) {
      console.error('Usage: beds24 cli rates --from YYYY-MM-DD --to YYYY-MM-DD [--property id]');
      process.exit(1);
    }
    const rates = await client.getDailyRates(propertyId, { from, to });
    console.log(JSON.stringify(rates, null, 2));
    return;
  }

  if (command === 'bookings') {
    if (!from || !to) {
      console.error('Usage: beds24 cli bookings --from YYYY-MM-DD --to YYYY-MM-DD [--property id]');
      process.exit(1);
    }
    const bookings = await client.getBookings(propertyId, { from, to });
    console.log(JSON.stringify(bookings, null, 2));
    return;
  }

  console.error(`Unknown command: "${command}". Supported commands: status, rates, bookings.`);
  process.exit(1);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
