export const login = async (req, res) => {
  try {
    const { email, password, forceLogin, isLogoutOtherDevices } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    // Step 1: User lookup
    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials."
      });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials."
      });
    }

    // Optional: logout all devices
    if (isLogoutOtherDevices) {
      await Session.deleteMany({ userId: user._id });
    }

    // Step 2: Count active sessions
    const sessions = await Session.find({ userId: user._id });

    // If 2 sessions exist & user has not confirmed override
    if (sessions.length >= 2 && !forceLogin) {
      return res.status(409).json({
        success: false,
        hasOtherSessions: true,
        message: "You already have 2 active logins. Proceed anyway?"
      });
    }

    // Step 3: Either allowed OR forceLogin = true

    let session;

    // Check if request already contains session cookie
    if (req.cookies.sessionId) {
      session = await Session.findOne({
        _id: req.cookies.sessionId,
        userId: user._id
      });
    }

    let sessionId;
    if (session) {
      session.lastUsedAt = new Date();
      await session.save();
      sessionId = session._id;
    } else {
      const newSession = await Session.create({ userId: user._id });
      sessionId = newSession._id;
    }

    res.cookie("sessionId", sessionId, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "strict"
    });

    return res.status(200).json({
      success: true,
      message: "Login successful."
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again."
    });
  }
};
