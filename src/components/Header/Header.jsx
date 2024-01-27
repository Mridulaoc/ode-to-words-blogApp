import { useSelector } from 'react-redux'
import {Container, LogoutBtn} from '../index'
// import Container from '../container/Container';
import {useNavigate,Link} from 'react-router-dom'

const Header = () => {

    const authStatus =useSelector((state)=>state.auth.status);
    const navigate =useNavigate();

    const navItems = [
      {
        name: 'Home',
        url:'/',
        active: true,
      },     
      {
          name: 'Login',
          url:'/login',
          active: !authStatus,
      },
      
      {
          name: 'Signup',
          url:'/signUp',
          active: !authStatus,
      },

      {
          name: 'All Posts',
          url:'/all-posts',
          active: authStatus,
      },

      {
          name:'Add Post',
          url:'/add-post',
          active: authStatus,
      }
    ]

  

  return (

    
      // <header className='border-b border-blue-500'>
      //   <Container>
      //   <nav className='flex py-4 justify-between align-middle h-40'>
      //     <div className='flex align-middle '>
      //       <img src="/Ode To Words.png" alt="Ode To Words"  />
      //     </div>
      //     <div>
            // <ul className='flex gap-5 ml-auto ali'>
            //   {navItems.map((item)=>
            //   item.active ? (
            //     <li key={item.name}>
            //       <button onClick={()=> navigate(item.url)}>
            //       {item.name}
            //       </button>                  
            //     </li>
            //   ) : null)
            //   }
            //   <li>
            //   {authStatus && <LogoutBtn/>}
            //   </li>
            // </ul>
      //     </div>         
      //   </nav>
      // </Container>
      // </header>
    
    
      
    
      <>      
        <header className='border-b border-blue-500 h-24 p-2'>
        <Container>
          <nav className='flex justify-between items-center'>
            <div className=''>
              <Link to={'/'}>
                <img src="/ode-to-words.png" alt="" className=''/>
              </Link>
            </div> 
            <div className=' '>
            <ul className='flex gap-4'>
              {navItems.map((item)=>
              item.active ? (
                <li key={item.name}>
                  <button onClick={()=> navigate(item.url)}>
                  {item.name}
                  </button>                  
                </li>
              ) : null)
              }
              <li>
              {authStatus && <LogoutBtn/>}
              </li>
            </ul>
            </div>
          </nav>

        </Container>
        </header>
      
      </>
  )
}

export default Header
