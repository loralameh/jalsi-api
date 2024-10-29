const { User } = require("@models/User");
const { StatusCodes } = require("http-status-codes");
// const { BadRequestError, UnauthenticatedError } = require("../errors");
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
//todo rewatch express code to knoe more about how to catch errors
const register = async (req, res) => {
  const userData = (({
    firstName,
    lastName,
    password,
    phoneNumber,
    countryCode,
  }) => ({
    firstName,
    lastName,
    password,
    phoneNumber: {
      number: phoneNumber,
      countryCode: countryCode,
    },
  }))(req.body);

  // on save the pass will be hashed and salted
  let user = await User.create(userData);

  //generate otp and redirect to verify-phone-number page
  const channel = "sms";
  let verificationRequest;
  const phoneNumber =
    userData.phoneNumber.countryCode + "" + userData.phoneNumber.number;

  try {
    verificationRequest = await client.verify.v2
      .services(process.env.TWILIO_VERIFICATION_SID)
      .verifications.create({ to: phoneNumber, channel });
  } catch (e) {
    console.error(e);
    res.status(StatusCodes.BAD_REQUEST).json({ message: e.message });
  }

  // Redirect to the verify phone number page
  res.redirect("/verify-phone-number");
};

const login = async (req, res) => {
  const { phoneNumber, countryCode, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ phoneNumber, countryCode });
  if (!user) {
    // throw new UnauthenticatedError("لا يوجد حساب مرتبط بهذا البريد الإلكتروني");
  }

  // compare password
  const isPasswordCorrect = await User.comparePassword(password);
  if (!isPasswordCorrect) {
    // throw new UnauthenticatedError(
    //   "لقد أدخلت كلمة مرور خاطئة. يرجى المحاولة مرة أخرى"
    // );
  }

  //redirect to  phone number verification step
  if (!user.isPhoneVarified) {
    //generate otp and redirect to verify-phone-number page
    const channel = "sms";
    let verificationRequest;
    const phoneNumber =
      userData.phoneNumber.countryCode + "" + userData.phoneNumber.number;

    try {
      verificationRequest = await client.verify.v2
        .services(process.env.TWILIO_VERIFICATION_SID)
        .verifications.create({ to: phoneNumber, channel });
    } catch (e) {
      console.error(e);
      res.status(StatusCodes.BAD_REQUEST).json({ message: e.message });
    }

    // Redirect to the verify phone number page
    res.redirect("/verify-phone-number");
    return;
  }
  const token = User.createJWT();

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
const verify = async (req, res) => {
  //todo add userId to req.body in  a middleware
  const { verificationCode, userId } = req.body;

  let user = await User.findById(userId).select("phoneNumber");
  user = JSON.parse(JSON.stringify(user));
  const phoneNumber =
    user.phoneNumber.countryCode + "" + user.phoneNumber.number;

  let verificationResult;
  //twillo check verification code
  verificationResult = await client.verify.v2
    .services(process.env.VERIFICATION_SID)
    .verificationChecks.create({
      code: verificationCode,
      to: phoneNumber,
    });

  if (!verificationResult.valid) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "verification Code not valid" });
    return;
  }
  user = await User.findByIdAndUpdate(
    userId,
    { isPhoneVarified: true },
    { new: true }
  );
  user = JSON.parse(JSON.stringify(user));
  const token = User.createJWT();

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

const sendOtp = async (req, res) => {
  const { userId } = req.body;

  let user = await User.findById(userId).select("phoneNumber");

  //generate otp and redirect to verify-phone-number page
  const channel = "sms";
  let verificationRequest;
  const phoneNumber =
    userData.phoneNumber.countryCode + "" + userData.phoneNumber.number;

  try {
    verificationRequest = await client.verify.v2
      .services(process.env.TWILIO_VERIFICATION_SID)
      .verifications.create({ to: phoneNumber, channel });
  } catch (e) {
    console.error(e);
    res.status(StatusCodes.BAD_REQUEST).json({ message: e.message });
    return;
  }

  // Redirect to the verify phone number page
  res.redirect("/verify-phone-number");
};

module.exports = {
  register,
  login,
  verify,
  sendOtp,
};
