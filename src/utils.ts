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
        Score: 'score',
        Produktbezeichnung: 'product',
        Speicher: 'capacity',
        NAND: 'nand',
        DRAM: 'dram',
        TBW: 'tbw',
        Controller: 'interface',
        Interface: 'interface',
        Cache: 'cache',
        'AS SSD Lesen': 'as_ssd_read',
        'AS SSD Schreiben': 'as_ssd_write',
        'AS SSD 4K Lesen': 'as_ssd_4k_read',
        'AS SSD 4K Schreiben': 'as_ssd_4k_write',
        'IOPS 4K Lesen': 'iops_4k_read',
        'IOPS 4K Schreiben': 'iops_4k_write',
        'IOPS Lesen': 'iops_read',
        'IOPS Schreiben': 'iops_write',
        'CDM Lesen': 'cdm_read',
        'CDM Schreiben': 'cdm_write',
        'CDM 4K Lesen': 'cdm_4k_read',
        'CDM 4K Schreiben': 'cdm_4k_write',
        'Zugriffszeit Lesen': 'access_time_read',
        'Zugriffszeit Schreiben': 'access_time_write',
        Preis: 'price',
        'Preis / GB': 'price_gb',
    },
    fr: {
        Score: 'score',
        'Nom du produit': 'product',
        Mémoire: 'capacity',
        NAND: 'nand',
        DRAM: 'dram',
        TBW: 'tbw',
        Interface: 'interface',
        'AS SSD Lire': 'as_ssd_read',
        'AS SSD Écrire': 'as_ssd_write',
        'AS SSD 4K Lire': 'as_ssd_4k_read',
        'AS SSD 4K Écrire': 'as_ssd_4k_write',
        'IOPS 4K Lire': 'iops_4k_read',
        'IOPS 4K Écrire': 'iops_4k_write',
        'IOPS Lire': 'iops_read',
        'IOPS Écrire': 'iops_write',
        'CDM Lire': 'cdm_read',
        'CDM Écrire': 'cdm_write',
        'CDM 4K Lire': 'cdm_4k_read',
        'CDM 4K Écrire': 'cdm_4k_write',
        'Temps  d\'accès Lire': 'access_time_read',
        'Temps  d\'accès Écrire': 'access_time_write',
        Prix: 'price',
        'Prix/Go': 'price_gb',
    },
    it: {
        Score: 'score',
        'Denominazione del prodotto': 'product',
        Memoria: 'capacity',
        NAND: 'nand',
        DRAM: 'dram',
        TBW: 'tbw',
        Interfaccia: 'interface',
        'AS SSD Leggi': 'as_ssd_read',
        'AS SSD Scrittura': 'as_ssd_write',
        'AS SSD 4K Leggi': 'as_ssd_4k_read',
        'AS SSD 4K Scrittura': 'as_ssd_4k_write',
        'IOPS 4K Leggi': 'iops_4k_read',
        'IOPS 4K Scrittura': 'iops_4k_write',
        'IOPS Leggi': 'iops_read',
        'IOPS Scrittura': 'iops_write',
        'CDM Leggi': 'cdm_read',
        'CDM Scrittura': 'cdm_write',
        'CDM 4K Leggi': 'cdm_4k_read',
        'CDM 4K Scrittura': 'cdm_4k_write',
        'Tempo di accesso Leggi': 'access_time_read',
        'Tempo di accesso Scrittura': 'access_time_write',
        Prezzo: 'price',
        'Prezzo / GB': 'price_gb',
    },
    es: {
        Puntos: 'score',
        'Denominación del producto': 'product',
        Memoria: 'capacity',
        NAND: 'nand',
        DRAM: 'dram',
        TBW: 'tbw',
        Interface: 'interface',
        'AS SSD Lectura': 'as_ssd_read',
        'AS SSD Escritura': 'as_ssd_write',
        'AS SSD 4K Lectura': 'as_ssd_4k_read',
        'AS SSD 4K Escritura': 'as_ssd_4k_write',
        'IOPS 4K Lesen': 'iops_4k_read',
        'IOPS 4K Escritura': 'iops_4k_write',
        'IOPS Lectura': 'iops_read',
        'IOPS Escritura': 'iops_write',
        'CDM Lectura': 'cdm_read',
        'CDM Escritura': 'cdm_write',
        'CDM 4K Lectura': 'cdm_4k_read',
        'CDM 4K Escritura': 'cdm_4k_write',
        'Tiempo de acceso Lectura': 'access_time_read',
        'Tiempo de accesoEscritura': 'access_time_write',
        Precio: 'price',
        'Precio / GB': 'price_gb',
    },
    pl: {
        Wynik: 'score',
        Produkt: 'product',
        Pojemność: 'capacity',
        NAND: 'nand',
        DRAM: 'dram',
        TBW: 'tbw',
        Interfejs: 'interface',
        'AS SSD Czytaj': 'as_ssd_read',
        'AS SSD Napisz': 'as_ssd_write',
        'AS SSD 4K Czytaj': 'as_ssd_4k_read',
        'AS SSD 4K Napisz': 'as_ssd_4k_write',
        'IOPS 4K Czytaj': 'iops_4k_read',
        'IOPS 4K Napisz': 'iops_4k_write',
        'IOPS Czytaj': 'iops_read',
        'IOPS Napisz': 'iops_write',
        'CDM Czytaj': 'cdm_read',
        'CDM Napisz': 'cdm_write',
        'CDM 4K Czytaj': 'cdm_4k_read',
        'CDM 4K Napisz': 'cdm_4k_write',
        'Access time Czytaj': 'access_time_read',
        'Access time Napisz': 'access_time_write',
        Price: 'price',
        'Price/GB': 'price_gb',
    },
}

