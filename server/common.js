if(Meteor.isServer) {
    
    Workshops._ensureIndex({
        'title': 'text'
    });
    
    Houston.add_collection(Workshops); 
    Houston.add_collection(UserWorkshops);
    Houston.add_collection(Meteor.users);
    Houston.add_collection(Houston._admins);
    Houston.add_collection(Names); 
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

//Meteor.publish("workshops", function(){
//    return Workshops.find();
//});

Meteor.publish("names", function(){
    return Names.find();
});

Meteor.publish("workshops", function(searchValue) {
  if (!searchValue) {
    return Workshops.find({});
  }
  return Workshops.find(
    { $text: {$search: searchValue} },
    {
      // `fields` is where we can add MongoDB projections. Here we're causing
      // each document published to include a property named `score`, which
      // contains the document's search rank, a numerical value, with more
      // relevant documents having a higher score.
      fields: {
        score: { $meta: "textScore" }
      },
      // This indicates that we wish the publication to be sorted by the
      // `score` property specified in the projection fields above.
      sort: {
        score: { $meta: "textScore" }
      }
    }
  );
});