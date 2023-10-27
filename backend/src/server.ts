// backend/server.ts
import express from 'express';
// backend/server.ts
import injectorMiddleware from './middleware/injectorMiddleware';
import appRoutes from "./routes/appRoutes";



const app = express();

// Add middleware to inject the container into requests
app.use(injectorMiddleware);
app.use('/api', appRoutes);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});