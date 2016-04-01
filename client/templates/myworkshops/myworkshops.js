Template.myWorkshops.helpers({
    myWorkshops: function(){
       return UserWorkshops.find({userId: Meteor.userId()});
   },
   total: function(){
       
       var total = 0;
       var length = UserWorkshops.find({userId: Meteor.user()._id}).fetch().length;
        for(var i = 0; i < length; i++){
                        
            total += UserWorkshops.find({userId: Meteor.userId()}).fetch()[i].creditValue;
            
        }
        if(total > 16){
            total = 16;
            return total;
        }
        return total;
   }
});
