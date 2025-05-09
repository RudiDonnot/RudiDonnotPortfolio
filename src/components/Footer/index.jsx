import "../../pages/Home/style.css";
import Yellowbackground from "../../assets/Yellowbackground.png";

function Footer() {
  return (
    <footer className="headerfooter">
      <img src={Yellowbackground} alt="" />
      <div className="textcontent">
        <h3>Contact</h3>
        <p>41 Rue Carnot, 77 860 Quincy Voisins</p>
        <p>rudi.donnot@gmail.com</p>
      </div>
    </footer>
  );
}

export default Footer;
