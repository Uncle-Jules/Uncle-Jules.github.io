class Box {
  constructor(x, y, w, h, c) {
    let options = {
      friction: 1,
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.c = c;
    World.add(world, this.body);

    this.isOffScreen = function() {
      let pos = this.body.position;
      return (
        pos.y > window.innerHeight + 50 ||
        pos.y < 0 - 50 || 
        pos.x > window.innerWidth + 50 || 
        pos.x < 0 -50
      )
    }

    this.removeFromWorld = function() {
      World.remove(world, this.body)
    }

    this.scale = function() {
      this.w = this.w * 1.005
      this.h = this.h * 1.005
    }

    this.show = function () {
      let pos = this.body.position;
      let angle = this.body.angle;

      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER)
      fill(this.c)
      noStroke()
      rect(0, 0, this.w, this.h);
      pop();
    };
  }
}