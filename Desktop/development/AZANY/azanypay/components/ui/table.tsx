import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
} from 'react-native';

// Types
export interface Transaction {
  id: string;
  type: string
  date: string;
  time: string;
  amount: string;
  currency: string;
}

export interface TransactionTableProps {
  transactions: Transaction[];
  onViewTransaction?: (transaction: Transaction) => void;
  headerTitle?: string;
  showFilters?: boolean;
  dateFilter?: string;
  currencyFilter?: string;
  statusFilter?: string;
  onChangeFilter?: (filterType: 'date' | 'currency' | 'status', value: string) => void;
}

export interface FilterDropdownProps {
  label: string;
  value: string;
  onPress: () => void;
}

// Components
const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, value, onPress }) => {
  return (
    <TouchableOpacity style={styles.filterButton} onPress={onPress}>
      <Text style={styles.filterLabel}>{label}:</Text>
      <Text style={styles.filterValue}>{value}</Text>
      <Text style={styles.filterArrow}>▼</Text>
    </TouchableOpacity>
  );
};

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onViewTransaction,
  headerTitle = 'Transaction History',
  showFilters = true,
  dateFilter = 'Today',
  currencyFilter = 'All',
  statusFilter = 'All',
  onChangeFilter
}) => {
  
  const renderHeader = () => {
    if (!showFilters) return null;
    
    return (
      <View style={styles.filterContainer}>
        <FilterDropdown 
          label="Date" 
          value={dateFilter} 
          onPress={() => onChangeFilter && onChangeFilter('date', dateFilter)}
        />
        <FilterDropdown 
          label="Currency" 
          value={currencyFilter} 
          onPress={() => onChangeFilter && onChangeFilter('currency', currencyFilter)}
        />
        <FilterDropdown 
          label="Status" 
          value={statusFilter} 
          onPress={() => onChangeFilter && onChangeFilter('status', statusFilter)}
        />
      </View>
    );
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'Withdrawal':
        return '#F44336';
      case 'Deposit':
        return '#4CAF50';
      default:
        return '#2196F3';
    }
  };
  
  const renderTransaction = ({ item }: { item: Transaction }) => {
    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionType}>{item.type}</Text>
          <Text style={styles.transactionDate}>{item.date} • {item.time}</Text>
        </View>
        
        <View style={styles.amountContainer}>
          <Text 
            style={[
              styles.transactionAmount,
              { color: getTransactionColor(item.type) }
            ]}
          >
            {item.currency} {item.amount}
          </Text>
          
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => onViewTransaction && onViewTransaction(item)}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <Text style={styles.amountHeader}>Amount</Text>
      </View>
      
      {renderHeader()}
      
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amountHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  listContent: {
    paddingBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 14,
    color: '#777',
    marginRight: 4,
  },
  filterValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginRight: 4,
  },
  filterArrow: {
    fontSize: 10,
    color: '#777',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 13,
    color: '#777',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  viewButton: {
    paddingHorizontal: 4,
  },
  viewButtonText: {
    fontSize: 13,
    color: '#F03E3E',
    fontWeight: '500',
  },
});

export default TransactionTable;