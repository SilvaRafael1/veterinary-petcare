import mongoose, { Schema, Document } from 'mongoose';

export interface PetInterface extends Document {
  id: mongoose.Types.ObjectId;
  name: string;
  species: string;
  carry: string;
  weight: number;
  date_of_birth?: string;
  tutor: mongoose.Types.ObjectId;
}

const PetSchema: Schema<PetInterface> = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true,
    maxlength: 50,
    minlength: 3,
  },
  species: {
    type: String,
    trim: true,
    required: [true, 'Please provide a specie'],
    maxlength: 30,
  },
  carry: {
    type: String,
    trim: true,
    required: [true, 'Please provide a carry'],
    maxlength: 20,
  },
  weight: {
    type: Number,
    trim: true,
    required: [true, 'Please provide a weight'],
  },
  date_of_birth: {
    type: String,
    trim: true,
    required: [true, 'Please provide a date_of_birth'],
    maxlength: 20,
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor',
  },
});

export default mongoose.model<PetInterface>('Pet', PetSchema);
