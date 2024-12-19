export type Country = 'us' | 'de' | 'fr' | 'it' | 'es' | 'pl';

export type Entry = {
    score: number;
    product: string;
    capacity: number;
    nand: string;
    dram: boolean;
    tbw: number;
    interface: string;
    cache: number;
    as_ssd_read: number;
    as_ssd_write: number;
    as_ssd_4k_read: number;
    as_ssd_4k_write: number;
    iops_4k_read: number;
    iops_4k_write: number;
    iops_read: number;
    iops_write: number;
    cdm_read: number;
    cdm_write: number;
    cdm_4k_read: number;
    cdm_4k_write: number;
    access_time_read: number;
    access_time_write: number;
    price: number;
    price_gb: number;
}

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

/*
example:
/*
  }, {
    score: "7009",
    product: "Patriot Viper VP4300 Lite 2TB",
    capacity: "2048&nbsp;GB",
    nand: "TLC",
    dram: "No",
    tbw: "1600&nbsp;TB",
    interface: "PCIe 4.0 x4",
    cache: "210 GB",
    as_ssd_read: "6170&nbsp;MB/s",
    as_ssd_write: "5750&nbsp;MB/s",
    as_ssd_4k_read: "69&nbsp;MB/s",
    as_ssd_4k_write: "174&nbsp;MB/s",
    iops_4k_read: "838.925&nbsp;IOPS",
    iops_4k_write: "531.789&nbsp;IOPS",
    iops_read: "7.093&nbsp;IOPS",
    iops_write: "6.358&nbsp;IOPS",
    cdm_read: "7438&nbsp;MB/s",
    cdm_write: "6667&nbsp;MB/s",
    cdm_4k_read: "77&nbsp;MB/s",
    cdm_4k_write: "178&nbsp;MB/s",
    access_time_read: "0,022&nbsp;ms",
    access_time_write: "0,265&nbsp;ms",
    price: "116&nbsp;$",
    price_gb: "0,06&nbsp;$",
  }, {
*/

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
    cache: (value: string) => parseInt(value.replace(' GB', '')),
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

function getMapper(country: Country, key: keyof Entry): EntryMapper {
    return COUNTRY_SPECIFIC_MAPPERS[country]?.[key] ?? DEFAULT_MAPPER[key];
}

export { HEADER_MAPPING, HEADER_BLACKLIST };