import {NavLink} from"react-router-dom"
import { FiHome } from 'react-icons/fi';
import { AiFillGithub } from 'react-icons/ai'
import { AiOutlineLinkedin } from 'react-icons/ai'
import { HiOutlineBookOpen } from 'react-icons/hi'
import "./index.css"

const SideContent = ()=> (
    <div className="side-content">
    
        <NavLink to ="/posts"
        className={({isActive})=> (isActive ? "background-chnage": "icons-style")}
        >
            <FiHome size={25}  />
        </NavLink>
    

        <NavLink to= "/create" 
         className={({isActive})=> (isActive ? "background-chnage1" : "icons-style")}
        > <HiOutlineBookOpen size ={25}   />
            
        </NavLink>


        <a className="home" href = "https://github.com/rjreddy111/" ><AiFillGithub size={25}  /><span className='screen-reader-only'>Github</span></a> 
       <a className="home" href = "https://www.linkedin.com/in/rahulreddy43/" ><AiOutlineLinkedin size={25} /> <span className='screen-reader-only'>linkedin</span> </a>
    </div>
)


export default SideContent