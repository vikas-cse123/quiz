router.post(
  "/avatar/:id",
  (req, res, next) => {
    upload.single("avatar")(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({
            success: false,
            message: "File size exceeds 16MB limit",
          });
        }

        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      next();
    });
  },
  uploadAvatar
);
