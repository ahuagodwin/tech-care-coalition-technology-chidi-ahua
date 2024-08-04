import React from 'react';
import { ConfigProvider } from 'antd';

export const ThemeConfig = ({ children } : { children: React.ReactNode}) => {
  return (
    <ConfigProvider
    theme={{
        token: {
            colorPrimary: `#01F0D0`,
            colorPrimaryBg: `#01F0D0`,
            colorBorder: `#01F0D0`,
            colorPrimaryBgHover: "none",
            colorPrimaryBorderHover: "none",
            colorBorderBg: "none",
            boxShadow: "none",
            boxShadowSecondary: "none",
            colorBgLayout: "transparent", 
            borderRadiusOuter: 0,
            boxShadowTertiary: "none",
            colorBgBlur: "none",
            colorBorderSecondary: "none",
        }
      }}
  >
    {children}
  </ConfigProvider>
  )
}

