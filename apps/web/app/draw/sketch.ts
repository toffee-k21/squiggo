export const sketch = (canvas:HTMLCanvasElement ) =>{
    const ctx = canvas?.getContext("2d");
    if(!ctx){
        return;
    }
    let size = canvas?.getBoundingClientRect(); 
    console.log(size);
    ctx.strokeStyle = "gray";
    let startX:number = 0;
    let startY:number = 0;
    let sketch = false;
    canvas?.addEventListener("mousedown",(e)=>{
        sketch = true;
        startX = e.clientX - size?.left!;
        startY = e.clientY - size?.top!;
    })
    canvas?.addEventListener("mouseup",(e)=>{
        sketch = false;
    })
    canvas?.addEventListener("mousemove",(e)=>{
        if(sketch){
            let mouseX = e.clientX - size?.left!;
            let mouseY = e.clientY - size?.top!;
            let height = mouseY - startY;
            let width  =  mouseX - startX;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeRect(startX, startY, width, height)
        }
    })
}