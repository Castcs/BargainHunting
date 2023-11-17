const Amazon = require('./Amazon');
const Ebay = require('./Ebay');
const Product = require('./Product');

var amazon = new Amazon();
var ebay = new Ebay();

const searchTerm = "Macbook Pro 2022";

async function fetchAmazonData() {
    return await amazon.executeSearch(searchTerm);
}

async function fetchEbayData() {
    return await ebay.executeSearch(searchTerm);
}

async function fetchData() {
    try {
      const [ebayProducts, amazonProducts] = await Promise.all([
        fetchEbayData(),
        fetchAmazonData(),
      ]);
  
      const combinedResults = ebayProducts.concat(amazonProducts).sort(Product.compare);
      console.log("Length:" + combinedResults.length)
      
      // Now you can do something with the combined results
      console.log('Combined Results:', combinedResults);
      
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Call the main function to fetch data from both eBay and Amazon
  fetchData();

