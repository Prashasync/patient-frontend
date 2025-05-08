import axios from "axios";

const AppointmentsApi = {
  async getAppointments() {
    try {
      return await axios.get(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/appointments`,
        { withCredentials: true }
      );
    } catch (error) {
      console.error("There was an error inside making this API request", error);
      throw error;
    }
  },

  async getDoctorProfile() {
    try {
      return await axios.get(
        `${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/doctors-profile`,
        { withCredentials: true }
      );
    } catch (error) {
      console.error("There was an error inside making this API request", error);
      throw error;
    }
  },

  async getDoctorProfileById(id) {
    try {
      return await axios.get(`${process.env.REACT_APP_PATIENT_SERVER_URL}/api/v1/patient/doctors-profile/${id}`);
    } catch (error) {
      console.error("There was an error making the API call for doctor", error);
      throw error;
    }
  }
};

export default AppointmentsApi;
