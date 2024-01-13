import { useFetchUserData } from './dashboard';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

function Score() {
  const userData = useFetchUserData();
  const userScore = userData?.score || userData?.todayScore;
  const data = [
    { name: 'Score', value: userScore * 100 },
    { name: 'Score restant', value: 100 - userScore * 100 },
  ];

  return (
    <div className='score'>
      <h3 className='score-title'>Score</h3>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey='value'
            cx='50%'
            cy='50%'
            innerRadius={90}
            outerRadius={100}
            startAngle={90}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.name === 'Score' ? 'rgba(255, 0, 0, 1)' : 'white'}
                cornerRadius={10}
              />
            ))}
          </Pie>
          {/* Partie blanche */}
          <Pie
            data={[{ value: 100 - userScore * 100 }]}
            dataKey={'value'}
            cx='50%'
            cy='50%'
            innerRadius={0}
            outerRadius={90}
            fill='white'
            isAnimationActive={false}
          />
          <text
            className='score-percent'
            x='50%'
            y='40%'
            textAnchor='middle'
            alignmentBaseline='middle'
            fill='black'
          >
            {userScore * 100}%
          </text>
          <text x='50%' y='50%' textAnchor='middle' alignmentBaseline='middle' fill='black'>
            de votre
          </text>
          <text x='50%' y='60%' textAnchor='middle' alignmentBaseline='middle' fill='black'>
            objectif
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Score;
