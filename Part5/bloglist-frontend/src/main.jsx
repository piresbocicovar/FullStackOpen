import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)