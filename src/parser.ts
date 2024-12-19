/**
 * Parse the response from the server and extract the headers and rows from the table.
 * 
 * NOTE: Just using the HTMLRewriter API to parse the table to play around with it. No good reason to use it here instead of a proper parser.
 */
export function parseResponse(response: Response): { headers: string[], rows: string[][] } {
    const rewriter = new HTMLRewriter();

    const headers: string[] = [];
    const rows: string[][] = [];

    let row: string[] | null = null;
    let currentCell: string | null = null;

    let tableStarted = false;

    rewriter.on('table', {
        element(element) {
            tableStarted = true;

            element.onEndTag((tag) => {
                tableStarted = false;
            });
        }
    });

    rewriter.on('table > thead > tr *', {
        element(element) {
            if (!tableStarted) {
                throw new Error('Invalid state');
            }

            if (element.tagName === 'th') {
                currentCell = '';
                element.onEndTag((_) => {
                    if (currentCell === null) {
                        throw new Error('Invalid state');
                    }
                    headers.push(currentCell.trim());
                    currentCell = null;
                });
            } else if (element.tagName === 'br') {
                if (currentCell === null) {
                    throw new Error('No current cell');
                }

                currentCell += ' ';
            } else if (!['small'].includes(element.tagName)) {
                console.error(`Unexpected element in header: ${element.tagName}`);
            }
        },
        text(text) {
            if (!tableStarted || currentCell === null) {
                throw new Error('Invalid state');
            }
            currentCell += text.text;
        }
    });

    rewriter.on('table > tbody *', {
        element(element) {
            if (!tableStarted) {
                throw new Error('Invalid state');
            }

            if (element.tagName === 'tr') {
                row = [];
                element.onEndTag((_) => {
                    if (row === null) {
                        throw new Error('Invalid state');
                    }
                    rows.push(row);
                    row = null;
                });
            } else if (element.tagName === 'td') {
                currentCell = '';
                element.onEndTag((_) => {
                    if (row === null || currentCell === null) {
                        throw new Error('Invalid state');
                    }

                    row.push(currentCell.trim());
                    currentCell = null;
                });
            } else if (!['small', 'svg', 'path', 'img', 'a'].includes(element.tagName)) {
                console.error(`Unexpected element in header: ${element.tagName}`);
            }
        },
        text(text) {
            if (!tableStarted || currentCell === null) {
                throw new Error('Invalid state');
            }
            currentCell += text.text;
        }
    });

    rewriter.transform(response);

    return { headers, rows };
}