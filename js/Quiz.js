class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide()
    background("#ACDDDE");
    textSize(30)
    fill("purple")
    text("Result of the Quiz",250,50) 
    
    Contestant.getPlayerInfo()
  
    
    if(allContestants!=undefined){
      fill("black")
      var displayposition=280;
      textSize(20)
      fill("maroon")
      text("Note:- Contestants giving the correct answer are highlited in green letters.",60,250)
    }
    for(var plr in allContestants){
      var correctAns = "1";
      if(correctAns===allContestants[plr].answer)
      fill("green")
      else
      fill("red")
      displayposition+=20;
     textSize(20);
text(allContestants[plr].name + ": " + allContestants[plr].answer, 370, displayposition);
    }    
}}
