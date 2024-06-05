import React, { useState } from "react";
import ClientForm from "./components/ClientForm";
import Header from "./components/Header";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/InvoiceList";
import { InvoiceProvider } from "./context/InvoiceContext";
import EditInvoice from "./components/EditInvoice";
import DeleteInvoice from "./components/DeleteInvoice";
import LogoUpload from "./components/LogoUpload";
import "./index.css";

const App: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);

  return (
    <InvoiceProvider>
      <Header logo={logo} />
      <div className="App">
        <main>
          <LogoUpload onUpload={setLogo} />
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
