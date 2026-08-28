import 'dotenv/config';
import mongoose from 'mongoose';
import { Scheme } from './models/Scheme.js';
import { connectDB } from './config/db.js';

const mockSchemes = [
  {
    title: 'Farmer Support Scheme',
    description: 'Financial assistance for active farmers with lower income.',
    department: 'Agriculture',
    type: 'Financial',
    status: 'Active',
    rules: [
      { field: 'occupation', operator: 'EQUALS', value: 'Farmer' },
      { field: 'income', operator: 'LESS_THAN_OR_EQUAL', value: 250000 }
    ],
    benefitAmount: 6000,
    requiredDocuments: ['Aadhaar', 'Income Certificate', 'Land Proof']
  },
  {
    title: 'Senior Citizen Pension',
    description: 'Monthly pension for older citizens.',
    department: 'Social Welfare',
    type: 'Pension',
    status: 'Active',
    rules: [
      { field: 'age', operator: 'GREATER_THAN_OR_EQUAL', value: 60 }
    ],
    benefitAmount: 1000,
    requiredDocuments: ['Aadhaar', 'Age Proof']
  },
  {
    title: 'Youth Skill Development',
    description: 'Empowering youth with skills.',
    department: 'Youth Affairs',
    type: 'Skill',
    status: 'Active',
    rules: [
      { field: 'age', operator: 'BETWEEN', value: [18, 30] }
    ],
    benefitAmount: 0,
    requiredDocuments: ['Aadhaar', 'Education Certificate']
  }
];

const seedData = async () => {
  try {
    await connectDB();
    await Scheme.deleteMany();
    await Scheme.insertMany(mockSchemes);
    console.log('Schemes inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
