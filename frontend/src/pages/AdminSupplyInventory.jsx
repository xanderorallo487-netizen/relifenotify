import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

// COMPONENTS
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminSupplyInventory = () => {

  const [inventory, setInventory] =
    useState([]);

  const [form, setForm] =
    useState({

      barangay_id: "",
      officer_id: "",

      barangay_name: "",
      municipality: "",

      supply_name: "",

      supply_category:
        "Food Packs",

      quantity_available: 0,

      unit_measurement: "",

      storage_location: "",

      expiration_date: "",

      inventory_status:
        "Available",

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
          "http://localhost:5000/api/admin-supply-inventory"
        );

      setInventory(response.data);

    }
    catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // HANDLE INPUT
  // =====================================

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

  };

  // =====================================
  // SUBMIT SUPPLY
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/admin-supply-inventory",
        form
      );

      fetchInventory();

      setForm({

        barangay_id: "",
        officer_id: "",

        barangay_name: "",
        municipality: "",

        supply_name: "",

        supply_category:
          "Food Packs",

        quantity_available: 0,

        unit_measurement: "",

        storage_location: "",

        expiration_date: "",

        inventory_status:
          "Available",

        remarks: ""

      });

    }
    catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // DELETE SUPPLY
  // =====================================

  const deleteSupply =
    async (id) => {

      try {

        await axios.delete(
          `http://localhost:5000/api/admin-supply-inventory/${id}`
        );

        fetchInventory();

      }
      catch (error) {

        console.error(error);

      }

    };

  // =====================================
  // STATUS COLOR
  // =====================================

  const getStatusColor = (
    status
  ) => {

    switch (status) {

      case "Available":
        return "#059669";

      case "Low Stock":
        return "#d97706";

      case "Out of Stock":
        return "#dc2626";

      case "Reserved":
        return "#2563eb";

      default:
        return "#64748b";

    }

  };

  // =====================================
  // STATUS BADGE BACKGROUND (visual only)
  // =====================================

  const getStatusBadgeBg = (
    status
  ) => {

    switch (status) {

      case "Available":
        return "#d1fae5";

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

    <div
      style={{
        backgroundColor: "#f4f7f6",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif"
      }}
    >

      {/* HEADER WRAPPER WITH FIX FOR OVERLAPPING TEXT */}
      <div style={{ paddingBottom: "10px", lineHeight: "1.4" }}>
        <Header
          title="Supply Inventory Management"
          subtitle="Add and manage emergency supplies and relief goods"
        />
      </div>

      {/* NAVBAR */}

      <Navbar />

      {/* CONTENT */}

      <div
        style={{
          padding: "40px max(20px, 4%)"
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "400px 1fr",
            gap: "32px",
            alignItems: "start"
          }}
        >

          {/* FORM */}

          <div style={sectionStyle}>

            <h2 style={sectionHeaderStyle}>📦 Add New Supply</h2>
            <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>
              Register a new emergency supply or relief good into inventory.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection:
                  "column",
                gap: "16px"
              }}
            >

              <div>
                <label style={labelStyle}>Barangay ID</label>
                <input
                  type="number"
                  name="barangay_id"
                  placeholder="Barangay ID"
                  value={form.barangay_id}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Officer ID</label>
                <input
                  type="number"
                  name="officer_id"
                  placeholder="Officer ID"
                  value={form.officer_id}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Barangay Name</label>
                <input
                  type="text"
                  name="barangay_name"
                  placeholder="Barangay Name"
                  value={form.barangay_name}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Municipality</label>
                <input
                  type="text"
                  name="municipality"
                  placeholder="Municipality"
                  value={form.municipality}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Supply Name</label>
                <input
                  type="text"
                  name="supply_name"
                  placeholder="Supply Name"
                  value={form.supply_name}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Supply Category</label>
                <select
                  name="supply_category"
                  value={form.supply_category}
                  onChange={handleChange}
                  style={inputStyle}
                >

                  <option>
                    Food Packs
                  </option>

                  <option>
                    Medicines
                  </option>

                  <option>
                    Hygiene Kits
                  </option>

                  <option>
                    Water Supply
                  </option>

                  <option>
                    Rescue Equipment
                  </option>

                  <option>
                    Clothing
                  </option>

                  <option>
                    Emergency Tools
                  </option>

                  <option>
                    Others
                  </option>

                </select>
              </div>

              <div>
                <label style={labelStyle}>Quantity Available</label>
                <input
                  type="number"
                  name="quantity_available"
                  placeholder="Quantity Available"
                  value={form.quantity_available}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Unit Measurement</label>
                <input
                  type="text"
                  name="unit_measurement"
                  placeholder="Unit Measurement"
                  value={form.unit_measurement}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Storage Location</label>
                <input
                  type="text"
                  name="storage_location"
                  placeholder="Storage Location"
                  value={form.storage_location}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Expiration Date</label>
                <input
                  type="date"
                  name="expiration_date"
                  value={form.expiration_date}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Inventory Status</label>
                <select
                  name="inventory_status"
                  value={form.inventory_status}
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
                  placeholder="Remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    minHeight: "90px",
                    resize: "vertical"
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background:
                    "#059669",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius:
                    "10px",
                  cursor:
                    "pointer",
                  fontWeight:
                    "700",
                  fontSize: "14px",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => (e.target.style.background = "#047857")}
                onMouseLeave={(e) => (e.target.style.background = "#059669")}
              >
                Add Supply →
              </button>

            </form>

          </div>

          {/* INVENTORY LIST */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px"
            }}
          >

            {inventory.map((item) => (

              <div
                key={item.inventory_id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  borderTop:
                    `6px solid ${getStatusColor(
                      item.inventory_status
                    )}`,
                  boxShadow:
                    "0 4px 12px rgba(0, 0, 0, 0.02)"
                }}
              >

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

                  <span
                    style={{
                      background:
                        getStatusBadgeBg(
                          item.inventory_status
                        ),
                      color: getStatusColor(
                        item.inventory_status
                      ),
                      padding:
                        "4px 10px",
                      borderRadius:
                        "20px",
                      fontSize:
                        "11px",
                      fontWeight: "700",
                      whiteSpace: "nowrap"
                    }}
                  >
                    ● {
                      item.inventory_status
                    }
                  </span>

                </div>

                <div
                  style={{
                    background: "#f8fafc",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    fontSize: "13px",
                    color: "#334155"
                  }}
                >

                  <p style={{ margin: 0 }}>
                    <strong>
                      Category:
                    </strong>{" "}
                    {
                      item.supply_category
                    }
                  </p>

                  <p style={{ margin: 0 }}>
                    <strong>
                      Quantity:
                    </strong>{" "}
                    {
                      item.quantity_available
                    }{" "}
                    {
                      item.unit_measurement
                    }
                  </p>

                  <p style={{ margin: 0 }}>
                    <strong>
                      Storage:
                    </strong>{" "}
                    {
                      item.storage_location
                    }
                  </p>

                  <p style={{ margin: 0 }}>
                    <strong>
                      Barangay:
                    </strong>{" "}
                    {
                      item.barangay_name
                    }
                  </p>

                  <p style={{ margin: 0 }}>
                    <strong>
                      Municipality:
                    </strong>{" "}
                    {
                      item.municipality
                    }
                  </p>

                  <p style={{ margin: 0 }}>
                    <strong>
                      Expiration:
                    </strong>{" "}
                    {
                      item.expiration_date
                    }
                  </p>

                  <p style={{ margin: 0 }}>
                    <strong>
                      Remarks:
                    </strong>{" "}
                    {
                      item.remarks
                    }
                  </p>

                </div>

                <button
                  onClick={() =>
                    deleteSupply(
                      item.inventory_id
                    )
                  }
                  style={{
                    marginTop:
                      "16px",
                    width: "100%",
                    padding:
                      "10px",
                    background:
                      "#fef2f2",
                    color:
                      "#991b1b",
                    border:
                      "1px solid #fca5a5",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                    fontWeight: "700",
                    fontSize: "13px",
                    transition: "all 0.15s ease"
                  }}
                >
                  Delete Supply
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <Footer />

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
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)"
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

export default AdminSupplyInventory;
