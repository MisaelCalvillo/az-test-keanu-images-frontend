import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { useQuery, gql } from '@apollo/client';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

const GET_PAST_TRANSACTIONS = gql`
  query GetPastTransactions {
    getPastTransactions {
      _id
      width
      height
      young
      grayscale
      timestamp
      imageUrl
    }
  }
`;

interface Transaction {
  _id: string;
  width: number;
  height: number;
  young: boolean;
  grayscale: boolean;
  timestamp: string;
  imageUrl: string;
}

const TransactionsPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PAST_TRANSACTIONS);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState({
    minWidth: '',
    maxWidth: '',
    minHeight: '',
    maxHeight: '',
    young: '',
    grayscale: ''
  });

  useEffect(() => {
    if (data?.getPastTransactions) {
      applyFilters(data.getPastTransactions);
    }
  }, [data, filters]);

  const applyFilters = (transactions: Transaction[]) => {
    const filtered = transactions.filter(t => {
      return (
        (!filters.minWidth || t.width >= parseInt(filters.minWidth)) &&
        (!filters.maxWidth || t.width <= parseInt(filters.maxWidth)) &&
        (!filters.minHeight || t.height >= parseInt(filters.minHeight)) &&
        (!filters.maxHeight || t.height <= parseInt(filters.maxHeight)) &&
        (filters.young === '' || t.young === (filters.young === 'true')) &&
        (filters.grayscale === '' || t.grayscale === (filters.grayscale === 'true'))
      );
    });
    setFilteredTransactions(filtered);
  };
  
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name as string]: value }));
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Past Transactions</Typography>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Min Width"
            name="minWidth"
            type="number"
            value={filters.minWidth}
            onChange={handleFilterChange as any}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Max Width"
            name="maxWidth"
            type="number"
            value={filters.maxWidth}
            onChange={handleFilterChange as any}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Min Height"
            name="minHeight"
            type="number"
            value={filters.minHeight}
            onChange={handleFilterChange as any}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Max Height"
            name="maxHeight"
            type="number"
            value={filters.maxHeight}
            onChange={handleFilterChange as any}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Young Keanu</InputLabel>
            <Select
              name="young"
              value={filters.young}
              onChange={handleFilterChange}
              label="Young Keanu"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Grayscale</InputLabel>
            <Select
              name="grayscale"
              value={filters.grayscale}
              onChange={handleFilterChange}
              label="Grayscale"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredTransactions.map((transaction) => (
          <Grid item xs={12} sm={6} md={4} key={transaction._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Image {transaction._id}</Typography>
                <Typography>Width: {transaction.width}</Typography>
                <Typography>Height: {transaction.height}</Typography>
                <Typography>Young Keanu: {transaction.young ? 'Yes' : 'No'}</Typography>
                <Typography>Grayscale: {transaction.grayscale ? 'Yes' : 'No'}</Typography>
                <Typography>Timestamp: {new Date(transaction.timestamp).toLocaleString()}</Typography>
                <Button href={transaction.imageUrl} target="_blank" rel="noopener noreferrer">
                  View Image
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TransactionsPage;