import React from 'react';


interface DeleteInvoiceProps {
  invoiceId: number;
  onDelete: (id: number) => void;
}

const DeleteInvoice: React.FC<DeleteInvoiceProps> = ({ invoiceId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteInvoice(invoiceId);
      onDelete(invoiceId); 
    } catch (error) {
      console.error('Error deleting invoice:', error);
      
    }
  };

  return (
    <div>
      {}
      <button onClick={handleDelete}>Delete Invoice</button>
    </div>
  );
};

export default DeleteInvoice;
