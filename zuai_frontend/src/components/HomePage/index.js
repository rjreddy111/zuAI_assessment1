import {Component} from "react"
import {ThreeDots} from "react-loader-spinner"
import EachPostCard from "../EachPostCard"

import "./index.css"

class HomePage extends Component {

    state = {
        postLists :[], 
        isLoading:true 
    }


    componentDidMount ()  {
        this.getPosts()
    }


    getPosts = async()=> {
        const url = "https://zuai-assessment1.onrender.com/posts" 
        const response = await fetch(url) 
       
        
        if (response.status===200) {
            const data = await response.json()
            this.setState({postLists:data, isLoading:false})
        }
    }

    onDeleteBlog  = async(postId)=> {
        const url = `https://zuai-assessment1.onrender.com/posts/${postId}`
        await fetch (url, {
            method:"DELETE", 
            headers: {
                "Content-type" :"application/json"
            },
        } );
        this.getPosts()

    }

    getLoadedContent = ()=> {
        const {postLists} = this.state

        return (
        <div className="home-page"  >
        <h2 className="style-all-blogs">Contents</h2>


        <ul className="unordered-list-container">
            {postLists.map((eachPost)=> 
            <EachPostCard key = {eachPost.postId}  eachPostDetails={eachPost} onDeleteBlog ={this.onDeleteBlog} />

        )}
        </ul>
        
        </div>
        )    
}

    render(){

        const {postLists,isLoading} = this.state 
        console.log(postLists)
        return (
            <>

                {isLoading ? (

<div className="loader-designing">
<ThreeDots type="Oval" color="#007BFF" height={50} width={50} />
</div>
                ): (this.getLoadedContent())
    
                
            }

</>
                
                
            
        )
    }
}



export default HomePage