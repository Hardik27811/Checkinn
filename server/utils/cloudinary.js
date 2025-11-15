const  {v2 : cloudinary} = require ("cloudinary")
const  fs = require ("fs")


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET  
});
    
const uplaodOnCloudinary = async (localFilePath)=>{
    try {
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        //file uplaod 
        console.log("file is uploaded on cloudinary",response.url);
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the local saved temp file as image uplaod git failed
        return null
    }
}

module.exports =  {uplaodOnCloudinary}