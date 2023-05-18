'use strict';

let canvasElem = document.getElementById('chart')



/* TODO:
 * - Instantiate a new AppState
 * - Use a method on that AppState to load vote data from localStorage.
 * - Create a data object for chart.js using your AppState's allProducts array.
 * - Combine the data object with configuration information for chart.js type, colors, etc
 * - Call chart.js with the configuration and the canvasElem
 *
 */

let state = new AppState();
state.loadItems();

function renderChart() {

  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i=0; i < state.allProducts.length; i++){
    productNames.push(state.allProducts[i].name);
    productVotes.push(state.allProducts[i].timesClicked);
    productViews.push(state.allProducts[i].timesShown);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        borderWidth: 3,
        borderColor: '#8b008b',
        backgroundColor: 'rgb(204, 153, 255)'
      },
      {
        label: '# of Votes',
        data: productVotes,
        borderWidth: 3,
        borderColor: 'rgb(204, 85, 0)',
        backgroundColor: 'rgb(255, 204, 153)'
      }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          enabled: true,
          mode: 'nearest',
          backgroundColor: 'rgb(0, 0, 139)',


        },
        title: {
          display: true,
          text: 'Odd Duck Product Voting Results'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          display: true,
          text: 'Votes'
        },
        x: {
          text: 'Product Name',
          display: true
        }
      }
    }
  };
  new Chart(canvasElem, chartObj);
}

renderChart();
