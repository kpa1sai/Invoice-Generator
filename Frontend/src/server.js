const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

let invoices = [];
let idCounter = 1;

app.get('/api/invoices', (req, res) => {
    res.json(invoices);
});

app.post('/api/invoices', upload.single('logo'), (req, res) => {
    const { invoiceNumber, invoiceDate, dueDate, clientName, items } = req.body;
    const invoice = {
        id: idCounter++,
        invoiceNumber,
        invoiceDate,
        dueDate,
        clientName,
        items: JSON.parse(items),
        logo: req.file ? req.file.filename : null,
    };
    invoices.push(invoice);
    res.status(201).json(invoice);
});

app.post('/api/send-invoice', async (req, res) => {
    const { invoiceId } = req.body;
    const invoice = invoices.find((inv) => inv.id === invoiceId);
    if (!invoice) {
        return res.status(404).send('Invoice not found');
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: 'client-email@example.com',
        subject: `Invoice #${invoice.invoiceNumber}`,
        text: `Dear ${invoice.clientName},\n\nPlease find attached the invoice #${invoice.invoiceNumber}.\n\nBest regards,\nYour Company`,
        attachments: [
            {
                filename: `Invoice_${invoice.invoiceNumber}.pdf`,
                path: path.join(__dirname, 'uploads', `Invoice_${invoice.invoiceNumber}.pdf`),
                contentType: 'application/pdf',
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Invoice sent via email successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

app.use('/uploads', express.static('uploads'));

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
