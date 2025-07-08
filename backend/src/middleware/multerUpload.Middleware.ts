import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
  // fileFilter: (req, file, cb) => {
  //   const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

  //   if (allowedMimeTypes.includes(file.mimetype)) {
  //     cb(null, true);
  //   } else {
  //     cb(
  //       new Error("Invalid file type. Only JPEG, PNG, and GIF files are allowed.")
  //     );
  //   }
  // },
});


export const uploadSingleImage = upload.single('image');
