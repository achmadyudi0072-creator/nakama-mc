const now = new Date();
const weekAgo = new Date();
weekAgo.setDate(now.getDate() - 7);

let weekly = 0;
let monthly = 0;

db.collection("orders").get().then(snap => {
  snap.forEach(doc => {
    const o = doc.data();
    const d = o.date.toDate();

    if (d >= weekAgo) weekly += o.total;
    if (d.getMonth() === now.getMonth()) monthly += o.total;
  });

  document.getElementById("weekly").innerText =
    "Rp " + weekly.toLocaleString();

  document.getElementById("monthly").innerText =
    "Rp " + monthly.toLocaleString();
});
