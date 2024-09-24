import Authors from "./components/Authors"
import BirthForm from "./components/BirthForm"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import {
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/">authors</Link>
      <Link style={padding} to="/books">books</Link>
      <Link style={padding} to="/newbook">add book</Link>
      <Routes>
        <Route path="/" element={<><Authors /><BirthForm /></>} />
        <Route path="/books" element={<Books />} />
        <Route path="/newbook" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
