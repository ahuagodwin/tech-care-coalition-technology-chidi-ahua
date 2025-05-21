import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

// Define TypeScript interfaces for props
interface ActionItem {
  title: string;
  icon: ReactNode;
  color?: string;
  onPress: () => void;
}

interface QuickActionsProps {
  actions: ActionItem[];
  title?: string;
  columns?: number;
  containerStyle?: ViewStyle;
  itemStyle?: ViewStyle;
}

/**
 * QuickActions component to display a grid of actionable items
 */
const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  title = "Quick Actions",
  columns = 4,
  containerStyle = {},
  itemStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      
      <View style={styles.actionsGrid}>
        {actions.map((action, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.actionItem, 
              { 
                flexBasis: `${100 / columns - 2}%`,
                maxWidth: `${100 / columns - 2}%`,
              }, 
              itemStyle
            ]}
            onPress={action.onPress}
            activeOpacity={1}
          >
            <View style={[styles.actionIcon, { backgroundColor: action.color || '#E6F0FF' }]}>
              {action.icon}
            </View>
            <Text style={styles.actionText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'medium',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    marginHorizontal: '1%',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'medium',
    textAlign: 'center',
  },
});

export default QuickActions;