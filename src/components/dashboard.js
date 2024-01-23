import DailyActivity from './DailyActivity.js';
import AverageLength from './AverageLength.js';
import Diagram from './Diagram.js';
import Score from './Score.js';
import FoodIndicator from './FoodIndicator.js';
import caloriesIcon from '../assets/calories-icon.svg';
import proteinsIcon from '../assets/protein-icon.svg';
import carbsIcon from '../assets/carbs-icon.svg';
import fatIcon from '../assets/fat-icon.svg';
import { useState, useEffect } from 'react';
// import { useState } from 'react';
import { getUser } from '../api';
import { useSearchParams } from 'react-router-dom';

export function useFetchUserData() {
  const [searchParams] = useSearchParams();
  const userId = parseInt(searchParams.get('user') || 12, 10);

  const [userData, setUserData] = useState({
    data: null,
    error: null,
  });

  //Need useEffect here to fetch data only when userId changes. Otherwise it will fetch data on every render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(userId);
        setUserData({ data: user, error: null });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData({ data: null, error });
      }
    };

    fetchData();
  }, [userId]);

  return userData;
}

function Dashboard() {
  // const userData = useFetchUserData();
  const { data: userData, error } = useFetchUserData();

  if (error || !userData) {
    return <p className='error'>Error 404</p>;
  }

  return (
    <main>
      <h1 className='dashboard-title'>Bonjour {userData?.userInfos?.firstName || ''}</h1>
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

//    Lorsque le hook useFetchUserData est utilisé dans le composant Dashboard, il crée un état local (userData) qui contient les données de l'utilisateur et les erreurs potentielles.

//À chaque fois que cet état local change (en raison d'une nouvelle récupération de données ou d'une erreur), le composant Dashboard est programmé pour être rendu à nouveau par React.

//Le composant Dashboard réagit à ces changements en fonction des conditions que vous avez définies. Par exemple, si une erreur est présente ou si les données d'utilisateur ne sont pas encore disponibles, le composant rend un message d'erreur. Sinon, il rend le reste du contenu du composant avec les données d'utilisateur.
