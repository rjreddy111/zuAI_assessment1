import { AiFillGithub } from 'react-icons/ai'
import { AiOutlineLinkedin } from 'react-icons/ai'
import "./index.css"

const Footer = ()=> (

    <div className="footer-container">
        <p className='copyrights'> &copy; 2024 Blogs | </p>
       <a href = "https://github.com/rjreddy111/" alt = "Github" ><AiFillGithub size={25} /> <span className='screen-reader-only'>Github</span></a> 
       <a className='linkedn' href = "https://www.linkedin.com/in/rahulreddy43/" ><AiOutlineLinkedin size={25} /></a>
    </div>
)

export default Footer