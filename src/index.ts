import { parseArgs } from "util";
import { parseResponse } from "./parser";
import { normalize } from "./normalizer";
import type { Country } from "./utils";

const { values } = parseArgs({
    args: Bun.argv,
    options: {
        country: {
            type: 'string',
            short: 'c',
            default: 'us',
        },
        format: {
            type: 'string',
            short: 'f',
            default: 'json',
        },
        help: {
            type: 'boolean',
            short: 'h',
            default: false,
        }
    },
    strict: true,
    allowPositionals: true,
});

if (values.help) {
    console.log("Usage: bun index.ts [options]");
    console.log("Options:");
    console.log("  -c, --country <country>  Set the country (default: us) (us, de, fr, it, es, pl)");
    console.log("  -f, --format <format>    Set the format (default: json) (json)");
    console.log("  -h, --help               Show help");
    process.exit(0);
}

if (!['us', 'de', 'fr', 'it', 'es', 'pl'].includes(values.country as string)) {
    console.error("Invalid country, must be one of: us, de, fr, it, es, pl");
    process.exit(1);
}

const country = values.country as string as Country;
const format = values.format as string;

console.error(`Setting country to ${country} and format to ${format}`);

const url = `https://ssd-tester.${country === 'us' ? 'com' : country}/top_ssd.php`;

const response = await fetch(url);

if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
    process.exit(1);
}

const text = await response.text();

const { headers, rows } = parseResponse(new Response(text));
const entries = normalize(country, headers, rows);

if (format === 'json') {
    console.log(JSON.stringify(entries, null, 2));
}