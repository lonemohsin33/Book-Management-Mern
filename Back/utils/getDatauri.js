const DataURIParser = require('datauri/parser')
const path = require('path')

const getDatauri = (file) => {
    const parser = new DataURIParser();
    console.log(file)
    const extName = path.extName(file.name).toString();

    return parser.format(extName, file.buffer)
    
}
module.exports=getDatauri
