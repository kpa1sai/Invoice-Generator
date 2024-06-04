import React from 'react';


interface DeleteInvoiceProps {
  invoiceId: number;
  onDelete: (id: number) => void;
}

const DeleteInvoice: React.FC<DeleteInvoiceProps> = ({ invoiceId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await DeleteInvoice(invoiceId);
      onDelete(invoiceId); // Update UI after successful deletion
    } catch (error) {
      console.error('Error deleting invoice:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div>
      {/* You can render a confirmation dialog or a simple button for deleting */}
      <button onClick={handleDelete}>Delete Invoice</button>
    </div>
  );
};

export default DeleteInvoice;
