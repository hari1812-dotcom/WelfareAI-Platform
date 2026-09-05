import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    schemeId: { type: String, required: true },
    name: { type: String, required: true },
    provider: { type: String, required: true },
    providerType: { type: String },
    verification: { type: String },
    category: { type: String },
    eligibleCategories: [{ type: String }],
    matchScore: { type: Number },
    benefitSummary: { type: String },
    benefitAmount: { type: String },
    deadline: { type: String },
    applicationMethod: { type: String },
    processingTime: { type: String },
    shortExplanation: { type: String },
    overview: { type: String },
    eligibility: [{ type: String }],
    benefits: [{ type: String }],
    documentsRequired: [{ type: String }],
    applicationProcess: [{ type: String }],
    // We can embed dataset rules manually or just simple ones
    rules: [
      {
        field: { type: String },
        operator: { type: String },
        value: { type: mongoose.Schema.Types.Mixed },
      }
    ]
  },
  { timestamps: true }
);

export const Scheme = mongoose.model('Scheme', schemeSchema);