const HEADER_BLACKLIST: Record<Country, string[]> = {
    us: ['Image', 'Test', 'Shop'],
    de: ['Bild', 'Test', 'Shop'],
    fr: ['Image', 'Test', 'Acheter'],
    it: ['Immagine', 'Test', 'Negozio'],
    es: ['Imagen', 'Prueba', 'Tienda'],
    pl: ['Obraz', 'Test', 'Shop'],
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
        dram: (value: string) => value === '✓ Ja' ? true : value === 'Nein' ? false : (() => { throw new Error(`Invalid value for dram: ${value}`) })(),
    },
    fr: {
        dram: (value: string) => value === '✓ Oui' ? true : value === 'Non' ? false : (() => { throw new Error(`Invalid value for dram: ${value}`) })(),
    },
    it: {
        dram: (value: string) => value === '✓ Ja' ? true : value === 'Nein' ? false : (() => { throw new Error(`Invalid value for dram: ${value}`) })(),
    },
    es: {
        dram: (value: string) => value === '✓ Sí' ? true : value === 'No' ? false : (() => { throw new Error(`Invalid value for dram: ${value}`) })(),
    },
    pl: {
        dram: (value: string) => value === '✓ Yes' ? true : value === 'No' ? false : (() => { throw new Error(`Invalid value for dram: ${value}`) })(),
    },
};

// lambda to fix country specific issues
export const COUNTRY_FIXES: Record<Country, (entry: Record<string, any>) => Record<string, any>> = {
    us: (entry) => entry,
    de: (entry) => entry,
    fr: (entry) => ({ cache: 0, ...entry }), // cache is missing in fr?
    it: (entry) => ({ cache: 0, ...entry }), // cache is missing in it?
    es: (entry) => ({ cache: 0, ...entry }), // cache is missing in es?
    pl: (entry) => ({ cache: 0, ...entry }), // cache is missing in pl?
}

export function mapper(country: Country, key: keyof Entry): EntryMapper {
    return COUNTRY_SPECIFIC_MAPPERS[country]?.[key] ?? DEFAULT_MAPPER[key] ?? (() => { throw new Error(`No mapper found for ${key}`) })();
}

export { HEADER_MAPPING, HEADER_BLACKLIST };