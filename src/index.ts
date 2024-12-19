import { parseArgs } from "util";
import { parseResponse } from "./parser";
import { normalize } from "./normalizer";
import { count } from "console";
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

const cacheFile = `.cache_${country}_${format}.txt`;

let content: string;
try {
    if (await Bun.file(cacheFile).exists()) {
        console.error("Using cached data");
        content = await Bun.file(cacheFile).text();
    } else {
        console.error("Downloading fresh data");
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        content = await response.text();
        await Bun.write(cacheFile, content);
    }
} catch (error) {
    console.error("Error fetching or reading data:", error);
    process.exit(1);
}




const { headers, rows } = parseResponse(new Response(content));
const entries = normalize(country, headers, rows);

if (format === 'json') {
    console.log(JSON.stringify(entries, null, 2));
}