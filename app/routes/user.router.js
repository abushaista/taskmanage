
module.exports = app => {
    const user = require('../controllers/user.controller');
    app.post('/login',user.login);
    app.post('/register',user.register);
    app.get('/users/:id', user.getUser);
    app.get('/users', user.getAll);
    app.put('/users/:id', user.updateUser);
    app.delete('/users/:id',user.deleteUser);
}
