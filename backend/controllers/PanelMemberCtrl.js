import PanelMemberRoute from "../models/PanelMembers.js"

export const PanelMember = async(req,res)=>{
    
    const name = req.body.name;
    const email = req.body.email;
    const GroupId = req.body.GroupId;
    
  const newPanel = new PanelMemberRoute({
        
    name,
    email,
    GroupId
    
  })

  newPanel.save().then(()=>{

    res.json("Panel Member Added");

}).catch((err) =>{
   
  console.log(err);

})

    
};