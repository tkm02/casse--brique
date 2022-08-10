const canvas = document.querySelector('canvas');
const ctx    = canvas.getContext("2d");
const affichage = document.querySelector('.score');

const barreWidht = 75, barreHeight =10,rayonBalle=10,
nbColum = 8, nbLigne =5,largeurBrique=75,hauteurBrique=20;

let x = canvas.width/2, y = canvas.height -30,
barreX = (canvas.width -barreWidht)/2,fin=false,
vitesseX = 5, vitesseY = -5,score=0;


// console.log(x,y);
function dessineBalle(){

    ctx.beginPath();
    ctx.arc(x,y,rayonBalle,0,Math.PI*2)
    ctx.fillStyle ='#fff';
    ctx.fill();
    ctx.closePath();

}


function dessineBarre(){

    ctx.beginPath();
    ctx.rect(barreX,canvas.height-barreHeight-2,barreWidht,barreHeight);
    ctx.fillStyle='#fff';
    ctx.fill();
    ctx.closePath();

}

const tabBrique =[];

for (let i = 0; i < nbLigne; i++) {

   tabBrique[i]=[]
   for (let j = 0; j < nbColum; j++) {
    
    tabBrique[i][j]={x:0,y:0,statut:1}
    
   }
    
}

function dessineBrique(){
    for (let i = 0; i < nbLigne; i++) {
        for (let j = 0; j < nbColum; j++) {
            
            if (tabBrique[i][j].statut === 1) {
                
                let briqueX = (j * (largeurBrique +10 ) + 35);
                let briqueY = (i * (hauteurBrique +10) + 30);

                tabBrique[i][j].x = briqueX;
                tabBrique[i][j].y = briqueY;

                ctx.beginPath();
                ctx.rect(briqueX,briqueY,largeurBrique,hauteurBrique);
                ctx.fillStyle ='#fff';
                ctx.fill();
                ctx.closePath();
            }
            
        }
        
    }
}

function dessine(){

    if (fin === false) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        dessineBrique();
        dessineBalle();
        dessineBarre();
        collisionDetection();


        if (x + vitesseX > canvas.width -rayonBalle || x + vitesseX < rayonBalle) {
            vitesseX = -vitesseX;
        }
        else if (y + vitesseY < rayonBalle) {
            vitesseY = -vitesseY;
        }
        else if (y + vitesseY > canvas.height - rayonBalle ) {
            if (x > barreX && x < barreX + barreWidht) {
                vitesseX += 0.2;
                vitesseY += 0.2; 
                vitesseY = -vitesseY;
            }
            else{
                fin = true;
                affichage.innerHTML = `Perdu! <br> cliquez sur le casse brique pour recommencer.`
            }
        }

        x += vitesseX;
        y += vitesseY;
        requestAnimationFrame(dessine)
    }
}


dessine();

function collisionDetection(){

    for (let i = 0; i < nbLigne; i++) {
        for (let j = 0; j < nbColum; j++) {
            
            let b = tabBrique[i][j];
            // console.log(b);
            if (b.statut === 1) {
            
                if (x > b.x && x < b.x + largeurBrique && y > b.y && y < b.y + hauteurBrique) {
                   
                    vitesseY = - vitesseY;
                    b.statut = 0;


                    score ++;
                    affichage.innerHTML = `Score : ${score}`;

                    if (score === nbLigne * nbColum) {
                        setTimeout(()=>{
                            fin = true;  

                        },1000)
                        affichage.innerHTML = `Bravo <br> cliquez sur le casse brique pour recommencer.` ;

                    }
                }
            }
            
        }
        
    }
}

document.addEventListener('mousemove',mouvementSouris);

function mouvementSouris(e){
    let posXBarreCanvas = e.clientX - canvas.offsetLeft;
   
    if (posXBarreCanvas > 35 && posXBarreCanvas < canvas.width - 35) {
        barreX = posXBarreCanvas - barreWidht/2;
    }
    
}

canvas.addEventListener('click',()=>{
    if (fin === true) {
        fin = false;
        document.location.reload();
    }
})

