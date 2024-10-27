const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  let user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      userId: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      editorFor: user.editorFor,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("لا يوجد حساب مرتبط بهذا البريد الإلكتروني");
  }

  // compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError(
      "لقد أدخلت كلمة مرور خاطئة. يرجى المحاولة مرة أخرى"
    );
  }
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      userId: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      editorFor: user.editorFor,
    },
    token,
  });
};

module.exports = {
  register,
  login,
};
