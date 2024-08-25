import { Component } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import {ThreeCircles} from "react-loader-spinner"

import "./index.css"


function withRouter(Component) {
    return function GetRouterParamsProps(props) {
        let params = useParams()
        let navigate = useNavigate()
        return <Component {...props} params={params} navigate = {navigate} />
    }
    
}


class PostDetails extends Component {

    state = {postDetails:[], isLoading:true}

    componentDidMount () {
        this.getPostDetails()
    }

    getPostDetails = async()=> {
        const {params} = this.props
        const {postId} = params 
        console.log(postId)
        const url = `https://zuai-assessment1.onrender.com/posts/${postId}`
        const response = await fetch (url) 
        const data = await response.json()
        

        this.setState({postDetails:data, isLoading:false})
        
        
    }

    editBlog = ()=> {
        const {params,navigate} = this.props 
        const {postId} = params; 

         navigate(`/edit/${postId}`)
    }

  createdFormatTime = (createdAt) => {
    const present = new Date ()

    //updating time to UTC +5:30 
    const utcDifferentTime = 5 * 60 * 60 * 1000 + 30 * 60 *1000
    const createdDate = new Date(createdAt)
    

    const getUpdatedTime = new Date (createdDate.getTime() + utcDifferentTime)
   

 
    // calculating seconds 
    const seconds = Math.floor((present-getUpdatedTime)/1000)
    console.log(getUpdatedTime,present)
    console.log(seconds)

    // required time format 
    
    let interval = Math.floor (seconds/ (60*60*24*365))
    console.log(interval)
    if (interval>=1) return `${interval} year${interval===1 ? "": "s"} ago`; 
    interval = Math.floor(seconds / (60*60*24*30)) 
    if (interval>=1) return `${interval} month${interval===1 ? "": "s"} ago` ;

    interval = Math.floor(seconds / (60*60*24)) 
    if (interval>=1) return `${interval} day${interval===1 ? "": "s"} ago`; 

    interval = Math.floor(seconds/(60*60))
    if (interval>=1) return `${interval} hour${interval===1 ? "": "s"} ago` ; 

    interval = Math.floor(seconds/(60)) 
    if (interval>=1) return `${interval} minute${interval===1 ? "" : "s"} ago`; 

    return `Just Now`
  }


    render(){
        const {postDetails,isLoading} = this.state 
        const {title,author,createdAt,content} = postDetails

        const createdTimeFormat = this.createdFormatTime(createdAt)

        const contentParagraphs = content ? content.split("\n").map((para, index) => (
            <p key={index} className="content-paragraph">
              {para}
            </p>
          )) : null;

       
        

        return (
            <>

            {isLoading ? (


            <div className="loader-designing">
            <ThreeCircles type="Oval" color="#007BFF" height={50} width={50} />
            </div>


            ): (
                <div className="post-details-container">
                <p className="border-useful">Useful <i>Resources </i></p>
                

            <h4>{title}</h4>
            <div className="details-container">
                <div>
                    <p className="published-by">Published by</p>
                    <p className="author">{author}</p>
                </div>
                <div>
                    <p  className="published-by">Published</p>
                    <p className="published-at">{createdTimeFormat}</p>
                    
                </div>
            </div>
            <div className="content-size">{contentParagraphs}</div>
             <button className="edit-button" onClick={this.editBlog}>Edit </button>

            </div>

            )}
           

           </>
            
        )
       
    }
}

export default withRouter(PostDetails)