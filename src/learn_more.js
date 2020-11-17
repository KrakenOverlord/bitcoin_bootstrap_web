import React from 'react'

function LearnMore(props) {
  return(
    <>
    <h3>Introduction</h3>
    <span>
      So you want to give back to the Bitcoin community by helping to fund a Bitcoin developer. But which one? Which ones are looking for help? Which ones are doing good work?
      Unless you are already a Bitcoin developer familiar with the technology and working in the trenches it can be hard to figure out who you should help.
      <p />
      <p>But who knows this information better than other Bitcoin developers? This website leverages the knowledge of Bitcoin developers to asertain who is doing good work and deserves financial help.</p>
    </span>

    <p />

    <h3>Voting</h3>
    <span>
      To vote, simply sign in and click on your favorite candidate in the list.
      Candidates are displayed in the voting list from highest number of votes to lowest.
      <p />
      <b>Full Rules</b>
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
      <li>You can unregister at any time, and reregister as many times as you wish.</li>
      <li>Once you are receiving enough funding to survive, unregister so that others can get the financial assistance they need.</li>
      </ul>

      <b>If you Unregister</b>
      <ul>
      <li>You will be immediately removed from the candidates list.</li>
      <li>You can reregister at any time.</li>
      <li>You can register and unregister as many times as you wish.</li>
      </ul>

      <p />
      <b>Note on Anonymous Contributors</b>

      <p>
      In order for an anonymous contributor to be verified, the email address associated with your anonymous contribution must match a public email address in your GitHub profile. Otherwise, there is no way to verify that you made a contribution.
      </p>

      </span>
    </>
  );
}

export default LearnMore;
