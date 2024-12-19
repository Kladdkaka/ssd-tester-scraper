import { z } from 'zod';

export type Country = 'us' | 'de' | 'fr' | 'it' | 'es' | 'pl';

export const EntrySchema = z.object({
    score: z.number().nonnegative(),
    product: z.string().min(1),
    capacity: z.number().positive(),
    nand: z.string(),
    dram: z.boolean(),
    tbw: z.number().nonnegative(),
    interface: z.string().min(1),
    cache: z.number().nonnegative(),
    as_ssd_read: z.number().nonnegative(),
    as_ssd_write: z.number().nonnegative(),
    as_ssd_4k_read: z.number().nonnegative(),
    as_ssd_4k_write: z.number().nonnegative(),
    iops_4k_read: z.number().nonnegative(),
    iops_4k_write: z.number().nonnegative(),
    iops_read: z.number().nonnegative(),
    iops_write: z.number().nonnegative(),
    cdm_read: z.number().nonnegative(),
    cdm_write: z.number().nonnegative(),
    cdm_4k_read: z.number().nonnegative(),
    cdm_4k_write: z.number().nonnegative(),
    access_time_read: z.number().nonnegative(),
    access_time_write: z.number().nonnegative(),
    price: z.number().nonnegative(),
    price_gb: z.number().nonnegative(),
});

export type Entry = z.infer<typeof EntrySchema>;

const HEADER_MAPPING: Record<Country, Record<string, keyof Entry>> = {
    us: {
        Score: 'score',
        Product: 'product',
        Capacity: 'capacity',
        NAND: 'nand',
        DRAM: 'dram',
        TBW: 'tbw',
        Interface: 'interface',
        Cache: 'cache',
        'AS SSD Read': 'as_ssd_read',
        'AS SSD Write': 'as_ssd_write',
        'AS SSD 4K Read': 'as_ssd_4k_read',
        'AS SSD 4K Write': 'as_ssd_4k_write',
        'IOPS 4K Read': 'iops_4k_read',
        'IOPS 4K Write': 'iops_4k_write',
        'IOPS Read': 'iops_read',
        'IOPS Write': 'iops_write',
        'CDM Read': 'cdm_read',
        'CDM Write': 'cdm_write',
        'CDM 4K Read': 'cdm_4k_read',
        'CDM 4K Write': 'cdm_4k_write',
        'Access time Read': 'access_time_read',
        'Access time Write': 'access_time_write',
        Price: 'price',
        'Price/GB': 'price_gb',
    },
    de: {
    },
    fr: {
    },
    it: {
    },
    es: {
    },
    pl: {
    },
}

const HEADER_BLACKLIST: Record<Country, string[]> = {
    us: ['Image', 'Test', 'Shop'],
    de: ['Image', 'Test', 'Shop'],
    fr: ['Image', 'Test', 'Shop'],
    it: ['Image', 'Test', 'Shop'],
    es: ['Image', 'Test', 'Shop'],
    pl: ['Image', 'Test', 'Shop'],
}

type EntryMapper = (value: string) => Entry[keyof Entry];

// default mapper exists for all countries, but can be overridden by the specific country
const DEFAULT_MAPPER: Record<keyof Entry, EntryMapper> = {
    score: (value: string) => parseInt(value),
    product: (value: string) => value,
    capacity: (value: string) => parseInt(value.replace('&nbsp;GB', '')),
    nand: (value: string) => value,
    dram: (value: string) => value === '✓ Yes' ? true : value === 'No' ? false : (() => { throw new Error(`Invalid value for dram: ${value}`) })(),
    tbw: (value: string) => parseInt(value.replace('&nbsp;TB', '')),
    interface: (value: string) => value,
    cache: (value: string) => parseInt(value.replace(' GB', '').replace('>', '')),
    as_ssd_read: (value: string) => parseInt(value.replace('&nbsp;MB/s', '')),
    as_ssd_write: (value: string) => parseInt(value.replace('&nbsp;MB/s', '')),
    as_ssd_4k_read: (value: string) => parseInt(value.replace('&nbsp;MB/s', '')),
    as_ssd_4k_write: (value: string) => parseInt(value.replace('&nbsp;MB/s', '')),
    iops_4k_read: (value: string) => parseInt(value.replace('&nbsp;IOPS', '')),
    iops_4k_write: (value: string) => parseInt(value.replace('&nbsp;IOPS', '')),
    iops_read: (value: string) => parseInt(value.replace('&nbsp;IOPS', '')),
    iops_write: (value: string) => parseInt(value.replace('&nbsp;IOPS', '')),
    cdm_read: (value: string) => parseInt(value.replace('&nbsp;MB/s', '')),
    cdm_write: (value: string) => parseInt(value.replace('&nbsp;MB/s', '')),
    cdm_4k_read: (value: string) => parseInt(value.replace('&nbsp;MB/s', '')),
    cdm_4k_write: (value: string) => parseInt(value.replace('&nbsp;MB/s', '')),
    access_time_read: (value: string) => parseFloat(value.replace(',', '.').replace('&nbsp;ms', '')),
    access_time_write: (value: string) => parseFloat(value.replace(',', '.').replace('&nbsp;ms', '')),
    price: (value: string) => parseInt(value.replace('&nbsp;$', '')),
    price_gb: (value: string) => parseFloat(value.replace(',', '.').replace('&nbsp;$', '')),
}

const COUNTRY_SPECIFIC_MAPPERS: Record<Country, Partial<Record<keyof Entry, EntryMapper>>> = {
    us: {
    },
    de: {
    },
    fr: {
    },
    it: {
    },
    es: {
    },
    pl: {
    },
};

export function mapper(country: Country, key: keyof Entry): EntryMapper {
    return COUNTRY_SPECIFIC_MAPPERS[country]?.[key] ?? DEFAULT_MAPPER[key];
}

export { HEADER_MAPPING, HEADER_BLACKLIST };