const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        if (file.fieldname === 'insurance') {
            callBack(null, './uploads/vehicle/insurance')
        } else if (file.fieldname === 'license') {
            callBack(null, './uploads/vehicle/license')
        } else {
            callBack(new Error('Invalid field name ..'))
        }       
    },
    filename: (req, file, callBack) => {
        let ext = path.extname(file.originalname)
        callBack(null, Date.now() + ext)
    }
})

const upload = multer ({
    storage: storage,
    // fileFilter: (req, file, callBack) => {
    //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
    //         callBack(null, true)
    //     } else {
    //         console.log('invalid file type !!')
    //         callBack(null, false)
    //     }
    // },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload