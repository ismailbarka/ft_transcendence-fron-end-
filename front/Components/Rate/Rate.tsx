"use client"
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import classes from './rate.module.css'

const data = [
  { name: 'Group A', value: 30 },
  { name: 'Group B', value: 40 },
];

const COLORS = ['#102C57', '#571010'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Rate = () => {
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <h1>Weekly Reward</h1>
            </div>
            <div className={classes.chartContainer}>
              <div className={classes.chart}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              </div>
              <div className={classes.key}>
                <div className={classes.winKey}>
                  <img className={classes.winBox}></img>
                  <p>Wins</p>
                </div>
                <div className={classes.loseKey}>
                  <img className={classes.loseBox}></img>
                  <p>Loses</p>
                </div>
              </div>
            </div>
        </div>
    )
}

export default Rate
