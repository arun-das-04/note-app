import mongoose from 'mongoose';

const noteModel = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },

    content:{
        type: String,
    },

    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
}, {
        timestamps: true,
        collection: 'notes',
    },
);

const Note = mongoose.model('Note', noteModel);

export default Note;