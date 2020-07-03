var btn = document.getElementById('gen');
var len = 0;
var width = 0;
var ar;
var sel = document.getElementById("sel_btn");
var ins = document.getElementById("ins_btn");
var bub = document.getElementById("bub_btn");
var mer = document.getElementById("mer_btn");
var qck = document.getElementById("qck_btn");
var x = document.getElementsByClassName("sort_btn");
var state;
var bg;
function setup(){
    canvas = createCanvas(1400,525);
    canvas.parent("canvas_holder");
    btn.onclick = function(){
        bg = Math.floor(Math.random()*16777215).toString(16);
        if(bg=='ffffff'){
            bg = Math.floor(Math.random()*16777215).toString(16);
        }
        len = document.getElementById("slider_id").value*5;
        width = canvas.width/len;
        ar = new Array(len);
        state = new Array(len);
        for(let i=0;i<len;i++){
            ar[i] = Math.floor(Math.random()*canvas.height);
            state[i] = -1;
        }
    }
}
sel.onclick = async function(){
    if(len != 0){
        
        for(let i=0;i<x.length;i++){
            x[i].disabled = true;
        }
        await selectionSort();
        for(let i=0;i<x.length;i++){
            x[i].disabled = false;
        }
    }
    else{
        alert("Generate Array to sort:)");
    }
}
ins.onclick = async function(){
    if(len != 0){
        for(let i=0;i<x.length;i++){
            x[i].disabled = true;
        }
        await insertionSort();
        for(let i=0;i<x.length;i++){
            x[i].disabled = false;
        }
    }
    else{
        alert("Generate Array to sort:)");
    }
}
bub.onclick = async function(){
    if(len != 0){
        for(let i=0;i<x.length;i++){
            x[i].disabled = true;
        }
        await bubbleSort();
        for(let i=0;i<x.length;i++){
            x[i].disabled = false;
        }
    }
    else{
        alert("Generate Array to sort : )");
    }
}
mer.onclick = async function(){
    if(len != 0){
        for(let i=0;i<x.length;i++){
            x[i].disabled = true;
        }
        await mergeSort(ar,0,ar.length);
        for(let i=0;i<x.length;i++){
            x[i].disabled = false;
        }
    }
    else{
        alert("Generate Array to sort:)");
    }
    document.getElementById("grey_id").innerHTML = "";
    document.getElementById("black_id").innerHTML = "";
}
qck.onclick = async function(){
    if(len != 0){
        document.getElementById("grey_id").innerHTML = "sorted part";
        document.getElementById("black_id").innerHTML = "pivot value";
        for(let i=0;i<x.length;i++){
            x[i].disabled = true;
        }
        await quickSort(ar,0,ar.length-1);
        for(let i=0;i<x.length;i++){
            x[i].disabled = false;
        }
    }
    else{
        alert("Generate Array to sort:)");
    }
    document.getElementById("grey_id").innerHTML = "";
    document.getElementById("black_id").innerHTML = "";
}
async function bubbleSort(){
    document.getElementById("grey_id").innerHTML = "sorted part";
    document.getElementById("black_id").innerHTML = "maximum in unsorted part";
    var i,j;
    for(i=0;i<ar.length-1;i++){
        for(j=0;j<ar.length-1-i;j++){
            state[j] = 1;
            if(ar[j] > ar[j+1]){
                state[j]=-1;
                state[j+1] = 1;
                await swap(j+1,j);
            }
            state[j]=-1;
        }
        state[j]=0;
    }
    for(let i=0;i<ar.length;i++){
        state[i]=0;
    }
    document.getElementById("grey_id").innerHTML = "";
    document.getElementById("black_id").innerHTML = "";
}
async function selectionSort(){
    var imin;
    document.getElementById("grey_id").innerHTML = "sorted";
    document.getElementById("black_id").innerHTML = "minimum in unsorted";
    for(let i=0;i<ar.length;i++){
        imin = i;
        for(let j=i+1;j<ar.length;j++){
            if(ar[j] < ar[imin]){
                //state[imin] = -1;
                imin = j;
                //state[imin] = 1;
            }
        }
        state[imin] = 1;
        await sel_swap(imin,i);
        state[imin] = state[i];
        //state[imin] = -1;
        //state[i] = 0;
        state[i] = 0;
    }
    document.getElementById("grey_id").innerHTML = "";
    document.getElementById("black_id").innerHTML = "";
}
async function insertionSort(){
    var n = ar.length;
    document.getElementById("grey_id").innerHTML = "partially sorted array";
    document.getElementById("black_id").innerHTML = "Element to be inserted";
    for(let i=1;i<n;i++){
        hole = i;
        value = ar[i];
        state[hole]=1;
        while(hole > 0 && ar[hole-1] > value){
            await sleep(10);
            ar[hole] = ar[hole-1];
            state[hole]=0;
            hole = hole - 1;
            state[hole]=1;
        }
        state[hole]=0;
        ar[hole] = value;
        state[i] = 0;
    }
    for(let i=0;i<ar.length;i++){
        state[i]=0;
    }
    document.getElementById("grey_id").innerHTML = "";
    document.getElementById("black_id").innerHTML = "";
}
async function mergeSort(val,li,ri){
    document.getElementById("grey_id").innerHTML = "left sorted part";
    document.getElementById("black_id").innerHTML = "right sorted part";
    var n = ri -li;
    if(n < 2){
        return;
    }
    var mid = li + Math.round(n/2);
    /*for(let i=li;i<mid;i++){
        state[i] = 1;
    }
    for(let i=mid;i<ri;i++){
        state[i] = 0;
    }*/
    mergeSort(val,li,mid);
    mergeSort(val,mid,ri);
    await sleep(50);
    draw(val);
    merger(val,li,ri,mid);
    
}
async function merger(val,li,ri,mid){
    var result = [];
    var l = li;
    var r = mid;
    for(let i=li;i<mid;i++){
        state[i] = 1;
    }
    for(let i=mid;i<ri;i++){
        state[i] = 0;
    }
    while(l < mid && r < ri){
        if(val[l] <= val[r]){
            result.push(val[l++]);
        }
        else{
            result.push(val[r++]);
        }
    }
    while(l<mid){
        result.push(val[l++]);
    }
    while(r<ri){
        result.push(val[r++]);
    }
    for(let i=0;i<ri-li;i++){
        val[li+i] = result[i];
        state[i] = 0;
    }
}
async function quickSort(val,st,en){
    document.getElementById("grey_id").innerHTML = "sorted part";
    document.getElementById("black_id").innerHTML = "pivot value";
    if(st < en){
        let ipivot = await partitions(val,st,en);
        quickSort(val,st,ipivot-1);
        quickSort(val,ipivot+1,en);
        
    }
}
async function partitions(val,st,en){
    document.getElementById("grey_id").innerHTML = "sorted part";
    document.getElementById("black_id").innerHTML = "pivot value";
    let ipivot = st;
    state[ipivot] = 1;
    let pivot = val[en];
    state[en] = 2;
    for(let i=st;i<en;i++){
        if(val[i] < pivot){
            await qck_swap(i,ipivot);
            state[ipivot] = 0;
            ipivot++;
            state[ipivot] = 1;
        }
    }
    state[ipivot] = 0;
    await qck_swap(ipivot,en);
    state[en] = 0;
    return ipivot;
   
}
async function swap(imin,i){
    await sleep(0.0001);
    var temp = ar[imin];
    ar[imin] = ar[i];
    ar[i] = temp;
}
async function qck_swap(imin,i){
    await sleep(10);
    var temp = ar[imin];
    ar[imin] = ar[i];
    ar[i] = temp;
}
async function sel_swap(imin,i){
    await sleep(100);
    var temp = ar[imin];
    ar[imin] = ar[i];
    ar[i] = temp;
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
function draw(){
    background(255);
    for(let i=0;i<len;i++){
        rect(i*width,0,width,ar[i]);
        if(state[i]==-1){
            fill('#'+bg);
        }
        else if(state[i]==1){
            fill(0);
        }
        else if(state[i]==0){
            fill("#20334e");
        }
        if(bg!="ffffff"){
            noStroke();
        }
    }
}