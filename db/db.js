import mongoose from "mongoose";



async function connector() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if(conn) {
            console.log("db connection sucessfull")
        }
    }
    catch(err){
        console.error("Database connection error: ", err);
        process.exit(1);
    }
}

export default connector;