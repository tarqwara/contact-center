import express from 'express';
import {renderFile} from 'ejs';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'html');
app.set('views', 'dist');
app.engine('html', renderFile);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/dist', express.static('dist'));
app.use('/', routes);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
