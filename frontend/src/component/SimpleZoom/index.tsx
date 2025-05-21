// import React, { useState, useRef } from "react";

// interface SimpleZoomProps {
//   src: string;
//   alt?: string;
//   className?: string;
// }

// const SimpleZoom = ({ src, alt = "", className }: SimpleZoomProps) => {
//   const [showZoom, setShowZoom] = useState(false);
//   const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
//   const imageRef = useRef<HTMLImageElement | null>(null);

//   const zoomSize = 150;
//   const zoomScale = 8;

//   const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     if (!imageRef.current) return;
//     const rect = imageRef.current.getBoundingClientRect();

//     let x = e.clientX - rect.left;
//     let y = e.clientY - rect.top;

//     // Ограничиваем x и y чтобы не выходить за края картинки
//     x = Math.max(zoomSize / (2 * zoomScale), Math.min(rect.width - zoomSize / (2 * zoomScale), x));
//     y = Math.max(zoomSize / (2 * zoomScale), Math.min(rect.height - zoomSize / (2 * zoomScale), y));

//     setZoomPos({ x, y });
//   };

//   return (
//     <div
//       style={{ position: "relative", display: "inline-block", cursor: "zoom-in" }}
//       onMouseEnter={() => setShowZoom(true)}
//       onMouseLeave={() => setShowZoom(false)}
//       onMouseMove={onMouseMove}
//     >
//       <img
//         ref={imageRef}
//         src={src}
//         alt={alt}
//         className={className}
//         style={{ display: "block", userSelect: "none" }}
//         draggable={false}
//       />

//       {showZoom && (
//         <div
//           style={{
//             position: "absolute",
//             pointerEvents: "none",
//             top: zoomPos.y - zoomSize / 2,
//             left: zoomPos.x + 20, // лупа справа от курсора, чтобы не закрывать
//             width: zoomSize,
//             height: zoomSize,
//             borderRadius: "8px",
//             border: "2px solid rgba(0,0,0,0.5)",
//             overflow: "hidden",
//             boxShadow: "0 0 8px rgba(0,0,0,0.3)",
//             zIndex: 10,
//           }}
//         >
//           <img
//             src={src}
//             alt="zoom"
//             style={{
//               position: "absolute",
//               top: -zoomPos.y * zoomScale + zoomSize / 2,
//               left: -zoomPos.x * zoomScale + zoomSize / 2,
//               width: (imageRef.current?.width ?? 0) * zoomScale,
//               height: "auto",
//               userSelect: "none",
//               pointerEvents: "none",
//             }}
//             draggable={false}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default SimpleZoom;
