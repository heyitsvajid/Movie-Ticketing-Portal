import React, { Component } from 'react';

class EndFooter extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
  
  }

  render() {
    return (
    <div>
      <section id="site-info">
        <div class="row">
            <div class="center-align">
              <a href="#" data-prev-href="/help" id="nano-rep-link" rel="nofollow">Help</a>
              <span id="footer-feedback"><a class="QSILink SI_81izGXuS0ndBWbX_Link" href="javascript:void(0);">Feedback</a></span>
              <a href="/account/overview" rel="nofollow">My Fandango</a>
              <a href="http://fandango.custhelp.com/app/chat/chat_launch" rel="nofollow">Live Chat</a>
            </div>
            <div class="center-align">
              <a href="/AboutUs.aspx" rel="nofollow">About Fandango</a>
              <a href="/careers" rel="nofollow">Careers</a>
              <a href="/Advertising.aspx">Advertising</a>
              <a href="/freemoviecontent">Link to Us</a>
              <a href="/affiliateprogram" rel="nofollow">Affiliate Program</a>
              <a href="/PromotionalCodes.aspx" rel="nofollow">Fandango Rewards</a>
              <a href="/site-index/">Site Index</a>
              <a href="/policies/privacy-policy" rel="nofollow">Your Privacy Rights - Privacy Policy</a>
              <a href="/policies/terms-and-policies" rel="nofollow">Terms and Policies</a>
            </div>
            <div class="center-align">
              <span>Fandango Affiliated Companies:</span>
              <a href="https://www.fandangonow.com/">FandangoNOW</a>
              <a href="https://www.fandangofanshop.com/">FanShop</a>
              <a href="http://movieclips.com/">MovieClips</a>
              <a href="http://www.movies.com/">Movies.com</a>
              <a href="http://www.telemundo.com/entretenimiento/fandango-cine">Fandango Cine en Español</a>
            </div>
            {/* <a class="center-align" href="#" id="ad-choices-link" rel="nofollow">< AdChoices</a> */}
            <span class="center-align"><img id="ad-choices-icon" src="https://info.evidon.com/c/betrad/pub/icong1.png" />AdChoices Copyright © 2017 Fandango. All rights reserved. Your Ticket to the Movies. Your Personal Box Office.</span>
        </div>
      </section>
    </div>
    )
  }
}



export default EndFooter;
