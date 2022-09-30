const fs=require('fs');
const path=require('path');
const rimraf = require("rimraf");

function uploadOneFile(link, stream){
    return new Promise((resolve, reject) => {
      if(stream){
        const uploadDir = path.join(__dirname, `../uploads/${link}`);
        
        if(!fs.existsSync(uploadDir))
            fs.mkdirSync(uploadDir, {recursive: true});

        const filename = Date.now()+ '.' + stream.path.split('.')[stream.path.split('.').length - 1];
        const pathM = path.join(uploadDir, filename);
        stream.pipe(fs.createWriteStream(pathM), { end: false });

        stream.on('end', function() {
          resolve(filename);
        });

        stream.on('error', function (err) {
          reject(err);
        });
      }else{
        resolve(null)
      }
    });
}

function removeFileOne(link,filename){
    const uploadDir = `uploads/${link}`;
    const pathM = path.join(__dirname, '../'+`${uploadDir}/${filename}`);
    if (fs.existsSync(pathM)) {
      fs.unlinkSync(pathM);
    }
    return true;
}

function createFolder(fname){
    const pathM = path.join(__dirname, '../'+`uploads/${fname}`);
    if (fs.existsSync(pathM)){
        return false;
    }
    fs.mkdirSync(pathM);
    return true;
}


async function getFolder(fname){
    const pathM = path.join(__dirname, '../'+`uploads/${fname}`);
    const opt=await fs.readdirSync(pathM);
    return opt;
}

async function getFolderUtils(fname){
    const pathM = path.join(__dirname, '../'+`uploads/${fname}`);
    const stats = fs.statSync(pathM);
    return stats;
}

async function delFolder(fname){
    const pathM = path.join(__dirname, '../'+`uploads/${fname}`);
    rimraf(pathM, function () { return });
}




module.exports={uploadOneFile,removeFileOne,createFolder,getFolder,getFolderUtils,delFolder};



