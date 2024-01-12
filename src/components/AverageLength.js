import { getAverageSessions } from '../api';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

//useEffect garantit que fetchUserActivityData est appelé après le rendu initial du composant
//et les données seront mises à jour lorsque la requête asynchrone sera résolue.
export function fetchAverageSessions() {
  const [searchParams] = useSearchParams();
  const userId = parseInt(searchParams.get('user') || 12, 10); //If no user ID is specified, default to 12. 10: base 10 system

  const [averageSessionsData, setaverageSessionsData] = useState(null);

  // useEffect(() => {
  //   const fetchAverageSessionsData = async () => {
  //     try {
  //       const user = await getAverageSessions(userId);
  //       setaverageSessionsData(user);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };
  //   fetchAverageSessionsData();
  // }, [userId]);

  const fetchAverageSessionsData = async () => {
    try {
      const user = await getAverageSessions(userId);
      setaverageSessionsData(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  fetchAverageSessionsData();

  return averageSessionsData;
}
function AverageLength() {
  const averageSessions = fetchAverageSessions();

  if (averageSessions === null) {
    // Les données ne sont pas encore chargées
    return <div>Loading...</div>;
  }

  const data = averageSessions.sessions;

  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  const formattedData = data.map((session, index) => ({
    // Pour chaque élément dans averageSessions, crée un nouvel objet avec les propriétés suivantes :
    // La propriété 'name' est définie comme le jour de la semaine correspondant.
    day: daysOfWeek[index],
    // La propriété 'sessionLength' est définie comme la longueur de session du jour.
    sessionLength: session.sessionLength,
  }));

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='tooltipAverage'>
          <p>{payload[0].value + ' min'}</p>
        </div>
      );
    }
    return null;
  };

  CustomToolTip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number, // Change le type en fonction du type de valeur que vous attendez
      }),
    ),
  };

  return (
    <div className='average-length'>
      <h3>Durée moyenne des sessions</h3>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          width='1OO%'
          height='100%'
          data={formattedData}
          margin={{ top: 134, bottom: 16, left: 16, right: 16 }}
        >
          <XAxis
            dataKey='day'
            tickLine={false}
            axisLine={false}
            tick={{
              dy: 16,
              style: { fill: '#fff', opacity: '.5', fontSize: '12px' },
            }}
          />
          <YAxis dataKey='sessionLength' hide={true} domain={['dataMin-10', 'dataMax+10']} />
          <Tooltip content={<CustomToolTip />} cursor={false} />
          <Line
            type='natural'
            dataKey='sessionLength'
            stroke='url(#colorUv)'
            strokeWidth={2}
            dot={false}
            activeDot={{
              stroke: '#FFFFFF',
              strokeWidth: 8,
              r: 4,
            }}
          />
          <defs>
            <linearGradient id='colorUv' x1='0%' y1='0' x2='100%' y2='0'>
              <stop offset='0%' stopColor='rgba(255, 255, 255, 0.3)' />
              <stop offset='20%' stopColor='rgba(255, 255, 255, 0.4)' />
              <stop offset='40%' stopColor='rgba(255, 255, 255, 0.5)' />
              <stop offset='60%' stopColor='rgba(255, 255, 255, 0.6)' />
              <stop offset='100%' stopColor='rgba(255, 255, 255, 1)' />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AverageLength;
