const { default: mongoose } = require("mongoose");

const responseCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true
    
   
  },
  imageURL: {
    type: String,
    unique: true,
    required: true
    
    
  },
});
const responseModal =  new mongoose.model("Response",responseCodeSchema );

module.exports={responseModal}