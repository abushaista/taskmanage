
module.exports = app => {
    const user = require('../controllers/user.controller');
    const auth = require('../middleware/auth');
    app.post('/login',user.login);
    app.post('/register',user.register);
    app.get('/users/:id', auth, user.getUser);
    app.get('/users', auth, user.getAll);
    app.put('/users/:id', auth, user.updateUser);
    app.delete('/users/:id',auth, user.deleteUser);
}
