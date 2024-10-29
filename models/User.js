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
  phoneNumber: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ['superAdmin', 'user', 'admin'],
    default: 'user',
  },
  resetToken: String,
  resetTokenExpiration: Date,
}, {
  timestamps: true, 
});

userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);
export default User;
