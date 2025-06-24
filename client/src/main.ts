import './components/textfield/textfield';
import './components/button/button';
import './components/notification/notification';
import './components/spinner/spinner';
import './components/champion-skin/champion-skin';
import './components/router/router'; // Router component needs to be loaded last, so all other components are loaded in and ready for use

import './ts/pages/setup-page';
import './ts/pages/champions-page';

// Ensures only 1 Service exists and is created (only load services if they have logic in the constructor)
import './ts/services/notification-service';
import './ts/services/router-service';
