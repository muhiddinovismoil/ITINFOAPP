export const blogController = (req, res, next) => {
  try {
    res.send(["blog1", "blog2"]);
  } catch (error) {
    next(error);
  }
};