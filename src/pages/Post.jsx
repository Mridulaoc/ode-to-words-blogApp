import  { useEffect, useRef, useState } from 'react'
import dbServices from '../appwrite/config'
import { Button, Container,Comments,Likes} from '../components/index'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { Query } from 'appwrite'
import { setLikes } from '../store/likeSlicer'
import { FaRegComment } from "react-icons/fa6";


const Post = () => {
  const [post, setPost]=useState(null);  
  const [displayComment,setDisplayComment]= useState(false);
  const {slug} = useParams();
  const navigate = useNavigate();
  const userData = useSelector(state=>state.auth.userData);
  const commentsData = useSelector((state)=>{return state.comments.comments});
  const likesData = useSelector(state=> state.likes.likes);
 
 
 
  useEffect(()=>{
    if (slug){      
      dbServices.getPost(slug).then((post)=>{           
        if(post) setPost(post);         
        else navigate('/');        
      })
    }
    else navigate('/')      
  },[slug, navigate])

  console.log(post)

  const isAuthor = post && userData ? post.username === userData.$id: false;
  console.log(isAuthor)
  
  const deletePost = ()=>{
    dbServices.deletePost(post.$id).then((status)=>{
      if(status){
        console.log(status)
        dbServices.deleteFile(post.featuredImage);
        navigate('/')
      }
    })}
    

    if(post){
      const date= new Date(post.$createdAt);      
      const options ={
        day :"numeric",
        month:"long",
        year:"numeric"
      }
      var formattedDate =date.toLocaleString("en-us",options)
      let createdDate = formattedDate;
      console.log(createdDate)
   }



  const isAlreadyLiked = likesData && userData ? userData.$id === likesData.Liked_by: false;
  console.log(isAlreadyLiked)
 

  return post ? (
    <div>
      <Container>
        <div className='flex flex-col align-center gap-10 w-4/5 mx-auto border border-gray-600 my-20'>
         <img src={dbServices.getFilePreview(post.featuredImage)} alt={post.title} className='w-full border border-gray-400 '/>
         {
          isAuthor && (
            <div className='flex gap-3 mx-auto'>
                 <Link to={`/edit-post/${post.$id}`}>
              <Button className='bg-green-600'>
                Edit
              </Button>
            </Link>
            <Button onClick={deletePost} className='bg-red-600'    >
              Delete</Button>
            </div>
           
          )
         }
         <h2 className='capitalize text-xl md:text-3xl'>{post.title}</h2>
         <h3 className='md:text-2xl text-l'>Author : <span className='capitalize'>{post.author}</span></h3>
         <span>Created On : {formattedDate}</span>
         <div className=' text-left px-20'>
          {parse(post.content)}
         </div>
         <div className='flex gap-20 m-10'>
          <Likes post={post} userData={userData} />
         {/* <button onClick={()=>addLike()}>
        <PiHandsClappingBold className='md:text-3xl text-lg cursor-pointer' />
        </button> */}
      
         <div className='flex gap-2'>
         <FaRegComment className='md:text-3xl text-lg cursor-pointer' onClick={()=>setDisplayComment(!displayComment)}/>
          <span>{commentsData.length}</span>
          </div>         
         </div>
         </div>          
         <div className={displayComment ? 'block' : 'hidden'}>
          <Comments post={post}/>
        </div>
         
       
        
      </Container>
      
    </div>
  ):null;
}

export default Post
