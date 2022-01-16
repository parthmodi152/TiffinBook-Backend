import mongoose from 'mongoose';

const providerSchema = mongoose.Schema({
    name: String,
    contact: String,
    location: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var ProviderTiffin = mongoose.model('ProviderTiffin', providerSchema);

export default ProviderTiffin;