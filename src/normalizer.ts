import { COUNTRY_FIXES, EntrySchema, HEADER_BLACKLIST, HEADER_MAPPING, mapper, type Country, type Entry } from "./utils";



export function normalize(country: Country, headers: string[], rows: string[][]): Entry[] {
    console.error(`Normalizing data for ${country}, headers: ${headers.join(', ')}, rows: ${rows.length}`);
    return rows.map((row, index) => {
        const entry: Record<string, any> = {};

        if (row.length !== headers.length) {
            throw new Error(`Row length mismatch: ${row.length} != ${headers.length}, index: ${index}, row: ${JSON.stringify(row)}, headers: ${JSON.stringify(headers)}`);
        }

        headers.forEach((header, index) => {
            if (HEADER_BLACKLIST[country].includes(header)) {
                return;
            }

            const key = HEADER_MAPPING[country][header] ?? (() => { throw new Error(`No mapping found for ${header}`) })();
            let value = row[index];

            entry[key] = mapper(country, key)(value);
        });

        // safeparse
        const result = EntrySchema.safeParse(COUNTRY_FIXES[country](entry));
        if (!result.success) {
            console.error(`Error parsing entry: ${JSON.stringify(entry, null, 2)}`);
            console.error(result.error.format());
            process.exit(1);
        }

        return result.data;
    });
}