import mongoose from 'mongoose';

/* The resume body (`data`) is the exact state object the builder edits
   (heading, sections, template, page size...). It is stored as a single
   document so the editor can save it in one write; its shape is checked
   in the controller with the shared core's migrate(). */
const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 120, default: 'Untitled Resume' },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true, minimize: false }
);

resumeSchema.index({ user: 1, updatedAt: -1 });

export default mongoose.model('Resume', resumeSchema);
