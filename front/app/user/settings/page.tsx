import * as React from 'react';
import classes from './Settings.module.css'
import ChangeImage from '@/Components/Settings/ChangeImage/ChangeImage';
import ChangeUsername from '@/Components/Settings/ChangeUsername/ChangeUsername';


const LeaderBoard: React.FC = () => {

  return (
    <div className={classes.LeaderBoard}>
       <div><ChangeImage /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div><ChangeUsername /></div>
       <div className={classes.buttonContainer}>
        <button className={classes.button}>Update Infos</button>
       </div>
    </div>
  );
};

export default LeaderBoard;
