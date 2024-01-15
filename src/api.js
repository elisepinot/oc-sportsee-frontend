import axios from 'axios';
import mockData from './data/db.json';

const apiUrl = 'http://localhost:3000';
const useMockData = false; //If "true", mocked data will be used. Otherwise, real data (from API) will be used.

async function getUser(userId) {
  try {
    if (useMockData) {
      const mockUsers = mockData.user_main_data;
      const user = mockUsers.find((u) => u.id === userId);
      return user;
    }
    const response = await axios.get(`${apiUrl}/user/${userId}`);
    const apiUserData = response.data.data;
    return apiUserData;
  } catch (error) {
    throw new Error('Error fetching user data', error);
  }
}
async function getUserActivity(userId) {
  try {
    if (useMockData) {
      const mockActivity = mockData.user_activity;
      const userActivity = mockActivity.find((activity) => activity.userId === userId);
      return userActivity;
    }
    const response = await axios.get(`${apiUrl}/user/${userId}/activity`);
    const apiUserData = response.data.data;
    return apiUserData;
  } catch (error) {
    throw new Error('Error fetching user activity data', error);
  }
}

async function getAverageSessions(userId) {
  try {
    if (useMockData) {
      const mockAverageSessions = mockData.user_average_sessions;
      const averageSessions = mockAverageSessions.find((sessions) => sessions.userId === userId);
      return averageSessions;
    }
    const response = await axios.get(`${apiUrl}/user/${userId}/average-sessions`);
    const apiUserData = response.data.data;
    return apiUserData;
  } catch (error) {
    throw new Error('Error fetching average sessions data', error);
  }
}

async function getUserPerformance(userId) {
  try {
    if (useMockData) {
      const mockPerformance = mockData.user_performance;
      const userPerformance = mockPerformance.find((performance) => performance.userId === userId);
      return userPerformance;
    }
    const response = await axios.get(`${apiUrl}/user/${userId}/performance`);
    const apiUserData = response.data.data;
    return apiUserData;
  } catch (error) {
    throw new Error('Error fetching user performance data', error);
  }
}
export { getUser, getUserActivity, getAverageSessions, getUserPerformance };
