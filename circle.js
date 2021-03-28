class Circle {
  constructor(x, y, r, c) {
    let options = {
      friction: 1,
    }
    this.body = Bodies.circle(x, y, r, options);
    this.r = r
    this.c = c
    World.add(world, this.body);

    this.isOffScreen = function() {
      let pos = this.body.position;
      return (
        pos.y > window.innerHeight + 50 ||
        pos.y < 0 - 50 || 
        pos.x > window.innerWidth + 50 || 
        pos.x < 0 - 50
      )
    }

    this.removeFromWorld = function() {
      World.remove(world, this.body)
    }

    this.scale = function() {
      this.r = this.r * 1.005
    }

    this.show = function () {
      let pos = this.body.position;
      let angle = this.body.angle;

      push();
      translate(pos.x, pos.y);
      rotate(angle);
      ellipseMode(CENTER)
      fill(this.c)
      noStroke()
      ellipse(0, 0, this.r * 2);
      pop();
    };
  }
}