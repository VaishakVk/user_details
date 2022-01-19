const mongoose = require("mongoose");
module.exports = async () => {
    return new Promise((resolve) => {
        try {
            const dbname =
                process.env.NODE_ENV === "test"
                    ? process.env.MONGO_DB_NAME + "_test"
                    : process.env.MONGO_DB_NAME;
            const dbUrl = `mongodb://${process.env.MONGO_HOST}/${dbname}?retryWrites=true&w=majority`;
            mongoose.connect(
                dbUrl,
                { useNewUrlParser: true, useUnifiedTopology: true },
                (err) => {
                    if (err) {
                        console.log(`Error connecting to Database: ${err}`);
                        process.exit(1);
                    } else {
                        console.log("Connected to Database...");
                        resolve();
                    }
                }
            );
        } catch (err) {
            console.log(`Error connecting to Database: ${err}`);
            process.exit(1);
        }
    });
};
