import "./style.css";
import projects from "../../assets/data/cardinfos.json";
import Card from "../../components/Card/index";

function Home() {
  return (
    <main>
      {projects.map((project, index) => (
        <Card
          key={index}
          cardPosition={project.position.default}
          cardPositionmedium={project.position.medium}
          cardPositionsmall={project.position.small}
          cardSrc={project.imageSrc}
          cardUrl={project.url}
          cardAlt={project.alt}
          cardText={project.text}
        />
      ))}
      <div className="infocard"></div>
    </main>
  );
}

export default Home;
