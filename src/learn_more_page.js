import React from 'react'

function LearnMorePage(props) {
  return(
    <div className="mt-4">
      <h4 className="mt-4">Registration</h4>
      Any contributor to the Bitcoin repository can register to be listed. Just sign in, enter a brief description about your work, and hit the Register button.
      You will be immediately listed and publicly viewable. It's really that simple.
      <p />
      <ul>
        <li>You will be immediately added to the candidates list when you register (and immediately removed if you unregister).</li>
        <li>Other contributors will be able to vote for you.</li>
        <li>You can update your description at any time.</li>
        <li>You can register and unregister as many times as you wish.</li>
        <li>Once you are receiving enough funding to survive, unregister so that others can get the financial assistance they need.</li>
      </ul>
      <p />

      <p /><h4>Voting</h4>
      Any contributor to the Bitcoin repository can vote. Simply sign in and click on your favorite candidate in the list.
      <p />
      <ul>
        <li>Every contributor gets one vote.</li>
        <li>You can vote for any candidate, including yourself if you registered.</li>
        <li>Your vote is kept confidential. No one will ever know who you voted for.</li>
        <li>You can change your vote at any time, and as many times as you wish.</li>
      </ul>

      <p /><h4>Looking Forward</h4>
      <p />This is an MVP release that keeps things as simple as possible. But maybe there are modifications that can be made to make it more useful.
      For example:
      <p />
      <ul>
        <li>Maybe contributor votes should be weighted. If you've made 50 contributions to the repository then you get 50 votes and can distribute them among candidates however you wish including assigning them all to one candidate.</li>
        <li>Maybe votes should be made public so everyone can see who voted for a candidate and to provide a way to audit the votes.</li>
        <li>Maybe contributors should be able to attach a comment to a candidate.</li>
      </ul>
      <p />Feel free to use the Feature Request capability to share your ideas!

      <p /><h4>Help</h4>

      <p /><b>Why can't I sign in?</b>
      <p />Only contributors to the Bitcoin repository are allowed to sign in to register and vote.

      <p /><b>I'm a contributor, why can't I sign in?</b>

      <p />Are you an anonymous contributor?
      <p />Anonymous contributors didn't associate their GitHub username with their contribution. Instead, they provided an email address as a unique identifier.
      In order to be verified, you must make the email address in your contribution the public email address in your GitHub profile.
      Then the next time Bitcoin Bootstrap synchronizes with GitHub we will be able to verify your contribution and you will be able to sign in.

      <p />Do you have only had one contribution?
      <p />GitHub's API only returns usernames for the top 500 contributors (highest number of contributions) to a repository.
      If you've made more than one contribution, you'll be included in the top 500 contributors.
      But if you've only made one contribution, you may not be included in the top 500 and the API only returns the email address you used when you made your contribution.
      In this case, it is necessary that you follow the same steps as an anonymous contributor and make the email address in your contribution the public email address in you GitHub profile.
      Then the next time Bitcoin Bootstrap synchronizes with GitHub we will be able to verify your contribution and you will be able to sign in.
      <p /><i>Note - It can take up to 24 hours to get verified after making an email in your GitHub profile public.</i>
      <p className="mb-4" />
    </div>
  );
}

export default LearnMorePage;
