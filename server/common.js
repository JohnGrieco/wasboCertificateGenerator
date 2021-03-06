if(Meteor.isServer) {
    
    Router.route( "/loaderio-d81bed7422135cbfe4f47fe70ef241ee", { where: "server" } ).get(function(){
        var token = 'loaderio-d81bed7422135cbfe4f47fe70ef241ee';
        this.response.end(token);
    });
    
    Meteor.startup(function() {
        
        smtp = {
            username: 'postmaster%40sandbox95002c85725649aaa02ca6b3cd3d58f1.mailgun.org',
            password: 'a8f98fa860198a1f40da28362b6d264b',
            server: 'smtp.mailgun.org',
            port: 587
        }

        process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port; 
       
    });
    
    Workshops._ensureIndex({
        'title': 'text'
    });
    
    Houston.add_collection(Workshops); 
    Houston.add_collection(UserWorkshops);
    Houston.add_collection(Meteor.users);
    Houston.add_collection(Houston._admins);
    Houston.add_collection(Names);
    Houston.add_collection(Final); 
    
}
Meteor.methods({
    total: function(){
        var total = 0;
            
        for(var i = 0; i < UserWorkshops.find({userId: Meteor.user()._id}).fetch().length; i++){
                        
            total += UserWorkshops.find({userId: Meteor.userId()}).fetch()[i].creditValue;
        
        }
        return total;
    },
    final: function(){
        
        var name = Names.findOne({userId: Meteor.user()._id}).first + ' ' + Names.findOne({userId: Meteor.user()._id}).last;
        var email = Meteor.user().emails[0].address;
        var attend = [];
        for(var i = 0; i < UserWorkshops.find({userId: Meteor.user()._id}).fetch().length; i++){
            var temp = UserWorkshops.find({userId: Meteor.userId()}).fetch()[i].title;
            attend.push(temp);
        }
        //var attend = UserWorkshops.find({userId: Meteor.userId()}).fetch();
        var district = Names.findOne({userId: Meteor.user()._id}).district;
        //var idid = Final.findOne({email: Meteor.user().emails[0].address})._id;
        
        if(Final.findOne({email: Meteor.user().emails[0].address}) === undefined){
            Final.insert({name: name, email: email, district: district, attendedWorkshops: attend });
        }
        else{
            var idid = Final.findOne({email: Meteor.user().emails[0].address})._id;
            Final.update({_id: idid},{$set: {name: name, email: email, district: district, attendedWorkshops: attend} });
        }
        //Final.insert({name: name, email: email, attendedWorkshops: attend, district: district });
        //var idid = Final.findOne({email: Meteor.user().emails[0].address})._id;
        
        //Final.update({_id: idid},{$set: {name: name, email: email, attendedWorkshops: attend, district: district} });
        
    }

  });

Meteor.publish('final', function(){
   return final.find(); 
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