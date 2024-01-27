import React, { useEffect, useState } from 'react'
import dbServices from '../appwrite/config'
import { Container,PostCard,Loader } from '../components/index'


const AllPosts = () => {
  const [loading, setLoading] = useState(true)

  const [posts,setPosts]=useState([])

  useEffect(()=>{
    dbServices.getPosts([]).then((posts)=>{
        if(posts){
          setPosts(posts.documents);
          console.log(posts)
          setLoading(false);
        }
    })
  },[])

  return (
    <>
    {loading ? <Loader /> :
    (<Container>
    <div className=' w-10/12 mx-auto py-20' >     
        <div className='flex flex-wrap '>
          {posts.map((post)=>(
            <div key={post.$id} className='lg:w-2/6 p-2 w-full md:w-1/2'>
              <PostCard {...post} />
            </div>
          ))}
        </div>  
    </div>
    </Container>)
    }
    </>
  )
}

export default AllPosts
