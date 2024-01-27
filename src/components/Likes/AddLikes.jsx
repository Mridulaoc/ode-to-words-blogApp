import  { useState } from 'react'
import {PiHandsClappingBold} from "react-icons/pi";
import dbServices from '../../appwrite/config';

const AddLikes = ({userData,likes}) => {

    const [alreadyLiked,setAlreadyLiked] =useState(false);

    const addLike = () =>{
        if(userData===likes.Liked_by){
            let id = likes.post_id + likes.Liked_by;
            console.log(id)
            // dbServices.deleteFile(likes.Liked_by)
        setAlreadyLiked(true);
        console.log(alreadyLiked)
        }else{
            setAlreadyLiked(false);
            console.log(false)
        }
    }
  return (
    <div>
         <button onClick={()=>addLike()}>
        <PiHandsClappingBold className='md:text-3xl text-lg cursor-pointer' />
        </button>
      
    </div>
  )
}

export default AddLikes
