import { connect, disconnect } from "mongoose"; //Promise functions

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL); //Connect function returns a promise, it takes mulitple arguments, the first one is the mongoDB connection string
    } catch (error) {
        console.log(error);
        throw new Error("Could not Connect To MongoDB");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Could not Disconnect From MongoDB");
    }
}

export { connectToDatabase,disconnectFromDatabase };