import { createRoot } from 'react-dom/client'
import App from './components/App'
import { GlobalStateProvider } from './stateMachine'
import './index.css'

const container = document.getElementById('app')

if (!container) throw new Error('Failed to find the root element')

const root = createRoot(container)
root.render(
  <GlobalStateProvider>
    <div className="logo-bg min-h-screen">
      <App />
    </div>
  </GlobalStateProvider>
)
