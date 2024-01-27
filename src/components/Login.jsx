import  { useState } from 'react'
import {useForm}  from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import {logIn} from '../store/authSlicer'
import {useDispatch} from 'react-redux'
import {Input, Button,Container} from './index'
import { FcGoogle } from "react-icons/fc";


const Login = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const [error,setError]= useState("");
    const {register,handleSubmit} = useForm();

    const login =async(data)=>{
       
        setError("");
        try {
            const session = await authService.login(data);           
           
        if (session) {
            const userData= await authService.getCurrentUser()
            console.log(userData);
            if (userData) {
                dispatch(logIn(userData))
                navigate('/home') 
            }           
        }
        } catch (error) {
            setError(error.message)
            console.log(error)
            
        }
        
    }

    const oAuth2login =async()=>{

        setError("");
        try {
            const userData=  await authService.createGoogleAuthentication();             

            
        } catch (error) {

            setError(error.message)
            
        }
       
        
    }

  return (
    <Container>
        <div className='w-full md:w-4/5 lg:w-2/5 border border-gray-500 mx-auto   my-20 flex flex-col  py-8 rounded-md'>
        <div className=' flex justify-center'>
            <Link to={'/'}>
                <img src="/ode-to-words.png" alt="" className=''/>
            </Link> 
            </div>      
        
        <p>Don&apos;t Have An Account?&nbsp;
        <Link to={'/signup'} className='font-bold underline'>
          Sign Up
        </Link> 
        </p>
       
        {error && <p className='text-red-600 bold py-5'>{error}</p>}       
        <form onSubmit={handleSubmit(login)}>
            <Input
            label='Email :'
            placeholder='Enter your email address'
            type='email'
            className='mb-2 text-black'
            {...register("email",{
                required:true,
                validate:{
                    matchPattern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ .test(value)|| "Email must be a Email address"
                }
            })}
            />
            <Input 
            label='Password :'
            placeholder='Enter your password'
            type='password'
            className=' mb-2 text-black'
            {...register("password",{
                required:true,
            })}
            /> 
            <div className='flex justify-start px-10'>
            <Button
            type='submit' >
            Sign In
            </Button> 
            </div>            
        </form>
        <Button className='m-10 flex justify-center  ' onClick={()=>oAuth2login()}>
            <div className='flex gap-5 items-center'>
            <FcGoogle className=' md:text-4xl ' />
             Sign In With Google
            </div>
                
         </Button>      
        </div>
    </Container>
   
        
  )
}

export default Login
