declare module '*.svg' {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
  }
  declare module 'react-native-datepicker' {
    const content: any;
    export default content;
  }

  export type FlowType = 'transfer' | 'deposit';


  type IoniconName = IconProps<Ionicons>['name'];

export type  RecordItem = {
  label: string;
  value: string;
  icon: IoniconName;
}