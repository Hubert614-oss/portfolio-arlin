
import './App.css'
import AppRoutes from './routes'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'




function App() {

  return (
    <>
      <div className="h-screen overflow-y-auto scrollbar-hide">
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
