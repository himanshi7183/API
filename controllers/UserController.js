const UserModel = require("../models/user");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");

cloudinary.config({
  cloud_name: "dxyhdgkjz",
  api_key: "375114287438772",
  api_secret: "2hyAbHhzVn-h4amvY5DXUswEifM",
});

class UserController {
  static getalluser = async (req, res) => {
    try {
      res.send("hello user");
    } catch (error) {
      console.log(error);
    }
  };

  static userinsert = async (req, res) => {
    const file = req.files.image;
    const imageupload = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "profileImageApi",
    });
    // console.log(imageupload);

    const { n, e, p, cp } = req.body;
    const user = await UserModel.findOne({ e: e });
    // console.log(user);
    if (user) {
      res
        .status(401)
        .json({ status: "failed", message: "This email is already exists" });
    } else {
      if (n && e && p && cp) {
        if (p === cp) {
          try {
            const hashpassword = await bcrypt.hash(p, 10);
            const result = new UserModel({
              n: n, //usermodel: name:"n"
              e: e,
              p: hashpassword,
              image: {
                public_id: imageupload.public_id,
                url: imageupload.secure_url,
              },
            });
            await result.save();
            res
            .status(201)  //insert hone pr status codde 201
            .json({status:"success",message:"Registration successfully"})
          } catch (error) {
            console.log(error);
          }
        } else {
         
      res
      .status(401)
      .json({ status: "failed", message: "Password and confirm password does not match" });
        }
      } else {
      res
      .status(401)
      .json({ status: "failed", message: "All fields are required" });
      }
    }
  };
}

module.exports = UserController;
