import React, { Children } from 'react'
import classes from './page.module.css'
import NavBar from '../../Components/NavBar/NavBar'
import Menu from '@/Components/Menu/Menu'
const layout = () => {
  return (
    <div className={classes.main}>
        <NavBar/>
        <div className={classes.container}>
            <div className={classes.nemu}>
                <Menu/>
            </div>
            <div className={classes.Content}>
                {/* {Children} */}
                children
            </div>
        </div>
    </div>
  )
}

export default layout
