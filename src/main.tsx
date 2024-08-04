import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeConfig } from "./theme/color.config.tsx"
import { createTheme, MantineProvider as MantineConfig } from '@mantine/core';
import '@mantine/core/styles.css';
import { Provider } from 'react-redux'
import { store } from './api/store.tsx'


const theme = createTheme({
  fontFamily: `var(--fontOutfit)`,
  defaultRadius: 'md',
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <Provider store={store}>
   <ThemeConfig>
      < MantineConfig theme={theme}>
          <App />
      </ MantineConfig>
    </ThemeConfig>
   </Provider>

  </React.StrictMode>,
)
