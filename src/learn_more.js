import React from 'react'

function LearnMore(props) {
  return(
    <>
    <h3 className='mt-3'>Introduction</h3>
    <span>
    Starting with Satoshi Nakamoto, Bitcoin was originally built and maintained by unpaid volunteers who envisioned a better world.

    Over the years, some of these developers got jobs that pay them to work on bitcoin full-time,
    but most continue as unpaid volunteers.

    Many people recognize the benefits Bitcoin has given them, and would like to give back to the community by financially helping one of these Bitcoin developers.

    But which one? Which ones are looking for help? Which ones are doing good work?

      Unless you are already a developer familiar with the technology and working in the trenches, it can be hard to figure out the right person to support.
      <p />
      <p>But who knows this information better than Bitcoin developers?
      This website leverages the knowledge of Bitcoin developers to bring visibility to the developers doing good work and deserving of financial help.</p>
    </span>

    <p />

    <h3>Voting</h3>
    <span>
      Any contributor to the Bitcoin GitHub repository can vote. Simply sign in and click on your favorite candidate in the list.
      Candidates are displayed in the list from highest number of votes at the top, to lowest number of votes at the bottom.
      <p />
      <ul>
      <li>Every contributor gets one vote.</li>
      <li>You can vote for any candidate, including yourself.</li>
      <li>Your vote is private. No one will ever know who you voted for.</li>
      <li>You can change your vote at any time, and as many times as you wish.</li>
      </ul>
    </span>

    <p />

    <h3>Registration</h3>
    <span>
      Any contributor to the Bitcoin GitHub repository can register to be listed. Just sign in using GitHub, enter a brief description on why you should receive funding, and hit the register button.
      You willl be immediately listed and publicly viewable. It's really that simple.
      <p />
      <p>Make sure to include information on how people can get money to you in the description, or include a link to a page that does.</p>
      <p />
      <b>If you Register</b>
      <ul>
      <li>You will be immediately added to the candidates list.</li>
      <li>Other contributors will be able to vote for you.</li>
      <li>You can update your description at any time.</li>
      <li>You can unregister at any time.</li>
      <li>You can register and unregister as many times as you wish.</li>
      <li>Once you are receiving enough funding to survive, unregister so that others can get the financial assistance they need.</li>
      </ul>

      <b>If you Unregister</b>
      <ul>
      <li>You will be immediately removed from the candidates list.</li>
      <li>You can reregister at any time.</li>
      <li>You can register and unregister as many times as you wish.</li>
      </ul>

      <p />

      <img
        src='anonymous.png'
        alt=""
        height="64"
        width="64" />
      <b><i>Note on Anonymous Contributors</i></b>

      <p>
      In order for an anonymous contributor to be verified as a contributor, the email address associated with your anonymous contribution must match a public email address in your GitHub profile. Otherwise, there is no way to verify that you made a contribution.
      </p>

      </span>
    </>
  );
}

export default LearnMore;
