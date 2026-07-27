import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import axios from "axios";

const StaffHeader = () => {

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const [messages, setMessages] =
    useState([]);

  const [showMessages, setShowMessages] =
    useState(false);

  const [replyInputs, setReplyInputs] =
    useState({});

  const [sendingId, setSendingId] =
    useState(null);

  // =====================================
  // FETCH MESSAGES
  // =====================================

  useEffect(() => {

    if (user?.id) {

      fetchMessages();

      const interval =
        setInterval(() => {

          fetchMessages();

        }, 5000);

      return () =>
        clearInterval(interval);

    }

  }, []);

  const fetchMessages =
    async () => {

      try {

        const response =
          await axios.get(
            `http://localhost:5000/api/admin-messages/${user?.id}`
          );

        setMessages(
          response.data || []
        );

      } catch (error) {

        console.error(
          "Fetch messages error:",
          error
        );

      }

    };

  // =====================================
  // HANDLE REPLY INPUT
  // =====================================

  const handleReplyChange =
    (messageId, value) => {

      setReplyInputs({

        ...replyInputs,

        [messageId]: value

      });

    };

  // =====================================
  // SEND REPLY
  // =====================================

  const sendReply =
    async (msg) => {

      const replyText =
        replyInputs[
          msg.message_id
        ];

      if (
        !replyText ||
        replyText.trim() === ""
      ) {

        alert(
          "Please enter a reply message."
        );

        return;

      }

      try {

        setSendingId(
          msg.message_id
        );

        // SEND REPLY

        await axios.post(
          "http://localhost:5000/api/admin-messages/reply",
          {

            sender_id:
              user?.id,

            sender_name:
              user?.full_name,

            receiver_id:
              msg.sender_id,

            message:
              replyText

          }
        );

        // MARK MESSAGE AS READ

        await axios.put(
          `http://localhost:5000/api/admin-messages/read/${msg.message_id}`
        );

        // REMOVE MESSAGE FROM UI

        setMessages(
          (prev) =>
            prev.filter(
              (item) =>
                item.message_id !==
                msg.message_id
            )
        );

        // CLEAR INPUT

        setReplyInputs(
          (prev) => {

            const updated = {
              ...prev
            };

            delete updated[
              msg.message_id
            ];

            return updated;

          }
        );

        alert(
          "Reply sent successfully."
        );

      } catch (error) {

        console.error(
          "Reply error:",
          error
        );

        alert(
          "Failed to send reply."
        );

      } finally {

        setSendingId(null);

      }

    };

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout =
    async () => {

      try {

        if (user) {

          await axios.post(
            "http://localhost:5000/api/audit-logs/create",
            {

              action_type:
                "LOGOUT",

              description:
                `${user.full_name} logged out from the staff portal`,

              performed_by:
                user.full_name

            }
          );

        }

      } catch (error) {

        console.error(error);

      }

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      navigate("/");

    };

  return (

    <div
      style={{
        background: "#0f172a",
        color: "white",
        padding: "18px 30px",
        display: "flex",
        justifyContent:
          "space-between",
        alignItems:
          "center",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.1)",
        position: "relative"
      }}
    >

      {/* LEFT SIDE */}

      <div>

        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold"
          }}
        >
          RELIEFNOTIFY
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: "13px",
            opacity: 0.8
          }}
        >
          Staff Emergency Management Portal
        </p>

      </div>

      {/* RIGHT SIDE */}

      <div
        style={{
          display: "flex",
          alignItems:
            "center",
          gap: "15px"
        }}
      >

        {/* MESSAGE BUTTON */}

        <div
          style={{
            position: "relative"
          }}
        >

          <button
            onClick={() =>
              setShowMessages(
                !showMessages
              )
            }
            style={{
              background:
                "#1e293b",
              border: "none",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              padding: "10px 14px",
              borderRadius: "10px",
              position: "relative"
            }}
          >
            💬
          </button>

          {/* NOTIFICATION */}

          {messages.length > 0 && (

            <div
              style={{
                position:
                  "absolute",
                top: "-6px",
                right: "-6px",
                background:
                  "#dc2626",
                color: "white",
                width: "22px",
                height: "22px",
                borderRadius:
                  "50%",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                fontSize: "11px",
                fontWeight:
                  "bold"
              }}
            >
              {
                messages.length
              }
            </div>

          )}

          {/* MESSAGE DROPDOWN */}

          {showMessages && (

            <div
              style={{
                position:
                  "absolute",
                top: "55px",
                right: 0,
                width: "360px",
                maxHeight:
                  "450px",
                overflowY:
                  "auto",
                background:
                  "white",
                color: "#0f172a",
                borderRadius:
                  "15px",
                padding: "15px",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,0.2)",
                zIndex: 999
              }}
            >

              <h3
                style={{
                  marginTop: 0,
                  marginBottom:
                    "15px"
                }}
              >
                Admin Messages
              </h3>

              {messages.length === 0 ? (

                <p
                  style={{
                    textAlign:
                      "center",
                    color:
                      "#64748b"
                  }}
                >
                  No new messages.
                </p>

              ) : (

                messages.map(
                  (msg) => (

                    <div
                      key={
                        msg.message_id
                      }
                      style={{
                        border:
                          "1px solid #e2e8f0",
                        borderRadius:
                          "12px",
                        padding:
                          "14px",
                        marginBottom:
                          "15px",
                        background:
                          "#f8fafc"
                      }}
                    >

                      <div
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "center"
                        }}
                      >

                        <h4
                          style={{
                            margin: 0
                          }}
                        >
                          {
                            msg.sender_name
                          }
                        </h4>

                        <span
                          style={{
                            fontSize:
                              "11px",
                            color:
                              "#64748b"
                          }}
                        >
                          {new Date(
                            msg.created_at
                          ).toLocaleString()}
                        </span>

                      </div>

                      <p
                        style={{
                          margin:
                            "10px 0",
                          fontSize:
                            "14px",
                          lineHeight:
                            "1.5"
                        }}
                      >
                        {
                          msg.message
                        }
                      </p>

                      {/* REPLY BOX */}

                      <textarea
                        placeholder="Type your reply..."
                        value={
                          replyInputs[
                            msg.message_id
                          ] || ""
                        }
                        onChange={(e) =>
                          handleReplyChange(
                            msg.message_id,
                            e.target.value
                          )
                        }
                        style={{
                          width: "100%",
                          minHeight:
                            "80px",
                          padding:
                            "10px",
                          borderRadius:
                            "8px",
                          border:
                            "1px solid #cbd5e1",
                          resize:
                            "none",
                          marginTop:
                            "10px"
                        }}
                      />

                      <button
                        onClick={() =>
                          sendReply(
                            msg
                          )
                        }
                        disabled={
                          sendingId ===
                          msg.message_id
                        }
                        style={{
                          marginTop:
                            "10px",
                          width: "100%",
                          padding:
                            "10px",
                          background:
                            sendingId ===
                            msg.message_id
                              ? "#94a3b8"
                              : "#2563eb",
                          color: "white",
                          border: "none",
                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                          fontWeight:
                            "600"
                        }}
                      >
                        {sendingId ===
                        msg.message_id
                          ? "Sending..."
                          : "Send Reply"}
                      </button>

                    </div>

                  )
                )

              )}

            </div>

          )}

        </div>

        {/* USER */}

        <div
          style={{
            textAlign: "right"
          }}
        >

          <p
            style={{
              margin: 0,
              fontWeight:
                "600",
              fontSize:
                "14px"
            }}
          >
            {
              user?.full_name ||
              "Barangay Staff"
            }
          </p>

          <p
            style={{
              margin: 0,
              fontSize:
                "12px",
              opacity: 0.7
            }}
          >
            Barangay Staff
          </p>

        </div>

        {/* LOGOUT */}

        <button
          onClick={
            handleLogout
          }
          style={{
            background:
              "#dc2626",
            color: "white",
            border: "none",
            padding:
              "10px 18px",
            borderRadius:
              "8px",
            cursor:
              "pointer",
            fontWeight:
              "600",
            fontSize:
              "14px"
          }}
        >
          Logout
        </button>

      </div>

    </div>

  );

};

export default StaffHeader;