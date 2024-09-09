import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

type MaintenanceItem = {
  id: bigint;
  title: string;
  nextDue: string;
  currentHours: number;
};

type MaintenanceListProps = {
  items: MaintenanceItem[];
  currentDate: string;
  currentHours: number;
};

const MaintenanceList: React.FC<MaintenanceListProps> = ({ items, currentDate, currentHours }) => {
  const calculateRemaining = (item: MaintenanceItem) => {
    const nextDueDate = new Date(item.nextDue.split(' ')[0]);
    const nextDueHours = parseFloat(item.nextDue.split('H: ')[1]) || 0;

    const timeDiff = nextDueDate.getTime() - new Date(currentDate).getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = nextDueHours - currentHours;

    return `${daysDiff} days / ${hoursDiff.toFixed(2)} hours`;
  };

  const isOverdue = (item: MaintenanceItem) => {
    const nextDueDate = new Date(item.nextDue.split(' ')[0]);
    const nextDueHours = parseFloat(item.nextDue.split('H: ')[1]) || 0;

    return nextDueDate < new Date(currentDate) || nextDueHours < currentHours;
  };

  const isDueSoon = (item: MaintenanceItem) => {
    const nextDueDate = new Date(item.nextDue.split(' ')[0]);
    const nextDueHours = parseFloat(item.nextDue.split('H: ')[1]) || 0;

    const timeDiff = nextDueDate.getTime() - new Date(currentDate).getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = nextDueHours - currentHours;

    return (daysDiff <= 30 && daysDiff > 0) || (hoursDiff <= 50 && hoursDiff > 0);
  };

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id.toString()} component={Paper} elevation={2} sx={{ mb: 2, p: 2 }}>
          <ListItemText
            primary={
              <Typography variant="h5" component="h2" gutterBottom>
                {item.title}
              </Typography>
            }
            secondary={
              <>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Next Due: {item.nextDue}
                </Typography>
                <Typography variant="body1" paragraph>
                  Remaining: {calculateRemaining(item)}
                </Typography>
                <Typography variant="body2" color={isOverdue(item) ? 'error.main' : isDueSoon(item) ? 'warning.main' : 'success.main'}>
                  {isOverdue(item) ? 'Overdue' : isDueSoon(item) ? 'Due Soon' : 'On Track'}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default MaintenanceList;
