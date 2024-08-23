const express = require("express")

const router = express.Router()


const convertDbtoResponseObject =(eachPost)=> {
    return {
        postId : eachPost.id,
        title :eachPost.title, 
        content:eachPost.content, 
        author:eachPost.author , 
        
        createdAt : eachPost.created_at
    }
} 


router.get("/", async(request,response)=> {
    const getAllPosts = `
    SELECT * FROM blogs;
    `; 
    const postArray = await request.app.locals.dataBase.all(getAllPosts) 
    response.send(postArray.map((eachPost)=>convertDbtoResponseObject(eachPost)))

})

router.get("/:postId", async(request,response)=> {
    const {postId} = request.params 
    const getPost = `select * from blogs 
                    WHERE id= ${postId};`; 
    const postDetails = await request.app.locals.dataBase.get(getPost) 
    console.log(postDetails)
    response.send(convertDbtoResponseObject(postDetails))
})

router.post("/", async(request,response)=> {
    console.log("request.body:", request.body)
    const {title,content,author} = request.body 
    
    try {
    const uploadPost = `
        INSERT INTO blogs (title,content,author) 
        VALUES (?,?,?) ;
    `; 
    await request.app.locals.dataBase.run(uploadPost,[title,content,author]);
    response.send("Post Uploaded successfully")
    
} 
catch(error) {
console.log("error uploading : ", error.message)
response.status(500).send("Fsailed to upload")
}

});


router.put("/:postId", async(request,response)=> {
    const {postId} = request.params
    const {title,content,author} = request.body 
    const updatePost = `UPDATE blogs SET title = '${title}', 
                                         content = '${content}',
                                        author = '${author}'
                        WHERE id = ${postId};
    
    `;
    await request.app.locals.dataBase.run(updatePost) 
    response.send("Post Updated successfully")
})

router.delete("/:postId", async(request,response)=> {
    const {postId} = request.params
    const deletePost = `
    DELETE FROM blogs where id = ${postId};
    `; 
    await request.app.locals.dataBase.run(deletePost) 
    response.send("Post deleted successfully")
})


module.exports = router 