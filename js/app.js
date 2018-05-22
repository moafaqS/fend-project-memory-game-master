/*
 * Create a list that holds all of your cards
 */


var listOfcards = ["fa fa-diamond" , "fa fa-paper-plane-o" , "fa fa-anchor" , "fa fa-bolt" ,"fa fa-cube" , "fa fa-anchor" , "fa fa-leaf" , "fa fa-bicycle" ,  "fa fa-diamond" , "fa fa-bomb" , "fa fa-leaf" , "fa fa-bomb" , "fa fa-bolt" ,"fa fa-bicycle" , "fa fa-paper-plane-o" , "fa fa-cube"  ];

var opencards = [];      // array save card classes such as fa fa-diamond
var indexOfcards = [];   // array save the card objects 
var numberOfmatch = 0;   // if it reach 8 , the game is ended  
var move = 0 ;           // number of move
var TimeInsecond = 0;    // time take by a user to finish the game


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */






// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function startGame(){
    
    shuffle(listOfcards);

    var deck = document.getElementsByClassName("deck")[0];
    for(var i = 0 ; i < listOfcards.length  ; i++)
	{
		deck.getElementsByClassName("card")[i].getElementsByTagName("i")[0].setAttribute("class" , listOfcards[i]);  
	}
    
    
    time(); // set the timer;
    
}

var notClick = 1;

function showCard(){
    $(".card").click(function(){
        $(this).addClass("open show");
        var index = ($(this).index()); // index of cards 
        var nameOfcard = document.getElementsByClassName("card")[index].getElementsByTagName("i")[0].getAttribute("class"); // get card name 
        
      
         
        
       if(!$(this).hasClass("clicked"))  // this to avoid click on same card twice 
           {
             $(this).addClass("clicked");
             checkMatch(nameOfcard ,$(this)); 
           }
     
   
   
       
      
        
       
    });
    
}





var disable = false; 
function checkMatch(cardName , card) {
    opencards.push(cardName);
    indexOfcards.push(card);
    
    
    
    if(opencards.length == 2)
        {
           
            $(card).removeClass("clicked");
            $(indexOfcards[0]).removeClass("clicked");
            
            if(opencards[0] == cardName)  // if the cards match 
                {
                   match(indexOfcards[0],card);
                   numberOfmatch++;                 // number tells how many pairs of matched cards
                }
            else{
                 
                
                   notMatch(indexOfcards[0],card);
                
                  
            }
        }
    
     disable = false;
    
    updateCounter();
    rate();
    checkComplete(numberOfmatch);

            
    
        
    
}

function match(card1,card2){
    $(card1).removeClass("open show");
    $(card2).removeClass("open show");
    
    $(card1).addClass("match");
    $(card2).addClass("match");
    
   
     while(opencards.length != 0)  // empty the array of opends cards
        {
            opencards.pop();
            indexOfcards.pop();
        } 
}



function updateCounter()       // function to count number of move
{
   move++; 
    
    document.getElementsByClassName("moves")[0].innerHTML = move;
   
}

function checkComplete(x)       // x = numberOfmatch   
{
       
    $(document).ready(function(){
    if(x == 8)
        {
            document.getElementById("nmove").innerHTML = move;
            document.getElementById("finishTime").innerHTML = TimeInsecond;
            var Star = document.getElementById("nstars");
            
            
            // this code for specify the how many starts 
            if(move < 15)
                {
                      Star.innerHTML = 3;
                }
             
            else if( 15 <= move && move < 25)
                {
                      Star.innerHTML = 2;
                }
            else 
                {
                    Star.innerHTML  = 1 ;
                }
            
          
            endgame = true;
             $("#myModal").modal();
            
             $("#divTime").empty();  // stop timer .
            
        }
       
   
});
  
    
  
}



function notMatch(card1,card2)
{
    
   
   
    while(opencards.length != 0)
        {
            opencards.pop();
            indexOfcards.pop();
            
        }
    
    
                $(card1).removeClass("open show");
                $(card2).removeClass("open show");
    
                 $(card1).addClass("Notmatch");
                 $(card2).addClass("Notmatch");
                
      
    setTimeout(function(){$(card1).removeClass("Notmatch");
                 $(card2).removeClass("Notmatch");} , 700)
              
}

function reseat() {
    location.reload();
}


// this function for rate the user performance 
function rate(){
    var stars = document.getElementsByClassName("stars")[0].getElementsByTagName("li");

    
   if(move == 15)
       {
         stars[0].setAttribute("style" , "display:none");
       }
        
    else if(move == 25)
        {
         stars[1].setAttribute("style" , "display:none");
}
    
        
    
    
            
    
   
}

function time()  
{
   
            var myVar = setInterval(function() {
              myTimer();
            }, 1000);

     
 
}




function myTimer() {
  document.getElementById("timer").innerHTML = "Timer : " + TimeInsecond++ + " s ";
	
	

}

 showCard(); // function to display card if it is clicked
 
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one) -- 
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) -- 
 *  - if the list already has another card, check to see if the two cards match -- 
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)--
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from --this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one) -- 
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)--
 */
