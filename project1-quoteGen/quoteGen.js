let quote= document.querySelector(".quote");
let author= document.querySelector(".author");
let btn= document.querySelector("#new-quote");

const quotes=[
  {quote:"Knowledge is power.",
author: "	Sir Francis Bacon"},
{quote:"You only live once, but if you do it right, once is enough",
author: "	Mae West"},
{quote:"Not how long, but how well you have lived is the main thing.",
author: "Seneca"},
{quote:"In order to write about life first you must live it.",
author: "	Hemingway"},
{quote:"Life is not a problem to be solved, but a reality to be experienced.",
author: "	Soren Kierkegaard"}
]

btn.addEventListener("click",function(){
  let random= Math.floor(Math.random()*quotes.length);
  quote.innerText=quotes[random].quote;
  author.innerText=quotes[random].author;
})