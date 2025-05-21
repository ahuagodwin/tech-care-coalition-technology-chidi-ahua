import type React from "react"
// Transaction Types
export interface Recipient {
  name: string
  account: string
  bank: string
}

export interface Transaction {
  id: string
  type: "Transfer" | "Deposit" | "Withdrawal"
  date: string
  time: string
  amount: string
  currency: string
  status: "Completed" | "Pending" | "Failed"
  reference: string
  recipient?: Recipient
  description?: string
  paymentMethod: string
  fee: string
}

// Filter Types
export interface TransactionFilters {
  dateRange: string
  type: string
  currency: string
  status: string
}

// Animation Hook Types
export interface PressAnimationResult {
  transform: { scale: any }[]
  onPressIn: () => void
  onPressOut: () => void
}

// Component Props Types
export interface TransactionHistoryProps {
  initialTransactions?: Transaction[]
}

export interface SwipeableTransactionProps {
  type: string
  date: string
  time: string
  amount: string
  currency: string
  index: number
  onViewDetails: (transaction: Transaction) => void
}

export interface TransactionDetailsProps {
  isVisible: boolean
  transaction: Transaction | null
  onClose: () => void
}

export interface TransactionFiltersProps {
  filters: TransactionFilters
  onFilterChange: (filters: TransactionFilters) => void
}

export interface FilterOptionProps {
  label: string
  isSelected: boolean
  onSelect: () => void
}

export interface DateRangePickerProps {
  selectedRange: string
  onSelectRange: (range: string) => void
  onClose: () => void
}

export interface TypePickerProps {
  selectedType: string
  onSelectType: (type: string) => void
  onClose: () => void
}

export interface CurrencyPickerProps {
  selectedCurrency: string
  onSelectCurrency: (currency: string) => void
  onClose: () => void
}

export interface StatusPickerProps {
  selectedStatus: string
  onSelectStatus: (status: string) => void
  onClose: () => void
}

export interface TransactionSearchProps {
  onSearch: (query: string) => void
  transactions: Transaction[]
}

export interface SearchHistoryItemProps {
  term: string
  onPress: (term: string) => void
}

export interface DetailRowProps {
  label: string
  value: string
  isHighlighted?: boolean
}

export interface ActionButtonProps {
  icon: string
  label: string
  onPress: () => void
  primary?: boolean
}

export interface TransactionStatusProps {
  status: string
}

export interface TransactionExportProps {
  transactions: Transaction[]
  filters: TransactionFilters
  onClose: () => void
}

export interface ExportOptionProps {
  icon: string
  title: string
  description: string
  format: string
  onSelect: (format: string) => void
  isSelected: boolean
}

export interface DateRangeOptionProps {
  startDate: Date
  endDate: Date
  onSelect: (startDate: Date, endDate: Date) => void
}

export interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  refreshing: boolean
  children: React.ReactNode
}

export interface SkeletonProps {
  width: number | string
  height: number
  style?: any
}
