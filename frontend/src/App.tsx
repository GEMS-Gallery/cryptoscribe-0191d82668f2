import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress, Box, TextField } from '@mui/material';
import MaintenanceList from './components/MaintenanceList';
import NewItemForm from './components/NewItemForm';
import { backend } from 'declarations/backend';

type MaintenanceItem = {
  id: bigint;
  title: string;
  nextDue: string;
  currentHours: number;
};

const App: React.FC = () => {
  const [items, setItems] = useState<MaintenanceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentHours, setCurrentHours] = useState('0');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const fetchedItems = await backend.getItems();
      setItems(fetchedItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  };

  const handleNewItem = async (title: string, nextDue: string, currentHours: number) => {
    try {
      setLoading(true);
      const result = await backend.createItem(title, nextDue, currentHours);
      if ('ok' in result) {
        await fetchItems();
        setShowNewItemForm(false);
      } else {
        console.error('Error creating item:', result.err);
      }
    } catch (error) {
      console.error('Error creating item:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text("Maintenance Report", 20, 10);
    // Add more content to the PDF here
    
    doc.save("maintenance_report.pdf");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Maintenance Tracker
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            type="date"
            label="Current Date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="number"
            label="Current Hours"
            value={currentHours}
            onChange={(e) => setCurrentHours(e.target.value)}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowNewItemForm(!showNewItemForm)}
          sx={{ mb: 2, mr: 2 }}
        >
          {showNewItemForm ? 'Cancel' : 'New Item'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={generatePDF}
          sx={{ mb: 2 }}
        >
          Generate PDF
        </Button>
        {showNewItemForm && <NewItemForm onSubmit={handleNewItem} />}
        {loading ? (
          <CircularProgress />
        ) : (
          <MaintenanceList items={items} currentDate={currentDate} currentHours={parseFloat(currentHours)} />
        )}
      </Box>
    </Container>
  );
};

export default App;
