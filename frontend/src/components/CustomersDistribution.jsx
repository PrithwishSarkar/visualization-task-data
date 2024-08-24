import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import axios from 'axios';
import { scaleLinear } from 'd3-scale';
import FetchData from '../utilities/FetchData';

const geoUrl =
  "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const API_KEY = process.env.REACT_APP_OPENCAGE_KEY;

export default function CustomerDistribution() {

  const [geoData, setGeoData] = useState([]);
  const data = FetchData('customers-distribution');

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (data.length === 0) return;

      const geoDataTemp = [];

      for (const city of data) {
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city._id)}&key=${API_KEY}`
          );
          const { results } = response.data;
          if (results.length > 0) {
            const { lat, lng } = results[0].geometry;
            geoDataTemp.push({
              ...city,
              latitude: lat,
              longitude: lng,
            });
          }
        } catch (error) {
          console.error(`Error fetching geocoding data for city: ${city._id}`, error);
        }
      }

      setGeoData(geoDataTemp);
    };

    fetchCoordinates();
  }, [data]);
  const colorScale = scaleLinear()
    .domain([0, Math.max(...data.map(d => d.count))])
    .range(["#ffedea", "#ff5233"]);

  return (
    <div className='chart mapchart'>
      <h2>Customer Distribution Across the World</h2>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "#D6D6DA", stroke: "#FFFFFF" },
                  hover: { fill: "#F53", stroke: "#FFFFFF" },
                  pressed: { fill: "#E42", stroke: "#FFFFFF" },
                }}
              />
            ))
          }
        </Geographies>
        {geoData.length > 0 && geoData.map((city, i) => (
          <Marker key={i} coordinates={[city.longitude, city.latitude]}>
            <circle r={5} fill={colorScale(city.count)} />
          </Marker>
        ))}
      </ComposableMap>
      <p>(The intensity of colour dot denotes the density of customers in a city.)</p>
    </div>

  );
};
