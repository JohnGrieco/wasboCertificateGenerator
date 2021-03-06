Meteor.subscribe('userWorkshops');
Meteor.subscribe('workshops');
Meteor.subscribe('names');

Meteor.startup(function(){ 
    
   AccountsEntry.config({
      homeRoute: '/',
      dashboardRoute: '/',
      requirePasswordConfirmation: false,
      waitEmailVerification: false,
      passwordSignupFields: 'EMAIL_ONLY',
      //sendVerifcationEmail: true
   });
   
    AutoForm.addHooks(['insertNamesForm'],{
        onSuccess: function() {
            //location.reload(true);
            $(document).foundation();
            $(document).ready(function(){$('#myModal').foundation('reveal', 'close')});
        }
    });
});

