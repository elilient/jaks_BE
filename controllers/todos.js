const User = require("../models/user");
const Todo = require("../models/todo");

module.exports = {
    // Todos Create
    async todoCreate(req, res, next) {
        const user = req.user._id
        const { _id } = user;
        let todo = new Todo(req.body);
        todo.set({ lawyer_id: req.user.id });
        await todo.save();
        await User.findByIdAndUpdate({ _id }, { $push: { todo: todo } });
        res.send(todo);
    }
};
