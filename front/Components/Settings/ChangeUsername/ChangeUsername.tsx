import classes from './changeUsername.module.css'

const ChangeUsername = () => {
    return (
        <div className={classes.changeUsername}>
            <h2 className={classes.title}>New Username : </h2>
            <input placeholder="Enter new Username" className={classes.input}/>
        </div>
    )
}

export default ChangeUsername
