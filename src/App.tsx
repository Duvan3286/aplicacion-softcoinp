import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import LoginForm from './pages/login/LoginForm';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import MainMenu from './pages/menu/MainMenu';
import PasswordRecoveryForm from './pages/password/PasswordRecoveryForm';
import ListUser from './pages/register_user/ListUser';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      
        <IonRouterOutlet>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/menu">
            <MainMenu />
          </Route>
          <Route exact path="/recuperar-contrasena">
            <PasswordRecoveryForm />
          </Route>

          <Route exact path="/registrar-usuario">
            <ListUser />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      
    </IonReactRouter>
  </IonApp>
);

export default App;
