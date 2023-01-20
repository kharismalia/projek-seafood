fetch("/api/v1/product", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    let result = data.data;
    if (data.data.length > 0) {
      for (let i = 0; i < result.length; i++) {
        const tr = document.createElement("tr");

        const tdNo = document.createElement("td");
        tdNo.textContent = i + 1;
        tr.appendChild(tdNo);

        const tdName = document.createElement("td");
        tdName.textContent = result[i].nama;
        tr.appendChild(tdName);

        const tdHarga = document.createElement("td");
        tdHarga.textContent = result[i].harga;
        tr.appendChild(tdHarga);

        const tdStok = document.createElement("td");
        tdStok.textContent = result[i].stok;
        tr.appendChild(tdStok);

        // const tdPhoto = document.createElement("td");
        // tdPhoto.textContent = result[i].photo;
        // tr.appendChild(tdPhoto);

        const tdKategori = document.createElement("td");
        tdKategori.textContent = result[i].name;
        tr.appendChild(tdKategori);

        const tdEdit = document.createElement("td");
        tdEdit.style.display = "flex"
        tdEdit.style.gap = "8px"
        tdEdit.style.justifyContent = "center"

        const anchorEdit = document.createElement("a");
        anchorEdit.href = `./edit?id=${result[i].id}`
        anchorEdit.style.background = "none";
        anchorEdit.style.border = "none";
        // anchorEdit.href = `#`;
        // anchorEdit.id = "update"
        const iconEdit = document.createElement("img");
        iconEdit.src = "../image/edit-24.png"
        anchorEdit.appendChild(iconEdit)
        tdEdit.appendChild(anchorEdit);

        // anchorEdit.onclick = () => {
        //   fetch(`/api/v1/product/${result[i].id}`, {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        //   })
        //     .then((response) => response.json())
        //     .then((data) => {
        //       document.updateProduct.name1.value = data.data[0].nama;
        //       document.updateProduct.harga1.value = data.data[0].harga;
        //       document.updateProduct.stok1.value = data.data[0].stok;
        //       document.updateProduct.photo1.files[1] = data.data[0].photo;
        //       const kategoriUpdate = document.querySelector("#kategori1");
        //       fetch("/api/v1/category", {
        //         headers: {
        //           Authorization: `Bearer ${localStorage.getItem("token")}`,
        //         },

        //       })
        //         .then(response => response.json())
        //         .then(kategori => {
        //           if (kategori.data.length > 0) {
        //             kategori.data.map(item => {
        //               const option = document.createElement("option");
        //               option.value = item.id;
        //               option.textContent = item.name;
        //               kategoriUpdate.appendChild(option);
        //               if (item.id === data.data[0].kategori) {
        //                 option.selected = true
        //               }
        //             });
        //           } else {
        //             const option = document.createElement("option");
        //             option.textContent = "KOSONG";
        //             kategoriUpdate.appendChild(option);
        //           }

        //         });
        //     });
        //   document.updateProduct.onsubmit =  (e) => {
        //     e.preventDefault();
        //     const nama = document.updateProduct.name1.value;
        //     const harga = document.updateProduct.harga1.value;
        //     const stok = document.updateProduct.stok1.value;
        //     const photo = document.updateProduct.photo1.files[1];
        //     const kategori = document.updateProduct.kategoris.value;

        //     fetch(`/api/v1/product/${data.data[0].id}`, {
        //       method: "PUT",
        //       headers: {
        //         Authorization: `Bearer ${localStorage.getItem("token")}`,
        //       },
        //       body: JSON.stringify({
        //         nama : nama,
        //         harga : harga,
        //         stok : stok,
        //         photo : photo,
        //         kategori : kategori
        //       })
        //     }).then(res => res.json())
        //       .then(data => {
        //         if (data.data[0].message === "berhasil update makanan") {
        //           modalUpdate.style.display = "none";
        //           location.reload();
        //         } else {
        //           modalUpdate.style.display = "none"
        //           alert("tidak berhasil menambahkan data")
        //         }
        //       })
        //   };


        //   const modalUpdate = document.getElementById("modalUpdate");
        //   const spanUpdate = document.getElementsByClassName("close")[1];
        //   modalUpdate.style.display = "block";
        //   spanUpdate.onclick = function () {
        //     modalUpdate.style.display = "none";
        //     location.reload()
        //   }

        //   window.onclick = function (event) {
        //     if (event.target == modalUpdate) {
        //       modalUpdate.style.display = "none";
        //       location.reload()
        //     }
        //   }
        // }

        const buttonDelete = document.createElement("button");
        buttonDelete.style.border = "none"
        buttonDelete.style.cursor = "pointer"
        const iconTrash = document.createElement("img");
        iconTrash.src = "../image/trash-24.png"
        buttonDelete.appendChild(iconTrash);
        buttonDelete.onclick = () => {
          if (
            confirm(
              `Apakah Anda yakin ingin menghapus ${result[i].nama} (${result[i].id})?`
            )
          ) {
            fetch(`/api/v1/product/${result[i].id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            location.reload();
          }
        };
        tdEdit.appendChild(buttonDelete);

        const detail = document.createElement("button");
        detail.style.background = "none";
        detail.style.border = "none";
        const iconDetail = document.createElement("img");
        iconDetail.src = "../image/detail-24.png"
        detail.appendChild(iconDetail);
        detail.onclick =  () => {
          const detail = document.getElementById("detail");
          const span = document.getElementsByClassName("close")[2];
          detail.style.display = "block";

          span.onclick = function () {
            detail.style.display = "none";
            location.reload();
          }

          window.onclick = function (event) {
            if (event.target == detail) {
              detail.style.display = "none";
              location.reload();
            }
          }

          fetch(`/api/v1/product/${result[i].id}`, {
            method:"GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }).then(res => res.json())
          .then(dataDetail =>{
              const container = document.querySelector("#containerdetail");
              const div =  document.createElement("div");
              div.style.boxShadow = "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              const img = document.createElement("img");
              img.src = `../images/${dataDetail.data[0].photo}`
              img.height = "200";
              img.width = "264";
              img.style.padding = "6px"
              div.appendChild(img)


              const ui = document.createElement("ul");
              ui.style.listStyle = "none"
              ui.style.maxWidth = "256px"
              ui.style.width = "100%"
              const liNama = document.createElement("li");
              liNama.textContent = `NAMA: ${dataDetail.data[0].nama}`;
              const liHarga = document.createElement("li");
              liHarga.textContent = `HARGA: ${dataDetail.data[0].harga}`; 
              const liStok = document.createElement("li");
              liStok.textContent = `STOK: ${dataDetail.data[0].stok}`;
              
              const liKategori = document.createElement("li");
              liKategori.textContent = `KATEGORI: ${dataDetail.data[0].nama_kategori}`;
            
              ui.appendChild(liNama);
              ui.appendChild(liHarga);
              ui.appendChild(liStok);
              ui.appendChild(liKategori);

              container.appendChild(div);
              container.appendChild(ui);

          });
        }

        tdEdit.appendChild(detail);

        tr.appendChild(tdEdit);

        document.querySelector("tbody").appendChild(tr)
      }
    } else {
      const h1 = document.createElement("h1");
      h1.textContent = "PRODUCT KOSONG"
      h1.style.padding = "1rem"
      document.querySelector('tbody').appendChild(h1)
    }

  })


// modal
const modal = document.getElementById("myModal");
const btn = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// end modal //

// get kategori
const kategori = document.querySelector("#kategori");
fetch("/api/v1/category", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },

})
  .then(response => response.json())
  .then(data => {
    if (data.data.length > 0) {
      data.data.map(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name;
        kategori.appendChild(option);
      });
    } else {
      const option = document.createElement("option");
      option.textContent = "KOSONG";
      kategori.appendChild(option);
    }

  });

// end kategori  //


// tambah product

document.newProduct.onsubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("nama", document.newProduct.name.value);
  data.append("harga", document.newProduct.harga.value);
  data.append("stok", document.newProduct.stok.value);
  data.append("photo", document.newProduct.photo.files[0]);
  data.append("kategori", document.newProduct.kategori.value);

  await fetch("/api/v1/product", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
  }).then(res => res.json())
    .then(data => {
      modal.style.display = "none";
      location.reload()
    })
}



// modal update



// end modal update