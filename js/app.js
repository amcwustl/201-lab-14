'use strict';

function AppState() {
  this.allProducts = [];
}

AppState.prototype.instantiateProducts = function () {

  const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

  for (let i = 0; i < productNames.length; i++) {
    if (productNames[i] === 'sweep') {
      this.allProducts.push(new Product(productNames[i], 'png'));
    } else {
      this.allProducts.push(new Product(productNames[i]));
    }
  }

}

AppState.prototype.saveToLocalStorage = function () {
  // TODO: Fill in this instance method to save product data to local storage
  let stringifiedProducts = JSON.stringify(this.allProducts);
  localStorage.setItem('myProducts', stringifiedProducts);
}

AppState.prototype.loadItems = function () {

  // TODO: Update this instance method to retrieve data from local storage instead of creating new Products on each page load
  let retrievedProducts = localStorage.getItem('myProducts');
  let parsedProducts = JSON.parse(retrievedProducts);

  if(retrievedProducts) {
    console.log(retrievedProducts);
    for (let i = 0; i < parsedProducts.length; i++) {
      if (parsedProducts[i].name === 'sweep'){
        let reconstructedProduct = new Product(parsedProducts[i].name, 'png');
        reconstructedProduct.timesClicked = parsedProducts[i].timesClicked;
        reconstructedProduct.timesShown = parsedProducts[i].timesShown;
        this.allProducts.push(reconstructedProduct);
      } else {
        let reconstructedProduct = new Product(parsedProducts[i].name);
        reconstructedProduct.timesClicked = parsedProducts[i].timesClicked;
        reconstructedProduct.timesShown = parsedProducts[i].timesShown;
        this.allProducts.push(reconstructedProduct);
      }
      
  }  

  } else {
  this.instantiateProducts();
  }
}


function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.source = `assets/${name}.${fileExtension}`;
  this.timesClicked = 0;
  this.timesShown = 0;
}
