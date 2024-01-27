import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const AuthLayout = ({children,authentication=true}) => {

    const {loader,setLoader} = useState(true)
    const navigate = useNavigate()
    const authStatus= useSelector((state)=>state.auth.status)

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }

        // setLoader(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authStatus,authentication,navigate])
  return loader ? <div>loading ....</div> : <>{children}</>
}

export default AuthLayout
