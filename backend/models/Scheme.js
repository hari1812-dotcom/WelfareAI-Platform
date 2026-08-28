import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    department: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'Financial', 'Scholarship'
    status: { type: String, default: 'Active' },
    rules: [
      {
        field: { type: String, required: true }, // e.g., 'income', 'age'
        operator: { type: String, required: true }, // e.g., 'LESS_THAN_OR_EQUAL'
        value: { type: mongoose.Schema.Types.Mixed, required: true },
      },
    ],
    benefitAmount: { type: Number },
    requiredDocuments: [{ type: String }],
  },
  { timestamps: true }
);

export const Scheme = mongoose.model('Scheme', schemeSchema);
