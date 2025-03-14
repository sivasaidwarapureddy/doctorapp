import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { userMenu } from "../Data/data";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const res = await axios.post(
        `${API_URL}/api/v1/doctor/getDoctorById`,
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time is required!");
      }

      dispatch(showLoading());
      
      const API_URL = process.env.REACT_APP_API_URL;
      const res = await axios.post(
        `${API_URL}/api/v1/user/book-appointment`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const API_URL = process.env.REACT_APP_API_URL;
      const res = await axios.post(
         `${API_URL}/api/v1/user/booking-availbility`,
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-2 w-50">
        {doctors && (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>
              <h4>Fees: {doctors.feesPerCunsaltation}</h4>
              <h4>
                Timings: {doctors.timings && doctors.timings[0]} - {""}
                {doctors.timings && doctors.timings[1]} {""}
              </h4>
              <div className="d-flex flex-column">
                <DatePicker
                  className="m-2"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    //  setIsAvailable(false);
                    setDate(moment(value).format("DD-MM-YYYY"));
                  }}
                />
                <TimePicker
                  className="m-2"
                  format="HH:mm"
                  onChange={(value) => {
                    //    setIsAvailable(false);
                    setTime(moment(value).format("HH:mm"));
                  }}
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>
                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book Now
                </button>
              </div>
            </h4>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
