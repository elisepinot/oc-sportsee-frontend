import axios from 'axios';
import mockData from './data/db.json';

const apiUrl = 'http://localhost:3000';
const useMockData = true; //If "true", mocked data will be used. Otherwise, real data (from API) will be used.

async function getUser(userId) {
  try {
    if (useMockData) {
      const mockUsers = mockData.user_main_data;
      const user = mockUsers.find((u) => u.id === userId);
      return user;
    } else {
      const response = await axios.get(`${apiUrl}/user/${userId}`);
      return response.data;
    }
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
    } else {
      const response = await axios.get(`${apiUrl}/user/${userId}/activity`);
      return response.data;
    }
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
    } else {
      const response = await axios.get(`${apiUrl}/user/${userId}/average-sessions`);
      return response.data;
    }
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
    } else {
      const response = await axios.get(`${apiUrl}/user/${userId}/performance`);
      return response.data;
    }
  } catch (error) {
    throw new Error('Error fetching user performance data', error);
  }
}
export { getUser, getUserActivity, getAverageSessions, getUserPerformance };
