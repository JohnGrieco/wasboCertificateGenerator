Meteor.subscribe('userWorkshops');
Meteor.subscribe('workshops');
Meteor.subscribe('names');

Meteor.startup(function(){
    
   Workshops.insert({title: 'Hot Topics and Legislative Update', creditValue: 2, code:1111}); 
    
   AccountsEntry.config({
      homeRoute: '/sign-in',
      dashboardRoute: '/',
      requirePasswordConfirmation: false,
      waitEmailVerification: false,
      passwordSignupFields: 'EMAIL_ONLY'
   });
   
    AutoForm.addHooks(['insertNamesForm'],{
        onSuccess: function() {
            $(document).foundation();
            $(document).ready(function(){$('#myModal').foundation('reveal', 'close')});
        }
    });
});

