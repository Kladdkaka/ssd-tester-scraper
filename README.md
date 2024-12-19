# ssd-tester-scraper

## Description
ssd-tester-scraper is a scraper for https://ssd-tester.com/, a website that tests the performance of SSDs.
It outputs the data in JSON format, which can be used for further analysis locally or in a database.

All credit goes to the original website and its creators. This project is not affiliated with ssd-tester.com, use their affiliate links to support them.

## Installation
To install the ssd-tester-scraper, clone the repository and install the required dependencies:

```bash
git clone https://github.com/yourusername/ssd-tester-scraper.git
cd ssd-tester-scraper
bun install
```

## Usage
To run the scraper, use the following command:

```bash
bun src/index.ts
```

```
Options:
    -c, --country <country>  Set the country (default: us) (us, de, fr, it, es, pl)
    -f, --format <format>    Set the format (default: json) (json)
    -h, --help               Show help
```

You can also specify additional options:

```bash
bun src/index.ts --country us --format json > output.json
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
