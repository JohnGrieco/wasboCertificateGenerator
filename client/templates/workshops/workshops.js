Template.workshops.helpers({
   workshops: function(){
       return Workshops.find({});
   } 
});

Template.workshops.events({
    'submit .workshop': function(event){
        var input = event.target.text.value;
        //need to deal adding the same workshop more than once
        if(Number(input) === this.code && UserWorkshops.findOne({userId: Meteor.userId(), title: this.title}) === undefined){
            UserWorkshops.insert({title: this.title, creditValue: this.creditValue, userId: Meteor.userId()});
            alert("This Workshop has been added to your Workshop's");
        }
        else if(Number(input) === this.code && UserWorkshops.findOne( {userId: Meteor.userId(), title: this.title } ) !== undefined){
            //UserWorkshops.insert({title: this.title, creditValue: this.creditValue, userId: Meteor.userId()});
            alert('You have already added this workshop.');
        }else{
            alert('Incorrect Workshop Code, please try again.');
        }
        
        event.target.text.value = "";
        return false;
    }
    
    
});