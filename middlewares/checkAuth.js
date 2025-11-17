import Session from "../model/Session.js";
import User from "../model/User.js";

export const checkAuth = async (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  const session = await Session.findById(sessionId);
  console.log({ session, sessionId });
  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Please log in to continue.",
    });
  }
  const user = await User.findById(session.userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  req.user = user;
  next();
};
