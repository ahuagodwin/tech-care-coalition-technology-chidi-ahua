import { Ionicons } from "@expo/vector-icons";

  // Quick actions data for the new component
  export const quickActionsData = [
    {
      title: 'My Cards',
      icon: <Ionicons name="card-outline" size={20} color="#C99213" />,
      color: '#E6F0FF',
      onPress: () => console.log('My Cards pressed')
    },
    {
      title: 'Contacts',
      icon: <Ionicons name="people-outline" size={20} color="#C99213" />,
      color: '#FFF0E6',
      onPress: () => console.log('Contacts pressed')
    },
    {
      title: 'Pay Bills',
      icon: <Ionicons name="document-text-outline" size={20} color="#C99213" />,
      color: '#E6FFF0',
      onPress: () => console.log('Pay Bills pressed')
    },
    {
      title: 'More',
      icon: <Ionicons name="grid-outline" size={20} color="#C99213" />,
      color: '#F0E6FF',
      onPress: () => console.log('More pressed')
    },
    {
      title: 'Transfer',
      icon: <Ionicons name="arrow-forward-outline" size={20} color="#C99213" />,
      color: '#FFE6F0',
      onPress: () => console.log('Transfer pressed')
    },
    {
      title: 'Savings',
      icon: <Ionicons name="wallet-outline" size={20} color="#C99213" />,
      color: '#F0FFE6',
      onPress: () => console.log('Savings pressed')
    },
    {
      title: 'Invest',
      icon: <Ionicons name="trending-up-outline" size={20} color="#C99213" />,
      color: '#E6FFFF',
      onPress: () => console.log('Invest pressed')
    },
    {
      title: 'Support',
      icon: <Ionicons name="help-circle-outline" size={20} color="#C99213" />,
      color: '#FFE6E6',
      onPress: () => console.log('Support pressed')
    }
  ];