import styles from "./map.module.scss";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import germanyGeoJson from "./germany.json";
import { markersData } from "./data";
import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";


const svgHtmlIcon = L.divIcon({
  className: "", 
  html: `
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pinned-icon lucide-map-pinned"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/></svg>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = () => {
  const [data, setData] = useState(markersData);
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState('');


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
            onClick={()=> setInput('')}
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
           borderWidth: isFocused ? '2' : 0
         }}
         transition={{
          duration: 0.2, 
          opacity: { duration: 0.1 }, 
        }}
        >
          {data
          .filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
          .map(item => {
            return(
              <li 
              onClick={()=> setInput(item.name)}
              className={styles.item} 
              key={item.id}>{item.name}</li>
            )
          })}
        </motion.ul>
      </div>

    <MapContainer
      className={styles.map}
      center={[51.1657, 10.4515]}
      zoom={5.8}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON data={germanyGeoJson as any} style={countryStyle} />
      
      {markersData
      .filter(item =>  item.name.toLowerCase().includes(input.toLowerCase()))
      .map((marker) => (
        <Marker icon={svgHtmlIcon} key={marker.id} position={(marker.position ?? [0, 0]) as [number, number]}>
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
  color: "#F57520", // цвет обводки
  weight: 2,
  opacity: 1,
  fillOpacity: 0.9
};