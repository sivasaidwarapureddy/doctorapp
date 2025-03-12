import { useState, useEffect } from "react";
import React from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);


  const getDoctors = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      console.log("Fetching from:", `${API_URL}/api/v1/admin/getAllDoctors`); 
      const res = await axios.get(`${API_URL}/api/v1/admin/getAllDoctors?timestamp=${new Date().getTime()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
  
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  

const handleAccountStatus = async (record, status) => {
  try {
    const API_URL = process.env.REACT_APP_API_URL;
    const res = await axios.post(
      `${API_URL}/api/v1/admin/changeAccountStatus`,
      { doctorId: record._id, userId: record.userId, status: status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.success) {
      message.success(res.data.message);
    }
  } catch (error) {
    message.error("Something went Wrong");
  }
};

  useEffect(() => {
    getDoctors();
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName}
          {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },

    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div class="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>All Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
