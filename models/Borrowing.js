const mongoose = require('mongoose');

const BorrowingSchema = new mongoose.Schema({
    reader: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user id'],
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: 'Book',
        required: [true, 'Please provide book id'],
    },
    requestDate: {
        type: Date,
        default: new Date(),
    },
    borrowDate: {
        type: Date,
    },
    returnDate: {
        type: Date,
    },
    status: {
        type: String,
        required: [true, "Please provide borrowing status"],
        enum: ['processing', 'borrowed', 'returned'],
        default: 'processing',
    }
});

BorrowingSchema.pre('save', function () {
    if (this.isModified('status') && this.status === 'borrowed') {
        this.borrowDateDate = new Date();
    }
});

BorrowingSchema.pre('save', function () {
    if (this.isModified('status') && this.status === 'returned') {
        this.returnDate = new Date();
    }
});

module.exports = mongoose.model('Borrowing', BorrowingSchema);