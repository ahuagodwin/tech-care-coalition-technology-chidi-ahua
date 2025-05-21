import { FlowType } from "@/types/global";


export const maskCardNumber = (cardNumber?: string): string => {
    if (!cardNumber) return '';
    const digits = cardNumber.replace(/\D/g, '');
    const lastFour = digits.slice(-4);
    const masked = digits
      .slice(0, -4)
      .replace(/\d/g, '*')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  
    return `${masked} ${lastFour}`.trim();
  }
  

  export const formatCurrency = (
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US'
  ): string => {
    if (isNaN(amount)) return '0';
  
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };


  export const formatDateTime = (
    date: string | number | Date,
    locale: string = 'en-US',
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  ): string => {
    try {
      const d = new Date(date);
      return new Intl.DateTimeFormat(locale, options).format(d);
    } catch (error) {
      return 'Invalid';
    }
  };




  export const getAlertStyles = (type:  string) => {
    switch (type) {
      case "success":
        return {
          container: "bg-[#F0FDF4] border-b border-[#4ADE80]",
          text: "text-[#4ADE80]",
        };
      case "error":
        return {
          container: "bg-red-100 border-b border-red-500",
          text: "text-red-700",
        };
      case "info":
      default:
        return {
          container: "bg-blue-100 border-b border-blue-500",
          text: "text-blue-700",
        };
    }
  };

export const flowStepTitles: Record<FlowType, Record<number, string>> = {
  transfer: {
    1: "Select Currency Type",
    2: "Transfer Amount",
    3: "Review Details",
  },
  deposit: {
    1: "Select Deposit Source",
    2: "Enter Amount",
    3: "Review & Confirm",
  },
};

export const getStepTitle = (type: FlowType | null, step: number): string => {
  if (!type || !flowStepTitles[type][step]) return '';
  return flowStepTitles[type][step];
};





export const getNetworkErrorMessage = (error: any): string => {
  if (error?.code === 'ERR_NETWORK' || error?.message?.includes('Network Error')) {
    return 'Network error: Unable to connect to the server. Please check your internet connection.';
  }
  if (error?.name === 'NS_ERROR_CONNECTION_REFUSED') {
    return 'Connection refused: something went wrong, please try again!';
    // The server may be temporarily unavailable
  }
  if (error?.name === 'NS_ERROR_OFFLINE') {
    return 'Offline: It seems you are not connected to the internet. Please check your connection.';
  }
  if (error?.name === 'NS_ERROR_NET_TIMEOUT' || error?.message?.includes('timeout')) {
    // Check if it's truly a timeout error by using a condition for a delayed response
    if (error?.response?.status) {
        return 'Please check your internet connection and try again.';
        // The request took too long to complete. Please try again.
    }
    return 'Request timed out: Please check your internet connection and try again!';
    // Request timed out: The server took too long to respond. Please try again.
  }

  if (error?.name === 'NS_BINDING_ABORTED') {
    return 'Request aborted: The network request was canceled. This could happen if the request was interrupted. Please try again';
  }

  // Check if error is due to a successful response that was interpreted as a failure.
  if (error?.response?.status === 200 || error?.response?.status === 201) {
    // If a 2xx response is returned but still falls into the catch, this could be handled differently
    return 'Data submitted, but unexpected result occurred.';
  }

  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    return `Client error (${error?.response?.status}): ${error?.response?.data?.message || error?.response?.statusText || 'An error occurred on the client side.'}`;
  }
  if (error?.response?.status >= 500) {
    return `Server error (${error?.response?.status}): ${error?.response?.data?.message || error?.response?.statusText || 'An error occurred on the server. Please try again later.'}`;
  }

  return 'An unexpected error occurred. Please try again.';
};

