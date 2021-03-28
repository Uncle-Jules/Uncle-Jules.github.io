const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Event = Matter.Events,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

let engine;
let world;
let shapes = [];
let lines = [];
let canvas;
let ground;
let ceiling;
let wallLeft;
let wallRight;
let mouse;
let mConstraint;
let color;
let hold;
let shapeType = "square";
let mode = "spawn"

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight - 80)
  colorPicker = createColorPicker("#ffffff")

  colorPicker.elt.id = "color-picker"
  document.getElementById("colour").appendChild(colorPicker.elt)

  colorPicker.elt.style.marginRight = "15px"

  bgColorPicker = createColorPicker("#333333")

  bgColorPicker.elt.id = "bg-color-picker"
  document.getElementById("colour").appendChild(bgColorPicker.elt)

  engine = Engine.create();
  world = engine.world;
  Engine.run(engine)

  ground = new Boundary(canvas.width / 2, canvas.height, 3000, 30);
  ceiling = new Boundary(canvas.width / 2, 0, 3000, 30);
  wallLeft = new Boundary(0, canvas.width / 2, 30, 3000);
  wallRight = new Boundary(canvas.width, canvas.width / 2, 30, 3000);
  World.add(world, [ground, ceiling, wallLeft, wallRight]);

  mouse = Mouse.create(canvas.elt)
  mouse.pixelRatio = pixelDensity()
  mConstraint = MouseConstraint.create(engine, {
    mouse: mouse
  })
  World.add(world, mConstraint)
}

function mousePressed() {
  if (mouseButton === LEFT && mode === "spawn") {
    switch(shapeType) {
      case "square":
        let newBox = new Box(mouseX, mouseY, 40, 40, colorPicker.color())
        shapes.push(newBox)
        hold = setInterval(() => {
          Body.scale(newBox.body, 1.005, 1.005)
          newBox.scale()
        })
        break;
      case "circle":
        let newCircle = new Circle(mouseX, mouseY, 20, colorPicker.color())
        shapes.push(newCircle)
        hold = setInterval(() => {
          Body.scale(newCircle.body, 1.005, 1.005)
          newCircle.scale()
        })
        break;
      case "triangle":
        let newTriangle = new Triangle(mouseX, mouseY, 3, 20, colorPicker.color())
        shapes.push(newTriangle)
        hold = setInterval(() => {
          Body.scale(newTriangle.body, 1.005, 1.005)
          newTriangle.scale()
        })
        break;
      default:
        break;
    }
  } else {
    return;
  }
}

function mouseReleased() {
  clearInterval(hold)
}

function draw() {
  background(bgColorPicker.color());
  Engine.update(engine)
  shapes.forEach((el, i) => {
    el.show();
    if (el.isOffScreen()) {
      el.removeFromWorld()
      shapes.splice(i, 1)
    }
  })

  lines.forEach((newLine) => {
    stroke(newLine.color)
    line(newLine.mouseX, newLine.mouseY, newLine.pmouseX, newLine.pmouseY)
  })
  
  if(mouseIsPressed === true && mode === "draw") {
    let newLine = {
      mouseX: mouseX,
      mouseY: mouseY, 
      pmouseX: pmouseX, 
      pmouseY: pmouseY,
      color: colorPicker.color()

    }
    lines.push(newLine)
  }

  ground.show()
  ceiling.show()
  wallLeft.show()
  wallRight.show()
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight - 80)
  
  Body.setPosition(ground.body, {x: canvas.width / 2, y: canvas.height})
  Body.setPosition(ceiling.body, {x: canvas.width / 2, y: 0})
  Body.setPosition(wallLeft.body, {x: 0, y: canvas.height / 2})
  Body.setPosition(wallRight.body, {x: canvas.width, y: canvas.height / 2})
}

$("body").delegate("#shape-list li", "click", function (event) {
  $(this).addClass('active').siblings().removeClass('active');
  shapeType = event.target.id;
})

$("body").delegate("#mode-select", "change", function (event) {
  mode = $("#mode-select").val()
  if (mode === "drag" || mode === "spawn") {
    mConstraint.collisionFilter.group = 0
    mConstraint.collisionFilter.mask = 4294967295
    mConstraint.collisionFilter.category = 1
  } else {
    mConstraint.collisionFilter.group = -1
    mConstraint.collisionFilter.mask = 0
    mConstraint.collisionFilter.category = 2
  }
})

$("body").delegate("#clear", "click", function (event) {
  shapes.forEach((shape) => {
    World.remove(world, shape.body)
  })
  shapes = []
  lines = []
})

document.oncontextmenu = function() {
  return false;
}