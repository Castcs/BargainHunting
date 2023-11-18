// backend/server.ts
import express from 'express';
import appRoutes from "./routes/appRoutes";



const app = express();
app.use('/api', appRoutes);

// start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
