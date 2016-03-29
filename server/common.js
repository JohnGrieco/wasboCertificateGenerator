if(Meteor.isServer) {
    
    Houston.add_collection(Workshops); 
    Houston.add_collection(UserWorkshops);
    Houston.add_collection(Meteor.users);
    Houston.add_collection(Houston._admins);
    
}
    Meteor.methods({
        total: function(){
            var total = 0;
            
            for(var i = 0; i < UserWorkshops.find({userId: Meteor.user()._id}).fetch().length; i++){
                        
                total += UserWorkshops.find({userId: Meteor.userId()}).fetch()[i].creditValue;
        
            }
            return total;
   }
  });
  
Meteor.publish("userWorkshops", function(){
    return UserWorkshops.find();
});

Meteor.publish("workshops", function(){
    return Workshops.find();
});

Meteor.publish("names", function(){
    return Names.find();
});