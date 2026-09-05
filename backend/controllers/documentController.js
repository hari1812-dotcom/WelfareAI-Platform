import fs from 'fs';
import path from 'path';
import { Document } from '../models/Document.js';

function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Generate sample SVG data URL for default seeded docs if files are not on disk
function generateSampleSvgDataUrl(docName, fileType) {
  const isPdf = fileType.includes('pdf');
  const bg = isPdf ? '#FEF2F2' : '#EFF6FF';
  const textClr = isPdf ? '#991B1B' : '#1E40AF';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="${bg}"/>
    <rect x="20" y="20" width="560" height="360" rx="12" fill="#FFFFFF" stroke="${textClr}" stroke-width="2"/>
    <text x="300" y="140" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="${textClr}" text-anchor="middle">WelfareAI Secure Document</text>
    <text x="300" y="190" font-family="Arial, sans-serif" font-size="22" font-weight="600" fill="#374151" text-anchor="middle">${docName}</text>
    <text x="300" y="230" font-family="Arial, sans-serif" font-size="16" fill="#6B7280" text-anchor="middle">Type: ${fileType.toUpperCase()} | Verified & Encrypted</text>
    <text x="300" y="320" font-family="Arial, sans-serif" font-size="14" fill="#9CA3AF" text-anchor="middle">Official Document Proof for Welfare Scheme Verification</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const DEFAULT_DOCUMENTS = [
  { name: 'Aadhaar Card', category: 'identity', fileType: 'application/pdf', fileSize: 1250000, expiryDate: '', status: 'verified' },
  { name: 'PAN Card', category: 'identity', fileType: 'image/png', fileSize: 850000, expiryDate: '', status: 'verified' },
  { name: 'Income Certificate', category: 'income', fileType: 'application/pdf', fileSize: 1800000, expiryDate: '2026-09-08', status: 'expiring' },
  { name: '10th Mark Sheet', category: 'education', fileType: 'application/pdf', fileSize: 2100000, expiryDate: '', status: 'verified' },
  { name: '12th Mark Sheet', category: 'education', fileType: 'application/pdf', fileSize: 2200000, expiryDate: '', status: 'verified' },
  { name: 'Voter ID', category: 'residence', fileType: 'image/jpeg', fileSize: 920000, expiryDate: '', status: 'verified' },
  { name: 'Caste Certificate', category: 'category', fileType: 'application/pdf', fileSize: 1400000, expiryDate: '2027-02-12', status: 'verified' },
  { name: 'Bank Passbook Copy', category: 'other', fileType: 'image/png', fileSize: 1100000, expiryDate: '', status: 'verified' },
  { name: 'Land Records (7/12)', category: 'other', fileType: 'application/pdf', fileSize: 3100000, expiryDate: '', status: 'pending' },
];

export async function getUserDocuments(req, res) {
  try {
    let docs = await Document.find({ userId: req.user._id }).sort({ createdAt: -1 });

    // Seed default documents for user if none exist yet
    if (docs.length === 0) {
      const seedDocs = DEFAULT_DOCUMENTS.map((d) => ({
        userId: req.user._id,
        name: d.name,
        category: d.category,
        originalFilename: `${d.name.toLowerCase().replace(/\s+/g, '_')}.${d.fileType.includes('pdf') ? 'pdf' : 'png'}`,
        fileType: d.fileType,
        fileSize: d.fileSize,
        fileSizeFormatted: formatBytes(d.fileSize),
        fileDataUrl: generateSampleSvgDataUrl(d.name, d.fileType),
        expiryDate: d.expiryDate,
        status: d.status,
        version: 1,
      }));
      docs = await Document.insertMany(seedDocs);
    }

    res.json({ documents: docs });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch documents', error: error.message });
  }
}

export async function uploadDocument(req, res) {
  try {
    const { name, category, expiryDate } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please select a document file to upload' });
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      if (req.file.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Invalid file format. Only PDF, JPG, and PNG files are allowed.' });
    }

    if (req.file.size > 10 * 1024 * 1024) {
      if (req.file.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'File size exceeds 10MB limit.' });
    }

    // Read file buffer or construct dataUrl for preview
    let fileDataUrl = '';
    try {
      const buffer = fs.readFileSync(req.file.path);
      fileDataUrl = `data:${req.file.mimetype};base64,${buffer.toString('base64')}`;
    } catch (e) {
      fileDataUrl = generateSampleSvgDataUrl(name || req.file.originalname, req.file.mimetype);
    }

    const newDoc = await Document.create({
      userId: req.user._id,
      name: name || req.file.originalname,
      category: category || 'other',
      originalFilename: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      fileSizeFormatted: formatBytes(req.file.size),
      filePath: req.file.path,
      fileDataUrl,
      expiryDate: expiryDate || '',
      status: 'pending',
      version: 1,
    });

    res.status(201).json({
      message: 'Document uploaded successfully',
      document: newDoc,
    });
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Failed to upload document', error: error.message });
  }
}

