import express from 'express';
import path from 'path';
import distanceRoute from './routes/distanceRoute';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import config from '../../webpack.config';

const app = express();
const port = process.env.PORT || 8080;

const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  path: config.output.path
}));
app.use(require('webpack-hot-middleware')(compiler));


app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../public-dist')));
app.use('/css', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/css')));
app.use(bodyParser.json());

// ROUTES
distanceRoute(app);

app.listen(port, () => { console.log(`app.js has been served on port: ${port}`); });

export default app;