import {useEffect, useState} from 'react'
import {Container, PostCard,Loader} from '../components'
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';
import { Link } from 'react-router-dom';
import dbServices from '../appwrite/config';
import authService from '../appwrite/auth';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading,setLoading] = useState(true)
    const [user,setUser]=useState();
    const userData = useSelector(state=>state.auth.userData)
   
    
    
    

    useEffect(() => {

        authService.getCurrentSession().then((session) => {
            setUser(session)
            console.log(user)
        })       
       
       

       if(userData)
        {              
            
            dbServices.getPosts([Query.equal("username", `${userData.$id||userData.userdata.$id}`)])
            .then((posts) => {    
                
                console.log(posts)
                if (posts) { 
                    console.log(posts.documents)               
                    setPosts(posts.documents)
                    setLoading(false)
                }             
            })    
        }else{
            setPosts([])
        }        
        
    }, [])

   

    if (!userData) {
        return (
            <div className="w-full py-8 mt-4 flex justify-center items-center md:h-100">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <p className=" text-xs md:text-xl text-white w-3/4 mx-auto leading-loose"> 
                            Welcome to <span className=' font-bold text-yellow-500'>Ode To Words</span>,
                             where the magic of words meets the charm of  storytelling.
                             Dive into a world of creativity and self-discovery as we celebrate
                             the journey of budding writers. From writing tips to inspiring prompts,
                             join our community in embracing the joy of crafting stories. Your unique
                             voice matters here. Let the adventure begin!
                             <br />                               
                            <Link to={'/login'} className='font-bold underline underline-offset-4'> Login to read posts </Link>
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )

            }
    
    if(loading){
        <Loader/>
    }
  
   
    return (
        <>
       
        { posts.length===0 ? 
         (<Container>
            <div className=' h-100'>
                <h2 className=' m-10 text-4xl my-5' >Welcome <span className=' capitalize'>{userData.name}</span></h2>
                <p>You have not added any posts yet. To read posts go to <Link to={'/all-posts'}><span className=' font-bold'>All Posts</span></Link>
                </p>
            </div>           
          </Container>):

        ( 
            
        <>       
        <div className='w-10/12 mx-auto py-5'>
            <Container>
                <h2 className=' capitalize text-4xl my-5'>Welcome <span className='px-2'>{userData.name||userData.userdata.name}</span></h2>
              
                <div className='flex flex-wrap py-10'>
                    {posts.map((post) => (
                        <div key={post.$id} className='lg:w-2/6 p-2 w-full md:w-1/2'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                
            </Container>
        </div>
      
        </>
)
        
        }       

             
        </>
    )
}

export default Home

