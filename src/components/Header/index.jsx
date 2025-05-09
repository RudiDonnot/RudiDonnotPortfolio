import "../../pages/Home/style.css";
import Yellowbackground from "../../assets/Yellowbackground.png";

function Header() {
  return (
    <header className="headerfooter">
      <img src={Yellowbackground} alt="" />
      <div className="textcontent">
        <h1>Rudi Donnot</h1>
        <h2>Développeur FrontEnd</h2>
        <p>Javascript, React, Redux</p>
      </div>
    </header>
  );
}

export default Header;
