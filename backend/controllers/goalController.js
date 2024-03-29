const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

//@desc get goal
//@route get /api/goals
//@access private

const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})
//@desc Set goal
//@route POST /api/goals
//@access private
const setGoals =  asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const  goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})

//@desc update goal
//@route put /api/goals/:id
//@access private
const updateGoals = asyncHandler(async (req,res) =>{

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new: true
        })

    res.status(200).json(updatedGoal)
})

//@desc Delete goal
//@route delete /api/goals/:id
//@access private
const deleteGoals = asyncHandler(async (req,res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    await goal.remove()


 res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}