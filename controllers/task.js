
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
            
            res.status(500).json({
                status: 'error',
                message: "Error saving task"
            });
        }
        
    
    }catch(err) {
        
        res.status(500).json({
            status: 'error',
            message: "Something went wrong!",
        });
    }
}


exports.updateTask = async (req, res, next) => {
    
    try{

        const { task_id, due_date , status} = req.body;

        const existing_task = await Task.findById(task_id);

        if(!existing_task) {
            return res.status(400).json({
                message: "Task does not exists"
            })
        }

        if(due_date !== undefined){
          existing_task.due_date = due_date  
        }

        if(status !== undefined && (status === 'TODO' || status === 'DONE')){
            existing_task.status = status
        }

        await existing_task.save();

        res.status(200).json({
            status: 'success',
            message: "Task updated successfully",
            data: existing_task
        });
    }catch (err) {
        res.status(500).json({
            status: 'error',
            message: "Something went wrong!",
        });
    }
}

exports.getAllUserTask = async( req, res, next) => {
    try{

        const { priority, due_date, page = 1, limit = 10} = req.body;
        
        const query = {};
        if(priority) query.priority = priority;
        if(due_date) query.due_date = { $lte: new Date(due_date) }; 

        const totalTasks = await Task.countDocuments(query);
        console.log(totalTasks);

        const offset = (page - 1) * limit;
        const tasks = await Task.find(query).sort({due_date:1}).skip(offset).limit(limit);
        console.log(tasks);

        res.status(200).json({
            status: 'success',
            message: "Task fetched successfully",
            data: {
                tasks,
                totalTasks,
                totalPages: Math.ceil(totalTasks / limit),
                currentPage: page
            }
        
        });
    }catch (err){
        res.status(500).json({
            status: 'error',
            message: "Something went wrong!",
        })
    }
}