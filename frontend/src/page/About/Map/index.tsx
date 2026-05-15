import "../../../global.css"
import styles from "./map.module.scss"
import L from "leaflet"
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap, Tooltip, Circle } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import germanyGeoJson from "./germany.json"
import { markersData } from "./data"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import React from "react"

// -------------------- helpers --------------------
function getDistanceKm([lat1, lon1]: [number, number], [lat2, lon2]: [number, number]) {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function getZoomByRadius(radius: number) {
    if (radius <= 25) return 10
    if (radius <= 50) return 9
    if (radius <= 100) return 8
    if (radius <= 200) return 7
    return 6
}

const svgHtmlIcon = L.divIcon({
    className: "",
    html: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="18.5" cy="17.5" r="3.5"/>
    <circle cx="5.5" cy="17.5" r="3.5"/>
    <circle cx="15" cy="5" r="1"/>
    <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
  </svg>
  `,
    iconSize: [31, 31],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
})

// -------------------- Map --------------------
const Map = () => {
    const mapRef = useRef<L.Map>(null)

    const [data, setData] = useState(markersData)
    const [input, setInput] = useState("")
    const [radius, setRadius] = useState(25)
    const [zoom, setZoom] = useState(5.8)
    const [center, setCenter] = useState<[number, number]>([51.1657, 10.4515])
    const [searchCenter, setSearchCenter] = useState<[number, number] | null>(null)
    const [isFocused, setIsFocused] = useState(false)

    // -------------------- Update Map View --------------------
    function UpdateMapView({ center, zoom }: { center: [number, number]; zoom: number }) {
        const map = useMap()
        React.useEffect(() => {
            map.setView(center, zoom)
        }, [center, zoom, map])
        return null
    }

    // -------------------- Search & Zoom --------------------
    React.useEffect(() => {
        const filtered = markersData.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
        setData(filtered)

        if (!input) {
            setCenter([51.1657, 10.4515])
            setZoom(5.8)
            setSearchCenter(null)
            return
        }

        if (filtered.length === 1) {
            const city = filtered[0]
            const coords = city.position as [number, number]
            setSearchCenter(coords)
            setCenter(coords)
            setZoom(getZoomByRadius(radius))

            // фильтрация маркеров по radius
            const filteredByRadius = markersData.filter(marker => {
                const distance = getDistanceKm(coords, marker.position as [number, number])
                return distance <= radius
            })
            setData(filteredByRadius)
        } else {
            // несколько городов → общий вид, circle убираем
            setSearchCenter(null)
            setCenter([51.1657, 10.4515])
            setZoom(5.8)
        }
    }, [input, radius])

    // -------------------- JSX --------------------
    return (
        <section className={styles.maps}>
            <div className={styles.inputs}>
                <input
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    id="search"
                    type="text"
                    onChange={e => setInput(e.target.value)}
                    value={input}
                    className={styles.input}
                    placeholder=" "
                />
                <label className={styles.label} htmlFor="search">
                    Search City
                </label>

                {input && (
                    <button
                        className={styles.btn}
                        onClick={() => {
                            setInput("")
                            setSearchCenter(null)
                            setCenter([51.1657, 10.4515])
                            setZoom(5.8)
                        }}
                    >
                        <X />
                    </button>
                )}

                <motion.ul
                    className={styles.list}
                    animate={{
                        height: isFocused ? "auto" : 0,
                        opacity: isFocused ? 1 : 0
                    }}
                >
                    {data.length > 0 ? data.map(item => (
                        <motion.li key={item.id} className={styles.item} onClick={() => setInput(item.name)}>
                            {item.name}
                        </motion.li>
                    ))
                  :
                  <li className={styles.empty}>
      Für diese Suche wurden keine Standorte gefunden
    </li>
                  }
                </motion.ul>
            </div>

            {/* radius selector всегда виден */}
            {searchCenter && (
              <div className={styles.selects}>

                <select
                    value={radius}
                    onChange={e => setRadius(Number(e.target.value))}
                    className={styles.radiusSelect}
                >
                    <option value={25}>25 km</option>
                    <option value={50}>50 km</option>
                    <option value={100}>100 km</option>
                    <option value={200}>200 km</option>
                </select>
                 <label className={styles.label} htmlFor="search">
                    Filter Radius
                </label>
              </div>

            )}

            <MapContainer ref={mapRef} className={styles.map} center={center} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <UpdateMapView center={center} zoom={zoom} />

                <GeoJSON data={germanyGeoJson as any} style={countryStyle} />

                {searchCenter && (
                    <Circle
                        center={searchCenter}
                        radius={radius * 1000}
                        pathOptions={{
                            color: "#f57520",
                            weight: 2,
                            fillColor: "rgba(245,117,32,0.8)",
                            fillOpacity: 0.5
                        }}
                    />
                )}

                {data.map(marker => (
                    <Marker key={marker.id} icon={svgHtmlIcon} position={marker.position as [number, number]}>
                        <Tooltip permanent direction="bottom" className="custom-tooltip">
                            {marker.name}
                        </Tooltip>
                        <Popup>
                            <div className={styles.popup}>
                                <h3 className='popupTitle'>{marker.store}</h3>
                                <p className='popupCity'>{marker.name}</p>
                                <div className={styles.popupInfo}>
                                    <p>
                                        {marker.address}
                                    </p>
                                    <p>
                                        <strong>Telefon: </strong>   
                                        <a href={`tel:${marker.phone.replace(/\s/g, "")}`}>{marker.phone}</a>
                                    </p>
                                    <p>
                                        <strong>Öffnungszeiten: </strong>
                                        {marker.openingHours}
                                    </p>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </section>
    )
}

export default Map

// -------------------- styles --------------------
const countryStyle = {
    fillColor: "rgba(0,0,0,0.2)",
    color: "#F57520",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.9
}
