export default class Bubble {
  constructor(s, pos, color, growthRate) {
    this.pos = pos;
    this.r = 0;
    this.isGrowing = true;
    this.color = color;
    this.s = s;
    this.growthRate = growthRate;
  }

  grow() {
    if (this.isGrowing) {
      this.r += this.growthRate;
    }
  }

  hits(other, maxDistance = 0) {
    return this.pos.dist(other.pos) - maxDistance < this.r + other.r;
  }

  hitsAny(others, maxDistance = 0) {
    for (let i = 0; i < others.length; ++i) {
      if (others[i] === this) {
        continue;
      }

      if (this.hits(others[i], maxDistance)) {
        return true;
      }
    }

    return false;
  }

  draw() {
    const s = this.s;
    s.fill(this.color);
    s.noStroke();
    s.ellipse(this.pos.x, this.pos.y, this.r);
  }
}
