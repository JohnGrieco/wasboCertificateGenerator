Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function(){
    
    this.route('myWorkshops',{
       path: '/myworkshops',
       template: 'myWorkshops',
       onBeforeAction: function () {
            AccountsEntry.signInRequired(this);
            this.next();
        } 
    });
    
    this.route('certificate',{
        path: '/generate',
        template: 'certificate',
        onBeforeAction: function () {
            AccountsEntry.signInRequired(this);
            this.next();
        }
    });
    
    this.route('workshops',{
        path: '/',
        template: 'workshops',
        onBeforeAction: function () {
            AccountsEntry.signInRequired(this);
            this.next();
        }
    });
    

});