// backend/server.ts
import express from 'express';
import injectorMiddleware from './middleware/injectorMiddleware';
import appRoutes from "./routes/appRoutes";



const app = express();

// Add middleware to inject the container into requests
app.use(injectorMiddleware);
app.use('/api', appRoutes);

// start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
