const express = require('express');
const app = express();
const db = require("./models");
const customerRouter = require('./router/customer');
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use('/api/', customerRouter);

app.get('/', (req, res) => {
    res.send(`Node JS!`);
    console.log("Node JS!");
});

const port = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});