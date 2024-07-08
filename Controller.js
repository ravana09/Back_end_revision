const Model = require('../Models/Models')
const path = require('path');
const multer = require('multer');

exports.getall = async(req,res,next)=>{
    try
    {
    const Doc = await Model.find({});
    if(!Doc) return res.status(404).json({message:"No data found"})
    return res.status(200).json({data:Doc})
    }
    catch(err)
    {
        return res.status(500).json({Error : err.message})
    }
}

exports.create = async(req,res,next)=>{
    try
    {
    const {name,age,userPhoto} = req.body;

    const SampleDoc = new Model({name,age,userPhoto});
    await SampleDoc.save();
    return res.status(201).json({message:"Created Successfully",data:SampleDoc});
    }
    catch(err){
        return res.status(400).json({error:'Something is wrong',message:err.message})
    }
}

exports.update = async(req,res,next)=>{
    try
    {
        const {id} = req.params;
        const {name,age,userPhoto} = req.body;
        const updateObj = {}
        if(name) updateObj.name = name;
        if(age) updateObj.age = age; 
        if(userPhoto) updateObj.userPhoto = userPhoto; 

        const updatedRecord = await Model.findByIdAndUpdate(id,updateObj,{new:true})

        if(!updatedRecord){
            return res.status(404).json({error:"Data Not Found"})
        }

        return res.status(200).json({message:"Record Updated Successfully",data:updatedRecord})
    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
}

exports.remove = async(req,res,next)=>{
    try
    {
        const {id}=req.params
        const deletedRecord = await Model.findByIdAndDelete(id);

        if(!deletedRecord){
            return res.status(404).json({message:"Record not found!!!"})
        }

        return res.status(200).json({message:"Record Deleted Successfully",data:deletedRecord})

    }
    catch(err)
    {
        return res.status(400).json({message:err.message})
    }

}

exports.getbyid = async(req,res,next)=>{
    try
    {
        const {id} = req.params;

        const Record = await Model.findById(id);

        if(!Record){
            return res.status(404).json({message:"Record not found!!!"})
        }
        return res.status(200).json({message:"Record found successfully",data:Record})
    }
    catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}

exports.imageupload = async(req,res,next)=>{
    try
    {
        let uploadedFileName = '';
        const filePath = path.join(__dirname + '/Data/Image');
        const UploadStorage = multer.diskStorage({
            destination:filePath,
            filename:(req,file,cb)=>{
                const originalname = file.originalname;
                const fileExtension = path.extname(originalname);
                const uniqueSuffix = Date.now();
                const newFileName = path.basename(originalname,fileExtension)+ '_' + uniqueSuffix + fileExtension;
                uploadedFileName = 'Data/Image/' + newFileName ;

                cb(null,newFileName)
            }
        });
        const upload = multer({storage:UploadStorage},).single('image');

        upload(req,res,async function(err){
            if(err){
                return res.status(500).json({command :"Error Uploading file",err})
            }
            res.status(200).json({ImageUploaded:uploadedFileName})
        })
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
}