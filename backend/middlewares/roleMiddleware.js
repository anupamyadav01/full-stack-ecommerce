const roleMiddleware = (role) => (req, res, next) => {
  const user = req.user;
  console.log(user);

  if (role.includes(user.role)) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }
};

export default roleMiddleware;
