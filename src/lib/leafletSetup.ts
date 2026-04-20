import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon paths (Leaflet's defaults are broken with bundlers)
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export const startIcon = L.divIcon({
  className: "flycab-marker",
  html: `<div style="width:36px;height:36px;border-radius:50% 50% 50% 0;background:hsl(178 65% 32%);transform:rotate(-45deg);border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);color:white;font-weight:900;font-size:14px;">A</span></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

export const destIcon = L.divIcon({
  className: "flycab-marker",
  html: `<div style="width:36px;height:36px;border-radius:50% 50% 50% 0;background:hsl(12 78% 48%);transform:rotate(-45deg);border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);color:white;font-weight:900;font-size:14px;">B</span></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

export default L;
