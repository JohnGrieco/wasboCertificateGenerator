Template.certificate.helpers({
    total: function(){
       var total = 0;
            
        for(var i = 0; i < UserWorkshops.find({userId: Meteor.user()._id}).fetch().length; i++){
                        
            total += UserWorkshops.find({userId: Meteor.userId()}).fetch()[i].creditValue;
        
        }
        if(total > 16){
            total = 16;
            return total;
        }
        return total;
   },
   first: function(){
       var first = Names.findOne({userId: Meteor.user()._id}).first;
       return first;
   },
   last: function(){
       var last = Names.findOne({userId: Meteor.user()._id}).last;
       return last;
   } 
});



