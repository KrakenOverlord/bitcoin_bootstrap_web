import React from 'react'

function LearnMorePage(props) {
  return(
    <div className="mt-5">
      <h4>Bitcoin was Built by Volunteers</h4>
      <p />Starting with Satoshi Nakamoto, Bitcoin was built by volunteers who envisioned a better world.
      Many of these volunteers worked on it in their free time while holding a full or part-time job. Some even worked on it while living exclusively off their personal savings.
      Eventually, some found jobs that paid them to work on Bitcoin, but most continue unpaid. Bitcoin Bootstrap helps bring visibility to the best of these unpaid developers seeking help.

      <h4 className="mt-4">Registration</h4>
      Any contributor to the Bitcoin GitHub repository can register to be listed. Just sign in, enter a brief description about your work, and hit the register button.
      You will be immediately listed and publicly viewable. It's really that simple.
      <p />
      <ul>
        <li>You will be immediately added to the candidates list when you register (and immediately removed if you unregister).</li>
        <li>Other contributors will be able to vote for you.</li>
        <li>You can update your description at any time.</li>
        <li>You can register and unregister as many times as you wish.</li>
        <li>Make sure to include information on how people can get money to you in the description, or include a link to a page that does.</li>
        <li>Once you are receiving enough funding to survive, unregister so that others can get the financial assistance they need.</li>
      </ul>
      <p />

      <p /><h4>Voting</h4>
      Any contributor to the Bitcoin GitHub repository can vote. Simply sign in and click on your favorite candidate in the list.
      <p />
      <ul>
        <li>Every contributor gets one vote.</li>
        <li>You can vote for any candidate, including yourself.</li>
        <li>Your vote is private. No one will ever know who you voted for.</li>
        <li>You can change your vote at any time, and as many times as you wish.</li>
      </ul>

      <p />
      <b><i>Note on Anonymous Contributors</i></b>
      <p />Anonymous contributors didn't associate their GitHub profile with their contribution. They only provided an email address.
      In order for the contributor to be verified, you must make the email address in your contribution the public email address in your GitHub profile.
      Otherwise, there is no way to verify that you made a contribution.

      <p />
      <i>Note - After you make the email public, it can take up to 24 hours before the changes make their way to the Bitcoin Bootstrap database.</i>

      <p /><b>Why can't I sign in?</b>
      <p />Only contributors to the Bitcoin repository are allowed to sign in to register and vote.

      <p /><b>I'm a contributor, why can't I sign in?</b>
      <p />If you are a contributor and can't sign in, it's because of a limitation in GitHub's API.
      GitHub's API only returns full information for the first 500 contributors to a repository, sorted by number of contributions highest to lowest.
      If you've made more than one contribution, you'll be included in the first 500 contributors.
      But if you've only made one contribution, you may not be included in the first 500.
      The remaining contributors are treated like the anonymous contributors described above, and only the email address associated with the contribution is returned.
      In this case, it is necessary that you follow the same steps as an anonymous contributor and make the email address in your contribution the public email address in you GitHub profile.
    </div>
  );
}

export default LearnMorePage;
