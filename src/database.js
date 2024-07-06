const mongoose =  require("mongoose")

module.exports = ()=> {
    const connectionParams = {
        useNewUrlParser:  true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.MONGODB_URI,connectionParams);
        console.log("Connected to database successfully");

    } catch (error) {
        console.log("Error connecting to the database");
    }
}