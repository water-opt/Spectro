const Product = require("../models/Product");
//import file system
const fs = require('fs');


exports.create = async (req, res) => {
    
        console.log('req.body: ', req.body);
        console.log('req.file: ', req.file);
        console.log('req.user: ', req.user);

        const {filename} = req.file;
        const {productName, productDesc, productPrice, productCategory, productQty } =req.body;
        

        try{

            let product = new Product();
            product.fileName = filename;
            product.productName = productName;
            product.productDesc = productDesc;
            product.productPrice = productPrice;
            product.productCategory = productCategory;
            product.productQty = productQty;

            await product.save();

            res.json({
                successMessage: `${productName} was created`,
                product,
            });

        }catch (err) {
            console.log(err, 'productController.create error');
            res.status(500).json({
                errorMessage: 'Please try again later',
            });
        }
};

exports.readAll = async (req, res) => {
    
    try{

        const products = await Product.find({}).populate('productCategory', 'category');

        res.json({products});

    }catch (err) {
        console.log(err, 'productController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later'
        });
    }
};


exports.read = async (req, res) => {
    
    try{

        const productId = req.params.productId;;
        const product = await Product.findById(productId);
        
        res.json(product);

    }catch (err) {
        console.log(err, 'productController.read error');
        res.status(500).json({
            errorMessage: 'Please try again later'
        });
    }
};

exports.update= async (req, res) => {
    
    const productId = req.params.productId;

    if (req.file !== undefined) {
		req.body.fileName = req.file.filename;
	}

    try{

    const oldProduct = await Product.findByIdAndUpdate(productId, req.body);


    if (req.file !== undefined && req.file.filename !== oldProduct.fileName) {
		fs.unlink(`uploads/${oldProduct.fileName}`, err => {
			if(err) {
                console.error(`Error: ${err}`);
            }
			console.log('Image deleted from the filesystem');
		});
	}
    

    res.json({
        successMessage: 'Product successfully updated',
    });

   }catch (err) {
    console.log(err, "productController.update error");
    res.status(500).json({
        errorMessage: "Please try again later",
    });
   }

};

exports.delete = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ errorMessage: 'Product not found' });
        }

        // Assuming 'uploads' directory is in the root directory
        const filePath = `uploads/${deletedProduct.fileName}`;

        // Check if file exists before trying to delete it
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error('Error accessing file:', err);
                return res.status(500).json({ errorMessage: 'Error accessing file' });
            }

            // File exists, proceed to delete
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error('Error deleting file:', unlinkErr);
                    return res.status(500).json({ errorMessage: 'Error deleting file' });
                }

                console.log('Image successfully deleted from filesystem:', deletedProduct.fileName);
                res.json(deletedProduct);
            });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ errorMessage: 'Please try again later' });
    }
};