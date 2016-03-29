Template.myWorkshops.helpers({
    myWorkshops: function(){
       return UserWorkshops.find({userId: Meteor.userId()});
   },
   total: function(){
       var total = 0;
            
        for(var i = 0; i < UserWorkshops.find({userId: Meteor.user()._id}).fetch().length; i++){
                        
            total += UserWorkshops.find({userId: Meteor.userId()}).fetch()[i].creditValue;
        
        }
        return total;
   }
});
