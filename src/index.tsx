import { createRoot } from 'react-dom/client'
import App from './components/App'
import { GlobalStateProvider } from './stateMachine'
import './index.css'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>
)
