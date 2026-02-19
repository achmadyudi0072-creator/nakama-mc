auth.onAuthStateChanged(user => {
  if (!user) return location.href = "login.html";

  db.collection("members").doc(user.uid).get().then(doc => {
    if (doc.data().role !== "admin") {
      alert("Akses ditolak");
      location.href = "dashboard.html";
    }
  });
});

// TAMBAH PRODUK
function addProduct() {
  db.collection("products").add({
    name: pname.value,
    category: pcat.value,
    price: parseInt(pprice.value)
  }).then(() => alert("Produk ditambahkan"));
}

// LIST ORDER
db.collection("orders").orderBy("date","desc").onSnapshot(snap => {
  const list = document.getElementById("orderList");
  list.innerHTML = "";

  snap.forEach(doc => {
    const o = doc.data();
    list.innerHTML += `
      <div class="menu-card">
        <b>${o.product}</b><br>
        Member: ${o.name} (${o.chapter})<br>
        Total: Rp ${o.total.toLocaleString()}<br>
        Status: ${o.status}<br>
        <button onclick="updateStatus('${doc.id}','SELESAI')">
          TANDAI SELESAI
        </button>
      </div>
    `;
  });
});

// UPDATE STATUS
function updateStatus(id, status) {
  db.collection("orders").doc(id).update({ status })
    .then(() => alert("Status diupdate"));
}
