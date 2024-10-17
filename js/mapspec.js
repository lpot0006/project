// Map visualization specification
const mapSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 1000,
    "height": 550,
    "projection": {"type": "mercator"},
    "layer": [
      {
        "data": {
          "url": "https://lpot0006.github.io/project/map/victoria-australia_1308.json",
          "format": {"type": "topojson", "feature": "victoria-australia_1308"}
        },
        "mark": {"type": "geoshape", "fill": "lightgrey", "stroke": "black"}
      },
      {
        "data": {
          "name": "records",
          "url": "https://lpot0006.github.io/project/data/records-2024-10-10.csv"
        },
        "mark": {"type": "circle"},
        "encoding": {
          "longitude": {"field": "decimalLongitude", "type": "quantitative"},
          "latitude": {"field": "decimalLatitude", "type": "quantitative"},
          "size": {
            "field": "individualCount",
            "type": "quantitative",
            "title": "Sightings",
            "scale": {
              "type": "threshold",         // Using threshold scale for size
              "domain": [50, 500, 1500],   // Define thresholds
              "range": [100, 200, 400, 800]     // Corresponding sizes for each threshold
            },
            "legend": {
              "titleFontSize": 16,         // Font size of the legend title
              "labelFontSize": 14,         // Font size of the labels
              "symbolSize": 200,           // Size of the circles in the legend
              "orient": "right",           // Position of the legend
              "titleColor": "#1f77b4",     // Color of the title
              "labelColor": "#555555",     // Color of the labels
              "padding": 10                // Padding between title and symbols
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
              "titleFontSize": 16,         // Font size for the legend title
              "labelFontSize": 14,         // Font size for the legend labels
              "labelColor": "#333333",     // Label text color
              "titleColor": "#1f77b4",     // Title color
              "symbolSize": 100,           // Size of the symbols in the legend
              "orient": "right",           // Legend position
              "titleFontWeight": "bold",   // Bold title
              "padding": 10                // Padding between title and symbols
            }
          },
          "tooltip": [
            {"field": "legendName", "type": "nominal", "title": "Species"},
            {"field": "individualCount", "type": "quantitative", "format": ",", "title": "Count"}
          ]
        }
      }
    ]
  };