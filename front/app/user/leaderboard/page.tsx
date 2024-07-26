
import * as React from 'react';
import classes from './leaderBoard.module.css'
import Image from 'next/image';
import avatar from '../../../public/chat/avatar.png'
import ProgressBar from '@/Components/ProgressBar/ProgressBar';


const data = [
    { id: 1, firstName: 'John', lastName: 'Doe', rank: 'A' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', rank: 'B' },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', rank: 'C' },
    { id: 4, firstName: 'Robert', lastName: 'Brown', rank: 'A' },
    { id: 5, firstName: 'Michael', lastName: 'Davis', rank: 'B' },
    { id: 6, firstName: 'Emily', lastName: 'Miller', rank: 'C' },
    { id: 7, firstName: 'Daniel', lastName: 'Wilson', rank: 'A' },
    { id: 8, firstName: 'Laura', lastName: 'Moore', rank: 'B' },
    { id: 9, firstName: 'Matthew', lastName: 'Taylor', rank: 'C' },
    { id: 10, firstName: 'Sarah', lastName: 'Anderson', rank: 'A' },
    { id: 11, firstName: 'David', lastName: 'Thomas', rank: 'B' },
    { id: 12, firstName: 'Jessica', lastName: 'Jackson', rank: 'C' },
    { id: 13, firstName: 'James', lastName: 'White', rank: 'A' },
    { id: 14, firstName: 'Mary', lastName: 'Harris', rank: 'B' },
    { id: 15, firstName: 'Christopher', lastName: 'Martin', rank: 'C' },
    { id: 16, firstName: 'Patricia', lastName: 'Garcia', rank: 'A' },
    { id: 17, firstName: 'Brian', lastName: 'Martinez', rank: 'B' },
    { id: 18, firstName: 'Linda', lastName: 'Robinson', rank: 'C' },
    { id: 19, firstName: 'Thomas', lastName: 'Clark', rank: 'A' },
    { id: 20, firstName: 'Barbara', lastName: 'Rodriguez', rank: 'B' },
  ];  


const LeaderBoard: React.FC = () => {



    const ProgBar = () =>{
        return <div className={classes.progBar}>
        </div>
    }


  return (
    <div className={classes.LeaderBoard}>
        <h1>Welcome to My Page</h1>
        <div className={classes.leaders}>
            {data.map((item) =>{
                return<div className={classes.container}>
                <div className={classes.infos}>
                    <div className={classes.nameAndImage}>
                        <Image src={avatar} alt='' className={classes.avatar}/>
                        <h2>{item.id} - {item.firstName} {item.lastName}</h2>
                    </div>
                    <h2>#{item.rank}</h2>
                </div>
                <ProgBar/>
            </div>
            })}
        </div>
    </div>
  );
};

export default LeaderBoard;
