import 'dotenv/config'
import express from 'express';
import ReactDOM from 'react-dom/server';
import Main from '../shared/Main';
import indexTemplate from "../server/indexTemplate";

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/static', express.static('./dist/client'));

app.get('/', (req, res) => {
  res.send(
    indexTemplate(ReactDOM.renderToString(Main())),
  );
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} PORT`)
});