import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import{Button} from "../index"
import dbServices from '../../appwrite/config'
import { useSelector,useDispatch } from 'react-redux'
import { addComments } from '../../store/commentSlicer'


const CommentForm = ({post}) => {
  const [value,setValue] = useState()
  const dispatch = useDispatch();

  const userData =  useSelector((state)=>state.auth.userData);

  const {register,handleSubmit}=useForm()

  const submit = async (data) =>{

    const dbComment = await dbServices.createComment({
             ...data,
             user_id:userData.$id || userData.userdata.$id, 
             post_id:post.$id,
             author:userData.name || userData.userdata.name
    })
    setValue("")
    if(dbComment){
        dispatch(addComments(dbComment))
    }
    console.log(dbComment)

  }

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit(submit)} className='w-4/5 mx-auto flex flex-col'>
        <textarea 
        rows="5" cols="75"
        placeholder="Share your thoughts..."
        value={value}
        className='w-full  bg-transparent rounded border border-gray-600 p-2 my-8'
        {...register("comment",{required:true})} 
        />
        <div className='w-full flex justify-end mb-5'>
        <Button
        type='submit'
        >
          Submit
        </Button>
        </div>

      </form>
    </div>
  )
}

export default CommentForm
