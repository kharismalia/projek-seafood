import connection from "../../config/database.js";


export async function getCategoris(_req, res) {
    const query = `SELECT * FROM categories`;
    const data = await connection.query(query);
    if (data.length > 0) {
        res.status(200).json({message:"berhasil menampilkan data", data:data});
    }else{
        res.status(200).json({message:"data kosong", data:data});
    }
}
