// import React, { useState } from 'react';

// const InvoiceFormComponent: React.FC = () => {
//   const [invoice, setInvoice] = useState({
//     id: '1',
//     clientName: '',
//     shipTo: '',
//     date: '',
//     paymentTerms: '',
//     dueDate: '',
//     poNumber: '',
//     items: [{ description: '', quantity: 1, rate: 0 }],
//     notes: '',
//     terms: '',
//     tax: 0,
//     discount: 0,
//     shipping: 0,
//     amountPaid: 0,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string, index?: number) => {
//     if (index !== undefined) {
//       const items = [...invoice.items];
//       items[index] = { ...items[index], [field]: e.target.value };
//       setInvoice({ ...invoice, items });
//     } else {
//       setInvoice({ ...invoice, [field]: e.target.value });
//     }
//   };

//   const handleAddItem = () => {
//     setInvoice({
//       ...invoice,
//       items: [...invoice.items, { description: '', quantity: 1, rate: 0 }],
//     });
//   };

//   const calculateSubtotal = () => {
//     return invoice.items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
//   };

//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal();
//     const taxAmount = (subtotal * invoice.tax) / 100;
//     return subtotal + taxAmount - invoice.discount + invoice.shipping;
//   };

//   const calculateBalanceDue = () => {
//     return calculateTotal() - invoice.amountPaid;
//   };

//   return (
//     <div className="invoice-form">
//       <div className="invoice-header">
//         <div className="invoice-logo">
//           <div className="add-logo">+ Add Your Logo</div>
//         </div>
//         <div className="invoice-info">
//           <h1>INVOICE</h1>
//           <div className="invoice-number">
//             <label>#</label>
//             <input
//               type="text"
//               value={invoice.id}
//               onChange={(e) => handleChange(e, 'id')}
//               readOnly
//             />
//           </div>
//         </div>
//       </div>
//       <div className="invoice-address">
//         <div>
//           <label>Who is this invoice from? (required)</label>
//           <input
//             type="text"
//             value={invoice.clientName}
//             onChange={(e) => handleChange(e, 'clientName')}
//           />
//         </div>
//         <div>
//           <label>Bill To</label>
//           <input
//             type="text"
//             value={invoice.clientName}
//             onChange={(e) => handleChange(e, 'clientName')}
//           />
//         </div>
//         <div>
//           <label>Ship To</label>
//           <input
//             type="text"
//             value={invoice.shipTo}
//             onChange={(e) => handleChange(e, 'shipTo')}
//           />
//         </div>
//       </div>
//       <div className="invoice-info-grid">
//         <div>
//           <label>Date</label>
//           <input
//             type="date"
//             value={invoice.date}
//             onChange={(e) => handleChange(e, 'date')}
//           />
//         </div>
//         <div>
//           <label>Payment Terms</label>
//           <input
//             type="text"
//             value={invoice.paymentTerms}
//             onChange={(e) => handleChange(e, 'paymentTerms')}
//           />
//         </div>
//         <div>
//           <label>Due Date</label>
//           <input
//             type="date"
//             value={invoice.dueDate}
//             onChange={(e) => handleChange(e, 'dueDate')}
//           />
//         </div>
//         <div>
//           <label>PO Number</label>
//           <input
//             type="text"
//             value={invoice.poNumber}
//             onChange={(e) => handleChange(e, 'poNumber')}
//           />
//         </div>
//       </div>
//       <div className="invoice-items">
//         <table>
//           <thead>
//             <tr>
//               <th>Item</th>
//               <th>Quantity</th>
//               <th>Rate</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoice.items.map((item, index) => (
//               <tr key={index}>
//                 <td>
//                   <input
//                     type="text"
//                     value={item.description}
//                     onChange={(e) => handleChange(e, 'description', index)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) => handleChange(e, 'quantity', index)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     value={item.rate}
//                     onChange={(e) => handleChange(e, 'rate', index)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     value={item.quantity * item.rate}
//                     readOnly
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button onClick={handleAddItem}>+ Line Item</button>
//       </div>
//       <div className="invoice-notes-terms">
//         <div>
//           <label>Notes</label>
//           <input
//             type="text"
//             value={invoice.notes}
//             onChange={(e) => handleChange(e, 'notes')}
//             placeholder="Notes - any relevant information not already covered"
//           />
//         </div>
//         <div>
//           <label>Terms</label>
//           <input
//             type="text"
//             value={invoice.terms}
//             onChange={(e) => handleChange(e, 'terms')}
//             placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
//           />
//         </div>
//       </div>
//       <div className="invoice-summary">
//         <div className="subtotal">
//           <label>Subtotal</label>
//           <input
//             type="number"
//             value={calculateSubtotal()}
//             readOnly
//           />
//         </div>
//         <div className="tax-discount-shipping">
//           <div>
//             <label>Tax</label>
//             <input
//               type="number"
//               value={invoice.tax}
//               onChange={(e) => handleChange(e, 'tax')}
//             />
//           </div>
//           <div>
//             <label>Discount</label>
//             <input
//               type="number"
//               value={invoice.discount}
//               onChange={(e) => handleChange(e, 'discount')}
//             />
//           </div>
//           <div>
//             <label>Shipping</label>
//             <input
//               type="number"
//               value={invoice.shipping}
//               onChange={(e) => handleChange(e, 'shipping')}
//             />
//           </div>
//         </div>
//         <div className="total">
//           <label>Total</label>
//           <input
//             type="number"
//             value={calculateTotal()}
//             readOnly
//           />
//         </div>
//         <div className="amount-paid">
//           <label>Amount Paid</label>
//           <input
//             type="number"
//             value={invoice.amountPaid}
//             onChange={(e) => handleChange(e, 'amountPaid')}
//           />
//         </div>
//         <div className="balance-due">
//           <label>Balance Due</label>
//           <input
//             type="number"
//             value={calculateBalanceDue()}
//             readOnly
//           />
//         </div>
//       </div>
//       <div className="invoice-actions">
//         <div className="invoice-currency">
//           <label>Currency</label>
//           <select>
//             <option value="USD">$ USD</option>
//             <option value="EUR">€ EUR</option>
//             <option value="GBP">£ GBP</option>
//           </select>  
//         </div>
//         <button className="btn-download">Download PDF</button>
//         <button className="btn-save">Save Defaults</button>
//       </div>
//     </div>
//   );
// };

// export default InvoiceFormComponent;
