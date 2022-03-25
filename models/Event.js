const { Schema, model } = require("mongoose");

const EventSchema = Schema({
    title: {
        type: String,
        require: true
    },
    bgColor: {
        type: String,
        require: true
    },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
    notes: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
       default: true
    },
    userRef: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
    createBy: {
        type: String,
        require: true
    }
})

EventSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports= model('Event', EventSchema);