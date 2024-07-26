import Image from "next/image"
import avatar from '../../../public/chat/avatar.png'
import classes from './changeImage.module.css'

const ChangeImage = () => {
    return (
        <div className={classes.ChangeImage}>
            <Image alt="" src={avatar} className={classes.image}/>
            <div className={classes.imageHover}>Change</div>
        </div>
    )
}

export default ChangeImage
