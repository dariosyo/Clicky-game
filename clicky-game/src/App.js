import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import flowers from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.flowers to the cards json array
  state = {
    flowers,
    clickedFlowerId: [],
    score: 0,
    goal: 8,
    status: ""
  };

  //shuffle the pup cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedFlowerId = this.state.clickedFlowerId;

    if(clickedFlowerId.includes(id)){
      this.setState({ clickedFlowerId: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedFlowerId.push(id)

      if(clickedFlowerId.length === 8){
        this.setState({score: 8, status: "You Won! Great Job! Click to play again!", clickedFlowerId: []});
        console.log('You Win');
        return;
      }

      this.setState({ flowers, clickedFlowerId, score: clickedFlowerId.length, status: " " });

      for (let i = flowers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [flowers[i], flowers[j]] = [flowers[j], flowers[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clicky Game</h1>
          <p className="App-intro">
            Try not to click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={8}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.flowers.map(flower => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={flower.id}
              key={flower.id}
              image={flower.image}
            />
          ))}
        </Wrapper>
        
    </div>
    );
  }
}

export default App;