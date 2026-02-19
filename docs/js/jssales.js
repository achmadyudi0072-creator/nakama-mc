function submitOrder() {
  const product = document.getElementById("product").value;
  const qty = parseInt(document.getElementById("qty").value);
  const price = parseInt(document.getElementById("price").value);
  const total = qty * price;

  auth.onAuthStateChanged(user => {
    if (!user) return;

    db.collection("members").doc(user.uid).get().then(doc => {
      const m = doc.data();

      const orderData = {
        uid: user.uid,
        name: m.roadname,
        chapter: m.chapter,
        product,
        qty,
        price,
        total,
        date: new Date(),
        status: "MENUNGGU VERIFIKASI"
      };

      db.collection("orders").add(orderData)
        .then(() => {
          sendToDiscord(orderData);
          alert("Order berhasil dikirim");
        });
    });
  });
}
