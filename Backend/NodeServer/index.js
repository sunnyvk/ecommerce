const express=require("express");
const config=require("config");

const addressRelatedRoutes=require('./routes/address');
const categoriesRelatedRoutes = require('./routes/categories');
const subcatRelatedRoutes = require('./routes/subcategories');
const sub_subCategoriesRelatedRoutes=require('./routes/sub_subcategories')
const userRelatedRoutes = require('./routes/users')

const { request } = require("http");

const app=express();

app.use((request,response,next)=>{
    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Headers","*");
    response.header("Access-Control-Allow-Methods","*");
    
    next();
});

app.use(express.json());

app.use("/address",addressRelatedRoutes);
app.use("/categories", categoriesRelatedRoutes)
app.use("/sub",subcatRelatedRoutes);
app.use("/sub_sub",sub_subCategoriesRelatedRoutes)
app.use("/users",userRelatedRoutes)
const PortNo=config.get("PORT");
app.listen(PortNo,()=>{
    console.log("Server Started On Port : "+PortNo);
});




