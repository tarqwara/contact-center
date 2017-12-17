import express from 'express';
import {renderFile} from 'ejs';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'html');
app.set('views', 'dist');
app.engine('html', renderFile);

app.use('/dist', express.static('dist'));
app.use('/', routes);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
