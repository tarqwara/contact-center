import express from 'express';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.set('views', __dirname);
app.set('view engine', 'pug');

app.use('/', routes);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
