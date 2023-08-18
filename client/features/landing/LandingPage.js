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
      </section>

      <section className="features">
        <h2>Features That Matter</h2>
        <ul>
          <li>
            Fast & Secure Payments: We provide users with fast and secure
            payments through Stripe
          </li>
          <li>
            Search & Book: Users can search for fitness spaces or classes using
            Google Maps directly on our site
          </li>
          <li>
            Security & Privacy: We provide all users with Secure Sign-On and
            check out capabilities
          </li>
          <li>
            Integrity & Honesty: At Bern we implemented Rating and Reviews
            functionality for transparency on listings
          </li>
          <li>
            Mobile-Friendly Design: Our application is available and functional
            on any device
          </li>
          <li>
            User Friendly Interface: We provide easy sign up, log in, booking,
            listing management and checkout functionality
          </li>
        </ul>
      </section>

      <section className="creators">
        <h2>The Team Behind The Scene</h2>
        <div className="creator">
          <img src="/images/Leo.jpg" alt="Leo Harada" />
          <p> Leo Harada </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod...
          </p>
        </div>
        <div className="creator">
          <img src="/images/Dianna.jpg" alt="Dianna Chen" />
          <p> Dianna Chen </p>
          <p>
            My name is Dianna and I am a Full Stack Software Engineer. Solving
            interconnected problems through coding has always intrigued me.
            Coding has allowed me to use my critical thinking skills to tackle
            daily challenges and I like that there are endless boundaries for
            analyzing and problem-solving. When I'm away from my computer, I am
            looking for ways to digital detox as much as possible. You can find
            me training for half marathon runs, catching ferry rides to beaches
            and chasing sunsets.
          </p>
        </div>
        <div className="creator">
          <img src="/images/Jesse.jpg" alt="Jesse Hernandez" />
          <p> Jesse Hernandez </p>
          <p>
            Hello, I'm Jesse Hernandez III, a full stack software engineer with
            a focus on front-end development. I'm dedicated to crafting seamless
            interfaces that bring ideas to life. Beyond coding, you'll find me
            hiking, gaming, and joyfully streaming on Twitch.tv. Get ready to
            embark on an exciting journey with our app, where you can experience
            the Bern wherever you live.
          </p>
        </div>
        <div className="creator">
          <img src="/images/Ivan.jpg" alt="Ivan Garcia" />
          <p> Ivan Garcia </p>
          <p>
            Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat...
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
