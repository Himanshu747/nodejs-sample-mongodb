const Product = require("../models/product");
const Cart=require("../models/cart");
exports.getProducts = (req,res,next)=>{

      Product.fetchAll().then(products=>{
            res.render('shop/product-list',{
                  prod:products,
                  docTitle:'Admin Products',
                  path:'/products'
            });  
      });
};

exports.getProduct= (req,res,next)=>{
     const productId=req.params.productId;

     Product.findByPk(productId)
      .then(products =>{
            res.render('shop/product-details',{product:products,docTitle:products.title,path:'/products'});
      })
      .catch(error=>{console.log(error)});
}

exports.getIndex=(req,res,next)=>{
      Product.fetchAll()
      .then(product=>{
            res.render('shop/index',{
                  prod:product,
                  docTitle:'Shop',
                  path:'/'
            });
      })
      .catch(error=>{
            console.log(error);
      });

};

exports.getCart=(req,res,next)=>{
      // console.log(req.user.getCart());
      req.user
      .getCart()
      .then((products)=>{
                              res.render('shop/cart',
                              {
                                          path:'/cart',
                                          docTitle:'Your Cart',
                                          products:products
                              });
            
            
      })
      .catch((err)=>{ console.log(err);});
  
    
};

exports.postCart=(req,res,next)=>{
      const prodId=req.body.productId;
      Product.findByPk(prodId)
      .then(product=>{
            return req.user.addToCart(product);
      }).then(result=>{
           
            console.log(result);
             res.redirect("/cart");
      });
   

}

exports.postCartDeleteProduct=(req,res,next)=>{
      const prodId=req.body.productId;

      req.user
      .deleteItemFromCart(prodId)
      .then(result=>{
            res.redirect('/cart');
      })
      .catch(err=>console.log(err));

}
exports.postOrder=(req,res,next)=>{
      let fetchedCart;  
      req.user
      .addOrder()
      .then(result=>{
            res.redirect('/orders');
      })
      .catch(err=>console.log(err));
};

exports.getOrders=(req,res,next)=>{
      req.user
      .getOrders()
      .then(orders=>{
            res.render('shop/orders',{
                  path:'/orders',
                  docTitle:'Your Orders',
                  orders:orders
            });
      })
      .catch(err=>{
            console.log(err);
      });
     
};


exports.getCheckout=(req,res,next)=>{
//       res.render('shop/checkout',{
//             path:'/checkout',
//             pageTitle:'Checkout'
//       });
 }


  