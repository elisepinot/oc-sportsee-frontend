import { getAverageSessions } from '../api';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import PropTypes from 'prop-types';
import { AverageLengthModel } from '../data/modelisation';

export function useFetchAverageSessions() {
  const [searchParams] = useSearchParams(); //C'est un hook: c'est comme un composant, mais il fait uniquement de la logique

  const userId = parseInt(searchParams.get('user') || 12, 10); //If no user ID is specified, default to 12. 10: base 10 system

  const [averageSessionsData, setaverageSessionsData] = useState(null);

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
  // Use of custom hook useFetchAverageSessions to get average sessions data
  const averageSessions = useFetchAverageSessions();

  if (averageSessions === null) {
    return <div>Loading...</div>;
  }

  // Extract of sessions data from the custom hook
  // const data = averageSessions.sessions;

  // const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  // // Data formatting to adapt it to the graph
  // const formattedData = data.map((session, index) => ({
  //   // For each element of data,  a new object is created with the properties 'day' and 'sessionLength'.
  //   day: daysOfWeek[index],
  //   sessionLength: session.sessionLength,
  // }));

  // Créer une instance de la classe de modélisation
  const model = new AverageLengthModel(averageSessions.sessions);

  // Utiliser la méthode de la classe pour obtenir les données formatées
  const formattedData = model.getFormattedData();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='session-tooltip'>
          <p className='session-tooltip-min'>{`${payload[0].value} min`}</p>
        </div>
      );
    }
    return null;
  };

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
  };

  //A darker rectangle following the mouse on the chart
  const CustomCursor = ({ points }) => {
    return <Rectangle fill='#000000' opacity={0.2} x={points[0].x} width={500} height={300} />;
  };

  CustomCursor.propTypes = {
    points: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
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
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
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
