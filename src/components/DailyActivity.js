import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { getUserActivity } from '../api';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { DailyActivityModel } from '../data/modelisation';

export function useFetchUserActivity() {
  const [searchParams] = useSearchParams();
  const userId = parseInt(searchParams.get('user') || 12, 10); //If no user ID is specified, default to 12. 10: base 10 system

  const [userActivityData, setUserActivityData] = useState(null);

  const fetchUserActivityData = async () => {
    try {
      const user = await getUserActivity(userId);
      setUserActivityData(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  fetchUserActivityData();

  return userActivityData;
}

function DailyActivity() {
  const userActivity = useFetchUserActivity();

  if (userActivity === null) {
    // Les données ne sont pas encore chargées
    return <div>Loading...</div>;
  }

  // const data = userActivity.sessions;

  const model = new DailyActivityModel(userActivity.sessions);

  // Utiliser la méthode de la classe pour obtenir les données formatées
  const { formattedData, minWeight, maxWeight } = model.getFormattedData();

  // const minWeight = Math.min(...data.map((entry) => entry.kilogram)) - 1;
  // const maxWeight = Math.max(...data.map((entry) => entry.kilogram)) + 1;
  const formatXAxis = (value, index) => index + 1;
  // Remplace les dates par des nombres. Utilisé avec la propriété tickFormatter sur l'élément XAxis. Recharts s'attend à recevoir une fonction qui sera utilisée pour formater chaque tick sur l'axe des abscisses. Recharts prend soin de l'itération.
  const formatLegend = (value, entry) => (
    <span className={`legend-text ${entry.dataKey === 'kilogram' ? 'legend-kilogram' : ''}`}>
      {value}
    </span>
  );

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const weightValue = payload[0]?.value ?? 0; // Utilisation de la nullish coalescing operator
      const calorieValue = payload[1]?.value ?? 0;

      return (
        <div className='tooltipActivity'>
          <p>{weightValue + 'kg'}</p>
          <p>{calorieValue + 'kCal'}</p>
        </div>
      );
    }
    return null;
  };

  CustomToolTip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  };

  return (
    <div className='daily-activity'>
      <h3>Activités quotidiennes</h3>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={formattedData}
          margin={{ top: 23, bottom: 23, left: 0, right: 0 }}
          barGap={8}
          barSize={7}
        >
          <XAxis
            dataKey='day'
            axisLine={{ stroke: 'rgba(222, 222, 222, 1)' }}
            tickFormatter={formatXAxis}
            tickLine={false}
            domain={['1', '7']}
            tick={{
              dy: 16,
              style: { fontSize: '14px', fill: 'rgba(155, 158, 172, 1)' },
            }}
          />

          <YAxis dataKey='calories' yAxisId='left' hide={true} />
          <YAxis
            dataKey='kilogram'
            yAxisId='right'
            orientation='right'
            domain={[minWeight, maxWeight]}
            tickCount={4}
            tickLine={false}
            axisLine={{ stroke: 'transparent' }}
            tick={{
              dx: 16,
              style: { fontSize: '14px', fill: 'rgba(155, 158, 172, 1)' },
            }}
          />
          <Tooltip content={<CustomToolTip />} cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }} />

          <CartesianGrid stroke='rgba(222, 222, 222, 1)' strokeDasharray='3 3' vertical={false} />
          <Legend
            align='right'
            verticalAlign='top'
            iconSize={8}
            height={80}
            formatter={formatLegend}
            className='legend'
          />
          <Bar
            dataKey='kilogram'
            fill='rgba(40, 45, 48, 1)'
            name='Poids (kg)'
            legendType='circle'
            yAxisId='right'
            radius={[3, 3, 0, 0]}
          />
          <Bar
            dataKey='calories'
            fill='rgba(230, 0, 0, 1)'
            name='Calories brûlées (kCal)'
            legendType='circle'
            yAxisId='left'
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DailyActivity;
