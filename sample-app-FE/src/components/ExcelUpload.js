// components/ExcelUpload.js
import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import api_url from "../api/bookService";
import { toast } from "react-toastify";

export default function ExcelUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  
  const handleClear =()=>{
    setFile(null);
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an Excel file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // matches @RequestParam("file") in backend

    try {
      await axios.post(`${api_url}/books/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      toast.success("Excel file uploaded successfully");
      onUploadSuccess(); // refresh book list
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload Excel file");
    }finally{
        setFile(null);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
      <input
        accept=".xlsx, .xls"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="excel-upload"
      />
      <label htmlFor="excel-upload">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          {file ? file.name : "Choose Excel File"}
        </Button>
      </label>
      <Button
        variant="contained"
        color="success"
        onClick={handleUpload}
        disabled={!file}
      >
        Upload
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClear}
       
      >
        Clear
      </Button>
    </Box>
  );
}
