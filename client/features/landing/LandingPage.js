import React from "react";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="slogan">
        <h1>Are you ready to feel the BERN?</h1>
        <p>
          <div>
            Welcome to Bern, our innovative application that will transform the
            way you stay away!
          </div>
          <br/>
          <div>Do you travel often for work? </div>

          <div> Are you a dedicated globetrotter? </div>

          <div> An innovative digital nomad? </div>
          <br/>
          <div>
            {" "}
            If you spend more time away from home than actually at home, then we
            are perfect for you.{" "}
          </div>
          <br/>
          <div>
            {" "}
            At Bern, we are dedicated to helping the fellow traveling community
            stay fit by providing users with access to fitness spaces across the
            world through our unique and interactive booking system.
          </div>
        </p>
        <hr></hr>
      </section>
      <h2>Features That Matter</h2>
      <section className="features">
          <p>
            Fast & Secure Payments: We provide users with fast and secure
            payments through Stripe
          </p>
          <p>
            Search & Book: Users can search for fitness spaces or classes using
            Google Maps directly on our site
          </p>
          <p>
            Accessibility: Find fitness spaces or classes anywhere near you whether at home or while traveling!
          </p>
          <p>
            Security & Privacy: We provide all users with Secure Sign-On and
            check out capabilities
          </p>
          <p>
            Integrity & Honesty: At Bern we implemented Rating and Reviews
            functionality for transparency on listings
          </p>
          <p>
            User Friendly Interface: We provide easy sign up, log in, booking,
            listing management and checkout functionality
          </p>
      </section>
      <hr></hr>
      <h2>The Team Behind The Scene</h2>
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
