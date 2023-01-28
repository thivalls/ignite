import express from "express";

const app = express();

app.get("/", (req, res) => {
    return res.json({
        hello: "heyy yo.. my route is runnig too!!!"
    })
})

app.listen(3000, () => { console.log("It is running!!!") });