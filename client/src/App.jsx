import { Navbar, Welcome, Footer, Transactions } from "./components";
import { NotificationProvider } from "./context/NotificationContext";

const App = () => (
  <NotificationProvider>
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>

      <Transactions />
      <Footer />
    </div>
  </NotificationProvider>
);

export default App;
