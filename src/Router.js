import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import LoginForm from './components/LoginForm';
import Fridge from './components/Fridge';
import NewProductView from './components/NewProductView';
import PurchaseView from './components/PurchaseView';
import RulesView from './components/RulesView';
import ReportView from './components/ReportView';
import BarcodeScanner from './components/BarcodeScanner';

const RouterComponent = () => {

 return (
  <Router>
    <Scene key="root" hideNavBar>

      
      <Scene key="auth">
        <Scene
          key="login"
          component={LoginForm}
          title="Please Login"
          initial
        />
      </Scene>
      
      <Scene key="main">
        <Scene
          key="fridge"
          component={Fridge}
          title="My fridge"
          initial
          leftTitle="Logout"
          onLeft={ () => Actions.auth({ logout: true, type: 'reset' }) }
        />
        <Scene 
          key="barcodeScanner"
          component={BarcodeScanner}
          title="Scan Barcode"
        />
        <Scene
          key="newProduct"
          component={NewProductView}
          title="New Product"
          renderBackButton={()=>(<View />)}
        />
        <Scene
          key="purchase"
          component={PurchaseView}
          title="Purchase"
          renderBackButton={()=>(<View />)}
        />
        <Scene
          key="rules"
          component={RulesView}
          title="Rules And Guidelines"
        />
        <Scene
          key="report"
          component={ReportView}
          title="Report product"
        />
      </Scene>
    
    </Scene>
  </Router>
 );
};

export default RouterComponent;
