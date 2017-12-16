import express from 'express';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/dist', express.static('dist'));
app.use('/', routes);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
