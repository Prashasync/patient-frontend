import MTrackerApi from '../apis/MTrackerApi';

const MTrackerService = {
  async getMoodScore(patient) {
    try {
      const response = await MTrackerApi.getMoodScore(patient);
      return response;
    } catch (error) {
      console.error('There was an error inside MTracker service', error);
      throw error;
    }
  },

  async getMoodHistory() {
    try {
      const response = await MTrackerApi.getMoodHistory();
      return response;
    } catch (error) {
      console.error('There was an error inside MTracker service', error);
      throw error;
    }
  },

  async getEmotions(patient_id) {
    try {
      const response = await MTrackerApi.getEmotions(patient_id);
      return response;
    } catch (error) {
      console.error('There was an error inside MTracker service:', error);
      throw error;
    }
  },

  async addMood(emotion) {
    try {
      const response = await MTrackerApi.addMood(emotion);
      console.log(response);
      return response;
    } catch (error) {
      console.error('There was an error inside MTracker service:', error);
    }
  },

  async addMoodCause(data) {
    try {
      return await MTrackerApi.addMoodCause(data);
    } catch (error) {
      console.error('There was an error inside the service: ', error);
      throw error;
    }
  },

  async addMoodNotes(data) {
    try {
      return await MTrackerApi.addMoodNotes(data);
    } catch (error) {
      console.error('Error inside the Service: ', error);
      throw error;
    }
  },

  async addMoodVoiceNote(data) {
    try {
      return await MTrackerApi.addMoodVoiceNote(data);
    } catch (error) {
      console.error('There was an error inside the service: ', error);
      throw error;
    }
  },
};

export default MTrackerService;
