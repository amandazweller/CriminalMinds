const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer')

const upload = multer({
  dest: '/var/www/cp4.amandazari.me/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/museum', {
  useNewUrlParser: true
});

const itemSchema = new mongoose.Schema({
  title: String,
  path: String,
  desc: String,
  comment: [
    {
    type:mongoose.Schema.Types.ObjectId, ref:'Comment'
  }
  ]
});

const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  date: String, 
});

const characterSchema = new mongoose.Schema({
  name: String,
  job: String,
  actor: String,
  gender: String, 
  alias: String, 
  image: String, 
});

const Item = mongoose.model('Item', itemSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Character = mongoose.model('Character', characterSchema);

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

//Create a comment
app.post('/api/comments', async (req,res) =>{      
  const comment = new Comment({name:req.body.name, email:req.body.email, date:req.body.date, comment:req.body.comment});
  await comment.save();
  res.send("Comment was added successfully");
})

// Create a new item.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    path: req.body.path,
    desc: req.body.description,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create a new character
app.post('/api/characters', async (req, res) => {
  const character = new Character({
    name: req.body.name,
    job: req.body.job,
    actor: req.body.actor,
    gender: req.body.gender,
    image: req.body.image,
    alias: req.body.alias,
  });
  try {
    await character.save();
    res.send(character);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Edit an Item
app.put('/api/items/:id', async (req, res) => {
  try {
    console.log(req.params);
    const item = await Item.findOne({
      _id: req.params.id,
    });
    item.title = req.body.title;
    item.desc = req.body.description;
    await item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete an Item
app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log("In error");
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the characters.
app.get('/api/characters', async (req, res) => {
  try {
    let characters = await Character.find();
    res.send(characters);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the comments.
app.get('/api/comments', async (req, res) => {
  try {
    let comments = await Comment.find();
    res.send(comments);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
