
const Task = require('../models/Task');

exports.createTask = async (req, res, next) => {

    try{

        const { title, description , due_date } = req.body;
        
        const existing_task = await Task.findOne({ title: title, description: description});

        if(existing_task) {
            return res.status(400).json({
                message: "Task already exists"
            })
        }

        const newTask = new Task({
            title,
            description,
            due_date
        })

        await newTask.save();
        res.status(200).json({
            status: 'success',
            message: "Task created successfully",
            data: newTask
        })
    }catch(err) {
        
        res.status(500).json({
            status: 'error',
            message: "Something went wrong!",
        });
    }
}