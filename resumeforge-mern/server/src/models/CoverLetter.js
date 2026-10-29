import mongoose from 'mongoose';

const text = (max) => ({ type: String, default: '', trim: false, maxlength: max });

const coverLetterSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    applicantName: text(120),
    applicantContact: text(160),
    recipientName: text(120),
    company: text(160),
    greeting: { type: String, default: 'Dear Hiring Manager,', maxlength: 160 },
    opening: text(3000),
    body: text(5000),
    closing: text(3000),
    signoff: { type: String, default: 'Sincerely,', maxlength: 80 },
  },
  { timestamps: true }
);

export const COVER_FIELDS = [
  'applicantName', 'applicantContact', 'recipientName', 'company',
  'greeting', 'opening', 'body', 'closing', 'signoff',
];

export default mongoose.model('CoverLetter', coverLetterSchema);
