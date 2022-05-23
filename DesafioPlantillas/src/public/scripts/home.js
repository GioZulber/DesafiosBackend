let form = document.getElementById('productsForm');
console.log("hola");

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let obj = {};
  let data = new FormData(form);
  data.forEach((value, key) => {
    obj[key] = value;
  });
  fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
});
