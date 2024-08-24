import './App.css';
import CustomerLifetimeValue from './components/CustomerLifetimeValue';
import CustomerDistribution from './components/CustomersDistribution';
import Footer from './components/Footer';
import Header from './components/Header';
import NewCustomers from './components/NewCustomers';
import RepeatCustomers from './components/RepeatCustomers';
import SalesGrowthRate from './components/SalesGrowthRate';
import SalesOverTime from './components/SalesOverTime';

function App() {

  return (
    <div className="App">
      <Header />
      <SalesOverTime />
      <SalesGrowthRate />
      <NewCustomers />
      <RepeatCustomers />
      <CustomerDistribution />
      <CustomerLifetimeValue />
      <Footer />
    </div>
  );
}

export default App;
