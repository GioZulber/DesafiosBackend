let form = document.getElementById('productsForm');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let obj = {};
  let data = new FormData(form);
  data.forEach((value, key) => {
    obj[key] = value;
  });
  fetch('/api/productos', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
});
