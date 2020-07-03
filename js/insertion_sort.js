var canvas;
var values = [];
var state = [];
let slider;
let w;
let size;
let bg;
let v;
let btn1;
let btn2;
let value,hole;
function setup(){
    canvas = createCanvas(1250,650);
    canvas.position(245,10);
    bg = color(0);
    slider = createSlider(1,100,10);
    slider.style('-webkit-appearance','none');
    slider.style('height','30px');
    slider.style('width','300px');
    slider.style('background-color','#347bcc');
    slider.style('transform','rotate(-90deg)');
    slider.style('cursor','pointer');
    slider.style('border-radius','15px');
    slider.style('position','absolute');
    slider.style('bottom','550px');
    slider.style('right','1350px');
    btn1 = createButton("Generate Array");
    btn1.style('width','100px');
    btn1.style('height','300px');
    btn1.style('border','none');
    btn1.style('border-radius','15px');
    btn1.style('position','absolute');
    btn1.style('bottom','415px');
    btn1.style('left','75px');
    btn1.style('color','white');
    btn1.style('font-weight','bold');
    btn1.style('font-size','large');
    btn1.style('font-family',"'Courier New',Courier,monospace");
    btn1.style('background-color','#347bcc');
    btn1.mousePressed(setArray);
    btn2 = createButton("Visualize!!");
    btn2.style('width','165px');
    btn2.style('height','310px');
    btn2.style('border','none');
    btn2.style('border-radius','15px');
    btn2.style('position','absolute');
    btn2.style('bottom','10px');
    btn2.style('left','15px');
    btn2.style('color','white');
    btn2.style('font-weight','bold');
    btn2.style('font-size','large');
    btn2.style('font-family',"'Courier New',Courier,monospace");
    btn2.style('background-color','#347bcc');
    btn2.mousePressed(insertionSort);
    
}
var mspeed = 100/slider.value();
function setArray(){
    background(255);
    size = slider.value()*10;
    w = width/size;
    values = new Array(floor(size));
    for(let i=0;i<values.length;i++){
        values[i]=Math.random()*height;
        state[i]=-1;
    }
}
/*var myPromise =new Promise(function(resolve,reject){
    setTimeout(resolve,1000);
});*/
/*async function moveit(){
    await myPromise;
    while(hole>0 && values[hole-1] > value){
        values[hole] = values[hole-1];
        hole = hole-1;
    }
}*/
/*function changeColor(){
    bg = color(floor(Math.random()*255));
}*/
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function insertionSort(){
    var n = values.length;
    for(let i=1;i<n;i++){
        hole = i;
        value = values[i];
        state[hole]=1;
        while(hole > 0 && values[hole-1] > value){
            await sleep(1);
            values[hole] = values[hole-1];
            state[hole]=-1;
            hole = hole - 1;
            state[hole]=1;
        }
        state[hole]=-1;
        values[hole] = value;
        state[i] = -1;
    }
    for(let i=0;i<values.length;i++){
        state[i]=0;
    }
}

function draw(){
    background(255);
    for(let i=0;i<values.length;i++){
        if(state[i]==-1){
            fill(255);
        }
        else if(state[i]==1){
            fill('#eb1a1a');
        }
        else if(state[i]==0){
            fill('#90ee90');
        }
        rect(i*w,height-values[i],w,values[i]);
        if(i==values.length){
            return;
        }
    }
    
}





