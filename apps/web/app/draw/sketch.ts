interface Sketch {
    x: number,
    y: number,
    w: number,
    h: number,
  }
  
export const sketch = (canvas:HTMLCanvasElement,sketchesList:Sketch[], socket:WebSocket,Id:number ) =>{
    if(!canvas){
        return;
    }
    const ctx = canvas.getContext("2d");
    if(!ctx){
        return;
    }
    // console.log("sklist",sketchesList)
    sketchesList?.map((f)=>{
return ctx.strokeRect(f.x,f.y,f.w,f.h);
    })
    let size = canvas.getBoundingClientRect(); 
    console.log(size);
    ctx.strokeStyle = "gray";
    let startX:number = 0;
    let startY:number = 0;
    let sketch = false;
    let height:number;
    let width:number;
    canvas?.addEventListener("mousedown",(e)=>{
        sketch = true;
        startX = e.clientX - size?.left!;
        startY = e.clientY - size?.top!;
    })
    canvas.addEventListener("mouseup",(e)=>{
        sketch = false;
        const data = JSON.stringify({x:startX,y:startY,w:width,h:height});
        socket.send(JSON.stringify({type:"sketch",message:data,roomId:Id}));
    })
    canvas.addEventListener("mousemove",(e)=>{
        if(sketch){
            let mouseX = e.clientX - size?.left!;
            let mouseY = e.clientY - size?.top!;
            height = mouseY - startY;
            width  =  mouseX - startX;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeRect(startX, startY, width, height);
            sketchesList?.map((f)=>{
                return ctx.strokeRect(f.x,f.y,f.w,f.h);
                    })
        }
    })
}