import Image from "next/image"
import avatar from '../../../public/chat/avatar.png'
import classes from './changeImage.module.css'
import ImageUpload from "./ImageUpload"

const ChangeImage = () => {
    return (
        // <div className={classes.ChangeImage}>
        //     <Image alt="" src={avatar} className={classes.image}/>
        //     <div className={classes.imageHover}>Change</div>
        // </div>
        <div>
            <h1>
                <ImageUpload />
            </h1>
        </div>
    )
}

export default ChangeImage
