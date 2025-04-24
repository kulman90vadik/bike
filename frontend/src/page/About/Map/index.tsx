import styles from "./map.module.scss";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import germanyGeoJson from "./germany.json";
import { markersData } from "./data";
import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";


const svgHtmlIcon = L.divIcon({
  className: "", 
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bike-icon lucide-bike"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>
  `,
  iconSize: [31, 31],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = () => {
  const [data, setData] = useState(markersData);
  const [originalData, setOriginalData] = useState(markersData);

  const [isFocused, setIsFocused] = useState(false);
  const [zoom, setZoom] = useState(5.8);
  const [center, setCenter] = useState<[number, number]>([51.1657, 10.4515]);
  const [input, setInput] = useState('');


  function UpdateMapView({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();
  
    React.useEffect(() => {
      if (center && zoom) {
        map.setView(center, zoom);
      }
    }, [center, zoom, map]);
  
    return null;
  }


  React.useEffect(() => {
    const filtered = originalData.filter(item =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
   

    if (filtered.length === 1) {
      setZoom(7.6);
      setCenter(filtered[0].position as [number, number]);
    } else {
      setZoom(5.8);
      setCenter([51.1657, 10.4515]);
    } 
    setData(filtered);
  }, [input, originalData]);


  return (
    <section className={styles.maps}>
      <div className={styles.inputs}>
        <input 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          id="search" type="text" 
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className={styles.input} 
          placeholder=" "/>
        <label className={styles.label} htmlFor="search">Search City</label>
        {input &&
          <button 
            className={styles.btn}
            onClick={()=> { setInput(''); setZoom(5.8); setCenter([51.1657, 10.4515]) }}
            >
              <X />
          </button>
        }
        <motion.ul className={styles.list}
         exit={{ height: 0, opacity: 0}}
         animate={{
           borderColor: isFocused ? '#008000' : 'transparent',
           height: isFocused ? "auto" : 0,
           opacity: isFocused ? 1 : 0,
          //  borderWidth: isFocused ? '2' : 0
         }}
         transition={{
            duration: 0.1, 
            height: { duration: 0.1, ease: "easeInOut" },
          }}
        >
          {data
          .map((item, index) => {
            return(
              <motion.li 
              onClick={()=> { setInput(item.name); setZoom(7.6); setCenter(item.position as [number, number])}}
              className={styles.item} 
              key={item.id}
              exit={{ opacity: 0, visibility: "hidden" }}
              animate={{
                opacity: isFocused ? 1 : 0, 
                // pointerEvents: isFocused ? 'auto' : 'none', 
                visibility: isFocused ? 'visible' : 'hidden', 
              }}
              transition={{
                duration: 0.1,
                // delay: index * 0.1, 
                opacity: { duration: 0.5 },
              }}
              
              >{item.name}</motion.li>
            )
          })}
        </motion.ul>
      </div>

    <MapContainer
      className={styles.map}
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <UpdateMapView center={center} zoom={zoom} />

      <GeoJSON data={germanyGeoJson as any} style={countryStyle} />
      
      {markersData
      .filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
      .map((marker) => (
        <Marker  icon={svgHtmlIcon} key={marker.id} position={(marker.position ?? [0, 0]) as [number, number]}>
          <Popup>
            <button
              className={styles.text}
            >
              {marker.name}
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </section>

  );
};

export default Map;


const countryStyle = {
  fillColor: "rgba(0, 0, 0, 0.2)",
  color: "#F57520",
  weight: 2,
  opacity: 1,
  fillOpacity: 0.9
};