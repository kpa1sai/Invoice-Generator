import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateInvoice from './CreateInvoice';
import axios from 'axios';


jest.mock('axios');

describe('CreateInvoice Component', () => {
  test('renders CreateInvoice component', () => {
    render(<CreateInvoice />);
    expect(screen.getByText('Create Invoice')).toBeInTheDocument();
  });

  test('updates form input values', () => {
    render(<CreateInvoice />);

    const invoiceNumberInput = screen.getByPlaceholderText('Invoice Number');
    const clientNameInput = screen.getByPlaceholderText('Who is this invoice for?');

    fireEvent.change(invoiceNumberInput, { target: { value: '12345' } });
    fireEvent.change(clientNameInput, { target: { value: 'Test Client' } });

    expect(invoiceNumberInput.value).toBe('12345');
    expect(clientNameInput.value).toBe('Test Client');
  });

  test('submits the form and shows invoice preview', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        id: 1,
        invoiceNumber: '12345',
        invoiceDate: '2024-06-08',
        dueDate: '2024-06-15',
        clientName: 'Test Client',
        items: [{ name: 'Item1', description: 'Test Item', quantity: 1, rate: 100 }],
        logo: null,
      },
    });

    render(<CreateInvoice />);

    const invoiceNumberInput = screen.getByPlaceholderText('Invoice Number');
    const invoiceDateInput = screen.getByLabelText('Invoice Date');
    const dueDateInput = screen.getByLabelText('Due Date');
    const clientNameInput = screen.getByPlaceholderText('Who is this invoice for?');
    const itemNameInput = screen.getByPlaceholderText('Item name');
    const itemDescriptionInput = screen.getByPlaceholderText('Description');
    const itemQuantityInput = screen.getByPlaceholderText('1');
    const itemRateInput = screen.getByPlaceholderText('0.00');

    fireEvent.change(invoiceNumberInput, { target: { value: '12345' } });
    fireEvent.change(invoiceDateInput, { target: { value: '2024-06-08' } });
    fireEvent.change(dueDateInput, { target: { value: '2024-06-15' } });
    fireEvent.change(clientNameInput, { target: { value: 'Test Client' } });
    fireEvent.change(itemNameInput, { target: { value: 'Item1' } });
    fireEvent.change(itemDescriptionInput, { target: { value: 'Test Item' } });
    fireEvent.change(itemQuantityInput, { target: { value: 1 } });
    fireEvent.change(itemRateInput, { target: { value: 100 } });

    fireEvent.click(screen.getByText('Generate Invoice'));

    const invoiceNumber = await screen.findByText('Invoice Number: 12345');
    expect(invoiceNumber).toBeInTheDocument();
  });

  test('renders download PDF button', () => {
    render(<CreateInvoice />);
    fireEvent.click(screen.getByText('Generate Invoice'));
    expect(screen.getByText('Download as PDF')).toBeInTheDocument();
  });

  test('renders send email button', () => {
    render(<CreateInvoice />);
    fireEvent.click(screen.getByText('Generate Invoice'));
    expect(screen.getByText('Send to Email')).toBeInTheDocument();
  });
});
