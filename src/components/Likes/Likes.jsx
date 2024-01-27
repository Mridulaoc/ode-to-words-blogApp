import {useState,useEffect,useRef } from 'react'
import dbServices from '../../appwrite/config'
import { useDispatch, useSelector } from 'react-redux'
import { addLikes,deleteLikes,setLikes} from '../../store/likeSlicer'
import { PiHandsClappingFill,PiHandsClappingBold } from "react-icons/pi";
import { Query } from 'appwrite';


const Likes = ({post,userData}) => {
  const [liked,setLiked] = useState(false);
    
    const dispatch = useDispatch();
    const likesData = useSelector(state => state.likes.likes)
    console.log(likesData)

    const likesDataRef = useRef(likesData)

    const addLike = async()=>{
        const dbLikes = await dbServices.createLikes({
            post_id:post.$id,
            Liked_by:userData.$id||userData.userdata.$id
        })
        if(dbLikes){
            setLiked(true);
            console.log(dbLikes)
            dispatch(addLikes(dbLikes))
        }
    }

    const removeLike = async()=>{
        console.log(alreadyLiked.$id)
         console.log(likesData[0].$id)
         dbServices.deleteLike(alreadyLiked.$id).then((status)=>{
          // console.log(status)
          if(status){
            setLiked(false);
            
            dispatch(deleteLikes(alreadyLiked.$id));
          }
         })

    }



    useEffect(()=>{
       
        dbServices.getLikes([Query.equal("post_id",`${post.$id}`)]).then((likes) => {
          console.log(userData)
           
            if(likes){
                console.log(likes.documents)
                dispatch(setLikes(likes.documents))                
            }else{
                dispatch(setLikes([]))
            }
        })
    },[likesDataRef])

          let userId;
          let isAlreadyLiked;
          if(userData.$id === undefined){
             userId = userData.userdata.$id;
          }else{
             userId = userData.$id;
          }
          console.log(userId)
          console.log(likesData)
          let alreadyLiked = likesData.find(like => like.Liked_by === userId);
          if(alreadyLiked){
            isAlreadyLiked=true;
          } else{
            isAlreadyLiked =false;
          }

          


    
    // const isAlreadyLiked = likesData && userData ? userData.$id === likesData[0].Liked_by: false;
    console.log(likesData)
    console.log(userData.$id)
    // console.log(isAlreadyLiked)

    // const alreadyLiked = likesData.find(like=> like.Liked_by === userData.userdata.$id  )
 
    // console.log(alreadyLiked)
    // console.log(alreadyLiked[0].Liked_by)
    // const isAlreadyLiked = alreadyLiked[0].Liked_by === userData.$id || alreadyLiked[0].Liked_by === userData.userdata.$id
    // const isAlreadyLiked =  false;
   
  return (
    <div className='flex gap-3'>
      
      {
      isAlreadyLiked || liked ? 
        (<button onClick={removeLike}>
        <PiHandsClappingFill className='md:text-3xl text-lg cursor-pointer' />
        </button>):
        (<button onClick={addLike}>
        <PiHandsClappingBold className='md:text-3xl text-lg cursor-pointer' />
        </button>)
      }
      {likesData.length}
      
    </div>
  )
}

export default Likes
