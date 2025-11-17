export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
    
  } catch (err) {
    console.error("Logout error:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to logout. Please try again."
    });
  }
};
