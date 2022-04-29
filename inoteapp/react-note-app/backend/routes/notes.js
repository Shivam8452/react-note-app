const express = require('express')
const router = express.Router();
const {body, validationResult} = require('express-validator')
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Note')


router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try{const notes = await Notes.find({user: req.user.id})
    res.json(notes)}
    catch(error){
        console.log(error);
        res.status(500).send("Internal server error")
    }
})



router.post('/addnotes',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must be at least 5 charectoes').isLength({min:5})
], async(req,res)=>{
    try{
        const {title,description,tag}= req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
      title,description,tag,user:req.user.id

    })
    const savenote = await note.save();
    res.json(savenote)
}catch(error){
    console.log(error);
        res.status(500).send("Internal server error")
}
})


router.put('/updatenotes/:id',fetchuser, async(req,res)=>{
    try{
        const {title,description,tag}= req.body

        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        let note = await Notes.findById(req.params.id);
        if(!note){res.status(404).send("not found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
        res.json({note})

    }catch(error){
        console.log(error);
        res.status(500).send("Internal server error")
    }
})
router.delete('/deletenotes/:id',fetchuser, async(req,res)=>{
    try{
        const {title,description,tag}= req.body


        let note = await Notes.findById(req.params.id);
        if(!note){res.status(404).send("not found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({success:"note hasbeen deleted", note:note})

    }catch(error){
        console.log(error);
        res.status(500).send("Internal server error")
    }
})





module.exports = router