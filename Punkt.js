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

            this.createWall();
        }

        createWall(){
            if(random(1) < 0.3)
                this.sciana = true;
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