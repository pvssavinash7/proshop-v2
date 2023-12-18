import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc Auth User & get token
// @route POST/api/users/login
// @ access public

const authUser = asyncHandler(async ( req, res ,next) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');

    }
});

// @desc Register user
// @route POST/api/users
// @ access public

const registerUser = asyncHandler(async ( req, res ,next) => {
    res.send('resgister user');
});

// @desc Logout user / clear cookie
// @route POST/api/users/logout
// @ access private

const logoutUser = asyncHandler(async ( req, res ,next) => {
    res.send('logout user');
});

// @desc GET user profile
// @route POST/api/users/profile
// @ access Private

const getUserProfile = asyncHandler(async ( req, res ,next) => {
    res.send('get user profile');
});

// @desc  update user profile
// @route PUT/api/users/profile
// @ access Private

const updateUserProfile = asyncHandler(async ( req, res ,next) => {
    res.send('update user profile');
});

// @desc  Get user
// @route GET/api/users
// @ access Private/Admin

const getUsers = asyncHandler(async ( req, res ,next) => {
    res.send('get users');
});

// @desc  Get user by ID 
// @route GET/api/user/:id
// @ access Private/Admin

const getUserByID = asyncHandler(async ( req, res ,next) => {
    res.send('get user by id');
});

// @desc  delete user
// @route DELETE/api/users/:id
// @ access Private/Admin

const deleteUser = asyncHandler(async ( req, res ,next) => {
    res.send('delete user');
});

// @desc  Update user
// @route PUT/api/users/:id
// @ access Private/Admin

const updateUser = asyncHandler(async ( req, res ,next) => {
    res.send('update user');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
}