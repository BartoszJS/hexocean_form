import "./App.scss";
import { Provider } from "react-redux";
import Form from "./components/Form/Form";
import { store } from "./redux/store";
import AllDishes from "./components/AllDishes/AllDishes";

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <div className='app-container'>
          <Form />
          <AllDishes />
        </div>
      </Provider>
    </div>
  );
}

export default App;
