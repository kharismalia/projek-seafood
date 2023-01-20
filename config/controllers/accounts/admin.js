import connection from "../../config/database.js";
import jwt from "jsonwebtoken";


export async function loginAdmin (req, res){
    const data = await connection.query(
      `SELECT * FROM admin WHERE username = '${req.body.username}'`
    );

    if (data.length > 0) {
      if (req.body.password === data[0].password) {
        const token = jwt.sign(data[0], process.env.SECRET_KEY,{expiresIn: process.env.JWT_EXPIRES_IN});
        res.status(200).json({message:"login berhasil",data:data,token:token});
      } else {
        res.status(401).json({ message: "Kata sandi salah."});
      }
    } else {
      res.status(401).json({ message: "Nama pengguna tidak ditemukan."});
    }
}



