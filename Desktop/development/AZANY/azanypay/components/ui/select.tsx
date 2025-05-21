import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  Animated,
  ViewStyle,
  ListRenderItemInfo,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Color } from '@/constant/Colors';

const { width } = Dimensions.get('window');

// Define the item data structure with generic types
interface SelectItem {
  [key: string]: any;
}

// Define props with proper TypeScript typing
interface CustomSelectProps<T extends SelectItem> {
  label?: string;
  data: T[];
  valueField: keyof T;
  labelField: keyof T;
  onSelect?: (item: T) => void;
  defaultValue?: T;
  placeholder?: string;
  error?: string;
  style?: ViewStyle;
  searchable?: boolean;
  maxHeight?: number;
}

/**
 * Custom Select - A reusable dropdown select component for React Native
 */
function Select<T extends SelectItem>({
  label,
  data = [],
  valueField,
  labelField,
  onSelect,
  defaultValue,
  placeholder = 'Select an item',
  error,
  style,
  searchable = false,
  maxHeight = 300,
}: CustomSelectProps<T>) {
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<T | undefined>(defaultValue);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  const toggleDropdown = (): void => {
    if (visible) {
      // Close dropdown animation
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setVisible(false));
    } else {
      setVisible(true);
      // Open dropdown animation
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    
    // Reset search when toggling
    setSearchText('');
    setFilteredData(data);
  };

  const onItemSelect = (item: T): void => {
    setSelected(item);
    onSelect && onSelect(item);
    toggleDropdown();
  };

  const handleSearch = (text: string): void => {
    setSearchText(text);
    if (text) {
      const filtered = data.filter(item => 
        String(item[labelField]).toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<T>) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => onItemSelect(item)}
    >
      <Text style={[
        styles.itemText,
        selected && item[valueField] === selected[valueField] ? styles.selectedItemText : null
      ]}>
        {String(item[labelField])}
      </Text>
      {selected && item[valueField] === selected[valueField] && (
        <Ionicons name="checkmark" size={20} color={Color.primary} />
      )}
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    const dropdownHeight = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Math.min(filteredData.length * 50, maxHeight)]
    });

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
      >
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.dropdown, { maxHeight: maxHeight + (searchable ? 55 : 0) }]}>
                {searchable && (
                  <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                      style={styles.searchInput}
                      value={searchText}
                      onChangeText={handleSearch}
                      placeholder="Search..."
                      placeholderTextColor="#999"
                      autoCapitalize="none"
                    />
                  </View>
                )}
                <Animated.View style={{ height: dropdownHeight }}>
                  <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${String(item[valueField])}-${index}`}
                    showsVerticalScrollIndicator={true}
                    ListEmptyComponent={
                      <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No items found</Text>
                      </View>
                    }
                  />
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity 
        style={[
          styles.button,
          error ? styles.buttonError : null
        ]} 
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.buttonText,
          !selected && styles.placeholderText
        ]}>
          {selected ? String(selected[labelField]) : placeholder}
        </Text>
        <Ionicons 
          name={visible ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#999"
        />
      </TouchableOpacity>
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      {visible && renderDropdown()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonError: {
    borderColor: '#ff3b30',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  dropdown: {
    marginTop: 8,
    width: width - 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  selectedItemText: {
    color: Color.primary,
    fontWeight: '500',
  },
  error: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#333',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
});

export default Select;