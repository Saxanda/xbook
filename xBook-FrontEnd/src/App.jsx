
import './App.scss'
import AppRoutes from './AppRoutes'

function App() {
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    fetch('../testPostData.json')
      .then(response => response.json())
      .then(data => {
        setPostData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  return (
    <AppRoutes/>
  )
}

export default App

