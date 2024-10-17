// Bar chart specification for population data over time
const barChartSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 1000,
  "height": 550,
  "padding": {
    "top": 20,
    "left": 40,
    "right": 40,
    "bottom": 20
  },
  "title": {
    "text": "Victorian Macropodnae Population 1994 - 2024",
    "fontSize": 24,
    "fontWeight": "bold",
    "font": "Arial",
    "color": "#1f77b4",
    "anchor": "middle",
    "dy": -10
  },
  "data": {
    "name": "records",
    "url": "https://lpot0006.github.io/project/data/records-2024-10-10.csv"
  },
  "params": [
    {
      "name": "specific_species",
      "bind": {
        "input": "select",
        "options": [
          null,
          "Brush-tailed Rock-wallaby",
          "Eastern Grey Kangaroo",
          "Red Kangaroo",
          "Red-necked Wallaby",
          "Swamp Wallaby",
          "Western Grey Kangaroo"
        ],
        "labels":[
          "Please Select",
          "Brush-tailed Rock-wallaby",
          "Eastern Grey Kangaroo",
          "Red Kangaroo",
          "Red-necked Wallaby",
          "Swamp Wallaby",
          "Western Grey Kangaroo"
        ],
        "name": "Species Selection: "
      }
    }
  ],
  "transform": [
    {
      "filter": "datum.year >= 1994"
    },
    {
      "filter": "specific_species == null || datum.vernacularName == specific_species"
    },
    {
      "aggregate": [
        {"op": "sum", "field": "individualCount", "as": "totalIndividuals"}
      ],
      "groupby": ["year", "vernacularName"]
    }  
  ],
  "mark": {
    "type": "bar",
    "continuousBandSize": 5
  },
  "encoding": {
    "x": {
      "field": "year",
      "type": "nominal",
      "axis": {
        "title": "Year",
        "labelFontSize": 14,
        "titleFontSize": 16,
        "labelAngle": -30
      }
    },
    "y": {
      "field": "totalIndividuals",
      "type": "quantitative",
      "axis": {
        "title": "Population Size",
        "labelFontSize": 14,
        "titleFontSize": 16
      }
    },
    "color": {
      "field": "vernacularName",
      "type": "nominal",
      "title": "Species",
      "scale": {
        "domain": [
          "Brush-tailed Rock-wallaby", 
          "Eastern Grey Kangaroo", 
          "Red Kangaroo", 
          "Red-necked Wallaby", 
          "Swamp Wallaby", 
          "Western Grey Kangaroo"
        ],
        "range": [
          "#fccde5", "#bebada", "#bc80bd", "#ffed6f", "#fdb462", "#fb8072"
        ]
      },
      "legend": {
        "labelFontSize": 14,   // Font size for legend labels
        "titleFontSize": 16,   // Font size for legend title
        "symbolSize": 120      // Size of the legend symbols (optional customization)
      }
    },
    "order": {
      "field": "totalIndividuals",
      "type": "quantitative",
      "sort": "descending"
    },
    "tooltip": [
      {"field": "vernacularName", "type": "nominal", "title": "Species"},
      {"field": "totalIndividuals", "type": "quantitative", "format": ",", "title": "Count"}
    ]
  }
};

// Bar chart for total population count per species
const totalPopulationBarChartSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 1000,
  "height": 550,
  "title": {
    "text": "Total Macropodnae Population",
    "fontSize": 24,
    "fontWeight": "bold",
    "font": "Arial",
    "color": "#1f77b4",
    "anchor": "middle",
    "dy": -10
  },
  "data": {
    "url": "https://lpot0006.github.io/project/data/count.csv"
  },
  "mark": {
    "type": "bar",
    "continuousBandSize": 5
  },
  "encoding": {
    "x": {
      "field": "vernacularName",
      "type": "nominal",
      "axis": {
        "title": "Species",
        "labelFontSize": 14,
        "titleFontSize": 16,
        "labelAngle": -30
      },
      "sort": "-y"
    },
    "y": {
      "field": "totalCount",
      "type": "quantitative",
      "axis": {
        "title": "Population Size",
        "labelFontSize": 14,
        "titleFontSize": 16,
      }
    },
    "color": {
      "field": "vernacularName",
      "type": "nominal",
      "title": "Species",
      "legend": null,
      "scale": {
        "domain": [
          "Brush-tailed Rock-wallaby", 
          "Eastern Grey Kangaroo", 
          "Red Kangaroo", 
          "Red-necked Wallaby", 
          "Swamp Wallaby", 
          "Western Grey Kangaroo"
        ],
        "range": [
          "#fccde5", "#bebada", "#bc80bd", "#ffed6f", "#fdb462", "#fb8072"
        ]
      }
    },
    "tooltip": [
      {"field": "vernacularName", "type": "nominal", "title": "Species"},
      {"field": "totalCount", "type": "quantitative", "format": ",", "title": "Count"}
    ]
  }
};