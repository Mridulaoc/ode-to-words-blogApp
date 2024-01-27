import  { useEffect, useRef} from 'react'
import dbServices from '../../appwrite/config'
import { Query } from 'appwrite'
import { CommentForm, Container} from '../index'
import Comment from '../Comments/Comment'
import { useDispatch, useSelector } from 'react-redux'
import { setComments } from '../../store/commentSlicer'

const Comments = ({post}) => {
 
  const commentsData = useSelector((state)=>{return state.comments.comments});
  const commentsDataRef = useRef(commentsData)
  const dispatch = useDispatch();

  useEffect(()=>{
    dbServices.getComments([Query.equal("post_id", `${post.$id}`)]).then((comments) =>{
      console.log(comments)
      if(comments){
        dispatch(setComments(comments.documents));
      }
      else{
        setComments([])
      }
    })
  },[commentsDataRef])
  return (
    <Container>
    <div className='w-full flex flex-col mx-auto my-10'>
      <h2 className=' md:text-xl text-lg'>Responses ({commentsData.length})</h2>
      <CommentForm post={post}/>
      <div className='flex flex-col w-4/5 mx-auto '>
        {
          commentsData.map((comment)=>
          (  <div key={comment.$id} className=''>
              <Comment  {...comment}/>
              <hr className='bg-gray-700 border-0 h-px' />
            </div>
          )
          )
        }
      </div>
      
    </div>
    </Container>
  )
}

export default Comments
