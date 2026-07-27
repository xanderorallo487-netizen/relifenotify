import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import StaffHeader from "../../components/StaffHeader";
import StaffNavbar from "../../components/StaffNavbar";
import StaffFooter from "../../components/StaffFooter";

const SupplyInventoryMonitoring = () => {

  const [inventory, setInventory] =
    useState([]);

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [updateData, setUpdateData] =
    useState({

      quantity_available: 0,

      inventory_status: "Available",

      remarks: ""

    });

  useEffect(() => {

    fetchInventory();

  }, []);

  // =====================================
  // FETCH INVENTORY
  // =====================================

  const fetchInventory = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/supply-inventory-monitoring"
        );

      setInventory(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // OPEN MANAGE PANEL
  // =====================================

  const handleManage = (item) => {

    setSelectedItem(item);

    setUpdateData({

      quantity_available:
        item.quantity_available,

      inventory_status:
        item.inventory_status,

      remarks:
        item.remarks || ""

    });

  };

  // =====================================
  // HANDLE INPUT
  // =====================================

  const handleChange = (e) => {

    setUpdateData({

      ...updateData,

      [e.target.name]:
        e.target.value

    });

  };

  // =====================================
  // UPDATE INVENTORY
  // =====================================

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        `http://localhost:5000/api/supply-inventory-monitoring/${selectedItem.inventory_id}`,
        updateData
      );

      fetchInventory();

      setSelectedItem(null);

    } catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // STATUS COLOR
  // =====================================

  const getStatusColor = (status) => {

    switch (status) {

      case "Available":
        return "#16a34a";

      case "Low Stock":
        return "#f59e0b";

      case "Out of Stock":
        return "#dc2626";

      case "Reserved":
        return "#2563eb";

      default:
        return "#64748b";

    }

  };

  // =====================================
  // STATUS BACKGROUND
  // =====================================

  const getStatusBackground = (status) => {

    switch (status) {

      case "Available":
        return "#dcfce7";

      case "Low Stock":
        return "#fef3c7";

      case "Out of Stock":
        return "#fee2e2";

      case "Reserved":
        return "#dbeafe";

      default:
        return "#e2e8f0";

    }

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
            Supply Inventory Monitoring
          </h1>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#a7f3d0", opacity: 0.9 }}>
            Monitor emergency supplies and update inventory availability during disaster response.
          </p>
        </div>
      </div>

      <StaffHeader />

      <StaffNavbar />

      <div style={{ padding: "40px max(20px, 4%)" }}>

        <div style={sectionStyle}>

          <h2 style={sectionHeaderStyle}>📦 Inventory Overview</h2>
          <p style={{ margin: "4px 0 24px 0", color: "#64748b", fontSize: "14px" }}>
            Track stock levels across all emergency supply categories.
          </p>

          {/* INVENTORY GRID */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px"
            }}
          >

            {inventory.map((item) => (

              <div
                key={item.inventory_id}
                style={{
                  background: "white",

                  borderRadius: "16px",

                  padding: "20px",

                  border: "1px solid #e2e8f0",

                  boxShadow:
                    "0 4px 12px rgba(0, 0, 0, 0.02)",

                  borderTop:
                    `6px solid ${getStatusColor(
                      item.inventory_status
                    )}`
                }}
              >

                {/* TOP */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "flex-start",
                    marginBottom: "16px"
                  }}
                >

                  <div>

                    <h3
                      style={{
                        margin: 0,
                        fontSize: "16px",
                        fontWeight: "800",
                        color: "#0f172a"
                      }}
                    >
                      {item.supply_name}
                    </h3>

                    <p
                      style={{
                        margin: "4px 0 0 0",
                        color: "#64748b",
                        fontSize: "13px"
                      }}
                    >
                      {item.supply_category}
                    </p>

                  </div>

                  <span
                    style={{
                      background:
                        getStatusBackground(
                          item.inventory_status
                        ),

                      color:
                        getStatusColor(
                          item.inventory_status
                        ),

                      padding:
                        "4px 10px",

                      borderRadius:
                        "20px",

                      fontSize: "11px",

                      fontWeight: "700",

                      whiteSpace: "nowrap"
                    }}
                  >
                    ● {
                      item.inventory_status
                    }
                  </span>

                </div>

                {/* QUANTITY */}

                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: "10px",
                    padding: "14px",
                    marginBottom: "14px"
                  }}
                >

                  <span style={labelStyle}>
                    Quantity Available
                  </span>

                  <h1
                    style={{
                      margin:
                        "8px 0 0 0",
                      fontSize: "26px",
                      fontWeight: "800",
                      color: "#0f172a"
                    }}
                  >
                    {
                      item.quantity_available
                    }{" "}
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#64748b"
                      }}
                    >
                      {
                        item.unit_measurement
                      }
                    </span>
                  </h1>

                </div>

                {/* DETAILS */}

                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: "10px",
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }}
                >

                  <div>

                    <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155" }}>
                      Storage Location
                    </span>

                    <p
                      style={{
                        margin:
                          "2px 0 0 0",
                        fontSize: "13px",
                        color: "#475569"
                      }}
                    >
                      {
                        item.storage_location
                      }
                    </p>

                  </div>

                  <div>

                    <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155" }}>
                      Expiration Date
                    </span>

                    <p
                      style={{
                        margin:
                          "2px 0 0 0",
                        fontSize: "13px",
                        color: "#475569"
                      }}
                    >
                      {
                        item.expiration_date
                          ? item.expiration_date
                          : "No expiration"
                      }
                    </p>

                  </div>

                  <div>

                    <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155" }}>
                      Remarks
                    </span>

                    <p
                      style={{
                        margin:
                          "2px 0 0 0",
                        fontSize: "13px",
                        color: "#475569"
                      }}
                    >
                      {
                        item.remarks ||
                        "No remarks available"
                      }
                    </p>

                  </div>

                </div>

                {/* ACTION BUTTON */}

                <button
                  onClick={() =>
                    handleManage(item)
                  }
                  style={{
                    marginTop: "16px",

                    width: "100%",

                    padding: "11px",

                    border: "none",

                    borderRadius: "10px",

                    background: "#059669",

                    color: "white",

                    cursor: "pointer",

                    fontWeight: "700",

                    fontSize: "14px",

                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#047857")}
                  onMouseLeave={(e) => (e.target.style.background = "#059669")}
                >
                  Manage Inventory
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* MANAGEMENT MODAL */}

        {selectedItem && (

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,

              background:
                "rgba(0,0,0,0.5)",

              display: "flex",

              justifyContent:
                "center",

              alignItems:
                "center",

              zIndex: 999
            }}
          >

            <div
              style={{
                background: "white",

                padding: "28px",

                borderRadius: "16px",

                width: "400px",

                boxShadow: "0 20px 50px rgba(0,0,0,0.2)"
              }}
            >

              <h2
                style={{
                  ...sectionHeaderStyle,
                  fontSize: "19px"
                }}
              >
                Manage Inventory
              </h2>

              <p
                style={{
                  color: "#64748b",
                  fontSize: "14px",
                  margin: "6px 0 0 0"
                }}
              >
                {
                  selectedItem.supply_name
                }
              </p>

              <form
                onSubmit={handleUpdate}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  marginTop: "20px"
                }}
              >

                <div>
                  <label style={labelStyle}>Quantity</label>
                  <input
                    type="number"
                    name="quantity_available"
                    value={
                      updateData.quantity_available
                    }
                    onChange={handleChange}
                    placeholder="Quantity"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Inventory Status</label>
                  <select
                    name="inventory_status"
                    value={
                      updateData.inventory_status
                    }
                    onChange={handleChange}
                    style={inputStyle}
                  >

                    <option>
                      Available
                    </option>

                    <option>
                      Low Stock
                    </option>

                    <option>
                      Out of Stock
                    </option>

                    <option>
                      Reserved
                    </option>

                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Remarks</label>
                  <textarea
                    name="remarks"
                    value={
                      updateData.remarks
                    }
                    onChange={handleChange}
                    placeholder="Remarks"
                    rows="3"
                    style={{ ...inputStyle, resize: "none" }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px"
                  }}
                >

                  <button
                    type="submit"
                    style={{
                      flex: 1,

                      padding: "11px",

                      border: "none",

                      borderRadius: "10px",

                      background: "#059669",

                      color: "white",

                      cursor: "pointer",

                      fontWeight: "700",

                      fontSize: "14px",

                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.target.style.background = "#047857")}
                    onMouseLeave={(e) => (e.target.style.background = "#059669")}
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedItem(null)
                    }
                    style={{
                      flex: 1,

                      padding: "11px",

                      border: "1px solid #fca5a5",

                      borderRadius: "10px",

                      background: "#fef2f2",

                      color: "#991b1b",

                      cursor: "pointer",

                      fontWeight: "700",

                      fontSize: "14px",

                      transition: "all 0.15s ease"
                    }}
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </div>

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

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  backgroundColor: "#f8fafc",
  boxSizing: "border-box"
};

export default SupplyInventoryMonitoring;
