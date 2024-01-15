import { getAverageSessions } from '../api';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import PropTypes from 'prop-types';

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
  const averageSessions = useFetchAverageSessions();

  if (averageSessions === null) {
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

  function CustomCursor(props) {
    // Destructuration des propriétés 'points' et 'width' depuis les props.
    const { points, width } = props;
    // Destructuration des coordonnées 'x' et 'y' depuis le premier point dans 'points'.
    const { x, y } = points[0];
    // Retourne un composant Rectangle (un rectangle représentant un curseur personnalisé).
    return (
      <Rectangle
        fill='#000'
        stroke='#000'
        x={x} // Position horizontale du coin supérieur gauche du rectangle.
        y={y} // Position verticale du coin supérieur gauche du rectangle.
        width={width} // Largeur du rectangle.
        height={200} // Hauteur du rectangle.
        className='custom-cursor'
      />
    );
  }

  CustomCursor.propTypes = {
    points: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    ),
    width: PropTypes.number,
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
          <Tooltip
            // Décalage du tooltip par rapport au point de données
            offset={10}
            // Style du contenu du tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: 'none',
              textAlign: 'center',
            }}
            // Style du conteneur du tooltip
            wrapperStyle={{
              outline: 'none',
            }}
            // Style des éléments du tooltip (par exemple, ligne de données)
            itemStyle={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#000',
              lineHeight: '0',
              opacity: 0.5,
            }}
            // Fonction de formatage de l'étiquette du tooltip (vide dans ce cas)
            labelFormatter={() => ''}
            // Séparateur entre l'étiquette et la valeur dans le tooltip
            separator=''
            // Fonction de formatage de la valeur dans le tooltip
            formatter={(value) => [`${value} min`, '']}
            // Curseur personnalisé pour le tooltip
            cursor={<CustomCursor />}
          />

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
