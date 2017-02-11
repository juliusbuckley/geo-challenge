import { getLatLong } from '../controllers/distanceController';
// API GET ROUTE
const distanceRoute = app => { app.post('/distance', getLatLong); };
export default distanceRoute;