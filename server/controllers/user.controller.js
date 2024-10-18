import AppError from "../utils/error.util";

const register = (req,res,next) =>{
    const {fullName, email, password} = req.body;

    if(!fullName || !email || !password){
        return new AppError('All fields are required',400);
    }

    const userExists = await User.findOne({email});

    if(userExists){
        return next (new AppError('Email is already exists',400));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url:
              'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
          },
    });

    if(!user){
        return next(new AppError())
    }

};

const login = (req,res) =>{

};

const logout = (req,res) =>{

};

const getProfile = (req,res) =>{

};

export {
    register,
    login,
    logout,
    getProfile
}