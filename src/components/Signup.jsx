import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Input,Button, Container} from './index'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { logIn } from '../store/authSlicer'
import authService from '../appwrite/auth'

const Signup = () => {
    const {register, handleSubmit, formState:{errors}} =useForm()
   
    const navigate = useNavigate()
    const [error,setError]=useState("")
    const dispatch = useDispatch()
    

    const createAccount=async(data)=>{
        console.log(data)
        setError("")
        try {
            const userData = await authService.createAccount(data);
            console.log(userData)
            if(userData){
                const userData = await authService.getCurrentUser()
               
                if(userData) {
                dispatch(logIn(userData));
                navigate('/login')
                }
            }
        } catch (error) {
            setError(error.message)
            
        }
    }

   
  return (
    <Container>
    <div className='w-full md:w-4/5 lg:w-2/5 border border-gray-500 mx-auto   my-20 flex flex-col py-8 rounded-md'>
        <div className='w-full flex flex-col'>
        <div className=' flex justify-center'>
            <Link to={'/'}>
                <img src="/ode-to-words.png" alt="" className=''/>
            </Link> 
            </div>      
        
            
            <p>Already Have An Account? &nbsp; 
            <Link to={'/login'} className=' font-bold underline'>Sign In</Link></p>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit(createAccount)}>
                <div className='mb-2'>
                <Input
                label='Name :'
                placeholder='Enter your name'
                className=' mb-2 text-black'
                {...register("name",{
                    required:{
                        value:true,
                        message:'Name is required'
                    }
                })}
                         
                />
                {errors && <span className='text-red-600 text-xs md:text-sm'>{errors.name?.message}</span>}
                </div>
                <div className='mb-2'>
                <Input
            type='email'
            label='Email:'
            placeholder='Enter email address'
            className=' mb-2 text-black'
            {...register("email",{
                required:{
                    value:true,
                    message:'Email is required'
                },
                pattern:{
                    value:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message:'Invalid email format'
                }
               
            })}
            />
            {errors && <span className='text-red-600 text-xs md:text-sm'>{errors.email?.message}</span>}
            </div>
            <div className='mb-2'>
            <Input 
            label='Password :'
            placeholder='Enter your password'
            type='password'
            className=' mb-2 text-black'
            {...register("password",{
                required:{
                    value:true,
                    message:'Password is required'
                },
                minLength:{
                    value:8,
                    message:'Password must be at least 8 characters long!'
                },
                
                validate:(fieldValue)=>{
                    const pattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])/; 
                    return pattern.test(fieldValue)|| 'Must contain at least 1 uppercase letter, 1 lowercase letter, 1 number , and 1 special character'
                }
            })}
            />
            {errors && <span className='text-red-600 text-xs md:text-sm'>{errors.password?.message}</span>}
            </div>
            <div className='flex justify-start px-10'>
            <Button
            type='submit'>
            Create Account
            </Button> 
            </div>
            </form>
          
        </div>      
    </div>
    </Container>
  )
}

export default Signup
