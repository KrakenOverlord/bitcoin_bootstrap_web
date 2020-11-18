**TODO**
- #url handling is goofy in url bar
- setting api url correct?
- stress test get_candidates before and after on-demand
- axios post request should put params in hash
- what is the max URL parameter length? 1024?
- must not be able to vote while registration action taking place
- put encodeURIComponent on every get request (but not post requests)
- handle errors
- add google analytics
- test on multiple browsers
- get back button working for main screens
- determine best num chars for blurb
- figure out whitespace in blurb
- icon for browser title image
- get better bitcoin and github images
- what happens with a candidates votes when a candidate unregisters?
- disable login link after pressed
- success stories list after fully funded

**Create the App**

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- `npx create-react-app bitcoin_bootstrap_web`

**Dependencies**

- Github OAuth account
- `npm install axios`
- install React Bootstrap

- Create a Github repo for this app
- Connect Amplify to the Github repo
- Configure domain

`_67d959b18e055e7ce8fb89da5b2aaa50.bitcoinbootstrap.org. CNAME _dd815294d14bf421a6ac39d13da556de.zbkrxsrfvj.acm-validations.aws.`

- Configure API gateway

**Run the App**

`npm start`

**Production Version**

`npm run build`
