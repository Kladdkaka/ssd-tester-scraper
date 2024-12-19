import { EntrySchema, HEADER_BLACKLIST, HEADER_MAPPING, mapper, type Country, type Entry } from "./utils";



export function normalize(country: Country, headers: string[], rows: string[][]): Entry[] {
    return rows.map((row, index) => {
        const entry: Record<string, any> = {};

        if (row.length !== headers.length) {
            throw new Error(`Row length mismatch: ${row.length} != ${headers.length}, index: ${index}, row: ${JSON.stringify(row)}, headers: ${JSON.stringify(headers)}`);
        }

        headers.forEach((header, index) => {
            if (HEADER_BLACKLIST[country].includes(header)) {
                return;
            }

            const key = HEADER_MAPPING[country][header];
            let value = row[index];

            entry[key] = mapper(country, key)(value);
        });

        return EntrySchema.parse(entry);
    });
}