import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';


interface InvoiceData {
  id: number;
  customerName: string;
 
}

interface EditInvoiceProps {
  invoiceId: number;
}

const EditInvoice: React.FC<EditInvoiceProps> = ({ invoiceId }) => {
  const [formData, setFormData] = useState<Partial<InvoiceData>>({});

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const invoice = await getInvoice(invoiceId);
        setFormData(invoice);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchInvoiceData();
  }, [invoiceId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateInvoice(invoiceId, formData);
      
    } catch (error) {
      console.error('Error updating invoice:', error);
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="customerName" value={formData.customerName || ''} onChange={handleChange} />
      {}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditInvoice;
