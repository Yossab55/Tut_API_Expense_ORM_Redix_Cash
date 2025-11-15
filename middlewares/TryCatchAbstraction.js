function tryCatchFunction(callback) {
  return async function controllerWrapper(req, res, next) {
    try {
      await callback(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}
export { tryCatchFunction };
