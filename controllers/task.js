
const Task = require('../models/Task');

exports.createTask = async (req, res, next) => {

    try{

        const { title, description , due_date , subTasks} = req.body;

        console.log('INPUT', title, description, due_date, subTasks);
        
        console.log('SUB task', subTasks);
        const existing_task = await Task.findOne({ title: title, description: description});
        // console.log('EXISTING', existing_task)
        console.log('SUB task', subTasks);

        if(existing_task) {
            return res.status(400).json({
                message: "Task already exists"
            })
        }

        console.log('SUB task', subTasks);

        const newTask = new Task({
            title,
            description,
            due_date,
            subTasks: subTasks
        })

        console.log('NEW TASK', newTask);

        try {
            await newTask.save();
            res.status(200).json({
                status: 'success',
                message: "Task created successfully",
                data: newTask
            });
        } catch (error) {
            console.error("Error saving task:", error);
            res.status(500).json({
                status: 'error',
                message: "Error saving task"
            });
        }
        
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


exports.updateTask = async (req, res, next) => {
    
    try{

        

    }catch (err) {
        res.status(500).json({
            status: 'error',
            message: "Something went wrong!",
        });
    }
}

