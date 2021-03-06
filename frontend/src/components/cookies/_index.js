import React from 'react'
import { Block } from '../_help/_index'
import { Helmet } from 'react-helmet'
import './index.css'

export function CookieAccept(){
  return(
    <div className="container-fluid cookie-accept text-white text-center p-2">
      <h5 className="mb-0">SavesPlace website use cookies. Find out about cookies <a href="/cookies_policy">here</a>. By continuing to browse this site you are agreeing to our use of cookies. <a href="/" onClick={() => localStorage.setItem('cookies_accept', 'Yes')}>Ok</a></h5>
    </div>
  )
}

export function CookiesPolicy(){
  return(
    <Block className="container-fluid pb-5 mb-5">
      <Helmet>
        <title>Cookies Policy - SavesPlace</title>
      </Helmet>
      <div className="cookies_policy p-4">
        <div className="what-are-cookies">
          <h4>What are cookies?</h4>
          <p>Cookies are small text files containing a string of characters that can be placed on your computer or mobile device that uniquely identify your browser or device. What are cookies used for?</p>
          <p>Cookies allow a site or services to know if your computer or device has visited that site or service before. Cookies can then be used to help understand how the site or service is being used, help you navigate between pages efficiently, help remember your preferences, and generally improve your browsing experience. Cookies can also help ensure marketing you see online is more relevant to you and your interests.</p>
        </div>
        <div className="what-types-of-cookies-does-savesplace-use">
          <h4>What types of cookies does SavesPlace use?</h4>
          <p>There are generally four categories of cookies: “Strictly Necessary,” “Performance,” “Functionality,” and “Targeting.” SavesPlace routinely uses all four categories of cookies on the Service. You can find out more about each cookie category below.</p>
          <ol>
            <li>
              <p>Strictly Necessary Cookies. These cookies are essential, as they enable you to move around the Service and use its features, such as accessing logged in or secure areas.</p>
            </li>
            <li>
              <p>Performance Cookies. These cookies collect information about how you have used the Service, for example, information related to the unique username you have provided, so that less strain is placed on our backend infrastructure. These cookies may also be used to allow us to know that you have logged in so that we can serve you fresher content than a user who has never logged in. We also use cookies to track aggregate Service usage and experiment with new features and changes on the Service. The information collected is used to improve how the Service works.</p>
            </li>
            <li>
              <p>Functionality Cookies. These cookies allow us to remember how you’re logged in, whether you chose to no longer see advertisements, whether you made an edit to an article on the Service while logged out, when you logged in or out, the state or history of Service tools you’ve used. These cookies also allow us to tailor the Service to provide enhanced features and content for you and to remember how you’ve customized the Service in other ways, such as customizing the toolbars we offer in the right column of every page. The information these cookies collect may be anonymous, and they are not used to track your browsing activity on other sites or services.</p>
            </li>
            <li>
              <p>Targeting Cookies. SavesPlace, our advertising partners or other third party partners may use these types of cookies to deliver advertising that is relevant to your interests. These cookies can remember that your device has visited a site or service, and may also be able to track your device’s browsing activity on other sites or services other than SavesPlace. This information may be shared with organizations outside SavesPlace, such as advertisers and/or advertising networks to deliver the advertising, and to help measure the effectiveness of an advertising campaign, or other business partners for the purpose of providing aggregate Service usage statistics and aggregate Service testing.</p>
            </li>
          </ol>
        </div>
        <div className="how-long-will-cookies-stay-on-my-device">
          <h4>How long will cookies stay on my device?</h4>
          <p>The length of time a cookie will stay on your computer or mobile device depends on whether it is a “persistent” or “session” cookie. Session cookies will only stay on your device until you stop browsing. Persistent cookies stay on your computer or mobile device until they expire or are deleted.</p>
        </div>
        <div className="first-and-third-party-cookies">
          <h4>First and third party cookies</h4>
          <p>First-party cookies are cookies that belong to SavesPlace, third-party cookies are cookies that another party places on your device through our Service. Third-party cookies may be placed on your device by someone providing a service for SavesPlace, for example to help us understand how our service is being used. Third-party cookies may also be placed on your device by our business partners so that they can use them to advertise products and services to you elsewhere on the Internet.</p>
        </div>
        <div className="how-to-control-and-delete-cookies">
          <h4>How to control and delete cookies</h4>
          <p>If you want to delete cookies follow the <a href="http://www.wikihow.com/Clear-Your-Browser%27s-Cookies">instructions</a>. If you wish to disable your browser from receiving cookies follow the <a href="http://www.wikihow.com/Disable-Cookies">instructions</a>. Note that if you set your browser to disable cookies, you may not be able to access certain parts of our Service and other parts of our Service may not work properly. You can find out more information cookie settings at third-party information sites, such as www.allaboutcookies.org.</p>
        </div>
      </div>
    </Block>
  )
}
