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
            "type": "threshold",
            "domain": [50, 1500]
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