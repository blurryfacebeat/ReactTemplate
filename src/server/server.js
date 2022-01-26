import 'dotenv/config';
import express from 'express';
import ReactDOM from 'react-dom/server';
import indexTemplate from '../server/indexTemplate';
import App from '../shared/App';

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/static', express.static('./dist/client'));

app.get('/', (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(App())));
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} PORT`);
});
