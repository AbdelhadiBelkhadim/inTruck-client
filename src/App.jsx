import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'; 
import Register from './componants/Auth/register'; // Import the Rejester component
import Login from './componants/Auth/login'; // Import the Login component
import NotFound from './pages/NotFound';
import NewOrder from './pages/NewOrder'; // Import the NewOrder component
import TrackingMain from './componants/sections/dashboardsMain/trackingMain';
import CargoMain from './componants/sections/dashboardsMain/cargoMain'; // Import the CargoMain component
import HistoryMain from './componants/sections/dashboardsMain/historyMain'; // Import the HistoryMain component 
import DEliveriesMain from './componants/sections/dashboardsMain/deliveriesMain'; // Import the DeliveriesMain component
import NotificationMain from './componants/sections/dashboardsMain/notificationsMain'; // Import the NotificationsMain component
import NewOrderDetails from './pages/NewOrderDetails';
import NewOrderDetailsPackage from './pages/NewOrderDetailsPackage'; // Import the NewOrderDetailsPackage component
import NewOrderFullCoverage from './pages/NewOrderFullCoverage'; // Import the NewOrderFullCoverage component
import SetupPayment from './pages/SetupPayment'; // Import the SetupPayment component
import CheckingOrder from './pages/CheckingOrder'; // Import the CheckingOrder component
import CheckingDone from './pages/CheckingDone'; // Import the CheckingDone component
import WhereDelivered from './pages/WhereDelivered'; // Import the WhereDelivered component
import PickUpLocation from './pages/PickUpLocation'; // Import the PickUpLocation component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashboard />} /> {/* Dashboard with nested routes */}
        <Route path="/register/*" element={<Register />} /> {/* Rejester component */}
        <Route path="/login" element={<Login />} /> {/* Login component */}
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
        <Route path="/new-order" element={<NewOrder />} /> {/* NewOrder component */}
        <Route path="/tracking" element={<TrackingMain />} /> {/* TrackingMain component */}
        <Route path="/cargo" element={<CargoMain />} /> {/* CargoMain component */}
        <Route path="/history" element={<HistoryMain />} /> {/* HistoryMain component */}
        <Route path="/deliveries" element={<DEliveriesMain />} /> {/* DeliveriesMain component */}
        <Route path="/notifications" element={<NotificationMain />} /> {/* NotificationsMain component */}
        <Route path="/new-order-details" element={<NewOrderDetails />} /> {/* NewOrderDetails component */}
        <Route path="/new-order-details-package" element={<NewOrderDetailsPackage />} /> {/* NewOrderDetailsPackage component */}
        <Route path="/new-order-full-coverage" element={<NewOrderFullCoverage />} /> {/* NewOrderFullCoverage component */}
        <Route path="/setup-payment" element={<SetupPayment />} /> {/* SetupPayment component */}
        <Route path="/checking-order" element={<CheckingOrder />} /> {/* CheckingOrder component */}
        <Route path="/checking-done" element={<CheckingDone />} /> {/* CheckingDone component */}
        <Route path="/new-order-where-delivered" element={<WhereDelivered />} /> 
        <Route path="/new-order-pickup-location" element={<PickUpLocation />} /> {/* PickUpLocation component */}
        
        
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
