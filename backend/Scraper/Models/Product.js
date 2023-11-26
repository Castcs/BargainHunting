const Sortable = {
    compare: function (a,b) {}
}

class Product{

    constructor(Title, Price, URL) {
        this.title = Title;
        this.price = Price;
        this.url = URL;
    }

    static compare(a,b) {
        const priceA = parseFloat(a.price.replace(',','').replace('\n', '').replace('$',''));
        const priceB = parseFloat(b.price.replace(',','').replace('\n', '').replace('$',''));

        if (priceA < priceB) {
            return -1;
          } else if (priceA > priceB) {
            return 1;
          } else {
            return 0;
          }
    }
}

module.exports = Product;