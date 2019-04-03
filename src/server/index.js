import { EpubParser } from '@ridi/epub-parser';
import express from 'express';
import path from 'path';

const cwd = process.cwd();
const app = express();
const port = 8080;

app.use('/', express.static(path.join(cwd, 'public')));

app.get('/api/book', (req, res) => {
  const dataPath = './data';
  const fileName = path.basename(decodeURI(req.query.path));
  const unzipPath = path.join(dataPath, path.basename(fileName, path.extname(fileName)));
  const parser = new EpubParser(path.join(dataPath, fileName));
  parser.parse({ unzipPath }).then((book) => {
    res.send(book);
  });
});

app.listen(port, () => {
  console.log(`Express listening on port ${port}.`);
});
