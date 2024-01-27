import { useEffect,useCallback } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import dbServices from '../../appwrite/config'
// import imageCompression from 'browser-image-compression';

const PostForm = ({post}) => {
    
    const navigate = useNavigate()
    const userData = useSelector((state)=>state.auth.userData)
    console.log(userData)
    const {register, handleSubmit, watch, setValue,control, getValues}=useForm({
        defaultValues:{
            title: post ?. title || '',
            slug: post ?.$id || '',
            content : post ?. content || '',
            status: post ?. status || 'active',
        }
    })

    // const compressImg= (imgFile)=>{
       
    //     const options = {
    //         maxSizeMB: 1,
    //         maxWidthOrHeight: 1920,
    //         useWebWorker: true,
    //       }
         
    //      const compressedFile= imageCompression(imgFile, options)
    //         .then((compressedFile)=> compressedFile.JSON)
    //         console.log(compressedFile)   
                
    //         // const compressedImgFile = new File ([compressedFile],`${compressedFile.name}` ,
    //         // {type:compressedFile.type});
    //         // console.log(compressedImgFile); 
                    
              
           
    //     }
          
              
        
           
           


    const submit = async (data)=>{
        if(post){
            const file = data.image[0]? await dbServices.upload(data.image[0]) : null;
            if(file){
                dbServices.deleteFile(post.featuredImage);
            }
             const dbPost= await dbServices.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.$id : undefined,
                author: userData.name || 'Unknown'
                
             })

             if(dbPost){
                // console.log(dbPost.$id)
                navigate(`/post/${dbPost.$id}`);
             }
        }else {
             // const Img = compressImg(data.image[0]) 
            // console.log(Img)     
               
            const file = await dbServices.upload(data.image[0]);
            if(file){
                const fileId = file.$id;
                console.log(fileId)
                data.featuredImage= fileId;
                console.log(data)
               
                const dbPost= await dbServices.createPost({
                    ...data,
                    username:userData?.$id || userData?.userdata.$id,
                    author:userData?.name ||userData?.userdata.name || 'Unknown'
                })
                if(dbPost){
                    
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback ((value) =>{
        if(value)
        return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g,'-')

        return null;
    },[]);
    

    useEffect(()=>{
        const subscription = watch ((value,{name})=>{
            if(name === 'title'){
            setValue('slug',slugTransform(value.title),{shouldValidate:true});
            } 
        });
        return ()=>subscription.unsubscribe();

    },[watch,setValue,slugTransform])

    

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row w-full gap-5">
        <div className='md:w-2/3 lg:3/4'>
            <Input
             label="Title" 
             placeholder="Title" 
             className='text-black'
             {...register("title",{required:true})}             
             />
             <Input
             label="Slug"
             placeholder='Slug'
             className='text-black'
             {...register("slug",{required:true})}
             onInput={(e)=>
             setValue("slug",slugTransform(e.target.value),{shouldValidate:true})}             
             />
             <RTE
              label="Content"
              name='content'
              control={control}
              defaultValue={getValues("content")}  
              className='text-black '           
             />             
        </div>
        <div className='flex flex-col align-center px-10 md:w-1/3 lg:w-1/4 md:px-0 lg:px-0'>
            <Input
            label="Featured Image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            className="text-black"
            
            
            {...register("image",{required:!post})}            
            />
            {post && 
            <img 
              src={dbServices.getFilePreview(post.featuredImage)}
              alt={post.title}
              className='h-80'              
              />
            }
            <Select 
              label="Status"
              options={["Active", "Inactive"]}
              className="text-black mb-2"
              {...register("status",{required:true})}            
            />
            <Button
            type='submit'
            className='w-full' >
                {post ? "Update": "Submit"}
            </Button>         

            
        </div>
    </form>
  )
}

export default PostForm
