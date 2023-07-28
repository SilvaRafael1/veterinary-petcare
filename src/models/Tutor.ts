import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export interface TutorInterface extends Document {
  id: mongoose.Types.ObjectId;
  name: string;
  password: string;
  phone?: string;
  email: string;
  date_of_birth?: string;
  zip_code?: string;
  pets: mongoose.Types.ObjectId[];
}

const TutorSchema: Schema<TutorInterface> = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true,
    maxlength: 50,
    minlength: 3,
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  phone: {
    type: String,
    trim: true,
    required: [true, 'Please provide phone'],
    maxlength: 20,
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  date_of_birth: {
    type: String,
    trim: true,
    required: [true, 'Please provide date of birth'],
    maxlength: 30,
  },
  zip_code: {
    type: String,
    trim: true,
    required: [true, 'Please provide zip code'],
    maxlength: 20,
  },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
    },
  ],
});

TutorSchema.pre<TutorInterface>('save', async function (next) {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

TutorSchema.methods.createJWT = function () {
  const jwtSecret = process.env.JWT_SECRET || '';

  let secret;
  if (jwtSecret !== '') {
    secret = jwtSecret;
  } else {
    secret = 'default_secret';
  }

  return jwt.sign({ userId: this.id, name: this.name }, secret, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model<TutorInterface>('Tutor', TutorSchema);
