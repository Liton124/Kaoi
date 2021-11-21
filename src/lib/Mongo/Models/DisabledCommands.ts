import { model, Schema } from 'mongoose'
import { IDisabledCommandModel } from '../../../typings'

const DisabledCommandSchema = new Schema({
    command: {
        type: String,
        unique: true,
        required: false
    },
    reason: {
        type: String,
        required: true
    }
})

export default model<IDisabledCommandModel>('disabledcommands', DisabledCommandSchema)
