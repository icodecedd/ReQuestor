import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Not authenticated." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error in vefiryToken: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
