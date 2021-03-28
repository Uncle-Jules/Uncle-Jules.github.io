class Triangle {
  constructor(x, y, s, r, c) {
    let options = {
      friction: 1,
    }
    this.body = Bodies.polygon(x, y, s, r, options);
    this.s = s;
    this.r = r;
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
      this.r = this.r * 1.005
    }

    this.show = function () {
      push();
      fill(this.c)
      noStroke()
      triangle(
        this.body.vertices[0].x,
        this.body.vertices[0].y,
        this.body.vertices[1].x,
        this.body.vertices[1].y,
        this.body.vertices[2].x,
        this.body.vertices[2].y
      );
      pop();
    };
  }
}