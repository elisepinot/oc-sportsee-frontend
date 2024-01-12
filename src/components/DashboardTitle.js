// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { getUser } from '../api';
// import { useSearchParams } from 'react-router-dom';
import { fetchUserData } from './dashboard';

function DashboardTitle() {
  //Hook useSearchParams() to extract the user ID from the URL
  // const [searchParams] = useSearchParams();
  // const userId = parseInt(searchParams.get('user') || 12, 10); //If no user ID is specified, default to 12. 10: base 10 system

  // const [userData, setUserData] = useState(null);

  // const fetchData = async () => {
  //   try {
  //     const user = await getUser(userId);
  //     setUserData(user);
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };

  // fetchData();
  const userData = fetchUserData();

  return <h1 className='dashboard-title'>Bonjour {userData?.userInfos?.firstName || ''}</h1>;
}

export default DashboardTitle;
