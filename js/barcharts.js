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
    "text": "Victorian Macropodinae Population 1994 - 2024",
    "fontSize": 24,
    "fontWeight": "bold",
    "font": "Arial",
    "color": "#1f77b4",
    "anchor": "middle",
    "dy": -10
  },
  "data": {
    "name": "records",
    "url": "data/records-2024-10-10.csv"
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
      "fontsize": 16,
      "title": {
        "text": "Year",
        "fontsize": 18
      },
      "axis": {
        "labelAngle": -30
      }
    },
    "y": {
      "field": "totalIndividuals",
      "type": "quantitative",
      "fontsize": 16,
      "title": {
        "text": "Population Count",
        "fontsize": 18
      },
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
    "text": "Total Macropodinae Population",
    "fontSize": 24,
    "fontWeight": "bold",
    "font": "Arial",
    "color": "#1f77b4",
    "anchor": "middle",
    "dy": -10
  },
  "data": {
    "url": "data/count.csv"
  },
  "mark": {
    "type": "bar",
    "continuousBandSize": 5
  },
  "encoding": {
    "x": {
      "field": "vernacularName",
      "type": "nominal",
      "fontsize": 16,
      "title": {
        "text": "Species",
        "fontsize": 18
      },
      "axis": {
        "labelAngle": -30
      },
      "sort": "-y"
    },
    "y": {
      "field": "totalCount",
      "type": "quantitative",
      "fontsize": 16,
      "title": {
        "text": "Population Count",
        "fontsize": 18
      },
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