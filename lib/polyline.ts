export interface LatLng {
  lat: number;
  lng: number;
}

/** Decodes a Google encoded polyline (precision 5). */
export function decodePolyline(encoded: string): LatLng[] {
  const out: LatLng[] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;
  while (index < encoded.length) {
    for (const axis of ["lat", "lng"] as const) {
      let shift = 0;
      let value = 0;
      let b: number;
      do {
        b = encoded.charCodeAt(index++) - 63;
        value |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20 && index <= encoded.length);
      const delta = value & 1 ? ~(value >> 1) : value >> 1;
      if (axis === "lat") lat += delta;
      else lng += delta;
    }
    out.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }
  return out;
}
