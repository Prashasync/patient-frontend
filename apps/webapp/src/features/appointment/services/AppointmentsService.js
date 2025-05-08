import AppointmentsApi from "../api/AppointmentsApi";

const AppointmentsServices = {
  async getAppointments() {
    try {
      return await AppointmentsApi.getAppointments();
    } catch (error) {
      console.log("There was an error inside the Appointment Service", error);
      throw error;
    }
  },

  async getDoctorProfile() {
    try {
      return await AppointmentsApi.getDoctorProfile();
    } catch (error) {
      console.error(
        "There was an error inside the Appointment service: ",
        error
      );
      throw error;
    }
  },

  async getDoctorProfileById(id) {
    try {
      return await AppointmentsApi.getDoctorProfileById(id);
    } catch (error) {
      console.error("There was an error fetching the doctor", error);
      throw error;
    }
  },
};

export default AppointmentsServices;
