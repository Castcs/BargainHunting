const puppeteer = require("puppeteer");
const Product = require('./Product');

class Amazon {

    constructor() {}

    async executeSearch(searchTerm) {
        let productObjects = [];
        
        //Launch puppeteer
        const browser = await puppeteer.launch({
            //use "new" to launch headless, or false (without quotes) to test and watch page navigation take place.
            headless: "new",
        });

        const page = await browser.newPage();

        // Navigate to the e-commerce website
        await page.goto('http://www.amazon.com', {timeout: 60000, waitUntil: 'domcontentloaded' });
        
        // locates the search bar on the page
        const searchInputSelector = await page.$x('/html/body/div[1]/header/div/div[1]/div[2]/div/form/div[2]/div[1]/input'); 
        // locates the button to initiate search entered into search bar
        const searchButtonSelector = await page.$x('/html/body/div[1]/header/div/div[1]/div[2]/div/form/div[3]/div/span/input');
        
        if (searchInputSelector) {
            // Types the search query into the search bar
            let attempts = 0;
            while(attempts < 6) {
                try {
                    await searchInputSelector[0].type(searchTerm.toLowerCase());
                    //clicks the "Go" button to initiate search on page.
                    await searchButtonSelector[0].click();
                    break;
                }
                catch {
                    console.log("Attempt Failed");
                    attempts = attempts + 1;
                }
            }
        }
        
        // waits for the page to load
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 });

        //Iterates for 5 pages of search results.
        for(var i = 0; i < 5; i++){

            //Locates the "next page" button
            var elements = await page.$$('[aria-label*="Go to next page"]');
            
            // Extract information from the search results
            // Everything within the evalute function call is run in the context of the browser and not within the context of Node.
            const results = await page.evaluate((searchTerm) => {
                
                // Function has to be defined within the evaluate call to be able to apply within the browser context.
                // Function to verify that the title for the product contains some of the words from the search query.
                function containsSomeWords(inputString, wordList) {
                    return wordList.some(word => inputString.includes(word));
                }

                // Grabs each of the items on the page after search query executed
                const productCards = document.querySelectorAll('.sg-col-inner');

                // Temp variables to hold items that meet criteria
                var products = [];
                
                // Iterates through each product...
                productCards.forEach((productCard) => {
                    try {
                        const title = productCard.querySelector('.a-size-medium, .a-color-base, .a-text-normal').innerText;
                        const price = productCard.querySelector('.a-price-whole').innerText.replace('\n','') + productCard.querySelector('.a-price-fraction').innerText ;
                        const url = productCard.querySelector('.a-link-normal').getAttribute('href');
                        
                        
                        if(title != null && title != 'Sponsored' && price != null && containsSomeWords(title.toLowerCase(), searchTerm.split(' ')))
                        products.push({title, price, url});
                    }
                
                    catch {  }
                
                });
                
                return products;
                
            // SearchTerm is passed into the evaluate function. Has to be done this way as search term is defined in node context.
            // and evaluate() is browser context.
            }, searchTerm.toLowerCase());

            // Maps the products found in evaluate() context to new Product objects.
            const iterationProductObjects = results.map(({ title, price, url }) => new Product(title, price, url));
            
            // Some product urls are incomplete, if so append beginning URL
            iterationProductObjects.forEach(product => {
                if (product.url[0] == "/") product.url = "http://amazon.com" + product.url;
            });

            // aggregate products found on this page to the global list before moving to next page.
            productObjects = productObjects.concat(iterationProductObjects);

            // Click the next page button
            await elements[0].click();

            // Wait for the page to load and find where the new next page button is.
            await page.waitForSelector('[aria-label*="Go to next page"]', { waitUntil: 'domcontentloaded', timeout: 30000 });
        }   

        // Close the browser
        await browser.close();

        return productObjects;
    }
}

module.exports = Amazon;