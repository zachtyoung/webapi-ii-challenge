
const router = require('express').Router()
const db = require('../data/db.js')

router.get('/', (req,res) =>{
    db.find().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

router.get('/:id', (req, res) =>{
    const {id} = req.params;

    db.findById(id)
    .then(post => {
        if(post){
        res.status(200).json(post)
        } else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err =>{
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.get('/:id/comments', (req, res) =>{
    const {id} = req.params;

    db.findPostComments(id)
    .then(comments => {
        if(comments){
        res.status(200).json(comments)
        } else{
            res.status(404).json({ message: "The comments with the specified ID does not exist." })
        }
    })
    .catch(err =>{
        res.status(500).json({ error: "The comment information could not be retrieved." })
    })
})

router.post('/', (req, res)=>{

    const postInfo = req.body;
    postInfo.title && postInfo.contents ?  db.insert(postInfo).then(newPost =>{
        res.status(201).json(newPost);
    }) : res.status(400).json({ errorMessage: "Please provide a title and contents for the post." })
   
    .catch(err =>{
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

//works but returns id?
router.post('/:id/comments', (req, res)=>{
    const comment = req.body

    comment.text && comment.post_id ?  db.insertComment(comment).then(newComment =>{
        res.status(201).json(newComment);
    }) : res.status(400).json({ errorMessage: "Please provide a text and id for the comment." })
   
    .catch(err =>{
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})

//works but returns only a number?
router.delete('/:id', (req,res)=>{
    const {id} = req.params;

    db.remove(id)
    .then(post =>{
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        
    })
    .catch(err =>{
        res.status(500).json({ error: "The post could not be removed" })
    })
})


//works but returns only a number?
router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;

    changes.title && changes.contents? db.update(id, changes) .then(updated =>{
        if(updated){
            res.status(200).json(updated)
        } else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    }) .catch(err =>{
        res.status(500).json({ error: "The post information could not be modified." })
    }) : res.status(400).json({ errorMessage: "Please provide a title and contents for the post." })
 
    
})











module.exports = router;