import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  Age: Number,
  Annual_Income_INR: Number,
  State: String,
  Category: String,
  Eligible_Scheme: String
});

export const SchemeEligibility = mongoose.model('SchemeEligibility', schema);
