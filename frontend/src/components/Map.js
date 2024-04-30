import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

export default function Map() {
  const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleClick = (geo) => {
    // Access properties of the clicked geography
    const { name } = geo.properties;
    // Set selected country details
    setSelectedCountry({ name });
  };

  console.log(selectedCountry);

  return (
    <div
      style={{
        width: "58%",
        height: "629px",
        //position: "absolute",
      }}
    >
      {selectedCountry.name ? (
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 200 }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // Access properties of the geography
                const { name } = geo.properties;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleClick(geo)}
                    style={{
                      default: { fill: "#D6D6DA", outline: "none" },
                      hover: { fill: "#F53", outline: "none" },
                      pressed: { fill: "#FF6347", outline: "none" },
                    }}
                  ></Geography>
                );
              })
            }
          </Geographies>
        </ComposableMap>
      ) : (
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 200 }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // Access properties of the geography
                const { name } = geo.properties;
                if (name === selectedCountry.name) {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleClick(geo)}
                      style={{
                        default: { fill: "#D6D6DA", outline: "none" },
                        hover: { fill: "#F53", outline: "none" },
                        pressed: { fill: "#FF6347", outline: "none" },
                      }}
                    ></Geography>
                  );
                }
              })
            }
          </Geographies>
        </ComposableMap>
      )}
    </div>
  );
}
