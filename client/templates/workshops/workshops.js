Template.workshops.helpers({
   workshops: function(){
       
       var now = Session.get('currentValue');
       
       if(now === 'wednesday'){
           return Workshops.find({day: 'wednesday'});
       }
       else if(now === 'thursday'){
           return Workshops.find({day: 'thursday'});
       }
       else if(now === 'friday'){
           return Workshops.find({day: 'friday'});
       }
       else if(now === 'all' || ''){
           return Workshops.find({});
       }else{
           return Workshops.find({});
       }
   },
   thursday: function(){
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
    },
    "change #customDropdown1": function(event, template){
        var selectValue = template.$("#customDropdown1").val();
        Session.set('currentValue', selectValue);
        var selected = Session.get('currentValue');
        console.log(selected);
    }
    
    
});