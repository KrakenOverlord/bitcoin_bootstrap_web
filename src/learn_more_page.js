import React from 'react'

function LearnMorePage(props) {
  return(
    <>
    <h3 className='mt-3'>Introduction</h3>

    <b>Bitcoin was built by Volunteers</b>
    <p />Starting with Satoshi Nakamoto, Bitcoin was built by volunteers who envisioned a better world with self sovereign banking.
    Many of these volunteers worked on Bitcoin in their free time while holding a full or part-time job. Some even worked on it while living off their savings.
    Eventually, some found jobs that pay them to work on Bitcoin, but most continue unpaid.

    <p /><b>The Problem</b>
    <p />Many people recognize the contributions of these selfless workers, and would like to give back to the community by financially helping one of these unpaid Bitcoin developers.
    But which one? Which ones are looking for help? Which ones are doing good work?
    Unless you are a Bitcoin developer familiar with the technology and working in the trenches, it is hard to know which individuals are most deserving of help.

    <p /><b>The Solution</b>
    <p />But Bitcoin developers <i>are</i> familiar with the technology and <i>are</i> working in the trenches.
    They already know who is doing good work and who is most deserving of help.
    We just need to bring that knowledge to the surface in an accessible way.
    To do that, contributors to Bitcoin core can register on this website to be placed on a list of candidates seeking financial help.
    Then other contributors can vote on them. In this way, the most eligible developers will rise to the top, as ranked by other developers.
    This publicly viewable list can then be used by patrons researching who to fund.

    <p /><h3>Voting</h3>
    <span>
      Any contributor to the Bitcoin GitHub repository can vote. Simply sign in and click on your favorite candidate in the list.
      Candidates are displayed in the list from highest number of votes at the top to lowest number of votes at the bottom.
      <p />
      <ul>
      <li>Every contributor gets one vote.</li>
      <li>You can vote for any candidate, including yourself.</li>
      <li>Your vote is private. No one will ever know who you voted for.</li>
      <li>You can change your vote at any time, and as many times as you wish.</li>
      </ul>
    </span>

    <p />

    Why Can't I sign in?
    If you are a contributor and can't sign in, it's due to a limitiation in the GitHub API. But don't worry, there is a fix. there is , only the first 500 contributors to a repository, sorts them by the number of commits per contributor in descending order, is returned.
    The remaining contributors are treated like the anonymous contributors above, and only the email address associated with the contribution is returned.
    If you have made more than 1 contribution, you'll be in the first 500 returned with a username. But if you've only made one contribution, you may have been returned as an anonymous contributor.
    In this case, it is necessary that the public email address in your GitHub profile match the email address in the contribution.
    Then we can find your profile and obtain your username to match against your username when you sign in. Othwerwise we have no way to match you to a contribution.

    <h3>RegistrationPage</h3>
    <span>
      Any contributor to the Bitcoin GitHub repository can register to be listed. Just sign in, enter a brief description on why you should receive funding, and hit the register button.
      You willl be immediately listed and publicly viewable. It's really that simple.
      <p />
      <p>Make sure to include information on how people can get money to you in the description, or include a link to a page that does.</p>
      <p />
      <ul>
      <li>You will be immediately added to the candidates list when you register.</li>
      <li>You will be immediately removed from the candidates list if you unregister.</li>
      <li>Other contributors will be able to vote for you.</li>
      <li>You can update your description at any time.</li>
      <li>You can register and unregister as many times as you wish.</li>
      <li>Once you are receiving enough funding to survive, unregister so that others can get the financial assistance they need.</li>
      </ul>
      <p />

      <img
        src='anon-contributor.png'
        alt=""
        height="64"
        width="64" />
      <b><i>Note on Anonymous Contributors</i></b>
      There are two kinds of anonymous contributors:

      1. Contributors that didn't associate their GitHub profile with the contribution. They only provided an email.
      In this case, for the contributor to be verified, the email address associated with your anonymous contribution must match a public email address in your GitHub profile.
      Otherwise, there is no way to verify that you made a contribution.
      </span>

      <p />
      If you make your email public, it can take up to 24 hours before the changes make their way to the Bitcoin Bootstrap database. So wait a day before trying to sign in.
    </>
  );
}

export default LearnMorePage;
