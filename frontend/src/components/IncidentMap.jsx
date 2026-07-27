import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function IncidentMap({ incidents }) {

  return (

    <MapContainer
      center={[15.9300, 120.8500]}
      zoom={12}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "10px",
      }}
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {incidents.map((incident) => (

        <Marker
          key={incident.id}
          position={[
            parseFloat(
              incident.latitude
            ),
            parseFloat(
              incident.longitude
            ),
          ]}
        >

          <Popup>

            <div>

              <h3>
                {
                  incident.incident_type
                }
              </h3>

              <p>
                <strong>
                  Barangay:
                </strong>{" "}
                {
                  incident.barangay
                }
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {
                  incident.status
                }
              </p>

              <p>
                {
                  incident.description
                }
              </p>

            </div>

          </Popup>

        </Marker>

      ))}

    </MapContainer>

  );

}

export default IncidentMap;