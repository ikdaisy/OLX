import userSchema from './models/user.model.js';
import productSchema from "./models/product.model.js";
import bcrypt from 'bcrypt';
import pkg from "jsonwebtoken";

const {sign}=pkg;

export async function signUp(req,res) {
  
    try{

        const {email,username,password,cpassword,place,address,phone,pincode,profile} = req.body;
        // console.log(profile);
        
        if(!(email&& username&& password&& cpassword && place&& address&& phone&& pincode))
            return res.status(404).send({msg:"Fields are empty"})
        if(password !== cpassword)
            return res.status(404).send({msg:"Password not matching"})
        bcrypt
        .hash(password,10)
        .then((hashedPassword)=>{
            userSchema
            .create({email,username,password:hashedPassword,place,address,phone,pincode,profile})
            .then(()=>{
                console.log("Success");
                return res.status(201).send({msg:"Successs"})
            })
            .catch((error)=>{
                console.log("Faliure");
                return res.status(404).send({msg:"Not registered"})
            })
        })
    }
    catch(error){
        return res.status(404).send({msg:error})

    }  
   
}

//sign in 
export async function signIn(req,res){
    try {
        const {email,password}=req.body
    // console.log(email,password);

    if(!(email&&password))
        return res.status(404).send({msg:"Fields are empty"})
    const user= await userSchema.findOne({email})
    // console.log(user);
    if(!user){
        return res.status(404).send({msg:"Invalid email"})
    }
    const success = await bcrypt.compare(password,user.password)
    // console.log(success);
    if(!success)
        return res.status(404).send({msg:"Invalid password"})
    const token = await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"})
    // console.log(token);
    res.status(200).send({msg:"Successfully logged in",token})
    } catch (error) {
        console.log(error);  
    }
}


//get products (index page)

export async function getProducts(req,res) {
   try{
    const products=await productSchema.find();
    console.log(req.user);

    const _id = req.user.userId
    // console.log(_id);
    const user = await userSchema.findOne({_id})
    // console.log(user.profile);

    return res.status(200).send({products,profile:user.profile,id:_id})
    
    
   
   }
   catch(error){
    res.status(404).send(error)
   }  
}

//get user data
export async function getUser(req,res) {
    try {
        const {id}=req.params;
        const data=await userSchema.findOne({_id:id});
        const userProducts= await productSchema.find({sellerId:id})
        console.log(userProducts);
        
        res.status(200).send({data,userProducts});
    } catch (error) {
        res.status(404).send(error)
    }
}

//edit user data
export async function editUser(req,res) {
    try {
        const {_id}=req.params;
    const {...user}=req.body;
    const data=await userSchema.updateOne({_id},{$set:{...user}});
    res.status(201).send(data);
    } catch (error) {
        res.status(404).send(error);
    }
    
}

//delete user

export async function deleteUser(req,res) {
    try {
        const _id=req.params
        console.log(_id);
        userSchema.deleteOne({_id}).then(()=>{
            res.status(200).send({msg:"Deleted"})
            // window.location.reload()
    
        }).catch((error)=>{
            console.log(error);
            
        })
    } catch (error) {
        console.log(error);  
    }
    
}


export async function addProduct(req,res) {
    try {
        const {pname,price,category,description,images,sellerId} = req.body;
        if(!(pname&&price&&category&&description&&images))
            return res.status(404).send({msg:"Fields are empty"})
       
        
        productSchema
            .create({pname,price,category,description,images,sellerId})
            .then(()=>{
                console.log("success");
                return res.status(201).send({msg:"successs"})
            })
            .catch((error)=>{
                console.log("faliure");
                return res.status(404).send({msg:"product not added"})
            })
    } catch (error) {
        res.status(404).send(error);
    }
}

//view product details
export async function getProductDetails(req,res) {
   try {
    const _id= req.params
    const data = await productSchema.findOne({_id})
   res.status(200).send(data)
   } catch (error) {
        return res.status(404).send(error)
   }
    
    
}

