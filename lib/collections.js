Workshops = new Mongo.Collection('workshops');

Workshops.allow({
    insert: function(){
        if(Meteor.user().emails[0].address === 'johnjgrieco@gmail.com'){
            return true;
        }
    }
})

Workshops.attachSchema(new SimpleSchema({
    title: {
        type: String
    },
    creditValue: {
        type: Number
    },
    code: {
        type: Number
    },
    day: {
        type: String
    }
}));

UserWorkshops = new Mongo.Collection('userWorkshops');

UserWorkshops.allow({
   insert: function(userId, doc){
       return true;
   },
   remove: function(){
       return true;
   }
});

UserWorkshops.attachSchema(new SimpleSchema({
    title: {
        type: String
    },
    creditValue: {
        type: Number
    },
    userId: {
        type: String
    }
}));

Names = new Mongo.Collection('names');

Names.allow({
   insert: function(userId, doc){
       return true;
   }
});

Names.attachSchema(new SimpleSchema({
    first: {
        type: String
    },
    last: {
        type: String
    },
    district: {
        type: String
    },
    userId: {
        type: String,
        autoValue:function(){ return this.userId },
        autoform: { type: "hidden" }
    }
}));

Final = new Mongo.Collection('final');

Final.allow({
    insert: function(userId, doc){
        return true;
    },
    update: function(userId, doc){
        return true;
    }
});

Final.attachSchema(new SimpleSchema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    district: {
        type: String
    },
    attendedWorkshops: {
        type: [String]
    }
}));