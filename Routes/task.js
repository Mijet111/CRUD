const express = require('express')
const router = express.Router()

const Task = require('../models/task')

//get all tasks

router.get('/', async(req,res) => {
  try{
    const tasks = await Task.find()
    res.join(tasks)
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

//create task

router.post('/', async(req,res)=>{
  const task = new Task({
    title: req.body.title,
    description: req.body.description
  })
  try{
    const newTask = await task.save()
    res.status(201).json(newTask)
  } catch(err){
    res.status(400).json({message: err.message})
  }
})

//creating our middleware for our :ID routes
async function getTask(req,res,next){
  let task;
  try{
    task = await Task.findById(req.params.id)
    if( task == null){
      return res.status(404).json({message: "Task not Found"})
    } 
  }catch(err){
    return res.status(500).json({message: err.message})
  }
  res.task = task
  next()
}

// Get a Specific task 

router.get('/:id', getTask, (req,res) => {
  res.json(res.task)
})

// Update specific Task by ID
router.patch('/:id', getTask,async(req,res) => {
  if(req.body.title != null){
    res.task.title = req.body.title
  }
  if(req.body.description != null){
    res.task.description = req.body.description
  }
  try{
    const update = updateTask = await res.task.save()
    res.json(updateTask)
  } catch(err){
    res.status(400). json({message: err.message})
  }
})

// Delete Specific task by ID

router.delete('/:id', getTask, async(req,res) => {
  try{
    await res.task.deleteOne()
    res.json({message: "Task Deleted"})
  } catch(err){
    res.status(500).json({message: err.message})
  }
})

module.exports = router