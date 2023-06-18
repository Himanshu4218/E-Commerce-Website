import mongoose from "mongoose";
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const mongodb = async() => {
    mongoose.connect(process.env.MONGO_URI,connectionParams)
    .then(async() => {
        console.log(`Connected`);
        const data = await mongoose.connection.db.collection("Samples");
        const res = await data.find({}).toArray();
        // console.log(res);
    })
    .catch((e) => {
        console.log(`Error: ${e}`);
    });
}
export default mongodb;