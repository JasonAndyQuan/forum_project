import asyncHandler from "express-async-handler";
const home = asyncHandler((req, res) => {
    console.log(" I am Home GET");
    res.send("this is home");
});
export default home;
