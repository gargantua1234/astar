let kolumny = 25;
let wiersze = 25;
let szachownica = new Array(kolumny);
let openSet = [];
let closedSet = [];
let start;
let koniec;
let w;
let h;
let sciezka =[];

class Punkt{
  
      constructor(i, j, szerokosc, wysokosc){
          this.i = i;
          this.j = j;
          this.szerokosc = szerokosc;
          this.wysokosc = wysokosc;
          this.f = 0;
          this.g = 0; 
          this.h = 0;
          this.sasiedzi = [];
          this.poprzedni = undefined;
          this.sciana = false;
          this.szukany = false;

          if( random(1) < 0.3){
            this.sciana = true;
          }
      }
  
      dodajSasiada(szahownica){
          let i = this.i;
          let j = this.j;
          
          if(i < kolumny -1)
            this.sasiedzi.push(szachownica[i+1][j]);
          if(i>0)
            this.sasiedzi.push(szachownica[i-1][j]);
          if(j<wiersze -1 )
            this.sasiedzi.push(szachownica[i][j+1]);
          if(j>0)
          this.sasiedzi.push(szachownica[i][j-1]);
      }
  
  
      pokaz(kolor){
          fill(kolor)
          if(this.sciana){
            fill(0);
          }
          if(this.szukany)
            fill(255, 255, 0);
          noStroke();
          rect(this.i*this.szerokosc, this.j*this.wysokosc, this.szerokosc-1, this.wysokosc-1);
      }
  
  
  }

function setup() {
  let cans = createCanvas(400, 400);
  let px = (windowWidth - width) / 2;
  let py = (windowHeight - height) / 2;
  cans.position(px, py);
  console.log('A*');
  w = width / kolumny;
  h = height / wiersze;
  utworzSzachownice();
  utworzPunkty();
  dodajSasiadow();
  stworzPoczatekKoniec();

  background(0);
}

function draw() {
  if(openSet.length > 0){
    let najnizszyIndex = 0;
    for(let i = 0; i<openSet.length; i++){
      if(openSet[i].f < openSet[najnizszyIndex].f)
        najnizszyIndex = i;
    }

    let obecny = openSet[najnizszyIndex];

    if(obecny === koniec){

      noLoop();
      console.log("Koniec"); 
    }

    usunZTablicy(openSet, obecny);
    closedSet.push(obecny);
    
    let sasiedzi = obecny.sasiedzi;
    for(let i = 0; i<sasiedzi.length; i++){
      let sasiad = sasiedzi[i];

      if(!closedSet.includes(sasiad) && !sasiad.sciana){
        let tempG = obecny.g +1 ;

        if(openSet.includes(sasiad)){
          if(tempG < sasiad.g){
            sasiad.g = tempG;
          }
        } else {
          sasiad.g = tempG;
          openSet.push(sasiad);
        }

        sasiad.h = heurystyka(sasiad, koniec);
        sasiad.f = sasiad.g+ sasiad.h; 
        sasiad.poprzedni = obecny;

      }

      
    }

    sciezka =[];
    let temp = obecny;
    sciezka.push(temp);
    while(temp.poprzedni){
      sciezka.push(temp.poprzedni)
      temp = temp.poprzedni;
    }

  } 
  else {
    console.log("Brak sciezki");
    noLoop();
  }

  pokazPunkty();
  przejzaneKolory();
  niePrzejazanekolory();  
  pokazSciezke();  
}
 
function utworzSzachownice(){
  for(let i=0; i<kolumny; i++){
    szachownica[i] = new Array(wiersze);
  }
}

function utworzPunkty(){

  for(let i= 0; i<kolumny; i++){
    for(let j = 0; j<wiersze; j++){
      szachownica[i][j] = new Punkt(i, j, w, h);
    }
  }
}

function stworzPoczatekKoniec(){
  start = szachownica[0][0];
  koniec = szachownica[kolumny-1][wiersze-1];
  start.sciana = false;
  koniec.sciana = false;
  koniec.szukany = true;

  openSet.push(start);
}

function pokazPunkty(){
  for(let i= 0; i<kolumny; i++){
    for(let j = 0; j<wiersze; j++){
      szachownica[i][j].pokaz(color(255));
    }
  }
}

function przejzaneKolory(){
  for(let i=0; i<closedSet.length; i++)
    closedSet[i].pokaz(color(255, 0, 0));
}

function niePrzejazanekolory(){
  for(let i =0; i<openSet.length; i++)
    openSet[i].pokaz(color(0, 255, 0));
}

function usunZTablicy(tablica, element){
  for(let i = tablica.length - 1; i>=0; i--){
    if(tablica[i] == element)
      tablica.splice(i, 1);
  }
}

function dodajSasiadow(){
  for(let i= 0; i<kolumny; i++){
    for(let j = 0; j<wiersze; j++){
      szachownica[i][j].dodajSasiada(szachownica);
    }
  }
}


//wykorzystana odleglosc manhattan
function heurystyka(a, b){
  let d = abs(a.i-b.i) + abs(a.j - b.j);
  return d;
}

function pokazSciezke(){
  for( let i = 0; i<sciezka.length; i++){
    sciezka[i].pokaz(color(0,0,255));
  }
}

