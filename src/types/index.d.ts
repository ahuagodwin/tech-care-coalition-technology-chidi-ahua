

interface LayoutProps {
    children: React.ReactNode
}

interface CaptionProps {
    label?: string;
    text?: string;
    position?: string;
}


interface AuthFormProps {
    onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined
    children?: React.ReactNode
}

interface InputProps {
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined
    onError?: React.ReactEventHandler<HTMLInputElement> | undefined
    placeholder?: string | undefined
    padding?: string
    type?: "text" | "password" | "email" | "otp" | undefined
    label?: string
    handleOTP?: ((value: string) => void) | undefined
    length?: number
    onKeyPress?: React.KeyboardEventHandler<HTMLDivElement> | undefined
}

interface LinksGroupProps {
    icon?: any;
    label?: string;
    initiallyOpened?: boolean;
    path: string
    activeBg?: string
    resetActive?: string
    links?: { label: string; path: string, activeBg?: string, resetActive?: string, icon?: any }[];
    logout?: () => void;
  }

  interface ModalProps {
    open?: boolean,
    title?: string
    onClose?: () => void,
    children?: React.ReactNode,
    className?: string,
    footer?: null,
    maskClosable?: boolean,
    closeIcon?: any
    width?: number | string
}


interface AuthUserResponseData {
    success: string | boolean;
    statusCode: number
    message: string | null;
    data?: any
  }

interface AuthUserState {
    authUser: AuthUserResponseData | null;
    isAuthUserLoading: boolean;
    isAuthUserError: string | null;
  }




  interface DiagnosisHistory {
    month?: string;
    year?: number;
    blood_pressure?: {
      systolic: {
        value: number;
        levels: string;
      };
      diastolic?: {
        value: number;
        levels: string;
      };
    };
    heart_rate?: {
      value?: number;
      levels?: string;
    };
    respiratory_rate?: {
      value?: number;
      levels?: string;
    };
    temperature?: {
      value?: number;
      levels?: string;
    };
  }
  
  interface Diagnostic {
    name?: string;
    description?: string;
    status?: string;
  }
  
  interface Patient {
    name?: string;
    gender?: string;
    age?: number;
    profile_picture?: string;
    date_of_birth?: string;
    phone_number?: string;
    emergency_contact?: string;
    insurance_type?: string;
    diagnosis_history?: DiagnosisHistory[];
    diagnostic_list?: Diagnostic[];
    lab_results?: string[];
  }
  
  interface PatientBiodataProps {
    selectedPatientData?: Patient
}

// Define types for the return value
interface DiagnosisItem {
  icon: any;
  name: string;
  status?: string;
  value: string;
  month?: string
  bg?: string;
}

interface UserAccess {
  accessToken?: string | null;
  redirect?: string;

}