// Multer middleware
const multer = require("multer");
let storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "public/uploads/post");
    },
    filename: function (request, file, callback) {
        callback(
            null,
            file.fieldname + "_" + Date.now() + "_" + file.originalname
        );
    },
});

let upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
}).single("image");

module.exports = upload;
