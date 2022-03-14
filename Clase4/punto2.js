const { fromEvent, map, Observable } = rxjs;

const textBox = document.getElementById('textBox');
const textReverse = document.getElementById('textReverse');
let textObservable = fromEvent(textBox, 'keyup').pipe(
  map((val) => {
    if (val.target.value === 'error') {
      observer.error();
    } else if (val.target.value === 'complete') {
      console.log('proceso completo');
      observer.completed();
    } else {
      observer.next();
    }
    return val.target.value;
  })
);

let observer = textObservable.subscribe({
  next: () => {
    textReverse.innerText = textBox.value.split('').reverse().join('');
  },
  error: () => {
    textBox.value = '';
    textReverse.innerText = '';
    textBox.disabled = true;
  },
  completed: () => {
    textBox.value = '';
    textReverse.innerText = '';
    textBox.disabled = true;
  },
});

const time = 30000;

setTimeout(() => {
  observer.unsubscribe();
  textBox.value = '';
  textReverse.innerText = '';
  textBox.disabled = true;
  console.log('Me desuscribi');
}, time);
