const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'public/uploads/images',
    filename: function (req, file, callback ) {
        callback(null,
            path.basename(file.originalname)
            + '-' + Date.now()
            + '-' + path.extname(file.originalname)
        );
    }
});

module.exports = multer({ storage: storage });