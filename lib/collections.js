Workshops = new Mongo.Collection('workshops');

Workshops.allow({
    insert: function(){
        return true;
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
    }
}));

UserWorkshops = new Mongo.Collection('userWorkshops');

UserWorkshops.allow({
   insert: function(userId, doc){
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
    userId: {
        type: String,
        autoValue:function(){ return this.userId },
        autoform: { type: "hidden" }
    }
}));