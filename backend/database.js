const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://desikitchen:pZkt1qPlldXmdqJS@cluster0.6jkxn0s.mongodb.net/desikitchen?retryWrites=true&w=majority'

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Database Connected...");
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        //console.log(data);
        global.food_items = data;
        const foodCategory = await mongoose.connection.db.collection("food_category");
        const food_cat = await foodCategory.find({}).toArray();
        global.food_category = food_cat;
        //console.log(global.food_category)
    } catch (err) {
        console.log("----", err, "----");
    }
}

module.exports = mongoDB;
