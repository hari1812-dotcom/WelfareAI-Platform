import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Citizen',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Document name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['identity', 'income', 'education', 'residence', 'category', 'other'],
      default: 'other',
    },
    originalFilename: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    fileSizeFormatted: {
      type: String,
    },
    filePath: {
      type: String,
    },
    fileDataUrl: {
      type: String,
    },
    expiryDate: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['verified', 'pending', 'expiring'],
      default: 'pending',
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Document = mongoose.model('Document', documentSchema);
