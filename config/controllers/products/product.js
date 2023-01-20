import connection from "../../config/database.js";
import fs from "fs"


export async function getProducts(_req, res) {
    const query = `SELECT a.*,b.name FROM products a INNER JOIN categories b ON a.kategori=b.id`;
    const data = await connection.query(query);
    if (data.length > 0) {
        res.status(200).json({message:"berhasil menampilkan data", data:data});
    }else{
        res.status(200).json({message:"data kosong", data:data});
    }
}

export async function getProductById(req, res) {
    const query = `SELECT a.*,b.name AS nama_kategori FROM products a INNER JOIN categories b ON a.kategori=b.id WHERE a.id = ${req.params.id}`;
    const data = await connection.query(query);
    if (data.length > 0) {
        res.status(200).json({message:"berhasil menampilkan data", data:data});
    }else{
        res.status(200).json({message:"data kosong", data:data});
    }
}

export async function postProducts(req, res) {
    const request = req.body
    const check = await connection.query(`SELECT * FROM products WHERE nama='${request.nama}'`);
    if(check.length > 0){
        res.status(400).json({message:"makanan sudah ada"});   
    }else{
        if(request.stok < 1 || request.stok > 100){
           return res.status(400).json({message:"stok tidak valid"});          
        }
        
        if(!req.file){
           return res.status(400).json({
                message: "image must be filled",
            });
        }

        await connection.query(
            `INSERT INTO products VALUES (NULL, '${request.nama}', '${request.harga}','${request.stok}','${req.file.filename}', '${request.kategori}')`
        );
        
        res.status(201).json({message:"berhasil manambahkan data", data:req.body})      
    }
}



export async function editProdcutById(req, res) {
    const request = req.body
    if(request.stok < 1 || request.stok > 100){
       return res.status(400).json({message:"stok tidak valid"});          
    }
    await connection.query(
        `UPDATE products SET nama = '${request.nama}', harga = '${request.harga}', stok = '${request.stok}', photo = '${req.file.filename}', kategori = '${request.kategori}' WHERE id = '${req.params.id}'`
    );

    res.status(200).json({message:`berhasil update makanan`, data:request})      
    
}

export async function deleteProductById(req, res) {
    const row = await connection.query(`SELECT photo FROM products WHERE id = '${req.params.id}'`);
    await connection.query(`DELETE FROM products WHERE id = '${req.params.id}'`);
    res.status(200).json({message:"berhasil menghapus product"});
}