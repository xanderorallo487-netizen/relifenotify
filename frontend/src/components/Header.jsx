import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header({
  title,
  subtitle,
}) {

  const navigate =
    useNavigate();

  // GLOBAL LOGOUT
  const handleLogout =
    async () => {

      try {

        // GET USER DATA
        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        // SAVE AUDIT LOG
        if (user) {

          await axios.post(
            "http://localhost:5000/api/audit-logs/create",
            {
              action_type:
                "LOGOUT",

              description:
                `${user.full_name} logged out from the system`,

              performed_by:
                user.full_name,
            }
          );

        }

      } catch (error) {

        console.error(
          "Failed to save logout audit:",
          error
        );

      }

      // CLEAR STORAGE
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      // REDIRECT TO LOGIN
      navigate("/");

    };

  return (

    <div
      style={{
        backgroundColor:
          "#ffffff",
        padding:
          "20px 30px",
        display: "flex",
        justifyContent:
          "space-between",
        alignItems:
          "center",
        boxShadow:
          "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >

      {/* TITLE SECTION */}
      <div>

        <h1
          style={{
            margin: 0,
            color:
              "#1e293b",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            margin:
              "5px 0 0",
            color:
              "#64748b",
          }}
        >
          {subtitle}
        </p>

      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={
          handleLogout
        }
        style={{
          padding:
            "10px 20px",
          border: "none",
          backgroundColor:
            "#dc3545",
          color: "#fff",
          borderRadius:
            "5px",
          cursor:
            "pointer",
          fontWeight:
            "bold",
          fontSize:
            "14px",
        }}
      >
        Logout
      </button>

    </div>

  );

}

export default Header;