import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DashboardLayout, QuickAction, Table, TransactionList } from '@/components/ui';
import { quickActionsData } from '@/data/quickAction.data';
import { transactions } from '@/data/transaction.data';
import { Color } from '@/constant';
import { useAppSelector } from '@/hooks';


/**
 * Example of how to use the DashboardLayout in a dashboard screen
 */
const index: React.FC = () => {
  const { auth } = useAppSelector((state) => state.auth)
  const router = useRouter();
  
  // Example header right component with notification
  const headerRight = (
    <View style={styles.headerActions}>

      <TouchableOpacity 
        style={styles.iconButton} 
        onPress={() => router.push('/login')}
      >
        <Ionicons name="notifications-outline" size={24} color="#000" />
        <View style={styles.notificationBadge}>
          <Text style={styles.badgeText}>2</Text>
        </View>
      </TouchableOpacity>

       <TouchableOpacity 
        style={styles.iconButton} 
        onPress={() => router.push('/login')}
      >
        <AntDesign name="setting" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );


  return (
    <DashboardLayout
      title={`${auth?.first_name} ${auth?.last_name}`}
      headerRight={headerRight}
    >
      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>$2,458.20</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity activeOpacity={1} style={styles.actionButton}>
            <Ionicons name="arrow-up-outline" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Send</Text>
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={1} style={styles.actionButton}>
            <Ionicons name="arrow-down-outline" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Receive</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.navigate("/card")} activeOpacity={1} style={styles.actionButton}>
            <Ionicons name="swap-horizontal-outline" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Card</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Transactions */}
      <TransactionList
          transactions={transactions}
          title="Recent Transactions"
          showViewAll={true}
          maxItems={2}
          onRefresh={() => {}}
          isRefreshing={false}
          isFlatList={false}
      />

      {/* Quick Actions */}
       <QuickAction 
        actions={quickActionsData} 
        title="Quick Actions" 
        columns={4}
      />

    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3333',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  balanceCard: {
    backgroundColor: Color.primary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  balanceLabel: {
    color: Color.white,
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'medium',
  },
  balanceAmount: {
    color: Color.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'medium',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: Color.white,
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'medium',
  },
});

export default index;