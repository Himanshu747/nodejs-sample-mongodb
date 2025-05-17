/*const db=require("../util/database");
const Cart = require("./cart");

module.exports=class Product {
    constructor(id,title,imageUrl,description,price){
        this.id=id;
        this.title=title;
        this.imageUrl=imageUrl;
        this.description=description;
        this.price=price;
    }
    save(){
        return db.execute("INSERT INTO products(title,price,description,imageUrl) VALUES(?,?,?,?)",[this.title,this.price,this.description,this.imageUrl]);
    }
    static fetchAll(){
        return db.execute("select * from products");
    }
    static findById(id){
        return db.execute("SELECT * FROM products where products.id=?",[id]);
    }
    static deleteById(id){
       
    }
}

const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Product= sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    title:Sequelize.STRING,
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    imageUrl:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
module.exports=Product;*/
const mongodb=require('mongodb');
const getDb=require('../util/database').getDb;

class Product{
    constructor(title,price,description,imageUrl,id,userId){
        this.title=title;
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId=userId;
    }
    save(){
         const db=getDb();
         let dbOp;
       if (this._id) {
        console.log(this._id);
            //update product
            dbOp=db.collection('products').updateOne({_id:this._id},{ $set: this});
        }
        else{
            dbOp=db.collection('products').insertOne(this);
                   
        }
       return dbOp.then((result)=>{
        
                        console.log('success');
                        // console.log(result);
                    })
                    .catch((error)=>{
                        console.log('error');
                        // console.log(error);
                    });
      
    }
    static fetchAll(){
        const db=getDb();
        return db.collection('products').find().toArray()
        .then(products=>{
          
            return products;
        })
        .catch(error=>{
            console.log(error)
        });
    }
    static findByPk(prodId){
        const db=getDb();
        return db.collection('products')
        .find({_id:new mongodb.ObjectId(prodId)})
        .next()
        .then(product=>{
         
            return product;
        })
        .catch(error=>{
            console.log(error);
        });
    }
    static deleteById(prodId){
        const db=getDb();
       return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)})
        .then(result=>{
            console.log('Deleted');
        })
        .catch(error=>{
            console.log(error);
        }); 
    }
}
module.exports=Product;