const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")
let direction = "right"
let shapes = []
let clockSpeed = 0.0625;
let clockSize = 1;
let score = 0;
let lastTime;
let requiredElapsed = 1000/100;

for(let i = 0; i < 20; i++) {
  let newShape = {
    x: 9.9375 + (10.5 * i), 
    y: 9.9375 + (10.5 * i), 
    color: `rgb(${200 - (i * 10)}, ${200 - (i * 10)}, ${200 - (i * 10)})`, 
    size: +parseFloat(clockSize - (100 * (i + 1) / 2000)).toFixed(2), 
    speed: clockSpeed * (i) + clockSpeed
  }

  shapes.push(newShape)
}

setup();

// Functions

function setup() {
  shapes.forEach(shape => {
    ctx.fillStyle = shape.color;
    ctx.fillRect(0, 0, canvas.width * shape.size, canvas.height * shape.size)
  }) 

  transformShapes()
}

function transformShapes(now) {
  requestAnimationFrame(transformShapes)

  if(!lastTime) {
    lastTime=now;
  }

  const elapsed = now - lastTime;

  if(elapsed > requiredElapsed){
    ctx.fillStyle = "rgb(200,200,200)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  
    shapes.forEach(shape => {
      transformShape(shape);
    })
    lastTime=now;
  }
}

function transformShape(shape) {

  switch(direction) {
    case "right":
      shape.x += shape.speed;
      ctx.fillStyle = shape.color;
      ctx.fillRect(shape.x, shape.y, canvas.width * shape.size, canvas.height * shape.size);
      if(shapes[0].x > canvas.width / 24) {
        direction = "down"
      }
      break;
    case "down":
      shape.y += shape.speed;
      ctx.fillStyle = shape.color;
      ctx.fillRect(shape.x, shape.y, canvas.width * shape.size, canvas.height * shape.size);
      if(shapes[0].y > canvas.height / 24) {
        direction = "left"
      }
      break;
    case "left":
      shape.x -= shape.speed;
      ctx.fillStyle = shape.color;
      ctx.fillRect(shape.x, shape.y, canvas.width * shape.size, canvas.height * shape.size);
      if(shapes[0].x < canvas.height / 110) {
        direction = "up"
      }
      break;
    case "up":
      shape.y -= shape.speed;
      ctx.fillStyle = shape.color;
      ctx.fillRect(shape.x, shape.y, canvas.width * shape.size, canvas.height * shape.size);
      if(shapes[0].y < canvas.height / 110) {
        direction = "right"
        score += 1
        document.getElementById("score").innerText = `${score} ̶̨̖̓̍v̸̘͕̀͘o̴̲̺͆̍ị̵̡̛͌ḑ̵͎͐̏s̷̨͎̄͛ḙ̵̛̦̇c̶͔̲̃́o̶̯̽̑ͅn̴̟͈͆̏ḓ̵̣̀͗s̷̲̗̍̏`
      }
      break;
  }
}

window.addEventListener("load", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})
