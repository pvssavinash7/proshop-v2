import bcrypt from 'bcryptjs';

const users=[
    {
        name:'Admin User',
        email:'admin@email.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin:true,
    },
    {
        name:'avinash',
        email:'avinash@email.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin:false,
    },
    {
        name:'dilip',
        email:'dilip@email.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin:false,
    },

];

export default users;