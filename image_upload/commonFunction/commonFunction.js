const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
});
module.exports={
uploadImage: (imageData, callback) => {
    cloudinary.v2.uploader.upload(imageData, (error, success) => {
        if (error) {
            callback(error, null)
        }
        else {

            callback(null, success.secure_url)
        }

    })


}
}