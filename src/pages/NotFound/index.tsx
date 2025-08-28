import { Link } from 'react-router-dom';
import './style.sass';

const NotFound: React.FC = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Page non trouvée</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
};

export default NotFound;
