import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

function Introduction(props) {
  console.log("---Introduction");
  console.log(props.color);
  return (
    <Jumbotron className="mt-3" style={{backgroundColor: props.color}}>
      <p><span style={{ fontSize: '20px', color: '#f2a900'}}>Bitcoin Bootstrap</span> helps answer the question, <i>which bitcoin developers deserve funding?</i></p>
      It does this using a system of voting by the people most knowledgeable about Bitcoin... the developers.
      <p className='mt-3'>
        <a href='https://github.com/bitcoin/bitcoin/graphs/contributors'
          target="_blank"
          rel="noopener noreferrer">Contributors</a>
        {' '}to the
        {' '}<a href='https://github.com/bitcoin/bitcoin'
          target="_blank"
          rel="noopener noreferrer">Bitcoin repository</a>
         {' '}can register to be listed here, and then other contributors can vote for them.
         And since contributors are usually the ones with the most knowledge and are in the trenches working on Bitcoin, they know which contributors are doing good work and deserve to be funded.
         Each vote represents the sum knowledge of a contributor. Through this system of voting, the best candidates will rise to the top.
      </p>

      {props.numCandidates === 0 &&
        <p>
          No contributor has registered yet. Be the first!
          Just sign in, enter a brief description about the work you are doing and why you should receive funding and hit the register button and you will be listed.
        </p>
      }

      <p>
        <Button href="#learn-more" variant="success" onClick={() => props.showPage('learnMorePage')}>Learn more</Button>
      </p>
    </Jumbotron>
  );
}

export default Introduction;
