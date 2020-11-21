// setVotedFor(username) {
//   var contributor = {...this.state.contributor};
//   contributor.voted_for = username;
//   this.setState({contributor});
// }
//
// changeCandidate(newCandidateUsername) {
//   let candidates = [...this.state.candidates];
//
//   // Decrement old candidate if the contributor previously voted
//   if (this.state.contributor.voted_for !== '') {
//     const index = this.state.candidates.findIndex(candidate => candidate.username === this.state.contributor.voted_for);
//     const oldCandidate = this.state.candidates[index];
//     oldCandidate.votes = oldCandidate.votes - 1;
//     candidates[index] = oldCandidate;
//   }
//
//   // Increment new candidate
//   const index = this.state.candidates.findIndex(candidate => candidate.username === newCandidateUsername);
//   const newCandidate = this.state.candidates[index];
//   newCandidate.votes = newCandidate.votes + 1;
//   candidates[index] = newCandidate;
//
//   candidates.sort(function(a, b) { return b.votes - a.votes });
//
//   this.setState({candidates});
//
//   this.setVotedFor(newCandidateUsername);
// }
