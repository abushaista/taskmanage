const userModel = require('../models/user.model.js')

const crypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET

const register = async (req, res) => {
    const {name,email,password} = req.body;
    const bcryptSalt = crypt.genSaltSync(10);
    try {
        const userDoc = await userModel.create({
          name,
          email,
          password:crypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
      } catch (e) {
        res.status(422).json(e);
      }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not found" });
    }
    if (await crypt.compare(password, user.password)) {
        const token = jwt.sign({email: user.email,id:user._id},secret);
        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
          } else {
            return res.json({ error: "error" });
          }
    }
    res.json({ status: "error", error: "Invalid Password" });
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findOne({ _id: id });
    if (!user) {
        return res.json({ status: "User Not Exists!!" });
    }
    res.json(user);

}

const getAll = async (req, res) => {
    const users = await userModel.find({});
    return res.json({ status: "ok", data: users });
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const {name,email,password} = req.body;
    const user = await userModel.findOne({ _id: id });
    if(!user){
        return res.status(404).json({message: `cannot find any product with ID ${id}`})
    }
    user.name = name;
    const bcryptSalt = crypt.genSaltSync(10);
    user.password = crypt.hashSync(password, bcryptSalt);
    user.save();
    res.status(200).json(user);
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).send({message: `cannot find any user with ID ${id}`});
        }
        return res.status(204).send();
      } catch (error) {
        console.log(error);
        return res.status(500).send({message: 'internal server error'});
      }
}

module.exports = {
    register, login, getUser, getAll, updateUser, deleteUser
}