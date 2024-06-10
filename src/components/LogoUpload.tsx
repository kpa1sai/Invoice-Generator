import React, { useState } from 'react';

interface LogoUploadProps {
  onUpload: (logo: string) => void;
}

const LogoUpload: React.FC<LogoUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onUpload(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="logo-upload">Upload Logo</label>
      <input type="file" id="logo-upload" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default LogoUpload;
