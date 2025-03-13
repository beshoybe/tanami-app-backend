const validateRequest = (schema) => async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({
          message: req.t("validation.failed"),
          errors: error.errors.map((err) => ({
            
            field: err.path.join("."),
            message: req.t(err.message), // Translate error message using req.t
          })),
        });
      }
  
      res.status(500).json({ message: req.t("error.internal_server") });
    }
  };
  
  export default validateRequest;
  