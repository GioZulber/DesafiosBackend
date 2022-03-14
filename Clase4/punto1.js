const { fromEvent } = rxjs;
const { switchMap, tap, map } = rxjs.operators;

const textBox = document.getElementById('textBox');
const textReverse = document.getElementById('textReverse');

const textObservable = fromEvent(textBox, 'keyup');

const observer = (event) => {
  let text = event.target.value;
  console.log(text);
  if (text === 'error') {
    console.log('Se ingreso error');
    observer.error(() => {
      textBox.value = '';
      textReverse.innerText = '';
      textBox.disabled = true;
    });
  } else if (text === 'complete') {
    console.log('proceso completo');
    observer.complete(() => {
      textBox.value = '';
      textReverse.innerText = '';
      textBox.disabled = true;
    });
  } else {
    textReverse.innerText = textBox.value.split('').reverse().join('');
  }
};

const subscribe = textObservable.subscribe(observer);

const time = 30000;

setTimeout(() => {
  observer.unsubscribe();
  textBox.value = '';
  textReverse.innerText = '';
  textBox.disabled = true;
  console.log('Me desuscribi');
}, time);
