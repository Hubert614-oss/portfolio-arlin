
import './App.css'
import AppRoutes from './routes'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'




function App() {

  return (
    <>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
