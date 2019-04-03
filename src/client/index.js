import axios from 'axios';

const fetchBook = (path) => {
  axios.get(`/api/book?path=${encodeURI(path)}`).then((response) => {
    console.log(response);
  });
};

window.fetchBook = fetchBook;
