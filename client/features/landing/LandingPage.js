import React from "react";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="slogan">
        <h1 id="bern-slogan">Are you ready to feel the BERN?</h1>
          <p className="slogan-text">
            Welcome to Bern, our innovative application that will transform the
            way you stay away!
          </p>
          <br/>
          <p className="slogan-text">Do you travel often for work? </p>

          <p className="slogan-text"> Are you a dedicated globetrotter? </p>

          <p className="slogan-text"> An innovative digital nomad? </p>
          <br/>
          <p className="slogan-text">
            {" "}
            If you spend more time away from home than actually at home, then we
            are perfect for you.{" "}
          </p>
          <br/>
          <p className="slogan-text">
            {" "}
            At Bern, we are dedicated to helping the fellow traveling community
            stay fit by providing users with access to fitness spaces across the
            world through our unique and interactive booking system.
          </p>
      </section>
      <hr></hr>
      <div id="features-title">
      <h2>Features That Matter</h2>
      </div>
      <section className="features">
        <div className="features-text">
        <img className="features-img" src="/images/20-202327_icon-fast-safe-secure-fast-and-secure-icon.png" ></img>
            <p className="features-sentence">
              Fast & Secure Payments: We provide users with fast and secure payments through Stripe
            </p>
        </div>
          <div className="features-text">
          <img className="features-img" src="/images/search-bar-design-element-navigation-and-search-concept-icon-cartoon-minimal-style-free-vector.jpg"></img>
            <p className="features-sentence">
              Search & Book: Users can search for fitness spaces or classes using Google Maps directly on our site
            </p>
          </div>
          <div className="features-text">
          <img className="features-img" src="/images/runpic.jpg"></img>
            <p className="features-sentence">
              Competitive Edge: Users have the ability to book fitness spaces or classes beyond the typical gym, fitness and yoga studios because at Bern, we offer a comprehensive range of options tailored to individual preferences.
            </p>
          </div>
          <div className="features-text">
          <img className="features-img" src="/images/1200x630wa.png"></img>
            <p className="features-sentence">
              Security & Privacy: We provide all users with Secure Sign-On and check out capabilities
            </p>
          </div>
          <div className="features-text">
          <img className="features-img" src="/images/Mixed-Race-Hands.jpg"></img>
            <p className="features-sentence">
              Integrity & Honesty: At Bern we implemented Rating and Reviewsfunctionality for transparency on listings
            </p>
          </div>
          <div className="features-text">
          <img className="features-img" src="/images/main.jpg"></img>
            <p className="features-sentence">
              User Friendly Interface: We provide easy sign up, log in, booking, listing management and checkout functionality
            </p>
          </div>
      </section>
      <hr></hr>
      <h2 id="creators-title">The Team Behind The Scene</h2>
      <section className="creators">
        <span className="creator">
          <img src="/images/leoharada.png" className="landing-letter-images" alt="leoharadalogo" />
          <img src="/images/Leo.jpg" alt="Leo Harada" />
          <p className="bio">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod...
          </p>
          
        </span>
        <span className="creator">
          <img src="images/diannachen.png" className="landing-letter-images" alt="diannachenlogo"/>
          <img src="/images/Dianna.jpg" alt="Dianna Chen" />
          <p className="bio">
            My name is Dianna and I am a Full Stack Software Engineer. Solving
            interconnected problems through coding has always intrigued me.
            Coding has allowed me to use my critical thinking skills to tackle
            daily challenges and I like that there are endless boundaries for
            analyzing and problem-solving. When I'm away from my computer, I am
            looking for ways to digital detox as much as possible. You can find
            me training for half marathon runs, catching ferry rides to beaches
            and chasing sunsets.
          </p>          
        </span>
        <span className="creator">
          <img src="images/jessehernandez.png" className="landing-letter-images" alt="jessehernandezlogo"/>
          <img src="/images/Jesse.jpg" alt="Jesse Hernandez" />
          <p className="bio">
            Hello, I'm Jesse Hernandez III, a Full Stack Software Engineer with
            a focus on front-end development. I'm dedicated to crafting seamless
            interfaces that bring ideas to life. Beyond coding, you'll find me
            hiking, gaming, and joyfully streaming on Twitch.tv. Get ready to
            embark on an exciting journey with our app, where you can experience
            the Bern wherever you live.
          </p>
          
          
        </span>
        <span className="creator">
          <img src="images/ivangarcia.png" className="landing-letter-images" alt="ivangarcialogo"/>
          <img src="/images/Ivan.jpg" alt="Ivan Garcia" />
          <p className="bio">
            Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat...
          </p>
          
          
        </span>
      </section>
    </div>
  );
};

export default LandingPage;
