import { ToastContainer } from "@/components/ui";
import { ToastHook } from "@/types/types";

export const useToast = (): ToastHook => {
  return {
    showSuccess: ToastContainer.showSuccess!,
    showError: ToastContainer.showError!,
    showWarning: ToastContainer.showWarning!,
    showInfo: ToastContainer.showInfo!,
  };
};