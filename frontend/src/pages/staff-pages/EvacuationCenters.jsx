import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import StaffHeader from "../../components/StaffHeader";
import StaffNavbar from "../../components/StaffNavbar";
import StaffFooter from "../../components/StaffFooter";

const EvacuationCenters = () => {

  const [centers, setCenters] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({});

  useEffect(() => {

    fetchCenters();

  }, []);

  // =====================================
  // FETCH EVACUATION CENTERS
  // =====================================

  const fetchCenters = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/evacuation-centers"
        );

      setCenters(response.data);

    }
    catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // START EDIT
  // =====================================

  const handleEdit = (center) => {

    setEditingId(
      center.evacuation_id
    );

    setFormData(center);

  };

  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  // =====================================
  // SAVE UPDATE
  // =====================================

  const handleSave = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/evacuation-centers/${id}`,
        {

          current_occupancy:
            formData.current_occupancy,

          available_food_packs:
            formData.available_food_packs,

          available_water_boxes:
            formData.available_water_boxes,

          available_medicine_kits:
            formData.available_medicine_kits,

          available_blankets:
            formData.available_blankets,

          incoming_evacuees:
            formData.incoming_evacuees,

          emergency_needs:
            formData.emergency_needs,

          status:
            formData.status

        }
      );

      alert(
        "Evacuation center updated successfully"
      );

      setEditingId(null);

      fetchCenters();

    }
    catch (error) {

      console.error(error);

      alert(
        "Failed to update evacuation center"
      );

    }

  };

  // =====================================
  // OCCUPANCY COLOR
  // =====================================

  const getOccupancyColor = (
    current,
    total
  ) => {

    const percent =
      (current / total) * 100;

    if (percent >= 90)
      return "#dc2626";

    if (percent >= 70)
      return "#f59e0b";

    return "#16a34a";

  };

  // =====================================
  // STATUS BADGE COLOR (visual only)
  // =====================================

  const getStatusBadge = (status) => {

    if (status === "Open")
      return { bg: "#d1fae5", color: "#065f46" };

    if (status === "Full")
      return { bg: "#fee2e2", color: "#991b1b" };

    if (status === "Under Maintenance")
      return { bg: "#fef3c7", color: "#92400e" };

    return { bg: "#e2e8f0", color: "#334155" };

  };

  return (

    <div style={{ backgroundColor: "#f4f7f6", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      {/* FIXED HEADER WITH ZERO OVERLAP */}
      <div style={{
        background: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
        padding: "32px max(20px, 4%)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "800", color: "#ffffff", lineHeight: "1.2", letterSpacing: "-0.5px" }}>
            Evacuation Center Monitoring
          </h1>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#a7f3d0", opacity: 0.9 }}>
            Real-Time Capacity & Resource Tracking
          </p>
        </div>
      </div>

      {/* HEADER */}
      <StaffHeader />

      {/* NAVBAR */}
      <StaffNavbar />

      {/* CONTENT */}
      <div style={{ padding: "40px max(20px, 4%)" }}>

        <div style={sectionStyle}>

          <h2 style={sectionHeaderStyle}>🏠 Active Evacuation Centers</h2>
          <p style={{ margin: "4px 0 24px 0", color: "#64748b", fontSize: "14px" }}>
            Monitor occupancy levels and update resource availability per center.
          </p>

          {/* CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "20px"
            }}
          >

            {centers.map((center) => {

              const occupancyPercent =
                (
                  center.current_occupancy /
                  center.total_capacity
                ) * 100;

              const isEditing =
                editingId === center.evacuation_id;

              const statusBadge =
                getStatusBadge(
                  isEditing ? formData.status : center.status
                );

              return (

                <div
                  key={
                    center.evacuation_id
                  }
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                  }}
                >

                  {/* CENTER NAME + STATUS BADGE */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "16px",
                        fontWeight: "800",
                        color: "#0f172a"
                      }}
                    >
                      {center.center_name}
                    </h3>

                    {!isEditing && (
                      <span style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "700",
                        backgroundColor: statusBadge.bg,
                        color: statusBadge.color,
                        whiteSpace: "nowrap"
                      }}>
                        ● {center.status}
                      </span>
                    )}
                  </div>

                  <p style={{ margin: "2px 0", fontSize: "13.5px", color: "#475569" }}>
                    <strong style={{ color: "#334155" }}>
                      Barangay:
                    </strong>{" "}
                    {center.barangay}
                  </p>

                  <p style={{ margin: "2px 0", fontSize: "13.5px", color: "#475569" }}>
                    <strong style={{ color: "#334155" }}>
                      Municipality:
                    </strong>{" "}
                    {center.municipality}
                  </p>

                  <p style={{ margin: "2px 0", fontSize: "13.5px", color: "#475569" }}>
                    <strong style={{ color: "#334155" }}>
                      Address:
                    </strong>{" "}
                    {center.address}
                  </p>

                  {/* OCCUPANCY */}
                  <div
                    style={{
                      marginTop: "16px",
                      background: "#f8fafc",
                      padding: "12px",
                      borderRadius: "10px"
                    }}
                  >

                    <span style={labelStyle}>
                      Occupancy
                    </span>

                    <div
                      style={{
                        width: "100%",
                        height: "16px",
                        background:
                          "#e2e8f0",
                        borderRadius:
                          "20px",
                        overflow:
                          "hidden",
                        marginTop: "8px"
                      }}
                    >

                      <div
                        style={{
                          width:
                            `${occupancyPercent}%`,
                          height: "100%",
                          background:
                            getOccupancyColor(
                              center.current_occupancy,
                              center.total_capacity
                            ),
                          transition: "width 0.3s ease"
                        }}
                      />

                    </div>

                    <p
                      style={{
                        margin: "8px 0 0 0",
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#334155"
                      }}
                    >
                      {
                        center.current_occupancy
                      }
                      {" / "}
                      {
                        center.total_capacity
                      }
                    </p>

                  </div>

                  {/* RESOURCES */}
                  <div
                    style={{
                      marginTop: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px"
                    }}
                  >

                    <div style={resourceRowStyle}>
                      <span style={{ fontSize: "13.5px", color: "#475569" }}>🍱 Food Packs</span>
                      {
                        isEditing ? (

                          <input
                            type="number"
                            name="available_food_packs"
                            value={
                              formData.available_food_packs
                            }
                            onChange={
                              handleChange
                            }
                            style={inputStyle}
                          />

                        ) : (

                          <span style={valueBadgeStyle}>{center.available_food_packs}</span>

                        )}
                    </div>

                    <div style={resourceRowStyle}>
                      <span style={{ fontSize: "13.5px", color: "#475569" }}>💧 Water Boxes</span>
                      {
                        isEditing ? (

                          <input
                            type="number"
                            name="available_water_boxes"
                            value={
                              formData.available_water_boxes
                            }
                            onChange={
                              handleChange
                            }
                            style={inputStyle}
                          />

                        ) : (

                          <span style={valueBadgeStyle}>{center.available_water_boxes}</span>

                        )}
                    </div>

                    <div style={resourceRowStyle}>
                      <span style={{ fontSize: "13.5px", color: "#475569" }}>💊 Medicine Kits</span>
                      {
                        isEditing ? (

                          <input
                            type="number"
                            name="available_medicine_kits"
                            value={
                              formData.available_medicine_kits
                            }
                            onChange={
                              handleChange
                            }
                            style={inputStyle}
                          />

                        ) : (

                          <span style={valueBadgeStyle}>{center.available_medicine_kits}</span>

                        )}
                    </div>

                    <div style={resourceRowStyle}>
                      <span style={{ fontSize: "13.5px", color: "#475569" }}>🛏 Blankets</span>
                      {
                        isEditing ? (

                          <input
                            type="number"
                            name="available_blankets"
                            value={
                              formData.available_blankets
                            }
                            onChange={
                              handleChange
                            }
                            style={inputStyle}
                          />

                        ) : (

                          <span style={valueBadgeStyle}>{center.available_blankets}</span>

                        )}
                    </div>

                  </div>

                  {/* STATUS */}
                  {
                    isEditing && (

                      <div style={{ marginTop: "16px" }}>

                        <label style={labelStyle}>
                          Status
                        </label>

                        <select
                          name="status"
                          value={
                            formData.status
                          }
                          onChange={
                            handleChange
                          }
                          style={{ ...inputStyle, width: "100%", marginLeft: 0, marginTop: "6px" }}
                        >

                          <option>
                            Open
                          </option>

                          <option>
                            Full
                          </option>

                          <option>
                            Under Maintenance
                          </option>

                        </select>

                      </div>

                    )
                  }

                  {/* NEEDS */}
                  <div
                    style={{
                      marginTop: "16px"
                    }}
                  >

                    <label style={labelStyle}>
                      Emergency Needs
                    </label>

                    {
                      isEditing ? (

                        <textarea
                          name="emergency_needs"
                          value={
                            formData.emergency_needs
                          }
                          onChange={
                            handleChange
                          }
                          rows="3"
                          style={{
                            width: "100%",
                            marginTop: "6px",
                            padding: "10px 14px",
                            border: "1px solid #cbd5e1",
                            borderRadius: "8px",
                            fontSize: "14px",
                            outline: "none",
                            backgroundColor: "#f8fafc",
                            boxSizing: "border-box",
                            resize: "none"
                          }}
                        />

                      ) : (

                        <p style={{ margin: "6px 0 0 0", fontSize: "13.5px", color: "#475569" }}>
                          {
                            center.emergency_needs
                          }
                        </p>

                      )
                    }

                  </div>

                  {/* BUTTONS */}
                  <div
                    style={{
                      marginTop: "20px"
                    }}
                  >

                    {
                      isEditing ? (

                        <button
                          onClick={() =>
                            handleSave(
                              center.evacuation_id
                            )
                          }
                          style={primaryBtnStyle}
                        >
                          Save Changes
                        </button>

                      ) : (

                        <button
                          onClick={() =>
                            handleEdit(center)
                          }
                          style={secondaryBtnStyle}
                        >
                          Edit Center
                        </button>

                      )
                    }

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <StaffFooter />

    </div>

  );

};

// =====================================
// DESIGN SYSTEM STYLES
// =====================================

const sectionStyle = {
  background: "#ffffff",
  padding: "28px",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)",
  marginBottom: "32px"
};

const sectionHeaderStyle = {
  margin: 0,
  fontSize: "18px",
  fontWeight: "800",
  color: "#064e3b",
  letterSpacing: "-0.3px"
};

const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: "700",
  color: "#334155",
  marginBottom: "6px",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};

const resourceRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#f8fafc",
  padding: "8px 12px",
  borderRadius: "8px"
};

const valueBadgeStyle = {
  fontSize: "12px",
  fontWeight: "700",
  background: "#e2e8f0",
  color: "#334155",
  padding: "3px 10px",
  borderRadius: "6px"
};

const primaryBtnStyle = {
  width: "100%",
  background: "#059669",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "14px",
  transition: "all 0.2s ease"
};

const secondaryBtnStyle = {
  width: "100%",
  background: "#ecfdf5",
  color: "#065f46",
  border: "1px solid #a7f3d0",
  padding: "10px 15px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "14px",
  transition: "all 0.2s ease"
};

const inputStyle = {

  padding: "6px",

  borderRadius: "6px",

  border:
    "1px solid #cbd5e1",

  marginLeft: "10px",

  width: "100px"

};

export default EvacuationCenters;
