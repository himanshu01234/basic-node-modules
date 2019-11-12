const Schema=require('../model/bookModel')
module.exports={
    add:(req,res)=>{
        if(!req.body.bookName||!req.body.userId||!req.body.price||!req.body.standard||!req.body.edition)
        {
            res.send({responseCode:500, responseMessage:"Parameter Missing"})
        }
        else
        {
            Schema.findOne({ $or:[{bookName:req.body.bookName},{ownerId:req.body.ownerId}]},(error,success)=>{
                if(error){
                    res.send({responseCode:500, responseMessage:"Internal server error"})
                }
                else if(success)
                {
                    if(req.body.bookName==success.bookName)
                    {
                        
                        res.send({responseCode:404, responseMessage:"Book name already exists"})
                    }
                    else{
                        res.send({responseCode:404, responseMessage:"Owner ID already exists"})
                    }
                }
                else{
                    var obj=new Schema(req.body)
        obj.save((error1,success1)=>
        {
            if(error1)
            {
                res.send({responseCode:500, responseMessage:"Internal server error"})
            }
            else if(success1){
                res.send({responseCode:200, responseMessage:"Book added successfully"})
            }
            else{
                res.send({responseCode:404, responseMessage:"Book not added"})
            }
        })
                }
            })
        }

    }
}