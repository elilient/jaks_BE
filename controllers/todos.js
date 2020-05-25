const User = require("../models/user");
const Todo = require("../models/todo");

module.exports = {
    // Todos Create
    async todoCreate(req, res, next) {
        let usertoken = req.headers.authorization.split(' ');
        let userInfo = jwt.verify(usertoken[1], process.env.JWT_KEY);
        let todo = new Todo(req.body);
        todo.set({ lawyer_id: userInfo._id });
        await todo.save();
        await User.findByIdAndUpdate({ _id }, { $push: { todo: todo } });
        res.send(todo);
    },
    // Todos Show
    async todoShow(req, res, next) {
        const user = req.user._id;
        const { _id } = user;
        let todos = await Todo.find({ lawyer_id: _id }, { lawyer_id: 0 });
        res.send(todos);
    },
    // Todos Update
    async todoUpdate(req, res, next) {
        let todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await todo.save();
        res.send(todo);
    },
    // Todos Delete
    async todoDelete(req, res, next) {
        await Todo.findByIdAndDelete(req.params.id);
        let user = await User.findById(req.user._id);
        user.todo.remove(req.params.id);
        user.save();
        res.send("Deleted to-do");
    },
};
