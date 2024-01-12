import { getUserPerformance } from '../api';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
// import PropTypes from 'prop-types';
import { RadarChart, PolarAngleAxis, PolarGrid, Text, Radar, ResponsiveContainer } from 'recharts';
function fetchUserPerformance() {
  const [searchParams] = useSearchParams();
  const userId = parseInt(searchParams.get('user') || 12, 10); //If no user ID is specified, default to 12. 10: base 10 system

  const [userPerformanceData, setUserPerformanceData] = useState(null);

  const fetchUserPerformanceData = async () => {
    try {
      const user = await getUserPerformance(userId);
      setUserPerformanceData(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  fetchUserPerformanceData();

  return userPerformanceData;
}

function Diagram() {
  const userPerformance = fetchUserPerformance();

  if (userPerformance === null) {
    // Les données ne sont pas encore chargées
    return <div>Loading...</div>;
  }

  // Formatting of performance's names so it appears in French.
  const formatKindName = (kind) => {
    if (kind === 'cardio') return 'Cardio';
    if (kind === 'energy') return 'Energie';
    if (kind === 'endurance') return 'Endurance';
    if (kind === 'strength') return 'Force';
    if (kind === 'speed') return 'Vitesse';
    if (kind === 'intensity') return 'Intensité';
    return kind;
  };

  // Reversing the data in order to display it from 6 to 1 (6. intensity, 5. speed, ...)
  // slice() returns a copy of the array
  const reversedData = userPerformance.data.slice().reverse();

  // Formatting of data to be displayed
  const radarData = reversedData.map((dataEntry) => ({
    kind: formatKindName(userPerformance.kind[dataEntry.kind]),
    value: dataEntry.value,
  }));

  // Customization of labels: add a space between each label and the chart + change the font size
  function customedLabels({ payload, x, y, cx, cy, ...rest }) {
    const customStyle = {
      fontSize: 12, // Ajoutez ici d'autres propriétés de style personnalisées
    };

    return (
      <Text
        {...rest}
        verticalAnchor='middle'
        y={y + (y - cy) / 10}
        x={x + (x - cx) / 10}
        style={{ ...rest, ...customStyle }}
      >
        {payload.value}
      </Text>
    );
  }

  return (
    <div className='diagram'>
      <ResponsiveContainer width='100%' height='100%'>
        <RadarChart cx='50%' cy='50%' outerRadius={'90'} data={radarData}>
          <PolarGrid
            radialLines={false}
            stroke='#FFFFFF'
            strokeWidth={1}
            polarRadius={[11.25, 22.5, 45, 67.5, 90]}
            gridType='polygon'
          />
          <PolarAngleAxis
            dataKey='kind'
            orient='inner'
            tickLine={false}
            stroke='#FFFFFF'
            tick={(props) => customedLabels(props)}
          />
          <Radar dataKey='value' fillOpacity={0.7} fill='rgb(255, 1, 1)' />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Diagram;
