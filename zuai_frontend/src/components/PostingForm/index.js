import { Component } from "react";
import { useParams,useNavigate } from "react-router-dom";

import "./index.css"

function withRouter(Component) {
    return function GetRouterParamsProps(props) {
        let params = useParams()
        let navigate = useNavigate()
        return <Component {...props} params={params} navigate={navigate} />
    }
    
}


class PostingForm extends Component {

    state = {
        title:"", 
        content: "", 
        author : "",
        isLoading:true,
        isEditMode:false
    }


    componentDidMount() {
        const {params} = this.props 
        const {postId} = params

        if (postId) {
            this.fetchPostDetailsToEdit(postId)
        }
        else {
            this.setState ({isLoading:false})
        }
    }

    fetchPostDetailsToEdit = async(postId)=> {
        const url = `https://zuai-assessment1.onrender.com/posts/${postId}`
        const response = await fetch(url)

        const data = await response.json()
        this.setState({

            title:data.title, 
            content:data.content, 
            author:data.author, 
            isLoading:false,
            isEditMode:true 
        })
    }



    onSubmitForm = async(event)=> {
        event.preventDefault()
        const {title,content,author,isEditMode} = this.state
        const {navigate,params} = this.props 
        const {postId} = params
       
        

        
        const url =  isEditMode ?       
         `https://zuai-assessment1.onrender.com/posts/${postId}` :    
        `https://zuai-assessment1.onrender.com/posts`
        
        const method = isEditMode ? "PUT": "POST"

        console.log(url)
        const response = await  fetch (url,  {
            method:method, 
            headers : {
                "Content-Type":"application/json"
            }, 
            body : JSON.stringify({title,content,author})
        });
        console.log(response)
        if (response.ok) {


        navigate(`/posts/${isEditMode ? postId : ""}`)

        }
        this.setState({title:"", author:"",content:"", isLoading:false})
    }

    changeTitle = (e)=> {
        this.setState({title:e.target.value})
    }
    chanegAuthor = (e)=> {
        this.setState({author:e.target.value})
    }
    changeContent = (e)=> {
        this.setState({content:e.target.value})
    }

    render(){
        const {title,content,author,isEditMode} = this.state
        return (
            
            <div className="main-form-container">
                
                <form className="form-container" onSubmit={this.onSubmitForm}>
                  
                    <input type= "text" onChange = {this.changeTitle} value = {title} placeholder="Title" className="input-style" required /> 
               
                    <br/>
                    <input type ="text" value = {author} onChange={this.chanegAuthor} placeholder="Author" className="input-style" required />
                    <br/>
                    
                    <textarea type = "text" rows={6} cols={40} value = {content} onChange={this.changeContent} placeholder="Content" className="input-style textarea" required />
               
                    
                
                    
                   
                    <br/>
                    <button className="upload-button" type="submit" >
                        {isEditMode ? "Update" : "Upload"}
                        </button>
                </form>
            </div>
            
        )
    }
}



export default withRouter(PostingForm)