import DailyActivity from './DailyActivity.js';
import AverageLength from './AverageLength.js';
import Diagram from './Diagram.js';
import Score from './Score.js';
import FoodIndicator from './FoodIndicator.js';
import caloriesIcon from '../assets/calories-icon.svg';
import proteinsIcon from '../assets/protein-icon.svg';
import carbsIcon from '../assets/carbs-icon.svg';
import fatIcon from '../assets/fat-icon.svg';
// import DashboardTitle from './DashboardTitle.js';
import { useState } from 'react';
import { getUser } from '../api';
import { useSearchParams } from 'react-router-dom';

export function fetchUserData() {
  const [searchParams] = useSearchParams();
  const userId = parseInt(searchParams.get('user') || 12, 10); //If no user ID is specified, default to 12. 10: base 10 system

  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const user = await getUser(userId);
      setUserData(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchData();

  return userData;
}

function Dashboard() {
  const userData = fetchUserData();

  return (
    <main>
      {/* <DashboardTitle /> */}
      <h1 className='dashboard-title'>Bonjour {userData?.userInfos?.firstName || ''}</h1>;
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      <div className='analytics-grid'>
        <DailyActivity />
        <AverageLength />
        <Diagram />
        <Score />
        <section className='food-indicators'>
          <FoodIndicator
            icon={caloriesIcon}
            title='Calories'
            value={userData?.keyData?.calorieCount + 'kCal' || ''}
            className='calories'
          />
          <FoodIndicator
            icon={proteinsIcon}
            title='Protéines'
            value={userData?.keyData?.proteinCount + 'g' || ''}
            className='proteins'
          />
          <FoodIndicator
            icon={carbsIcon}
            title='Glucides'
            value={userData?.keyData?.carbohydrateCount + 'g' || ''}
            className='carbs'
          />
          <FoodIndicator
            icon={fatIcon}
            title='Lipides'
            value={userData?.keyData?.lipidCount + 'g' || ''}
            className='fat'
          />
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
