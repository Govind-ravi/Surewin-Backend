import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['superAdmin', 'user', 'admin'],
    default: 'user',
  },
  tickets: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Raffle',
  },
  resetToken: String,
  resetTokenExpiration: Date,
}, {
  timestamps: true, 
});

userSchema.index({ name: 1 });

const User = mongoose.model('User', userSchema);
export default User;
