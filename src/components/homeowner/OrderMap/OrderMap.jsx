import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import  { Link } from "react-router-dom";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const OrderMap = ({ order }) => {
  const { lat, lng, address, district, city } = order.location;

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#12376B]/10">
          <i className="fa-solid fa-location-dot text-xl text-[#12376B]"></i>
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Service Location
          </h2>

          <p className="text-gray-500">
            Customer address
          </p>
        </div>

      </div>

      {/* Map */}

      <div className="overflow-hidden rounded-3xl">

        <MapContainer
          center={[lat, lng]}
          zoom={15}
          scrollWheelZoom={true}
          className="h-[420px] w-full z-10 relative "
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[lat, lng]}>
            <Popup>
              <strong>{address}</strong>

              <br />

              {district}, {city}
            </Popup>
          </Marker>
        </MapContainer>

      </div>

      {/* Info */}

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Latitude
          </p>

          <h3 className="font-bold">
            {lat}
          </h3>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Longitude
          </p>

          <h3 className="font-bold">
            {lng}
          </h3>
        </div>

      </div>

      {/* Button */}

      <Link
        to={`https://www.google.com/maps?q=${lat},${lng}`}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-[#12376B] py-4 font-semibold text-white transition hover:bg-[#0f2f5a]"
      >
        <i className="fa-solid fa-location-crosshairs"></i>

        Open in Google Maps
      </Link>

    </section>
  );
};

export default OrderMap;
