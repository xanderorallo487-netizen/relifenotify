import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import StaffHeader from "../../components/StaffHeader";
import StaffNavbar from "../../components/StaffNavbar";
import StaffFooter from "../../components/StaffFooter";

const LocalAnnouncements = () => {

  const [announcements, setAnnouncements] =
    useState([]);

  const [formData, setFormData] =
    useState({

      barangay_id: "",
      officer_id: "",

      barangay_name: "",
      municipality: "",

      title: "",
      content: "",

      category: "General",

      priority_level: "Normal",

      attachment: "",

      status: "Published"

    });

  useEffect(() => {

    fetchAnnouncements();

  }, []);

  // =====================================
  // FETCH ANNOUNCEMENTS
  // =====================================

  const fetchAnnouncements = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/local-announcements"
        );

      setAnnouncements(response.data);

    }
    catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // HANDLE INPUT CHANGE
  // =====================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  // =====================================
  // CREATE ANNOUNCEMENT
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/local-announcements",
        formData
      );

      alert(
        "Announcement posted successfully"
      );

      setFormData({

        barangay_id: "",
        officer_id: "",

        barangay_name: "",
        municipality: "",

        title: "",
        content: "",

        category: "General",

        priority_level: "Normal",

        attachment: "",

        status: "Published"

      });

      fetchAnnouncements();

    }
    catch (error) {

      console.error(error);

      alert(
        "Failed to post announcement"
      );

    }

  };

  // =====================================
  // PRIORITY COLOR
  // =====================================

  const getPriorityColor = (
    priority
  ) => {

    switch (priority) {

      case "Critical":
        return "#dc2626";

      case "High":
        return "#f59e0b";

      case "Normal":
        return "#2563eb";

      default:
        return "#16a34a";

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
            Local Announcements
          </h1>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#a7f3d0", opacity: 0.9 }}>
            Publish and manage community advisories
          </p>
        </div>
      </div>

      <StaffHeader />

      <StaffNavbar />

      <div style={{ padding: "40px max(20px, 4%)" }}>

        {/* CREATE FORM */}

        <div style={sectionStyle}>

          <h2 style={sectionHeaderStyle}>📢 Create Announcement</h2>
          <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>
            Publish a new advisory or notice to the community.
          </p>

          <form
            onSubmit={handleSubmit}
          >

            <div style={gridStyle}>

              <div>
                <label style={labelStyle}>Barangay ID</label>
                <input
                  type="number"
                  name="barangay_id"
                  placeholder="Barangay ID"
                  value={formData.barangay_id}
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
                  value={formData.officer_id}
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
                  value={formData.barangay_name}
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
                  value={formData.municipality}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Announcement Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Announcement Title"
                  value={formData.title}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={inputStyle}
                >

                  <option>
                    General
                  </option>

                  <option>
                    Safety Reminder
                  </option>

                  <option>
                    Evacuation
                  </option>

                  <option>
                    Weather Advisory
                  </option>

                  <option>
                    Emergency Alert
                  </option>

                  <option>
                    Community Notice
                  </option>

                </select>
              </div>

              <div>
                <label style={labelStyle}>Priority Level</label>
                <select
                  name="priority_level"
                  value={
                    formData.priority_level
                  }
                  onChange={handleChange}
                  style={inputStyle}
                >

                  <option>
                    Low
                  </option>

                  <option>
                    Normal
                  </option>

                  <option>
                    High
                  </option>

                  <option>
                    Critical
                  </option>

                </select>
              </div>

              <div>
                <label style={labelStyle}>Attachment URL</label>
                <input
                  type="text"
                  name="attachment"
                  placeholder="Attachment URL"
                  value={formData.attachment}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

            </div>

            <div style={{ marginTop: "16px" }}>
              <label style={labelStyle}>Announcement Content</label>
              <textarea
                name="content"
                placeholder="Announcement Content"
                value={formData.content}
                onChange={handleChange}
                rows="5"
                style={{
                  ...inputStyle,
                  width: "100%",
                  resize: "none"
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: "20px",
                background: "#059669",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => (e.target.style.background = "#047857")}
              onMouseLeave={(e) => (e.target.style.background = "#059669")}
            >
              Publish Announcement →
            </button>

          </form>

        </div>

        {/* ANNOUNCEMENT LIST */}

        <div style={sectionStyle}>

          <h2 style={sectionHeaderStyle}>📰 Published Announcements</h2>
          <p style={{ margin: "4px 0 20px 0", color: "#64748b", fontSize: "14px" }}>
            All community advisories posted so far.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "20px"
            }}
          >

            {announcements.map(
              (announcement) => (

                <div
                  key={
                    announcement.announcement_id
                  }
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",

                    borderLeft:
                      `6px solid ${getPriorityColor(
                        announcement.priority_level
                      )}`,

                    borderRadius: "16px",

                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)",

                    padding: "20px",

                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "flex-start"
                    }}
                  >

                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>
                      {
                        announcement.title
                      }
                    </h3>

                    <span
                      style={{
                        background:
                          `${getPriorityColor(
                            announcement.priority_level
                          )}1a`,

                        color:
                          getPriorityColor(
                            announcement.priority_level
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
                        announcement.priority_level
                      }
                    </span>

                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      background: "#e2e8f0",
                      color: "#334155",
                      padding: "3px 8px",
                      borderRadius: "6px"
                    }}>
                      {
                        announcement.barangay_name
                      }
                    </span>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      background: "#ecfdf5",
                      color: "#065f46",
                      padding: "3px 8px",
                      borderRadius: "6px"
                    }}>
                      {
                        announcement.category
                      }
                    </span>
                  </div>

                  <p style={{ margin: "6px 0 0 0", fontSize: "13.5px", color: "#475569", lineHeight: "1.5" }}>
                    {
                      announcement.content
                    }
                  </p>

                  {
                    announcement.attachment && (

                      <img
                        src={
                          announcement.attachment
                        }
                        alt="attachment"
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          marginTop: "6px",
                          border: "1px solid #e2e8f0"
                        }}
                      />

                    )
                  }

                  <p
                    style={{
                      margin: "10px 0 0 0",
                      color: "#64748b",
                      fontSize: "12px"
                    }}
                  >
                    Posted:
                    {" "}
                    {new Date(
                      announcement.posted_at
                    ).toLocaleString()}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

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

const gridStyle = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(250px, 1fr))",

  gap: "16px"

};

const inputStyle = {

  width: "100%",

  padding: "10px 14px",

  borderRadius: "8px",

  border:
    "1px solid #cbd5e1",

  fontSize: "14px",

  outline: "none",

  backgroundColor: "#f8fafc",

  boxSizing: "border-box"

};

export default LocalAnnouncements;
