// Embed the map showing all species without filtering
let mapView;  // Declare a variable to hold the Vega view instance
let mapData;  // Store data for filtering later

// Embed the bar chart for population data over time
let populationBarChartView;
let barChartData;  // Declare a variable to store the bar chart data
let dropdown;

function loadMapVisualization() {
    return vegaEmbed("#map-visualization", mapSpec).then(mapResult => {
      mapView = mapResult.view;  // Store the view instance for later use
      mapData = mapResult.view.data('records');
    });
}
  
function populationBarChart() {
    return vegaEmbed("#population-bar-chart", barChartSpec).then(barChartResult => {
      populationBarChartView = barChartResult.view;
      barChartData = barChartResult.view.data('records');  // Store the original bar chart data for filtering later
      dropdown = document.querySelector('select[name="specific_species"]');
      dropdown.parentElement.style.display = 'none';
    });
}
  
function totalPopulationBarChart() {
    return vegaEmbed("#total-population-bar-chart", totalPopulationBarChartSpec);
}
  
function loadTreeDiagram() {
    return vegaEmbed("#tree-diagram", treeSpec).then(result => {
      result.view.addSignalListener("selected_species", (name, value) => {
        // Filter map data
        const filteredData = value === "Macropodinae"
          ? mapData  // Show all data if the root node (Macropodinae) is selected
          : mapData.filter(data => data.vernacularName === value);  // Filter for the selected species
  
        // Update the map with the filtered data
        mapView.change('records', vega.changeset().remove(() => true).insert(filteredData)).run();
  
        // Filter bar chart data
        filterBarChartData(value);
      });
    });
}

function filterBarChartData(value) {
  // Use querySelector to select the dropdown by its name attribute
  if (dropdown) {
    // Manually set the selection to "Red Kangaroo"
    dropdown.value = value;
    dropdown.dispatchEvent(new Event('change'));  // Trigger the change event manually
  }
}
