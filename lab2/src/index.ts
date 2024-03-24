import { app } from "./start";


/**
* App Variables
*/


const PORT : number = (process.env.PORT as unknown as number) || 8080;


/**
* Server Activation
*/


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});