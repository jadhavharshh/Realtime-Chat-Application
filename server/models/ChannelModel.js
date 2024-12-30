import moongoose, { Schema } from 'mongoose';

const ChannelSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    members :[
        {type: moongoose.Schema.ObjectId, ref: "User", required: true}],
        admin : {type: moongoose.Schema.ObjectId, ref: "User", required: true},
        messages : [
            {
                type : moongoose.Schema.ObjectId,
                ref : "Messages",
                required : false
            }],
        createdAt : {
            type:Date,
            default: Date.now(),
        },
        updatedAt : {
            type:Date,
            default: Date.now(),
        },
});

ChannelSchema.pre("save", function(next){
    this.updatedAt = Date.now();
    next();
})


ChannelSchema.pre("findOneAndUpdate", function(next){
    this.set({updatedAt: Date.now()});
    next();
})

const Channel = new moongoose.model("Channels", ChannelSchema);
export default Channel;