export async function getDocumentFile(req, res) {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (!doc.userId.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized access to this document' });
    }

    if (doc.filePath && fs.existsSync(doc.filePath)) {
      res.setHeader('Content-Type', doc.fileType);
      const isDownload = req.query.download === 'true';
      res.setHeader(
        'Content-Disposition',
        `${isDownload ? 'attachment' : 'inline'}; filename="${encodeURIComponent(doc.originalFilename)}"`
      );
      return res.sendFile(path.resolve(doc.filePath));
    }

    if (doc.fileDataUrl) {
      const matches = doc.fileDataUrl.match(/^data:(.+);base64,(.+)$/);
      if (matches) {
        const contentType = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        res.setHeader('Content-Type', contentType);
        const isDownload = req.query.download === 'true';
        res.setHeader(
          'Content-Disposition',
          `${isDownload ? 'attachment' : 'inline'}; filename="${encodeURIComponent(doc.originalFilename)}"`
        );
        return res.send(buffer);
      }
    }

    return res.status(404).json({ message: 'File contents not found on server' });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving document file', error: error.message });
  }
}

export async function updateDocument(req, res) {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (!doc.userId.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    const { name, category, expiryDate } = req.body;

    if (name) doc.name = name;
    if (category) doc.category = category;
    if (expiryDate !== undefined) doc.expiryDate = expiryDate;

    // If new file attached (Replacement)
    if (req.file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        if (req.file.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'Invalid file format. Only PDF, JPG, and PNG files are allowed.' });
      }

      if (req.file.size > 10 * 1024 * 1024) {
        if (req.file.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'File size exceeds 10MB limit.' });
      }

      // Delete old file if existed
      if (doc.filePath && fs.existsSync(doc.filePath)) {
        try { fs.unlinkSync(doc.filePath); } catch (e) {}
      }

      doc.originalFilename = req.file.originalname;
      doc.fileType = req.file.mimetype;
      doc.fileSize = req.file.size;
      doc.fileSizeFormatted = formatBytes(req.file.size);
      doc.filePath = req.file.path;
      
      try {
        const buffer = fs.readFileSync(req.file.path);
        doc.fileDataUrl = `data:${req.file.mimetype};base64,${buffer.toString('base64')}`;
      } catch (e) {
        doc.fileDataUrl = generateSampleSvgDataUrl(doc.name, req.file.mimetype);
      }

      doc.version += 1;
      doc.status = 'pending';
    }

    await doc.save();

    res.json({
      message: 'Document updated successfully',
      document: doc,
    });
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Failed to update document', error: error.message });
  }
}

export async function deleteDocument(req, res) {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (!doc.userId.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    if (doc.filePath && fs.existsSync(doc.filePath)) {
      try { fs.unlinkSync(doc.filePath); } catch (e) {}
    }

    await Document.findByIdAndDelete(req.params.id);

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete document', error: error.message });
  }
}
