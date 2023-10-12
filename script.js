// Mendefinisikan URL dari file JSON
const jsonURL = 'data.json';

// Fungsi untuk mengambil dan menampilkan data dari file JSON
function tampilkanData() {
    fetch(jsonURL)
        .then(response => response.json())
        .then(data => {
            const cardContainer = document.getElementById('dataBody');
            cardContainer.innerHTML = '';

            data.forEach((item, index) => {
                const card = `<div class="col-md-4 mb-3">
                        <div class="card">
                        <img src="${item.img}" class="card-img-top" alt="Gambar">
                                <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>
                                    <h5 class="card-title">${item.num}</h5>
                                    <p class="card-text">${item.NickName}</p>
                                    <button class="btn btn-primary btn-sm" onclick="detailData(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                  </svg></button>
                                    <button class="btn btn-primary btn-sm" onclick="editData(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                  </svg></button>
                                    <button class="btn btn-danger btn-sm" onclick="hapusData(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                  </svg></button>
                                </div>
                        </div>
                            </div>`;
                cardContainer.innerHTML += card;
            });
        })
        .catch(error => console.error('Terjadi kesalahan:', error));
}

// Memanggil fungsi untuk menampilkan data saat halaman dimuat
document.addEventListener('DOMContentLoaded', tampilkanData);

// Fungsi untuk menangani submit form
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const num = document.getElementById('num').value;
  const img = document.getElementById('img').value;
  const NickName = document.getElementById('NickName').value;

  // Simulasikan pengiriman data ke server (dalam contoh ini, hanya menambahkannya ke array)
  tambahkanData(name, num, img, NickName);
});

// Fungsi untuk menambahkan data ke array dan menampilkan card baru
function tambahkanData(name, num, img, NickName) {
  const cardContainer = document.getElementById('dataBody');

  // Simulasikan pengiriman data ke server (dalam contoh ini, hanya menambahkannya ke array)
  const newItem = {
      name: name,
      num: num,
      img: img,
      NickName: NickName
  };

  // Menambahkan data baru ke JSON
  fetch(jsonURL)
      .then(response => response.json())
      .then(data => {
          data.push(newItem);

          // Menyimpan data JSON yang diperbarui
          return fetch(jsonURL, {
              method: 'PUT', // Anda dapat mengganti metode HTTP sesuai dengan kebutuhan Anda
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });
      })
      .then(() => {
          // Setelah data disimpan, tambahkan card baru
          tambahkanCard(cardContainer, newItem, data.length - 1);

          // Kosongkan formulir
          document.getElementById('name').value = '';
          document.getElementById('num').value = '';
          document.getElementById('img').value = '';
          document.getElementById('NickName').value = '';
      })
      .catch(error => console.error('Terjadi kesalahan:', error));
}

function editData(index) {
  const newData = prompt('Edit data:', JSON.stringify(data[index]));
  if (newData) {
    data[index] = JSON.parse(newData);
    tampilkanData();
  }
}

function hapusData(index) {
  if (confirm('Yakin ingin menghapus data ini?')) {
    data.splice(index, 1);
    tampilkanData();
  }
}
