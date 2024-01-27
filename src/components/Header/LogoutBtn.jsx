import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import { logOut } from '../../store/authSlicer';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {

    const dispatch =useDispatch();
    const navigate =useNavigate();

    const logOutSession=()=>{
        authService.logout().then(()=>{
            dispatch(logOut());
            navigate("/login")
            
        })

    }


  return (
    <div>
      <button onClick={logOutSession} className='capitalize'>
        log out

      </button>
    </div>
  )
}

export default LogoutBtn
