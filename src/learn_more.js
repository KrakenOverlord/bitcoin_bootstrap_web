import React from 'react'
import Header from './header.js';

function LearnMore(props) {
  return(
    <>
    <Header contributor={props.contributor} />
    <span>
      Motivation
      So you've decided that you want to give back to the Bitcoin community and help fund a core developer. But which one? Which ones are looking for help? Which ones are doing good work?
      Unless you are already a Bitcoin developer familiar with the technology and working in the trenches it can be hard to figure out who you should help.

      Want to help fund a bitcoin developer but not sure who to help?
      Unless you are actively involved in Bitcoin development, it can be hard to figure out who is doing good work and deserves financial support.
      Who better to know who is doing good work and needs help than actual Bitcoin developers?

      Voting
      Every contributor to the Bitcoin GitHub repository gets one vote. You can vote for any candidate, including yourself, assuming you are registered.
      You can vote for a candidate.
      Your vote is confidential. No one will ever know who you voted for.
      You can change your vote at any time.
      You can change your vote as many times as you wish.
      You can vote for yourself if you registered.

      Registration
      Any contributor to the Bitcoin GitHub repository can register to be listed and receive funding. Just sign in using GitHub, enter a brief description on why you should receive funding, and hit the register button.
      You willl be immediately listed and publicly viewable. It's really that simple.
      <b>To Register</b>
      <p>Simply tell us why you should receive funding and press the "Register" button.</p>
      <p />
      <p>TIP - Include information on how people can get money to you either in the description below or on your GitHub profile page.</p>
      <p />
      <b>Once Registered</b>
      <ul>
      <li>You will be immediately added to the candidates list</li>
      <li>Other contributors will be able to vote for you</li>
      <li>You can unregister at any time and you will be immediately removed from the candidates list.</li>
      <li>You can update your description at any time.</li>
      <li>You can register and unregister as many times as you wish.</li>
      <li>Once you are receiving enough funding to survive, unregister so that others can get the financial assistance they need.</li>
      </ul>

      <b>Once Unregistered</b>
      <ul>
      <li>You will be immediately removed from the candidates list</li>
      <li>You can reregister at any time.</li>
      <li>You can register and unregister as many times as you wish.</li>
      </ul>

      Anonymous Contributors

      <p>
      If the email address on your anonymous contribution matches the current email address in your profile, and its public, then you can be verified as a contributor.
      </p>
      Names are different from usernames. user.name cannot be used to authenticate a contributor because names are not guaranteed to be unique.
      A non-contributor could change their name to the name of a contributor and then sign in.

      https://www.gitmask.com/
      When anonymouse contributors register, their username will be constructed as follows:

      username = contributor['login']
      username = contributor['email'] if username.nil?

      Does Bitcoin Bootstrap take a cut of the funding?
      Each candidate specifies how they wish to receive funding, for example, PayPal, GitHub Sponsors, bitcoin address, etc, and always remains in full control of their funding.
    </span>
    </>
  );
}

export default LearnMore;
