import React from 'react';
import './About.css'; // Se till att About.css är korrekt importerad och finns

const About = () => {
  return (
    <main className="about-main">
      <h2>Om oss</h2>
      <section className="about-content">
        <p>
          Välkommen till vår reseplanerare! Den här sidan skapades av ett passionerat team av utvecklare som älskar att kombinera teknik med resande. Vår vision var att skapa ett enkelt och användarvänligt verktyg för att hjälpa alla, oavsett om du är en erfaren globetrotter eller en första gångs resenär, att planera och organisera dina äventyr.
        </p>
        <p>
          Med vår applikation kan du enkelt lägga till resor, planera aktiviteter, och hålla koll på dina kommande äventyr på ett smidigt och visuellt sätt. Vår användargränssnitt är designad för att vara intuitiv och enkel att använda. Vi hoppas att du finner vår reseplanerare till hjälp när du planerar dina nästa stora resa!
        </p>
        <h3>Vårt Team</h3>
        <div className="team-members">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Teammedlem 1" />
            <p><strong>Anna Svensson</strong></p>
            <p>Frontend Developer</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Teammedlem 2" />
            <p><strong>Johan Karlsson</strong></p>
            <p>Backend Developer</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Teammedlem 3" />
            <p><strong>Linda Andersson</strong></p>
            <p>UX/UI Designer</p>
          </div>
        </div>
        <p>
          Vi är ett litet, men engagerat team, som ständigt arbetar för att förbättra och utveckla vår applikation för att göra din reseplanering ännu bättre.
        </p>
      </section>
    </main>
  );
};

export default About;
