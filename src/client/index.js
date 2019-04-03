import axios from 'axios';

const touchTime = time => new Date().getTime() - time;

function measureSync(run, message, ...optionalParams) {
  const startTime = new Date().getTime();
  run();
  console.log(`${message}`, ...optionalParams, `(${touchTime(startTime)}ms)`);
}

async function measure(promise, message, ...optionalParams) {
  const startTime = new Date().getTime();
  await promise;
  console.log(`${message}`, ...optionalParams, `(${touchTime(startTime)}ms)`);
}

function appendSpines(spines) {
  measureSync(() => {
    const fragment = document.createDocumentFragment();
    const element = document.createElement('div');
    element.innerHTML = spines.join(); // 이렇게 할거면 DocumentFragment는 필요 없는데...?
    fragment.appendChild(element);
    document.getElementById('content').appendChild(fragment);
  }, 'Did finish append spines:');
}

function appendStyles(styles) {
  measureSync(() => {
    const element = document.createElement('style');
    element.innerText = styles.join(' ');
    document.head.append(element);
  }, 'Did finish append styles:');
}

function loadBook(result) {
  console.log(result.book);
  appendStyles(result.styles);
  appendSpines(result.spines);
  measure(new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 0);
  }), 'Did finish load content:');
  const totalImageCount = document.images.length;
  measure(new Promise((resolve) => {
    let count = 0;
    const tap = () => {
      count += 1;
      if (count >= totalImageCount) {
        resolve();
      }
    };
    Array.from(document.images).forEach((image) => {
      if (image.complete) {
        tap();
      } else {
        image.addEventListener('load', () => {
          tap();
        });
        image.addEventListener('error', () => {
          tap();
        });
      }
    });
  }), `Did finish load images(${totalImageCount}):`);
}

function fetchBook(file) {
  axios.get(`/api/book?filename=${encodeURI(file.name)}`).then((response) => {
    loadBook(response.data);
  }).catch((error) => {
    if (error.response.status === 404) {
      const formData = new FormData();
      formData.append('file', file);
      axios.post('api/book/upload', formData).then((response) => {
        loadBook(response.data);
      });
    } else {
      console.log(error);
    }
  });
}

function selectedFile() {
  const file = document.getElementById('import').files[0];
  fetchBook(file);
}

function selectFile() {
  document.getElementById('open_file').blur();
  document.getElementById('import').click();
}

window.selectedFile = selectedFile;
window.selectFile = selectFile;
