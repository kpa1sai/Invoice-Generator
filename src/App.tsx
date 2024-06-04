import React from "react";
import ClientForm from "./components/ClientForm";
import Header from "./components/Header";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/InvoiceList";
import { InvoiceProvider } from "./context/InvoiceContext";
import EditInvoice from "./components/EditInvoice"; 
import DeleteInvoice from "./components/DeleteInvoice"; 
import "./index.css";

const App: React.FC = () => {
  return (
    <InvoiceProvider>
      <Header />
      <div className="App">
        <main>
          <InvoiceForm />
          <InvoiceList />
          <ClientForm />
          <EditInvoice /> 
          <DeleteInvoice /> 
        </main>
      </div>
    </InvoiceProvider>
  );
};

export default App;
