import React from "react";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */
const Home = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const username = useSelector((state)=> state.auth.me.username);
  const role = useSelector((state) => state.auth.me.role);
  const id = useSelector((state) => state.auth.me.id);


  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div className="navlinks-container">
            {role === "User" ? (
              <div>
                <h3 className="welcome">Welcome, {id ? username : "Guest"}!</h3>
                <div>
                  Thank you for signing up for Bern. Please read below for additional information on the features we offer:
                  <p>
                    To see a list of all instructors currently offering spaces or classes through Bern, select the Instructors tab. Here you will be able to access their contact information as well as be able to see any listings associated with them.
                  </p>
                  <p>
                    To check what spaces or classes are being offered in the app, head over to the listings tab.
                  </p>
                  <p>
                    For a more personalized search specific to any area, you can head over to the Find your Fit tab and enter the area’s zip code for a map display of all listings around there.
                  </p>
                  <p>
                    To book a class, select the listing you are interested in, either on the Listings tab or the Find your Fit tab, add it to your cart and check out.
                  </p>
                  <p>
                    To edit your profile information, click on the Edit Profile tab and update accordingly.
                  </p>
                </div>
              </div>
            ) : role === "Renter" ? (
              <div>
                <h3 className="welcome">Welcome, {id ? username : "Guest"}!</h3>
                <div>
                  Thank you for signing up for Bern. Please read below for additional information on how to post and manage your listings:
                  <p>
                    To post a listing, maneuver over to our Add Listings tab to begin. Here you will be able to provide us with all of the necessary information to successfully post your listing up for our users to readily book.
                  </p>
                  <p>
                    To update or remove your listings from our site, head over to the My Listings tab and select the listing you would like to manage.
                  </p>
                  <p>
                    To edit your profile information, click on the Edit Profile tab and update accordingly.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </nav>
    </div>
  );
};

export default Home;
