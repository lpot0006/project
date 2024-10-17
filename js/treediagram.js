const treeSpec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 1000,
    "height": 550,
    "padding": 5,
    "autosize": "none",
  
    "signals": [
      {
        "name": "layout_width",
        "value": 800
      },
      {
        "name": "layout_height",
        "value": 250
      },
      {
        "name": "x_offset",
        "value": 100
      },
      {
        "name": "y_offset",
        "value": 150
      },
      {
        "name": "selected_species",  // Signal for the selected species
        "value": "Macropodnae",  // Default to show all species
        "on": [
          {"test": "datum.depth == 0", "events": "symbol:click", "update": "datum.name"},  // Update on node click
          {"test": "datum.depth == 1", "events": "symbol:click", "update": "datum.name"},  // Update on node click
          {"test": "datum.depth > 1", "events": "symbol:click", "update": "datum.name"}  // Update on node click 
        ]
      }
    ],
  
    "data": [
      {
        "name": "tree",
        "values": [
          {"id": "1", "parent": null, "name": "Macropodnae"},
          {"id": "2", "parent": "1", "name": "Macropus"},
          {"id": "3", "parent": "2", "name": "Eastern Grey Kangaroo"},
          {"id": "4", "parent": "2", "name": "Western Grey Kangaroo"},
          {"id": "5", "parent": "1", "name": "Wallabia"},
          {"id": "6", "parent": "5", "name": "Swamp Wallaby"},
          {"id": "7", "parent": "1", "name": "Petrogale"},
          {"id": "8", "parent": "7", "name": "Brush-tailed Rock-wallaby"},
          {"id": "9", "parent": "1", "name": "Osphranter"},
          {"id": "10", "parent": "9", "name": "Red Kangaroo"},
          {"id": "11", "parent": "1", "name": "Notamacropus"},
          {"id": "12", "parent": "11", "name": "Red-necked Wallaby"}
        ],
        "transform": [
          {
            "type": "stratify",
            "key": "id",
            "parentKey": "parent"
          },
          {
            "type": "tree",
            "method": "tidy",
            "size": [{"signal": "layout_width"}, {"signal": "layout_height"}],
            "as": ["x", "y", "depth", "children"]
          }
        ]
      },
      {
        "name": "links",
        "source": "tree",
        "transform": [
          {
            "type": "treelinks"
          },
          {
            "type": "linkpath",
            "orient": "horizontal",
            "sourceX": {"expr": "datum.source.x + x_offset"},
            "sourceY": {"expr": "datum.source.y + y_offset"},
            "targetX": {"expr": "datum.target.x + x_offset"},
            "targetY": {"expr": "datum.target.y + y_offset"}
          }
        ]
      }
    ],
  
    "scales": [
      {
        "name": "color",
        "type": "ordinal",
        "domain": ["Macropodnae", "Macropus", "Eastern Grey Kangaroo", "Western Grey Kangaroo", "Wallabia", "Swamp Wallaby", "Petrogale", "Brush-tailed Rock-wallaby", "Osphranter", "Red Kangaroo", "Notamacropus", "Red-necked Wallaby"],
        "range": ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]
      }
    ],
  
    "marks": [
      {
        "type": "path",
        "from": {"data": "links"},
        "encode": {
          "enter": {
            "stroke": {"value": "#ccc"},
            "strokeWidth": {"value": 5}
          },
          "update": {
            "path": {"field": "path"}
          }
        }
      },
      {
        "type": "symbol",
        "from": {"data": "tree"},
        "encode": {
          "enter": {
            "size": [
              {"test": "datum.depth == 0", "value": 400},
              {"test": "datum.depth == 1", "value": 600},
              {"test": "datum.depth > 1", "value": 800}
            ],
            "stroke": {"value": "#fff"},
            "strokeWidth": {"value": 1.5},
            "fill": {"scale": "color", "field": "name"},
            "cursor": [
              {"test": "datum.depth == 0", "value": "pointer"},
              {"test": "datum.depth > 1", "value": "pointer"}
            ]
          },
          "update": {
            "x": {"signal": "datum.x + x_offset"},
            "y": {"signal": "datum.y + y_offset"}
          }
        }
      },
      {
        "type": "text",
        "from": {"data": "tree"},
        "encode": {
          "enter": {
            "text": {"field": "name"},
            "fontSize": [
              {"test": "datum.depth === 0", "value": 20},
              {"test": "datum.depth === 1", "value": 18},
              {"test": "datum.depth > 1", "value": 16}
            ],
  
            "fontWeight": [
              {"test": "datum.depth === 0", "value": "bold"},
              {"test": "datum.depth === 1", "value": "normal"},
              {"test": "datum.depth > 1", "value": "lighter"}
            ],
            "align": [
              {"test": "datum.depth === 0", "value": "left"},
              {"test": "datum.depth === 1", "value": "left"},
              {"test": "datum.depth > 1", "value": "left"}
            ],
            "baseline": {"value": "middle"},
            "dx": [
              {"test": "datum.depth === 0", "value": 25},
              {"test": "datum.depth === 1", "value": 20},
              {"test": "datum.depth > 1", "value": 20}
            ],
            "dy": [
              {"test": "datum.depth === 0", "value": 0},
              {"test": "datum.depth === 1", "value": 0},
              {"test": "datum.depth > 1", "value": 0}
            ],
            "angle": [
              {"test": "datum.depth == 1", "value": 30},
              {"test": "datum.depth > 1", "value": 30}
            ]
          },
          "update": {
            "x": {"signal": "datum.x + x_offset"},
            "y": {"signal": "datum.y + y_offset"}
          }
        }
      },
      {
        "type": "text",
        "encode": {
          "enter": {
            "text": {"value": "Macropodinae Biodiversity of Victoria"},
            "fontSize": {"value": 30},
            "fontWeight": {"value": "bold"},
            "align": {"value": "center"},
            "baseline": {"value": "top"},
            "x": {"value": 500},  // Center the title
            "y": {"value": 20}
          }
        }
      },
      {
        "type": "text",
        "encode": {
          "enter": {
            "text": {"value": "Family"},
            "fontSize": {"value": 20},
            "fontWeight": {"value": "bold"},
            "align": {"value": "left"},
            "baseline": {"value": "top"},
            "x": {"value": 50},
            "y": {"value": 150}
          }
        }
      },
      {
        "type": "text",
        "encode": {
          "enter": {
            "text": {"value": "Genus"},
            "fontSize": {"value": 20},
            "fontWeight": {"value": "bold"},
            "align": {"value": "left"},
            "baseline": {"value": "top"},
            "x": {"value": 50},
            "y": {"value": 260}
          }
        }
      },
      {
        "type": "text",
        "encode": {
          "enter": {
            "text": {"value": "Species"},
            "fontSize": {"value": 20},
            "fontWeight": {"value": "bold"},
            "align": {"value": "left"},
            "baseline": {"value": "top"},
            "x": {"value": 50},
            "y": {"value": 390}
          }
        }
      }
    ]
  };