const Ft = "srgb", Si = "srgb-linear", yr = "linear", it = "srgb";
const ia = "300 es";
function ro(n) {
  for (let e = n.length - 1; e >= 0; --e)
    if (n[e] >= 65535) return !0;
  return !1;
}
function ki(n) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", n);
}
function sl() {
  const n = ki("canvas");
  return n.style.display = "block", n;
}
const ra = {};
function sa(...n) {
  const e = "THREE." + n.shift();
  console.log(e, ...n);
}
function Oe(...n) {
  const e = "THREE." + n.shift();
  console.warn(e, ...n);
}
function gt(...n) {
  const e = "THREE." + n.shift();
  console.error(e, ...n);
}
function Hi(...n) {
  const e = n.join(" ");
  e in ra || (ra[e] = !0, Oe(...n));
}
function al(n, e, t) {
  return new Promise(function(i, r) {
    function s() {
      switch (n.clientWaitSync(e, n.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case n.WAIT_FAILED:
          r();
          break;
        case n.TIMEOUT_EXPIRED:
          setTimeout(s, t);
          break;
        default:
          i();
      }
    }
    setTimeout(s, t);
  });
}
class Ei {
  /**
   * Adds the given event listener to the given event type.
   *
   * @param {string} type - The type of event to listen to.
   * @param {Function} listener - The function that gets called when the event is fired.
   */
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const i = this._listeners;
    i[e] === void 0 && (i[e] = []), i[e].indexOf(t) === -1 && i[e].push(t);
  }
  /**
   * Returns `true` if the given event listener has been added to the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to check.
   * @return {boolean} Whether the given event listener has been added to the given event type.
   */
  hasEventListener(e, t) {
    const i = this._listeners;
    return i === void 0 ? !1 : i[e] !== void 0 && i[e].indexOf(t) !== -1;
  }
  /**
   * Removes the given event listener from the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to remove.
   */
  removeEventListener(e, t) {
    const i = this._listeners;
    if (i === void 0) return;
    const r = i[e];
    if (r !== void 0) {
      const s = r.indexOf(t);
      s !== -1 && r.splice(s, 1);
    }
  }
  /**
   * Dispatches an event object.
   *
   * @param {Object} event - The event that gets fired.
   */
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const i = t[e.type];
    if (i !== void 0) {
      e.target = this;
      const r = i.slice(0);
      for (let s = 0, a = r.length; s < a; s++)
        r[s].call(this, e);
      e.target = null;
    }
  }
}
const Dt = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], zr = Math.PI / 180, vs = 180 / Math.PI;
function Xi() {
  const n = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0;
  return (Dt[n & 255] + Dt[n >> 8 & 255] + Dt[n >> 16 & 255] + Dt[n >> 24 & 255] + "-" + Dt[e & 255] + Dt[e >> 8 & 255] + "-" + Dt[e >> 16 & 15 | 64] + Dt[e >> 24 & 255] + "-" + Dt[t & 63 | 128] + Dt[t >> 8 & 255] + "-" + Dt[t >> 16 & 255] + Dt[t >> 24 & 255] + Dt[i & 255] + Dt[i >> 8 & 255] + Dt[i >> 16 & 255] + Dt[i >> 24 & 255]).toLowerCase();
}
function Ye(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function ol(n, e) {
  return (n % e + e) % e;
}
function Gr(n, e, t) {
  return (1 - t) * n + t * e;
}
function wi(n, e) {
  switch (e.constructor) {
    case Float32Array:
      return n;
    case Uint32Array:
      return n / 4294967295;
    case Uint16Array:
      return n / 65535;
    case Uint8Array:
      return n / 255;
    case Int32Array:
      return Math.max(n / 2147483647, -1);
    case Int16Array:
      return Math.max(n / 32767, -1);
    case Int8Array:
      return Math.max(n / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Bt(n, e) {
  switch (e.constructor) {
    case Float32Array:
      return n;
    case Uint32Array:
      return Math.round(n * 4294967295);
    case Uint16Array:
      return Math.round(n * 65535);
    case Uint8Array:
      return Math.round(n * 255);
    case Int32Array:
      return Math.round(n * 2147483647);
    case Int16Array:
      return Math.round(n * 32767);
    case Int8Array:
      return Math.round(n * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
class rt {
  /**
   * Constructs a new 2D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   */
  constructor(e = 0, t = 0) {
    rt.prototype.isVector2 = !0, this.x = e, this.y = t;
  }
  /**
   * Alias for {@link Vector2#x}.
   *
   * @type {number}
   */
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  /**
   * Alias for {@link Vector2#y}.
   *
   * @type {number}
   */
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @return {Vector2} A reference to this vector.
   */
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector2} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @param {number} value - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector2} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector2} v - The vector to copy.
   * @return {Vector2} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector2} v - The vector to add.
   * @return {Vector2} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector2} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector2} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector2} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector2} v - The vector to subtract.
   * @return {Vector2} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector2} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector2} v - The vector to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector2} v - The vector to divide.
   * @return {Vector2} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector2} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * Multiplies this vector (with an implicit 1 as the 3rd component) by
   * the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {Vector2} A reference to this vector.
   */
  applyMatrix3(e) {
    const t = this.x, i = this.y, r = e.elements;
    return this.x = r[0] * t + r[3] * i + r[6], this.y = r[1] * t + r[4] * i + r[7], this;
  }
  /**
   * If this vector's x or y value is greater than the given vector's x or y
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  /**
   * If this vector's x or y value is less than the given vector's x or y
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  /**
   * If this vector's x or y value is greater than the max vector's x or y
   * value, it is replaced by the corresponding value.
   * If this vector's x or y value is less than the min vector's x or y value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector2} min - The minimum x and y values.
   * @param {Vector2} max - The maximum x and y values in the desired range.
   * @return {Vector2} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = Ye(this.x, e.x, t.x), this.y = Ye(this.y, e.y, t.y), this;
  }
  /**
   * If this vector's x or y values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x or y values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = Ye(this.x, e, t), this.y = Ye(this.y, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampLength(e, t) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Ye(i, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector2} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x and y = -y.
   *
   * @return {Vector2} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the cross product with.
   * @return {number} The result of the cross product.
   */
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0) to (x, y). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0) to (x, y).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Computes the angle in radians of this vector with respect to the positive x-axis.
   *
   * @return {number} The angle in radians.
   */
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector2} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const i = this.dot(e) / t;
    return Math.acos(Ye(i, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector2} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(e) {
    const t = this.x - e.x, i = this.y - e.y;
    return t * t + i * i;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector2} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector2} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector2} v1 - The first vector.
   * @param {Vector2} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerpVectors(e, t, i) {
    return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector2} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]` and y
   * value to be `array[ offset + 1 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector2} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector2} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  /**
   * Rotates this vector around the given center by the given angle.
   *
   * @param {Vector2} center - The point around which to rotate.
   * @param {number} angle - The angle to rotate, in radians.
   * @return {Vector2} A reference to this vector.
   */
  rotateAround(e, t) {
    const i = Math.cos(t), r = Math.sin(t), s = this.x - e.x, a = this.y - e.y;
    return this.x = s * i - a * r + e.x, this.y = s * r + a * i + e.y, this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class qi {
  /**
   * Constructs a new quaternion.
   *
   * @param {number} [x=0] - The x value of this quaternion.
   * @param {number} [y=0] - The y value of this quaternion.
   * @param {number} [z=0] - The z value of this quaternion.
   * @param {number} [w=1] - The w value of this quaternion.
   */
  constructor(e = 0, t = 0, i = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = i, this._w = r;
  }
  /**
   * Interpolates between two quaternions via SLERP. This implementation assumes the
   * quaternion data are managed in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @param {number} t - The interpolation factor in the range `[0,1]`.
   * @see {@link Quaternion#slerp}
   */
  static slerpFlat(e, t, i, r, s, a, o) {
    let l = i[r + 0], c = i[r + 1], d = i[r + 2], u = i[r + 3], f = s[a + 0], p = s[a + 1], x = s[a + 2], v = s[a + 3];
    if (o <= 0) {
      e[t + 0] = l, e[t + 1] = c, e[t + 2] = d, e[t + 3] = u;
      return;
    }
    if (o >= 1) {
      e[t + 0] = f, e[t + 1] = p, e[t + 2] = x, e[t + 3] = v;
      return;
    }
    if (u !== v || l !== f || c !== p || d !== x) {
      let m = l * f + c * p + d * x + u * v;
      m < 0 && (f = -f, p = -p, x = -x, v = -v, m = -m);
      let h = 1 - o;
      if (m < 0.9995) {
        const T = Math.acos(m), E = Math.sin(T);
        h = Math.sin(h * T) / E, o = Math.sin(o * T) / E, l = l * h + f * o, c = c * h + p * o, d = d * h + x * o, u = u * h + v * o;
      } else {
        l = l * h + f * o, c = c * h + p * o, d = d * h + x * o, u = u * h + v * o;
        const T = 1 / Math.sqrt(l * l + c * c + d * d + u * u);
        l *= T, c *= T, d *= T, u *= T;
      }
    }
    e[t] = l, e[t + 1] = c, e[t + 2] = d, e[t + 3] = u;
  }
  /**
   * Multiplies two quaternions. This implementation assumes the quaternion data are managed
   * in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @return {Array<number>} The destination array.
   * @see {@link Quaternion#multiplyQuaternions}.
   */
  static multiplyQuaternionsFlat(e, t, i, r, s, a) {
    const o = i[r], l = i[r + 1], c = i[r + 2], d = i[r + 3], u = s[a], f = s[a + 1], p = s[a + 2], x = s[a + 3];
    return e[t] = o * x + d * u + l * p - c * f, e[t + 1] = l * x + d * f + c * u - o * p, e[t + 2] = c * x + d * p + o * f - l * u, e[t + 3] = d * x - o * u - l * f - c * p, e;
  }
  /**
   * The x value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  /**
   * The y value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  /**
   * The z value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  /**
   * The w value of this quaternion.
   *
   * @type {number}
   * @default 1
   */
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  /**
   * Sets the quaternion components.
   *
   * @param {number} x - The x value of this quaternion.
   * @param {number} y - The y value of this quaternion.
   * @param {number} z - The z value of this quaternion.
   * @param {number} w - The w value of this quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  set(e, t, i, r) {
    return this._x = e, this._y = t, this._z = i, this._w = r, this._onChangeCallback(), this;
  }
  /**
   * Returns a new quaternion with copied values from this instance.
   *
   * @return {Quaternion} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  /**
   * Copies the values of the given quaternion to this instance.
   *
   * @param {Quaternion} quaternion - The quaternion to copy.
   * @return {Quaternion} A reference to this quaternion.
   */
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the rotation specified by the given
   * Euler angles.
   *
   * @param {Euler} euler - The Euler angles.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromEuler(e, t = !0) {
    const i = e._x, r = e._y, s = e._z, a = e._order, o = Math.cos, l = Math.sin, c = o(i / 2), d = o(r / 2), u = o(s / 2), f = l(i / 2), p = l(r / 2), x = l(s / 2);
    switch (a) {
      case "XYZ":
        this._x = f * d * u + c * p * x, this._y = c * p * u - f * d * x, this._z = c * d * x + f * p * u, this._w = c * d * u - f * p * x;
        break;
      case "YXZ":
        this._x = f * d * u + c * p * x, this._y = c * p * u - f * d * x, this._z = c * d * x - f * p * u, this._w = c * d * u + f * p * x;
        break;
      case "ZXY":
        this._x = f * d * u - c * p * x, this._y = c * p * u + f * d * x, this._z = c * d * x + f * p * u, this._w = c * d * u - f * p * x;
        break;
      case "ZYX":
        this._x = f * d * u - c * p * x, this._y = c * p * u + f * d * x, this._z = c * d * x - f * p * u, this._w = c * d * u + f * p * x;
        break;
      case "YZX":
        this._x = f * d * u + c * p * x, this._y = c * p * u + f * d * x, this._z = c * d * x - f * p * u, this._w = c * d * u - f * p * x;
        break;
      case "XZY":
        this._x = f * d * u - c * p * x, this._y = c * p * u - f * d * x, this._z = c * d * x + f * p * u, this._w = c * d * u + f * p * x;
        break;
      default:
        Oe("Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given axis and angle.
   *
   * @param {Vector3} axis - The normalized axis.
   * @param {number} angle - The angle in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromAxisAngle(e, t) {
    const i = t / 2, r = Math.sin(i);
    return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(i), this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromRotationMatrix(e) {
    const t = e.elements, i = t[0], r = t[4], s = t[8], a = t[1], o = t[5], l = t[9], c = t[2], d = t[6], u = t[10], f = i + o + u;
    if (f > 0) {
      const p = 0.5 / Math.sqrt(f + 1);
      this._w = 0.25 / p, this._x = (d - l) * p, this._y = (s - c) * p, this._z = (a - r) * p;
    } else if (i > o && i > u) {
      const p = 2 * Math.sqrt(1 + i - o - u);
      this._w = (d - l) / p, this._x = 0.25 * p, this._y = (r + a) / p, this._z = (s + c) / p;
    } else if (o > u) {
      const p = 2 * Math.sqrt(1 + o - i - u);
      this._w = (s - c) / p, this._x = (r + a) / p, this._y = 0.25 * p, this._z = (l + d) / p;
    } else {
      const p = 2 * Math.sqrt(1 + u - i - o);
      this._w = (a - r) / p, this._x = (s + c) / p, this._y = (l + d) / p, this._z = 0.25 * p;
    }
    return this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion to the rotation required to rotate the direction vector
   * `vFrom` to the direction vector `vTo`.
   *
   * @param {Vector3} vFrom - The first (normalized) direction vector.
   * @param {Vector3} vTo - The second (normalized) direction vector.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromUnitVectors(e, t) {
    let i = e.dot(t) + 1;
    return i < 1e-8 ? (i = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = i) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = i)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = i), this.normalize();
  }
  /**
   * Returns the angle between this quaternion and the given one in radians.
   *
   * @param {Quaternion} q - The quaternion to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Ye(this.dot(e), -1, 1)));
  }
  /**
   * Rotates this quaternion by a given angular step to the given quaternion.
   * The method ensures that the final quaternion will not overshoot `q`.
   *
   * @param {Quaternion} q - The target quaternion.
   * @param {number} step - The angular step in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  rotateTowards(e, t) {
    const i = this.angleTo(e);
    if (i === 0) return this;
    const r = Math.min(1, t / i);
    return this.slerp(e, r), this;
  }
  /**
   * Sets this quaternion to the identity quaternion; that is, to the
   * quaternion that represents "no rotation".
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  identity() {
    return this.set(0, 0, 0, 1);
  }
  /**
   * Inverts this quaternion via {@link Quaternion#conjugate}. The
   * quaternion is assumed to have unit length.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  invert() {
    return this.conjugate();
  }
  /**
   * Returns the rotational conjugate of this quaternion. The conjugate of a
   * quaternion represents the same rotation in the opposite direction about
   * the rotational axis.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  /**
   * Calculates the dot product of this quaternion and the given one.
   *
   * @param {Quaternion} v - The quaternion to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  /**
   * Computes the squared Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector. This can be useful if you are comparing the
   * lengths of two quaternions, as this is a slightly more efficient calculation than
   * {@link Quaternion#length}.
   *
   * @return {number} The squared Euclidean length.
   */
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  /**
   * Computes the Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector.
   *
   * @return {number} The Euclidean length.
   */
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  /**
   * Normalizes this quaternion - that is, calculated the quaternion that performs
   * the same rotation as this one, but has a length equal to `1`.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  /**
   * Multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  /**
   * Pre-multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  /**
   * Multiplies the given quaternions and stores the result in this instance.
   *
   * @param {Quaternion} a - The first quaternion.
   * @param {Quaternion} b - The second quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiplyQuaternions(e, t) {
    const i = e._x, r = e._y, s = e._z, a = e._w, o = t._x, l = t._y, c = t._z, d = t._w;
    return this._x = i * d + a * o + r * c - s * l, this._y = r * d + a * l + s * o - i * c, this._z = s * d + a * c + i * l - r * o, this._w = a * d - i * o - r * l - s * c, this._onChangeCallback(), this;
  }
  /**
   * Performs a spherical linear interpolation between quaternions.
   *
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerp(e, t) {
    if (t <= 0) return this;
    if (t >= 1) return this.copy(e);
    let i = e._x, r = e._y, s = e._z, a = e._w, o = this.dot(e);
    o < 0 && (i = -i, r = -r, s = -s, a = -a, o = -o);
    let l = 1 - t;
    if (o < 0.9995) {
      const c = Math.acos(o), d = Math.sin(c);
      l = Math.sin(l * c) / d, t = Math.sin(t * c) / d, this._x = this._x * l + i * t, this._y = this._y * l + r * t, this._z = this._z * l + s * t, this._w = this._w * l + a * t, this._onChangeCallback();
    } else
      this._x = this._x * l + i * t, this._y = this._y * l + r * t, this._z = this._z * l + s * t, this._w = this._w * l + a * t, this.normalize();
    return this;
  }
  /**
   * Performs a spherical linear interpolation between the given quaternions
   * and stores the result in this quaternion.
   *
   * @param {Quaternion} qa - The source quaternion.
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerpQuaternions(e, t, i) {
    return this.copy(e).slerp(t, i);
  }
  /**
   * Sets this quaternion to a uniformly random, normalized quaternion.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), i = Math.random(), r = Math.sqrt(1 - i), s = Math.sqrt(i);
    return this.set(
      r * Math.sin(e),
      r * Math.cos(e),
      s * Math.sin(t),
      s * Math.cos(t)
    );
  }
  /**
   * Returns `true` if this quaternion is equal with the given one.
   *
   * @param {Quaternion} quaternion - The quaternion to test for equality.
   * @return {boolean} Whether this quaternion is equal with the given one.
   */
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  /**
   * Sets this quaternion's components from the given array.
   *
   * @param {Array<number>} array - An array holding the quaternion component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this quaternion to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the quaternion components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The quaternion components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  /**
   * Sets the components of this quaternion from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
   * @param {number} index - The index into the attribute.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the
   * numerical elements of this quaternion in an array of format `[x, y, z, w]`.
   *
   * @return {Array<number>} The serialized quaternion.
   */
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class G {
  /**
   * Constructs a new 3D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   */
  constructor(e = 0, t = 0, i = 0) {
    G.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = i;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @return {Vector3} A reference to this vector.
   */
  set(e, t, i) {
    return i === void 0 && (i = this.z), this.x = e, this.y = t, this.z = i, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector3} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Sets the vector's z component to the given value
   *
   * @param {number} z - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setZ(e) {
    return this.z = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @param {number} value - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector3} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3} v - The vector to copy.
   * @return {Vector3} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector3} v - The vector to add.
   * @return {Vector3} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector3} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector3|Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector3} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector3} v - The vector to subtract.
   * @return {Vector3} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector3} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector3} v - The vector to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  /**
   * Multiplies the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  /**
   * Applies the given Euler rotation to this vector.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Vector3} A reference to this vector.
   */
  applyEuler(e) {
    return this.applyQuaternion(aa.setFromEuler(e));
  }
  /**
   * Applies a rotation specified by an axis and an angle to this vector.
   *
   * @param {Vector3} axis - A normalized vector representing the rotation axis.
   * @param {number} angle - The angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  applyAxisAngle(e, t) {
    return this.applyQuaternion(aa.setFromAxisAngle(e, t));
  }
  /**
   * Multiplies this vector with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix3(e) {
    const t = this.x, i = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[3] * i + s[6] * r, this.y = s[1] * t + s[4] * i + s[7] * r, this.z = s[2] * t + s[5] * i + s[8] * r, this;
  }
  /**
   * Multiplies this vector by the given normal matrix and normalizes
   * the result.
   *
   * @param {Matrix3} m - The normal matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  /**
   * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
   * divides by perspective.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix4(e) {
    const t = this.x, i = this.y, r = this.z, s = e.elements, a = 1 / (s[3] * t + s[7] * i + s[11] * r + s[15]);
    return this.x = (s[0] * t + s[4] * i + s[8] * r + s[12]) * a, this.y = (s[1] * t + s[5] * i + s[9] * r + s[13]) * a, this.z = (s[2] * t + s[6] * i + s[10] * r + s[14]) * a, this;
  }
  /**
   * Applies the given Quaternion to this vector.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Vector3} A reference to this vector.
   */
  applyQuaternion(e) {
    const t = this.x, i = this.y, r = this.z, s = e.x, a = e.y, o = e.z, l = e.w, c = 2 * (a * r - o * i), d = 2 * (o * t - s * r), u = 2 * (s * i - a * t);
    return this.x = t + l * c + a * u - o * d, this.y = i + l * d + o * c - s * u, this.z = r + l * u + s * d - a * c, this;
  }
  /**
   * Projects this vector from world space into the camera's normalized
   * device coordinate (NDC) space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  /**
   * Unprojects this vector from the camera's normalized device coordinate (NDC)
   * space into world space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  /**
   * Transforms the direction of this vector by a matrix (the upper left 3 x 3
   * subset of the given 4x4 matrix and then normalizes the result.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Vector3} A reference to this vector.
   */
  transformDirection(e) {
    const t = this.x, i = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[4] * i + s[8] * r, this.y = s[1] * t + s[5] * i + s[9] * r, this.z = s[2] * t + s[6] * i + s[10] * r, this.normalize();
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector3} v - The vector to divide.
   * @return {Vector3} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector3} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * If this vector's x, y or z value is greater than the given vector's x, y or z
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  /**
   * If this vector's x, y or z value is less than the given vector's x, y or z
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  /**
   * If this vector's x, y or z value is greater than the max vector's x, y or z
   * value, it is replaced by the corresponding value.
   * If this vector's x, y or z value is less than the min vector's x, y or z value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector3} min - The minimum x, y and z values.
   * @param {Vector3} max - The maximum x, y and z values in the desired range.
   * @return {Vector3} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = Ye(this.x, e.x, t.x), this.y = Ye(this.y, e.y, t.y), this.z = Ye(this.z, e.z, t.z), this;
  }
  /**
   * If this vector's x, y or z values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y or z values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = Ye(this.x, e, t), this.y = Ye(this.y, e, t), this.z = Ye(this.z, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampLength(e, t) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Ye(i, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector3} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
   *
   * @return {Vector3} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  // TODO lengthSquared?
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector3} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector3} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector3} v1 - The first vector.
   * @param {Vector3} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerpVectors(e, t, i) {
    return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this.z = e.z + (t.z - e.z) * i, this;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the cross product with.
   * @return {Vector3} The result of the cross product.
   */
  cross(e) {
    return this.crossVectors(this, e);
  }
  /**
   * Calculates the cross product of the given vectors and stores the result
   * in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  crossVectors(e, t) {
    const i = e.x, r = e.y, s = e.z, a = t.x, o = t.y, l = t.z;
    return this.x = r * l - s * o, this.y = s * a - i * l, this.z = i * o - r * a, this;
  }
  /**
   * Projects this vector onto the given one.
   *
   * @param {Vector3} v - The vector to project to.
   * @return {Vector3} A reference to this vector.
   */
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const i = e.dot(this) / t;
    return this.copy(e).multiplyScalar(i);
  }
  /**
   * Projects this vector onto a plane by subtracting this
   * vector projected onto the plane's normal from this vector.
   *
   * @param {Vector3} planeNormal - The plane normal.
   * @return {Vector3} A reference to this vector.
   */
  projectOnPlane(e) {
    return Vr.copy(this).projectOnVector(e), this.sub(Vr);
  }
  /**
   * Reflects this vector off a plane orthogonal to the given normal vector.
   *
   * @param {Vector3} normal - The (normalized) normal vector.
   * @return {Vector3} A reference to this vector.
   */
  reflect(e) {
    return this.sub(Vr.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector3} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const i = this.dot(e) / t;
    return Math.acos(Ye(i, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector3} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(e) {
    const t = this.x - e.x, i = this.y - e.y, r = this.z - e.z;
    return t * t + i * i + r * r;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {Spherical} s - The spherical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} phi - The phi angle in radians.
   * @param {number} theta - The theta angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  setFromSphericalCoords(e, t, i) {
    const r = Math.sin(t) * e;
    return this.x = r * Math.sin(i), this.y = Math.cos(t) * e, this.z = r * Math.cos(i), this;
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {Cylindrical} c - The cylindrical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} theta - The theta angle in radians.
   * @param {number} y - The y value.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindricalCoords(e, t, i) {
    return this.x = e * Math.sin(t), this.y = i, this.z = e * Math.cos(t), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  /**
   * Sets the vector components to the scale elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), i = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = i, this.z = r, this;
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  /**
   * Sets the vector components from the given Euler angles.
   *
   * @param {Euler} e - The Euler angles to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  /**
   * Sets the vector components from the RGB components of the
   * given color.
   *
   * @param {Color} c - The color to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector3} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`
   * and z value to be `array[ offset + 2 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector3} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector3} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  /**
   * Sets this vector to a uniformly random point on a unit sphere.
   *
   * @return {Vector3} A reference to this vector.
   */
  randomDirection() {
    const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, i = Math.sqrt(1 - t * t);
    return this.x = i * Math.cos(e), this.y = t, this.z = i * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const Vr = /* @__PURE__ */ new G(), aa = /* @__PURE__ */ new qi();
class Be {
  /**
   * Constructs a new 3x3 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   */
  constructor(e, t, i, r, s, a, o, l, c) {
    Be.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, i, r, s, a, o, l, c);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @return {Matrix3} A reference to this matrix.
   */
  set(e, t, i, r, s, a, o, l, c) {
    const d = this.elements;
    return d[0] = e, d[1] = r, d[2] = o, d[3] = t, d[4] = s, d[5] = l, d[6] = i, d[7] = a, d[8] = c, this;
  }
  /**
   * Sets this matrix to the 3x3 identity matrix.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix3} m - The matrix to copy.
   * @return {Matrix3} A reference to this matrix.
   */
  copy(e) {
    const t = this.elements, i = e.elements;
    return t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5], t[6] = i[6], t[7] = i[7], t[8] = i[8], this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix3} A reference to this matrix.
   */
  extractBasis(e, t, i) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), i.setFromMatrix3Column(this, 2), this;
  }
  /**
   * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  /**
   * Post-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  /**
   * Pre-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  /**
   * Multiples the given 3x3 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix3} a - The first matrix.
   * @param {Matrix3} b - The second matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyMatrices(e, t) {
    const i = e.elements, r = t.elements, s = this.elements, a = i[0], o = i[3], l = i[6], c = i[1], d = i[4], u = i[7], f = i[2], p = i[5], x = i[8], v = r[0], m = r[3], h = r[6], T = r[1], E = r[4], A = r[7], D = r[2], y = r[5], P = r[8];
    return s[0] = a * v + o * T + l * D, s[3] = a * m + o * E + l * y, s[6] = a * h + o * A + l * P, s[1] = c * v + d * T + u * D, s[4] = c * m + d * E + u * y, s[7] = c * h + d * A + u * P, s[2] = f * v + p * T + x * D, s[5] = f * m + p * E + x * y, s[8] = f * h + p * A + x * P, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * @return {number} The determinant.
   */
  determinant() {
    const e = this.elements, t = e[0], i = e[1], r = e[2], s = e[3], a = e[4], o = e[5], l = e[6], c = e[7], d = e[8];
    return t * a * d - t * o * c - i * s * d + i * o * l + r * s * c - r * a * l;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  invert() {
    const e = this.elements, t = e[0], i = e[1], r = e[2], s = e[3], a = e[4], o = e[5], l = e[6], c = e[7], d = e[8], u = d * a - o * c, f = o * l - d * s, p = c * s - a * l, x = t * u + i * f + r * p;
    if (x === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const v = 1 / x;
    return e[0] = u * v, e[1] = (r * c - d * i) * v, e[2] = (o * i - r * a) * v, e[3] = f * v, e[4] = (d * t - r * l) * v, e[5] = (r * s - o * t) * v, e[6] = p * v, e[7] = (i * l - c * t) * v, e[8] = (a * t - i * s) * v, this;
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  /**
   * Computes the normal matrix which is the inverse transpose of the upper
   * left 3x3 portion of the given 4x4 matrix.
   *
   * @param {Matrix4} matrix4 - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  /**
   * Transposes this matrix into the supplied array, and returns itself unchanged.
   *
   * @param {Array<number>} r - An array to store the transposed matrix elements.
   * @return {Matrix3} A reference to this matrix.
   */
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  /**
   * Sets the UV transform matrix from offset, repeat, rotation, and center.
   *
   * @param {number} tx - Offset x.
   * @param {number} ty - Offset y.
   * @param {number} sx - Repeat x.
   * @param {number} sy - Repeat y.
   * @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.
   * @param {number} cx - Center x of rotation.
   * @param {number} cy - Center y of rotation
   * @return {Matrix3} A reference to this matrix.
   */
  setUvTransform(e, t, i, r, s, a, o) {
    const l = Math.cos(s), c = Math.sin(s);
    return this.set(
      i * l,
      i * c,
      -i * (l * a + c * o) + a + e,
      -r * c,
      r * l,
      -r * (-c * a + l * o) + o + t,
      0,
      0,
      1
    ), this;
  }
  /**
   * Scales this matrix with the given scalar values.
   *
   * @param {number} sx - The amount to scale in the X axis.
   * @param {number} sy - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  scale(e, t) {
    return this.premultiply(kr.makeScale(e, t)), this;
  }
  /**
   * Rotates this matrix by the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  rotate(e) {
    return this.premultiply(kr.makeRotation(-e)), this;
  }
  /**
   * Translates this matrix by the given scalar values.
   *
   * @param {number} tx - The amount to translate in the X axis.
   * @param {number} ty - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  translate(e, t) {
    return this.premultiply(kr.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  /**
   * Sets this matrix as a 2D translation transform.
   *
   * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a 2D rotational transformation.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  makeRotation(e) {
    const t = Math.cos(e), i = Math.sin(e);
    return this.set(
      t,
      -i,
      0,
      i,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a 2D scale transform.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix3} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(e) {
    const t = this.elements, i = e.elements;
    for (let r = 0; r < 9; r++)
      if (t[r] !== i[r]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix3} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let i = 0; i < 9; i++)
      this.elements[i] = e[i + t];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(e = [], t = 0) {
    const i = this.elements;
    return e[t] = i[0], e[t + 1] = i[1], e[t + 2] = i[2], e[t + 3] = i[3], e[t + 4] = i[4], e[t + 5] = i[5], e[t + 6] = i[6], e[t + 7] = i[7], e[t + 8] = i[8], e;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix3} A clone of this instance.
   */
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const kr = /* @__PURE__ */ new Be(), oa = /* @__PURE__ */ new Be().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), la = /* @__PURE__ */ new Be().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
function ll() {
  const n = {
    enabled: !0,
    workingColorSpace: Si,
    /**
     * Implementations of supported color spaces.
     *
     * Required:
     *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
     *	- whitePoint: reference white [ x y ]
     *	- transfer: transfer function (pre-defined)
     *	- toXYZ: Matrix3 RGB to XYZ transform
     *	- fromXYZ: Matrix3 XYZ to RGB transform
     *	- luminanceCoefficients: RGB luminance coefficients
     *
     * Optional:
     *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace, toneMappingMode: 'extended' | 'standard' }
     *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
     *
     * Reference:
     * - https://www.russellcottrell.com/photo/matrixCalculator.htm
     */
    spaces: {},
    convert: function(r, s, a) {
      return this.enabled === !1 || s === a || !s || !a || (this.spaces[s].transfer === it && (r.r = Mn(r.r), r.g = Mn(r.g), r.b = Mn(r.b)), this.spaces[s].primaries !== this.spaces[a].primaries && (r.applyMatrix3(this.spaces[s].toXYZ), r.applyMatrix3(this.spaces[a].fromXYZ)), this.spaces[a].transfer === it && (r.r = _i(r.r), r.g = _i(r.g), r.b = _i(r.b))), r;
    },
    workingToColorSpace: function(r, s) {
      return this.convert(r, this.workingColorSpace, s);
    },
    colorSpaceToWorking: function(r, s) {
      return this.convert(r, s, this.workingColorSpace);
    },
    getPrimaries: function(r) {
      return this.spaces[r].primaries;
    },
    getTransfer: function(r) {
      return r === "" ? yr : this.spaces[r].transfer;
    },
    getToneMappingMode: function(r) {
      return this.spaces[r].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(r, s = this.workingColorSpace) {
      return r.fromArray(this.spaces[s].luminanceCoefficients);
    },
    define: function(r) {
      Object.assign(this.spaces, r);
    },
    // Internal APIs
    _getMatrix: function(r, s, a) {
      return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(r) {
      return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(r = this.workingColorSpace) {
      return this.spaces[r].workingColorSpaceConfig.unpackColorSpace;
    },
    // Deprecated
    fromWorkingColorSpace: function(r, s) {
      return Hi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), n.workingToColorSpace(r, s);
    },
    toWorkingColorSpace: function(r, s) {
      return Hi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), n.colorSpaceToWorking(r, s);
    }
  }, e = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], t = [0.2126, 0.7152, 0.0722], i = [0.3127, 0.329];
  return n.define({
    [Si]: {
      primaries: e,
      whitePoint: i,
      transfer: yr,
      toXYZ: oa,
      fromXYZ: la,
      luminanceCoefficients: t,
      workingColorSpaceConfig: { unpackColorSpace: Ft },
      outputColorSpaceConfig: { drawingBufferColorSpace: Ft }
    },
    [Ft]: {
      primaries: e,
      whitePoint: i,
      transfer: it,
      toXYZ: oa,
      fromXYZ: la,
      luminanceCoefficients: t,
      outputColorSpaceConfig: { drawingBufferColorSpace: Ft }
    }
  }), n;
}
const Ze = /* @__PURE__ */ ll();
function Mn(n) {
  return n < 0.04045 ? n * 0.0773993808 : Math.pow(n * 0.9478672986 + 0.0521327014, 2.4);
}
function _i(n) {
  return n < 31308e-7 ? n * 12.92 : 1.055 * Math.pow(n, 0.41666) - 0.055;
}
let ei;
class cl {
  /**
   * Returns a data URI containing a representation of the given image.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement)} image - The image object.
   * @param {string} [type='image/png'] - Indicates the image format.
   * @return {string} The data URI.
   */
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let i;
    if (e instanceof HTMLCanvasElement)
      i = e;
    else {
      ei === void 0 && (ei = ki("canvas")), ei.width = e.width, ei.height = e.height;
      const r = ei.getContext("2d");
      e instanceof ImageData ? r.putImageData(e, 0, 0) : r.drawImage(e, 0, 0, e.width, e.height), i = ei;
    }
    return i.toDataURL(t);
  }
  /**
   * Converts the given sRGB image data to linear color space.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement|ImageBitmap|Object)} image - The image object.
   * @return {HTMLCanvasElement|Object} The converted image.
   */
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = ki("canvas");
      t.width = e.width, t.height = e.height;
      const i = t.getContext("2d");
      i.drawImage(e, 0, 0, e.width, e.height);
      const r = i.getImageData(0, 0, e.width, e.height), s = r.data;
      for (let a = 0; a < s.length; a++)
        s[a] = Mn(s[a] / 255) * 255;
      return i.putImageData(r, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let i = 0; i < t.length; i++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[i] = Math.floor(Mn(t[i] / 255) * 255) : t[i] = Mn(t[i]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let dl = 0;
class Ls {
  /**
   * Constructs a new video texture.
   *
   * @param {any} [data=null] - The data definition of a texture.
   */
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: dl++ }), this.uuid = Xi(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  /**
   * Returns the dimensions of the source into the given target vector.
   *
   * @param {(Vector2|Vector3)} target - The target object the result is written into.
   * @return {(Vector2|Vector3)} The dimensions of the source.
   */
  getSize(e) {
    const t = this.data;
    return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : t instanceof VideoFrame ? e.set(t.displayHeight, t.displayWidth, 0) : t !== null ? e.set(t.width, t.height, t.depth || 0) : e.set(0, 0, 0), e;
  }
  /**
   * When the property is set to `true`, the engine allocates the memory
   * for the texture (if necessary) and triggers the actual texture upload
   * to the GPU next time the source is used.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  /**
   * Serializes the source into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized source.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const i = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let s;
      if (Array.isArray(r)) {
        s = [];
        for (let a = 0, o = r.length; a < o; a++)
          r[a].isDataTexture ? s.push(Hr(r[a].image)) : s.push(Hr(r[a]));
      } else
        s = Hr(r);
      i.url = s;
    }
    return t || (e.images[this.uuid] = i), i;
  }
}
function Hr(n) {
  return typeof HTMLImageElement < "u" && n instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && n instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && n instanceof ImageBitmap ? cl.getDataURL(n) : n.data ? {
    data: Array.from(n.data),
    width: n.width,
    height: n.height,
    type: n.data.constructor.name
  } : (Oe("Texture: Unable to serialize Texture."), {});
}
let ul = 0;
const Wr = /* @__PURE__ */ new G();
class Pt extends Ei {
  /**
   * Constructs a new texture.
   *
   * @param {?Object} [image=Texture.DEFAULT_IMAGE] - The image holding the texture data.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(e = Pt.DEFAULT_IMAGE, t = Pt.DEFAULT_MAPPING, i = 1001, r = 1001, s = 1006, a = 1008, o = 1023, l = 1009, c = Pt.DEFAULT_ANISOTROPY, d = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: ul++ }), this.uuid = Xi(), this.name = "", this.source = new Ls(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = i, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new rt(0, 0), this.repeat = new rt(1, 1), this.center = new rt(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Be(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = d, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0;
  }
  /**
   * The width of the texture in pixels.
   */
  get width() {
    return this.source.getSize(Wr).x;
  }
  /**
   * The height of the texture in pixels.
   */
  get height() {
    return this.source.getSize(Wr).y;
  }
  /**
   * The depth of the texture in pixels.
   */
  get depth() {
    return this.source.getSize(Wr).z;
  }
  /**
   * The image object holding the texture data.
   *
   * @type {?Object}
   */
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  /**
   * Updates the texture transformation matrix from the from the properties {@link Texture#offset},
   * {@link Texture#repeat}, {@link Texture#rotation}, and {@link Texture#center}.
   */
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  /**
   * Adds a range of data in the data texture to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Returns a new texture with copied values from this instance.
   *
   * @return {Texture} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given texture to this instance.
   *
   * @param {Texture} source - The texture to copy.
   * @return {Texture} A reference to this instance.
   */
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  /**
   * Sets this texture's properties based on `values`.
   * @param {Object} values - A container with texture parameters.
   */
  setValues(e) {
    for (const t in e) {
      const i = e[t];
      if (i === void 0) {
        Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);
        continue;
      }
      const r = this[t];
      if (r === void 0) {
        Oe(`Texture.setValues(): property '${t}' does not exist.`);
        continue;
      }
      r && i && r.isVector2 && i.isVector2 || r && i && r.isVector3 && i.isVector3 || r && i && r.isMatrix3 && i.isMatrix3 ? r.copy(i) : this[t] = i;
    }
  }
  /**
   * Serializes the texture into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized texture.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const i = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (i.userData = this.userData), t || (e.textures[this.uuid] = i), i;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires Texture#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Transforms the given uv vector with the textures uv transformation matrix.
   *
   * @param {Vector2} uv - The uv vector.
   * @return {Vector2} The transformed uv vector.
   */
  transformUv(e) {
    if (this.mapping !== 300) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case 1e3:
          e.x = e.x - Math.floor(e.x);
          break;
        case 1001:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case 1e3:
          e.y = e.y - Math.floor(e.y);
          break;
        case 1001:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  /**
   * Setting this property to `true` indicates the engine the texture
   * must be updated in the next render. This triggers a texture upload
   * to the GPU and ensures correct texture parameter configuration.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  /**
   * Setting this property to `true` indicates the engine the PMREM
   * must be regenerated.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
Pt.DEFAULT_IMAGE = null;
Pt.DEFAULT_MAPPING = 300;
Pt.DEFAULT_ANISOTROPY = 1;
class _t {
  /**
   * Constructs a new 4D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   * @param {number} [w=1] - The w value of this vector.
   */
  constructor(e = 0, t = 0, i = 0, r = 1) {
    _t.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = i, this.w = r;
  }
  /**
   * Alias for {@link Vector4#z}.
   *
   * @type {number}
   */
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  /**
   * Alias for {@link Vector4#w}.
   *
   * @type {number}
   */
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @param {number} w - The value of the w component.
   * @return {Vector4} A reference to this vector.
   */
  set(e, t, i, r) {
    return this.x = e, this.y = t, this.z = i, this.w = r, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector4} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Sets the vector's z component to the given value
   *
   * @param {number} z - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setZ(e) {
    return this.z = e, this;
  }
  /**
   * Sets the vector's w component to the given value
   *
   * @param {number} w - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setW(e) {
    return this.w = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @param {number} value - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector4} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3|Vector4} v - The vector to copy.
   * @return {Vector4} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector4} v - The vector to add.
   * @return {Vector4} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector4} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector4} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector4} v - The vector to subtract.
   * @return {Vector4} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector4} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector4} v - The vector to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  /**
   * Multiplies this vector with the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  applyMatrix4(e) {
    const t = this.x, i = this.y, r = this.z, s = this.w, a = e.elements;
    return this.x = a[0] * t + a[4] * i + a[8] * r + a[12] * s, this.y = a[1] * t + a[5] * i + a[9] * r + a[13] * s, this.z = a[2] * t + a[6] * i + a[10] * r + a[14] * s, this.w = a[3] * t + a[7] * i + a[11] * r + a[15] * s, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector4} v - The vector to divide.
   * @return {Vector4} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector4} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * Sets the x, y and z components of this
   * vector to the quaternion's axis and w to the angle.
   *
   * @param {Quaternion} q - The Quaternion to set.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  /**
   * Sets the x, y and z components of this
   * vector to the axis of rotation and w to the angle.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper left 3x3 matrix is a pure rotation matrix.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromRotationMatrix(e) {
    let t, i, r, s;
    const l = e.elements, c = l[0], d = l[4], u = l[8], f = l[1], p = l[5], x = l[9], v = l[2], m = l[6], h = l[10];
    if (Math.abs(d - f) < 0.01 && Math.abs(u - v) < 0.01 && Math.abs(x - m) < 0.01) {
      if (Math.abs(d + f) < 0.1 && Math.abs(u + v) < 0.1 && Math.abs(x + m) < 0.1 && Math.abs(c + p + h - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const E = (c + 1) / 2, A = (p + 1) / 2, D = (h + 1) / 2, y = (d + f) / 4, P = (u + v) / 4, O = (x + m) / 4;
      return E > A && E > D ? E < 0.01 ? (i = 0, r = 0.707106781, s = 0.707106781) : (i = Math.sqrt(E), r = y / i, s = P / i) : A > D ? A < 0.01 ? (i = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(A), i = y / r, s = O / r) : D < 0.01 ? (i = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(D), i = P / s, r = O / s), this.set(i, r, s, t), this;
    }
    let T = Math.sqrt((m - x) * (m - x) + (u - v) * (u - v) + (f - d) * (f - d));
    return Math.abs(T) < 1e-3 && (T = 1), this.x = (m - x) / T, this.y = (u - v) / T, this.z = (f - d) / T, this.w = Math.acos((c + p + h - 1) / 2), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the given vector's x, y, z or w
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  /**
   * If this vector's x, y, z or w value is less than the given vector's x, y, z or w
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the max vector's x, y, z or w
   * value, it is replaced by the corresponding value.
   * If this vector's x, y, z or w value is less than the min vector's x, y, z or w value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector4} min - The minimum x, y and z values.
   * @param {Vector4} max - The maximum x, y and z values in the desired range.
   * @return {Vector4} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = Ye(this.x, e.x, t.x), this.y = Ye(this.y, e.y, t.y), this.z = Ye(this.z, e.z, t.z), this.w = Ye(this.w, e.w, t.w), this;
  }
  /**
   * If this vector's x, y, z or w values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y, z or w values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = Ye(this.x, e, t), this.y = Ye(this.y, e, t), this.z = Ye(this.z, e, t), this.w = Ye(this.w, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampLength(e, t) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Ye(i, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector4} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w.
   *
   * @return {Vector4} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector4} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector4} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector4} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector4} v1 - The first vector.
   * @param {Vector4} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerpVectors(e, t, i) {
    return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this.z = e.z + (t.z - e.z) * i, this.w = e.w + (t.w - e.w) * i, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector4} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`,
   * z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector4} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector4} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class fl extends Ei {
  /**
   * Render target options.
   *
   * @typedef {Object} RenderTarget~Options
   * @property {boolean} [generateMipmaps=false] - Whether to generate mipmaps or not.
   * @property {number} [magFilter=LinearFilter] - The mag filter.
   * @property {number} [minFilter=LinearFilter] - The min filter.
   * @property {number} [format=RGBAFormat] - The texture format.
   * @property {number} [type=UnsignedByteType] - The texture type.
   * @property {?string} [internalFormat=null] - The texture's internal format.
   * @property {number} [wrapS=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [wrapT=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [anisotropy=1] - The texture's anisotropy value.
   * @property {string} [colorSpace=NoColorSpace] - The texture's color space.
   * @property {boolean} [depthBuffer=true] - Whether to allocate a depth buffer or not.
   * @property {boolean} [stencilBuffer=false] - Whether to allocate a stencil buffer or not.
   * @property {boolean} [resolveDepthBuffer=true] - Whether to resolve the depth buffer or not.
   * @property {boolean} [resolveStencilBuffer=true] - Whether  to resolve the stencil buffer or not.
   * @property {?Texture} [depthTexture=null] - Reference to a depth texture.
   * @property {number} [samples=0] - The MSAA samples count.
   * @property {number} [count=1] - Defines the number of color attachments . Must be at least `1`.
   * @property {number} [depth=1] - The texture depth.
   * @property {boolean} [multiview=false] - Whether this target is used for multiview rendering.
   */
  /**
   * Constructs a new render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = 1, i = {}) {
    super(), i = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: 1006,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1
    }, i), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = i.depth, this.scissor = new _t(0, 0, e, t), this.scissorTest = !1, this.viewport = new _t(0, 0, e, t);
    const r = { width: e, height: t, depth: i.depth }, s = new Pt(r);
    this.textures = [];
    const a = i.count;
    for (let o = 0; o < a; o++)
      this.textures[o] = s.clone(), this.textures[o].isRenderTargetTexture = !0, this.textures[o].renderTarget = this;
    this._setTextureOptions(i), this.depthBuffer = i.depthBuffer, this.stencilBuffer = i.stencilBuffer, this.resolveDepthBuffer = i.resolveDepthBuffer, this.resolveStencilBuffer = i.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = i.depthTexture, this.samples = i.samples, this.multiview = i.multiview;
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: 1006,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
    for (let i = 0; i < this.textures.length; i++)
      this.textures[i].setValues(t);
  }
  /**
   * The texture representing the default color attachment.
   *
   * @type {Texture}
   */
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(e) {
    this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e;
  }
  /**
   * Instead of saving the depth in a renderbuffer, a texture
   * can be used instead which is useful for further processing
   * e.g. in context of post-processing.
   *
   * @type {?DepthTexture}
   * @default null
   */
  get depthTexture() {
    return this._depthTexture;
  }
  /**
   * Sets the size of this render target.
   *
   * @param {number} width - The width.
   * @param {number} height - The height.
   * @param {number} [depth=1] - The depth.
   */
  setSize(e, t, i = 1) {
    if (this.width !== e || this.height !== t || this.depth !== i) {
      this.width = e, this.height = t, this.depth = i;
      for (let r = 0, s = this.textures.length; r < s; r++)
        this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = i, this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  /**
   * Returns a new render target with copied values from this instance.
   *
   * @return {RenderTarget} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the settings of the given render target. This is a structural copy so
   * no resources are shared between render targets after the copy. That includes
   * all MRT textures and the depth texture.
   *
   * @param {RenderTarget} source - The render target to copy.
   * @return {RenderTarget} A reference to this instance.
   */
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let t = 0, i = e.textures.length; t < i; t++) {
      this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
      const r = Object.assign({}, e.textures[t].image);
      this.textures[t].source = new Ls(r);
    }
    return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires RenderTarget#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class jn extends fl {
  /**
   * Constructs a new 3D render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = 1, i = {}) {
    super(e, t, i), this.isWebGLRenderTarget = !0;
  }
}
class so extends Pt {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e = null, t = 1, i = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: i, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  /**
   * Describes that a specific layer of the texture needs to be updated.
   * Normally when {@link Texture#needsUpdate} is set to `true`, the
   * entire data texture array is sent to the GPU. Marking specific
   * layers will only transmit subsets of all mipmaps associated with a
   * specific depth in the array which is often much more performant.
   *
   * @param {number} layerIndex - The layer index that should be updated.
   */
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  /**
   * Resets the layer updates registry.
   */
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class hl extends Pt {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e = null, t = 1, i = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: i, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class Yi {
  /**
   * Constructs a new bounding box.
   *
   * @param {Vector3} [min=(Infinity,Infinity,Infinity)] - A vector representing the lower boundary of the box.
   * @param {Vector3} [max=(-Infinity,-Infinity,-Infinity)] - A vector representing the upper boundary of the box.
   */
  constructor(e = new G(1 / 0, 1 / 0, 1 / 0), t = new G(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  /**
   * Sets the lower and upper boundaries of this box.
   * Please note that this method only copies the values from the given objects.
   *
   * @param {Vector3} min - The lower boundary of the box.
   * @param {Vector3} max - The upper boundary of the box.
   * @return {Box3} A reference to this bounding box.
   */
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<number>} array - An array holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, i = e.length; t < i; t += 3)
      this.expandByPoint(en.fromArray(e, t));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - A buffer attribute holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, i = e.count; t < i; t++)
      this.expandByPoint(en.fromBufferAttribute(e, t));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<Vector3>} points - An array holding 3D position data as instances of {@link Vector3}.
   * @return {Box3} A reference to this bounding box.
   */
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, i = e.length; t < i; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  /**
   * Centers this box on the given center vector and sets this box's width, height and
   * depth to the given size values.
   *
   * @param {Vector3} center - The center of the box.
   * @param {Vector3} size - The x, y and z dimensions of the box.
   * @return {Box3} A reference to this bounding box.
   */
  setFromCenterAndSize(e, t) {
    const i = en.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(i), this.max.copy(e).add(i), this;
  }
  /**
   * Computes the world-axis-aligned bounding box for the given 3D object
   * (including its children), accounting for the object's, and children's,
   * world transforms. The function may result in a larger box than strictly necessary.
   *
   * @param {Object3D} object - The 3D object to compute the bounding box for.
   * @param {boolean} [precise=false] - If set to `true`, the method computes the smallest
   * world-axis-aligned bounding box at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  /**
   * Returns a new box with copied values from this instance.
   *
   * @return {Box3} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given box to this instance.
   *
   * @param {Box3} box - The box to copy.
   * @return {Box3} A reference to this bounding box.
   */
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  /**
   * Makes this box empty which means in encloses a zero space in 3D.
   *
   * @return {Box3} A reference to this bounding box.
   */
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  /**
   * Returns true if this box includes zero points within its bounds.
   * Note that a box with equal lower and upper bounds still includes one
   * point, the one both bounds share.
   *
   * @return {boolean} Whether this box is empty or not.
   */
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  /**
   * Returns the center point of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The center point.
   */
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  /**
   * Returns the dimensions of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The size.
   */
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  /**
   * Expands the boundaries of this box to include the given point.
   *
   * @param {Vector3} point - The point that should be included by the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  /**
   * Expands this box equilaterally by the given vector. The width of this
   * box will be expanded by the x component of the vector in both
   * directions. The height of this box will be expanded by the y component of
   * the vector in both directions. The depth of this box will be
   * expanded by the z component of the vector in both directions.
   *
   * @param {Vector3} vector - The vector that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  /**
   * Expands each dimension of the box by the given scalar. If negative, the
   * dimensions of the box will be contracted.
   *
   * @param {number} scalar - The scalar value that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  /**
   * Expands the boundaries of this box to include the given 3D object and
   * its children, accounting for the object's, and children's, world
   * transforms. The function may result in a larger box than strictly
   * necessary (unless the precise parameter is set to true).
   *
   * @param {Object3D} object - The 3D object that should expand the bounding box.
   * @param {boolean} precise - If set to `true`, the method expands the bounding box
   * as little as necessary at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const i = e.geometry;
    if (i !== void 0) {
      const s = i.getAttribute("position");
      if (t === !0 && s !== void 0 && e.isInstancedMesh !== !0)
        for (let a = 0, o = s.count; a < o; a++)
          e.isMesh === !0 ? e.getVertexPosition(a, en) : en.fromBufferAttribute(s, a), en.applyMatrix4(e.matrixWorld), this.expandByPoint(en);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), Ji.copy(e.boundingBox)) : (i.boundingBox === null && i.computeBoundingBox(), Ji.copy(i.boundingBox)), Ji.applyMatrix4(e.matrixWorld), this.union(Ji);
    }
    const r = e.children;
    for (let s = 0, a = r.length; s < a; s++)
      this.expandByObject(r[s], t);
    return this;
  }
  /**
   * Returns `true` if the given point lies within or on the boundaries of this box.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the bounding box contains the given point or not.
   */
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  /**
   * Returns `true` if this bounding box includes the entirety of the given bounding box.
   * If this box and the given one are identical, this function also returns `true`.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box contains the given bounding box or not.
   */
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  /**
   * Returns a point as a proportion of this box's width, height and depth.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A point as a proportion of this box's width, height and depth.
   */
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  /**
   * Returns `true` if the given bounding box intersects with this bounding box.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with this bounding box.
   */
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  /**
   * Returns `true` if the given bounding sphere intersects with this bounding box.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with this bounding box.
   */
  intersectsSphere(e) {
    return this.clampPoint(e.center, en), en.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  /**
   * Returns `true` if the given plane intersects with this bounding box.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether the given plane intersects with this bounding box.
   */
  intersectsPlane(e) {
    let t, i;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, i = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, i = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, i += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, i += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, i += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, i += e.normal.z * this.min.z), t <= -e.constant && i >= -e.constant;
  }
  /**
   * Returns `true` if the given triangle intersects with this bounding box.
   *
   * @param {Triangle} triangle - The triangle to test.
   * @return {boolean} Whether the given triangle intersects with this bounding box.
   */
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(Ci), Qi.subVectors(this.max, Ci), ti.subVectors(e.a, Ci), ni.subVectors(e.b, Ci), ii.subVectors(e.c, Ci), Tn.subVectors(ni, ti), An.subVectors(ii, ni), Fn.subVectors(ti, ii);
    let t = [
      0,
      -Tn.z,
      Tn.y,
      0,
      -An.z,
      An.y,
      0,
      -Fn.z,
      Fn.y,
      Tn.z,
      0,
      -Tn.x,
      An.z,
      0,
      -An.x,
      Fn.z,
      0,
      -Fn.x,
      -Tn.y,
      Tn.x,
      0,
      -An.y,
      An.x,
      0,
      -Fn.y,
      Fn.x,
      0
    ];
    return !Xr(t, ti, ni, ii, Qi) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Xr(t, ti, ni, ii, Qi)) ? !1 : (er.crossVectors(Tn, An), t = [er.x, er.y, er.z], Xr(t, ti, ni, ii, Qi));
  }
  /**
   * Clamps the given point within the bounds of this box.
   *
   * @param {Vector3} point - The point to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  /**
   * Returns the euclidean distance from any edge of this box to the specified point. If
   * the given point lies inside of this box, the distance will be `0`.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The euclidean distance.
   */
  distanceToPoint(e) {
    return this.clampPoint(e, en).distanceTo(e);
  }
  /**
   * Returns a bounding sphere that encloses this bounding box.
   *
   * @param {Sphere} target - The target sphere that is used to store the method's result.
   * @return {Sphere} The bounding sphere that encloses this bounding box.
   */
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(en).length() * 0.5), e;
  }
  /**
   * Computes the intersection of this bounding box and the given one, setting the upper
   * bound of this box to the lesser of the two boxes' upper bounds and the
   * lower bound of this box to the greater of the two boxes' lower bounds. If
   * there's no overlap, makes this box empty.
   *
   * @param {Box3} box - The bounding box to intersect with.
   * @return {Box3} A reference to this bounding box.
   */
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  /**
   * Computes the union of this box and another and the given one, setting the upper
   * bound of this box to the greater of the two boxes' upper bounds and the
   * lower bound of this box to the lesser of the two boxes' lower bounds.
   *
   * @param {Box3} box - The bounding box that will be unioned with this instance.
   * @return {Box3} A reference to this bounding box.
   */
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  /**
   * Transforms this bounding box by the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Box3} A reference to this bounding box.
   */
  applyMatrix4(e) {
    return this.isEmpty() ? this : (hn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), hn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), hn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), hn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), hn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), hn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), hn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), hn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(hn), this);
  }
  /**
   * Adds the given offset to both the upper and lower bounds of this bounding box,
   * effectively moving it in 3D space.
   *
   * @param {Vector3} offset - The offset that should be used to translate the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  /**
   * Returns `true` if this bounding box is equal with the given one.
   *
   * @param {Box3} box - The box to test for equality.
   * @return {boolean} Whether this bounding box is equal with the given one.
   */
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @param {Object} json - The serialized json to set the box from.
   * @return {Box3} A reference to this bounding box.
   */
  fromJSON(e) {
    return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
  }
}
const hn = [
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G()
], en = /* @__PURE__ */ new G(), Ji = /* @__PURE__ */ new Yi(), ti = /* @__PURE__ */ new G(), ni = /* @__PURE__ */ new G(), ii = /* @__PURE__ */ new G(), Tn = /* @__PURE__ */ new G(), An = /* @__PURE__ */ new G(), Fn = /* @__PURE__ */ new G(), Ci = /* @__PURE__ */ new G(), Qi = /* @__PURE__ */ new G(), er = /* @__PURE__ */ new G(), Nn = /* @__PURE__ */ new G();
function Xr(n, e, t, i, r) {
  for (let s = 0, a = n.length - 3; s <= a; s += 3) {
    Nn.fromArray(n, s);
    const o = r.x * Math.abs(Nn.x) + r.y * Math.abs(Nn.y) + r.z * Math.abs(Nn.z), l = e.dot(Nn), c = t.dot(Nn), d = i.dot(Nn);
    if (Math.max(-Math.max(l, c, d), Math.min(l, c, d)) > o)
      return !1;
  }
  return !0;
}
const pl = /* @__PURE__ */ new Yi(), Ri = /* @__PURE__ */ new G(), qr = /* @__PURE__ */ new G();
class Us {
  /**
   * Constructs a new sphere.
   *
   * @param {Vector3} [center=(0,0,0)] - The center of the sphere
   * @param {number} [radius=-1] - The radius of the sphere.
   */
  constructor(e = new G(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  /**
   * Sets the sphere's components by copying the given values.
   *
   * @param {Vector3} center - The center.
   * @param {number} radius - The radius.
   * @return {Sphere} A reference to this sphere.
   */
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  /**
   * Computes the minimum bounding sphere for list of points.
   * If the optional center point is given, it is used as the sphere's
   * center. Otherwise, the center of the axis-aligned bounding box
   * encompassing the points is calculated.
   *
   * @param {Array<Vector3>} points - A list of points in 3D space.
   * @param {Vector3} [optionalCenter] - The center of the sphere.
   * @return {Sphere} A reference to this sphere.
   */
  setFromPoints(e, t) {
    const i = this.center;
    t !== void 0 ? i.copy(t) : pl.setFromPoints(e).getCenter(i);
    let r = 0;
    for (let s = 0, a = e.length; s < a; s++)
      r = Math.max(r, i.distanceToSquared(e[s]));
    return this.radius = Math.sqrt(r), this;
  }
  /**
   * Copies the values of the given sphere to this instance.
   *
   * @param {Sphere} sphere - The sphere to copy.
   * @return {Sphere} A reference to this sphere.
   */
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  /**
   * Returns `true` if the sphere is empty (the radius set to a negative number).
   *
   * Spheres with a radius of `0` contain only their center point and are not
   * considered to be empty.
   *
   * @return {boolean} Whether this sphere is empty or not.
   */
  isEmpty() {
    return this.radius < 0;
  }
  /**
   * Makes this sphere empty which means in encloses a zero space in 3D.
   *
   * @return {Sphere} A reference to this sphere.
   */
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  /**
   * Returns `true` if this sphere contains the given point inclusive of
   * the surface of the sphere.
   *
   * @param {Vector3} point - The point to check.
   * @return {boolean} Whether this sphere contains the given point or not.
   */
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  /**
   * Returns the closest distance from the boundary of the sphere to the
   * given point. If the sphere contains the point, the distance will
   * be negative.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The distance to the point.
   */
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  /**
   * Returns `true` if this sphere intersects with the given one.
   *
   * @param {Sphere} sphere - The sphere to test.
   * @return {boolean} Whether this sphere intersects with the given one or not.
   */
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  /**
   * Returns `true` if this sphere intersects with the given box.
   *
   * @param {Box3} box - The box to test.
   * @return {boolean} Whether this sphere intersects with the given box or not.
   */
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  /**
   * Returns `true` if this sphere intersects with the given plane.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether this sphere intersects with the given plane or not.
   */
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  /**
   * Clamps a point within the sphere. If the point is outside the sphere, it
   * will clamp it to the closest point on the edge of the sphere. Points
   * already inside the sphere will not be affected.
   *
   * @param {Vector3} point - The plane to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(e, t) {
    const i = this.center.distanceToSquared(e);
    return t.copy(e), i > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  /**
   * Returns a bounding box that encloses this sphere.
   *
   * @param {Box3} target - The target box that is used to store the method's result.
   * @return {Box3} The bounding box that encloses this sphere.
   */
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  /**
   * Transforms this sphere with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Sphere} A reference to this sphere.
   */
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  /**
   * Translates the sphere's center by the given offset.
   *
   * @param {Vector3} offset - The offset.
   * @return {Sphere} A reference to this sphere.
   */
  translate(e) {
    return this.center.add(e), this;
  }
  /**
   * Expands the boundaries of this sphere to include the given point.
   *
   * @param {Vector3} point - The point to include.
   * @return {Sphere} A reference to this sphere.
   */
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    Ri.subVectors(e, this.center);
    const t = Ri.lengthSq();
    if (t > this.radius * this.radius) {
      const i = Math.sqrt(t), r = (i - this.radius) * 0.5;
      this.center.addScaledVector(Ri, r / i), this.radius += r;
    }
    return this;
  }
  /**
   * Expands this sphere to enclose both the original sphere and the given sphere.
   *
   * @param {Sphere} sphere - The sphere to include.
   * @return {Sphere} A reference to this sphere.
   */
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (qr.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Ri.copy(e.center).add(qr)), this.expandByPoint(Ri.copy(e.center).sub(qr))), this);
  }
  /**
   * Returns `true` if this sphere is equal with the given one.
   *
   * @param {Sphere} sphere - The sphere to test for equality.
   * @return {boolean} Whether this bounding sphere is equal with the given one.
   */
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  /**
   * Returns a new sphere with copied values from this instance.
   *
   * @return {Sphere} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @param {Object} json - The serialized json to set the sphere from.
   * @return {Box3} A reference to this bounding sphere.
   */
  fromJSON(e) {
    return this.radius = e.radius, this.center.fromArray(e.center), this;
  }
}
const pn = /* @__PURE__ */ new G(), Yr = /* @__PURE__ */ new G(), tr = /* @__PURE__ */ new G(), wn = /* @__PURE__ */ new G(), $r = /* @__PURE__ */ new G(), nr = /* @__PURE__ */ new G(), Kr = /* @__PURE__ */ new G();
class ml {
  /**
   * Constructs a new ray.
   *
   * @param {Vector3} [origin=(0,0,0)] - The origin of the ray.
   * @param {Vector3} [direction=(0,0,-1)] - The (normalized) direction of the ray.
   */
  constructor(e = new G(), t = new G(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  /**
   * Sets the ray's components by copying the given values.
   *
   * @param {Vector3} origin - The origin.
   * @param {Vector3} direction - The direction.
   * @return {Ray} A reference to this ray.
   */
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  /**
   * Copies the values of the given ray to this instance.
   *
   * @param {Ray} ray - The ray to copy.
   * @return {Ray} A reference to this ray.
   */
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  /**
   * Returns a vector that is located at a given distance along this ray.
   *
   * @param {number} t - The distance along the ray to retrieve a position for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A position on the ray.
   */
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  /**
   * Adjusts the direction of the ray to point at the given vector in world space.
   *
   * @param {Vector3} v - The target position.
   * @return {Ray} A reference to this ray.
   */
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  /**
   * Shift the origin of this ray along its direction by the given distance.
   *
   * @param {number} t - The distance along the ray to interpolate.
   * @return {Ray} A reference to this ray.
   */
  recast(e) {
    return this.origin.copy(this.at(e, pn)), this;
  }
  /**
   * Returns the point along this ray that is closest to the given point.
   *
   * @param {Vector3} point - A point in 3D space to get the closet location on the ray for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on this ray.
   */
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const i = t.dot(this.direction);
    return i < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, i);
  }
  /**
   * Returns the distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The distance.
   */
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  /**
   * Returns the squared distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The squared distance.
   */
  distanceSqToPoint(e) {
    const t = pn.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (pn.copy(this.origin).addScaledVector(this.direction, t), pn.distanceToSquared(e));
  }
  /**
   * Returns the squared distance between this ray and the given line segment.
   *
   * @param {Vector3} v0 - The start point of the line segment.
   * @param {Vector3} v1 - The end point of the line segment.
   * @param {Vector3} [optionalPointOnRay] - When provided, it receives the point on this ray that is closest to the segment.
   * @param {Vector3} [optionalPointOnSegment] - When provided, it receives the point on the line segment that is closest to this ray.
   * @return {number} The squared distance.
   */
  distanceSqToSegment(e, t, i, r) {
    Yr.copy(e).add(t).multiplyScalar(0.5), tr.copy(t).sub(e).normalize(), wn.copy(this.origin).sub(Yr);
    const s = e.distanceTo(t) * 0.5, a = -this.direction.dot(tr), o = wn.dot(this.direction), l = -wn.dot(tr), c = wn.lengthSq(), d = Math.abs(1 - a * a);
    let u, f, p, x;
    if (d > 0)
      if (u = a * l - o, f = a * o - l, x = s * d, u >= 0)
        if (f >= -x)
          if (f <= x) {
            const v = 1 / d;
            u *= v, f *= v, p = u * (u + a * f + 2 * o) + f * (a * u + f + 2 * l) + c;
          } else
            f = s, u = Math.max(0, -(a * f + o)), p = -u * u + f * (f + 2 * l) + c;
        else
          f = -s, u = Math.max(0, -(a * f + o)), p = -u * u + f * (f + 2 * l) + c;
      else
        f <= -x ? (u = Math.max(0, -(-a * s + o)), f = u > 0 ? -s : Math.min(Math.max(-s, -l), s), p = -u * u + f * (f + 2 * l) + c) : f <= x ? (u = 0, f = Math.min(Math.max(-s, -l), s), p = f * (f + 2 * l) + c) : (u = Math.max(0, -(a * s + o)), f = u > 0 ? s : Math.min(Math.max(-s, -l), s), p = -u * u + f * (f + 2 * l) + c);
    else
      f = a > 0 ? -s : s, u = Math.max(0, -(a * f + o)), p = -u * u + f * (f + 2 * l) + c;
    return i && i.copy(this.origin).addScaledVector(this.direction, u), r && r.copy(Yr).addScaledVector(tr, f), p;
  }
  /**
   * Intersects this ray with the given sphere, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectSphere(e, t) {
    pn.subVectors(e.center, this.origin);
    const i = pn.dot(this.direction), r = pn.dot(pn) - i * i, s = e.radius * e.radius;
    if (r > s) return null;
    const a = Math.sqrt(s - r), o = i - a, l = i + a;
    return l < 0 ? null : o < 0 ? this.at(l, t) : this.at(o, t);
  }
  /**
   * Returns `true` if this ray intersects with the given sphere.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @return {boolean} Whether this ray intersects with the given sphere or not.
   */
  intersectsSphere(e) {
    return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  /**
   * Computes the distance from the ray's origin to the given plane. Returns `null` if the ray
   * does not intersect with the plane.
   *
   * @param {Plane} plane - The plane to compute the distance to.
   * @return {?number} Whether this ray intersects with the given sphere or not.
   */
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const i = -(this.origin.dot(e.normal) + e.constant) / t;
    return i >= 0 ? i : null;
  }
  /**
   * Intersects this ray with the given plane, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Plane} plane - The plane to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectPlane(e, t) {
    const i = this.distanceToPlane(e);
    return i === null ? null : this.at(i, t);
  }
  /**
   * Returns `true` if this ray intersects with the given plane.
   *
   * @param {Plane} plane - The plane to intersect.
   * @return {boolean} Whether this ray intersects with the given plane or not.
   */
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  /**
   * Intersects this ray with the given bounding box, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Box3} box - The box to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectBox(e, t) {
    let i, r, s, a, o, l;
    const c = 1 / this.direction.x, d = 1 / this.direction.y, u = 1 / this.direction.z, f = this.origin;
    return c >= 0 ? (i = (e.min.x - f.x) * c, r = (e.max.x - f.x) * c) : (i = (e.max.x - f.x) * c, r = (e.min.x - f.x) * c), d >= 0 ? (s = (e.min.y - f.y) * d, a = (e.max.y - f.y) * d) : (s = (e.max.y - f.y) * d, a = (e.min.y - f.y) * d), i > a || s > r || ((s > i || isNaN(i)) && (i = s), (a < r || isNaN(r)) && (r = a), u >= 0 ? (o = (e.min.z - f.z) * u, l = (e.max.z - f.z) * u) : (o = (e.max.z - f.z) * u, l = (e.min.z - f.z) * u), i > l || o > r) || ((o > i || i !== i) && (i = o), (l < r || r !== r) && (r = l), r < 0) ? null : this.at(i >= 0 ? i : r, t);
  }
  /**
   * Returns `true` if this ray intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this ray intersects with the given box or not.
   */
  intersectsBox(e) {
    return this.intersectBox(e, pn) !== null;
  }
  /**
   * Intersects this ray with the given triangle, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Vector3} a - The first vertex of the triangle.
   * @param {Vector3} b - The second vertex of the triangle.
   * @param {Vector3} c - The third vertex of the triangle.
   * @param {boolean} backfaceCulling - Whether to use backface culling or not.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectTriangle(e, t, i, r, s) {
    $r.subVectors(t, e), nr.subVectors(i, e), Kr.crossVectors($r, nr);
    let a = this.direction.dot(Kr), o;
    if (a > 0) {
      if (r) return null;
      o = 1;
    } else if (a < 0)
      o = -1, a = -a;
    else
      return null;
    wn.subVectors(this.origin, e);
    const l = o * this.direction.dot(nr.crossVectors(wn, nr));
    if (l < 0)
      return null;
    const c = o * this.direction.dot($r.cross(wn));
    if (c < 0 || l + c > a)
      return null;
    const d = -o * wn.dot(Kr);
    return d < 0 ? null : this.at(d / a, s);
  }
  /**
   * Transforms this ray with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix4 - The transformation matrix.
   * @return {Ray} A reference to this ray.
   */
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  /**
   * Returns `true` if this ray is equal with the given one.
   *
   * @param {Ray} ray - The ray to test for equality.
   * @return {boolean} Whether this ray is equal with the given one.
   */
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  /**
   * Returns a new ray with copied values from this instance.
   *
   * @return {Ray} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
class bt {
  /**
   * Constructs a new 4x4 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   */
  constructor(e, t, i, r, s, a, o, l, c, d, u, f, p, x, v, m) {
    bt.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, i, r, s, a, o, l, c, d, u, f, p, x, v, m);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   * @return {Matrix4} A reference to this matrix.
   */
  set(e, t, i, r, s, a, o, l, c, d, u, f, p, x, v, m) {
    const h = this.elements;
    return h[0] = e, h[4] = t, h[8] = i, h[12] = r, h[1] = s, h[5] = a, h[9] = o, h[13] = l, h[2] = c, h[6] = d, h[10] = u, h[14] = f, h[3] = p, h[7] = x, h[11] = v, h[15] = m, this;
  }
  /**
   * Sets this matrix to the 4x4 identity matrix.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix4} A clone of this instance.
   */
  clone() {
    return new bt().fromArray(this.elements);
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix4} m - The matrix to copy.
   * @return {Matrix4} A reference to this matrix.
   */
  copy(e) {
    const t = this.elements, i = e.elements;
    return t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5], t[6] = i[6], t[7] = i[7], t[8] = i[8], t[9] = i[9], t[10] = i[10], t[11] = i[11], t[12] = i[12], t[13] = i[13], t[14] = i[14], t[15] = i[15], this;
  }
  /**
   * Copies the translation component of the given matrix
   * into this matrix's translation component.
   *
   * @param {Matrix4} m - The matrix to copy the translation component.
   * @return {Matrix4} A reference to this matrix.
   */
  copyPosition(e) {
    const t = this.elements, i = e.elements;
    return t[12] = i[12], t[13] = i[13], t[14] = i[14], this;
  }
  /**
   * Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  extractBasis(e, t, i) {
    return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this;
  }
  /**
   * Sets the given basis vectors to this matrix.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeBasis(e, t, i) {
    return this.set(
      e.x,
      t.x,
      i.x,
      0,
      e.y,
      t.y,
      i.y,
      0,
      e.z,
      t.z,
      i.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Extracts the rotation component of the given matrix
   * into this matrix's rotation component.
   *
   * Note: This method does not support reflection matrices.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  extractRotation(e) {
    const t = this.elements, i = e.elements, r = 1 / ri.setFromMatrixColumn(e, 0).length(), s = 1 / ri.setFromMatrixColumn(e, 1).length(), a = 1 / ri.setFromMatrixColumn(e, 2).length();
    return t[0] = i[0] * r, t[1] = i[1] * r, t[2] = i[2] * r, t[3] = 0, t[4] = i[4] * s, t[5] = i[5] * s, t[6] = i[6] * s, t[7] = 0, t[8] = i[8] * a, t[9] = i[9] * a, t[10] = i[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  /**
   * Sets the rotation component (the upper left 3x3 matrix) of this matrix to
   * the rotation specified by the given Euler angles. The rest of
   * the matrix is set to the identity. Depending on the {@link Euler#order},
   * there are six possible outcomes. See [this page](https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix)
   * for a complete list.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromEuler(e) {
    const t = this.elements, i = e.x, r = e.y, s = e.z, a = Math.cos(i), o = Math.sin(i), l = Math.cos(r), c = Math.sin(r), d = Math.cos(s), u = Math.sin(s);
    if (e.order === "XYZ") {
      const f = a * d, p = a * u, x = o * d, v = o * u;
      t[0] = l * d, t[4] = -l * u, t[8] = c, t[1] = p + x * c, t[5] = f - v * c, t[9] = -o * l, t[2] = v - f * c, t[6] = x + p * c, t[10] = a * l;
    } else if (e.order === "YXZ") {
      const f = l * d, p = l * u, x = c * d, v = c * u;
      t[0] = f + v * o, t[4] = x * o - p, t[8] = a * c, t[1] = a * u, t[5] = a * d, t[9] = -o, t[2] = p * o - x, t[6] = v + f * o, t[10] = a * l;
    } else if (e.order === "ZXY") {
      const f = l * d, p = l * u, x = c * d, v = c * u;
      t[0] = f - v * o, t[4] = -a * u, t[8] = x + p * o, t[1] = p + x * o, t[5] = a * d, t[9] = v - f * o, t[2] = -a * c, t[6] = o, t[10] = a * l;
    } else if (e.order === "ZYX") {
      const f = a * d, p = a * u, x = o * d, v = o * u;
      t[0] = l * d, t[4] = x * c - p, t[8] = f * c + v, t[1] = l * u, t[5] = v * c + f, t[9] = p * c - x, t[2] = -c, t[6] = o * l, t[10] = a * l;
    } else if (e.order === "YZX") {
      const f = a * l, p = a * c, x = o * l, v = o * c;
      t[0] = l * d, t[4] = v - f * u, t[8] = x * u + p, t[1] = u, t[5] = a * d, t[9] = -o * d, t[2] = -c * d, t[6] = p * u + x, t[10] = f - v * u;
    } else if (e.order === "XZY") {
      const f = a * l, p = a * c, x = o * l, v = o * c;
      t[0] = l * d, t[4] = -u, t[8] = c * d, t[1] = f * u + v, t[5] = a * d, t[9] = p * u - x, t[2] = x * u - p, t[6] = o * d, t[10] = v * u + f;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  /**
   * Sets the rotation component of this matrix to the rotation specified by
   * the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)
   * The rest of the matrix is set to the identity.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromQuaternion(e) {
    return this.compose(xl, e, gl);
  }
  /**
   * Sets the rotation component of the transformation matrix, looking from `eye` towards
   * `target`, and oriented by the up-direction.
   *
   * @param {Vector3} eye - The eye vector.
   * @param {Vector3} target - The target vector.
   * @param {Vector3} up - The up vector.
   * @return {Matrix4} A reference to this matrix.
   */
  lookAt(e, t, i) {
    const r = this.elements;
    return Vt.subVectors(e, t), Vt.lengthSq() === 0 && (Vt.z = 1), Vt.normalize(), Cn.crossVectors(i, Vt), Cn.lengthSq() === 0 && (Math.abs(i.z) === 1 ? Vt.x += 1e-4 : Vt.z += 1e-4, Vt.normalize(), Cn.crossVectors(i, Vt)), Cn.normalize(), ir.crossVectors(Vt, Cn), r[0] = Cn.x, r[4] = ir.x, r[8] = Vt.x, r[1] = Cn.y, r[5] = ir.y, r[9] = Vt.y, r[2] = Cn.z, r[6] = ir.z, r[10] = Vt.z, this;
  }
  /**
   * Post-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  /**
   * Pre-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  /**
   * Multiples the given 4x4 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix4} a - The first matrix.
   * @param {Matrix4} b - The second matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyMatrices(e, t) {
    const i = e.elements, r = t.elements, s = this.elements, a = i[0], o = i[4], l = i[8], c = i[12], d = i[1], u = i[5], f = i[9], p = i[13], x = i[2], v = i[6], m = i[10], h = i[14], T = i[3], E = i[7], A = i[11], D = i[15], y = r[0], P = r[4], O = r[8], M = r[12], S = r[1], L = r[5], z = r[9], H = r[13], q = r[2], K = r[6], Y = r[10], te = r[14], W = r[3], Q = r[7], re = r[11], Me = r[15];
    return s[0] = a * y + o * S + l * q + c * W, s[4] = a * P + o * L + l * K + c * Q, s[8] = a * O + o * z + l * Y + c * re, s[12] = a * M + o * H + l * te + c * Me, s[1] = d * y + u * S + f * q + p * W, s[5] = d * P + u * L + f * K + p * Q, s[9] = d * O + u * z + f * Y + p * re, s[13] = d * M + u * H + f * te + p * Me, s[2] = x * y + v * S + m * q + h * W, s[6] = x * P + v * L + m * K + h * Q, s[10] = x * O + v * z + m * Y + h * re, s[14] = x * M + v * H + m * te + h * Me, s[3] = T * y + E * S + A * q + D * W, s[7] = T * P + E * L + A * K + D * Q, s[11] = T * O + E * z + A * Y + D * re, s[15] = T * M + E * H + A * te + D * Me, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * Based on the method outlined [here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.html).
   *
   * @return {number} The determinant.
   */
  determinant() {
    const e = this.elements, t = e[0], i = e[4], r = e[8], s = e[12], a = e[1], o = e[5], l = e[9], c = e[13], d = e[2], u = e[6], f = e[10], p = e[14], x = e[3], v = e[7], m = e[11], h = e[15];
    return x * (+s * l * u - r * c * u - s * o * f + i * c * f + r * o * p - i * l * p) + v * (+t * l * p - t * c * f + s * a * f - r * a * p + r * c * d - s * l * d) + m * (+t * c * u - t * o * p - s * a * u + i * a * p + s * o * d - i * c * d) + h * (-r * o * d - t * l * u + t * o * f + r * a * u - i * a * f + i * l * d);
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  /**
   * Sets the position component for this matrix from the given vector,
   * without affecting the rest of the matrix.
   *
   * @param {number|Vector3} x - The x component of the vector or alternatively the vector object.
   * @param {number} y - The y component of the vector.
   * @param {number} z - The z component of the vector.
   * @return {Matrix4} A reference to this matrix.
   */
  setPosition(e, t, i) {
    const r = this.elements;
    return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = i), this;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  invert() {
    const e = this.elements, t = e[0], i = e[1], r = e[2], s = e[3], a = e[4], o = e[5], l = e[6], c = e[7], d = e[8], u = e[9], f = e[10], p = e[11], x = e[12], v = e[13], m = e[14], h = e[15], T = u * m * c - v * f * c + v * l * p - o * m * p - u * l * h + o * f * h, E = x * f * c - d * m * c - x * l * p + a * m * p + d * l * h - a * f * h, A = d * v * c - x * u * c + x * o * p - a * v * p - d * o * h + a * u * h, D = x * u * l - d * v * l - x * o * f + a * v * f + d * o * m - a * u * m, y = t * T + i * E + r * A + s * D;
    if (y === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const P = 1 / y;
    return e[0] = T * P, e[1] = (v * f * s - u * m * s - v * r * p + i * m * p + u * r * h - i * f * h) * P, e[2] = (o * m * s - v * l * s + v * r * c - i * m * c - o * r * h + i * l * h) * P, e[3] = (u * l * s - o * f * s - u * r * c + i * f * c + o * r * p - i * l * p) * P, e[4] = E * P, e[5] = (d * m * s - x * f * s + x * r * p - t * m * p - d * r * h + t * f * h) * P, e[6] = (x * l * s - a * m * s - x * r * c + t * m * c + a * r * h - t * l * h) * P, e[7] = (a * f * s - d * l * s + d * r * c - t * f * c - a * r * p + t * l * p) * P, e[8] = A * P, e[9] = (x * u * s - d * v * s - x * i * p + t * v * p + d * i * h - t * u * h) * P, e[10] = (a * v * s - x * o * s + x * i * c - t * v * c - a * i * h + t * o * h) * P, e[11] = (d * o * s - a * u * s - d * i * c + t * u * c + a * i * p - t * o * p) * P, e[12] = D * P, e[13] = (d * v * r - x * u * r + x * i * f - t * v * f - d * i * m + t * u * m) * P, e[14] = (x * o * r - a * v * r - x * i * l + t * v * l + a * i * m - t * o * m) * P, e[15] = (a * u * r - d * o * r + d * i * l - t * u * l - a * i * f + t * o * f) * P, this;
  }
  /**
   * Multiplies the columns of this matrix by the given vector.
   *
   * @param {Vector3} v - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  scale(e) {
    const t = this.elements, i = e.x, r = e.y, s = e.z;
    return t[0] *= i, t[4] *= r, t[8] *= s, t[1] *= i, t[5] *= r, t[9] *= s, t[2] *= i, t[6] *= r, t[10] *= s, t[3] *= i, t[7] *= r, t[11] *= s, this;
  }
  /**
   * Gets the maximum scale value of the three axes.
   *
   * @return {number} The maximum scale.
   */
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], i = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, i, r));
  }
  /**
   * Sets this matrix as a translation transform from the given vector.
   *
   * @param {number|Vector3} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @param {number} z - The amount to translate in the z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeTranslation(e, t, i) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      i,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the X axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationX(e) {
    const t = Math.cos(e), i = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -i,
      0,
      0,
      i,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Y axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationY(e) {
    const t = Math.cos(e), i = Math.sin(e);
    return this.set(
      t,
      0,
      i,
      0,
      0,
      1,
      0,
      0,
      -i,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Z axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationZ(e) {
    const t = Math.cos(e), i = Math.sin(e);
    return this.set(
      t,
      -i,
      0,
      0,
      i,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the given axis by
   * the given angle.
   *
   * This is a somewhat controversial but mathematically sound alternative to
   * rotating via Quaternions. See the discussion [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199).
   *
   * @param {Vector3} axis - The normalized rotation axis.
   * @param {number} angle - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationAxis(e, t) {
    const i = Math.cos(t), r = Math.sin(t), s = 1 - i, a = e.x, o = e.y, l = e.z, c = s * a, d = s * o;
    return this.set(
      c * a + i,
      c * o - r * l,
      c * l + r * o,
      0,
      c * o + r * l,
      d * o + i,
      d * l - r * a,
      0,
      c * l - r * o,
      d * l + r * a,
      s * l * l + i,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a scale transformation.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @param {number} z - The amount to scale in the Z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeScale(e, t, i) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      i,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a shear transformation.
   *
   * @param {number} xy - The amount to shear X by Y.
   * @param {number} xz - The amount to shear X by Z.
   * @param {number} yx - The amount to shear Y by X.
   * @param {number} yz - The amount to shear Y by Z.
   * @param {number} zx - The amount to shear Z by X.
   * @param {number} zy - The amount to shear Z by Y.
   * @return {Matrix4} A reference to this matrix.
   */
  makeShear(e, t, i, r, s, a) {
    return this.set(
      1,
      i,
      s,
      0,
      e,
      1,
      a,
      0,
      t,
      r,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix to the transformation composed of the given position,
   * rotation (Quaternion) and scale.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  compose(e, t, i) {
    const r = this.elements, s = t._x, a = t._y, o = t._z, l = t._w, c = s + s, d = a + a, u = o + o, f = s * c, p = s * d, x = s * u, v = a * d, m = a * u, h = o * u, T = l * c, E = l * d, A = l * u, D = i.x, y = i.y, P = i.z;
    return r[0] = (1 - (v + h)) * D, r[1] = (p + A) * D, r[2] = (x - E) * D, r[3] = 0, r[4] = (p - A) * y, r[5] = (1 - (f + h)) * y, r[6] = (m + T) * y, r[7] = 0, r[8] = (x + E) * P, r[9] = (m - T) * P, r[10] = (1 - (f + v)) * P, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
  }
  /**
   * Decomposes this matrix into its position, rotation and scale components
   * and provides the result in the given objects.
   *
   * Note: Not all matrices are decomposable in this way. For example, if an
   * object has a non-uniformly scaled parent, then the object's world matrix
   * may not be decomposable, and this method may not be appropriate.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  decompose(e, t, i) {
    const r = this.elements;
    let s = ri.set(r[0], r[1], r[2]).length();
    const a = ri.set(r[4], r[5], r[6]).length(), o = ri.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (s = -s), e.x = r[12], e.y = r[13], e.z = r[14], tn.copy(this);
    const c = 1 / s, d = 1 / a, u = 1 / o;
    return tn.elements[0] *= c, tn.elements[1] *= c, tn.elements[2] *= c, tn.elements[4] *= d, tn.elements[5] *= d, tn.elements[6] *= d, tn.elements[8] *= u, tn.elements[9] *= u, tn.elements[10] *= u, t.setFromRotationMatrix(tn), i.x = s, i.y = a, i.z = o, this;
  }
  /**
  	 * Creates a perspective projection matrix. This is used internally by
  	 * {@link PerspectiveCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makePerspective(e, t, i, r, s, a, o = 2e3, l = !1) {
    const c = this.elements, d = 2 * s / (t - e), u = 2 * s / (i - r), f = (t + e) / (t - e), p = (i + r) / (i - r);
    let x, v;
    if (l)
      x = s / (a - s), v = a * s / (a - s);
    else if (o === 2e3)
      x = -(a + s) / (a - s), v = -2 * a * s / (a - s);
    else if (o === 2001)
      x = -a / (a - s), v = -a * s / (a - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return c[0] = d, c[4] = 0, c[8] = f, c[12] = 0, c[1] = 0, c[5] = u, c[9] = p, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = x, c[14] = v, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
  }
  /**
  	 * Creates a orthographic projection matrix. This is used internally by
  	 * {@link OrthographicCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makeOrthographic(e, t, i, r, s, a, o = 2e3, l = !1) {
    const c = this.elements, d = 2 / (t - e), u = 2 / (i - r), f = -(t + e) / (t - e), p = -(i + r) / (i - r);
    let x, v;
    if (l)
      x = 1 / (a - s), v = a / (a - s);
    else if (o === 2e3)
      x = -2 / (a - s), v = -(a + s) / (a - s);
    else if (o === 2001)
      x = -1 / (a - s), v = -s / (a - s);
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return c[0] = d, c[4] = 0, c[8] = 0, c[12] = f, c[1] = 0, c[5] = u, c[9] = 0, c[13] = p, c[2] = 0, c[6] = 0, c[10] = x, c[14] = v, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix4} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(e) {
    const t = this.elements, i = e.elements;
    for (let r = 0; r < 16; r++)
      if (t[r] !== i[r]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix4} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let i = 0; i < 16; i++)
      this.elements[i] = e[i + t];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(e = [], t = 0) {
    const i = this.elements;
    return e[t] = i[0], e[t + 1] = i[1], e[t + 2] = i[2], e[t + 3] = i[3], e[t + 4] = i[4], e[t + 5] = i[5], e[t + 6] = i[6], e[t + 7] = i[7], e[t + 8] = i[8], e[t + 9] = i[9], e[t + 10] = i[10], e[t + 11] = i[11], e[t + 12] = i[12], e[t + 13] = i[13], e[t + 14] = i[14], e[t + 15] = i[15], e;
  }
}
const ri = /* @__PURE__ */ new G(), tn = /* @__PURE__ */ new bt(), xl = /* @__PURE__ */ new G(0, 0, 0), gl = /* @__PURE__ */ new G(1, 1, 1), Cn = /* @__PURE__ */ new G(), ir = /* @__PURE__ */ new G(), Vt = /* @__PURE__ */ new G(), ca = /* @__PURE__ */ new bt(), da = /* @__PURE__ */ new qi();
class yn {
  /**
   * Constructs a new euler instance.
   *
   * @param {number} [x=0] - The angle of the x axis in radians.
   * @param {number} [y=0] - The angle of the y axis in radians.
   * @param {number} [z=0] - The angle of the z axis in radians.
   * @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
   */
  constructor(e = 0, t = 0, i = 0, r = yn.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = i, this._order = r;
  }
  /**
   * The angle of the x axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  /**
   * The angle of the y axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  /**
   * The angle of the z axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  /**
   * A string representing the order that the rotations are applied.
   *
   * @type {string}
   * @default 'XYZ'
   */
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  /**
   * Sets the Euler components.
   *
   * @param {number} x - The angle of the x axis in radians.
   * @param {number} y - The angle of the y axis in radians.
   * @param {number} z - The angle of the z axis in radians.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  set(e, t, i, r = this._order) {
    return this._x = e, this._y = t, this._z = i, this._order = r, this._onChangeCallback(), this;
  }
  /**
   * Returns a new Euler instance with copied values from this instance.
   *
   * @return {Euler} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  /**
   * Copies the values of the given Euler instance to this instance.
   *
   * @param {Euler} euler - The Euler instance to copy.
   * @return {Euler} A reference to this Euler instance.
   */
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a pure rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromRotationMatrix(e, t = this._order, i = !0) {
    const r = e.elements, s = r[0], a = r[4], o = r[8], l = r[1], c = r[5], d = r[9], u = r[2], f = r[6], p = r[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(Ye(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-d, p), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(f, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Ye(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(o, p), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-u, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Ye(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._y = Math.atan2(-u, p), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-Ye(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(f, p), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(Ye(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-d, c), this._y = Math.atan2(-u, s)) : (this._x = 0, this._y = Math.atan2(o, p));
        break;
      case "XZY":
        this._z = Math.asin(-Ye(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(f, c), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-d, p), this._y = 0);
        break;
      default:
        Oe("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, i === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a normalized quaternion.
   *
   * @param {Quaternion} q - A normalized Quaternion.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromQuaternion(e, t, i) {
    return ca.makeRotationFromQuaternion(e), this.setFromRotationMatrix(ca, t, i);
  }
  /**
   * Sets the angles of this Euler instance from the given vector.
   *
   * @param {Vector3} v - The vector.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  /**
   * Resets the euler angle with a new order by creating a quaternion from this
   * euler angle and then setting this euler angle with the quaternion and the
   * new order.
   *
   * Warning: This discards revolution information.
   *
   * @param {string} [newOrder] - A string representing the new order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  reorder(e) {
    return da.setFromEuler(this), this.setFromQuaternion(da, e);
  }
  /**
   * Returns `true` if this Euler instance is equal with the given one.
   *
   * @param {Euler} euler - The Euler instance to test for equality.
   * @return {boolean} Whether this Euler instance is equal with the given one.
   */
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  /**
   * Sets this Euler instance's components to values from the given array. The first three
   * entries of the array are assign to the x,y and z components. An optional fourth entry
   * defines the Euler order.
   *
   * @param {Array<number,number,number,?string>} array - An array holding the Euler component values.
   * @return {Euler} A reference to this Euler instance.
   */
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this Euler instance to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number,number,number,string>} The Euler components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
yn.DEFAULT_ORDER = "XYZ";
class ao {
  /**
   * Constructs a new layers instance, with membership
   * initially set to layer `0`.
   */
  constructor() {
    this.mask = 1;
  }
  /**
   * Sets membership to the given layer, and remove membership all other layers.
   *
   * @param {number} layer - The layer to set.
   */
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  /**
   * Adds membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  /**
   * Adds membership to all layers.
   */
  enableAll() {
    this.mask = -1;
  }
  /**
   * Toggles the membership of the given layer.
   *
   * @param {number} layer - The layer to toggle.
   */
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  /**
   * Removes membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  /**
   * Removes the membership from all layers.
   */
  disableAll() {
    this.mask = 0;
  }
  /**
   * Returns `true` if this and the given layers object have at least one
   * layer in common.
   *
   * @param {Layers} layers - The layers to test.
   * @return {boolean } Whether this and the given layers object have at least one layer in common or not.
   */
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  /**
   * Returns `true` if the given layer is enabled.
   *
   * @param {number} layer - The layer to test.
   * @return {boolean } Whether the given layer is enabled or not.
   */
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let _l = 0;
const ua = /* @__PURE__ */ new G(), si = /* @__PURE__ */ new qi(), mn = /* @__PURE__ */ new bt(), rr = /* @__PURE__ */ new G(), Pi = /* @__PURE__ */ new G(), vl = /* @__PURE__ */ new G(), Sl = /* @__PURE__ */ new qi(), fa = /* @__PURE__ */ new G(1, 0, 0), ha = /* @__PURE__ */ new G(0, 1, 0), pa = /* @__PURE__ */ new G(0, 0, 1), ma = { type: "added" }, Ml = { type: "removed" }, ai = { type: "childadded", child: null }, Zr = { type: "childremoved", child: null };
class qt extends Ei {
  /**
   * Constructs a new 3D object.
   */
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: _l++ }), this.uuid = Xi(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = qt.DEFAULT_UP.clone();
    const e = new G(), t = new yn(), i = new qi(), r = new G(1, 1, 1);
    function s() {
      i.setFromEuler(t, !1);
    }
    function a() {
      t.setFromQuaternion(i, void 0, !1);
    }
    t._onChange(s), i._onChange(a), Object.defineProperties(this, {
      /**
       * Represents the object's local position.
       *
       * @name Object3D#position
       * @type {Vector3}
       * @default (0,0,0)
       */
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      /**
       * Represents the object's local rotation as Euler angles, in radians.
       *
       * @name Object3D#rotation
       * @type {Euler}
       * @default (0,0,0)
       */
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      /**
       * Represents the object's local rotation as Quaternions.
       *
       * @name Object3D#quaternion
       * @type {Quaternion}
       */
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: i
      },
      /**
       * Represents the object's local scale.
       *
       * @name Object3D#scale
       * @type {Vector3}
       * @default (1,1,1)
       */
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      /**
       * Represents the object's model-view matrix.
       *
       * @name Object3D#modelViewMatrix
       * @type {Matrix4}
       */
      modelViewMatrix: {
        value: new bt()
      },
      /**
       * Represents the object's normal matrix.
       *
       * @name Object3D#normalMatrix
       * @type {Matrix3}
       */
      normalMatrix: {
        value: new Be()
      }
    }), this.matrix = new bt(), this.matrixWorld = new bt(), this.matrixAutoUpdate = qt.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new ao(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.userData = {};
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeShadow() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onAfterShadow() {
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onAfterRender() {
  }
  /**
   * Applies the given transformation matrix to the object and updates the object's position,
   * rotation and scale.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   */
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  /**
   * Applies a rotation represented by given the quaternion to the 3D object.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Object3D} A reference to this instance.
   */
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  /**
   * Sets the given rotation represented as an axis/angle couple to the 3D object.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   */
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  /**
   * Sets the given rotation represented as Euler angles to the 3D object.
   *
   * @param {Euler} euler - The Euler angles.
   */
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  /**
   * Sets the given rotation represented as rotation matrix to the 3D object.
   *
   * @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be
   * a pure rotation matrix (i.e, unscaled).
   */
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  /**
   * Sets the given rotation represented as a Quaternion to the 3D object.
   *
   * @param {Quaternion} q - The Quaternion
   */
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  /**
   * Rotates the 3D object along an axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnAxis(e, t) {
    return si.setFromAxisAngle(e, t), this.quaternion.multiply(si), this;
  }
  /**
   * Rotates the 3D object along an axis in world space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnWorldAxis(e, t) {
    return si.setFromAxisAngle(e, t), this.quaternion.premultiply(si), this;
  }
  /**
   * Rotates the 3D object around its X axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateX(e) {
    return this.rotateOnAxis(fa, e);
  }
  /**
   * Rotates the 3D object around its Y axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateY(e) {
    return this.rotateOnAxis(ha, e);
  }
  /**
   * Rotates the 3D object around its Z axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateZ(e) {
    return this.rotateOnAxis(pa, e);
  }
  /**
   * Translate the 3D object by a distance along the given axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateOnAxis(e, t) {
    return ua.copy(e).applyQuaternion(this.quaternion), this.position.add(ua.multiplyScalar(t)), this;
  }
  /**
   * Translate the 3D object by a distance along its X-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateX(e) {
    return this.translateOnAxis(fa, e);
  }
  /**
   * Translate the 3D object by a distance along its Y-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateY(e) {
    return this.translateOnAxis(ha, e);
  }
  /**
   * Translate the 3D object by a distance along its Z-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateZ(e) {
    return this.translateOnAxis(pa, e);
  }
  /**
   * Converts the given vector from this 3D object's local space to world space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  /**
   * Converts the given vector from this 3D object's word space to local space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(mn.copy(this.matrixWorld).invert());
  }
  /**
   * Rotates the object to face a point in world space.
   *
   * This method does not support objects having non-uniformly-scaled parent(s).
   *
   * @param {number|Vector3} x - The x coordinate in world space. Alternatively, a vector representing a position in world space
   * @param {number} [y] - The y coordinate in world space.
   * @param {number} [z] - The z coordinate in world space.
   */
  lookAt(e, t, i) {
    e.isVector3 ? rr.copy(e) : rr.set(e, t, i);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), Pi.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? mn.lookAt(Pi, rr, this.up) : mn.lookAt(rr, Pi, this.up), this.quaternion.setFromRotationMatrix(mn), r && (mn.extractRotation(r.matrixWorld), si.setFromRotationMatrix(mn), this.quaternion.premultiply(si.invert()));
  }
  /**
   * Adds the given 3D object as a child to this 3D object. An arbitrary number of
   * objects may be added. Any current parent on an object passed in here will be
   * removed, since an object can have at most one parent.
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to add.
   * @return {Object3D} A reference to this instance.
   */
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (gt("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(ma), ai.child = e, this.dispatchEvent(ai), ai.child = null) : gt("Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  /**
   * Removes the given 3D object as child from this 3D object.
   * An arbitrary number of objects may be removed.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @param {Object3D} object - The 3D object to remove.
   * @return {Object3D} A reference to this instance.
   */
  remove(e) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++)
        this.remove(arguments[i]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Ml), Zr.child = e, this.dispatchEvent(Zr), Zr.child = null), this;
  }
  /**
   * Removes this 3D object from its current parent.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  /**
   * Removes all child objects.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  clear() {
    return this.remove(...this.children);
  }
  /**
   * Adds the given 3D object as a child of this 3D object, while maintaining the object's world
   * transform. This method does not support scene graphs having non-uniformly-scaled nodes(s).
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to attach.
   * @return {Object3D} A reference to this instance.
   */
  attach(e) {
    return this.updateWorldMatrix(!0, !1), mn.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), mn.multiply(e.parent.matrixWorld)), e.applyMatrix4(mn), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(ma), ai.child = e, this.dispatchEvent(ai), ai.child = null, this;
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching ID.
   *
   * @param {number} id - The id.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching name.
   *
   * @param {string} name - The name.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let i = 0, r = this.children.length; i < r; i++) {
      const a = this.children[i].getObjectByProperty(e, t);
      if (a !== void 0)
        return a;
    }
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns all 3D objects with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @param {Array<Object3D>} result - The method stores the result in this array.
   * @return {Array<Object3D>} The found 3D objects.
   */
  getObjectsByProperty(e, t, i = []) {
    this[e] === t && i.push(this);
    const r = this.children;
    for (let s = 0, a = r.length; s < a; s++)
      r[s].getObjectsByProperty(e, t, i);
    return i;
  }
  /**
   * Returns a vector representing the position of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's position in world space.
   */
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  /**
   * Returns a Quaternion representing the position of the 3D object in world space.
   *
   * @param {Quaternion} target - The target Quaternion the result is stored to.
   * @return {Quaternion} The 3D object's rotation in world space.
   */
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Pi, e, vl), e;
  }
  /**
   * Returns a vector representing the scale of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's scale in world space.
   */
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Pi, Sl, e), e;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  /**
   * Abstract method to get intersections between a casted ray and this
   * 3D object. Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points}
   * implement this method in order to use raycasting.
   *
   * @abstract
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - An array holding the result of the method.
   */
  raycast() {
  }
  /**
   * Executes the callback on this 3D object and all descendants.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverse(e) {
    e(this);
    const t = this.children;
    for (let i = 0, r = t.length; i < r; i++)
      t[i].traverse(e);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for visible 3D objects.
   * Descendants of invisible 3D objects are not traversed.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let i = 0, r = t.length; i < r; i++)
      t[i].traverseVisible(e);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for all ancestors.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  /**
   * Updates the transformation matrix in local space by computing it from the current
   * position, rotation and scale values.
   */
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  /**
   * Updates the transformation matrix in world space of this 3D objects and its descendants.
   *
   * To ensure correct results, this method also recomputes the 3D object's transformation matrix in
   * local space. The computation of the local and world matrix can be controlled with the
   * {@link Object3D#matrixAutoUpdate} and {@link Object3D#matrixWorldAutoUpdate} flags which are both
   * `true` by default.  Set these flags to `false` if you need more control over the update matrix process.
   *
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldAutoUpdate} is set to `false`.
   */
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let i = 0, r = t.length; i < r; i++)
      t[i].updateMatrixWorld(e);
  }
  /**
   * An alternative version of {@link Object3D#updateMatrixWorld} with more control over the
   * update of ancestor and descendant nodes.
   *
   * @param {boolean} [updateParents=false] Whether ancestor nodes should be updated or not.
   * @param {boolean} [updateChildren=false] Whether descendant nodes should be updated or not.
   */
  updateWorldMatrix(e, t) {
    const i = this.parent;
    if (e === !0 && i !== null && i.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), t === !0) {
      const r = this.children;
      for (let s = 0, a = r.length; s < a; s++)
        r[s].updateWorldMatrix(!1, !0);
    }
  }
  /**
   * Serializes the 3D object into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized 3D object.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", i = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, i.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((o) => ({
      ...o,
      boundingBox: o.boundingBox ? o.boundingBox.toJSON() : void 0,
      boundingSphere: o.boundingSphere ? o.boundingSphere.toJSON() : void 0
    })), r.instanceInfo = this._instanceInfo.map((o) => ({ ...o })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
    function s(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(e)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(e.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l))
          for (let c = 0, d = l.length; c < d; c++) {
            const u = l[c];
            s(e.shapes, u);
          }
        else
          s(e.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let l = 0, c = this.material.length; l < c; l++)
          o.push(s(e.materials, this.material[l]));
        r.material = o;
      } else
        r.material = s(e.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++)
        r.children.push(this.children[o].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        r.animations.push(s(e.animations, l));
      }
    }
    if (t) {
      const o = a(e.geometries), l = a(e.materials), c = a(e.textures), d = a(e.images), u = a(e.shapes), f = a(e.skeletons), p = a(e.animations), x = a(e.nodes);
      o.length > 0 && (i.geometries = o), l.length > 0 && (i.materials = l), c.length > 0 && (i.textures = c), d.length > 0 && (i.images = d), u.length > 0 && (i.shapes = u), f.length > 0 && (i.skeletons = f), p.length > 0 && (i.animations = p), x.length > 0 && (i.nodes = x);
    }
    return i.object = r, i;
    function a(o) {
      const l = [];
      for (const c in o) {
        const d = o[c];
        delete d.metadata, l.push(d);
      }
      return l;
    }
  }
  /**
   * Returns a new 3D object with copied values from this instance.
   *
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are also cloned.
   * @return {Object3D} A clone of this instance.
   */
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  /**
   * Copies the values of the given 3D object to this instance.
   *
   * @param {Object3D} source - The 3D object to copy.
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are cloned.
   * @return {Object3D} A reference to this instance.
   */
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let i = 0; i < e.children.length; i++) {
        const r = e.children[i];
        this.add(r.clone());
      }
    return this;
  }
}
qt.DEFAULT_UP = /* @__PURE__ */ new G(0, 1, 0);
qt.DEFAULT_MATRIX_AUTO_UPDATE = !0;
qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const nn = /* @__PURE__ */ new G(), xn = /* @__PURE__ */ new G(), jr = /* @__PURE__ */ new G(), gn = /* @__PURE__ */ new G(), oi = /* @__PURE__ */ new G(), li = /* @__PURE__ */ new G(), xa = /* @__PURE__ */ new G(), Jr = /* @__PURE__ */ new G(), Qr = /* @__PURE__ */ new G(), es = /* @__PURE__ */ new G(), ts = /* @__PURE__ */ new _t(), ns = /* @__PURE__ */ new _t(), is = /* @__PURE__ */ new _t();
class sn {
  /**
   * Constructs a new triangle.
   *
   * @param {Vector3} [a=(0,0,0)] - The first corner of the triangle.
   * @param {Vector3} [b=(0,0,0)] - The second corner of the triangle.
   * @param {Vector3} [c=(0,0,0)] - The third corner of the triangle.
   */
  constructor(e = new G(), t = new G(), i = new G()) {
    this.a = e, this.b = t, this.c = i;
  }
  /**
   * Computes the normal vector of a triangle.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  static getNormal(e, t, i, r) {
    r.subVectors(i, t), nn.subVectors(e, t), r.cross(nn);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  static getBarycoord(e, t, i, r, s) {
    nn.subVectors(r, t), xn.subVectors(i, t), jr.subVectors(e, t);
    const a = nn.dot(nn), o = nn.dot(xn), l = nn.dot(jr), c = xn.dot(xn), d = xn.dot(jr), u = a * c - o * o;
    if (u === 0)
      return s.set(0, 0, 0), null;
    const f = 1 / u, p = (c * l - o * d) * f, x = (a * d - o * l) * f;
    return s.set(1 - p - x, x, p);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  static containsPoint(e, t, i, r) {
    return this.getBarycoord(e, t, i, r, gn) === null ? !1 : gn.x >= 0 && gn.y >= 0 && gn.x + gn.y <= 1;
  }
  /**
   * Computes the value barycentrically interpolated for the given point on the
   * triangle. Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - Position of interpolated point.
   * @param {Vector3} p1 - The first corner of the triangle.
   * @param {Vector3} p2 - The second corner of the triangle.
   * @param {Vector3} p3 - The third corner of the triangle.
   * @param {Vector3} v1 - Value to interpolate of first vertex.
   * @param {Vector3} v2 - Value to interpolate of second vertex.
   * @param {Vector3} v3 - Value to interpolate of third vertex.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The interpolated value.
   */
  static getInterpolation(e, t, i, r, s, a, o, l) {
    return this.getBarycoord(e, t, i, r, gn) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, gn.x), l.addScaledVector(a, gn.y), l.addScaledVector(o, gn.z), l);
  }
  /**
   * Computes the value barycentrically interpolated for the given attribute and indices.
   *
   * @param {BufferAttribute} attr - The attribute to interpolate.
   * @param {number} i1 - Index of first vertex.
   * @param {number} i2 - Index of second vertex.
   * @param {number} i3 - Index of third vertex.
   * @param {Vector3} barycoord - The barycoordinate value to use to interpolate.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The interpolated attribute value.
   */
  static getInterpolatedAttribute(e, t, i, r, s, a) {
    return ts.setScalar(0), ns.setScalar(0), is.setScalar(0), ts.fromBufferAttribute(e, t), ns.fromBufferAttribute(e, i), is.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(ts, s.x), a.addScaledVector(ns, s.y), a.addScaledVector(is, s.z), a;
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  static isFrontFacing(e, t, i, r) {
    return nn.subVectors(i, t), xn.subVectors(e, t), nn.cross(xn).dot(r) < 0;
  }
  /**
   * Sets the triangle's vertices by copying the given values.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  set(e, t, i) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(i), this;
  }
  /**
   * Sets the triangle's vertices by copying the given array values.
   *
   * @param {Array<Vector3>} points - An array with 3D points.
   * @param {number} i0 - The array index representing the first corner of the triangle.
   * @param {number} i1 - The array index representing the second corner of the triangle.
   * @param {number} i2 - The array index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromPointsAndIndices(e, t, i, r) {
    return this.a.copy(e[t]), this.b.copy(e[i]), this.c.copy(e[r]), this;
  }
  /**
   * Sets the triangle's vertices by copying the given attribute values.
   *
   * @param {BufferAttribute} attribute - A buffer attribute with 3D points data.
   * @param {number} i0 - The attribute index representing the first corner of the triangle.
   * @param {number} i1 - The attribute index representing the second corner of the triangle.
   * @param {number} i2 - The attribute index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromAttributeAndIndices(e, t, i, r) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, i), this.c.fromBufferAttribute(e, r), this;
  }
  /**
   * Returns a new triangle with copied values from this instance.
   *
   * @return {Triangle} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given triangle to this instance.
   *
   * @param {Triangle} triangle - The triangle to copy.
   * @return {Triangle} A reference to this triangle.
   */
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  /**
   * Computes the area of the triangle.
   *
   * @return {number} The triangle's area.
   */
  getArea() {
    return nn.subVectors(this.c, this.b), xn.subVectors(this.a, this.b), nn.cross(xn).length() * 0.5;
  }
  /**
   * Computes the midpoint of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's midpoint.
   */
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  /**
   * Computes the normal of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  getNormal(e) {
    return sn.getNormal(this.a, this.b, this.c, e);
  }
  /**
   * Computes a plane the triangle lies within.
   *
   * @param {Plane} target - The target vector that is used to store the method's result.
   * @return {Plane} The plane the triangle lies within.
   */
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  getBarycoord(e, t) {
    return sn.getBarycoord(e, this.a, this.b, this.c, t);
  }
  /**
   * Computes the value barycentrically interpolated for the given point on the
   * triangle. Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - Position of interpolated point.
   * @param {Vector3} v1 - Value to interpolate of first vertex.
   * @param {Vector3} v2 - Value to interpolate of second vertex.
   * @param {Vector3} v3 - Value to interpolate of third vertex.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The interpolated value.
   */
  getInterpolation(e, t, i, r, s) {
    return sn.getInterpolation(e, this.a, this.b, this.c, t, i, r, s);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  containsPoint(e) {
    return sn.containsPoint(e, this.a, this.b, this.c);
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  isFrontFacing(e) {
    return sn.isFrontFacing(this.a, this.b, this.c, e);
  }
  /**
   * Returns `true` if this triangle intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this triangle intersects with the given box or not.
   */
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  /**
   * Returns the closest point on the triangle to the given point.
   *
   * @param {Vector3} p - The point to compute the closest point for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on the triangle.
   */
  closestPointToPoint(e, t) {
    const i = this.a, r = this.b, s = this.c;
    let a, o;
    oi.subVectors(r, i), li.subVectors(s, i), Jr.subVectors(e, i);
    const l = oi.dot(Jr), c = li.dot(Jr);
    if (l <= 0 && c <= 0)
      return t.copy(i);
    Qr.subVectors(e, r);
    const d = oi.dot(Qr), u = li.dot(Qr);
    if (d >= 0 && u <= d)
      return t.copy(r);
    const f = l * u - d * c;
    if (f <= 0 && l >= 0 && d <= 0)
      return a = l / (l - d), t.copy(i).addScaledVector(oi, a);
    es.subVectors(e, s);
    const p = oi.dot(es), x = li.dot(es);
    if (x >= 0 && p <= x)
      return t.copy(s);
    const v = p * c - l * x;
    if (v <= 0 && c >= 0 && x <= 0)
      return o = c / (c - x), t.copy(i).addScaledVector(li, o);
    const m = d * x - p * u;
    if (m <= 0 && u - d >= 0 && p - x >= 0)
      return xa.subVectors(s, r), o = (u - d) / (u - d + (p - x)), t.copy(r).addScaledVector(xa, o);
    const h = 1 / (m + v + f);
    return a = v * h, o = f * h, t.copy(i).addScaledVector(oi, a).addScaledVector(li, o);
  }
  /**
   * Returns `true` if this triangle is equal with the given one.
   *
   * @param {Triangle} triangle - The triangle to test for equality.
   * @return {boolean} Whether this triangle is equal with the given one.
   */
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const oo = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, Rn = { h: 0, s: 0, l: 0 }, sr = { h: 0, s: 0, l: 0 };
function rs(n, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? n + (e - n) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? n + (e - n) * 6 * (2 / 3 - t) : n;
}
class Qe {
  /**
   * Constructs a new color.
   *
   * Note that standard method of specifying color in three.js is with a hexadecimal triplet,
   * and that method is used throughout the rest of the documentation.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   */
  constructor(e, t, i) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, i);
  }
  /**
   * Sets the colors's components from the given values.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   * @return {Color} A reference to this color.
   */
  set(e, t, i) {
    if (t === void 0 && i === void 0) {
      const r = e;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(e, t, i);
    return this;
  }
  /**
   * Sets the colors's components to the given scalar value.
   *
   * @param {number} scalar - The scalar value.
   * @return {Color} A reference to this color.
   */
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  /**
   * Sets this color from a hexadecimal value.
   *
   * @param {number} hex - The hexadecimal value.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHex(e, t = Ft) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Ze.colorSpaceToWorking(this, t), this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} r - Red channel value between `0.0` and `1.0`.
   * @param {number} g - Green channel value between `0.0` and `1.0`.
   * @param {number} b - Blue channel value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setRGB(e, t, i, r = Ze.workingColorSpace) {
    return this.r = e, this.g = t, this.b = i, Ze.colorSpaceToWorking(this, r), this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHSL(e, t, i, r = Ze.workingColorSpace) {
    if (e = ol(e, 1), t = Ye(t, 0, 1), i = Ye(i, 0, 1), t === 0)
      this.r = this.g = this.b = i;
    else {
      const s = i <= 0.5 ? i * (1 + t) : i + t - i * t, a = 2 * i - s;
      this.r = rs(a, s, e + 1 / 3), this.g = rs(a, s, e), this.b = rs(a, s, e - 1 / 3);
    }
    return Ze.colorSpaceToWorking(this, r), this;
  }
  /**
   * Sets this color from a CSS-style string. For example, `rgb(250, 0,0)`,
   * `rgb(100%, 0%, 0%)`, `hsl(0, 100%, 50%)`, `#ff0000`, `#f00`, or `red` ( or
   * any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) -
   * all 140 color names are supported).
   *
   * @param {string} style - Color as a CSS-style string.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setStyle(e, t = Ft) {
    function i(s) {
      s !== void 0 && parseFloat(s) < 1 && Oe("Color: Alpha component of " + e + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let s;
      const a = r[1], o = r[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return i(s[4]), this.setRGB(
              Math.min(255, parseInt(s[1], 10)) / 255,
              Math.min(255, parseInt(s[2], 10)) / 255,
              Math.min(255, parseInt(s[3], 10)) / 255,
              t
            );
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return i(s[4]), this.setRGB(
              Math.min(100, parseInt(s[1], 10)) / 100,
              Math.min(100, parseInt(s[2], 10)) / 100,
              Math.min(100, parseInt(s[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return i(s[4]), this.setHSL(
              parseFloat(s[1]) / 360,
              parseFloat(s[2]) / 100,
              parseFloat(s[3]) / 100,
              t
            );
          break;
        default:
          Oe("Color: Unknown color model " + e);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const s = r[1], a = s.length;
      if (a === 3)
        return this.setRGB(
          parseInt(s.charAt(0), 16) / 15,
          parseInt(s.charAt(1), 16) / 15,
          parseInt(s.charAt(2), 16) / 15,
          t
        );
      if (a === 6)
        return this.setHex(parseInt(s, 16), t);
      Oe("Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  /**
   * Sets this color from a color name. Faster than {@link Color#setStyle} if
   * you don't need the other CSS-style formats.
   *
   * For convenience, the list of names is exposed in `Color.NAMES` as a hash.
   * ```js
   * Color.NAMES.aliceblue // returns 0xF0F8FF
   * ```
   *
   * @param {string} style - The color name.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setColorName(e, t = Ft) {
    const i = oo[e.toLowerCase()];
    return i !== void 0 ? this.setHex(i, t) : Oe("Color: Unknown color " + e), this;
  }
  /**
   * Returns a new color with copied values from this instance.
   *
   * @return {Color} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  /**
   * Copies the values of the given color to this instance.
   *
   * @param {Color} color - The color to copy.
   * @return {Color} A reference to this color.
   */
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copySRGBToLinear(e) {
    return this.r = Mn(e.r), this.g = Mn(e.g), this.b = Mn(e.b), this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copyLinearToSRGB(e) {
    return this.r = _i(e.r), this.g = _i(e.g), this.b = _i(e.b), this;
  }
  /**
   * Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  /**
   * Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  /**
   * Returns the hexadecimal value of this color.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {number} The hexadecimal value.
   */
  getHex(e = Ft) {
    return Ze.workingToColorSpace(Lt.copy(this), e), Math.round(Ye(Lt.r * 255, 0, 255)) * 65536 + Math.round(Ye(Lt.g * 255, 0, 255)) * 256 + Math.round(Ye(Lt.b * 255, 0, 255));
  }
  /**
   * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The hexadecimal value as a string.
   */
  getHexString(e = Ft) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  /**
   * Converts the colors RGB values into the HSL format and stores them into the
   * given target object.
   *
   * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {{h:number,s:number,l:number}} The HSL representation of this color.
   */
  getHSL(e, t = Ze.workingColorSpace) {
    Ze.workingToColorSpace(Lt.copy(this), t);
    const i = Lt.r, r = Lt.g, s = Lt.b, a = Math.max(i, r, s), o = Math.min(i, r, s);
    let l, c;
    const d = (o + a) / 2;
    if (o === a)
      l = 0, c = 0;
    else {
      const u = a - o;
      switch (c = d <= 0.5 ? u / (a + o) : u / (2 - a - o), a) {
        case i:
          l = (r - s) / u + (r < s ? 6 : 0);
          break;
        case r:
          l = (s - i) / u + 2;
          break;
        case s:
          l = (i - r) / u + 4;
          break;
      }
      l /= 6;
    }
    return e.h = l, e.s = c, e.l = d, e;
  }
  /**
   * Returns the RGB values of this color and stores them into the given target object.
   *
   * @param {Color} target - The target color that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} The RGB representation of this color.
   */
  getRGB(e, t = Ze.workingColorSpace) {
    return Ze.workingToColorSpace(Lt.copy(this), t), e.r = Lt.r, e.g = Lt.g, e.b = Lt.b, e;
  }
  /**
   * Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The CSS representation of this color.
   */
  getStyle(e = Ft) {
    Ze.workingToColorSpace(Lt.copy(this), e);
    const t = Lt.r, i = Lt.g, r = Lt.b;
    return e !== Ft ? `color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(i * 255)},${Math.round(r * 255)})`;
  }
  /**
   * Adds the given HSL values to this color's values.
   * Internally, this converts the color's RGB values to HSL, adds HSL
   * and then converts the color back to RGB.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @return {Color} A reference to this color.
   */
  offsetHSL(e, t, i) {
    return this.getHSL(Rn), this.setHSL(Rn.h + e, Rn.s + t, Rn.l + i);
  }
  /**
   * Adds the RGB values of the given color to the RGB values of this color.
   *
   * @param {Color} color - The color to add.
   * @return {Color} A reference to this color.
   */
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  /**
   * Adds the RGB values of the given colors and stores the result in this instance.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @return {Color} A reference to this color.
   */
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  /**
   * Adds the given scalar value to the RGB values of this color.
   *
   * @param {number} s - The scalar to add.
   * @return {Color} A reference to this color.
   */
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  /**
   * Subtracts the RGB values of the given color from the RGB values of this color.
   *
   * @param {Color} color - The color to subtract.
   * @return {Color} A reference to this color.
   */
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  /**
   * Multiplies the RGB values of the given color with the RGB values of this color.
   *
   * @param {Color} color - The color to multiply.
   * @return {Color} A reference to this color.
   */
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  /**
   * Multiplies the given scalar value with the RGB values of this color.
   *
   * @param {number} s - The scalar to multiply.
   * @return {Color} A reference to this color.
   */
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  /**
   * Linearly interpolates this color's RGB values toward the RGB values of the
   * given color. The alpha argument can be thought of as the ratio between
   * the two colors, where `0.0` is this color and `1.0` is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  /**
   * Linearly interpolates between the given colors and stores the result in this instance.
   * The alpha argument can be thought of as the ratio between the two colors, where `0.0`
   * is the first and `1.0` is the second color.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpColors(e, t, i) {
    return this.r = e.r + (t.r - e.r) * i, this.g = e.g + (t.g - e.g) * i, this.b = e.b + (t.b - e.b) * i, this;
  }
  /**
   * Linearly interpolates this color's HSL values toward the HSL values of the
   * given color. It differs from {@link Color#lerp} by not interpolating straight
   * from one color to the other, but instead going through all the hues in between
   * those two colors. The alpha argument can be thought of as the ratio between
   * the two colors, where 0.0 is this color and 1.0 is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpHSL(e, t) {
    this.getHSL(Rn), e.getHSL(sr);
    const i = Gr(Rn.h, sr.h, t), r = Gr(Rn.s, sr.s, t), s = Gr(Rn.l, sr.l, t);
    return this.setHSL(i, r, s), this;
  }
  /**
   * Sets the color's RGB components from the given 3D vector.
   *
   * @param {Vector3} v - The vector to set.
   * @return {Color} A reference to this color.
   */
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  /**
   * Transforms this color with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix.
   * @return {Color} A reference to this color.
   */
  applyMatrix3(e) {
    const t = this.r, i = this.g, r = this.b, s = e.elements;
    return this.r = s[0] * t + s[3] * i + s[6] * r, this.g = s[1] * t + s[4] * i + s[7] * r, this.b = s[2] * t + s[5] * i + s[8] * r, this;
  }
  /**
   * Returns `true` if this color is equal with the given one.
   *
   * @param {Color} c - The color to test for equality.
   * @return {boolean} Whether this bounding color is equal with the given one.
   */
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  /**
   * Sets this color's RGB components from the given array.
   *
   * @param {Array<number>} array - An array holding the RGB values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Color} A reference to this color.
   */
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  /**
   * Writes the RGB components of this color to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the color components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The color components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  /**
   * Sets the components of this color from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding color data.
   * @param {number} index - The index into the attribute.
   * @return {Color} A reference to this color.
   */
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the color
   * as a hexadecimal value.
   *
   * @return {number} The hexadecimal value.
   */
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const Lt = /* @__PURE__ */ new Qe();
Qe.NAMES = oo;
let bl = 0;
class Lr extends Ei {
  /**
   * Constructs a new material.
   */
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: bl++ }), this.uuid = Xi(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Qe(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  /**
   * Sets the alpha value to be used when running an alpha test. The material
   * will not be rendered if the opacity is lower than this value.
   *
   * @type {number}
   * @readonly
   * @default 0
   */
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  /**
   * An optional callback that is executed immediately before the material is used to render a 3D object.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Scene} scene - The scene.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Object3D} object - The 3D object.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * An optional callback that is executed immediately before the shader
   * program is compiled. This function is called with the shader source code
   * as a parameter. Useful for the modification of built-in materials.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}. The
   * recommended approach when customizing materials is to use `WebGPURenderer` with the new
   * Node Material system and [TSL](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language).
   *
   * @param {{vertexShader:string,fragmentShader:string,uniforms:Object}} shaderobject - The object holds the uniforms and the vertex and fragment shader source.
   * @param {WebGLRenderer} renderer - A reference to the renderer.
   */
  onBeforeCompile() {
  }
  /**
   * In case {@link Material#onBeforeCompile} is used, this callback can be used to identify
   * values of settings used in `onBeforeCompile()`, so three.js can reuse a cached
   * shader or recompile the shader for this material as needed.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @return {string} The custom program cache key.
   */
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  /**
   * This method can be used to set default values from parameter objects.
   * It is a generic implementation so it can be used with different types
   * of materials.
   *
   * @param {Object} [values] - The material values to set.
   */
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const i = e[t];
        if (i === void 0) {
          Oe(`Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const r = this[t];
        if (r === void 0) {
          Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(i) : r && r.isVector3 && i && i.isVector3 ? r.copy(i) : this[t] = i;
      }
  }
  /**
   * Serializes the material into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized material.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const i = {
      metadata: {
        version: 4.7,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    i.uuid = this.uuid, i.type = this.type, this.name !== "" && (i.name = this.name), this.color && this.color.isColor && (i.color = this.color.getHex()), this.roughness !== void 0 && (i.roughness = this.roughness), this.metalness !== void 0 && (i.metalness = this.metalness), this.sheen !== void 0 && (i.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (i.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (i.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (i.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (i.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (i.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (i.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (i.shininess = this.shininess), this.clearcoat !== void 0 && (i.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (i.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, i.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (i.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (i.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (i.dispersion = this.dispersion), this.iridescence !== void 0 && (i.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (i.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (i.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (i.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (i.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (i.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (i.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (i.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (i.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(e).uuid, i.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (i.aoMap = this.aoMap.toJSON(e).uuid, i.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(e).uuid, i.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(e).uuid, i.normalMapType = this.normalMapType, i.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(e).uuid, i.displacementScale = this.displacementScale, i.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (i.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (i.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (i.combine = this.combine)), this.envMapRotation !== void 0 && (i.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (i.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (i.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (i.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (i.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (i.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (i.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (i.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (i.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (i.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (i.size = this.size), this.shadowSide !== null && (i.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (i.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (i.blending = this.blending), this.side !== 0 && (i.side = this.side), this.vertexColors === !0 && (i.vertexColors = !0), this.opacity < 1 && (i.opacity = this.opacity), this.transparent === !0 && (i.transparent = !0), this.blendSrc !== 204 && (i.blendSrc = this.blendSrc), this.blendDst !== 205 && (i.blendDst = this.blendDst), this.blendEquation !== 100 && (i.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (i.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (i.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (i.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (i.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (i.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (i.depthFunc = this.depthFunc), this.depthTest === !1 && (i.depthTest = this.depthTest), this.depthWrite === !1 && (i.depthWrite = this.depthWrite), this.colorWrite === !1 && (i.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (i.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (i.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (i.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (i.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (i.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (i.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (i.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (i.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (i.rotation = this.rotation), this.polygonOffset === !0 && (i.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (i.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (i.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (i.linewidth = this.linewidth), this.dashSize !== void 0 && (i.dashSize = this.dashSize), this.gapSize !== void 0 && (i.gapSize = this.gapSize), this.scale !== void 0 && (i.scale = this.scale), this.dithering === !0 && (i.dithering = !0), this.alphaTest > 0 && (i.alphaTest = this.alphaTest), this.alphaHash === !0 && (i.alphaHash = !0), this.alphaToCoverage === !0 && (i.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (i.premultipliedAlpha = !0), this.forceSinglePass === !0 && (i.forceSinglePass = !0), this.wireframe === !0 && (i.wireframe = !0), this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (i.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (i.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (i.flatShading = !0), this.visible === !1 && (i.visible = !1), this.toneMapped === !1 && (i.toneMapped = !1), this.fog === !1 && (i.fog = !1), Object.keys(this.userData).length > 0 && (i.userData = this.userData);
    function r(s) {
      const a = [];
      for (const o in s) {
        const l = s[o];
        delete l.metadata, a.push(l);
      }
      return a;
    }
    if (t) {
      const s = r(e.textures), a = r(e.images);
      s.length > 0 && (i.textures = s), a.length > 0 && (i.images = a);
    }
    return i;
  }
  /**
   * Returns a new material with copied values from this instance.
   *
   * @return {Material} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given material to this instance.
   *
   * @param {Material} source - The material to copy.
   * @return {Material} A reference to this instance.
   */
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let i = null;
    if (t !== null) {
      const r = t.length;
      i = new Array(r);
      for (let s = 0; s !== r; ++s)
        i[s] = t[s].clone();
    }
    return this.clippingPlanes = i, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires Material#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Setting this property to `true` indicates the engine the material
   * needs to be recompiled.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}
class Yn extends Lr {
  /**
   * Constructs a new mesh basic material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Qe(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new yn(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const vt = /* @__PURE__ */ new G(), ar = /* @__PURE__ */ new rt();
let yl = 0;
class dn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {TypedArray} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, i = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: yl++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = i, this.usage = 35044, this.updateRanges = [], this.gpuType = 1015, this.version = 0;
  }
  /**
   * A callback function that is executed after the renderer has transferred the attribute
   * array data to the GPU.
   */
  onUploadCallback() {
  }
  /**
   * Flag to indicate that this attribute has changed and should be re-sent to
   * the GPU. Set this to `true` when you modify the value of the array.
   *
   * @type {number}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  /**
   * Sets the usage of this buffer attribute.
   *
   * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
   * @return {BufferAttribute} A reference to this buffer attribute.
   */
  setUsage(e) {
    return this.usage = e, this;
  }
  /**
   * Adds a range of data in the data array to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Copies the values of the given buffer attribute to this instance.
   *
   * @param {BufferAttribute} source - The buffer attribute to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  /**
   * Copies a vector from the given buffer attribute to this one. The start
   * and destination position in the attribute buffers are represented by the
   * given indices.
   *
   * @param {number} index1 - The destination index into this buffer attribute.
   * @param {BufferAttribute} attribute - The buffer attribute to copy from.
   * @param {number} index2 - The source index into the given buffer attribute.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyAt(e, t, i) {
    e *= this.itemSize, i *= t.itemSize;
    for (let r = 0, s = this.itemSize; r < s; r++)
      this.array[e + r] = t.array[i + r];
    return this;
  }
  /**
   * Copies the given array data into this buffer attribute.
   *
   * @param {(TypedArray|Array)} array - The array to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyArray(e) {
    return this.array.set(e), this;
  }
  /**
   * Applies the given 3x3 matrix to the given attribute. Works with
   * item size `2` and `3`.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, i = this.count; t < i; t++)
        ar.fromBufferAttribute(this, t), ar.applyMatrix3(e), this.setXY(t, ar.x, ar.y);
    else if (this.itemSize === 3)
      for (let t = 0, i = this.count; t < i; t++)
        vt.fromBufferAttribute(this, t), vt.applyMatrix3(e), this.setXYZ(t, vt.x, vt.y, vt.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix4(e) {
    for (let t = 0, i = this.count; t < i; t++)
      vt.fromBufferAttribute(this, t), vt.applyMatrix4(e), this.setXYZ(t, vt.x, vt.y, vt.z);
    return this;
  }
  /**
   * Applies the given 3x3 normal matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix3} m - The normal matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyNormalMatrix(e) {
    for (let t = 0, i = this.count; t < i; t++)
      vt.fromBufferAttribute(this, t), vt.applyNormalMatrix(e), this.setXYZ(t, vt.x, vt.y, vt.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3` and with direction vectors.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  transformDirection(e) {
    for (let t = 0, i = this.count; t < i; t++)
      vt.fromBufferAttribute(this, t), vt.transformDirection(e), this.setXYZ(t, vt.x, vt.y, vt.z);
    return this;
  }
  /**
   * Sets the given array data in the buffer attribute.
   *
   * @param {(TypedArray|Array)} value - The array data to set.
   * @param {number} [offset=0] - The offset in this buffer attribute's array.
   * @return {BufferAttribute} A reference to this instance.
   */
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  /**
   * Returns the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @return {number} The returned value.
   */
  getComponent(e, t) {
    let i = this.array[e * this.itemSize + t];
    return this.normalized && (i = wi(i, this.array)), i;
  }
  /**
   * Sets the given value to the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @param {number} value - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setComponent(e, t, i) {
    return this.normalized && (i = Bt(i, this.array)), this.array[e * this.itemSize + t] = i, this;
  }
  /**
   * Returns the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The x component.
   */
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = wi(t, this.array)), t;
  }
  /**
   * Sets the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setX(e, t) {
    return this.normalized && (t = Bt(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  /**
   * Returns the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The y component.
   */
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = wi(t, this.array)), t;
  }
  /**
   * Sets the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} y - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setY(e, t) {
    return this.normalized && (t = Bt(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  /**
   * Returns the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The z component.
   */
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = wi(t, this.array)), t;
  }
  /**
   * Sets the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} z - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setZ(e, t) {
    return this.normalized && (t = Bt(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  /**
   * Returns the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The w component.
   */
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = wi(t, this.array)), t;
  }
  /**
   * Sets the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} w - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setW(e, t) {
    return this.normalized && (t = Bt(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  /**
   * Sets the x and y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXY(e, t, i) {
    return e *= this.itemSize, this.normalized && (t = Bt(t, this.array), i = Bt(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this;
  }
  /**
   * Sets the x, y and z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZ(e, t, i, r) {
    return e *= this.itemSize, this.normalized && (t = Bt(t, this.array), i = Bt(i, this.array), r = Bt(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = r, this;
  }
  /**
   * Sets the x, y, z and w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @param {number} w - The value for the w component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZW(e, t, i, r, s) {
    return e *= this.itemSize, this.normalized && (t = Bt(t, this.array), i = Bt(i, this.array), r = Bt(r, this.array), s = Bt(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = r, this.array[e + 3] = s, this;
  }
  /**
   * Sets the given callback function that is executed after the Renderer has transferred
   * the attribute array data to the GPU. Can be used to perform clean-up operations after
   * the upload when attribute data are not needed anymore on the CPU side.
   *
   * @param {Function} callback - The `onUpload()` callback.
   * @return {BufferAttribute} A reference to this instance.
   */
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  /**
   * Returns a new buffer attribute with copied values from this instance.
   *
   * @return {BufferAttribute} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  /**
   * Serializes the buffer attribute into JSON.
   *
   * @return {Object} A JSON object representing the serialized buffer attribute.
   */
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e;
  }
}
class lo extends dn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint16Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, i) {
    super(new Uint16Array(e), t, i);
  }
}
class co extends dn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, i) {
    super(new Uint32Array(e), t, i);
  }
}
class $n extends dn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Float32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, i) {
    super(new Float32Array(e), t, i);
  }
}
let El = 0;
const $t = /* @__PURE__ */ new bt(), ss = /* @__PURE__ */ new qt(), ci = /* @__PURE__ */ new G(), kt = /* @__PURE__ */ new Yi(), Di = /* @__PURE__ */ new Yi(), Tt = /* @__PURE__ */ new G();
class Ln extends Ei {
  /**
   * Constructs a new geometry.
   */
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: El++ }), this.uuid = Xi(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  /**
   * Returns the index of this geometry.
   *
   * @return {?BufferAttribute} The index. Returns `null` if no index is defined.
   */
  getIndex() {
    return this.index;
  }
  /**
   * Sets the given index to this geometry.
   *
   * @param {Array<number>|BufferAttribute} index - The index to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (ro(e) ? co : lo)(e, 1) : this.index = e, this;
  }
  /**
   * Sets the given indirect attribute to this geometry.
   *
   * @param {BufferAttribute} indirect - The attribute holding indirect draw calls.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndirect(e) {
    return this.indirect = e, this;
  }
  /**
   * Returns the indirect attribute of this geometry.
   *
   * @return {?BufferAttribute} The indirect attribute. Returns `null` if no indirect attribute is defined.
   */
  getIndirect() {
    return this.indirect;
  }
  /**
   * Returns the buffer attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {BufferAttribute|InterleavedBufferAttribute|undefined} The buffer attribute.
   * Returns `undefined` if not attribute has been found.
   */
  getAttribute(e) {
    return this.attributes[e];
  }
  /**
   * Sets the given attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @param {BufferAttribute|InterleavedBufferAttribute} attribute - The attribute to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  /**
   * Deletes the attribute for the given name.
   *
   * @param {string} name - The attribute name to delete.
   * @return {BufferGeometry} A reference to this instance.
   */
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  /**
   * Returns `true` if this geometry has an attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {boolean} Whether this geometry has an attribute for the given name or not.
   */
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  /**
   * Adds a group to this geometry.
   *
   * @param {number} start - The first element in this draw call. That is the first
   * vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - Specifies how many vertices (or indices) are part of this group.
   * @param {number} [materialIndex=0] - The material array index to use.
   */
  addGroup(e, t, i = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: i
    });
  }
  /**
   * Clears all groups.
   */
  clearGroups() {
    this.groups = [];
  }
  /**
   * Sets the draw range for this geometry.
   *
   * @param {number} start - The first vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - For non-indexed BufferGeometry, `count` is the number of vertices to render.
   * For indexed BufferGeometry, `count` is the number of indices to render.
   */
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  /**
   * Applies the given 4x4 transformation matrix to the geometry.
   *
   * @param {Matrix4} matrix - The matrix to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const i = this.attributes.normal;
    if (i !== void 0) {
      const s = new Be().getNormalMatrix(e);
      i.applyNormalMatrix(s), i.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  /**
   * Applies the rotation represented by the Quaternion to the geometry.
   *
   * @param {Quaternion} q - The Quaternion to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyQuaternion(e) {
    return $t.makeRotationFromQuaternion(e), this.applyMatrix4($t), this;
  }
  /**
   * Rotates the geometry about the X axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateX(e) {
    return $t.makeRotationX(e), this.applyMatrix4($t), this;
  }
  /**
   * Rotates the geometry about the Y axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateY(e) {
    return $t.makeRotationY(e), this.applyMatrix4($t), this;
  }
  /**
   * Rotates the geometry about the Z axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateZ(e) {
    return $t.makeRotationZ(e), this.applyMatrix4($t), this;
  }
  /**
   * Translates the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#position} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x offset.
   * @param {number} y - The y offset.
   * @param {number} z - The z offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  translate(e, t, i) {
    return $t.makeTranslation(e, t, i), this.applyMatrix4($t), this;
  }
  /**
   * Scales the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#scale} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x scale.
   * @param {number} y - The y scale.
   * @param {number} z - The z scale.
   * @return {BufferGeometry} A reference to this instance.
   */
  scale(e, t, i) {
    return $t.makeScale(e, t, i), this.applyMatrix4($t), this;
  }
  /**
   * Rotates the geometry to face a point in 3D space. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#lookAt} for typical
   * real-time mesh rotation.
   *
   * @param {Vector3} vector - The target point.
   * @return {BufferGeometry} A reference to this instance.
   */
  lookAt(e) {
    return ss.lookAt(e), ss.updateMatrix(), this.applyMatrix4(ss.matrix), this;
  }
  /**
   * Center the geometry based on its bounding box.
   *
   * @return {BufferGeometry} A reference to this instance.
   */
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(ci).negate(), this.translate(ci.x, ci.y, ci.z), this;
  }
  /**
   * Defines a geometry by creating a `position` attribute based on the given array of points. The array
   * can hold 2D or 3D vectors. When using two-dimensional data, the `z` coordinate for all vertices is
   * set to `0`.
   *
   * If the method is used with an existing `position` attribute, the vertex data are overwritten with the
   * data from the array. The length of the array must match the vertex count.
   *
   * @param {Array<Vector2>|Array<Vector3>} points - The points.
   * @return {BufferGeometry} A reference to this instance.
   */
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (t === void 0) {
      const i = [];
      for (let r = 0, s = e.length; r < s; r++) {
        const a = e[r];
        i.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new $n(i, 3));
    } else {
      const i = Math.min(e.length, t.count);
      for (let r = 0; r < i; r++) {
        const s = e[r];
        t.setXYZ(r, s.x, s.y, s.z || 0);
      }
      e.length > t.count && Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
    }
    return this;
  }
  /**
   * Computes the bounding box of the geometry, and updates the `boundingBox` member.
   * The bounding box is not computed by the engine; it must be computed by your app.
   * You may need to recompute the bounding box if the geometry vertices are modified.
   */
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Yi());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      gt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new G(-1 / 0, -1 / 0, -1 / 0),
        new G(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let i = 0, r = t.length; i < r; i++) {
          const s = t[i];
          kt.setFromBufferAttribute(s), this.morphTargetsRelative ? (Tt.addVectors(this.boundingBox.min, kt.min), this.boundingBox.expandByPoint(Tt), Tt.addVectors(this.boundingBox.max, kt.max), this.boundingBox.expandByPoint(Tt)) : (this.boundingBox.expandByPoint(kt.min), this.boundingBox.expandByPoint(kt.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && gt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  /**
   * Computes the bounding sphere of the geometry, and updates the `boundingSphere` member.
   * The engine automatically computes the bounding sphere when it is needed, e.g., for ray casting or view frustum culling.
   * You may need to recompute the bounding sphere if the geometry vertices are modified.
   */
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Us());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      gt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new G(), 1 / 0);
      return;
    }
    if (e) {
      const i = this.boundingSphere.center;
      if (kt.setFromBufferAttribute(e), t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s];
          Di.setFromBufferAttribute(o), this.morphTargetsRelative ? (Tt.addVectors(kt.min, Di.min), kt.expandByPoint(Tt), Tt.addVectors(kt.max, Di.max), kt.expandByPoint(Tt)) : (kt.expandByPoint(Di.min), kt.expandByPoint(Di.max));
        }
      kt.getCenter(i);
      let r = 0;
      for (let s = 0, a = e.count; s < a; s++)
        Tt.fromBufferAttribute(e, s), r = Math.max(r, i.distanceToSquared(Tt));
      if (t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s], l = this.morphTargetsRelative;
          for (let c = 0, d = o.count; c < d; c++)
            Tt.fromBufferAttribute(o, c), l && (ci.fromBufferAttribute(e, c), Tt.add(ci)), r = Math.max(r, i.distanceToSquared(Tt));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && gt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  /**
   * Calculates and adds a tangent attribute to this geometry.
   *
   * The computation is only supported for indexed geometries and if position, normal, and uv attributes
   * are defined. When using a tangent space normal map, prefer the MikkTSpace algorithm provided by
   * {@link BufferGeometryUtils#computeMikkTSpaceTangents} instead.
   */
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      gt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const i = t.position, r = t.normal, s = t.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new dn(new Float32Array(4 * i.count), 4));
    const a = this.getAttribute("tangent"), o = [], l = [];
    for (let O = 0; O < i.count; O++)
      o[O] = new G(), l[O] = new G();
    const c = new G(), d = new G(), u = new G(), f = new rt(), p = new rt(), x = new rt(), v = new G(), m = new G();
    function h(O, M, S) {
      c.fromBufferAttribute(i, O), d.fromBufferAttribute(i, M), u.fromBufferAttribute(i, S), f.fromBufferAttribute(s, O), p.fromBufferAttribute(s, M), x.fromBufferAttribute(s, S), d.sub(c), u.sub(c), p.sub(f), x.sub(f);
      const L = 1 / (p.x * x.y - x.x * p.y);
      isFinite(L) && (v.copy(d).multiplyScalar(x.y).addScaledVector(u, -p.y).multiplyScalar(L), m.copy(u).multiplyScalar(p.x).addScaledVector(d, -x.x).multiplyScalar(L), o[O].add(v), o[M].add(v), o[S].add(v), l[O].add(m), l[M].add(m), l[S].add(m));
    }
    let T = this.groups;
    T.length === 0 && (T = [{
      start: 0,
      count: e.count
    }]);
    for (let O = 0, M = T.length; O < M; ++O) {
      const S = T[O], L = S.start, z = S.count;
      for (let H = L, q = L + z; H < q; H += 3)
        h(
          e.getX(H + 0),
          e.getX(H + 1),
          e.getX(H + 2)
        );
    }
    const E = new G(), A = new G(), D = new G(), y = new G();
    function P(O) {
      D.fromBufferAttribute(r, O), y.copy(D);
      const M = o[O];
      E.copy(M), E.sub(D.multiplyScalar(D.dot(M))).normalize(), A.crossVectors(y, M);
      const L = A.dot(l[O]) < 0 ? -1 : 1;
      a.setXYZW(O, E.x, E.y, E.z, L);
    }
    for (let O = 0, M = T.length; O < M; ++O) {
      const S = T[O], L = S.start, z = S.count;
      for (let H = L, q = L + z; H < q; H += 3)
        P(e.getX(H + 0)), P(e.getX(H + 1)), P(e.getX(H + 2));
    }
  }
  /**
   * Computes vertex normals for the given vertex data. For indexed geometries, the method sets
   * each vertex normal to be the average of the face normals of the faces that share that vertex.
   * For non-indexed geometries, vertices are not shared, and the method sets each vertex normal
   * to be the same as the face normal.
   */
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let i = this.getAttribute("normal");
      if (i === void 0)
        i = new dn(new Float32Array(t.count * 3), 3), this.setAttribute("normal", i);
      else
        for (let f = 0, p = i.count; f < p; f++)
          i.setXYZ(f, 0, 0, 0);
      const r = new G(), s = new G(), a = new G(), o = new G(), l = new G(), c = new G(), d = new G(), u = new G();
      if (e)
        for (let f = 0, p = e.count; f < p; f += 3) {
          const x = e.getX(f + 0), v = e.getX(f + 1), m = e.getX(f + 2);
          r.fromBufferAttribute(t, x), s.fromBufferAttribute(t, v), a.fromBufferAttribute(t, m), d.subVectors(a, s), u.subVectors(r, s), d.cross(u), o.fromBufferAttribute(i, x), l.fromBufferAttribute(i, v), c.fromBufferAttribute(i, m), o.add(d), l.add(d), c.add(d), i.setXYZ(x, o.x, o.y, o.z), i.setXYZ(v, l.x, l.y, l.z), i.setXYZ(m, c.x, c.y, c.z);
        }
      else
        for (let f = 0, p = t.count; f < p; f += 3)
          r.fromBufferAttribute(t, f + 0), s.fromBufferAttribute(t, f + 1), a.fromBufferAttribute(t, f + 2), d.subVectors(a, s), u.subVectors(r, s), d.cross(u), i.setXYZ(f + 0, d.x, d.y, d.z), i.setXYZ(f + 1, d.x, d.y, d.z), i.setXYZ(f + 2, d.x, d.y, d.z);
      this.normalizeNormals(), i.needsUpdate = !0;
    }
  }
  /**
   * Ensures every normal vector in a geometry will have a magnitude of `1`. This will
   * correct lighting on the geometry surfaces.
   */
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, i = e.count; t < i; t++)
      Tt.fromBufferAttribute(e, t), Tt.normalize(), e.setXYZ(t, Tt.x, Tt.y, Tt.z);
  }
  /**
   * Return a new non-index version of this indexed geometry. If the geometry
   * is already non-indexed, the method is a NOOP.
   *
   * @return {BufferGeometry} The non-indexed version of this indexed geometry.
   */
  toNonIndexed() {
    function e(o, l) {
      const c = o.array, d = o.itemSize, u = o.normalized, f = new c.constructor(l.length * d);
      let p = 0, x = 0;
      for (let v = 0, m = l.length; v < m; v++) {
        o.isInterleavedBufferAttribute ? p = l[v] * o.data.stride + o.offset : p = l[v] * d;
        for (let h = 0; h < d; h++)
          f[x++] = c[p++];
      }
      return new dn(f, d, u);
    }
    if (this.index === null)
      return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new Ln(), i = this.index.array, r = this.attributes;
    for (const o in r) {
      const l = r[o], c = e(l, i);
      t.setAttribute(o, c);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const l = [], c = s[o];
      for (let d = 0, u = c.length; d < u; d++) {
        const f = c[d], p = e(f, i);
        l.push(p);
      }
      t.morphAttributes[o] = l;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, l = a.length; o < l; o++) {
      const c = a[o];
      t.addGroup(c.start, c.count, c.materialIndex);
    }
    return t;
  }
  /**
   * Serializes the geometry into JSON.
   *
   * @return {Object} A JSON object representing the serialized geometry.
   */
  toJSON() {
    const e = {
      metadata: {
        version: 4.7,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const c in l)
        l[c] !== void 0 && (e[c] = l[c]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const i = this.attributes;
    for (const l in i) {
      const c = i[l];
      e.data.attributes[l] = c.toJSON(e.data);
    }
    const r = {};
    let s = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], d = [];
      for (let u = 0, f = c.length; u < f; u++) {
        const p = c[u];
        d.push(p.toJSON(e.data));
      }
      d.length > 0 && (r[l] = d, s = !0);
    }
    s && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (e.data.boundingSphere = o.toJSON()), e;
  }
  /**
   * Returns a new geometry with copied values from this instance.
   *
   * @return {BufferGeometry} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given geometry to this instance.
   *
   * @param {BufferGeometry} source - The geometry to copy.
   * @return {BufferGeometry} A reference to this instance.
   */
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const i = e.index;
    i !== null && this.setIndex(i.clone());
    const r = e.attributes;
    for (const c in r) {
      const d = r[c];
      this.setAttribute(c, d.clone(t));
    }
    const s = e.morphAttributes;
    for (const c in s) {
      const d = [], u = s[c];
      for (let f = 0, p = u.length; f < p; f++)
        d.push(u[f].clone(t));
      this.morphAttributes[c] = d;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const a = e.groups;
    for (let c = 0, d = a.length; c < d; c++) {
      const u = a[c];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const o = e.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = e.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires BufferGeometry#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const ga = /* @__PURE__ */ new bt(), On = /* @__PURE__ */ new ml(), or = /* @__PURE__ */ new Us(), _a = /* @__PURE__ */ new G(), lr = /* @__PURE__ */ new G(), cr = /* @__PURE__ */ new G(), dr = /* @__PURE__ */ new G(), as = /* @__PURE__ */ new G(), ur = /* @__PURE__ */ new G(), va = /* @__PURE__ */ new G(), fr = /* @__PURE__ */ new G();
class Xt extends qt {
  /**
   * Constructs a new mesh.
   *
   * @param {BufferGeometry} [geometry] - The mesh geometry.
   * @param {Material|Array<Material>} [material] - The mesh material.
   */
  constructor(e = new Ln(), t = new Yn()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  /**
   * Sets the values of {@link Mesh#morphTargetDictionary} and {@link Mesh#morphTargetInfluences}
   * to make sure existing morph targets can influence this 3D object.
   */
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, i = Object.keys(t);
    if (i.length > 0) {
      const r = t[i[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = r.length; s < a; s++) {
          const o = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
  /**
   * Returns the local-space position of the vertex at the given index, taking into
   * account the current animation state of both morph targets and skinning.
   *
   * @param {number} index - The vertex index.
   * @param {Vector3} target - The target object that is used to store the method's result.
   * @return {Vector3} The vertex position in local space.
   */
  getVertexPosition(e, t) {
    const i = this.geometry, r = i.attributes.position, s = i.morphAttributes.position, a = i.morphTargetsRelative;
    t.fromBufferAttribute(r, e);
    const o = this.morphTargetInfluences;
    if (s && o) {
      ur.set(0, 0, 0);
      for (let l = 0, c = s.length; l < c; l++) {
        const d = o[l], u = s[l];
        d !== 0 && (as.fromBufferAttribute(u, e), a ? ur.addScaledVector(as, d) : ur.addScaledVector(as.sub(t), d));
      }
      t.add(ur);
    }
    return t;
  }
  /**
   * Computes intersection points between a casted ray and this line.
   *
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - The target array that holds the intersection points.
   */
  raycast(e, t) {
    const i = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (i.boundingSphere === null && i.computeBoundingSphere(), or.copy(i.boundingSphere), or.applyMatrix4(s), On.copy(e.ray).recast(e.near), !(or.containsPoint(On.origin) === !1 && (On.intersectSphere(or, _a) === null || On.origin.distanceToSquared(_a) > (e.far - e.near) ** 2)) && (ga.copy(s).invert(), On.copy(e.ray).applyMatrix4(ga), !(i.boundingBox !== null && On.intersectsBox(i.boundingBox) === !1) && this._computeIntersections(e, t, On)));
  }
  _computeIntersections(e, t, i) {
    let r;
    const s = this.geometry, a = this.material, o = s.index, l = s.attributes.position, c = s.attributes.uv, d = s.attributes.uv1, u = s.attributes.normal, f = s.groups, p = s.drawRange;
    if (o !== null)
      if (Array.isArray(a))
        for (let x = 0, v = f.length; x < v; x++) {
          const m = f[x], h = a[m.materialIndex], T = Math.max(m.start, p.start), E = Math.min(o.count, Math.min(m.start + m.count, p.start + p.count));
          for (let A = T, D = E; A < D; A += 3) {
            const y = o.getX(A), P = o.getX(A + 1), O = o.getX(A + 2);
            r = hr(this, h, e, i, c, d, u, y, P, O), r && (r.faceIndex = Math.floor(A / 3), r.face.materialIndex = m.materialIndex, t.push(r));
          }
        }
      else {
        const x = Math.max(0, p.start), v = Math.min(o.count, p.start + p.count);
        for (let m = x, h = v; m < h; m += 3) {
          const T = o.getX(m), E = o.getX(m + 1), A = o.getX(m + 2);
          r = hr(this, a, e, i, c, d, u, T, E, A), r && (r.faceIndex = Math.floor(m / 3), t.push(r));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(a))
        for (let x = 0, v = f.length; x < v; x++) {
          const m = f[x], h = a[m.materialIndex], T = Math.max(m.start, p.start), E = Math.min(l.count, Math.min(m.start + m.count, p.start + p.count));
          for (let A = T, D = E; A < D; A += 3) {
            const y = A, P = A + 1, O = A + 2;
            r = hr(this, h, e, i, c, d, u, y, P, O), r && (r.faceIndex = Math.floor(A / 3), r.face.materialIndex = m.materialIndex, t.push(r));
          }
        }
      else {
        const x = Math.max(0, p.start), v = Math.min(l.count, p.start + p.count);
        for (let m = x, h = v; m < h; m += 3) {
          const T = m, E = m + 1, A = m + 2;
          r = hr(this, a, e, i, c, d, u, T, E, A), r && (r.faceIndex = Math.floor(m / 3), t.push(r));
        }
      }
  }
}
function Tl(n, e, t, i, r, s, a, o) {
  let l;
  if (e.side === 1 ? l = i.intersectTriangle(a, s, r, !0, o) : l = i.intersectTriangle(r, s, a, e.side === 0, o), l === null) return null;
  fr.copy(o), fr.applyMatrix4(n.matrixWorld);
  const c = t.ray.origin.distanceTo(fr);
  return c < t.near || c > t.far ? null : {
    distance: c,
    point: fr.clone(),
    object: n
  };
}
function hr(n, e, t, i, r, s, a, o, l, c) {
  n.getVertexPosition(o, lr), n.getVertexPosition(l, cr), n.getVertexPosition(c, dr);
  const d = Tl(n, e, t, i, lr, cr, dr, va);
  if (d) {
    const u = new G();
    sn.getBarycoord(va, lr, cr, dr, u), r && (d.uv = sn.getInterpolatedAttribute(r, o, l, c, u, new rt())), s && (d.uv1 = sn.getInterpolatedAttribute(s, o, l, c, u, new rt())), a && (d.normal = sn.getInterpolatedAttribute(a, o, l, c, u, new G()), d.normal.dot(i.direction) > 0 && d.normal.multiplyScalar(-1));
    const f = {
      a: o,
      b: l,
      c,
      normal: new G(),
      materialIndex: 0
    };
    sn.getNormal(lr, cr, dr, f.normal), d.face = f, d.barycoord = u;
  }
  return d;
}
class $i extends Ln {
  /**
   * Constructs a new box geometry.
   *
   * @param {number} [width=1] - The width. That is, the length of the edges parallel to the X axis.
   * @param {number} [height=1] - The height. That is, the length of the edges parallel to the Y axis.
   * @param {number} [depth=1] - The depth. That is, the length of the edges parallel to the Z axis.
   * @param {number} [widthSegments=1] - Number of segmented rectangular faces along the width of the sides.
   * @param {number} [heightSegments=1] - Number of segmented rectangular faces along the height of the sides.
   * @param {number} [depthSegments=1] - Number of segmented rectangular faces along the depth of the sides.
   */
  constructor(e = 1, t = 1, i = 1, r = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: i,
      widthSegments: r,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    r = Math.floor(r), s = Math.floor(s), a = Math.floor(a);
    const l = [], c = [], d = [], u = [];
    let f = 0, p = 0;
    x("z", "y", "x", -1, -1, i, t, e, a, s, 0), x("z", "y", "x", 1, -1, i, t, -e, a, s, 1), x("x", "z", "y", 1, 1, e, i, t, r, a, 2), x("x", "z", "y", 1, -1, e, i, -t, r, a, 3), x("x", "y", "z", 1, -1, e, t, i, r, s, 4), x("x", "y", "z", -1, -1, e, t, -i, r, s, 5), this.setIndex(l), this.setAttribute("position", new $n(c, 3)), this.setAttribute("normal", new $n(d, 3)), this.setAttribute("uv", new $n(u, 2));
    function x(v, m, h, T, E, A, D, y, P, O, M) {
      const S = A / P, L = D / O, z = A / 2, H = D / 2, q = y / 2, K = P + 1, Y = O + 1;
      let te = 0, W = 0;
      const Q = new G();
      for (let re = 0; re < Y; re++) {
        const Me = re * L - H;
        for (let ke = 0; ke < K; ke++) {
          const et = ke * S - z;
          Q[v] = et * T, Q[m] = Me * E, Q[h] = q, c.push(Q.x, Q.y, Q.z), Q[v] = 0, Q[m] = 0, Q[h] = y > 0 ? 1 : -1, d.push(Q.x, Q.y, Q.z), u.push(ke / P), u.push(1 - re / O), te += 1;
        }
      }
      for (let re = 0; re < O; re++)
        for (let Me = 0; Me < P; Me++) {
          const ke = f + Me + K * re, et = f + Me + K * (re + 1), je = f + (Me + 1) + K * (re + 1), st = f + (Me + 1) + K * re;
          l.push(ke, et, st), l.push(et, je, st), W += 6;
        }
      o.addGroup(p, W, M), p += W, f += te;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {BoxGeometry} A new instance.
   */
  static fromJSON(e) {
    return new $i(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function Mi(n) {
  const e = {};
  for (const t in n) {
    e[t] = {};
    for (const i in n[t]) {
      const r = n[t][i];
      r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][i] = null) : e[t][i] = r.clone() : Array.isArray(r) ? e[t][i] = r.slice() : e[t][i] = r;
    }
  }
  return e;
}
function It(n) {
  const e = {};
  for (let t = 0; t < n.length; t++) {
    const i = Mi(n[t]);
    for (const r in i)
      e[r] = i[r];
  }
  return e;
}
function Al(n) {
  const e = [];
  for (let t = 0; t < n.length; t++)
    e.push(n[t].clone());
  return e;
}
function uo(n) {
  const e = n.getRenderTarget();
  return e === null ? n.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : Ze.workingColorSpace;
}
const wl = { clone: Mi, merge: It };
var Cl = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Rl = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class En extends Lr {
  /**
   * Constructs a new shader material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Cl, this.fragmentShader = Rl, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Mi(e.uniforms), this.uniformsGroups = Al(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const r in this.uniforms) {
      const a = this.uniforms[r].value;
      a && a.isTexture ? t.uniforms[r] = {
        type: "t",
        value: a.toJSON(e).uuid
      } : a && a.isColor ? t.uniforms[r] = {
        type: "c",
        value: a.getHex()
      } : a && a.isVector2 ? t.uniforms[r] = {
        type: "v2",
        value: a.toArray()
      } : a && a.isVector3 ? t.uniforms[r] = {
        type: "v3",
        value: a.toArray()
      } : a && a.isVector4 ? t.uniforms[r] = {
        type: "v4",
        value: a.toArray()
      } : a && a.isMatrix3 ? t.uniforms[r] = {
        type: "m3",
        value: a.toArray()
      } : a && a.isMatrix4 ? t.uniforms[r] = {
        type: "m4",
        value: a.toArray()
      } : t.uniforms[r] = {
        value: a
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const i = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (i[r] = !0);
    return Object.keys(i).length > 0 && (t.extensions = i), t;
  }
}
class fo extends qt {
  /**
   * Constructs a new camera.
   */
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new bt(), this.projectionMatrix = new bt(), this.projectionMatrixInverse = new bt(), this.coordinateSystem = 2e3, this._reversedDepth = !1;
  }
  /**
   * The flag that indicates whether the camera uses a reversed depth buffer.
   *
   * @type {boolean}
   * @default false
   */
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * This method is overwritten since cameras have a different forward vector compared to other
   * 3D objects. A camera looks down its local, negative z-axis by default.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Pn = /* @__PURE__ */ new G(), Sa = /* @__PURE__ */ new rt(), Ma = /* @__PURE__ */ new rt();
class Zt extends fo {
  /**
   * Constructs a new perspective camera.
   *
   * @param {number} [fov=50] - The vertical field of view.
   * @param {number} [aspect=1] - The aspect ratio.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(e = 50, t = 1, i = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = i, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current {@link PerspectiveCamera#filmGauge}.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * @param {number} focalLength - Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = vs * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Returns the focal length from the current {@link PerspectiveCamera#fov} and
   * {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The computed focal length.
   */
  getFocalLength() {
    const e = Math.tan(zr * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  /**
   * Returns the current vertical field of view angle in degrees considering {@link PerspectiveCamera#zoom}.
   *
   * @return {number} The effective FOV.
   */
  getEffectiveFOV() {
    return vs * 2 * Math.atan(
      Math.tan(zr * 0.5 * this.fov) / this.zoom
    );
  }
  /**
   * Returns the width of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  /**
   * Returns the height of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets `minTarget` and `maxTarget` to the coordinates of the lower-left and upper-right corners of the view rectangle.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} minTarget - The lower-left corner of the view rectangle is written into this vector.
   * @param {Vector2} maxTarget - The upper-right corner of the view rectangle is written into this vector.
   */
  getViewBounds(e, t, i) {
    Pn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(Pn.x, Pn.y).multiplyScalar(-e / Pn.z), Pn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), i.set(Pn.x, Pn.y).multiplyScalar(-e / Pn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} target - The target vector that is used to store result where x is width and y is height.
   * @returns {Vector2} The view size.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, Sa, Ma), t.subVectors(Ma, Sa);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *```
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *```
   * then for each monitor you would call it like this:
   *```js
   * const w = 1920;
   * const h = 1080;
   * const fullWidth = w * 3;
   * const fullHeight = h * 2;
   *
   * // --A--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   * // --B--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   * // --C--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   * // --D--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   * // --E--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   * // --F--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   * ```
   *
   * Note there is no reason monitors have to be the same size or in a grid.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   */
  setViewOffset(e, t, i, r, s, a) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(zr * 0.5 * this.fov) / this.zoom, i = 2 * t, r = this.aspect * i, s = -0.5 * r;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = a.fullWidth, c = a.fullHeight;
      s += a.offsetX * r / l, t -= a.offsetY * i / c, r *= a.width / l, i *= a.height / c;
    }
    const o = this.filmOffset;
    o !== 0 && (s += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + r, t, t - i, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
const di = -90, ui = 1;
class Pl extends qt {
  /**
   * Constructs a new cube camera.
   *
   * @param {number} near - The camera's near plane.
   * @param {number} far - The camera's far plane.
   * @param {WebGLCubeRenderTarget} renderTarget - The cube render target.
   */
  constructor(e, t, i) {
    super(), this.type = "CubeCamera", this.renderTarget = i, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new Zt(di, ui, e, t);
    r.layers = this.layers, this.add(r);
    const s = new Zt(di, ui, e, t);
    s.layers = this.layers, this.add(s);
    const a = new Zt(di, ui, e, t);
    a.layers = this.layers, this.add(a);
    const o = new Zt(di, ui, e, t);
    o.layers = this.layers, this.add(o);
    const l = new Zt(di, ui, e, t);
    l.layers = this.layers, this.add(l);
    const c = new Zt(di, ui, e, t);
    c.layers = this.layers, this.add(c);
  }
  /**
   * Must be called when the coordinate system of the cube camera is changed.
   */
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [i, r, s, a, o, l] = t;
    for (const c of t) this.remove(c);
    if (e === 2e3)
      i.up.set(0, 1, 0), i.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (e === 2001)
      i.up.set(0, -1, 0), i.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const c of t)
      this.add(c), c.updateMatrixWorld();
  }
  /**
   * Calling this method will render the given scene with the given renderer
   * into the cube render target of the camera.
   *
   * @param {(Renderer|WebGLRenderer)} renderer - The renderer.
   * @param {Scene} scene - The scene to render.
   */
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: i, activeMipmapLevel: r } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [s, a, o, l, c, d] = this.children, u = e.getRenderTarget(), f = e.getActiveCubeFace(), p = e.getActiveMipmapLevel(), x = e.xr.enabled;
    e.xr.enabled = !1;
    const v = i.texture.generateMipmaps;
    i.texture.generateMipmaps = !1, e.setRenderTarget(i, 0, r), e.render(t, s), e.setRenderTarget(i, 1, r), e.render(t, a), e.setRenderTarget(i, 2, r), e.render(t, o), e.setRenderTarget(i, 3, r), e.render(t, l), e.setRenderTarget(i, 4, r), e.render(t, c), i.texture.generateMipmaps = v, e.setRenderTarget(i, 5, r), e.render(t, d), e.setRenderTarget(u, f, p), e.xr.enabled = x, i.texture.needsPMREMUpdate = !0;
  }
}
class ho extends Pt {
  /**
   * Constructs a new cube texture.
   *
   * @param {Array<Image>} [images=[]] - An array holding a image for each side of a cube.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space value.
   */
  constructor(e = [], t = 301, i, r, s, a, o, l, c, d) {
    super(e, t, i, r, s, a, o, l, c, d), this.isCubeTexture = !0, this.flipY = !1;
  }
  /**
   * Alias for {@link CubeTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class Dl extends jn {
  /**
   * Constructs a new cube render target.
   *
   * @param {number} [size=1] - The size of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const i = { width: e, height: e, depth: 1 }, r = [i, i, i, i, i, i];
    this.texture = new ho(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
  }
  /**
   * Converts the given equirectangular texture to a cube map.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Texture} texture - The equirectangular texture.
   * @return {WebGLCubeRenderTarget} A reference to this cube render target.
   */
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const i = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, r = new $i(5, 5, 5), s = new En({
      name: "CubemapFromEquirect",
      uniforms: Mi(i.uniforms),
      vertexShader: i.vertexShader,
      fragmentShader: i.fragmentShader,
      side: 1,
      blending: 0
    });
    s.uniforms.tEquirect.value = t;
    const a = new Xt(r, s), o = t.minFilter;
    return t.minFilter === 1008 && (t.minFilter = 1006), new Pl(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  /**
   * Clears this cube render target.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
   * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
   * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
   */
  clear(e, t = !0, i = !0, r = !0) {
    const s = e.getRenderTarget();
    for (let a = 0; a < 6; a++)
      e.setRenderTarget(this, a), e.clear(t, i, r);
    e.setRenderTarget(s);
  }
}
class Ui extends qt {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const Ll = { type: "move" };
class os {
  /**
   * Constructs a new XR controller.
   */
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  /**
   * Returns a group representing the hand space of the XR controller.
   *
   * @return {Group} A group representing the hand space of the XR controller.
   */
  getHandSpace() {
    return this._hand === null && (this._hand = new Ui(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  /**
   * Returns a group representing the target ray space of the XR controller.
   *
   * @return {Group} A group representing the target ray space of the XR controller.
   */
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new Ui(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new G(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new G()), this._targetRay;
  }
  /**
   * Returns a group representing the grip space of the XR controller.
   *
   * @return {Group} A group representing the grip space of the XR controller.
   */
  getGripSpace() {
    return this._grip === null && (this._grip = new Ui(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new G(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new G()), this._grip;
  }
  /**
   * Dispatches the given event to the groups representing
   * the different coordinate spaces of the XR controller.
   *
   * @param {Object} event - The event to dispatch.
   * @return {WebXRController} A reference to this instance.
   */
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  /**
   * Connects the controller with the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const i of e.hand.values())
          this._getHandJoint(t, i);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  /**
   * Disconnects the controller from the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  /**
   * Updates the controller with the given input source, XR frame and reference space.
   * This updates the transformations of the groups that represent the different
   * coordinate systems of the controller.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @param {XRFrame} frame - The XR frame.
   * @param {XRReferenceSpace} referenceSpace - The reference space.
   * @return {WebXRController} A reference to this instance.
   */
  update(e, t, i) {
    let r = null, s = null, a = null;
    const o = this._targetRay, l = this._grip, c = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (c && e.hand) {
        a = !0;
        for (const v of e.hand.values()) {
          const m = t.getJointPose(v, i), h = this._getHandJoint(c, v);
          m !== null && (h.matrix.fromArray(m.transform.matrix), h.matrix.decompose(h.position, h.rotation, h.scale), h.matrixWorldNeedsUpdate = !0, h.jointRadius = m.radius), h.visible = m !== null;
        }
        const d = c.joints["index-finger-tip"], u = c.joints["thumb-tip"], f = d.position.distanceTo(u.position), p = 0.02, x = 5e-3;
        c.inputState.pinching && f > p + x ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && f <= p - x && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        l !== null && e.gripSpace && (s = t.getPose(e.gripSpace, i), s !== null && (l.matrix.fromArray(s.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = !1, s.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = !1));
      o !== null && (r = t.getPose(e.targetRaySpace, i), r === null && s !== null && (r = s), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(Ll)));
    }
    return o !== null && (o.visible = r !== null), l !== null && (l.visible = s !== null), c !== null && (c.visible = a !== null), this;
  }
  /**
   * Returns a group representing the hand joint for the given input joint.
   *
   * @private
   * @param {Group} hand - The group representing the hand space.
   * @param {XRJointSpace} inputjoint - The hand joint data.
   * @return {Group} A group representing the hand joint for the given input joint.
   */
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const i = new Ui();
      i.matrixAutoUpdate = !1, i.visible = !1, e.joints[t.jointName] = i, e.add(i);
    }
    return e.joints[t.jointName];
  }
}
class Ul extends qt {
  /**
   * Constructs a new scene.
   */
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new yn(), this.environmentIntensity = 1, this.environmentRotation = new yn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
class Il extends Pt {
  /**
   * Constructs a new data texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(e = null, t = 1, i = 1, r, s, a, o, l, c = 1003, d = 1003, u, f) {
    super(null, a, o, l, c, d, r, s, u, f), this.isDataTexture = !0, this.image = { data: e, width: t, height: i }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const ls = /* @__PURE__ */ new G(), Fl = /* @__PURE__ */ new G(), Nl = /* @__PURE__ */ new Be();
class Vn {
  /**
   * Constructs a new plane.
   *
   * @param {Vector3} [normal=(1,0,0)] - A unit length vector defining the normal of the plane.
   * @param {number} [constant=0] - The signed distance from the origin to the plane.
   */
  constructor(e = new G(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  /**
   * Sets the plane components by copying the given values.
   *
   * @param {Vector3} normal - The normal.
   * @param {number} constant - The constant.
   * @return {Plane} A reference to this plane.
   */
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  /**
   * Sets the plane components by defining `x`, `y`, `z` as the
   * plane normal and `w` as the constant.
   *
   * @param {number} x - The value for the normal's x component.
   * @param {number} y - The value for the normal's y component.
   * @param {number} z - The value for the normal's z component.
   * @param {number} w - The constant value.
   * @return {Plane} A reference to this plane.
   */
  setComponents(e, t, i, r) {
    return this.normal.set(e, t, i), this.constant = r, this;
  }
  /**
   * Sets the plane from the given normal and coplanar point (that is a point
   * that lies onto the plane).
   *
   * @param {Vector3} normal - The normal.
   * @param {Vector3} point - A coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  /**
   * Sets the plane from three coplanar points. The winding order is
   * assumed to be counter-clockwise, and determines the direction of
   * the plane normal.
   *
   * @param {Vector3} a - The first coplanar point.
   * @param {Vector3} b - The second coplanar point.
   * @param {Vector3} c - The third coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromCoplanarPoints(e, t, i) {
    const r = ls.subVectors(i, t).cross(Fl.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, e), this;
  }
  /**
   * Copies the values of the given plane to this instance.
   *
   * @param {Plane} plane - The plane to copy.
   * @return {Plane} A reference to this plane.
   */
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  /**
   * Normalizes the plane normal and adjusts the constant accordingly.
   *
   * @return {Plane} A reference to this plane.
   */
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  /**
   * Negates both the plane normal and the constant.
   *
   * @return {Plane} A reference to this plane.
   */
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  /**
   * Returns the signed distance from the given point to this plane.
   *
   * @param {Vector3} point - The point to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  /**
   * Returns the signed distance from the given sphere to this plane.
   *
   * @param {Sphere} sphere - The sphere to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  /**
   * Projects a the given point onto the plane.
   *
   * @param {Vector3} point - The point to project.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The projected point on the plane.
   */
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  /**
   * Returns the intersection point of the passed line and the plane. Returns
   * `null` if the line does not intersect. Returns the line's starting point if
   * the line is coplanar with the plane.
   *
   * @param {Line3} line - The line to compute the intersection for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectLine(e, t) {
    const i = e.delta(ls), r = this.normal.dot(i);
    if (r === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const s = -(e.start.dot(this.normal) + this.constant) / r;
    return s < 0 || s > 1 ? null : t.copy(e.start).addScaledVector(i, s);
  }
  /**
   * Returns `true` if the given line segment intersects with (passes through) the plane.
   *
   * @param {Line3} line - The line to test.
   * @return {boolean} Whether the given line segment intersects with the plane or not.
   */
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), i = this.distanceToPoint(e.end);
    return t < 0 && i > 0 || i < 0 && t > 0;
  }
  /**
   * Returns `true` if the given bounding box intersects with the plane.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with the plane or not.
   */
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  /**
   * Returns `true` if the given bounding sphere intersects with the plane.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with the plane or not.
   */
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  /**
   * Returns a coplanar vector to the plane, by calculating the
   * projection of the normal at the origin onto the plane.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The coplanar point.
   */
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  /**
   * Apply a 4x4 matrix to the plane. The matrix must be an affine, homogeneous transform.
   *
   * The optional normal matrix can be pre-computed like so:
   * ```js
   * const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );
   * ```
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @param {Matrix4} [optionalNormalMatrix] - A pre-computed normal matrix.
   * @return {Plane} A reference to this plane.
   */
  applyMatrix4(e, t) {
    const i = t || Nl.getNormalMatrix(e), r = this.coplanarPoint(ls).applyMatrix4(e), s = this.normal.applyMatrix3(i).normalize();
    return this.constant = -r.dot(s), this;
  }
  /**
   * Translates the plane by the distance defined by the given offset vector.
   * Note that this only affects the plane constant and will not affect the normal vector.
   *
   * @param {Vector3} offset - The offset vector.
   * @return {Plane} A reference to this plane.
   */
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  /**
   * Returns `true` if this plane is equal with the given one.
   *
   * @param {Plane} plane - The plane to test for equality.
   * @return {boolean} Whether this plane is equal with the given one.
   */
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  /**
   * Returns a new plane with copied values from this instance.
   *
   * @return {Plane} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
const Bn = /* @__PURE__ */ new Us(), Ol = /* @__PURE__ */ new rt(0.5, 0.5), pr = /* @__PURE__ */ new G();
class po {
  /**
   * Constructs a new frustum.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   */
  constructor(e = new Vn(), t = new Vn(), i = new Vn(), r = new Vn(), s = new Vn(), a = new Vn()) {
    this.planes = [e, t, i, r, s, a];
  }
  /**
   * Sets the frustum planes by copying the given planes.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   * @return {Frustum} A reference to this frustum.
   */
  set(e, t, i, r, s, a) {
    const o = this.planes;
    return o[0].copy(e), o[1].copy(t), o[2].copy(i), o[3].copy(r), o[4].copy(s), o[5].copy(a), this;
  }
  /**
   * Copies the values of the given frustum to this instance.
   *
   * @param {Frustum} frustum - The frustum to copy.
   * @return {Frustum} A reference to this frustum.
   */
  copy(e) {
    const t = this.planes;
    for (let i = 0; i < 6; i++)
      t[i].copy(e.planes[i]);
    return this;
  }
  /**
   * Sets the frustum planes from the given projection matrix.
   *
   * @param {Matrix4} m - The projection matrix.
   * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} coordinateSystem - The coordinate system.
   * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
   * @return {Frustum} A reference to this frustum.
   */
  setFromProjectionMatrix(e, t = 2e3, i = !1) {
    const r = this.planes, s = e.elements, a = s[0], o = s[1], l = s[2], c = s[3], d = s[4], u = s[5], f = s[6], p = s[7], x = s[8], v = s[9], m = s[10], h = s[11], T = s[12], E = s[13], A = s[14], D = s[15];
    if (r[0].setComponents(c - a, p - d, h - x, D - T).normalize(), r[1].setComponents(c + a, p + d, h + x, D + T).normalize(), r[2].setComponents(c + o, p + u, h + v, D + E).normalize(), r[3].setComponents(c - o, p - u, h - v, D - E).normalize(), i)
      r[4].setComponents(l, f, m, A).normalize(), r[5].setComponents(c - l, p - f, h - m, D - A).normalize();
    else if (r[4].setComponents(c - l, p - f, h - m, D - A).normalize(), t === 2e3)
      r[5].setComponents(c + l, p + f, h + m, D + A).normalize();
    else if (t === 2001)
      r[5].setComponents(l, f, m, A).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  /**
   * Returns `true` if the 3D object's bounding sphere is intersecting this frustum.
   *
   * Note that the 3D object must have a geometry so that the bounding sphere can be calculated.
   *
   * @param {Object3D} object - The 3D object to test.
   * @return {boolean} Whether the 3D object's bounding sphere is intersecting this frustum or not.
   */
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), Bn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), Bn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(Bn);
  }
  /**
   * Returns `true` if the given sprite is intersecting this frustum.
   *
   * @param {Sprite} sprite - The sprite to test.
   * @return {boolean} Whether the sprite is intersecting this frustum or not.
   */
  intersectsSprite(e) {
    Bn.center.set(0, 0, 0);
    const t = Ol.distanceTo(e.center);
    return Bn.radius = 0.7071067811865476 + t, Bn.applyMatrix4(e.matrixWorld), this.intersectsSphere(Bn);
  }
  /**
   * Returns `true` if the given bounding sphere is intersecting this frustum.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the bounding sphere is intersecting this frustum or not.
   */
  intersectsSphere(e) {
    const t = this.planes, i = e.center, r = -e.radius;
    for (let s = 0; s < 6; s++)
      if (t[s].distanceToPoint(i) < r)
        return !1;
    return !0;
  }
  /**
   * Returns `true` if the given bounding box is intersecting this frustum.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box is intersecting this frustum or not.
   */
  intersectsBox(e) {
    const t = this.planes;
    for (let i = 0; i < 6; i++) {
      const r = t[i];
      if (pr.x = r.normal.x > 0 ? e.max.x : e.min.x, pr.y = r.normal.y > 0 ? e.max.y : e.min.y, pr.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(pr) < 0)
        return !1;
    }
    return !0;
  }
  /**
   * Returns `true` if the given point lies within the frustum.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the point lies within this frustum or not.
   */
  containsPoint(e) {
    const t = this.planes;
    for (let i = 0; i < 6; i++)
      if (t[i].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  /**
   * Returns a new frustum with copied values from this instance.
   *
   * @return {Frustum} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
class mo extends Pt {
  /**
   * Constructs a new texture.
   *
   * @param {HTMLCanvasElement} [canvas] - The HTML canvas element.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   */
  constructor(e, t, i, r, s, a, o, l, c) {
    super(e, t, i, r, s, a, o, l, c), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}
class xo extends Pt {
  /**
   * Constructs a new depth texture.
   *
   * @param {number} width - The width of the texture.
   * @param {number} height - The height of the texture.
   * @param {number} [type=UnsignedIntType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {number} [format=DepthFormat] - The texture format.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e, t, i = 1014, r, s, a, o = 1003, l = 1003, c, d = 1026, u = 1) {
    if (d !== 1026 && d !== 1027)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    const f = { width: e, height: t, depth: u };
    super(f, r, s, a, o, l, d, i, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new Ls(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
class go extends Pt {
  /**
   * Creates a new raw texture.
   *
   * @param {?(WebGLTexture|GPUTexture)} [sourceTexture=null] - The external texture.
   */
  constructor(e = null) {
    super(), this.sourceTexture = e, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}
class rn extends Ln {
  /**
   * Constructs a new plane geometry.
   *
   * @param {number} [width=1] - The width along the X axis.
   * @param {number} [height=1] - The height along the Y axis
   * @param {number} [widthSegments=1] - The number of segments along the X axis.
   * @param {number} [heightSegments=1] - The number of segments along the Y axis.
   */
  constructor(e = 1, t = 1, i = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: i,
      heightSegments: r
    };
    const s = e / 2, a = t / 2, o = Math.floor(i), l = Math.floor(r), c = o + 1, d = l + 1, u = e / o, f = t / l, p = [], x = [], v = [], m = [];
    for (let h = 0; h < d; h++) {
      const T = h * f - a;
      for (let E = 0; E < c; E++) {
        const A = E * u - s;
        x.push(A, -T, 0), v.push(0, 0, 1), m.push(E / o), m.push(1 - h / l);
      }
    }
    for (let h = 0; h < l; h++)
      for (let T = 0; T < o; T++) {
        const E = T + c * h, A = T + c * (h + 1), D = T + 1 + c * (h + 1), y = T + 1 + c * h;
        p.push(E, A, y), p.push(A, D, y);
      }
    this.setIndex(p), this.setAttribute("position", new $n(x, 3)), this.setAttribute("normal", new $n(v, 3)), this.setAttribute("uv", new $n(m, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {PlaneGeometry} A new instance.
   */
  static fromJSON(e) {
    return new rn(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
class Bl extends Lr {
  /**
   * Constructs a new mesh depth material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class zl extends Lr {
  /**
   * Constructs a new mesh distance material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const cs = {
  /**
   * Whether caching is enabled or not.
   *
   * @static
   * @type {boolean}
   * @default false
   */
  enabled: !1,
  /**
   * A dictionary that holds cached files.
   *
   * @static
   * @type {Object<string,Object>}
   */
  files: {},
  /**
   * Adds a cache entry with a key to reference the file. If this key already
   * holds a file, it is overwritten.
   *
   * @static
   * @param {string} key - The key to reference the cached file.
   * @param {Object} file -  The file to be cached.
   */
  add: function(n, e) {
    this.enabled !== !1 && (this.files[n] = e);
  },
  /**
   * Gets the cached value for the given key.
   *
   * @static
   * @param {string} key - The key to reference the cached file.
   * @return {Object|undefined} The cached file. If the key does not exist `undefined` is returned.
   */
  get: function(n) {
    if (this.enabled !== !1)
      return this.files[n];
  },
  /**
   * Removes the cached file associated with the given key.
   *
   * @static
   * @param {string} key - The key to reference the cached file.
   */
  remove: function(n) {
    delete this.files[n];
  },
  /**
   * Remove all values from the cache.
   *
   * @static
   */
  clear: function() {
    this.files = {};
  }
};
class Gl {
  /**
   * Constructs a new loading manager.
   *
   * @param {Function} [onLoad] - Executes when all items have been loaded.
   * @param {Function} [onProgress] - Executes when single items have been loaded.
   * @param {Function} [onError] - Executes when an error occurs.
   */
  constructor(e, t, i) {
    const r = this;
    let s = !1, a = 0, o = 0, l;
    const c = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = i, this._abortController = null, this.itemStart = function(d) {
      o++, s === !1 && r.onStart !== void 0 && r.onStart(d, a, o), s = !0;
    }, this.itemEnd = function(d) {
      a++, r.onProgress !== void 0 && r.onProgress(d, a, o), a === o && (s = !1, r.onLoad !== void 0 && r.onLoad());
    }, this.itemError = function(d) {
      r.onError !== void 0 && r.onError(d);
    }, this.resolveURL = function(d) {
      return l ? l(d) : d;
    }, this.setURLModifier = function(d) {
      return l = d, this;
    }, this.addHandler = function(d, u) {
      return c.push(d, u), this;
    }, this.removeHandler = function(d) {
      const u = c.indexOf(d);
      return u !== -1 && c.splice(u, 2), this;
    }, this.getHandler = function(d) {
      for (let u = 0, f = c.length; u < f; u += 2) {
        const p = c[u], x = c[u + 1];
        if (p.global && (p.lastIndex = 0), p.test(d))
          return x;
      }
      return null;
    }, this.abort = function() {
      return this.abortController.abort(), this._abortController = null, this;
    };
  }
  // TODO: Revert this back to a single member variable once this issue has been fixed
  // https://github.com/cloudflare/workerd/issues/3657
  /**
   * Used for aborting ongoing requests in loaders using this manager.
   *
   * @type {AbortController}
   */
  get abortController() {
    return this._abortController || (this._abortController = new AbortController()), this._abortController;
  }
}
const Vl = /* @__PURE__ */ new Gl();
class Is {
  /**
   * Constructs a new loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    this.manager = e !== void 0 ? e : Vl, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  /**
   * This method needs to be implemented by all concrete loaders. It holds the
   * logic for loading assets from the backend.
   *
   * @abstract
   * @param {string} url - The path/URL of the file to be loaded.
   * @param {Function} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @param {onErrorCallback} [onError] - Executed when errors occur.
   */
  load() {
  }
  /**
   * A async version of {@link Loader#load}.
   *
   * @param {string} url - The path/URL of the file to be loaded.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @return {Promise} A Promise that resolves when the asset has been loaded.
   */
  loadAsync(e, t) {
    const i = this;
    return new Promise(function(r, s) {
      i.load(e, r, t, s);
    });
  }
  /**
   * This method needs to be implemented by all concrete loaders. It holds the
   * logic for parsing the asset into three.js entities.
   *
   * @abstract
   * @param {any} data - The data to parse.
   */
  parse() {
  }
  /**
   * Sets the `crossOrigin` String to implement CORS for loading the URL
   * from a different domain that allows CORS.
   *
   * @param {string} crossOrigin - The `crossOrigin` value.
   * @return {Loader} A reference to this instance.
   */
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  /**
   * Whether the XMLHttpRequest uses credentials such as cookies, authorization
   * headers or TLS client certificates, see [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials).
   *
   * Note: This setting has no effect if you are loading files locally or from the same domain.
   *
   * @param {boolean} value - The `withCredentials` value.
   * @return {Loader} A reference to this instance.
   */
  setWithCredentials(e) {
    return this.withCredentials = e, this;
  }
  /**
   * Sets the base path for the asset.
   *
   * @param {string} path - The base path.
   * @return {Loader} A reference to this instance.
   */
  setPath(e) {
    return this.path = e, this;
  }
  /**
   * Sets the base path for dependent resources like textures.
   *
   * @param {string} resourcePath - The resource path.
   * @return {Loader} A reference to this instance.
   */
  setResourcePath(e) {
    return this.resourcePath = e, this;
  }
  /**
   * Sets the given request header.
   *
   * @param {Object} requestHeader - A [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)
   * for configuring the HTTP request.
   * @return {Loader} A reference to this instance.
   */
  setRequestHeader(e) {
    return this.requestHeader = e, this;
  }
  /**
   * This method can be implemented in loaders for aborting ongoing requests.
   *
   * @abstract
   * @return {Loader} A reference to this instance.
   */
  abort() {
    return this;
  }
}
Is.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const fi = /* @__PURE__ */ new WeakMap();
class kl extends Is {
  /**
   * Constructs a new image loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e);
  }
  /**
   * Starts loading from the given URL and passes the loaded image
   * to the `onLoad()` callback. The method also returns a new `Image` object which can
   * directly be used for texture creation. If you do it this way, the texture
   * may pop up in your scene once the respective loading process is finished.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(Image)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Unsupported in this loader.
   * @param {onErrorCallback} onError - Executed when errors occur.
   * @return {Image} The image.
   */
  load(e, t, i, r) {
    this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const s = this, a = cs.get(`image:${e}`);
    if (a !== void 0) {
      if (a.complete === !0)
        s.manager.itemStart(e), setTimeout(function() {
          t && t(a), s.manager.itemEnd(e);
        }, 0);
      else {
        let u = fi.get(a);
        u === void 0 && (u = [], fi.set(a, u)), u.push({ onLoad: t, onError: r });
      }
      return a;
    }
    const o = ki("img");
    function l() {
      d(), t && t(this);
      const u = fi.get(this) || [];
      for (let f = 0; f < u.length; f++) {
        const p = u[f];
        p.onLoad && p.onLoad(this);
      }
      fi.delete(this), s.manager.itemEnd(e);
    }
    function c(u) {
      d(), r && r(u), cs.remove(`image:${e}`);
      const f = fi.get(this) || [];
      for (let p = 0; p < f.length; p++) {
        const x = f[p];
        x.onError && x.onError(u);
      }
      fi.delete(this), s.manager.itemError(e), s.manager.itemEnd(e);
    }
    function d() {
      o.removeEventListener("load", l, !1), o.removeEventListener("error", c, !1);
    }
    return o.addEventListener("load", l, !1), o.addEventListener("error", c, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (o.crossOrigin = this.crossOrigin), cs.add(`image:${e}`, o), s.manager.itemStart(e), o.src = e, o;
  }
}
class Hl extends Is {
  /**
   * Constructs a new texture loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e);
  }
  /**
   * Starts loading from the given URL and pass the fully loaded texture
   * to the `onLoad()` callback. The method also returns a new texture object which can
   * directly be used for material creation. If you do it this way, the texture
   * may pop up in your scene once the respective loading process is finished.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(Texture)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Unsupported in this loader.
   * @param {onErrorCallback} onError - Executed when errors occur.
   * @return {Texture} The texture.
   */
  load(e, t, i, r) {
    const s = new Pt(), a = new kl(this.manager);
    return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(e, function(o) {
      s.image = o, s.needsUpdate = !0, t !== void 0 && t(s);
    }, i, r), s;
  }
}
class Wl extends fo {
  /**
   * Constructs a new orthographic camera.
   *
   * @param {number} [left=-1] - The left plane of the camera's frustum.
   * @param {number} [right=1] - The right plane of the camera's frustum.
   * @param {number} [top=1] - The top plane of the camera's frustum.
   * @param {number} [bottom=-1] - The bottom plane of the camera's frustum.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(e = -1, t = 1, i = 1, r = -1, s = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = i, this.bottom = r, this.near = s, this.far = a, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   * @see {@link PerspectiveCamera#setViewOffset}
   */
  setViewOffset(e, t, i, r, s, a) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), i = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let s = i - e, a = i + e, o = r + t, l = r - t;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, d = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += c * this.view.offsetX, a = s + c * this.view.width, o -= d * this.view.offsetY, l = o - d * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, a, o, l, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
class Xl extends Zt {
  /**
   * Constructs a new array camera.
   *
   * @param {Array<PerspectiveCamera>} [array=[]] - An array of perspective sub cameras.
   */
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
  }
}
function ba(n, e, t, i) {
  const r = ql(i);
  switch (t) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case 1021:
      return n * e;
    case 1028:
      return n * e / r.components * r.byteLength;
    case 1029:
      return n * e / r.components * r.byteLength;
    case 1030:
      return n * e * 2 / r.components * r.byteLength;
    case 1031:
      return n * e * 2 / r.components * r.byteLength;
    case 1022:
      return n * e * 3 / r.components * r.byteLength;
    case 1023:
      return n * e * 4 / r.components * r.byteLength;
    case 1033:
      return n * e * 4 / r.components * r.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case 33776:
    case 33777:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case 33778:
    case 33779:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case 35841:
    case 35843:
      return Math.max(n, 16) * Math.max(e, 8) / 4;
    case 35840:
    case 35842:
      return Math.max(n, 8) * Math.max(e, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case 36196:
    case 37492:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case 37496:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case 37808:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case 37809:
      return Math.floor((n + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case 37810:
      return Math.floor((n + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case 37811:
      return Math.floor((n + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case 37812:
      return Math.floor((n + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case 37813:
      return Math.floor((n + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case 37814:
      return Math.floor((n + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case 37815:
      return Math.floor((n + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case 37816:
      return Math.floor((n + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case 37817:
      return Math.floor((n + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case 37818:
      return Math.floor((n + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case 37819:
      return Math.floor((n + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case 37820:
      return Math.floor((n + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case 37821:
      return Math.floor((n + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case 36492:
    case 36494:
    case 36495:
      return Math.ceil(n / 4) * Math.ceil(e / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case 36283:
    case 36284:
      return Math.ceil(n / 4) * Math.ceil(e / 4) * 8;
    case 36285:
    case 36286:
      return Math.ceil(n / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${t} format.`
  );
}
function ql(n) {
  switch (n) {
    case 1009:
    case 1010:
      return { byteLength: 1, components: 1 };
    case 1012:
    case 1011:
    case 1016:
      return { byteLength: 2, components: 1 };
    case 1017:
    case 1018:
      return { byteLength: 2, components: 4 };
    case 1014:
    case 1013:
    case 1015:
      return { byteLength: 4, components: 1 };
    case 35902:
    case 35899:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${n}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: "181"
} }));
typeof window < "u" && (window.__THREE__ ? Oe("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "181");
function _o() {
  let n = null, e = !1, t = null, i = null;
  function r(s, a) {
    t(s, a), i = n.requestAnimationFrame(r);
  }
  return {
    start: function() {
      e !== !0 && t !== null && (i = n.requestAnimationFrame(r), e = !0);
    },
    stop: function() {
      n.cancelAnimationFrame(i), e = !1;
    },
    setAnimationLoop: function(s) {
      t = s;
    },
    setContext: function(s) {
      n = s;
    }
  };
}
function Yl(n) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(o, l) {
    const c = o.array, d = o.usage, u = c.byteLength, f = n.createBuffer();
    n.bindBuffer(l, f), n.bufferData(l, c, d), o.onUploadCallback();
    let p;
    if (c instanceof Float32Array)
      p = n.FLOAT;
    else if (typeof Float16Array < "u" && c instanceof Float16Array)
      p = n.HALF_FLOAT;
    else if (c instanceof Uint16Array)
      o.isFloat16BufferAttribute ? p = n.HALF_FLOAT : p = n.UNSIGNED_SHORT;
    else if (c instanceof Int16Array)
      p = n.SHORT;
    else if (c instanceof Uint32Array)
      p = n.UNSIGNED_INT;
    else if (c instanceof Int32Array)
      p = n.INT;
    else if (c instanceof Int8Array)
      p = n.BYTE;
    else if (c instanceof Uint8Array)
      p = n.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray)
      p = n.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: f,
      type: p,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: o.version,
      size: u
    };
  }
  function i(o, l, c) {
    const d = l.array, u = l.updateRanges;
    if (n.bindBuffer(c, o), u.length === 0)
      n.bufferSubData(c, 0, d);
    else {
      u.sort((p, x) => p.start - x.start);
      let f = 0;
      for (let p = 1; p < u.length; p++) {
        const x = u[f], v = u[p];
        v.start <= x.start + x.count + 1 ? x.count = Math.max(
          x.count,
          v.start + v.count - x.start
        ) : (++f, u[f] = v);
      }
      u.length = f + 1;
      for (let p = 0, x = u.length; p < x; p++) {
        const v = u[p];
        n.bufferSubData(
          c,
          v.start * d.BYTES_PER_ELEMENT,
          d,
          v.start,
          v.count
        );
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), e.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = e.get(o);
    l && (n.deleteBuffer(l.buffer), e.delete(o));
  }
  function a(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const d = e.get(o);
      (!d || d.version < o.version) && e.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const c = e.get(o);
    if (c === void 0)
      e.set(o, t(o, l));
    else if (c.version < o.version) {
      if (c.size !== o.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      i(c.buffer, o, l), c.version = o.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: a
  };
}
var $l = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Kl = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, Zl = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, jl = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Jl = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, Ql = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, ec = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, tc = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, nc = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, ic = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, rc = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, sc = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, ac = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, oc = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, lc = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, cc = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, dc = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, uc = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, fc = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, hc = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, pc = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, mc = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, xc = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, gc = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, _c = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, vc = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, Sc = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Mc = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, bc = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, yc = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Ec = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Tc = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Ac = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, wc = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`, Cc = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, Rc = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Pc = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Dc = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Lc = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Uc = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Ic = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Fc = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, Nc = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Oc = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Bc = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, zc = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, Gc = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, Vc = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, kc = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Hc = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Wc = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Xc = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, qc = `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, Yc = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, $c = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, Kc = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Zc = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, jc = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Jc = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Qc = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, ed = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, td = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, nd = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, id = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, rd = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, sd = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, ad = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, od = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, ld = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, cd = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, dd = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, ud = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, fd = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, hd = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, pd = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, md = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, xd = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, gd = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, _d = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, vd = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Sd = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, Md = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, bd = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, yd = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Ed = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Td = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Ad = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, wd = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Cd = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Rd = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, Pd = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Dd = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Ld = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Ud = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Id = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, Fd = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, Nd = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, Od = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Bd = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, zd = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Gd = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, Vd = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, kd = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, Hd = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Wd = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Xd = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, qd = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Yd = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, $d = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Kd = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Zd = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, jd = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Jd = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Qd = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, eu = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, tu = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, nu = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, iu = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, ru = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, su = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, au = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, ou = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, lu = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, cu = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, du = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, uu = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, fu = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, hu = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, pu = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, mu = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, xu = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, gu = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, _u = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, vu = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Su = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Mu = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, bu = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, yu = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Eu = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Tu = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Au = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, ze = {
  alphahash_fragment: $l,
  alphahash_pars_fragment: Kl,
  alphamap_fragment: Zl,
  alphamap_pars_fragment: jl,
  alphatest_fragment: Jl,
  alphatest_pars_fragment: Ql,
  aomap_fragment: ec,
  aomap_pars_fragment: tc,
  batching_pars_vertex: nc,
  batching_vertex: ic,
  begin_vertex: rc,
  beginnormal_vertex: sc,
  bsdfs: ac,
  iridescence_fragment: oc,
  bumpmap_pars_fragment: lc,
  clipping_planes_fragment: cc,
  clipping_planes_pars_fragment: dc,
  clipping_planes_pars_vertex: uc,
  clipping_planes_vertex: fc,
  color_fragment: hc,
  color_pars_fragment: pc,
  color_pars_vertex: mc,
  color_vertex: xc,
  common: gc,
  cube_uv_reflection_fragment: _c,
  defaultnormal_vertex: vc,
  displacementmap_pars_vertex: Sc,
  displacementmap_vertex: Mc,
  emissivemap_fragment: bc,
  emissivemap_pars_fragment: yc,
  colorspace_fragment: Ec,
  colorspace_pars_fragment: Tc,
  envmap_fragment: Ac,
  envmap_common_pars_fragment: wc,
  envmap_pars_fragment: Cc,
  envmap_pars_vertex: Rc,
  envmap_physical_pars_fragment: Gc,
  envmap_vertex: Pc,
  fog_vertex: Dc,
  fog_pars_vertex: Lc,
  fog_fragment: Uc,
  fog_pars_fragment: Ic,
  gradientmap_pars_fragment: Fc,
  lightmap_pars_fragment: Nc,
  lights_lambert_fragment: Oc,
  lights_lambert_pars_fragment: Bc,
  lights_pars_begin: zc,
  lights_toon_fragment: Vc,
  lights_toon_pars_fragment: kc,
  lights_phong_fragment: Hc,
  lights_phong_pars_fragment: Wc,
  lights_physical_fragment: Xc,
  lights_physical_pars_fragment: qc,
  lights_fragment_begin: Yc,
  lights_fragment_maps: $c,
  lights_fragment_end: Kc,
  logdepthbuf_fragment: Zc,
  logdepthbuf_pars_fragment: jc,
  logdepthbuf_pars_vertex: Jc,
  logdepthbuf_vertex: Qc,
  map_fragment: ed,
  map_pars_fragment: td,
  map_particle_fragment: nd,
  map_particle_pars_fragment: id,
  metalnessmap_fragment: rd,
  metalnessmap_pars_fragment: sd,
  morphinstance_vertex: ad,
  morphcolor_vertex: od,
  morphnormal_vertex: ld,
  morphtarget_pars_vertex: cd,
  morphtarget_vertex: dd,
  normal_fragment_begin: ud,
  normal_fragment_maps: fd,
  normal_pars_fragment: hd,
  normal_pars_vertex: pd,
  normal_vertex: md,
  normalmap_pars_fragment: xd,
  clearcoat_normal_fragment_begin: gd,
  clearcoat_normal_fragment_maps: _d,
  clearcoat_pars_fragment: vd,
  iridescence_pars_fragment: Sd,
  opaque_fragment: Md,
  packing: bd,
  premultiplied_alpha_fragment: yd,
  project_vertex: Ed,
  dithering_fragment: Td,
  dithering_pars_fragment: Ad,
  roughnessmap_fragment: wd,
  roughnessmap_pars_fragment: Cd,
  shadowmap_pars_fragment: Rd,
  shadowmap_pars_vertex: Pd,
  shadowmap_vertex: Dd,
  shadowmask_pars_fragment: Ld,
  skinbase_vertex: Ud,
  skinning_pars_vertex: Id,
  skinning_vertex: Fd,
  skinnormal_vertex: Nd,
  specularmap_fragment: Od,
  specularmap_pars_fragment: Bd,
  tonemapping_fragment: zd,
  tonemapping_pars_fragment: Gd,
  transmission_fragment: Vd,
  transmission_pars_fragment: kd,
  uv_pars_fragment: Hd,
  uv_pars_vertex: Wd,
  uv_vertex: Xd,
  worldpos_vertex: qd,
  background_vert: Yd,
  background_frag: $d,
  backgroundCube_vert: Kd,
  backgroundCube_frag: Zd,
  cube_vert: jd,
  cube_frag: Jd,
  depth_vert: Qd,
  depth_frag: eu,
  distanceRGBA_vert: tu,
  distanceRGBA_frag: nu,
  equirect_vert: iu,
  equirect_frag: ru,
  linedashed_vert: su,
  linedashed_frag: au,
  meshbasic_vert: ou,
  meshbasic_frag: lu,
  meshlambert_vert: cu,
  meshlambert_frag: du,
  meshmatcap_vert: uu,
  meshmatcap_frag: fu,
  meshnormal_vert: hu,
  meshnormal_frag: pu,
  meshphong_vert: mu,
  meshphong_frag: xu,
  meshphysical_vert: gu,
  meshphysical_frag: _u,
  meshtoon_vert: vu,
  meshtoon_frag: Su,
  points_vert: Mu,
  points_frag: bu,
  shadow_vert: yu,
  shadow_frag: Eu,
  sprite_vert: Tu,
  sprite_frag: Au
}, le = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Qe(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Be() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Be() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Be() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Be() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 },
    // basic, lambert, phong
    dfgLUT: { value: null }
    // DFG LUT for physically-based rendering
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Be() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Be() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Be() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Be() },
    normalScale: { value: /* @__PURE__ */ new rt(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Be() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Be() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Be() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Be() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Qe(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Qe(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Be() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Be() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Qe(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new rt(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Be() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Be() },
    alphaTest: { value: 0 }
  }
}, ln = {
  basic: {
    uniforms: /* @__PURE__ */ It([
      le.common,
      le.specularmap,
      le.envmap,
      le.aomap,
      le.lightmap,
      le.fog
    ]),
    vertexShader: ze.meshbasic_vert,
    fragmentShader: ze.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ It([
      le.common,
      le.specularmap,
      le.envmap,
      le.aomap,
      le.lightmap,
      le.emissivemap,
      le.bumpmap,
      le.normalmap,
      le.displacementmap,
      le.fog,
      le.lights,
      {
        emissive: { value: /* @__PURE__ */ new Qe(0) }
      }
    ]),
    vertexShader: ze.meshlambert_vert,
    fragmentShader: ze.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ It([
      le.common,
      le.specularmap,
      le.envmap,
      le.aomap,
      le.lightmap,
      le.emissivemap,
      le.bumpmap,
      le.normalmap,
      le.displacementmap,
      le.fog,
      le.lights,
      {
        emissive: { value: /* @__PURE__ */ new Qe(0) },
        specular: { value: /* @__PURE__ */ new Qe(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: ze.meshphong_vert,
    fragmentShader: ze.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ It([
      le.common,
      le.envmap,
      le.aomap,
      le.lightmap,
      le.emissivemap,
      le.bumpmap,
      le.normalmap,
      le.displacementmap,
      le.roughnessmap,
      le.metalnessmap,
      le.fog,
      le.lights,
      {
        emissive: { value: /* @__PURE__ */ new Qe(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: ze.meshphysical_vert,
    fragmentShader: ze.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ It([
      le.common,
      le.aomap,
      le.lightmap,
      le.emissivemap,
      le.bumpmap,
      le.normalmap,
      le.displacementmap,
      le.gradientmap,
      le.fog,
      le.lights,
      {
        emissive: { value: /* @__PURE__ */ new Qe(0) }
      }
    ]),
    vertexShader: ze.meshtoon_vert,
    fragmentShader: ze.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ It([
      le.common,
      le.bumpmap,
      le.normalmap,
      le.displacementmap,
      le.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: ze.meshmatcap_vert,
    fragmentShader: ze.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ It([
      le.points,
      le.fog
    ]),
    vertexShader: ze.points_vert,
    fragmentShader: ze.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ It([
      le.common,
      le.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: ze.linedashed_vert,
    fragmentShader: ze.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ It([
      le.common,
      le.displacementmap
    ]),
    vertexShader: ze.depth_vert,
    fragmentShader: ze.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ It([
      le.common,
      le.bumpmap,
      le.normalmap,
      le.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: ze.meshnormal_vert,
    fragmentShader: ze.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ It([
      le.sprite,
      le.fog
    ]),
    vertexShader: ze.sprite_vert,
    fragmentShader: ze.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Be() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: ze.background_vert,
    fragmentShader: ze.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Be() }
    },
    vertexShader: ze.backgroundCube_vert,
    fragmentShader: ze.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: ze.cube_vert,
    fragmentShader: ze.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: ze.equirect_vert,
    fragmentShader: ze.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ It([
      le.common,
      le.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new G() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: ze.distanceRGBA_vert,
    fragmentShader: ze.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ It([
      le.lights,
      le.fog,
      {
        color: { value: /* @__PURE__ */ new Qe(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: ze.shadow_vert,
    fragmentShader: ze.shadow_frag
  }
};
ln.physical = {
  uniforms: /* @__PURE__ */ It([
    ln.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Be() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Be() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new rt(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Be() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Be() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Be() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Qe(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Be() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Be() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Be() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new rt() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Be() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Qe(0) },
      specularColor: { value: /* @__PURE__ */ new Qe(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Be() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Be() },
      anisotropyVector: { value: /* @__PURE__ */ new rt() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Be() }
    }
  ]),
  vertexShader: ze.meshphysical_vert,
  fragmentShader: ze.meshphysical_frag
};
const mr = { r: 0, b: 0, g: 0 }, zn = /* @__PURE__ */ new yn(), wu = /* @__PURE__ */ new bt();
function Cu(n, e, t, i, r, s, a) {
  const o = new Qe(0);
  let l = s === !0 ? 0 : 1, c, d, u = null, f = 0, p = null;
  function x(E) {
    let A = E.isScene === !0 ? E.background : null;
    return A && A.isTexture && (A = (E.backgroundBlurriness > 0 ? t : e).get(A)), A;
  }
  function v(E) {
    let A = !1;
    const D = x(E);
    D === null ? h(o, l) : D && D.isColor && (h(D, 1), A = !0);
    const y = n.xr.getEnvironmentBlendMode();
    y === "additive" ? i.buffers.color.setClear(0, 0, 0, 1, a) : y === "alpha-blend" && i.buffers.color.setClear(0, 0, 0, 0, a), (n.autoClear || A) && (i.buffers.depth.setTest(!0), i.buffers.depth.setMask(!0), i.buffers.color.setMask(!0), n.clear(n.autoClearColor, n.autoClearDepth, n.autoClearStencil));
  }
  function m(E, A) {
    const D = x(A);
    D && (D.isCubeTexture || D.mapping === 306) ? (d === void 0 && (d = new Xt(
      new $i(1, 1, 1),
      new En({
        name: "BackgroundCubeMaterial",
        uniforms: Mi(ln.backgroundCube.uniforms),
        vertexShader: ln.backgroundCube.vertexShader,
        fragmentShader: ln.backgroundCube.fragmentShader,
        side: 1,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), d.geometry.deleteAttribute("normal"), d.geometry.deleteAttribute("uv"), d.onBeforeRender = function(y, P, O) {
      this.matrixWorld.copyPosition(O.matrixWorld);
    }, Object.defineProperty(d.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), r.update(d)), zn.copy(A.backgroundRotation), zn.x *= -1, zn.y *= -1, zn.z *= -1, D.isCubeTexture && D.isRenderTargetTexture === !1 && (zn.y *= -1, zn.z *= -1), d.material.uniforms.envMap.value = D, d.material.uniforms.flipEnvMap.value = D.isCubeTexture && D.isRenderTargetTexture === !1 ? -1 : 1, d.material.uniforms.backgroundBlurriness.value = A.backgroundBlurriness, d.material.uniforms.backgroundIntensity.value = A.backgroundIntensity, d.material.uniforms.backgroundRotation.value.setFromMatrix4(wu.makeRotationFromEuler(zn)), d.material.toneMapped = Ze.getTransfer(D.colorSpace) !== it, (u !== D || f !== D.version || p !== n.toneMapping) && (d.material.needsUpdate = !0, u = D, f = D.version, p = n.toneMapping), d.layers.enableAll(), E.unshift(d, d.geometry, d.material, 0, 0, null)) : D && D.isTexture && (c === void 0 && (c = new Xt(
      new rn(2, 2),
      new En({
        name: "BackgroundMaterial",
        uniforms: Mi(ln.background.uniforms),
        vertexShader: ln.background.vertexShader,
        fragmentShader: ln.background.fragmentShader,
        side: 0,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), r.update(c)), c.material.uniforms.t2D.value = D, c.material.uniforms.backgroundIntensity.value = A.backgroundIntensity, c.material.toneMapped = Ze.getTransfer(D.colorSpace) !== it, D.matrixAutoUpdate === !0 && D.updateMatrix(), c.material.uniforms.uvTransform.value.copy(D.matrix), (u !== D || f !== D.version || p !== n.toneMapping) && (c.material.needsUpdate = !0, u = D, f = D.version, p = n.toneMapping), c.layers.enableAll(), E.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function h(E, A) {
    E.getRGB(mr, uo(n)), i.buffers.color.setClear(mr.r, mr.g, mr.b, A, a);
  }
  function T() {
    d !== void 0 && (d.geometry.dispose(), d.material.dispose(), d = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0);
  }
  return {
    getClearColor: function() {
      return o;
    },
    setClearColor: function(E, A = 1) {
      o.set(E), l = A, h(o, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(E) {
      l = E, h(o, l);
    },
    render: v,
    addToRenderList: m,
    dispose: T
  };
}
function Ru(n, e) {
  const t = n.getParameter(n.MAX_VERTEX_ATTRIBS), i = {}, r = f(null);
  let s = r, a = !1;
  function o(S, L, z, H, q) {
    let K = !1;
    const Y = u(H, z, L);
    s !== Y && (s = Y, c(s.object)), K = p(S, H, z, q), K && x(S, H, z, q), q !== null && e.update(q, n.ELEMENT_ARRAY_BUFFER), (K || a) && (a = !1, A(S, L, z, H), q !== null && n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, e.get(q).buffer));
  }
  function l() {
    return n.createVertexArray();
  }
  function c(S) {
    return n.bindVertexArray(S);
  }
  function d(S) {
    return n.deleteVertexArray(S);
  }
  function u(S, L, z) {
    const H = z.wireframe === !0;
    let q = i[S.id];
    q === void 0 && (q = {}, i[S.id] = q);
    let K = q[L.id];
    K === void 0 && (K = {}, q[L.id] = K);
    let Y = K[H];
    return Y === void 0 && (Y = f(l()), K[H] = Y), Y;
  }
  function f(S) {
    const L = [], z = [], H = [];
    for (let q = 0; q < t; q++)
      L[q] = 0, z[q] = 0, H[q] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: L,
      enabledAttributes: z,
      attributeDivisors: H,
      object: S,
      attributes: {},
      index: null
    };
  }
  function p(S, L, z, H) {
    const q = s.attributes, K = L.attributes;
    let Y = 0;
    const te = z.getAttributes();
    for (const W in te)
      if (te[W].location >= 0) {
        const re = q[W];
        let Me = K[W];
        if (Me === void 0 && (W === "instanceMatrix" && S.instanceMatrix && (Me = S.instanceMatrix), W === "instanceColor" && S.instanceColor && (Me = S.instanceColor)), re === void 0 || re.attribute !== Me || Me && re.data !== Me.data) return !0;
        Y++;
      }
    return s.attributesNum !== Y || s.index !== H;
  }
  function x(S, L, z, H) {
    const q = {}, K = L.attributes;
    let Y = 0;
    const te = z.getAttributes();
    for (const W in te)
      if (te[W].location >= 0) {
        let re = K[W];
        re === void 0 && (W === "instanceMatrix" && S.instanceMatrix && (re = S.instanceMatrix), W === "instanceColor" && S.instanceColor && (re = S.instanceColor));
        const Me = {};
        Me.attribute = re, re && re.data && (Me.data = re.data), q[W] = Me, Y++;
      }
    s.attributes = q, s.attributesNum = Y, s.index = H;
  }
  function v() {
    const S = s.newAttributes;
    for (let L = 0, z = S.length; L < z; L++)
      S[L] = 0;
  }
  function m(S) {
    h(S, 0);
  }
  function h(S, L) {
    const z = s.newAttributes, H = s.enabledAttributes, q = s.attributeDivisors;
    z[S] = 1, H[S] === 0 && (n.enableVertexAttribArray(S), H[S] = 1), q[S] !== L && (n.vertexAttribDivisor(S, L), q[S] = L);
  }
  function T() {
    const S = s.newAttributes, L = s.enabledAttributes;
    for (let z = 0, H = L.length; z < H; z++)
      L[z] !== S[z] && (n.disableVertexAttribArray(z), L[z] = 0);
  }
  function E(S, L, z, H, q, K, Y) {
    Y === !0 ? n.vertexAttribIPointer(S, L, z, q, K) : n.vertexAttribPointer(S, L, z, H, q, K);
  }
  function A(S, L, z, H) {
    v();
    const q = H.attributes, K = z.getAttributes(), Y = L.defaultAttributeValues;
    for (const te in K) {
      const W = K[te];
      if (W.location >= 0) {
        let Q = q[te];
        if (Q === void 0 && (te === "instanceMatrix" && S.instanceMatrix && (Q = S.instanceMatrix), te === "instanceColor" && S.instanceColor && (Q = S.instanceColor)), Q !== void 0) {
          const re = Q.normalized, Me = Q.itemSize, ke = e.get(Q);
          if (ke === void 0) continue;
          const et = ke.buffer, je = ke.type, st = ke.bytesPerElement, V = je === n.INT || je === n.UNSIGNED_INT || Q.gpuType === 1013;
          if (Q.isInterleavedBufferAttribute) {
            const X = Q.data, ne = X.stride, Se = Q.offset;
            if (X.isInstancedInterleavedBuffer) {
              for (let ue = 0; ue < W.locationSize; ue++)
                h(W.location + ue, X.meshPerAttribute);
              S.isInstancedMesh !== !0 && H._maxInstanceCount === void 0 && (H._maxInstanceCount = X.meshPerAttribute * X.count);
            } else
              for (let ue = 0; ue < W.locationSize; ue++)
                m(W.location + ue);
            n.bindBuffer(n.ARRAY_BUFFER, et);
            for (let ue = 0; ue < W.locationSize; ue++)
              E(
                W.location + ue,
                Me / W.locationSize,
                je,
                re,
                ne * st,
                (Se + Me / W.locationSize * ue) * st,
                V
              );
          } else {
            if (Q.isInstancedBufferAttribute) {
              for (let X = 0; X < W.locationSize; X++)
                h(W.location + X, Q.meshPerAttribute);
              S.isInstancedMesh !== !0 && H._maxInstanceCount === void 0 && (H._maxInstanceCount = Q.meshPerAttribute * Q.count);
            } else
              for (let X = 0; X < W.locationSize; X++)
                m(W.location + X);
            n.bindBuffer(n.ARRAY_BUFFER, et);
            for (let X = 0; X < W.locationSize; X++)
              E(
                W.location + X,
                Me / W.locationSize,
                je,
                re,
                Me * st,
                Me / W.locationSize * X * st,
                V
              );
          }
        } else if (Y !== void 0) {
          const re = Y[te];
          if (re !== void 0)
            switch (re.length) {
              case 2:
                n.vertexAttrib2fv(W.location, re);
                break;
              case 3:
                n.vertexAttrib3fv(W.location, re);
                break;
              case 4:
                n.vertexAttrib4fv(W.location, re);
                break;
              default:
                n.vertexAttrib1fv(W.location, re);
            }
        }
      }
    }
    T();
  }
  function D() {
    O();
    for (const S in i) {
      const L = i[S];
      for (const z in L) {
        const H = L[z];
        for (const q in H)
          d(H[q].object), delete H[q];
        delete L[z];
      }
      delete i[S];
    }
  }
  function y(S) {
    if (i[S.id] === void 0) return;
    const L = i[S.id];
    for (const z in L) {
      const H = L[z];
      for (const q in H)
        d(H[q].object), delete H[q];
      delete L[z];
    }
    delete i[S.id];
  }
  function P(S) {
    for (const L in i) {
      const z = i[L];
      if (z[S.id] === void 0) continue;
      const H = z[S.id];
      for (const q in H)
        d(H[q].object), delete H[q];
      delete z[S.id];
    }
  }
  function O() {
    M(), a = !0, s !== r && (s = r, c(s.object));
  }
  function M() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: o,
    reset: O,
    resetDefaultState: M,
    dispose: D,
    releaseStatesOfGeometry: y,
    releaseStatesOfProgram: P,
    initAttributes: v,
    enableAttribute: m,
    disableUnusedAttributes: T
  };
}
function Pu(n, e, t) {
  let i;
  function r(c) {
    i = c;
  }
  function s(c, d) {
    n.drawArrays(i, c, d), t.update(d, i, 1);
  }
  function a(c, d, u) {
    u !== 0 && (n.drawArraysInstanced(i, c, d, u), t.update(d, i, u));
  }
  function o(c, d, u) {
    if (u === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i, c, 0, d, 0, u);
    let p = 0;
    for (let x = 0; x < u; x++)
      p += d[x];
    t.update(p, i, 1);
  }
  function l(c, d, u, f) {
    if (u === 0) return;
    const p = e.get("WEBGL_multi_draw");
    if (p === null)
      for (let x = 0; x < c.length; x++)
        a(c[x], d[x], f[x]);
    else {
      p.multiDrawArraysInstancedWEBGL(i, c, 0, d, 0, f, 0, u);
      let x = 0;
      for (let v = 0; v < u; v++)
        x += d[v] * f[v];
      t.update(x, i, 1);
    }
  }
  this.setMode = r, this.render = s, this.renderInstances = a, this.renderMultiDraw = o, this.renderMultiDrawInstances = l;
}
function Du(n, e, t, i) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const P = e.get("EXT_texture_filter_anisotropic");
      r = n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function a(P) {
    return !(P !== 1023 && i.convert(P) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(P) {
    const O = P === 1016 && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(P !== 1009 && i.convert(P) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    P !== 1015 && !O);
  }
  function l(P) {
    if (P === "highp") {
      if (n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.HIGH_FLOAT).precision > 0 && n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.HIGH_FLOAT).precision > 0)
        return "highp";
      P = "mediump";
    }
    return P === "mediump" && n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.MEDIUM_FLOAT).precision > 0 && n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = t.precision !== void 0 ? t.precision : "highp";
  const d = l(c);
  d !== c && (Oe("WebGLRenderer:", c, "not supported, using", d, "instead."), c = d);
  const u = t.logarithmicDepthBuffer === !0, f = t.reversedDepthBuffer === !0 && e.has("EXT_clip_control"), p = n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS), x = n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS), v = n.getParameter(n.MAX_TEXTURE_SIZE), m = n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE), h = n.getParameter(n.MAX_VERTEX_ATTRIBS), T = n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS), E = n.getParameter(n.MAX_VARYING_VECTORS), A = n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS), D = x > 0, y = n.getParameter(n.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: l,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: c,
    logarithmicDepthBuffer: u,
    reversedDepthBuffer: f,
    maxTextures: p,
    maxVertexTextures: x,
    maxTextureSize: v,
    maxCubemapSize: m,
    maxAttributes: h,
    maxVertexUniforms: T,
    maxVaryings: E,
    maxFragmentUniforms: A,
    vertexTextures: D,
    maxSamples: y
  };
}
function Lu(n) {
  const e = this;
  let t = null, i = 0, r = !1, s = !1;
  const a = new Vn(), o = new Be(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, f) {
    const p = u.length !== 0 || f || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    i !== 0 || r;
    return r = f, i = u.length, p;
  }, this.beginShadows = function() {
    s = !0, d(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(u, f) {
    t = d(u, f, 0);
  }, this.setState = function(u, f, p) {
    const x = u.clippingPlanes, v = u.clipIntersection, m = u.clipShadows, h = n.get(u);
    if (!r || x === null || x.length === 0 || s && !m)
      s ? d(null) : c();
    else {
      const T = s ? 0 : i, E = T * 4;
      let A = h.clippingState || null;
      l.value = A, A = d(x, f, E, p);
      for (let D = 0; D !== E; ++D)
        A[D] = t[D];
      h.clippingState = A, this.numIntersection = v ? this.numPlanes : 0, this.numPlanes += T;
    }
  };
  function c() {
    l.value !== t && (l.value = t, l.needsUpdate = i > 0), e.numPlanes = i, e.numIntersection = 0;
  }
  function d(u, f, p, x) {
    const v = u !== null ? u.length : 0;
    let m = null;
    if (v !== 0) {
      if (m = l.value, x !== !0 || m === null) {
        const h = p + v * 4, T = f.matrixWorldInverse;
        o.getNormalMatrix(T), (m === null || m.length < h) && (m = new Float32Array(h));
        for (let E = 0, A = p; E !== v; ++E, A += 4)
          a.copy(u[E]).applyMatrix4(T, o), a.normal.toArray(m, A), m[A + 3] = a.constant;
      }
      l.value = m, l.needsUpdate = !0;
    }
    return e.numPlanes = v, e.numIntersection = 0, m;
  }
}
function Uu(n) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(a, o) {
    return o === 303 ? a.mapping = 301 : o === 304 && (a.mapping = 302), a;
  }
  function i(a) {
    if (a && a.isTexture) {
      const o = a.mapping;
      if (o === 303 || o === 304)
        if (e.has(a)) {
          const l = e.get(a).texture;
          return t(l, a.mapping);
        } else {
          const l = a.image;
          if (l && l.height > 0) {
            const c = new Dl(l.height);
            return c.fromEquirectangularTexture(n, a), e.set(a, c), a.addEventListener("dispose", r), t(c.texture, a.mapping);
          } else
            return null;
        }
    }
    return a;
  }
  function r(a) {
    const o = a.target;
    o.removeEventListener("dispose", r);
    const l = e.get(o);
    l !== void 0 && (e.delete(o), l.dispose());
  }
  function s() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: i,
    dispose: s
  };
}
const Dn = 4, ya = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], qn = 20, Iu = 256, Li = /* @__PURE__ */ new Wl(), Ea = /* @__PURE__ */ new Qe();
let ds = null, us = 0, fs = 0, hs = !1;
const Fu = /* @__PURE__ */ new G();
class Ta {
  /**
   * Constructs a new PMREM generator.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   */
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety.
   *
   * @param {Scene} scene - The scene to be captured.
   * @param {number} [sigma=0] - The blur radius in radians.
   * @param {number} [near=0.1] - The near plane distance.
   * @param {number} [far=100] - The far plane distance.
   * @param {Object} [options={}] - The configuration options.
   * @param {number} [options.size=256] - The texture size of the PMREM.
   * @param {Vector3} [options.renderTarget=origin] - The position of the internal cube camera that renders the scene.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromScene(e, t = 0, i = 0.1, r = 100, s = {}) {
    const {
      size: a = 256,
      position: o = Fu
    } = s;
    ds = this._renderer.getRenderTarget(), us = this._renderer.getActiveCubeFace(), fs = this._renderer.getActiveMipmapLevel(), hs = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(a);
    const l = this._allocateTargets();
    return l.depthBuffer = !0, this._sceneToCubeUV(e, i, r, l, o), t > 0 && this._blur(l, 0, 0, t), this._applyPMREM(l), this._cleanup(l), l;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   *
   * @param {Texture} equirectangular - The equirectangular texture to be converted.
   * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   *
   * @param {Texture} cubemap - The cubemap texture to be converted.
   * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = Ca(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = wa(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodMeshes.length; e++)
      this._lodMeshes[e].geometry.dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(ds, us, fs), this._renderer.xr.enabled = hs, e.scissorTest = !1, hi(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), ds = this._renderer.getRenderTarget(), us = this._renderer.getActiveCubeFace(), fs = this._renderer.getActiveMipmapLevel(), hs = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const i = t || this._allocateTargets();
    return this._textureToCubeUV(e, i), this._applyPMREM(i), this._cleanup(i), i;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, i = {
      magFilter: 1006,
      minFilter: 1006,
      generateMipmaps: !1,
      type: 1016,
      format: 1023,
      colorSpace: Si,
      depthBuffer: !1
    }, r = Aa(e, t, i);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Aa(e, t, i);
      const { _lodMax: s } = this;
      ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas } = Nu(s)), this._blurMaterial = Bu(s, e, t), this._ggxMaterial = Ou(s, e, t);
    }
    return r;
  }
  _compileMaterial(e) {
    const t = new Xt(new Ln(), e);
    this._renderer.compile(t, Li);
  }
  _sceneToCubeUV(e, t, i, r, s) {
    const l = new Zt(90, 1, t, i), c = [1, -1, 1, 1, 1, 1], d = [1, 1, 1, -1, -1, -1], u = this._renderer, f = u.autoClear, p = u.toneMapping;
    u.getClearColor(Ea), u.toneMapping = 0, u.autoClear = !1, u.state.buffers.depth.getReversed() && (u.setRenderTarget(r), u.clearDepth(), u.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new Xt(
      new $i(),
      new Yn({
        name: "PMREM.Background",
        side: 1,
        depthWrite: !1,
        depthTest: !1
      })
    ));
    const v = this._backgroundBox, m = v.material;
    let h = !1;
    const T = e.background;
    T ? T.isColor && (m.color.copy(T), e.background = null, h = !0) : (m.color.copy(Ea), h = !0);
    for (let E = 0; E < 6; E++) {
      const A = E % 3;
      A === 0 ? (l.up.set(0, c[E], 0), l.position.set(s.x, s.y, s.z), l.lookAt(s.x + d[E], s.y, s.z)) : A === 1 ? (l.up.set(0, 0, c[E]), l.position.set(s.x, s.y, s.z), l.lookAt(s.x, s.y + d[E], s.z)) : (l.up.set(0, c[E], 0), l.position.set(s.x, s.y, s.z), l.lookAt(s.x, s.y, s.z + d[E]));
      const D = this._cubeSize;
      hi(r, A * D, E > 2 ? D : 0, D, D), u.setRenderTarget(r), h && u.render(v, l), u.render(e, l);
    }
    u.toneMapping = p, u.autoClear = f, e.background = T;
  }
  _textureToCubeUV(e, t) {
    const i = this._renderer, r = e.mapping === 301 || e.mapping === 302;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = Ca()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = wa());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, a = this._lodMeshes[0];
    a.material = s;
    const o = s.uniforms;
    o.envMap.value = e;
    const l = this._cubeSize;
    hi(t, 0, 0, 3 * l, 2 * l), i.setRenderTarget(t), i.render(a, Li);
  }
  _applyPMREM(e) {
    const t = this._renderer, i = t.autoClear;
    t.autoClear = !1;
    const r = this._lodMeshes.length;
    for (let s = 1; s < r; s++)
      this._applyGGXFilter(e, s - 1, s);
    t.autoClear = i;
  }
  /**
   * Applies GGX VNDF importance sampling filter to generate a prefiltered environment map.
   * Uses Monte Carlo integration with VNDF importance sampling to accurately represent the
   * GGX BRDF for physically-based rendering. Reads from the previous LOD level and
   * applies incremental roughness filtering to avoid over-blurring.
   *
   * @private
   * @param {WebGLRenderTarget} cubeUVRenderTarget
   * @param {number} lodIn - Source LOD level to read from
   * @param {number} lodOut - Target LOD level to write to
   */
  _applyGGXFilter(e, t, i) {
    const r = this._renderer, s = this._pingPongRenderTarget, a = this._ggxMaterial, o = this._lodMeshes[i];
    o.material = a;
    const l = a.uniforms, c = i / (this._lodMeshes.length - 1), d = t / (this._lodMeshes.length - 1), u = Math.sqrt(c * c - d * d), f = 0.05 + c * 0.95, p = u * f, { _lodMax: x } = this, v = this._sizeLods[i], m = 3 * v * (i > x - Dn ? i - x + Dn : 0), h = 4 * (this._cubeSize - v);
    l.envMap.value = e.texture, l.roughness.value = p, l.mipInt.value = x - t, hi(s, m, h, 3 * v, 2 * v), r.setRenderTarget(s), r.render(o, Li), l.envMap.value = s.texture, l.roughness.value = 0, l.mipInt.value = x - i, hi(e, m, h, 3 * v, 2 * v), r.setRenderTarget(e), r.render(o, Li);
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   *
   * Used for initial scene blur in fromScene() method when sigma > 0.
   *
   * @private
   * @param {WebGLRenderTarget} cubeUVRenderTarget
   * @param {number} lodIn
   * @param {number} lodOut
   * @param {number} sigma
   * @param {Vector3} [poleAxis]
   */
  _blur(e, t, i, r, s) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      a,
      t,
      i,
      r,
      "latitudinal",
      s
    ), this._halfBlur(
      a,
      e,
      i,
      i,
      r,
      "longitudinal",
      s
    );
  }
  _halfBlur(e, t, i, r, s, a, o) {
    const l = this._renderer, c = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && gt(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const d = 3, u = this._lodMeshes[r];
    u.material = c;
    const f = c.uniforms, p = this._sizeLods[i] - 1, x = isFinite(s) ? Math.PI / (2 * p) : 2 * Math.PI / (2 * qn - 1), v = s / x, m = isFinite(s) ? 1 + Math.floor(d * v) : qn;
    m > qn && Oe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${qn}`);
    const h = [];
    let T = 0;
    for (let P = 0; P < qn; ++P) {
      const O = P / v, M = Math.exp(-O * O / 2);
      h.push(M), P === 0 ? T += M : P < m && (T += 2 * M);
    }
    for (let P = 0; P < h.length; P++)
      h[P] = h[P] / T;
    f.envMap.value = e.texture, f.samples.value = m, f.weights.value = h, f.latitudinal.value = a === "latitudinal", o && (f.poleAxis.value = o);
    const { _lodMax: E } = this;
    f.dTheta.value = x, f.mipInt.value = E - i;
    const A = this._sizeLods[r], D = 3 * A * (r > E - Dn ? r - E + Dn : 0), y = 4 * (this._cubeSize - A);
    hi(t, D, y, 3 * A, 2 * A), l.setRenderTarget(t), l.render(u, Li);
  }
}
function Nu(n) {
  const e = [], t = [], i = [];
  let r = n;
  const s = n - Dn + 1 + ya.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, r);
    e.push(o);
    let l = 1 / o;
    a > n - Dn ? l = ya[a - n + Dn - 1] : a === 0 && (l = 0), t.push(l);
    const c = 1 / (o - 2), d = -c, u = 1 + c, f = [d, d, u, d, u, u, d, d, u, u, d, u], p = 6, x = 6, v = 3, m = 2, h = 1, T = new Float32Array(v * x * p), E = new Float32Array(m * x * p), A = new Float32Array(h * x * p);
    for (let y = 0; y < p; y++) {
      const P = y % 3 * 2 / 3 - 1, O = y > 2 ? 0 : -1, M = [
        P,
        O,
        0,
        P + 2 / 3,
        O,
        0,
        P + 2 / 3,
        O + 1,
        0,
        P,
        O,
        0,
        P + 2 / 3,
        O + 1,
        0,
        P,
        O + 1,
        0
      ];
      T.set(M, v * x * y), E.set(f, m * x * y);
      const S = [y, y, y, y, y, y];
      A.set(S, h * x * y);
    }
    const D = new Ln();
    D.setAttribute("position", new dn(T, v)), D.setAttribute("uv", new dn(E, m)), D.setAttribute("faceIndex", new dn(A, h)), i.push(new Xt(D, null)), r > Dn && r--;
  }
  return { lodMeshes: i, sizeLods: e, sigmas: t };
}
function Aa(n, e, t) {
  const i = new jn(n, e, t);
  return i.texture.mapping = 306, i.texture.name = "PMREM.cubeUv", i.scissorTest = !0, i;
}
function hi(n, e, t, i, r) {
  n.viewport.set(e, t, i, r), n.scissor.set(e, t, i, r);
}
function Ou(n, e, t) {
  return new En({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: Iu,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${n}.0`
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 }
    },
    vertexShader: Ur(),
    fragmentShader: (
      /* glsl */
      `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Bu(n, e, t) {
  const i = new Float32Array(qn), r = new G(0, 1, 0);
  return new En({
    name: "SphericalGaussianBlur",
    defines: {
      n: qn,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${n}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: i },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: Ur(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function wa() {
  return new En({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Ur(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Ca() {
  return new En({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Ur(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Ur() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function zu(n) {
  let e = /* @__PURE__ */ new WeakMap(), t = null;
  function i(o) {
    if (o && o.isTexture) {
      const l = o.mapping, c = l === 303 || l === 304, d = l === 301 || l === 302;
      if (c || d) {
        let u = e.get(o);
        const f = u !== void 0 ? u.texture.pmremVersion : 0;
        if (o.isRenderTargetTexture && o.pmremVersion !== f)
          return t === null && (t = new Ta(n)), u = c ? t.fromEquirectangular(o, u) : t.fromCubemap(o, u), u.texture.pmremVersion = o.pmremVersion, e.set(o, u), u.texture;
        if (u !== void 0)
          return u.texture;
        {
          const p = o.image;
          return c && p && p.height > 0 || d && p && r(p) ? (t === null && (t = new Ta(n)), u = c ? t.fromEquirectangular(o) : t.fromCubemap(o), u.texture.pmremVersion = o.pmremVersion, e.set(o, u), o.addEventListener("dispose", s), u.texture) : null;
        }
      }
    }
    return o;
  }
  function r(o) {
    let l = 0;
    const c = 6;
    for (let d = 0; d < c; d++)
      o[d] !== void 0 && l++;
    return l === c;
  }
  function s(o) {
    const l = o.target;
    l.removeEventListener("dispose", s);
    const c = e.get(l);
    c !== void 0 && (e.delete(l), c.dispose());
  }
  function a() {
    e = /* @__PURE__ */ new WeakMap(), t !== null && (t.dispose(), t = null);
  }
  return {
    get: i,
    dispose: a
  };
}
function Gu(n) {
  const e = {};
  function t(i) {
    if (e[i] !== void 0)
      return e[i];
    const r = n.getExtension(i);
    return e[i] = r, r;
  }
  return {
    has: function(i) {
      return t(i) !== null;
    },
    init: function() {
      t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent");
    },
    get: function(i) {
      const r = t(i);
      return r === null && Hi("WebGLRenderer: " + i + " extension not supported."), r;
    }
  };
}
function Vu(n, e, t, i) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function a(u) {
    const f = u.target;
    f.index !== null && e.remove(f.index);
    for (const x in f.attributes)
      e.remove(f.attributes[x]);
    f.removeEventListener("dispose", a), delete r[f.id];
    const p = s.get(f);
    p && (e.remove(p), s.delete(f)), i.releaseStatesOfGeometry(f), f.isInstancedBufferGeometry === !0 && delete f._maxInstanceCount, t.memory.geometries--;
  }
  function o(u, f) {
    return r[f.id] === !0 || (f.addEventListener("dispose", a), r[f.id] = !0, t.memory.geometries++), f;
  }
  function l(u) {
    const f = u.attributes;
    for (const p in f)
      e.update(f[p], n.ARRAY_BUFFER);
  }
  function c(u) {
    const f = [], p = u.index, x = u.attributes.position;
    let v = 0;
    if (p !== null) {
      const T = p.array;
      v = p.version;
      for (let E = 0, A = T.length; E < A; E += 3) {
        const D = T[E + 0], y = T[E + 1], P = T[E + 2];
        f.push(D, y, y, P, P, D);
      }
    } else if (x !== void 0) {
      const T = x.array;
      v = x.version;
      for (let E = 0, A = T.length / 3 - 1; E < A; E += 3) {
        const D = E + 0, y = E + 1, P = E + 2;
        f.push(D, y, y, P, P, D);
      }
    } else
      return;
    const m = new (ro(f) ? co : lo)(f, 1);
    m.version = v;
    const h = s.get(u);
    h && e.remove(h), s.set(u, m);
  }
  function d(u) {
    const f = s.get(u);
    if (f) {
      const p = u.index;
      p !== null && f.version < p.version && c(u);
    } else
      c(u);
    return s.get(u);
  }
  return {
    get: o,
    update: l,
    getWireframeAttribute: d
  };
}
function ku(n, e, t) {
  let i;
  function r(f) {
    i = f;
  }
  let s, a;
  function o(f) {
    s = f.type, a = f.bytesPerElement;
  }
  function l(f, p) {
    n.drawElements(i, p, s, f * a), t.update(p, i, 1);
  }
  function c(f, p, x) {
    x !== 0 && (n.drawElementsInstanced(i, p, s, f * a, x), t.update(p, i, x));
  }
  function d(f, p, x) {
    if (x === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i, p, 0, s, f, 0, x);
    let m = 0;
    for (let h = 0; h < x; h++)
      m += p[h];
    t.update(m, i, 1);
  }
  function u(f, p, x, v) {
    if (x === 0) return;
    const m = e.get("WEBGL_multi_draw");
    if (m === null)
      for (let h = 0; h < f.length; h++)
        c(f[h] / a, p[h], v[h]);
    else {
      m.multiDrawElementsInstancedWEBGL(i, p, 0, s, f, 0, v, 0, x);
      let h = 0;
      for (let T = 0; T < x; T++)
        h += p[T] * v[T];
      t.update(h, i, 1);
    }
  }
  this.setMode = r, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = d, this.renderMultiDrawInstances = u;
}
function Hu(n) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function i(s, a, o) {
    switch (t.calls++, a) {
      case n.TRIANGLES:
        t.triangles += o * (s / 3);
        break;
      case n.LINES:
        t.lines += o * (s / 2);
        break;
      case n.LINE_STRIP:
        t.lines += o * (s - 1);
        break;
      case n.LINE_LOOP:
        t.lines += o * s;
        break;
      case n.POINTS:
        t.points += o * s;
        break;
      default:
        gt("WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function r() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: r,
    update: i
  };
}
function Wu(n, e, t) {
  const i = /* @__PURE__ */ new WeakMap(), r = new _t();
  function s(a, o, l) {
    const c = a.morphTargetInfluences, d = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, u = d !== void 0 ? d.length : 0;
    let f = i.get(o);
    if (f === void 0 || f.count !== u) {
      let M = function() {
        P.dispose(), i.delete(o), o.removeEventListener("dispose", M);
      };
      f !== void 0 && f.texture.dispose();
      const p = o.morphAttributes.position !== void 0, x = o.morphAttributes.normal !== void 0, v = o.morphAttributes.color !== void 0, m = o.morphAttributes.position || [], h = o.morphAttributes.normal || [], T = o.morphAttributes.color || [];
      let E = 0;
      p === !0 && (E = 1), x === !0 && (E = 2), v === !0 && (E = 3);
      let A = o.attributes.position.count * E, D = 1;
      A > e.maxTextureSize && (D = Math.ceil(A / e.maxTextureSize), A = e.maxTextureSize);
      const y = new Float32Array(A * D * 4 * u), P = new so(y, A, D, u);
      P.type = 1015, P.needsUpdate = !0;
      const O = E * 4;
      for (let S = 0; S < u; S++) {
        const L = m[S], z = h[S], H = T[S], q = A * D * 4 * S;
        for (let K = 0; K < L.count; K++) {
          const Y = K * O;
          p === !0 && (r.fromBufferAttribute(L, K), y[q + Y + 0] = r.x, y[q + Y + 1] = r.y, y[q + Y + 2] = r.z, y[q + Y + 3] = 0), x === !0 && (r.fromBufferAttribute(z, K), y[q + Y + 4] = r.x, y[q + Y + 5] = r.y, y[q + Y + 6] = r.z, y[q + Y + 7] = 0), v === !0 && (r.fromBufferAttribute(H, K), y[q + Y + 8] = r.x, y[q + Y + 9] = r.y, y[q + Y + 10] = r.z, y[q + Y + 11] = H.itemSize === 4 ? r.w : 1);
        }
      }
      f = {
        count: u,
        texture: P,
        size: new rt(A, D)
      }, i.set(o, f), o.addEventListener("dispose", M);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      l.getUniforms().setValue(n, "morphTexture", a.morphTexture, t);
    else {
      let p = 0;
      for (let v = 0; v < c.length; v++)
        p += c[v];
      const x = o.morphTargetsRelative ? 1 : 1 - p;
      l.getUniforms().setValue(n, "morphTargetBaseInfluence", x), l.getUniforms().setValue(n, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(n, "morphTargetsTexture", f.texture, t), l.getUniforms().setValue(n, "morphTargetsTextureSize", f.size);
  }
  return {
    update: s
  };
}
function Xu(n, e, t, i) {
  let r = /* @__PURE__ */ new WeakMap();
  function s(l) {
    const c = i.render.frame, d = l.geometry, u = e.get(l, d);
    if (r.get(u) !== c && (e.update(u), r.set(u, c)), l.isInstancedMesh && (l.hasEventListener("dispose", o) === !1 && l.addEventListener("dispose", o), r.get(l) !== c && (t.update(l.instanceMatrix, n.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, n.ARRAY_BUFFER), r.set(l, c))), l.isSkinnedMesh) {
      const f = l.skeleton;
      r.get(f) !== c && (f.update(), r.set(f, c));
    }
    return u;
  }
  function a() {
    r = /* @__PURE__ */ new WeakMap();
  }
  function o(l) {
    const c = l.target;
    c.removeEventListener("dispose", o), t.remove(c.instanceMatrix), c.instanceColor !== null && t.remove(c.instanceColor);
  }
  return {
    update: s,
    dispose: a
  };
}
const vo = /* @__PURE__ */ new Pt(), Ra = /* @__PURE__ */ new xo(1, 1), So = /* @__PURE__ */ new so(), Mo = /* @__PURE__ */ new hl(), bo = /* @__PURE__ */ new ho(), Pa = [], Da = [], La = new Float32Array(16), Ua = new Float32Array(9), Ia = new Float32Array(4);
function Ti(n, e, t) {
  const i = n[0];
  if (i <= 0 || i > 0) return n;
  const r = e * t;
  let s = Pa[r];
  if (s === void 0 && (s = new Float32Array(r), Pa[r] = s), e !== 0) {
    i.toArray(s, 0);
    for (let a = 1, o = 0; a !== e; ++a)
      o += t, n[a].toArray(s, o);
  }
  return s;
}
function yt(n, e) {
  if (n.length !== e.length) return !1;
  for (let t = 0, i = n.length; t < i; t++)
    if (n[t] !== e[t]) return !1;
  return !0;
}
function Et(n, e) {
  for (let t = 0, i = e.length; t < i; t++)
    n[t] = e[t];
}
function Ir(n, e) {
  let t = Da[e];
  t === void 0 && (t = new Int32Array(e), Da[e] = t);
  for (let i = 0; i !== e; ++i)
    t[i] = n.allocateTextureUnit();
  return t;
}
function qu(n, e) {
  const t = this.cache;
  t[0] !== e && (n.uniform1f(this.addr, e), t[0] = e);
}
function Yu(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (n.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (yt(t, e)) return;
    n.uniform2fv(this.addr, e), Et(t, e);
  }
}
function $u(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (n.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (n.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (yt(t, e)) return;
    n.uniform3fv(this.addr, e), Et(t, e);
  }
}
function Ku(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (n.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (yt(t, e)) return;
    n.uniform4fv(this.addr, e), Et(t, e);
  }
}
function Zu(n, e) {
  const t = this.cache, i = e.elements;
  if (i === void 0) {
    if (yt(t, e)) return;
    n.uniformMatrix2fv(this.addr, !1, e), Et(t, e);
  } else {
    if (yt(t, i)) return;
    Ia.set(i), n.uniformMatrix2fv(this.addr, !1, Ia), Et(t, i);
  }
}
function ju(n, e) {
  const t = this.cache, i = e.elements;
  if (i === void 0) {
    if (yt(t, e)) return;
    n.uniformMatrix3fv(this.addr, !1, e), Et(t, e);
  } else {
    if (yt(t, i)) return;
    Ua.set(i), n.uniformMatrix3fv(this.addr, !1, Ua), Et(t, i);
  }
}
function Ju(n, e) {
  const t = this.cache, i = e.elements;
  if (i === void 0) {
    if (yt(t, e)) return;
    n.uniformMatrix4fv(this.addr, !1, e), Et(t, e);
  } else {
    if (yt(t, i)) return;
    La.set(i), n.uniformMatrix4fv(this.addr, !1, La), Et(t, i);
  }
}
function Qu(n, e) {
  const t = this.cache;
  t[0] !== e && (n.uniform1i(this.addr, e), t[0] = e);
}
function ef(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (n.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (yt(t, e)) return;
    n.uniform2iv(this.addr, e), Et(t, e);
  }
}
function tf(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (n.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (yt(t, e)) return;
    n.uniform3iv(this.addr, e), Et(t, e);
  }
}
function nf(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (n.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (yt(t, e)) return;
    n.uniform4iv(this.addr, e), Et(t, e);
  }
}
function rf(n, e) {
  const t = this.cache;
  t[0] !== e && (n.uniform1ui(this.addr, e), t[0] = e);
}
function sf(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (n.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (yt(t, e)) return;
    n.uniform2uiv(this.addr, e), Et(t, e);
  }
}
function af(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (n.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (yt(t, e)) return;
    n.uniform3uiv(this.addr, e), Et(t, e);
  }
}
function of(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (n.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (yt(t, e)) return;
    n.uniform4uiv(this.addr, e), Et(t, e);
  }
}
function lf(n, e, t) {
  const i = this.cache, r = t.allocateTextureUnit();
  i[0] !== r && (n.uniform1i(this.addr, r), i[0] = r);
  let s;
  this.type === n.SAMPLER_2D_SHADOW ? (Ra.compareFunction = 515, s = Ra) : s = vo, t.setTexture2D(e || s, r);
}
function cf(n, e, t) {
  const i = this.cache, r = t.allocateTextureUnit();
  i[0] !== r && (n.uniform1i(this.addr, r), i[0] = r), t.setTexture3D(e || Mo, r);
}
function df(n, e, t) {
  const i = this.cache, r = t.allocateTextureUnit();
  i[0] !== r && (n.uniform1i(this.addr, r), i[0] = r), t.setTextureCube(e || bo, r);
}
function uf(n, e, t) {
  const i = this.cache, r = t.allocateTextureUnit();
  i[0] !== r && (n.uniform1i(this.addr, r), i[0] = r), t.setTexture2DArray(e || So, r);
}
function ff(n) {
  switch (n) {
    case 5126:
      return qu;
    // FLOAT
    case 35664:
      return Yu;
    // _VEC2
    case 35665:
      return $u;
    // _VEC3
    case 35666:
      return Ku;
    // _VEC4
    case 35674:
      return Zu;
    // _MAT2
    case 35675:
      return ju;
    // _MAT3
    case 35676:
      return Ju;
    // _MAT4
    case 5124:
    case 35670:
      return Qu;
    // INT, BOOL
    case 35667:
    case 35671:
      return ef;
    // _VEC2
    case 35668:
    case 35672:
      return tf;
    // _VEC3
    case 35669:
    case 35673:
      return nf;
    // _VEC4
    case 5125:
      return rf;
    // UINT
    case 36294:
      return sf;
    // _VEC2
    case 36295:
      return af;
    // _VEC3
    case 36296:
      return of;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return lf;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return cf;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return df;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return uf;
  }
}
function hf(n, e) {
  n.uniform1fv(this.addr, e);
}
function pf(n, e) {
  const t = Ti(e, this.size, 2);
  n.uniform2fv(this.addr, t);
}
function mf(n, e) {
  const t = Ti(e, this.size, 3);
  n.uniform3fv(this.addr, t);
}
function xf(n, e) {
  const t = Ti(e, this.size, 4);
  n.uniform4fv(this.addr, t);
}
function gf(n, e) {
  const t = Ti(e, this.size, 4);
  n.uniformMatrix2fv(this.addr, !1, t);
}
function _f(n, e) {
  const t = Ti(e, this.size, 9);
  n.uniformMatrix3fv(this.addr, !1, t);
}
function vf(n, e) {
  const t = Ti(e, this.size, 16);
  n.uniformMatrix4fv(this.addr, !1, t);
}
function Sf(n, e) {
  n.uniform1iv(this.addr, e);
}
function Mf(n, e) {
  n.uniform2iv(this.addr, e);
}
function bf(n, e) {
  n.uniform3iv(this.addr, e);
}
function yf(n, e) {
  n.uniform4iv(this.addr, e);
}
function Ef(n, e) {
  n.uniform1uiv(this.addr, e);
}
function Tf(n, e) {
  n.uniform2uiv(this.addr, e);
}
function Af(n, e) {
  n.uniform3uiv(this.addr, e);
}
function wf(n, e) {
  n.uniform4uiv(this.addr, e);
}
function Cf(n, e, t) {
  const i = this.cache, r = e.length, s = Ir(t, r);
  yt(i, s) || (n.uniform1iv(this.addr, s), Et(i, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture2D(e[a] || vo, s[a]);
}
function Rf(n, e, t) {
  const i = this.cache, r = e.length, s = Ir(t, r);
  yt(i, s) || (n.uniform1iv(this.addr, s), Et(i, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture3D(e[a] || Mo, s[a]);
}
function Pf(n, e, t) {
  const i = this.cache, r = e.length, s = Ir(t, r);
  yt(i, s) || (n.uniform1iv(this.addr, s), Et(i, s));
  for (let a = 0; a !== r; ++a)
    t.setTextureCube(e[a] || bo, s[a]);
}
function Df(n, e, t) {
  const i = this.cache, r = e.length, s = Ir(t, r);
  yt(i, s) || (n.uniform1iv(this.addr, s), Et(i, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture2DArray(e[a] || So, s[a]);
}
function Lf(n) {
  switch (n) {
    case 5126:
      return hf;
    // FLOAT
    case 35664:
      return pf;
    // _VEC2
    case 35665:
      return mf;
    // _VEC3
    case 35666:
      return xf;
    // _VEC4
    case 35674:
      return gf;
    // _MAT2
    case 35675:
      return _f;
    // _MAT3
    case 35676:
      return vf;
    // _MAT4
    case 5124:
    case 35670:
      return Sf;
    // INT, BOOL
    case 35667:
    case 35671:
      return Mf;
    // _VEC2
    case 35668:
    case 35672:
      return bf;
    // _VEC3
    case 35669:
    case 35673:
      return yf;
    // _VEC4
    case 5125:
      return Ef;
    // UINT
    case 36294:
      return Tf;
    // _VEC2
    case 36295:
      return Af;
    // _VEC3
    case 36296:
      return wf;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return Cf;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return Rf;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return Pf;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return Df;
  }
}
class Uf {
  constructor(e, t, i) {
    this.id = e, this.addr = i, this.cache = [], this.type = t.type, this.setValue = ff(t.type);
  }
}
class If {
  constructor(e, t, i) {
    this.id = e, this.addr = i, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = Lf(t.type);
  }
}
class Ff {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, i) {
    const r = this.seq;
    for (let s = 0, a = r.length; s !== a; ++s) {
      const o = r[s];
      o.setValue(e, t[o.id], i);
    }
  }
}
const ps = /(\w+)(\])?(\[|\.)?/g;
function Fa(n, e) {
  n.seq.push(e), n.map[e.id] = e;
}
function Nf(n, e, t) {
  const i = n.name, r = i.length;
  for (ps.lastIndex = 0; ; ) {
    const s = ps.exec(i), a = ps.lastIndex;
    let o = s[1];
    const l = s[2] === "]", c = s[3];
    if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === r) {
      Fa(t, c === void 0 ? new Uf(o, n, e) : new If(o, n, e));
      break;
    } else {
      let u = t.map[o];
      u === void 0 && (u = new Ff(o), Fa(t, u)), t = u;
    }
  }
}
class gr {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let r = 0; r < i; ++r) {
      const s = e.getActiveUniform(t, r), a = e.getUniformLocation(t, s.name);
      Nf(s, a, this);
    }
  }
  setValue(e, t, i, r) {
    const s = this.map[t];
    s !== void 0 && s.setValue(e, i, r);
  }
  setOptional(e, t, i) {
    const r = t[i];
    r !== void 0 && this.setValue(e, i, r);
  }
  static upload(e, t, i, r) {
    for (let s = 0, a = t.length; s !== a; ++s) {
      const o = t[s], l = i[o.id];
      l.needsUpdate !== !1 && o.setValue(e, l.value, r);
    }
  }
  static seqWithValue(e, t) {
    const i = [];
    for (let r = 0, s = e.length; r !== s; ++r) {
      const a = e[r];
      a.id in t && i.push(a);
    }
    return i;
  }
}
function Na(n, e, t) {
  const i = n.createShader(e);
  return n.shaderSource(i, t), n.compileShader(i), i;
}
const Of = 37297;
let Bf = 0;
function zf(n, e) {
  const t = n.split(`
`), i = [], r = Math.max(e - 6, 0), s = Math.min(e + 6, t.length);
  for (let a = r; a < s; a++) {
    const o = a + 1;
    i.push(`${o === e ? ">" : " "} ${o}: ${t[a]}`);
  }
  return i.join(`
`);
}
const Oa = /* @__PURE__ */ new Be();
function Gf(n) {
  Ze._getMatrix(Oa, Ze.workingColorSpace, n);
  const e = `mat3( ${Oa.elements.map((t) => t.toFixed(4))} )`;
  switch (Ze.getTransfer(n)) {
    case yr:
      return [e, "LinearTransferOETF"];
    case it:
      return [e, "sRGBTransferOETF"];
    default:
      return Oe("WebGLProgram: Unsupported color space: ", n), [e, "LinearTransferOETF"];
  }
}
function Ba(n, e, t) {
  const i = n.getShaderParameter(e, n.COMPILE_STATUS), s = (n.getShaderInfoLog(e) || "").trim();
  if (i && s === "") return "";
  const a = /ERROR: 0:(\d+)/.exec(s);
  if (a) {
    const o = parseInt(a[1]);
    return t.toUpperCase() + `

` + s + `

` + zf(n.getShaderSource(e), o);
  } else
    return s;
}
function Vf(n, e) {
  const t = Gf(e);
  return [
    `vec4 ${n}( vec4 value ) {`,
    `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
function kf(n, e) {
  let t;
  switch (e) {
    case 1:
      t = "Linear";
      break;
    case 2:
      t = "Reinhard";
      break;
    case 3:
      t = "Cineon";
      break;
    case 4:
      t = "ACESFilmic";
      break;
    case 6:
      t = "AgX";
      break;
    case 7:
      t = "Neutral";
      break;
    case 5:
      t = "Custom";
      break;
    default:
      Oe("WebGLProgram: Unsupported toneMapping:", e), t = "Linear";
  }
  return "vec3 " + n + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const xr = /* @__PURE__ */ new G();
function Hf() {
  Ze.getLuminanceCoefficients(xr);
  const n = xr.x.toFixed(4), e = xr.y.toFixed(4), t = xr.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function Wf(n) {
  return [
    n.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    n.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Ii).join(`
`);
}
function Xf(n) {
  const e = [];
  for (const t in n) {
    const i = n[t];
    i !== !1 && e.push("#define " + t + " " + i);
  }
  return e.join(`
`);
}
function qf(n, e) {
  const t = {}, i = n.getProgramParameter(e, n.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < i; r++) {
    const s = n.getActiveAttrib(e, r), a = s.name;
    let o = 1;
    s.type === n.FLOAT_MAT2 && (o = 2), s.type === n.FLOAT_MAT3 && (o = 3), s.type === n.FLOAT_MAT4 && (o = 4), t[a] = {
      type: s.type,
      location: n.getAttribLocation(e, a),
      locationSize: o
    };
  }
  return t;
}
function Ii(n) {
  return n !== "";
}
function za(n, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return n.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Ga(n, e) {
  return n.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const Yf = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Ss(n) {
  return n.replace(Yf, Kf);
}
const $f = /* @__PURE__ */ new Map();
function Kf(n, e) {
  let t = ze[e];
  if (t === void 0) {
    const i = $f.get(e);
    if (i !== void 0)
      t = ze[i], Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, i);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return Ss(t);
}
const Zf = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Va(n) {
  return n.replace(Zf, jf);
}
function jf(n, e, t, i) {
  let r = "";
  for (let s = parseInt(e); s < parseInt(t); s++)
    r += i.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function ka(n) {
  let e = `precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;
  return n.precision === "highp" ? e += `
#define HIGH_PRECISION` : n.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : n.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
function Jf(n) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return n.shadowMapType === 1 ? e = "SHADOWMAP_TYPE_PCF" : n.shadowMapType === 2 ? e = "SHADOWMAP_TYPE_PCF_SOFT" : n.shadowMapType === 3 && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function Qf(n) {
  let e = "ENVMAP_TYPE_CUBE";
  if (n.envMap)
    switch (n.envMapMode) {
      case 301:
      case 302:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case 306:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function eh(n) {
  let e = "ENVMAP_MODE_REFLECTION";
  return n.envMap && n.envMapMode === 302 && (e = "ENVMAP_MODE_REFRACTION"), e;
}
function th(n) {
  let e = "ENVMAP_BLENDING_NONE";
  if (n.envMap)
    switch (n.combine) {
      case 0:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case 1:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case 2:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function nh(n) {
  const e = n.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, i = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)), texelHeight: i, maxMip: t };
}
function ih(n, e, t, i) {
  const r = n.getContext(), s = t.defines;
  let a = t.vertexShader, o = t.fragmentShader;
  const l = Jf(t), c = Qf(t), d = eh(t), u = th(t), f = nh(t), p = Wf(t), x = Xf(s), v = r.createProgram();
  let m, h, T = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (m = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x
  ].filter(Ii).join(`
`), m.length > 0 && (m += `
`), h = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x
  ].filter(Ii).join(`
`), h.length > 0 && (h += `
`)) : (m = [
    ka(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + d : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(Ii).join(`
`), h = [
    ka(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + c : "",
    t.envMap ? "#define " + d : "",
    t.envMap ? "#define " + u : "",
    f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "",
    f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "",
    f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.dispersion ? "#define USE_DISPERSION" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor || t.batchingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + l : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    t.toneMapping !== 0 ? ze.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== 0 ? kf("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    ze.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    Vf("linearToOutputTexel", t.outputColorSpace),
    Hf(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(Ii).join(`
`)), a = Ss(a), a = za(a, t), a = Ga(a, t), o = Ss(o), o = za(o, t), o = Ga(o, t), a = Va(a), o = Va(o), t.isRawShaderMaterial !== !0 && (T = `#version 300 es
`, m = [
    p,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + m, h = [
    "#define varying in",
    t.glslVersion === ia ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === ia ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + h);
  const E = T + m + a, A = T + h + o, D = Na(r, r.VERTEX_SHADER, E), y = Na(r, r.FRAGMENT_SHADER, A);
  r.attachShader(v, D), r.attachShader(v, y), t.index0AttributeName !== void 0 ? r.bindAttribLocation(v, 0, t.index0AttributeName) : t.morphTargets === !0 && r.bindAttribLocation(v, 0, "position"), r.linkProgram(v);
  function P(L) {
    if (n.debug.checkShaderErrors) {
      const z = r.getProgramInfoLog(v) || "", H = r.getShaderInfoLog(D) || "", q = r.getShaderInfoLog(y) || "", K = z.trim(), Y = H.trim(), te = q.trim();
      let W = !0, Q = !0;
      if (r.getProgramParameter(v, r.LINK_STATUS) === !1)
        if (W = !1, typeof n.debug.onShaderError == "function")
          n.debug.onShaderError(r, v, D, y);
        else {
          const re = Ba(r, D, "vertex"), Me = Ba(r, y, "fragment");
          gt(
            "THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(v, r.VALIDATE_STATUS) + `

Material Name: ` + L.name + `
Material Type: ` + L.type + `

Program Info Log: ` + K + `
` + re + `
` + Me
          );
        }
      else K !== "" ? Oe("WebGLProgram: Program Info Log:", K) : (Y === "" || te === "") && (Q = !1);
      Q && (L.diagnostics = {
        runnable: W,
        programLog: K,
        vertexShader: {
          log: Y,
          prefix: m
        },
        fragmentShader: {
          log: te,
          prefix: h
        }
      });
    }
    r.deleteShader(D), r.deleteShader(y), O = new gr(r, v), M = qf(r, v);
  }
  let O;
  this.getUniforms = function() {
    return O === void 0 && P(this), O;
  };
  let M;
  this.getAttributes = function() {
    return M === void 0 && P(this), M;
  };
  let S = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return S === !1 && (S = r.getProgramParameter(v, Of)), S;
  }, this.destroy = function() {
    i.releaseStatesOfProgram(this), r.deleteProgram(v), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = Bf++, this.cacheKey = e, this.usedTimes = 1, this.program = v, this.vertexShader = D, this.fragmentShader = y, this;
}
let rh = 0;
class sh {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, i = e.fragmentShader, r = this._getShaderStage(t), s = this._getShaderStage(i), a = this._getShaderCacheForMaterial(e);
    return a.has(r) === !1 && (a.add(r), r.usedTimes++), a.has(s) === !1 && (a.add(s), s.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const i of t)
      i.usedTimes--, i.usedTimes === 0 && this.shaderCache.delete(i.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let i = t.get(e);
    return i === void 0 && (i = /* @__PURE__ */ new Set(), t.set(e, i)), i;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let i = t.get(e);
    return i === void 0 && (i = new ah(e), t.set(e, i)), i;
  }
}
class ah {
  constructor(e) {
    this.id = rh++, this.code = e, this.usedTimes = 0;
  }
}
function oh(n, e, t, i, r, s, a) {
  const o = new ao(), l = new sh(), c = /* @__PURE__ */ new Set(), d = [], u = r.logarithmicDepthBuffer, f = r.vertexTextures;
  let p = r.precision;
  const x = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function v(M) {
    return c.add(M), M === 0 ? "uv" : `uv${M}`;
  }
  function m(M, S, L, z, H) {
    const q = z.fog, K = H.geometry, Y = M.isMeshStandardMaterial ? z.environment : null, te = (M.isMeshStandardMaterial ? t : e).get(M.envMap || Y), W = te && te.mapping === 306 ? te.image.height : null, Q = x[M.type];
    M.precision !== null && (p = r.getMaxPrecision(M.precision), p !== M.precision && Oe("WebGLProgram.getParameters:", M.precision, "not supported, using", p, "instead."));
    const re = K.morphAttributes.position || K.morphAttributes.normal || K.morphAttributes.color, Me = re !== void 0 ? re.length : 0;
    let ke = 0;
    K.morphAttributes.position !== void 0 && (ke = 1), K.morphAttributes.normal !== void 0 && (ke = 2), K.morphAttributes.color !== void 0 && (ke = 3);
    let et, je, st, V;
    if (Q) {
      const tt = ln[Q];
      et = tt.vertexShader, je = tt.fragmentShader;
    } else
      et = M.vertexShader, je = M.fragmentShader, l.update(M), st = l.getVertexShaderID(M), V = l.getFragmentShaderID(M);
    const X = n.getRenderTarget(), ne = n.state.buffers.depth.getReversed(), Se = H.isInstancedMesh === !0, ue = H.isBatchedMesh === !0, Ne = !!M.map, xt = !!M.matcap, Ve = !!te, at = !!M.aoMap, w = !!M.lightMap, He = !!M.bumpMap, We = !!M.normalMap, lt = !!M.displacementMap, _e = !!M.emissiveMap, ut = !!M.metalnessMap, Te = !!M.roughnessMap, Fe = M.anisotropy > 0, b = M.clearcoat > 0, g = M.dispersion > 0, F = M.iridescence > 0, $ = M.sheen > 0, j = M.transmission > 0, k = Fe && !!M.anisotropyMap, be = b && !!M.clearcoatMap, ce = b && !!M.clearcoatNormalMap, Ae = b && !!M.clearcoatRoughnessMap, ve = F && !!M.iridescenceMap, J = F && !!M.iridescenceThicknessMap, se = $ && !!M.sheenColorMap, Pe = $ && !!M.sheenRoughnessMap, Ce = !!M.specularMap, he = !!M.specularColorMap, Ue = !!M.specularIntensityMap, C = j && !!M.transmissionMap, de = j && !!M.thicknessMap, ae = !!M.gradientMap, oe = !!M.alphaMap, ee = M.alphaTest > 0, Z = !!M.alphaHash, xe = !!M.extensions;
    let Ie = 0;
    M.toneMapped && (X === null || X.isXRRenderTarget === !0) && (Ie = n.toneMapping);
    const ct = {
      shaderID: Q,
      shaderType: M.type,
      shaderName: M.name,
      vertexShader: et,
      fragmentShader: je,
      defines: M.defines,
      customVertexShaderID: st,
      customFragmentShaderID: V,
      isRawShaderMaterial: M.isRawShaderMaterial === !0,
      glslVersion: M.glslVersion,
      precision: p,
      batching: ue,
      batchingColor: ue && H._colorsTexture !== null,
      instancing: Se,
      instancingColor: Se && H.instanceColor !== null,
      instancingMorph: Se && H.morphTexture !== null,
      supportsVertexTextures: f,
      outputColorSpace: X === null ? n.outputColorSpace : X.isXRRenderTarget === !0 ? X.texture.colorSpace : Si,
      alphaToCoverage: !!M.alphaToCoverage,
      map: Ne,
      matcap: xt,
      envMap: Ve,
      envMapMode: Ve && te.mapping,
      envMapCubeUVHeight: W,
      aoMap: at,
      lightMap: w,
      bumpMap: He,
      normalMap: We,
      displacementMap: f && lt,
      emissiveMap: _e,
      normalMapObjectSpace: We && M.normalMapType === 1,
      normalMapTangentSpace: We && M.normalMapType === 0,
      metalnessMap: ut,
      roughnessMap: Te,
      anisotropy: Fe,
      anisotropyMap: k,
      clearcoat: b,
      clearcoatMap: be,
      clearcoatNormalMap: ce,
      clearcoatRoughnessMap: Ae,
      dispersion: g,
      iridescence: F,
      iridescenceMap: ve,
      iridescenceThicknessMap: J,
      sheen: $,
      sheenColorMap: se,
      sheenRoughnessMap: Pe,
      specularMap: Ce,
      specularColorMap: he,
      specularIntensityMap: Ue,
      transmission: j,
      transmissionMap: C,
      thicknessMap: de,
      gradientMap: ae,
      opaque: M.transparent === !1 && M.blending === 1 && M.alphaToCoverage === !1,
      alphaMap: oe,
      alphaTest: ee,
      alphaHash: Z,
      combine: M.combine,
      //
      mapUv: Ne && v(M.map.channel),
      aoMapUv: at && v(M.aoMap.channel),
      lightMapUv: w && v(M.lightMap.channel),
      bumpMapUv: He && v(M.bumpMap.channel),
      normalMapUv: We && v(M.normalMap.channel),
      displacementMapUv: lt && v(M.displacementMap.channel),
      emissiveMapUv: _e && v(M.emissiveMap.channel),
      metalnessMapUv: ut && v(M.metalnessMap.channel),
      roughnessMapUv: Te && v(M.roughnessMap.channel),
      anisotropyMapUv: k && v(M.anisotropyMap.channel),
      clearcoatMapUv: be && v(M.clearcoatMap.channel),
      clearcoatNormalMapUv: ce && v(M.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: Ae && v(M.clearcoatRoughnessMap.channel),
      iridescenceMapUv: ve && v(M.iridescenceMap.channel),
      iridescenceThicknessMapUv: J && v(M.iridescenceThicknessMap.channel),
      sheenColorMapUv: se && v(M.sheenColorMap.channel),
      sheenRoughnessMapUv: Pe && v(M.sheenRoughnessMap.channel),
      specularMapUv: Ce && v(M.specularMap.channel),
      specularColorMapUv: he && v(M.specularColorMap.channel),
      specularIntensityMapUv: Ue && v(M.specularIntensityMap.channel),
      transmissionMapUv: C && v(M.transmissionMap.channel),
      thicknessMapUv: de && v(M.thicknessMap.channel),
      alphaMapUv: oe && v(M.alphaMap.channel),
      //
      vertexTangents: !!K.attributes.tangent && (We || Fe),
      vertexColors: M.vertexColors,
      vertexAlphas: M.vertexColors === !0 && !!K.attributes.color && K.attributes.color.itemSize === 4,
      pointsUvs: H.isPoints === !0 && !!K.attributes.uv && (Ne || oe),
      fog: !!q,
      useFog: M.fog === !0,
      fogExp2: !!q && q.isFogExp2,
      flatShading: M.flatShading === !0 && M.wireframe === !1,
      sizeAttenuation: M.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      reversedDepthBuffer: ne,
      skinning: H.isSkinnedMesh === !0,
      morphTargets: K.morphAttributes.position !== void 0,
      morphNormals: K.morphAttributes.normal !== void 0,
      morphColors: K.morphAttributes.color !== void 0,
      morphTargetsCount: Me,
      morphTextureStride: ke,
      numDirLights: S.directional.length,
      numPointLights: S.point.length,
      numSpotLights: S.spot.length,
      numSpotLightMaps: S.spotLightMap.length,
      numRectAreaLights: S.rectArea.length,
      numHemiLights: S.hemi.length,
      numDirLightShadows: S.directionalShadowMap.length,
      numPointLightShadows: S.pointShadowMap.length,
      numSpotLightShadows: S.spotShadowMap.length,
      numSpotLightShadowsWithMaps: S.numSpotLightShadowsWithMaps,
      numLightProbes: S.numLightProbes,
      numClippingPlanes: a.numPlanes,
      numClipIntersection: a.numIntersection,
      dithering: M.dithering,
      shadowMapEnabled: n.shadowMap.enabled && L.length > 0,
      shadowMapType: n.shadowMap.type,
      toneMapping: Ie,
      decodeVideoTexture: Ne && M.map.isVideoTexture === !0 && Ze.getTransfer(M.map.colorSpace) === it,
      decodeVideoTextureEmissive: _e && M.emissiveMap.isVideoTexture === !0 && Ze.getTransfer(M.emissiveMap.colorSpace) === it,
      premultipliedAlpha: M.premultipliedAlpha,
      doubleSided: M.side === 2,
      flipSided: M.side === 1,
      useDepthPacking: M.depthPacking >= 0,
      depthPacking: M.depthPacking || 0,
      index0AttributeName: M.index0AttributeName,
      extensionClipCullDistance: xe && M.extensions.clipCullDistance === !0 && i.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (xe && M.extensions.multiDraw === !0 || ue) && i.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: i.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: M.customProgramCacheKey()
    };
    return ct.vertexUv1s = c.has(1), ct.vertexUv2s = c.has(2), ct.vertexUv3s = c.has(3), c.clear(), ct;
  }
  function h(M) {
    const S = [];
    if (M.shaderID ? S.push(M.shaderID) : (S.push(M.customVertexShaderID), S.push(M.customFragmentShaderID)), M.defines !== void 0)
      for (const L in M.defines)
        S.push(L), S.push(M.defines[L]);
    return M.isRawShaderMaterial === !1 && (T(S, M), E(S, M), S.push(n.outputColorSpace)), S.push(M.customProgramCacheKey), S.join();
  }
  function T(M, S) {
    M.push(S.precision), M.push(S.outputColorSpace), M.push(S.envMapMode), M.push(S.envMapCubeUVHeight), M.push(S.mapUv), M.push(S.alphaMapUv), M.push(S.lightMapUv), M.push(S.aoMapUv), M.push(S.bumpMapUv), M.push(S.normalMapUv), M.push(S.displacementMapUv), M.push(S.emissiveMapUv), M.push(S.metalnessMapUv), M.push(S.roughnessMapUv), M.push(S.anisotropyMapUv), M.push(S.clearcoatMapUv), M.push(S.clearcoatNormalMapUv), M.push(S.clearcoatRoughnessMapUv), M.push(S.iridescenceMapUv), M.push(S.iridescenceThicknessMapUv), M.push(S.sheenColorMapUv), M.push(S.sheenRoughnessMapUv), M.push(S.specularMapUv), M.push(S.specularColorMapUv), M.push(S.specularIntensityMapUv), M.push(S.transmissionMapUv), M.push(S.thicknessMapUv), M.push(S.combine), M.push(S.fogExp2), M.push(S.sizeAttenuation), M.push(S.morphTargetsCount), M.push(S.morphAttributeCount), M.push(S.numDirLights), M.push(S.numPointLights), M.push(S.numSpotLights), M.push(S.numSpotLightMaps), M.push(S.numHemiLights), M.push(S.numRectAreaLights), M.push(S.numDirLightShadows), M.push(S.numPointLightShadows), M.push(S.numSpotLightShadows), M.push(S.numSpotLightShadowsWithMaps), M.push(S.numLightProbes), M.push(S.shadowMapType), M.push(S.toneMapping), M.push(S.numClippingPlanes), M.push(S.numClipIntersection), M.push(S.depthPacking);
  }
  function E(M, S) {
    o.disableAll(), S.supportsVertexTextures && o.enable(0), S.instancing && o.enable(1), S.instancingColor && o.enable(2), S.instancingMorph && o.enable(3), S.matcap && o.enable(4), S.envMap && o.enable(5), S.normalMapObjectSpace && o.enable(6), S.normalMapTangentSpace && o.enable(7), S.clearcoat && o.enable(8), S.iridescence && o.enable(9), S.alphaTest && o.enable(10), S.vertexColors && o.enable(11), S.vertexAlphas && o.enable(12), S.vertexUv1s && o.enable(13), S.vertexUv2s && o.enable(14), S.vertexUv3s && o.enable(15), S.vertexTangents && o.enable(16), S.anisotropy && o.enable(17), S.alphaHash && o.enable(18), S.batching && o.enable(19), S.dispersion && o.enable(20), S.batchingColor && o.enable(21), S.gradientMap && o.enable(22), M.push(o.mask), o.disableAll(), S.fog && o.enable(0), S.useFog && o.enable(1), S.flatShading && o.enable(2), S.logarithmicDepthBuffer && o.enable(3), S.reversedDepthBuffer && o.enable(4), S.skinning && o.enable(5), S.morphTargets && o.enable(6), S.morphNormals && o.enable(7), S.morphColors && o.enable(8), S.premultipliedAlpha && o.enable(9), S.shadowMapEnabled && o.enable(10), S.doubleSided && o.enable(11), S.flipSided && o.enable(12), S.useDepthPacking && o.enable(13), S.dithering && o.enable(14), S.transmission && o.enable(15), S.sheen && o.enable(16), S.opaque && o.enable(17), S.pointsUvs && o.enable(18), S.decodeVideoTexture && o.enable(19), S.decodeVideoTextureEmissive && o.enable(20), S.alphaToCoverage && o.enable(21), M.push(o.mask);
  }
  function A(M) {
    const S = x[M.type];
    let L;
    if (S) {
      const z = ln[S];
      L = wl.clone(z.uniforms);
    } else
      L = M.uniforms;
    return L;
  }
  function D(M, S) {
    let L;
    for (let z = 0, H = d.length; z < H; z++) {
      const q = d[z];
      if (q.cacheKey === S) {
        L = q, ++L.usedTimes;
        break;
      }
    }
    return L === void 0 && (L = new ih(n, S, M, s), d.push(L)), L;
  }
  function y(M) {
    if (--M.usedTimes === 0) {
      const S = d.indexOf(M);
      d[S] = d[d.length - 1], d.pop(), M.destroy();
    }
  }
  function P(M) {
    l.remove(M);
  }
  function O() {
    l.dispose();
  }
  return {
    getParameters: m,
    getProgramCacheKey: h,
    getUniforms: A,
    acquireProgram: D,
    releaseProgram: y,
    releaseShaderCache: P,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: d,
    dispose: O
  };
}
function lh() {
  let n = /* @__PURE__ */ new WeakMap();
  function e(a) {
    return n.has(a);
  }
  function t(a) {
    let o = n.get(a);
    return o === void 0 && (o = {}, n.set(a, o)), o;
  }
  function i(a) {
    n.delete(a);
  }
  function r(a, o, l) {
    n.get(a)[o] = l;
  }
  function s() {
    n = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: e,
    get: t,
    remove: i,
    update: r,
    dispose: s
  };
}
function ch(n, e) {
  return n.groupOrder !== e.groupOrder ? n.groupOrder - e.groupOrder : n.renderOrder !== e.renderOrder ? n.renderOrder - e.renderOrder : n.material.id !== e.material.id ? n.material.id - e.material.id : n.z !== e.z ? n.z - e.z : n.id - e.id;
}
function Ha(n, e) {
  return n.groupOrder !== e.groupOrder ? n.groupOrder - e.groupOrder : n.renderOrder !== e.renderOrder ? n.renderOrder - e.renderOrder : n.z !== e.z ? e.z - n.z : n.id - e.id;
}
function Wa() {
  const n = [];
  let e = 0;
  const t = [], i = [], r = [];
  function s() {
    e = 0, t.length = 0, i.length = 0, r.length = 0;
  }
  function a(u, f, p, x, v, m) {
    let h = n[e];
    return h === void 0 ? (h = {
      id: u.id,
      object: u,
      geometry: f,
      material: p,
      groupOrder: x,
      renderOrder: u.renderOrder,
      z: v,
      group: m
    }, n[e] = h) : (h.id = u.id, h.object = u, h.geometry = f, h.material = p, h.groupOrder = x, h.renderOrder = u.renderOrder, h.z = v, h.group = m), e++, h;
  }
  function o(u, f, p, x, v, m) {
    const h = a(u, f, p, x, v, m);
    p.transmission > 0 ? i.push(h) : p.transparent === !0 ? r.push(h) : t.push(h);
  }
  function l(u, f, p, x, v, m) {
    const h = a(u, f, p, x, v, m);
    p.transmission > 0 ? i.unshift(h) : p.transparent === !0 ? r.unshift(h) : t.unshift(h);
  }
  function c(u, f) {
    t.length > 1 && t.sort(u || ch), i.length > 1 && i.sort(f || Ha), r.length > 1 && r.sort(f || Ha);
  }
  function d() {
    for (let u = e, f = n.length; u < f; u++) {
      const p = n[u];
      if (p.id === null) break;
      p.id = null, p.object = null, p.geometry = null, p.material = null, p.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: i,
    transparent: r,
    init: s,
    push: o,
    unshift: l,
    finish: d,
    sort: c
  };
}
function dh() {
  let n = /* @__PURE__ */ new WeakMap();
  function e(i, r) {
    const s = n.get(i);
    let a;
    return s === void 0 ? (a = new Wa(), n.set(i, [a])) : r >= s.length ? (a = new Wa(), s.push(a)) : a = s[r], a;
  }
  function t() {
    n = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function uh() {
  const n = {};
  return {
    get: function(e) {
      if (n[e.id] !== void 0)
        return n[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new G(),
            color: new Qe()
          };
          break;
        case "SpotLight":
          t = {
            position: new G(),
            direction: new G(),
            color: new Qe(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new G(),
            color: new Qe(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new G(),
            skyColor: new Qe(),
            groundColor: new Qe()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Qe(),
            position: new G(),
            halfWidth: new G(),
            halfHeight: new G()
          };
          break;
      }
      return n[e.id] = t, t;
    }
  };
}
function fh() {
  const n = {};
  return {
    get: function(e) {
      if (n[e.id] !== void 0)
        return n[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new rt()
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new rt()
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new rt(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return n[e.id] = t, t;
    }
  };
}
let hh = 0;
function ph(n, e) {
  return (e.castShadow ? 2 : 0) - (n.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (n.map ? 1 : 0);
}
function mh(n) {
  const e = new uh(), t = fh(), i = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let c = 0; c < 9; c++) i.probe.push(new G());
  const r = new G(), s = new bt(), a = new bt();
  function o(c) {
    let d = 0, u = 0, f = 0;
    for (let M = 0; M < 9; M++) i.probe[M].set(0, 0, 0);
    let p = 0, x = 0, v = 0, m = 0, h = 0, T = 0, E = 0, A = 0, D = 0, y = 0, P = 0;
    c.sort(ph);
    for (let M = 0, S = c.length; M < S; M++) {
      const L = c[M], z = L.color, H = L.intensity, q = L.distance, K = L.shadow && L.shadow.map ? L.shadow.map.texture : null;
      if (L.isAmbientLight)
        d += z.r * H, u += z.g * H, f += z.b * H;
      else if (L.isLightProbe) {
        for (let Y = 0; Y < 9; Y++)
          i.probe[Y].addScaledVector(L.sh.coefficients[Y], H);
        P++;
      } else if (L.isDirectionalLight) {
        const Y = e.get(L);
        if (Y.color.copy(L.color).multiplyScalar(L.intensity), L.castShadow) {
          const te = L.shadow, W = t.get(L);
          W.shadowIntensity = te.intensity, W.shadowBias = te.bias, W.shadowNormalBias = te.normalBias, W.shadowRadius = te.radius, W.shadowMapSize = te.mapSize, i.directionalShadow[p] = W, i.directionalShadowMap[p] = K, i.directionalShadowMatrix[p] = L.shadow.matrix, T++;
        }
        i.directional[p] = Y, p++;
      } else if (L.isSpotLight) {
        const Y = e.get(L);
        Y.position.setFromMatrixPosition(L.matrixWorld), Y.color.copy(z).multiplyScalar(H), Y.distance = q, Y.coneCos = Math.cos(L.angle), Y.penumbraCos = Math.cos(L.angle * (1 - L.penumbra)), Y.decay = L.decay, i.spot[v] = Y;
        const te = L.shadow;
        if (L.map && (i.spotLightMap[D] = L.map, D++, te.updateMatrices(L), L.castShadow && y++), i.spotLightMatrix[v] = te.matrix, L.castShadow) {
          const W = t.get(L);
          W.shadowIntensity = te.intensity, W.shadowBias = te.bias, W.shadowNormalBias = te.normalBias, W.shadowRadius = te.radius, W.shadowMapSize = te.mapSize, i.spotShadow[v] = W, i.spotShadowMap[v] = K, A++;
        }
        v++;
      } else if (L.isRectAreaLight) {
        const Y = e.get(L);
        Y.color.copy(z).multiplyScalar(H), Y.halfWidth.set(L.width * 0.5, 0, 0), Y.halfHeight.set(0, L.height * 0.5, 0), i.rectArea[m] = Y, m++;
      } else if (L.isPointLight) {
        const Y = e.get(L);
        if (Y.color.copy(L.color).multiplyScalar(L.intensity), Y.distance = L.distance, Y.decay = L.decay, L.castShadow) {
          const te = L.shadow, W = t.get(L);
          W.shadowIntensity = te.intensity, W.shadowBias = te.bias, W.shadowNormalBias = te.normalBias, W.shadowRadius = te.radius, W.shadowMapSize = te.mapSize, W.shadowCameraNear = te.camera.near, W.shadowCameraFar = te.camera.far, i.pointShadow[x] = W, i.pointShadowMap[x] = K, i.pointShadowMatrix[x] = L.shadow.matrix, E++;
        }
        i.point[x] = Y, x++;
      } else if (L.isHemisphereLight) {
        const Y = e.get(L);
        Y.skyColor.copy(L.color).multiplyScalar(H), Y.groundColor.copy(L.groundColor).multiplyScalar(H), i.hemi[h] = Y, h++;
      }
    }
    m > 0 && (n.has("OES_texture_float_linear") === !0 ? (i.rectAreaLTC1 = le.LTC_FLOAT_1, i.rectAreaLTC2 = le.LTC_FLOAT_2) : (i.rectAreaLTC1 = le.LTC_HALF_1, i.rectAreaLTC2 = le.LTC_HALF_2)), i.ambient[0] = d, i.ambient[1] = u, i.ambient[2] = f;
    const O = i.hash;
    (O.directionalLength !== p || O.pointLength !== x || O.spotLength !== v || O.rectAreaLength !== m || O.hemiLength !== h || O.numDirectionalShadows !== T || O.numPointShadows !== E || O.numSpotShadows !== A || O.numSpotMaps !== D || O.numLightProbes !== P) && (i.directional.length = p, i.spot.length = v, i.rectArea.length = m, i.point.length = x, i.hemi.length = h, i.directionalShadow.length = T, i.directionalShadowMap.length = T, i.pointShadow.length = E, i.pointShadowMap.length = E, i.spotShadow.length = A, i.spotShadowMap.length = A, i.directionalShadowMatrix.length = T, i.pointShadowMatrix.length = E, i.spotLightMatrix.length = A + D - y, i.spotLightMap.length = D, i.numSpotLightShadowsWithMaps = y, i.numLightProbes = P, O.directionalLength = p, O.pointLength = x, O.spotLength = v, O.rectAreaLength = m, O.hemiLength = h, O.numDirectionalShadows = T, O.numPointShadows = E, O.numSpotShadows = A, O.numSpotMaps = D, O.numLightProbes = P, i.version = hh++);
  }
  function l(c, d) {
    let u = 0, f = 0, p = 0, x = 0, v = 0;
    const m = d.matrixWorldInverse;
    for (let h = 0, T = c.length; h < T; h++) {
      const E = c[h];
      if (E.isDirectionalLight) {
        const A = i.directional[u];
        A.direction.setFromMatrixPosition(E.matrixWorld), r.setFromMatrixPosition(E.target.matrixWorld), A.direction.sub(r), A.direction.transformDirection(m), u++;
      } else if (E.isSpotLight) {
        const A = i.spot[p];
        A.position.setFromMatrixPosition(E.matrixWorld), A.position.applyMatrix4(m), A.direction.setFromMatrixPosition(E.matrixWorld), r.setFromMatrixPosition(E.target.matrixWorld), A.direction.sub(r), A.direction.transformDirection(m), p++;
      } else if (E.isRectAreaLight) {
        const A = i.rectArea[x];
        A.position.setFromMatrixPosition(E.matrixWorld), A.position.applyMatrix4(m), a.identity(), s.copy(E.matrixWorld), s.premultiply(m), a.extractRotation(s), A.halfWidth.set(E.width * 0.5, 0, 0), A.halfHeight.set(0, E.height * 0.5, 0), A.halfWidth.applyMatrix4(a), A.halfHeight.applyMatrix4(a), x++;
      } else if (E.isPointLight) {
        const A = i.point[f];
        A.position.setFromMatrixPosition(E.matrixWorld), A.position.applyMatrix4(m), f++;
      } else if (E.isHemisphereLight) {
        const A = i.hemi[v];
        A.direction.setFromMatrixPosition(E.matrixWorld), A.direction.transformDirection(m), v++;
      }
    }
  }
  return {
    setup: o,
    setupView: l,
    state: i
  };
}
function Xa(n) {
  const e = new mh(n), t = [], i = [];
  function r(d) {
    c.camera = d, t.length = 0, i.length = 0;
  }
  function s(d) {
    t.push(d);
  }
  function a(d) {
    i.push(d);
  }
  function o() {
    e.setup(t);
  }
  function l(d) {
    e.setupView(t, d);
  }
  const c = {
    lightsArray: t,
    shadowsArray: i,
    camera: null,
    lights: e,
    transmissionRenderTarget: {}
  };
  return {
    init: r,
    state: c,
    setupLights: o,
    setupLightsView: l,
    pushLight: s,
    pushShadow: a
  };
}
function xh(n) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(r, s = 0) {
    const a = e.get(r);
    let o;
    return a === void 0 ? (o = new Xa(n), e.set(r, [o])) : s >= a.length ? (o = new Xa(n), a.push(o)) : o = a[s], o;
  }
  function i() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: i
  };
}
const gh = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, _h = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function vh(n, e, t) {
  let i = new po();
  const r = new rt(), s = new rt(), a = new _t(), o = new Bl({ depthPacking: 3201 }), l = new zl(), c = {}, d = t.maxTextureSize, u = { 0: 1, 1: 0, 2: 2 }, f = new En({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new rt() },
      radius: { value: 4 }
    },
    vertexShader: gh,
    fragmentShader: _h
  }), p = f.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const x = new Ln();
  x.setAttribute(
    "position",
    new dn(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const v = new Xt(x, f), m = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let h = this.type;
  this.render = function(y, P, O) {
    if (m.enabled === !1 || m.autoUpdate === !1 && m.needsUpdate === !1 || y.length === 0) return;
    const M = n.getRenderTarget(), S = n.getActiveCubeFace(), L = n.getActiveMipmapLevel(), z = n.state;
    z.setBlending(0), z.buffers.depth.getReversed() === !0 ? z.buffers.color.setClear(0, 0, 0, 0) : z.buffers.color.setClear(1, 1, 1, 1), z.buffers.depth.setTest(!0), z.setScissorTest(!1);
    const H = h !== 3 && this.type === 3, q = h === 3 && this.type !== 3;
    for (let K = 0, Y = y.length; K < Y; K++) {
      const te = y[K], W = te.shadow;
      if (W === void 0) {
        Oe("WebGLShadowMap:", te, "has no shadow.");
        continue;
      }
      if (W.autoUpdate === !1 && W.needsUpdate === !1) continue;
      r.copy(W.mapSize);
      const Q = W.getFrameExtents();
      if (r.multiply(Q), s.copy(W.mapSize), (r.x > d || r.y > d) && (r.x > d && (s.x = Math.floor(d / Q.x), r.x = s.x * Q.x, W.mapSize.x = s.x), r.y > d && (s.y = Math.floor(d / Q.y), r.y = s.y * Q.y, W.mapSize.y = s.y)), W.map === null || H === !0 || q === !0) {
        const Me = this.type !== 3 ? { minFilter: 1003, magFilter: 1003 } : {};
        W.map !== null && W.map.dispose(), W.map = new jn(r.x, r.y, Me), W.map.texture.name = te.name + ".shadowMap", W.camera.updateProjectionMatrix();
      }
      n.setRenderTarget(W.map), n.clear();
      const re = W.getViewportCount();
      for (let Me = 0; Me < re; Me++) {
        const ke = W.getViewport(Me);
        a.set(
          s.x * ke.x,
          s.y * ke.y,
          s.x * ke.z,
          s.y * ke.w
        ), z.viewport(a), W.updateMatrices(te, Me), i = W.getFrustum(), A(P, O, W.camera, te, this.type);
      }
      W.isPointLightShadow !== !0 && this.type === 3 && T(W, O), W.needsUpdate = !1;
    }
    h = this.type, m.needsUpdate = !1, n.setRenderTarget(M, S, L);
  };
  function T(y, P) {
    const O = e.update(v);
    f.defines.VSM_SAMPLES !== y.blurSamples && (f.defines.VSM_SAMPLES = y.blurSamples, p.defines.VSM_SAMPLES = y.blurSamples, f.needsUpdate = !0, p.needsUpdate = !0), y.mapPass === null && (y.mapPass = new jn(r.x, r.y)), f.uniforms.shadow_pass.value = y.map.texture, f.uniforms.resolution.value = y.mapSize, f.uniforms.radius.value = y.radius, n.setRenderTarget(y.mapPass), n.clear(), n.renderBufferDirect(P, null, O, f, v, null), p.uniforms.shadow_pass.value = y.mapPass.texture, p.uniforms.resolution.value = y.mapSize, p.uniforms.radius.value = y.radius, n.setRenderTarget(y.map), n.clear(), n.renderBufferDirect(P, null, O, p, v, null);
  }
  function E(y, P, O, M) {
    let S = null;
    const L = O.isPointLight === !0 ? y.customDistanceMaterial : y.customDepthMaterial;
    if (L !== void 0)
      S = L;
    else if (S = O.isPointLight === !0 ? l : o, n.localClippingEnabled && P.clipShadows === !0 && Array.isArray(P.clippingPlanes) && P.clippingPlanes.length !== 0 || P.displacementMap && P.displacementScale !== 0 || P.alphaMap && P.alphaTest > 0 || P.map && P.alphaTest > 0 || P.alphaToCoverage === !0) {
      const z = S.uuid, H = P.uuid;
      let q = c[z];
      q === void 0 && (q = {}, c[z] = q);
      let K = q[H];
      K === void 0 && (K = S.clone(), q[H] = K, P.addEventListener("dispose", D)), S = K;
    }
    if (S.visible = P.visible, S.wireframe = P.wireframe, M === 3 ? S.side = P.shadowSide !== null ? P.shadowSide : P.side : S.side = P.shadowSide !== null ? P.shadowSide : u[P.side], S.alphaMap = P.alphaMap, S.alphaTest = P.alphaToCoverage === !0 ? 0.5 : P.alphaTest, S.map = P.map, S.clipShadows = P.clipShadows, S.clippingPlanes = P.clippingPlanes, S.clipIntersection = P.clipIntersection, S.displacementMap = P.displacementMap, S.displacementScale = P.displacementScale, S.displacementBias = P.displacementBias, S.wireframeLinewidth = P.wireframeLinewidth, S.linewidth = P.linewidth, O.isPointLight === !0 && S.isMeshDistanceMaterial === !0) {
      const z = n.properties.get(S);
      z.light = O;
    }
    return S;
  }
  function A(y, P, O, M, S) {
    if (y.visible === !1) return;
    if (y.layers.test(P.layers) && (y.isMesh || y.isLine || y.isPoints) && (y.castShadow || y.receiveShadow && S === 3) && (!y.frustumCulled || i.intersectsObject(y))) {
      y.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, y.matrixWorld);
      const H = e.update(y), q = y.material;
      if (Array.isArray(q)) {
        const K = H.groups;
        for (let Y = 0, te = K.length; Y < te; Y++) {
          const W = K[Y], Q = q[W.materialIndex];
          if (Q && Q.visible) {
            const re = E(y, Q, M, S);
            y.onBeforeShadow(n, y, P, O, H, re, W), n.renderBufferDirect(O, null, H, re, y, W), y.onAfterShadow(n, y, P, O, H, re, W);
          }
        }
      } else if (q.visible) {
        const K = E(y, q, M, S);
        y.onBeforeShadow(n, y, P, O, H, K, null), n.renderBufferDirect(O, null, H, K, y, null), y.onAfterShadow(n, y, P, O, H, K, null);
      }
    }
    const z = y.children;
    for (let H = 0, q = z.length; H < q; H++)
      A(z[H], P, O, M, S);
  }
  function D(y) {
    y.target.removeEventListener("dispose", D);
    for (const O in c) {
      const M = c[O], S = y.target.uuid;
      S in M && (M[S].dispose(), delete M[S]);
    }
  }
}
const Sh = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
};
function Mh(n, e) {
  function t() {
    let C = !1;
    const de = new _t();
    let ae = null;
    const oe = new _t(0, 0, 0, 0);
    return {
      setMask: function(ee) {
        ae !== ee && !C && (n.colorMask(ee, ee, ee, ee), ae = ee);
      },
      setLocked: function(ee) {
        C = ee;
      },
      setClear: function(ee, Z, xe, Ie, ct) {
        ct === !0 && (ee *= Ie, Z *= Ie, xe *= Ie), de.set(ee, Z, xe, Ie), oe.equals(de) === !1 && (n.clearColor(ee, Z, xe, Ie), oe.copy(de));
      },
      reset: function() {
        C = !1, ae = null, oe.set(-1, 0, 0, 0);
      }
    };
  }
  function i() {
    let C = !1, de = !1, ae = null, oe = null, ee = null;
    return {
      setReversed: function(Z) {
        if (de !== Z) {
          const xe = e.get("EXT_clip_control");
          Z ? xe.clipControlEXT(xe.LOWER_LEFT_EXT, xe.ZERO_TO_ONE_EXT) : xe.clipControlEXT(xe.LOWER_LEFT_EXT, xe.NEGATIVE_ONE_TO_ONE_EXT), de = Z;
          const Ie = ee;
          ee = null, this.setClear(Ie);
        }
      },
      getReversed: function() {
        return de;
      },
      setTest: function(Z) {
        Z ? X(n.DEPTH_TEST) : ne(n.DEPTH_TEST);
      },
      setMask: function(Z) {
        ae !== Z && !C && (n.depthMask(Z), ae = Z);
      },
      setFunc: function(Z) {
        if (de && (Z = Sh[Z]), oe !== Z) {
          switch (Z) {
            case 0:
              n.depthFunc(n.NEVER);
              break;
            case 1:
              n.depthFunc(n.ALWAYS);
              break;
            case 2:
              n.depthFunc(n.LESS);
              break;
            case 3:
              n.depthFunc(n.LEQUAL);
              break;
            case 4:
              n.depthFunc(n.EQUAL);
              break;
            case 5:
              n.depthFunc(n.GEQUAL);
              break;
            case 6:
              n.depthFunc(n.GREATER);
              break;
            case 7:
              n.depthFunc(n.NOTEQUAL);
              break;
            default:
              n.depthFunc(n.LEQUAL);
          }
          oe = Z;
        }
      },
      setLocked: function(Z) {
        C = Z;
      },
      setClear: function(Z) {
        ee !== Z && (de && (Z = 1 - Z), n.clearDepth(Z), ee = Z);
      },
      reset: function() {
        C = !1, ae = null, oe = null, ee = null, de = !1;
      }
    };
  }
  function r() {
    let C = !1, de = null, ae = null, oe = null, ee = null, Z = null, xe = null, Ie = null, ct = null;
    return {
      setTest: function(tt) {
        C || (tt ? X(n.STENCIL_TEST) : ne(n.STENCIL_TEST));
      },
      setMask: function(tt) {
        de !== tt && !C && (n.stencilMask(tt), de = tt);
      },
      setFunc: function(tt, an, Qt) {
        (ae !== tt || oe !== an || ee !== Qt) && (n.stencilFunc(tt, an, Qt), ae = tt, oe = an, ee = Qt);
      },
      setOp: function(tt, an, Qt) {
        (Z !== tt || xe !== an || Ie !== Qt) && (n.stencilOp(tt, an, Qt), Z = tt, xe = an, Ie = Qt);
      },
      setLocked: function(tt) {
        C = tt;
      },
      setClear: function(tt) {
        ct !== tt && (n.clearStencil(tt), ct = tt);
      },
      reset: function() {
        C = !1, de = null, ae = null, oe = null, ee = null, Z = null, xe = null, Ie = null, ct = null;
      }
    };
  }
  const s = new t(), a = new i(), o = new r(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let d = {}, u = {}, f = /* @__PURE__ */ new WeakMap(), p = [], x = null, v = !1, m = null, h = null, T = null, E = null, A = null, D = null, y = null, P = new Qe(0, 0, 0), O = 0, M = !1, S = null, L = null, z = null, H = null, q = null;
  const K = n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let Y = !1, te = 0;
  const W = n.getParameter(n.VERSION);
  W.indexOf("WebGL") !== -1 ? (te = parseFloat(/^WebGL (\d)/.exec(W)[1]), Y = te >= 1) : W.indexOf("OpenGL ES") !== -1 && (te = parseFloat(/^OpenGL ES (\d)/.exec(W)[1]), Y = te >= 2);
  let Q = null, re = {};
  const Me = n.getParameter(n.SCISSOR_BOX), ke = n.getParameter(n.VIEWPORT), et = new _t().fromArray(Me), je = new _t().fromArray(ke);
  function st(C, de, ae, oe) {
    const ee = new Uint8Array(4), Z = n.createTexture();
    n.bindTexture(C, Z), n.texParameteri(C, n.TEXTURE_MIN_FILTER, n.NEAREST), n.texParameteri(C, n.TEXTURE_MAG_FILTER, n.NEAREST);
    for (let xe = 0; xe < ae; xe++)
      C === n.TEXTURE_3D || C === n.TEXTURE_2D_ARRAY ? n.texImage3D(de, 0, n.RGBA, 1, 1, oe, 0, n.RGBA, n.UNSIGNED_BYTE, ee) : n.texImage2D(de + xe, 0, n.RGBA, 1, 1, 0, n.RGBA, n.UNSIGNED_BYTE, ee);
    return Z;
  }
  const V = {};
  V[n.TEXTURE_2D] = st(n.TEXTURE_2D, n.TEXTURE_2D, 1), V[n.TEXTURE_CUBE_MAP] = st(n.TEXTURE_CUBE_MAP, n.TEXTURE_CUBE_MAP_POSITIVE_X, 6), V[n.TEXTURE_2D_ARRAY] = st(n.TEXTURE_2D_ARRAY, n.TEXTURE_2D_ARRAY, 1, 1), V[n.TEXTURE_3D] = st(n.TEXTURE_3D, n.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), X(n.DEPTH_TEST), a.setFunc(3), He(!1), We(1), X(n.CULL_FACE), at(0);
  function X(C) {
    d[C] !== !0 && (n.enable(C), d[C] = !0);
  }
  function ne(C) {
    d[C] !== !1 && (n.disable(C), d[C] = !1);
  }
  function Se(C, de) {
    return u[C] !== de ? (n.bindFramebuffer(C, de), u[C] = de, C === n.DRAW_FRAMEBUFFER && (u[n.FRAMEBUFFER] = de), C === n.FRAMEBUFFER && (u[n.DRAW_FRAMEBUFFER] = de), !0) : !1;
  }
  function ue(C, de) {
    let ae = p, oe = !1;
    if (C) {
      ae = f.get(de), ae === void 0 && (ae = [], f.set(de, ae));
      const ee = C.textures;
      if (ae.length !== ee.length || ae[0] !== n.COLOR_ATTACHMENT0) {
        for (let Z = 0, xe = ee.length; Z < xe; Z++)
          ae[Z] = n.COLOR_ATTACHMENT0 + Z;
        ae.length = ee.length, oe = !0;
      }
    } else
      ae[0] !== n.BACK && (ae[0] = n.BACK, oe = !0);
    oe && n.drawBuffers(ae);
  }
  function Ne(C) {
    return x !== C ? (n.useProgram(C), x = C, !0) : !1;
  }
  const xt = {
    100: n.FUNC_ADD,
    101: n.FUNC_SUBTRACT,
    102: n.FUNC_REVERSE_SUBTRACT
  };
  xt[103] = n.MIN, xt[104] = n.MAX;
  const Ve = {
    200: n.ZERO,
    201: n.ONE,
    202: n.SRC_COLOR,
    204: n.SRC_ALPHA,
    210: n.SRC_ALPHA_SATURATE,
    208: n.DST_COLOR,
    206: n.DST_ALPHA,
    203: n.ONE_MINUS_SRC_COLOR,
    205: n.ONE_MINUS_SRC_ALPHA,
    209: n.ONE_MINUS_DST_COLOR,
    207: n.ONE_MINUS_DST_ALPHA,
    211: n.CONSTANT_COLOR,
    212: n.ONE_MINUS_CONSTANT_COLOR,
    213: n.CONSTANT_ALPHA,
    214: n.ONE_MINUS_CONSTANT_ALPHA
  };
  function at(C, de, ae, oe, ee, Z, xe, Ie, ct, tt) {
    if (C === 0) {
      v === !0 && (ne(n.BLEND), v = !1);
      return;
    }
    if (v === !1 && (X(n.BLEND), v = !0), C !== 5) {
      if (C !== m || tt !== M) {
        if ((h !== 100 || A !== 100) && (n.blendEquation(n.FUNC_ADD), h = 100, A = 100), tt)
          switch (C) {
            case 1:
              n.blendFuncSeparate(n.ONE, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              n.blendFunc(n.ONE, n.ONE);
              break;
            case 3:
              n.blendFuncSeparate(n.ZERO, n.ONE_MINUS_SRC_COLOR, n.ZERO, n.ONE);
              break;
            case 4:
              n.blendFuncSeparate(n.DST_COLOR, n.ONE_MINUS_SRC_ALPHA, n.ZERO, n.ONE);
              break;
            default:
              gt("WebGLState: Invalid blending: ", C);
              break;
          }
        else
          switch (C) {
            case 1:
              n.blendFuncSeparate(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              n.blendFuncSeparate(n.SRC_ALPHA, n.ONE, n.ONE, n.ONE);
              break;
            case 3:
              gt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
              break;
            case 4:
              gt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
              break;
            default:
              gt("WebGLState: Invalid blending: ", C);
              break;
          }
        T = null, E = null, D = null, y = null, P.set(0, 0, 0), O = 0, m = C, M = tt;
      }
      return;
    }
    ee = ee || de, Z = Z || ae, xe = xe || oe, (de !== h || ee !== A) && (n.blendEquationSeparate(xt[de], xt[ee]), h = de, A = ee), (ae !== T || oe !== E || Z !== D || xe !== y) && (n.blendFuncSeparate(Ve[ae], Ve[oe], Ve[Z], Ve[xe]), T = ae, E = oe, D = Z, y = xe), (Ie.equals(P) === !1 || ct !== O) && (n.blendColor(Ie.r, Ie.g, Ie.b, ct), P.copy(Ie), O = ct), m = C, M = !1;
  }
  function w(C, de) {
    C.side === 2 ? ne(n.CULL_FACE) : X(n.CULL_FACE);
    let ae = C.side === 1;
    de && (ae = !ae), He(ae), C.blending === 1 && C.transparent === !1 ? at(0) : at(C.blending, C.blendEquation, C.blendSrc, C.blendDst, C.blendEquationAlpha, C.blendSrcAlpha, C.blendDstAlpha, C.blendColor, C.blendAlpha, C.premultipliedAlpha), a.setFunc(C.depthFunc), a.setTest(C.depthTest), a.setMask(C.depthWrite), s.setMask(C.colorWrite);
    const oe = C.stencilWrite;
    o.setTest(oe), oe && (o.setMask(C.stencilWriteMask), o.setFunc(C.stencilFunc, C.stencilRef, C.stencilFuncMask), o.setOp(C.stencilFail, C.stencilZFail, C.stencilZPass)), _e(C.polygonOffset, C.polygonOffsetFactor, C.polygonOffsetUnits), C.alphaToCoverage === !0 ? X(n.SAMPLE_ALPHA_TO_COVERAGE) : ne(n.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function He(C) {
    S !== C && (C ? n.frontFace(n.CW) : n.frontFace(n.CCW), S = C);
  }
  function We(C) {
    C !== 0 ? (X(n.CULL_FACE), C !== L && (C === 1 ? n.cullFace(n.BACK) : C === 2 ? n.cullFace(n.FRONT) : n.cullFace(n.FRONT_AND_BACK))) : ne(n.CULL_FACE), L = C;
  }
  function lt(C) {
    C !== z && (Y && n.lineWidth(C), z = C);
  }
  function _e(C, de, ae) {
    C ? (X(n.POLYGON_OFFSET_FILL), (H !== de || q !== ae) && (n.polygonOffset(de, ae), H = de, q = ae)) : ne(n.POLYGON_OFFSET_FILL);
  }
  function ut(C) {
    C ? X(n.SCISSOR_TEST) : ne(n.SCISSOR_TEST);
  }
  function Te(C) {
    C === void 0 && (C = n.TEXTURE0 + K - 1), Q !== C && (n.activeTexture(C), Q = C);
  }
  function Fe(C, de, ae) {
    ae === void 0 && (Q === null ? ae = n.TEXTURE0 + K - 1 : ae = Q);
    let oe = re[ae];
    oe === void 0 && (oe = { type: void 0, texture: void 0 }, re[ae] = oe), (oe.type !== C || oe.texture !== de) && (Q !== ae && (n.activeTexture(ae), Q = ae), n.bindTexture(C, de || V[C]), oe.type = C, oe.texture = de);
  }
  function b() {
    const C = re[Q];
    C !== void 0 && C.type !== void 0 && (n.bindTexture(C.type, null), C.type = void 0, C.texture = void 0);
  }
  function g() {
    try {
      n.compressedTexImage2D(...arguments);
    } catch (C) {
      C("WebGLState:", C);
    }
  }
  function F() {
    try {
      n.compressedTexImage3D(...arguments);
    } catch (C) {
      C("WebGLState:", C);
    }
  }
  function $() {
    try {
      n.texSubImage2D(...arguments);
    } catch (C) {
      C("WebGLState:", C);
    }
  }
  function j() {
    try {
      n.texSubImage3D(...arguments);
    } catch (C) {
      C("WebGLState:", C);
    }
  }
  function k() {
    try {
      n.compressedTexSubImage2D(...arguments);
    } catch (C) {
      C("WebGLState:", C);
    }
  }
  function be() {
    try {
      n.compressedTexSubImage3D(...arguments);
    } catch (C) {
      C("WebGLState:", C);
    }
  }
  function ce() {
    try {
      n.texStorage2D(...arguments);
    } catch (C) {
      C("WebGLState:", C);
    }
  }
  function Ae() {
    try {
      n.texStorage3D(...arguments);
    } catch (C) {
      C("WebGLState:", C);
    }
  }
  function ve() {
    try {
      n.texImage2D(...arguments);
    } catch (C) {
      C("WebGLState:", C);
    }
  }
  function J() {
    try {
      n.texImage3D(...arguments);
    } catch (C) {
      C("WebGLState:", C);
    }
  }
  function se(C) {
    et.equals(C) === !1 && (n.scissor(C.x, C.y, C.z, C.w), et.copy(C));
  }
  function Pe(C) {
    je.equals(C) === !1 && (n.viewport(C.x, C.y, C.z, C.w), je.copy(C));
  }
  function Ce(C, de) {
    let ae = c.get(de);
    ae === void 0 && (ae = /* @__PURE__ */ new WeakMap(), c.set(de, ae));
    let oe = ae.get(C);
    oe === void 0 && (oe = n.getUniformBlockIndex(de, C.name), ae.set(C, oe));
  }
  function he(C, de) {
    const oe = c.get(de).get(C);
    l.get(de) !== oe && (n.uniformBlockBinding(de, oe, C.__bindingPointIndex), l.set(de, oe));
  }
  function Ue() {
    n.disable(n.BLEND), n.disable(n.CULL_FACE), n.disable(n.DEPTH_TEST), n.disable(n.POLYGON_OFFSET_FILL), n.disable(n.SCISSOR_TEST), n.disable(n.STENCIL_TEST), n.disable(n.SAMPLE_ALPHA_TO_COVERAGE), n.blendEquation(n.FUNC_ADD), n.blendFunc(n.ONE, n.ZERO), n.blendFuncSeparate(n.ONE, n.ZERO, n.ONE, n.ZERO), n.blendColor(0, 0, 0, 0), n.colorMask(!0, !0, !0, !0), n.clearColor(0, 0, 0, 0), n.depthMask(!0), n.depthFunc(n.LESS), a.setReversed(!1), n.clearDepth(1), n.stencilMask(4294967295), n.stencilFunc(n.ALWAYS, 0, 4294967295), n.stencilOp(n.KEEP, n.KEEP, n.KEEP), n.clearStencil(0), n.cullFace(n.BACK), n.frontFace(n.CCW), n.polygonOffset(0, 0), n.activeTexture(n.TEXTURE0), n.bindFramebuffer(n.FRAMEBUFFER, null), n.bindFramebuffer(n.DRAW_FRAMEBUFFER, null), n.bindFramebuffer(n.READ_FRAMEBUFFER, null), n.useProgram(null), n.lineWidth(1), n.scissor(0, 0, n.canvas.width, n.canvas.height), n.viewport(0, 0, n.canvas.width, n.canvas.height), d = {}, Q = null, re = {}, u = {}, f = /* @__PURE__ */ new WeakMap(), p = [], x = null, v = !1, m = null, h = null, T = null, E = null, A = null, D = null, y = null, P = new Qe(0, 0, 0), O = 0, M = !1, S = null, L = null, z = null, H = null, q = null, et.set(0, 0, n.canvas.width, n.canvas.height), je.set(0, 0, n.canvas.width, n.canvas.height), s.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: a,
      stencil: o
    },
    enable: X,
    disable: ne,
    bindFramebuffer: Se,
    drawBuffers: ue,
    useProgram: Ne,
    setBlending: at,
    setMaterial: w,
    setFlipSided: He,
    setCullFace: We,
    setLineWidth: lt,
    setPolygonOffset: _e,
    setScissorTest: ut,
    activeTexture: Te,
    bindTexture: Fe,
    unbindTexture: b,
    compressedTexImage2D: g,
    compressedTexImage3D: F,
    texImage2D: ve,
    texImage3D: J,
    updateUBOMapping: Ce,
    uniformBlockBinding: he,
    texStorage2D: ce,
    texStorage3D: Ae,
    texSubImage2D: $,
    texSubImage3D: j,
    compressedTexSubImage2D: k,
    compressedTexSubImage3D: be,
    scissor: se,
    viewport: Pe,
    reset: Ue
  };
}
function bh(n, e, t, i, r, s, a) {
  const o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new rt(), d = /* @__PURE__ */ new WeakMap();
  let u;
  const f = /* @__PURE__ */ new WeakMap();
  let p = !1;
  try {
    p = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function x(b, g) {
    return p ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(b, g)
    ) : ki("canvas");
  }
  function v(b, g, F) {
    let $ = 1;
    const j = Fe(b);
    if ((j.width > F || j.height > F) && ($ = F / Math.max(j.width, j.height)), $ < 1)
      if (typeof HTMLImageElement < "u" && b instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && b instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && b instanceof ImageBitmap || typeof VideoFrame < "u" && b instanceof VideoFrame) {
        const k = Math.floor($ * j.width), be = Math.floor($ * j.height);
        u === void 0 && (u = x(k, be));
        const ce = g ? x(k, be) : u;
        return ce.width = k, ce.height = be, ce.getContext("2d").drawImage(b, 0, 0, k, be), Oe("WebGLRenderer: Texture has been resized from (" + j.width + "x" + j.height + ") to (" + k + "x" + be + ")."), ce;
      } else
        return "data" in b && Oe("WebGLRenderer: Image in DataTexture is too big (" + j.width + "x" + j.height + ")."), b;
    return b;
  }
  function m(b) {
    return b.generateMipmaps;
  }
  function h(b) {
    n.generateMipmap(b);
  }
  function T(b) {
    return b.isWebGLCubeRenderTarget ? n.TEXTURE_CUBE_MAP : b.isWebGL3DRenderTarget ? n.TEXTURE_3D : b.isWebGLArrayRenderTarget || b.isCompressedArrayTexture ? n.TEXTURE_2D_ARRAY : n.TEXTURE_2D;
  }
  function E(b, g, F, $, j = !1) {
    if (b !== null) {
      if (n[b] !== void 0) return n[b];
      Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + b + "'");
    }
    let k = g;
    if (g === n.RED && (F === n.FLOAT && (k = n.R32F), F === n.HALF_FLOAT && (k = n.R16F), F === n.UNSIGNED_BYTE && (k = n.R8)), g === n.RED_INTEGER && (F === n.UNSIGNED_BYTE && (k = n.R8UI), F === n.UNSIGNED_SHORT && (k = n.R16UI), F === n.UNSIGNED_INT && (k = n.R32UI), F === n.BYTE && (k = n.R8I), F === n.SHORT && (k = n.R16I), F === n.INT && (k = n.R32I)), g === n.RG && (F === n.FLOAT && (k = n.RG32F), F === n.HALF_FLOAT && (k = n.RG16F), F === n.UNSIGNED_BYTE && (k = n.RG8)), g === n.RG_INTEGER && (F === n.UNSIGNED_BYTE && (k = n.RG8UI), F === n.UNSIGNED_SHORT && (k = n.RG16UI), F === n.UNSIGNED_INT && (k = n.RG32UI), F === n.BYTE && (k = n.RG8I), F === n.SHORT && (k = n.RG16I), F === n.INT && (k = n.RG32I)), g === n.RGB_INTEGER && (F === n.UNSIGNED_BYTE && (k = n.RGB8UI), F === n.UNSIGNED_SHORT && (k = n.RGB16UI), F === n.UNSIGNED_INT && (k = n.RGB32UI), F === n.BYTE && (k = n.RGB8I), F === n.SHORT && (k = n.RGB16I), F === n.INT && (k = n.RGB32I)), g === n.RGBA_INTEGER && (F === n.UNSIGNED_BYTE && (k = n.RGBA8UI), F === n.UNSIGNED_SHORT && (k = n.RGBA16UI), F === n.UNSIGNED_INT && (k = n.RGBA32UI), F === n.BYTE && (k = n.RGBA8I), F === n.SHORT && (k = n.RGBA16I), F === n.INT && (k = n.RGBA32I)), g === n.RGB && (F === n.UNSIGNED_INT_5_9_9_9_REV && (k = n.RGB9_E5), F === n.UNSIGNED_INT_10F_11F_11F_REV && (k = n.R11F_G11F_B10F)), g === n.RGBA) {
      const be = j ? yr : Ze.getTransfer($);
      F === n.FLOAT && (k = n.RGBA32F), F === n.HALF_FLOAT && (k = n.RGBA16F), F === n.UNSIGNED_BYTE && (k = be === it ? n.SRGB8_ALPHA8 : n.RGBA8), F === n.UNSIGNED_SHORT_4_4_4_4 && (k = n.RGBA4), F === n.UNSIGNED_SHORT_5_5_5_1 && (k = n.RGB5_A1);
    }
    return (k === n.R16F || k === n.R32F || k === n.RG16F || k === n.RG32F || k === n.RGBA16F || k === n.RGBA32F) && e.get("EXT_color_buffer_float"), k;
  }
  function A(b, g) {
    let F;
    return b ? g === null || g === 1014 || g === 1020 ? F = n.DEPTH24_STENCIL8 : g === 1015 ? F = n.DEPTH32F_STENCIL8 : g === 1012 && (F = n.DEPTH24_STENCIL8, Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : g === null || g === 1014 || g === 1020 ? F = n.DEPTH_COMPONENT24 : g === 1015 ? F = n.DEPTH_COMPONENT32F : g === 1012 && (F = n.DEPTH_COMPONENT16), F;
  }
  function D(b, g) {
    return m(b) === !0 || b.isFramebufferTexture && b.minFilter !== 1003 && b.minFilter !== 1006 ? Math.log2(Math.max(g.width, g.height)) + 1 : b.mipmaps !== void 0 && b.mipmaps.length > 0 ? b.mipmaps.length : b.isCompressedTexture && Array.isArray(b.image) ? g.mipmaps.length : 1;
  }
  function y(b) {
    const g = b.target;
    g.removeEventListener("dispose", y), O(g), g.isVideoTexture && d.delete(g);
  }
  function P(b) {
    const g = b.target;
    g.removeEventListener("dispose", P), S(g);
  }
  function O(b) {
    const g = i.get(b);
    if (g.__webglInit === void 0) return;
    const F = b.source, $ = f.get(F);
    if ($) {
      const j = $[g.__cacheKey];
      j.usedTimes--, j.usedTimes === 0 && M(b), Object.keys($).length === 0 && f.delete(F);
    }
    i.remove(b);
  }
  function M(b) {
    const g = i.get(b);
    n.deleteTexture(g.__webglTexture);
    const F = b.source, $ = f.get(F);
    delete $[g.__cacheKey], a.memory.textures--;
  }
  function S(b) {
    const g = i.get(b);
    if (b.depthTexture && (b.depthTexture.dispose(), i.remove(b.depthTexture)), b.isWebGLCubeRenderTarget)
      for (let $ = 0; $ < 6; $++) {
        if (Array.isArray(g.__webglFramebuffer[$]))
          for (let j = 0; j < g.__webglFramebuffer[$].length; j++) n.deleteFramebuffer(g.__webglFramebuffer[$][j]);
        else
          n.deleteFramebuffer(g.__webglFramebuffer[$]);
        g.__webglDepthbuffer && n.deleteRenderbuffer(g.__webglDepthbuffer[$]);
      }
    else {
      if (Array.isArray(g.__webglFramebuffer))
        for (let $ = 0; $ < g.__webglFramebuffer.length; $++) n.deleteFramebuffer(g.__webglFramebuffer[$]);
      else
        n.deleteFramebuffer(g.__webglFramebuffer);
      if (g.__webglDepthbuffer && n.deleteRenderbuffer(g.__webglDepthbuffer), g.__webglMultisampledFramebuffer && n.deleteFramebuffer(g.__webglMultisampledFramebuffer), g.__webglColorRenderbuffer)
        for (let $ = 0; $ < g.__webglColorRenderbuffer.length; $++)
          g.__webglColorRenderbuffer[$] && n.deleteRenderbuffer(g.__webglColorRenderbuffer[$]);
      g.__webglDepthRenderbuffer && n.deleteRenderbuffer(g.__webglDepthRenderbuffer);
    }
    const F = b.textures;
    for (let $ = 0, j = F.length; $ < j; $++) {
      const k = i.get(F[$]);
      k.__webglTexture && (n.deleteTexture(k.__webglTexture), a.memory.textures--), i.remove(F[$]);
    }
    i.remove(b);
  }
  let L = 0;
  function z() {
    L = 0;
  }
  function H() {
    const b = L;
    return b >= r.maxTextures && Oe("WebGLTextures: Trying to use " + b + " texture units while this GPU supports only " + r.maxTextures), L += 1, b;
  }
  function q(b) {
    const g = [];
    return g.push(b.wrapS), g.push(b.wrapT), g.push(b.wrapR || 0), g.push(b.magFilter), g.push(b.minFilter), g.push(b.anisotropy), g.push(b.internalFormat), g.push(b.format), g.push(b.type), g.push(b.generateMipmaps), g.push(b.premultiplyAlpha), g.push(b.flipY), g.push(b.unpackAlignment), g.push(b.colorSpace), g.join();
  }
  function K(b, g) {
    const F = i.get(b);
    if (b.isVideoTexture && ut(b), b.isRenderTargetTexture === !1 && b.isExternalTexture !== !0 && b.version > 0 && F.__version !== b.version) {
      const $ = b.image;
      if ($ === null)
        Oe("WebGLRenderer: Texture marked for update but no image data found.");
      else if ($.complete === !1)
        Oe("WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        V(F, b, g);
        return;
      }
    } else b.isExternalTexture && (F.__webglTexture = b.sourceTexture ? b.sourceTexture : null);
    t.bindTexture(n.TEXTURE_2D, F.__webglTexture, n.TEXTURE0 + g);
  }
  function Y(b, g) {
    const F = i.get(b);
    if (b.isRenderTargetTexture === !1 && b.version > 0 && F.__version !== b.version) {
      V(F, b, g);
      return;
    } else b.isExternalTexture && (F.__webglTexture = b.sourceTexture ? b.sourceTexture : null);
    t.bindTexture(n.TEXTURE_2D_ARRAY, F.__webglTexture, n.TEXTURE0 + g);
  }
  function te(b, g) {
    const F = i.get(b);
    if (b.isRenderTargetTexture === !1 && b.version > 0 && F.__version !== b.version) {
      V(F, b, g);
      return;
    }
    t.bindTexture(n.TEXTURE_3D, F.__webglTexture, n.TEXTURE0 + g);
  }
  function W(b, g) {
    const F = i.get(b);
    if (b.version > 0 && F.__version !== b.version) {
      X(F, b, g);
      return;
    }
    t.bindTexture(n.TEXTURE_CUBE_MAP, F.__webglTexture, n.TEXTURE0 + g);
  }
  const Q = {
    1e3: n.REPEAT,
    1001: n.CLAMP_TO_EDGE,
    1002: n.MIRRORED_REPEAT
  }, re = {
    1003: n.NEAREST,
    1004: n.NEAREST_MIPMAP_NEAREST,
    1005: n.NEAREST_MIPMAP_LINEAR,
    1006: n.LINEAR,
    1007: n.LINEAR_MIPMAP_NEAREST,
    1008: n.LINEAR_MIPMAP_LINEAR
  }, Me = {
    512: n.NEVER,
    519: n.ALWAYS,
    513: n.LESS,
    515: n.LEQUAL,
    514: n.EQUAL,
    518: n.GEQUAL,
    516: n.GREATER,
    517: n.NOTEQUAL
  };
  function ke(b, g) {
    if (g.type === 1015 && e.has("OES_texture_float_linear") === !1 && (g.magFilter === 1006 || g.magFilter === 1007 || g.magFilter === 1005 || g.magFilter === 1008 || g.minFilter === 1006 || g.minFilter === 1007 || g.minFilter === 1005 || g.minFilter === 1008) && Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), n.texParameteri(b, n.TEXTURE_WRAP_S, Q[g.wrapS]), n.texParameteri(b, n.TEXTURE_WRAP_T, Q[g.wrapT]), (b === n.TEXTURE_3D || b === n.TEXTURE_2D_ARRAY) && n.texParameteri(b, n.TEXTURE_WRAP_R, Q[g.wrapR]), n.texParameteri(b, n.TEXTURE_MAG_FILTER, re[g.magFilter]), n.texParameteri(b, n.TEXTURE_MIN_FILTER, re[g.minFilter]), g.compareFunction && (n.texParameteri(b, n.TEXTURE_COMPARE_MODE, n.COMPARE_REF_TO_TEXTURE), n.texParameteri(b, n.TEXTURE_COMPARE_FUNC, Me[g.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (g.magFilter === 1003 || g.minFilter !== 1005 && g.minFilter !== 1008 || g.type === 1015 && e.has("OES_texture_float_linear") === !1) return;
      if (g.anisotropy > 1 || i.get(g).__currentAnisotropy) {
        const F = e.get("EXT_texture_filter_anisotropic");
        n.texParameterf(b, F.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(g.anisotropy, r.getMaxAnisotropy())), i.get(g).__currentAnisotropy = g.anisotropy;
      }
    }
  }
  function et(b, g) {
    let F = !1;
    b.__webglInit === void 0 && (b.__webglInit = !0, g.addEventListener("dispose", y));
    const $ = g.source;
    let j = f.get($);
    j === void 0 && (j = {}, f.set($, j));
    const k = q(g);
    if (k !== b.__cacheKey) {
      j[k] === void 0 && (j[k] = {
        texture: n.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, F = !0), j[k].usedTimes++;
      const be = j[b.__cacheKey];
      be !== void 0 && (j[b.__cacheKey].usedTimes--, be.usedTimes === 0 && M(g)), b.__cacheKey = k, b.__webglTexture = j[k].texture;
    }
    return F;
  }
  function je(b, g, F) {
    return Math.floor(Math.floor(b / F) / g);
  }
  function st(b, g, F, $) {
    const k = b.updateRanges;
    if (k.length === 0)
      t.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, g.width, g.height, F, $, g.data);
    else {
      k.sort((J, se) => J.start - se.start);
      let be = 0;
      for (let J = 1; J < k.length; J++) {
        const se = k[be], Pe = k[J], Ce = se.start + se.count, he = je(Pe.start, g.width, 4), Ue = je(se.start, g.width, 4);
        Pe.start <= Ce + 1 && he === Ue && je(Pe.start + Pe.count - 1, g.width, 4) === he ? se.count = Math.max(
          se.count,
          Pe.start + Pe.count - se.start
        ) : (++be, k[be] = Pe);
      }
      k.length = be + 1;
      const ce = n.getParameter(n.UNPACK_ROW_LENGTH), Ae = n.getParameter(n.UNPACK_SKIP_PIXELS), ve = n.getParameter(n.UNPACK_SKIP_ROWS);
      n.pixelStorei(n.UNPACK_ROW_LENGTH, g.width);
      for (let J = 0, se = k.length; J < se; J++) {
        const Pe = k[J], Ce = Math.floor(Pe.start / 4), he = Math.ceil(Pe.count / 4), Ue = Ce % g.width, C = Math.floor(Ce / g.width), de = he, ae = 1;
        n.pixelStorei(n.UNPACK_SKIP_PIXELS, Ue), n.pixelStorei(n.UNPACK_SKIP_ROWS, C), t.texSubImage2D(n.TEXTURE_2D, 0, Ue, C, de, ae, F, $, g.data);
      }
      b.clearUpdateRanges(), n.pixelStorei(n.UNPACK_ROW_LENGTH, ce), n.pixelStorei(n.UNPACK_SKIP_PIXELS, Ae), n.pixelStorei(n.UNPACK_SKIP_ROWS, ve);
    }
  }
  function V(b, g, F) {
    let $ = n.TEXTURE_2D;
    (g.isDataArrayTexture || g.isCompressedArrayTexture) && ($ = n.TEXTURE_2D_ARRAY), g.isData3DTexture && ($ = n.TEXTURE_3D);
    const j = et(b, g), k = g.source;
    t.bindTexture($, b.__webglTexture, n.TEXTURE0 + F);
    const be = i.get(k);
    if (k.version !== be.__version || j === !0) {
      t.activeTexture(n.TEXTURE0 + F);
      const ce = Ze.getPrimaries(Ze.workingColorSpace), Ae = g.colorSpace === "" ? null : Ze.getPrimaries(g.colorSpace), ve = g.colorSpace === "" || ce === Ae ? n.NONE : n.BROWSER_DEFAULT_WEBGL;
      n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, g.flipY), n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), n.pixelStorei(n.UNPACK_ALIGNMENT, g.unpackAlignment), n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, ve);
      let J = v(g.image, !1, r.maxTextureSize);
      J = Te(g, J);
      const se = s.convert(g.format, g.colorSpace), Pe = s.convert(g.type);
      let Ce = E(g.internalFormat, se, Pe, g.colorSpace, g.isVideoTexture);
      ke($, g);
      let he;
      const Ue = g.mipmaps, C = g.isVideoTexture !== !0, de = be.__version === void 0 || j === !0, ae = k.dataReady, oe = D(g, J);
      if (g.isDepthTexture)
        Ce = A(g.format === 1027, g.type), de && (C ? t.texStorage2D(n.TEXTURE_2D, 1, Ce, J.width, J.height) : t.texImage2D(n.TEXTURE_2D, 0, Ce, J.width, J.height, 0, se, Pe, null));
      else if (g.isDataTexture)
        if (Ue.length > 0) {
          C && de && t.texStorage2D(n.TEXTURE_2D, oe, Ce, Ue[0].width, Ue[0].height);
          for (let ee = 0, Z = Ue.length; ee < Z; ee++)
            he = Ue[ee], C ? ae && t.texSubImage2D(n.TEXTURE_2D, ee, 0, 0, he.width, he.height, se, Pe, he.data) : t.texImage2D(n.TEXTURE_2D, ee, Ce, he.width, he.height, 0, se, Pe, he.data);
          g.generateMipmaps = !1;
        } else
          C ? (de && t.texStorage2D(n.TEXTURE_2D, oe, Ce, J.width, J.height), ae && st(g, J, se, Pe)) : t.texImage2D(n.TEXTURE_2D, 0, Ce, J.width, J.height, 0, se, Pe, J.data);
      else if (g.isCompressedTexture)
        if (g.isCompressedArrayTexture) {
          C && de && t.texStorage3D(n.TEXTURE_2D_ARRAY, oe, Ce, Ue[0].width, Ue[0].height, J.depth);
          for (let ee = 0, Z = Ue.length; ee < Z; ee++)
            if (he = Ue[ee], g.format !== 1023)
              if (se !== null)
                if (C) {
                  if (ae)
                    if (g.layerUpdates.size > 0) {
                      const xe = ba(he.width, he.height, g.format, g.type);
                      for (const Ie of g.layerUpdates) {
                        const ct = he.data.subarray(
                          Ie * xe / he.data.BYTES_PER_ELEMENT,
                          (Ie + 1) * xe / he.data.BYTES_PER_ELEMENT
                        );
                        t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY, ee, 0, 0, Ie, he.width, he.height, 1, se, ct);
                      }
                      g.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY, ee, 0, 0, 0, he.width, he.height, J.depth, se, he.data);
                } else
                  t.compressedTexImage3D(n.TEXTURE_2D_ARRAY, ee, Ce, he.width, he.height, J.depth, 0, he.data, 0, 0);
              else
                Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              C ? ae && t.texSubImage3D(n.TEXTURE_2D_ARRAY, ee, 0, 0, 0, he.width, he.height, J.depth, se, Pe, he.data) : t.texImage3D(n.TEXTURE_2D_ARRAY, ee, Ce, he.width, he.height, J.depth, 0, se, Pe, he.data);
        } else {
          C && de && t.texStorage2D(n.TEXTURE_2D, oe, Ce, Ue[0].width, Ue[0].height);
          for (let ee = 0, Z = Ue.length; ee < Z; ee++)
            he = Ue[ee], g.format !== 1023 ? se !== null ? C ? ae && t.compressedTexSubImage2D(n.TEXTURE_2D, ee, 0, 0, he.width, he.height, se, he.data) : t.compressedTexImage2D(n.TEXTURE_2D, ee, Ce, he.width, he.height, 0, he.data) : Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : C ? ae && t.texSubImage2D(n.TEXTURE_2D, ee, 0, 0, he.width, he.height, se, Pe, he.data) : t.texImage2D(n.TEXTURE_2D, ee, Ce, he.width, he.height, 0, se, Pe, he.data);
        }
      else if (g.isDataArrayTexture)
        if (C) {
          if (de && t.texStorage3D(n.TEXTURE_2D_ARRAY, oe, Ce, J.width, J.height, J.depth), ae)
            if (g.layerUpdates.size > 0) {
              const ee = ba(J.width, J.height, g.format, g.type);
              for (const Z of g.layerUpdates) {
                const xe = J.data.subarray(
                  Z * ee / J.data.BYTES_PER_ELEMENT,
                  (Z + 1) * ee / J.data.BYTES_PER_ELEMENT
                );
                t.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, Z, J.width, J.height, 1, se, Pe, xe);
              }
              g.clearLayerUpdates();
            } else
              t.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, 0, J.width, J.height, J.depth, se, Pe, J.data);
        } else
          t.texImage3D(n.TEXTURE_2D_ARRAY, 0, Ce, J.width, J.height, J.depth, 0, se, Pe, J.data);
      else if (g.isData3DTexture)
        C ? (de && t.texStorage3D(n.TEXTURE_3D, oe, Ce, J.width, J.height, J.depth), ae && t.texSubImage3D(n.TEXTURE_3D, 0, 0, 0, 0, J.width, J.height, J.depth, se, Pe, J.data)) : t.texImage3D(n.TEXTURE_3D, 0, Ce, J.width, J.height, J.depth, 0, se, Pe, J.data);
      else if (g.isFramebufferTexture) {
        if (de)
          if (C)
            t.texStorage2D(n.TEXTURE_2D, oe, Ce, J.width, J.height);
          else {
            let ee = J.width, Z = J.height;
            for (let xe = 0; xe < oe; xe++)
              t.texImage2D(n.TEXTURE_2D, xe, Ce, ee, Z, 0, se, Pe, null), ee >>= 1, Z >>= 1;
          }
      } else if (Ue.length > 0) {
        if (C && de) {
          const ee = Fe(Ue[0]);
          t.texStorage2D(n.TEXTURE_2D, oe, Ce, ee.width, ee.height);
        }
        for (let ee = 0, Z = Ue.length; ee < Z; ee++)
          he = Ue[ee], C ? ae && t.texSubImage2D(n.TEXTURE_2D, ee, 0, 0, se, Pe, he) : t.texImage2D(n.TEXTURE_2D, ee, Ce, se, Pe, he);
        g.generateMipmaps = !1;
      } else if (C) {
        if (de) {
          const ee = Fe(J);
          t.texStorage2D(n.TEXTURE_2D, oe, Ce, ee.width, ee.height);
        }
        ae && t.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, se, Pe, J);
      } else
        t.texImage2D(n.TEXTURE_2D, 0, Ce, se, Pe, J);
      m(g) && h($), be.__version = k.version, g.onUpdate && g.onUpdate(g);
    }
    b.__version = g.version;
  }
  function X(b, g, F) {
    if (g.image.length !== 6) return;
    const $ = et(b, g), j = g.source;
    t.bindTexture(n.TEXTURE_CUBE_MAP, b.__webglTexture, n.TEXTURE0 + F);
    const k = i.get(j);
    if (j.version !== k.__version || $ === !0) {
      t.activeTexture(n.TEXTURE0 + F);
      const be = Ze.getPrimaries(Ze.workingColorSpace), ce = g.colorSpace === "" ? null : Ze.getPrimaries(g.colorSpace), Ae = g.colorSpace === "" || be === ce ? n.NONE : n.BROWSER_DEFAULT_WEBGL;
      n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, g.flipY), n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), n.pixelStorei(n.UNPACK_ALIGNMENT, g.unpackAlignment), n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ae);
      const ve = g.isCompressedTexture || g.image[0].isCompressedTexture, J = g.image[0] && g.image[0].isDataTexture, se = [];
      for (let Z = 0; Z < 6; Z++)
        !ve && !J ? se[Z] = v(g.image[Z], !0, r.maxCubemapSize) : se[Z] = J ? g.image[Z].image : g.image[Z], se[Z] = Te(g, se[Z]);
      const Pe = se[0], Ce = s.convert(g.format, g.colorSpace), he = s.convert(g.type), Ue = E(g.internalFormat, Ce, he, g.colorSpace), C = g.isVideoTexture !== !0, de = k.__version === void 0 || $ === !0, ae = j.dataReady;
      let oe = D(g, Pe);
      ke(n.TEXTURE_CUBE_MAP, g);
      let ee;
      if (ve) {
        C && de && t.texStorage2D(n.TEXTURE_CUBE_MAP, oe, Ue, Pe.width, Pe.height);
        for (let Z = 0; Z < 6; Z++) {
          ee = se[Z].mipmaps;
          for (let xe = 0; xe < ee.length; xe++) {
            const Ie = ee[xe];
            g.format !== 1023 ? Ce !== null ? C ? ae && t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Z, xe, 0, 0, Ie.width, Ie.height, Ce, Ie.data) : t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Z, xe, Ue, Ie.width, Ie.height, 0, Ie.data) : Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : C ? ae && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Z, xe, 0, 0, Ie.width, Ie.height, Ce, he, Ie.data) : t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Z, xe, Ue, Ie.width, Ie.height, 0, Ce, he, Ie.data);
          }
        }
      } else {
        if (ee = g.mipmaps, C && de) {
          ee.length > 0 && oe++;
          const Z = Fe(se[0]);
          t.texStorage2D(n.TEXTURE_CUBE_MAP, oe, Ue, Z.width, Z.height);
        }
        for (let Z = 0; Z < 6; Z++)
          if (J) {
            C ? ae && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Z, 0, 0, 0, se[Z].width, se[Z].height, Ce, he, se[Z].data) : t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Z, 0, Ue, se[Z].width, se[Z].height, 0, Ce, he, se[Z].data);
            for (let xe = 0; xe < ee.length; xe++) {
              const ct = ee[xe].image[Z].image;
              C ? ae && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Z, xe + 1, 0, 0, ct.width, ct.height, Ce, he, ct.data) : t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Z, xe + 1, Ue, ct.width, ct.height, 0, Ce, he, ct.data);
            }
          } else {
            C ? ae && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Z, 0, 0, 0, Ce, he, se[Z]) : t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Z, 0, Ue, Ce, he, se[Z]);
            for (let xe = 0; xe < ee.length; xe++) {
              const Ie = ee[xe];
              C ? ae && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Z, xe + 1, 0, 0, Ce, he, Ie.image[Z]) : t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + Z, xe + 1, Ue, Ce, he, Ie.image[Z]);
            }
          }
      }
      m(g) && h(n.TEXTURE_CUBE_MAP), k.__version = j.version, g.onUpdate && g.onUpdate(g);
    }
    b.__version = g.version;
  }
  function ne(b, g, F, $, j, k) {
    const be = s.convert(F.format, F.colorSpace), ce = s.convert(F.type), Ae = E(F.internalFormat, be, ce, F.colorSpace), ve = i.get(g), J = i.get(F);
    if (J.__renderTarget = g, !ve.__hasExternalTextures) {
      const se = Math.max(1, g.width >> k), Pe = Math.max(1, g.height >> k);
      j === n.TEXTURE_3D || j === n.TEXTURE_2D_ARRAY ? t.texImage3D(j, k, Ae, se, Pe, g.depth, 0, be, ce, null) : t.texImage2D(j, k, Ae, se, Pe, 0, be, ce, null);
    }
    t.bindFramebuffer(n.FRAMEBUFFER, b), _e(g) ? o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, $, j, J.__webglTexture, 0, lt(g)) : (j === n.TEXTURE_2D || j >= n.TEXTURE_CUBE_MAP_POSITIVE_X && j <= n.TEXTURE_CUBE_MAP_NEGATIVE_Z) && n.framebufferTexture2D(n.FRAMEBUFFER, $, j, J.__webglTexture, k), t.bindFramebuffer(n.FRAMEBUFFER, null);
  }
  function Se(b, g, F) {
    if (n.bindRenderbuffer(n.RENDERBUFFER, b), g.depthBuffer) {
      const $ = g.depthTexture, j = $ && $.isDepthTexture ? $.type : null, k = A(g.stencilBuffer, j), be = g.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT, ce = lt(g);
      _e(g) ? o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, ce, k, g.width, g.height) : F ? n.renderbufferStorageMultisample(n.RENDERBUFFER, ce, k, g.width, g.height) : n.renderbufferStorage(n.RENDERBUFFER, k, g.width, g.height), n.framebufferRenderbuffer(n.FRAMEBUFFER, be, n.RENDERBUFFER, b);
    } else {
      const $ = g.textures;
      for (let j = 0; j < $.length; j++) {
        const k = $[j], be = s.convert(k.format, k.colorSpace), ce = s.convert(k.type), Ae = E(k.internalFormat, be, ce, k.colorSpace), ve = lt(g);
        F && _e(g) === !1 ? n.renderbufferStorageMultisample(n.RENDERBUFFER, ve, Ae, g.width, g.height) : _e(g) ? o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, ve, Ae, g.width, g.height) : n.renderbufferStorage(n.RENDERBUFFER, Ae, g.width, g.height);
      }
    }
    n.bindRenderbuffer(n.RENDERBUFFER, null);
  }
  function ue(b, g) {
    if (g && g.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (t.bindFramebuffer(n.FRAMEBUFFER, b), !(g.depthTexture && g.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const $ = i.get(g.depthTexture);
    $.__renderTarget = g, (!$.__webglTexture || g.depthTexture.image.width !== g.width || g.depthTexture.image.height !== g.height) && (g.depthTexture.image.width = g.width, g.depthTexture.image.height = g.height, g.depthTexture.needsUpdate = !0), K(g.depthTexture, 0);
    const j = $.__webglTexture, k = lt(g);
    if (g.depthTexture.format === 1026)
      _e(g) ? o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.TEXTURE_2D, j, 0, k) : n.framebufferTexture2D(n.FRAMEBUFFER, n.DEPTH_ATTACHMENT, n.TEXTURE_2D, j, 0);
    else if (g.depthTexture.format === 1027)
      _e(g) ? o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.TEXTURE_2D, j, 0, k) : n.framebufferTexture2D(n.FRAMEBUFFER, n.DEPTH_STENCIL_ATTACHMENT, n.TEXTURE_2D, j, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Ne(b) {
    const g = i.get(b), F = b.isWebGLCubeRenderTarget === !0;
    if (g.__boundDepthTexture !== b.depthTexture) {
      const $ = b.depthTexture;
      if (g.__depthDisposeCallback && g.__depthDisposeCallback(), $) {
        const j = () => {
          delete g.__boundDepthTexture, delete g.__depthDisposeCallback, $.removeEventListener("dispose", j);
        };
        $.addEventListener("dispose", j), g.__depthDisposeCallback = j;
      }
      g.__boundDepthTexture = $;
    }
    if (b.depthTexture && !g.__autoAllocateDepthBuffer) {
      if (F) throw new Error("target.depthTexture not supported in Cube render targets");
      const $ = b.texture.mipmaps;
      $ && $.length > 0 ? ue(g.__webglFramebuffer[0], b) : ue(g.__webglFramebuffer, b);
    } else if (F) {
      g.__webglDepthbuffer = [];
      for (let $ = 0; $ < 6; $++)
        if (t.bindFramebuffer(n.FRAMEBUFFER, g.__webglFramebuffer[$]), g.__webglDepthbuffer[$] === void 0)
          g.__webglDepthbuffer[$] = n.createRenderbuffer(), Se(g.__webglDepthbuffer[$], b, !1);
        else {
          const j = b.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT, k = g.__webglDepthbuffer[$];
          n.bindRenderbuffer(n.RENDERBUFFER, k), n.framebufferRenderbuffer(n.FRAMEBUFFER, j, n.RENDERBUFFER, k);
        }
    } else {
      const $ = b.texture.mipmaps;
      if ($ && $.length > 0 ? t.bindFramebuffer(n.FRAMEBUFFER, g.__webglFramebuffer[0]) : t.bindFramebuffer(n.FRAMEBUFFER, g.__webglFramebuffer), g.__webglDepthbuffer === void 0)
        g.__webglDepthbuffer = n.createRenderbuffer(), Se(g.__webglDepthbuffer, b, !1);
      else {
        const j = b.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT, k = g.__webglDepthbuffer;
        n.bindRenderbuffer(n.RENDERBUFFER, k), n.framebufferRenderbuffer(n.FRAMEBUFFER, j, n.RENDERBUFFER, k);
      }
    }
    t.bindFramebuffer(n.FRAMEBUFFER, null);
  }
  function xt(b, g, F) {
    const $ = i.get(b);
    g !== void 0 && ne($.__webglFramebuffer, b, b.texture, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, 0), F !== void 0 && Ne(b);
  }
  function Ve(b) {
    const g = b.texture, F = i.get(b), $ = i.get(g);
    b.addEventListener("dispose", P);
    const j = b.textures, k = b.isWebGLCubeRenderTarget === !0, be = j.length > 1;
    if (be || ($.__webglTexture === void 0 && ($.__webglTexture = n.createTexture()), $.__version = g.version, a.memory.textures++), k) {
      F.__webglFramebuffer = [];
      for (let ce = 0; ce < 6; ce++)
        if (g.mipmaps && g.mipmaps.length > 0) {
          F.__webglFramebuffer[ce] = [];
          for (let Ae = 0; Ae < g.mipmaps.length; Ae++)
            F.__webglFramebuffer[ce][Ae] = n.createFramebuffer();
        } else
          F.__webglFramebuffer[ce] = n.createFramebuffer();
    } else {
      if (g.mipmaps && g.mipmaps.length > 0) {
        F.__webglFramebuffer = [];
        for (let ce = 0; ce < g.mipmaps.length; ce++)
          F.__webglFramebuffer[ce] = n.createFramebuffer();
      } else
        F.__webglFramebuffer = n.createFramebuffer();
      if (be)
        for (let ce = 0, Ae = j.length; ce < Ae; ce++) {
          const ve = i.get(j[ce]);
          ve.__webglTexture === void 0 && (ve.__webglTexture = n.createTexture(), a.memory.textures++);
        }
      if (b.samples > 0 && _e(b) === !1) {
        F.__webglMultisampledFramebuffer = n.createFramebuffer(), F.__webglColorRenderbuffer = [], t.bindFramebuffer(n.FRAMEBUFFER, F.__webglMultisampledFramebuffer);
        for (let ce = 0; ce < j.length; ce++) {
          const Ae = j[ce];
          F.__webglColorRenderbuffer[ce] = n.createRenderbuffer(), n.bindRenderbuffer(n.RENDERBUFFER, F.__webglColorRenderbuffer[ce]);
          const ve = s.convert(Ae.format, Ae.colorSpace), J = s.convert(Ae.type), se = E(Ae.internalFormat, ve, J, Ae.colorSpace, b.isXRRenderTarget === !0), Pe = lt(b);
          n.renderbufferStorageMultisample(n.RENDERBUFFER, Pe, se, b.width, b.height), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + ce, n.RENDERBUFFER, F.__webglColorRenderbuffer[ce]);
        }
        n.bindRenderbuffer(n.RENDERBUFFER, null), b.depthBuffer && (F.__webglDepthRenderbuffer = n.createRenderbuffer(), Se(F.__webglDepthRenderbuffer, b, !0)), t.bindFramebuffer(n.FRAMEBUFFER, null);
      }
    }
    if (k) {
      t.bindTexture(n.TEXTURE_CUBE_MAP, $.__webglTexture), ke(n.TEXTURE_CUBE_MAP, g);
      for (let ce = 0; ce < 6; ce++)
        if (g.mipmaps && g.mipmaps.length > 0)
          for (let Ae = 0; Ae < g.mipmaps.length; Ae++)
            ne(F.__webglFramebuffer[ce][Ae], b, g, n.COLOR_ATTACHMENT0, n.TEXTURE_CUBE_MAP_POSITIVE_X + ce, Ae);
        else
          ne(F.__webglFramebuffer[ce], b, g, n.COLOR_ATTACHMENT0, n.TEXTURE_CUBE_MAP_POSITIVE_X + ce, 0);
      m(g) && h(n.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (be) {
      for (let ce = 0, Ae = j.length; ce < Ae; ce++) {
        const ve = j[ce], J = i.get(ve);
        let se = n.TEXTURE_2D;
        (b.isWebGL3DRenderTarget || b.isWebGLArrayRenderTarget) && (se = b.isWebGL3DRenderTarget ? n.TEXTURE_3D : n.TEXTURE_2D_ARRAY), t.bindTexture(se, J.__webglTexture), ke(se, ve), ne(F.__webglFramebuffer, b, ve, n.COLOR_ATTACHMENT0 + ce, se, 0), m(ve) && h(se);
      }
      t.unbindTexture();
    } else {
      let ce = n.TEXTURE_2D;
      if ((b.isWebGL3DRenderTarget || b.isWebGLArrayRenderTarget) && (ce = b.isWebGL3DRenderTarget ? n.TEXTURE_3D : n.TEXTURE_2D_ARRAY), t.bindTexture(ce, $.__webglTexture), ke(ce, g), g.mipmaps && g.mipmaps.length > 0)
        for (let Ae = 0; Ae < g.mipmaps.length; Ae++)
          ne(F.__webglFramebuffer[Ae], b, g, n.COLOR_ATTACHMENT0, ce, Ae);
      else
        ne(F.__webglFramebuffer, b, g, n.COLOR_ATTACHMENT0, ce, 0);
      m(g) && h(ce), t.unbindTexture();
    }
    b.depthBuffer && Ne(b);
  }
  function at(b) {
    const g = b.textures;
    for (let F = 0, $ = g.length; F < $; F++) {
      const j = g[F];
      if (m(j)) {
        const k = T(b), be = i.get(j).__webglTexture;
        t.bindTexture(k, be), h(k), t.unbindTexture();
      }
    }
  }
  const w = [], He = [];
  function We(b) {
    if (b.samples > 0) {
      if (_e(b) === !1) {
        const g = b.textures, F = b.width, $ = b.height;
        let j = n.COLOR_BUFFER_BIT;
        const k = b.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT, be = i.get(b), ce = g.length > 1;
        if (ce)
          for (let ve = 0; ve < g.length; ve++)
            t.bindFramebuffer(n.FRAMEBUFFER, be.__webglMultisampledFramebuffer), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + ve, n.RENDERBUFFER, null), t.bindFramebuffer(n.FRAMEBUFFER, be.__webglFramebuffer), n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + ve, n.TEXTURE_2D, null, 0);
        t.bindFramebuffer(n.READ_FRAMEBUFFER, be.__webglMultisampledFramebuffer);
        const Ae = b.texture.mipmaps;
        Ae && Ae.length > 0 ? t.bindFramebuffer(n.DRAW_FRAMEBUFFER, be.__webglFramebuffer[0]) : t.bindFramebuffer(n.DRAW_FRAMEBUFFER, be.__webglFramebuffer);
        for (let ve = 0; ve < g.length; ve++) {
          if (b.resolveDepthBuffer && (b.depthBuffer && (j |= n.DEPTH_BUFFER_BIT), b.stencilBuffer && b.resolveStencilBuffer && (j |= n.STENCIL_BUFFER_BIT)), ce) {
            n.framebufferRenderbuffer(n.READ_FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.RENDERBUFFER, be.__webglColorRenderbuffer[ve]);
            const J = i.get(g[ve]).__webglTexture;
            n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, J, 0);
          }
          n.blitFramebuffer(0, 0, F, $, 0, 0, F, $, j, n.NEAREST), l === !0 && (w.length = 0, He.length = 0, w.push(n.COLOR_ATTACHMENT0 + ve), b.depthBuffer && b.resolveDepthBuffer === !1 && (w.push(k), He.push(k), n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, He)), n.invalidateFramebuffer(n.READ_FRAMEBUFFER, w));
        }
        if (t.bindFramebuffer(n.READ_FRAMEBUFFER, null), t.bindFramebuffer(n.DRAW_FRAMEBUFFER, null), ce)
          for (let ve = 0; ve < g.length; ve++) {
            t.bindFramebuffer(n.FRAMEBUFFER, be.__webglMultisampledFramebuffer), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + ve, n.RENDERBUFFER, be.__webglColorRenderbuffer[ve]);
            const J = i.get(g[ve]).__webglTexture;
            t.bindFramebuffer(n.FRAMEBUFFER, be.__webglFramebuffer), n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + ve, n.TEXTURE_2D, J, 0);
          }
        t.bindFramebuffer(n.DRAW_FRAMEBUFFER, be.__webglMultisampledFramebuffer);
      } else if (b.depthBuffer && b.resolveDepthBuffer === !1 && l) {
        const g = b.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT;
        n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, [g]);
      }
    }
  }
  function lt(b) {
    return Math.min(r.maxSamples, b.samples);
  }
  function _e(b) {
    const g = i.get(b);
    return b.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && g.__useRenderToTexture !== !1;
  }
  function ut(b) {
    const g = a.render.frame;
    d.get(b) !== g && (d.set(b, g), b.update());
  }
  function Te(b, g) {
    const F = b.colorSpace, $ = b.format, j = b.type;
    return b.isCompressedTexture === !0 || b.isVideoTexture === !0 || F !== Si && F !== "" && (Ze.getTransfer(F) === it ? ($ !== 1023 || j !== 1009) && Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : gt("WebGLTextures: Unsupported texture color space:", F)), g;
  }
  function Fe(b) {
    return typeof HTMLImageElement < "u" && b instanceof HTMLImageElement ? (c.width = b.naturalWidth || b.width, c.height = b.naturalHeight || b.height) : typeof VideoFrame < "u" && b instanceof VideoFrame ? (c.width = b.displayWidth, c.height = b.displayHeight) : (c.width = b.width, c.height = b.height), c;
  }
  this.allocateTextureUnit = H, this.resetTextureUnits = z, this.setTexture2D = K, this.setTexture2DArray = Y, this.setTexture3D = te, this.setTextureCube = W, this.rebindTextures = xt, this.setupRenderTarget = Ve, this.updateRenderTargetMipmap = at, this.updateMultisampleRenderTarget = We, this.setupDepthRenderbuffer = Ne, this.setupFrameBufferTexture = ne, this.useMultisampledRTT = _e;
}
function yh(n, e) {
  function t(i, r = "") {
    let s;
    const a = Ze.getTransfer(r);
    if (i === 1009) return n.UNSIGNED_BYTE;
    if (i === 1017) return n.UNSIGNED_SHORT_4_4_4_4;
    if (i === 1018) return n.UNSIGNED_SHORT_5_5_5_1;
    if (i === 35902) return n.UNSIGNED_INT_5_9_9_9_REV;
    if (i === 35899) return n.UNSIGNED_INT_10F_11F_11F_REV;
    if (i === 1010) return n.BYTE;
    if (i === 1011) return n.SHORT;
    if (i === 1012) return n.UNSIGNED_SHORT;
    if (i === 1013) return n.INT;
    if (i === 1014) return n.UNSIGNED_INT;
    if (i === 1015) return n.FLOAT;
    if (i === 1016) return n.HALF_FLOAT;
    if (i === 1021) return n.ALPHA;
    if (i === 1022) return n.RGB;
    if (i === 1023) return n.RGBA;
    if (i === 1026) return n.DEPTH_COMPONENT;
    if (i === 1027) return n.DEPTH_STENCIL;
    if (i === 1028) return n.RED;
    if (i === 1029) return n.RED_INTEGER;
    if (i === 1030) return n.RG;
    if (i === 1031) return n.RG_INTEGER;
    if (i === 1033) return n.RGBA_INTEGER;
    if (i === 33776 || i === 33777 || i === 33778 || i === 33779)
      if (a === it)
        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (i === 33776) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (i === 33777) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (i === 33778) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (i === 33779) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = e.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (i === 33776) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (i === 33777) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (i === 33778) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (i === 33779) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (i === 35840 || i === 35841 || i === 35842 || i === 35843)
      if (s = e.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (i === 35840) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (i === 35841) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (i === 35842) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (i === 35843) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (i === 36196 || i === 37492 || i === 37496)
      if (s = e.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (i === 36196 || i === 37492) return a === it ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (i === 37496) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (i === 37808 || i === 37809 || i === 37810 || i === 37811 || i === 37812 || i === 37813 || i === 37814 || i === 37815 || i === 37816 || i === 37817 || i === 37818 || i === 37819 || i === 37820 || i === 37821)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (i === 37808) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (i === 37809) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (i === 37810) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (i === 37811) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (i === 37812) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (i === 37813) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (i === 37814) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (i === 37815) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (i === 37816) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (i === 37817) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (i === 37818) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (i === 37819) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (i === 37820) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (i === 37821) return a === it ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (i === 36492 || i === 36494 || i === 36495)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (i === 36492) return a === it ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (i === 36494) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (i === 36495) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (i === 36283 || i === 36284 || i === 36285 || i === 36286)
      if (s = e.get("EXT_texture_compression_rgtc"), s !== null) {
        if (i === 36283) return s.COMPRESSED_RED_RGTC1_EXT;
        if (i === 36284) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (i === 36285) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (i === 36286) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return i === 1020 ? n.UNSIGNED_INT_24_8 : n[i] !== void 0 ? n[i] : null;
  }
  return { convert: t };
}
const Eh = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, Th = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class Ah {
  /**
   * Constructs a new depth sensing module.
   */
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  /**
   * Inits the depth sensing module
   *
   * @param {XRWebGLDepthInformation} depthData - The XR depth data.
   * @param {XRRenderState} renderState - The XR render state.
   */
  init(e, t) {
    if (this.texture === null) {
      const i = new go(e.texture);
      (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = i;
    }
  }
  /**
   * Returns a plane mesh that visualizes the depth texture.
   *
   * @param {ArrayCamera} cameraXR - The XR camera.
   * @return {?Mesh} The plane mesh.
   */
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, i = new En({
        vertexShader: Eh,
        fragmentShader: Th,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new Xt(new rn(20, 20), i);
    }
    return this.mesh;
  }
  /**
   * Resets the module
   */
  reset() {
    this.texture = null, this.mesh = null;
  }
  /**
   * Returns a texture representing the depth of the user's environment.
   *
   * @return {?ExternalTexture} The depth texture.
   */
  getDepthTexture() {
    return this.texture;
  }
}
class wh extends Ei {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGL2RenderingContext} gl - The rendering context.
   */
  constructor(e, t) {
    super();
    const i = this;
    let r = null, s = 1, a = null, o = "local-floor", l = 1, c = null, d = null, u = null, f = null, p = null, x = null;
    const v = typeof XRWebGLBinding < "u", m = new Ah(), h = {}, T = t.getContextAttributes();
    let E = null, A = null;
    const D = [], y = [], P = new rt();
    let O = null;
    const M = new Zt();
    M.viewport = new _t();
    const S = new Zt();
    S.viewport = new _t();
    const L = [M, S], z = new Xl();
    let H = null, q = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(V) {
      let X = D[V];
      return X === void 0 && (X = new os(), D[V] = X), X.getTargetRaySpace();
    }, this.getControllerGrip = function(V) {
      let X = D[V];
      return X === void 0 && (X = new os(), D[V] = X), X.getGripSpace();
    }, this.getHand = function(V) {
      let X = D[V];
      return X === void 0 && (X = new os(), D[V] = X), X.getHandSpace();
    };
    function K(V) {
      const X = y.indexOf(V.inputSource);
      if (X === -1)
        return;
      const ne = D[X];
      ne !== void 0 && (ne.update(V.inputSource, V.frame, c || a), ne.dispatchEvent({ type: V.type, data: V.inputSource }));
    }
    function Y() {
      r.removeEventListener("select", K), r.removeEventListener("selectstart", K), r.removeEventListener("selectend", K), r.removeEventListener("squeeze", K), r.removeEventListener("squeezestart", K), r.removeEventListener("squeezeend", K), r.removeEventListener("end", Y), r.removeEventListener("inputsourceschange", te);
      for (let V = 0; V < D.length; V++) {
        const X = y[V];
        X !== null && (y[V] = null, D[V].disconnect(X));
      }
      H = null, q = null, m.reset();
      for (const V in h)
        delete h[V];
      e.setRenderTarget(E), p = null, f = null, u = null, r = null, A = null, st.stop(), i.isPresenting = !1, e.setPixelRatio(O), e.setSize(P.width, P.height, !1), i.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(V) {
      s = V, i.isPresenting === !0 && Oe("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(V) {
      o = V, i.isPresenting === !0 && Oe("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || a;
    }, this.setReferenceSpace = function(V) {
      c = V;
    }, this.getBaseLayer = function() {
      return f !== null ? f : p;
    }, this.getBinding = function() {
      return u === null && v && (u = new XRWebGLBinding(r, t)), u;
    }, this.getFrame = function() {
      return x;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(V) {
      if (r = V, r !== null) {
        if (E = e.getRenderTarget(), r.addEventListener("select", K), r.addEventListener("selectstart", K), r.addEventListener("selectend", K), r.addEventListener("squeeze", K), r.addEventListener("squeezestart", K), r.addEventListener("squeezeend", K), r.addEventListener("end", Y), r.addEventListener("inputsourceschange", te), T.xrCompatible !== !0 && await t.makeXRCompatible(), O = e.getPixelRatio(), e.getSize(P), v && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let ne = null, Se = null, ue = null;
          T.depth && (ue = T.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, ne = T.stencil ? 1027 : 1026, Se = T.stencil ? 1020 : 1014);
          const Ne = {
            colorFormat: t.RGBA8,
            depthFormat: ue,
            scaleFactor: s
          };
          u = this.getBinding(), f = u.createProjectionLayer(Ne), r.updateRenderState({ layers: [f] }), e.setPixelRatio(1), e.setSize(f.textureWidth, f.textureHeight, !1), A = new jn(
            f.textureWidth,
            f.textureHeight,
            {
              format: 1023,
              type: 1009,
              depthTexture: new xo(f.textureWidth, f.textureHeight, Se, void 0, void 0, void 0, void 0, void 0, void 0, ne),
              stencilBuffer: T.stencil,
              colorSpace: e.outputColorSpace,
              samples: T.antialias ? 4 : 0,
              resolveDepthBuffer: f.ignoreDepthValues === !1,
              resolveStencilBuffer: f.ignoreDepthValues === !1
            }
          );
        } else {
          const ne = {
            antialias: T.antialias,
            alpha: !0,
            depth: T.depth,
            stencil: T.stencil,
            framebufferScaleFactor: s
          };
          p = new XRWebGLLayer(r, t, ne), r.updateRenderState({ baseLayer: p }), e.setPixelRatio(1), e.setSize(p.framebufferWidth, p.framebufferHeight, !1), A = new jn(
            p.framebufferWidth,
            p.framebufferHeight,
            {
              format: 1023,
              type: 1009,
              colorSpace: e.outputColorSpace,
              stencilBuffer: T.stencil,
              resolveDepthBuffer: p.ignoreDepthValues === !1,
              resolveStencilBuffer: p.ignoreDepthValues === !1
            }
          );
        }
        A.isXRRenderTarget = !0, this.setFoveation(l), c = null, a = await r.requestReferenceSpace(o), st.setContext(r), st.start(), i.isPresenting = !0, i.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return m.getDepthTexture();
    };
    function te(V) {
      for (let X = 0; X < V.removed.length; X++) {
        const ne = V.removed[X], Se = y.indexOf(ne);
        Se >= 0 && (y[Se] = null, D[Se].disconnect(ne));
      }
      for (let X = 0; X < V.added.length; X++) {
        const ne = V.added[X];
        let Se = y.indexOf(ne);
        if (Se === -1) {
          for (let Ne = 0; Ne < D.length; Ne++)
            if (Ne >= y.length) {
              y.push(ne), Se = Ne;
              break;
            } else if (y[Ne] === null) {
              y[Ne] = ne, Se = Ne;
              break;
            }
          if (Se === -1) break;
        }
        const ue = D[Se];
        ue && ue.connect(ne);
      }
    }
    const W = new G(), Q = new G();
    function re(V, X, ne) {
      W.setFromMatrixPosition(X.matrixWorld), Q.setFromMatrixPosition(ne.matrixWorld);
      const Se = W.distanceTo(Q), ue = X.projectionMatrix.elements, Ne = ne.projectionMatrix.elements, xt = ue[14] / (ue[10] - 1), Ve = ue[14] / (ue[10] + 1), at = (ue[9] + 1) / ue[5], w = (ue[9] - 1) / ue[5], He = (ue[8] - 1) / ue[0], We = (Ne[8] + 1) / Ne[0], lt = xt * He, _e = xt * We, ut = Se / (-He + We), Te = ut * -He;
      if (X.matrixWorld.decompose(V.position, V.quaternion, V.scale), V.translateX(Te), V.translateZ(ut), V.matrixWorld.compose(V.position, V.quaternion, V.scale), V.matrixWorldInverse.copy(V.matrixWorld).invert(), ue[10] === -1)
        V.projectionMatrix.copy(X.projectionMatrix), V.projectionMatrixInverse.copy(X.projectionMatrixInverse);
      else {
        const Fe = xt + ut, b = Ve + ut, g = lt - Te, F = _e + (Se - Te), $ = at * Ve / b * Fe, j = w * Ve / b * Fe;
        V.projectionMatrix.makePerspective(g, F, $, j, Fe, b), V.projectionMatrixInverse.copy(V.projectionMatrix).invert();
      }
    }
    function Me(V, X) {
      X === null ? V.matrixWorld.copy(V.matrix) : V.matrixWorld.multiplyMatrices(X.matrixWorld, V.matrix), V.matrixWorldInverse.copy(V.matrixWorld).invert();
    }
    this.updateCamera = function(V) {
      if (r === null) return;
      let X = V.near, ne = V.far;
      m.texture !== null && (m.depthNear > 0 && (X = m.depthNear), m.depthFar > 0 && (ne = m.depthFar)), z.near = S.near = M.near = X, z.far = S.far = M.far = ne, (H !== z.near || q !== z.far) && (r.updateRenderState({
        depthNear: z.near,
        depthFar: z.far
      }), H = z.near, q = z.far), z.layers.mask = V.layers.mask | 6, M.layers.mask = z.layers.mask & 3, S.layers.mask = z.layers.mask & 5;
      const Se = V.parent, ue = z.cameras;
      Me(z, Se);
      for (let Ne = 0; Ne < ue.length; Ne++)
        Me(ue[Ne], Se);
      ue.length === 2 ? re(z, M, S) : z.projectionMatrix.copy(M.projectionMatrix), ke(V, z, Se);
    };
    function ke(V, X, ne) {
      ne === null ? V.matrix.copy(X.matrixWorld) : (V.matrix.copy(ne.matrixWorld), V.matrix.invert(), V.matrix.multiply(X.matrixWorld)), V.matrix.decompose(V.position, V.quaternion, V.scale), V.updateMatrixWorld(!0), V.projectionMatrix.copy(X.projectionMatrix), V.projectionMatrixInverse.copy(X.projectionMatrixInverse), V.isPerspectiveCamera && (V.fov = vs * 2 * Math.atan(1 / V.projectionMatrix.elements[5]), V.zoom = 1);
    }
    this.getCamera = function() {
      return z;
    }, this.getFoveation = function() {
      if (!(f === null && p === null))
        return l;
    }, this.setFoveation = function(V) {
      l = V, f !== null && (f.fixedFoveation = V), p !== null && p.fixedFoveation !== void 0 && (p.fixedFoveation = V);
    }, this.hasDepthSensing = function() {
      return m.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return m.getMesh(z);
    }, this.getCameraTexture = function(V) {
      return h[V];
    };
    let et = null;
    function je(V, X) {
      if (d = X.getViewerPose(c || a), x = X, d !== null) {
        const ne = d.views;
        p !== null && (e.setRenderTargetFramebuffer(A, p.framebuffer), e.setRenderTarget(A));
        let Se = !1;
        ne.length !== z.cameras.length && (z.cameras.length = 0, Se = !0);
        for (let Ve = 0; Ve < ne.length; Ve++) {
          const at = ne[Ve];
          let w = null;
          if (p !== null)
            w = p.getViewport(at);
          else {
            const We = u.getViewSubImage(f, at);
            w = We.viewport, Ve === 0 && (e.setRenderTargetTextures(
              A,
              We.colorTexture,
              We.depthStencilTexture
            ), e.setRenderTarget(A));
          }
          let He = L[Ve];
          He === void 0 && (He = new Zt(), He.layers.enable(Ve), He.viewport = new _t(), L[Ve] = He), He.matrix.fromArray(at.transform.matrix), He.matrix.decompose(He.position, He.quaternion, He.scale), He.projectionMatrix.fromArray(at.projectionMatrix), He.projectionMatrixInverse.copy(He.projectionMatrix).invert(), He.viewport.set(w.x, w.y, w.width, w.height), Ve === 0 && (z.matrix.copy(He.matrix), z.matrix.decompose(z.position, z.quaternion, z.scale)), Se === !0 && z.cameras.push(He);
        }
        const ue = r.enabledFeatures;
        if (ue && ue.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && v) {
          u = i.getBinding();
          const Ve = u.getDepthInformation(ne[0]);
          Ve && Ve.isValid && Ve.texture && m.init(Ve, r.renderState);
        }
        if (ue && ue.includes("camera-access") && v) {
          e.state.unbindTexture(), u = i.getBinding();
          for (let Ve = 0; Ve < ne.length; Ve++) {
            const at = ne[Ve].camera;
            if (at) {
              let w = h[at];
              w || (w = new go(), h[at] = w);
              const He = u.getCameraImage(at);
              w.sourceTexture = He;
            }
          }
        }
      }
      for (let ne = 0; ne < D.length; ne++) {
        const Se = y[ne], ue = D[ne];
        Se !== null && ue !== void 0 && ue.update(Se, X, c || a);
      }
      et && et(V, X), X.detectedPlanes && i.dispatchEvent({ type: "planesdetected", data: X }), x = null;
    }
    const st = new _o();
    st.setAnimationLoop(je), this.setAnimationLoop = function(V) {
      et = V;
    }, this.dispose = function() {
    };
  }
}
const Gn = /* @__PURE__ */ new yn(), Ch = /* @__PURE__ */ new bt();
function Rh(n, e) {
  function t(m, h) {
    m.matrixAutoUpdate === !0 && m.updateMatrix(), h.value.copy(m.matrix);
  }
  function i(m, h) {
    h.color.getRGB(m.fogColor.value, uo(n)), h.isFog ? (m.fogNear.value = h.near, m.fogFar.value = h.far) : h.isFogExp2 && (m.fogDensity.value = h.density);
  }
  function r(m, h, T, E, A) {
    h.isMeshBasicMaterial || h.isMeshLambertMaterial ? s(m, h) : h.isMeshToonMaterial ? (s(m, h), u(m, h)) : h.isMeshPhongMaterial ? (s(m, h), d(m, h)) : h.isMeshStandardMaterial ? (s(m, h), f(m, h), h.isMeshPhysicalMaterial && p(m, h, A)) : h.isMeshMatcapMaterial ? (s(m, h), x(m, h)) : h.isMeshDepthMaterial ? s(m, h) : h.isMeshDistanceMaterial ? (s(m, h), v(m, h)) : h.isMeshNormalMaterial ? s(m, h) : h.isLineBasicMaterial ? (a(m, h), h.isLineDashedMaterial && o(m, h)) : h.isPointsMaterial ? l(m, h, T, E) : h.isSpriteMaterial ? c(m, h) : h.isShadowMaterial ? (m.color.value.copy(h.color), m.opacity.value = h.opacity) : h.isShaderMaterial && (h.uniformsNeedUpdate = !1);
  }
  function s(m, h) {
    m.opacity.value = h.opacity, h.color && m.diffuse.value.copy(h.color), h.emissive && m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity), h.map && (m.map.value = h.map, t(h.map, m.mapTransform)), h.alphaMap && (m.alphaMap.value = h.alphaMap, t(h.alphaMap, m.alphaMapTransform)), h.bumpMap && (m.bumpMap.value = h.bumpMap, t(h.bumpMap, m.bumpMapTransform), m.bumpScale.value = h.bumpScale, h.side === 1 && (m.bumpScale.value *= -1)), h.normalMap && (m.normalMap.value = h.normalMap, t(h.normalMap, m.normalMapTransform), m.normalScale.value.copy(h.normalScale), h.side === 1 && m.normalScale.value.negate()), h.displacementMap && (m.displacementMap.value = h.displacementMap, t(h.displacementMap, m.displacementMapTransform), m.displacementScale.value = h.displacementScale, m.displacementBias.value = h.displacementBias), h.emissiveMap && (m.emissiveMap.value = h.emissiveMap, t(h.emissiveMap, m.emissiveMapTransform)), h.specularMap && (m.specularMap.value = h.specularMap, t(h.specularMap, m.specularMapTransform)), h.alphaTest > 0 && (m.alphaTest.value = h.alphaTest);
    const T = e.get(h), E = T.envMap, A = T.envMapRotation;
    E && (m.envMap.value = E, Gn.copy(A), Gn.x *= -1, Gn.y *= -1, Gn.z *= -1, E.isCubeTexture && E.isRenderTargetTexture === !1 && (Gn.y *= -1, Gn.z *= -1), m.envMapRotation.value.setFromMatrix4(Ch.makeRotationFromEuler(Gn)), m.flipEnvMap.value = E.isCubeTexture && E.isRenderTargetTexture === !1 ? -1 : 1, m.reflectivity.value = h.reflectivity, m.ior.value = h.ior, m.refractionRatio.value = h.refractionRatio), h.lightMap && (m.lightMap.value = h.lightMap, m.lightMapIntensity.value = h.lightMapIntensity, t(h.lightMap, m.lightMapTransform)), h.aoMap && (m.aoMap.value = h.aoMap, m.aoMapIntensity.value = h.aoMapIntensity, t(h.aoMap, m.aoMapTransform));
  }
  function a(m, h) {
    m.diffuse.value.copy(h.color), m.opacity.value = h.opacity, h.map && (m.map.value = h.map, t(h.map, m.mapTransform));
  }
  function o(m, h) {
    m.dashSize.value = h.dashSize, m.totalSize.value = h.dashSize + h.gapSize, m.scale.value = h.scale;
  }
  function l(m, h, T, E) {
    m.diffuse.value.copy(h.color), m.opacity.value = h.opacity, m.size.value = h.size * T, m.scale.value = E * 0.5, h.map && (m.map.value = h.map, t(h.map, m.uvTransform)), h.alphaMap && (m.alphaMap.value = h.alphaMap, t(h.alphaMap, m.alphaMapTransform)), h.alphaTest > 0 && (m.alphaTest.value = h.alphaTest);
  }
  function c(m, h) {
    m.diffuse.value.copy(h.color), m.opacity.value = h.opacity, m.rotation.value = h.rotation, h.map && (m.map.value = h.map, t(h.map, m.mapTransform)), h.alphaMap && (m.alphaMap.value = h.alphaMap, t(h.alphaMap, m.alphaMapTransform)), h.alphaTest > 0 && (m.alphaTest.value = h.alphaTest);
  }
  function d(m, h) {
    m.specular.value.copy(h.specular), m.shininess.value = Math.max(h.shininess, 1e-4);
  }
  function u(m, h) {
    h.gradientMap && (m.gradientMap.value = h.gradientMap);
  }
  function f(m, h) {
    m.metalness.value = h.metalness, h.metalnessMap && (m.metalnessMap.value = h.metalnessMap, t(h.metalnessMap, m.metalnessMapTransform)), m.roughness.value = h.roughness, h.roughnessMap && (m.roughnessMap.value = h.roughnessMap, t(h.roughnessMap, m.roughnessMapTransform)), h.envMap && (m.envMapIntensity.value = h.envMapIntensity);
  }
  function p(m, h, T) {
    m.ior.value = h.ior, h.sheen > 0 && (m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen), m.sheenRoughness.value = h.sheenRoughness, h.sheenColorMap && (m.sheenColorMap.value = h.sheenColorMap, t(h.sheenColorMap, m.sheenColorMapTransform)), h.sheenRoughnessMap && (m.sheenRoughnessMap.value = h.sheenRoughnessMap, t(h.sheenRoughnessMap, m.sheenRoughnessMapTransform))), h.clearcoat > 0 && (m.clearcoat.value = h.clearcoat, m.clearcoatRoughness.value = h.clearcoatRoughness, h.clearcoatMap && (m.clearcoatMap.value = h.clearcoatMap, t(h.clearcoatMap, m.clearcoatMapTransform)), h.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = h.clearcoatRoughnessMap, t(h.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), h.clearcoatNormalMap && (m.clearcoatNormalMap.value = h.clearcoatNormalMap, t(h.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale), h.side === 1 && m.clearcoatNormalScale.value.negate())), h.dispersion > 0 && (m.dispersion.value = h.dispersion), h.iridescence > 0 && (m.iridescence.value = h.iridescence, m.iridescenceIOR.value = h.iridescenceIOR, m.iridescenceThicknessMinimum.value = h.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = h.iridescenceThicknessRange[1], h.iridescenceMap && (m.iridescenceMap.value = h.iridescenceMap, t(h.iridescenceMap, m.iridescenceMapTransform)), h.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = h.iridescenceThicknessMap, t(h.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), h.transmission > 0 && (m.transmission.value = h.transmission, m.transmissionSamplerMap.value = T.texture, m.transmissionSamplerSize.value.set(T.width, T.height), h.transmissionMap && (m.transmissionMap.value = h.transmissionMap, t(h.transmissionMap, m.transmissionMapTransform)), m.thickness.value = h.thickness, h.thicknessMap && (m.thicknessMap.value = h.thicknessMap, t(h.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = h.attenuationDistance, m.attenuationColor.value.copy(h.attenuationColor)), h.anisotropy > 0 && (m.anisotropyVector.value.set(h.anisotropy * Math.cos(h.anisotropyRotation), h.anisotropy * Math.sin(h.anisotropyRotation)), h.anisotropyMap && (m.anisotropyMap.value = h.anisotropyMap, t(h.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = h.specularIntensity, m.specularColor.value.copy(h.specularColor), h.specularColorMap && (m.specularColorMap.value = h.specularColorMap, t(h.specularColorMap, m.specularColorMapTransform)), h.specularIntensityMap && (m.specularIntensityMap.value = h.specularIntensityMap, t(h.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function x(m, h) {
    h.matcap && (m.matcap.value = h.matcap);
  }
  function v(m, h) {
    const T = e.get(h).light;
    m.referencePosition.value.setFromMatrixPosition(T.matrixWorld), m.nearDistance.value = T.shadow.camera.near, m.farDistance.value = T.shadow.camera.far;
  }
  return {
    refreshFogUniforms: i,
    refreshMaterialUniforms: r
  };
}
function Ph(n, e, t, i) {
  let r = {}, s = {}, a = [];
  const o = n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(T, E) {
    const A = E.program;
    i.uniformBlockBinding(T, A);
  }
  function c(T, E) {
    let A = r[T.id];
    A === void 0 && (x(T), A = d(T), r[T.id] = A, T.addEventListener("dispose", m));
    const D = E.program;
    i.updateUBOMapping(T, D);
    const y = e.render.frame;
    s[T.id] !== y && (f(T), s[T.id] = y);
  }
  function d(T) {
    const E = u();
    T.__bindingPointIndex = E;
    const A = n.createBuffer(), D = T.__size, y = T.usage;
    return n.bindBuffer(n.UNIFORM_BUFFER, A), n.bufferData(n.UNIFORM_BUFFER, D, y), n.bindBuffer(n.UNIFORM_BUFFER, null), n.bindBufferBase(n.UNIFORM_BUFFER, E, A), A;
  }
  function u() {
    for (let T = 0; T < o; T++)
      if (a.indexOf(T) === -1)
        return a.push(T), T;
    return gt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function f(T) {
    const E = r[T.id], A = T.uniforms, D = T.__cache;
    n.bindBuffer(n.UNIFORM_BUFFER, E);
    for (let y = 0, P = A.length; y < P; y++) {
      const O = Array.isArray(A[y]) ? A[y] : [A[y]];
      for (let M = 0, S = O.length; M < S; M++) {
        const L = O[M];
        if (p(L, y, M, D) === !0) {
          const z = L.__offset, H = Array.isArray(L.value) ? L.value : [L.value];
          let q = 0;
          for (let K = 0; K < H.length; K++) {
            const Y = H[K], te = v(Y);
            typeof Y == "number" || typeof Y == "boolean" ? (L.__data[0] = Y, n.bufferSubData(n.UNIFORM_BUFFER, z + q, L.__data)) : Y.isMatrix3 ? (L.__data[0] = Y.elements[0], L.__data[1] = Y.elements[1], L.__data[2] = Y.elements[2], L.__data[3] = 0, L.__data[4] = Y.elements[3], L.__data[5] = Y.elements[4], L.__data[6] = Y.elements[5], L.__data[7] = 0, L.__data[8] = Y.elements[6], L.__data[9] = Y.elements[7], L.__data[10] = Y.elements[8], L.__data[11] = 0) : (Y.toArray(L.__data, q), q += te.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          n.bufferSubData(n.UNIFORM_BUFFER, z, L.__data);
        }
      }
    }
    n.bindBuffer(n.UNIFORM_BUFFER, null);
  }
  function p(T, E, A, D) {
    const y = T.value, P = E + "_" + A;
    if (D[P] === void 0)
      return typeof y == "number" || typeof y == "boolean" ? D[P] = y : D[P] = y.clone(), !0;
    {
      const O = D[P];
      if (typeof y == "number" || typeof y == "boolean") {
        if (O !== y)
          return D[P] = y, !0;
      } else if (O.equals(y) === !1)
        return O.copy(y), !0;
    }
    return !1;
  }
  function x(T) {
    const E = T.uniforms;
    let A = 0;
    const D = 16;
    for (let P = 0, O = E.length; P < O; P++) {
      const M = Array.isArray(E[P]) ? E[P] : [E[P]];
      for (let S = 0, L = M.length; S < L; S++) {
        const z = M[S], H = Array.isArray(z.value) ? z.value : [z.value];
        for (let q = 0, K = H.length; q < K; q++) {
          const Y = H[q], te = v(Y), W = A % D, Q = W % te.boundary, re = W + Q;
          A += Q, re !== 0 && D - re < te.storage && (A += D - re), z.__data = new Float32Array(te.storage / Float32Array.BYTES_PER_ELEMENT), z.__offset = A, A += te.storage;
        }
      }
    }
    const y = A % D;
    return y > 0 && (A += D - y), T.__size = A, T.__cache = {}, this;
  }
  function v(T) {
    const E = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof T == "number" || typeof T == "boolean" ? (E.boundary = 4, E.storage = 4) : T.isVector2 ? (E.boundary = 8, E.storage = 8) : T.isVector3 || T.isColor ? (E.boundary = 16, E.storage = 12) : T.isVector4 ? (E.boundary = 16, E.storage = 16) : T.isMatrix3 ? (E.boundary = 48, E.storage = 48) : T.isMatrix4 ? (E.boundary = 64, E.storage = 64) : T.isTexture ? Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : Oe("WebGLRenderer: Unsupported uniform value type.", T), E;
  }
  function m(T) {
    const E = T.target;
    E.removeEventListener("dispose", m);
    const A = a.indexOf(E.__bindingPointIndex);
    a.splice(A, 1), n.deleteBuffer(r[E.id]), delete r[E.id], delete s[E.id];
  }
  function h() {
    for (const T in r)
      n.deleteBuffer(r[T]);
    a = [], r = {}, s = {};
  }
  return {
    bind: l,
    update: c,
    dispose: h
  };
}
const Dh = new Uint16Array([
  11481,
  15204,
  11534,
  15171,
  11808,
  15015,
  12385,
  14843,
  12894,
  14716,
  13396,
  14600,
  13693,
  14483,
  13976,
  14366,
  14237,
  14171,
  14405,
  13961,
  14511,
  13770,
  14605,
  13598,
  14687,
  13444,
  14760,
  13305,
  14822,
  13066,
  14876,
  12857,
  14923,
  12675,
  14963,
  12517,
  14997,
  12379,
  15025,
  12230,
  15049,
  12023,
  15070,
  11843,
  15086,
  11687,
  15100,
  11551,
  15111,
  11433,
  15120,
  11330,
  15127,
  11217,
  15132,
  11060,
  15135,
  10922,
  15138,
  10801,
  15139,
  10695,
  15139,
  10600,
  13012,
  14923,
  13020,
  14917,
  13064,
  14886,
  13176,
  14800,
  13349,
  14666,
  13513,
  14526,
  13724,
  14398,
  13960,
  14230,
  14200,
  14020,
  14383,
  13827,
  14488,
  13651,
  14583,
  13491,
  14667,
  13348,
  14740,
  13132,
  14803,
  12908,
  14856,
  12713,
  14901,
  12542,
  14938,
  12394,
  14968,
  12241,
  14992,
  12017,
  15010,
  11822,
  15024,
  11654,
  15034,
  11507,
  15041,
  11380,
  15044,
  11269,
  15044,
  11081,
  15042,
  10913,
  15037,
  10764,
  15031,
  10635,
  15023,
  10520,
  15014,
  10419,
  15003,
  10330,
  13657,
  14676,
  13658,
  14673,
  13670,
  14660,
  13698,
  14622,
  13750,
  14547,
  13834,
  14442,
  13956,
  14317,
  14112,
  14093,
  14291,
  13889,
  14407,
  13704,
  14499,
  13538,
  14586,
  13389,
  14664,
  13201,
  14733,
  12966,
  14792,
  12758,
  14842,
  12577,
  14882,
  12418,
  14915,
  12272,
  14940,
  12033,
  14959,
  11826,
  14972,
  11646,
  14980,
  11490,
  14983,
  11355,
  14983,
  11212,
  14979,
  11008,
  14971,
  10830,
  14961,
  10675,
  14950,
  10540,
  14936,
  10420,
  14923,
  10315,
  14909,
  10204,
  14894,
  10041,
  14089,
  14460,
  14090,
  14459,
  14096,
  14452,
  14112,
  14431,
  14141,
  14388,
  14186,
  14305,
  14252,
  14130,
  14341,
  13941,
  14399,
  13756,
  14467,
  13585,
  14539,
  13430,
  14610,
  13272,
  14677,
  13026,
  14737,
  12808,
  14790,
  12617,
  14833,
  12449,
  14869,
  12303,
  14896,
  12065,
  14916,
  11845,
  14929,
  11655,
  14937,
  11490,
  14939,
  11347,
  14936,
  11184,
  14930,
  10970,
  14921,
  10783,
  14912,
  10621,
  14900,
  10480,
  14885,
  10356,
  14867,
  10247,
  14848,
  10062,
  14827,
  9894,
  14805,
  9745,
  14400,
  14208,
  14400,
  14206,
  14402,
  14198,
  14406,
  14174,
  14415,
  14122,
  14427,
  14035,
  14444,
  13913,
  14469,
  13767,
  14504,
  13613,
  14548,
  13463,
  14598,
  13324,
  14651,
  13082,
  14704,
  12858,
  14752,
  12658,
  14795,
  12483,
  14831,
  12330,
  14860,
  12106,
  14881,
  11875,
  14895,
  11675,
  14903,
  11501,
  14905,
  11351,
  14903,
  11178,
  14900,
  10953,
  14892,
  10757,
  14880,
  10589,
  14865,
  10442,
  14847,
  10313,
  14827,
  10162,
  14805,
  9965,
  14782,
  9792,
  14757,
  9642,
  14731,
  9507,
  14562,
  13883,
  14562,
  13883,
  14563,
  13877,
  14566,
  13862,
  14570,
  13830,
  14576,
  13773,
  14584,
  13689,
  14595,
  13582,
  14613,
  13461,
  14637,
  13336,
  14668,
  13120,
  14704,
  12897,
  14741,
  12695,
  14776,
  12516,
  14808,
  12358,
  14835,
  12150,
  14856,
  11910,
  14870,
  11701,
  14878,
  11519,
  14882,
  11361,
  14884,
  11187,
  14880,
  10951,
  14871,
  10748,
  14858,
  10572,
  14842,
  10418,
  14823,
  10286,
  14801,
  10099,
  14777,
  9897,
  14751,
  9722,
  14725,
  9567,
  14696,
  9430,
  14666,
  9309,
  14702,
  13604,
  14702,
  13604,
  14702,
  13600,
  14703,
  13591,
  14705,
  13570,
  14707,
  13533,
  14709,
  13477,
  14712,
  13400,
  14718,
  13305,
  14727,
  13106,
  14743,
  12907,
  14762,
  12716,
  14784,
  12539,
  14807,
  12380,
  14827,
  12190,
  14844,
  11943,
  14855,
  11727,
  14863,
  11539,
  14870,
  11376,
  14871,
  11204,
  14868,
  10960,
  14858,
  10748,
  14845,
  10565,
  14829,
  10406,
  14809,
  10269,
  14786,
  10058,
  14761,
  9852,
  14734,
  9671,
  14705,
  9512,
  14674,
  9374,
  14641,
  9253,
  14608,
  9076,
  14821,
  13366,
  14821,
  13365,
  14821,
  13364,
  14821,
  13358,
  14821,
  13344,
  14821,
  13320,
  14819,
  13252,
  14817,
  13145,
  14815,
  13011,
  14814,
  12858,
  14817,
  12698,
  14823,
  12539,
  14832,
  12389,
  14841,
  12214,
  14850,
  11968,
  14856,
  11750,
  14861,
  11558,
  14866,
  11390,
  14867,
  11226,
  14862,
  10972,
  14853,
  10754,
  14840,
  10565,
  14823,
  10401,
  14803,
  10259,
  14780,
  10032,
  14754,
  9820,
  14725,
  9635,
  14694,
  9473,
  14661,
  9333,
  14627,
  9203,
  14593,
  8988,
  14557,
  8798,
  14923,
  13014,
  14922,
  13014,
  14922,
  13012,
  14922,
  13004,
  14920,
  12987,
  14919,
  12957,
  14915,
  12907,
  14909,
  12834,
  14902,
  12738,
  14894,
  12623,
  14888,
  12498,
  14883,
  12370,
  14880,
  12203,
  14878,
  11970,
  14875,
  11759,
  14873,
  11569,
  14874,
  11401,
  14872,
  11243,
  14865,
  10986,
  14855,
  10762,
  14842,
  10568,
  14825,
  10401,
  14804,
  10255,
  14781,
  10017,
  14754,
  9799,
  14725,
  9611,
  14692,
  9445,
  14658,
  9301,
  14623,
  9139,
  14587,
  8920,
  14548,
  8729,
  14509,
  8562,
  15008,
  12672,
  15008,
  12672,
  15008,
  12671,
  15007,
  12667,
  15005,
  12656,
  15001,
  12637,
  14997,
  12605,
  14989,
  12556,
  14978,
  12490,
  14966,
  12407,
  14953,
  12313,
  14940,
  12136,
  14927,
  11934,
  14914,
  11742,
  14903,
  11563,
  14896,
  11401,
  14889,
  11247,
  14879,
  10992,
  14866,
  10767,
  14851,
  10570,
  14833,
  10400,
  14812,
  10252,
  14789,
  10007,
  14761,
  9784,
  14731,
  9592,
  14698,
  9424,
  14663,
  9279,
  14627,
  9088,
  14588,
  8868,
  14548,
  8676,
  14508,
  8508,
  14467,
  8360,
  15080,
  12386,
  15080,
  12386,
  15079,
  12385,
  15078,
  12383,
  15076,
  12378,
  15072,
  12367,
  15066,
  12347,
  15057,
  12315,
  15045,
  12253,
  15030,
  12138,
  15012,
  11998,
  14993,
  11845,
  14972,
  11685,
  14951,
  11530,
  14935,
  11383,
  14920,
  11228,
  14904,
  10981,
  14887,
  10762,
  14870,
  10567,
  14850,
  10397,
  14827,
  10248,
  14803,
  9997,
  14774,
  9771,
  14743,
  9578,
  14710,
  9407,
  14674,
  9259,
  14637,
  9048,
  14596,
  8826,
  14555,
  8632,
  14514,
  8464,
  14471,
  8317,
  14427,
  8182,
  15139,
  12008,
  15139,
  12008,
  15138,
  12008,
  15137,
  12007,
  15135,
  12003,
  15130,
  11990,
  15124,
  11969,
  15115,
  11929,
  15102,
  11872,
  15086,
  11794,
  15064,
  11693,
  15041,
  11581,
  15013,
  11459,
  14987,
  11336,
  14966,
  11170,
  14944,
  10944,
  14921,
  10738,
  14898,
  10552,
  14875,
  10387,
  14850,
  10239,
  14824,
  9983,
  14794,
  9758,
  14762,
  9563,
  14728,
  9392,
  14692,
  9244,
  14653,
  9014,
  14611,
  8791,
  14569,
  8597,
  14526,
  8427,
  14481,
  8281,
  14436,
  8110,
  14391,
  7885,
  15188,
  11617,
  15188,
  11617,
  15187,
  11617,
  15186,
  11618,
  15183,
  11617,
  15179,
  11612,
  15173,
  11601,
  15163,
  11581,
  15150,
  11546,
  15133,
  11495,
  15110,
  11427,
  15083,
  11346,
  15051,
  11246,
  15024,
  11057,
  14996,
  10868,
  14967,
  10687,
  14938,
  10517,
  14911,
  10362,
  14882,
  10206,
  14853,
  9956,
  14821,
  9737,
  14787,
  9543,
  14752,
  9375,
  14715,
  9228,
  14675,
  8980,
  14632,
  8760,
  14589,
  8565,
  14544,
  8395,
  14498,
  8248,
  14451,
  8049,
  14404,
  7824,
  14357,
  7630,
  15228,
  11298,
  15228,
  11298,
  15227,
  11299,
  15226,
  11301,
  15223,
  11303,
  15219,
  11302,
  15213,
  11299,
  15204,
  11290,
  15191,
  11271,
  15174,
  11217,
  15150,
  11129,
  15119,
  11015,
  15087,
  10886,
  15057,
  10744,
  15024,
  10599,
  14990,
  10455,
  14957,
  10318,
  14924,
  10143,
  14891,
  9911,
  14856,
  9701,
  14820,
  9516,
  14782,
  9352,
  14744,
  9200,
  14703,
  8946,
  14659,
  8725,
  14615,
  8533,
  14568,
  8366,
  14521,
  8220,
  14472,
  7992,
  14423,
  7770,
  14374,
  7578,
  14315,
  7408,
  15260,
  10819,
  15260,
  10819,
  15259,
  10822,
  15258,
  10826,
  15256,
  10832,
  15251,
  10836,
  15246,
  10841,
  15237,
  10838,
  15225,
  10821,
  15207,
  10788,
  15183,
  10734,
  15151,
  10660,
  15120,
  10571,
  15087,
  10469,
  15049,
  10359,
  15012,
  10249,
  14974,
  10041,
  14937,
  9837,
  14900,
  9647,
  14860,
  9475,
  14820,
  9320,
  14779,
  9147,
  14736,
  8902,
  14691,
  8688,
  14646,
  8499,
  14598,
  8335,
  14549,
  8189,
  14499,
  7940,
  14448,
  7720,
  14397,
  7529,
  14347,
  7363,
  14256,
  7218,
  15285,
  10410,
  15285,
  10411,
  15285,
  10413,
  15284,
  10418,
  15282,
  10425,
  15278,
  10434,
  15272,
  10442,
  15264,
  10449,
  15252,
  10445,
  15235,
  10433,
  15210,
  10403,
  15179,
  10358,
  15149,
  10301,
  15113,
  10218,
  15073,
  10059,
  15033,
  9894,
  14991,
  9726,
  14951,
  9565,
  14909,
  9413,
  14865,
  9273,
  14822,
  9073,
  14777,
  8845,
  14730,
  8641,
  14682,
  8459,
  14633,
  8300,
  14583,
  8129,
  14531,
  7883,
  14479,
  7670,
  14426,
  7482,
  14373,
  7321,
  14305,
  7176,
  14201,
  6939,
  15305,
  9939,
  15305,
  9940,
  15305,
  9945,
  15304,
  9955,
  15302,
  9967,
  15298,
  9989,
  15293,
  10010,
  15286,
  10033,
  15274,
  10044,
  15258,
  10045,
  15233,
  10022,
  15205,
  9975,
  15174,
  9903,
  15136,
  9808,
  15095,
  9697,
  15053,
  9578,
  15009,
  9451,
  14965,
  9327,
  14918,
  9198,
  14871,
  8973,
  14825,
  8766,
  14775,
  8579,
  14725,
  8408,
  14675,
  8259,
  14622,
  8058,
  14569,
  7821,
  14515,
  7615,
  14460,
  7435,
  14405,
  7276,
  14350,
  7108,
  14256,
  6866,
  14149,
  6653,
  15321,
  9444,
  15321,
  9445,
  15321,
  9448,
  15320,
  9458,
  15317,
  9470,
  15314,
  9490,
  15310,
  9515,
  15302,
  9540,
  15292,
  9562,
  15276,
  9579,
  15251,
  9577,
  15226,
  9559,
  15195,
  9519,
  15156,
  9463,
  15116,
  9389,
  15071,
  9304,
  15025,
  9208,
  14978,
  9023,
  14927,
  8838,
  14878,
  8661,
  14827,
  8496,
  14774,
  8344,
  14722,
  8206,
  14667,
  7973,
  14612,
  7749,
  14556,
  7555,
  14499,
  7382,
  14443,
  7229,
  14385,
  7025,
  14322,
  6791,
  14210,
  6588,
  14100,
  6409,
  15333,
  8920,
  15333,
  8921,
  15332,
  8927,
  15332,
  8943,
  15329,
  8965,
  15326,
  9002,
  15322,
  9048,
  15316,
  9106,
  15307,
  9162,
  15291,
  9204,
  15267,
  9221,
  15244,
  9221,
  15212,
  9196,
  15175,
  9134,
  15133,
  9043,
  15088,
  8930,
  15040,
  8801,
  14990,
  8665,
  14938,
  8526,
  14886,
  8391,
  14830,
  8261,
  14775,
  8087,
  14719,
  7866,
  14661,
  7664,
  14603,
  7482,
  14544,
  7322,
  14485,
  7178,
  14426,
  6936,
  14367,
  6713,
  14281,
  6517,
  14166,
  6348,
  14054,
  6198,
  15341,
  8360,
  15341,
  8361,
  15341,
  8366,
  15341,
  8379,
  15339,
  8399,
  15336,
  8431,
  15332,
  8473,
  15326,
  8527,
  15318,
  8585,
  15302,
  8632,
  15281,
  8670,
  15258,
  8690,
  15227,
  8690,
  15191,
  8664,
  15149,
  8612,
  15104,
  8543,
  15055,
  8456,
  15001,
  8360,
  14948,
  8259,
  14892,
  8122,
  14834,
  7923,
  14776,
  7734,
  14716,
  7558,
  14656,
  7397,
  14595,
  7250,
  14534,
  7070,
  14472,
  6835,
  14410,
  6628,
  14350,
  6443,
  14243,
  6283,
  14125,
  6135,
  14010,
  5889,
  15348,
  7715,
  15348,
  7717,
  15348,
  7725,
  15347,
  7745,
  15345,
  7780,
  15343,
  7836,
  15339,
  7905,
  15334,
  8e3,
  15326,
  8103,
  15310,
  8193,
  15293,
  8239,
  15270,
  8270,
  15240,
  8287,
  15204,
  8283,
  15163,
  8260,
  15118,
  8223,
  15067,
  8143,
  15014,
  8014,
  14958,
  7873,
  14899,
  7723,
  14839,
  7573,
  14778,
  7430,
  14715,
  7293,
  14652,
  7164,
  14588,
  6931,
  14524,
  6720,
  14460,
  6531,
  14396,
  6362,
  14330,
  6210,
  14207,
  6015,
  14086,
  5781,
  13969,
  5576,
  15352,
  7114,
  15352,
  7116,
  15352,
  7128,
  15352,
  7159,
  15350,
  7195,
  15348,
  7237,
  15345,
  7299,
  15340,
  7374,
  15332,
  7457,
  15317,
  7544,
  15301,
  7633,
  15280,
  7703,
  15251,
  7754,
  15216,
  7775,
  15176,
  7767,
  15131,
  7733,
  15079,
  7670,
  15026,
  7588,
  14967,
  7492,
  14906,
  7387,
  14844,
  7278,
  14779,
  7171,
  14714,
  6965,
  14648,
  6770,
  14581,
  6587,
  14515,
  6420,
  14448,
  6269,
  14382,
  6123,
  14299,
  5881,
  14172,
  5665,
  14049,
  5477,
  13929,
  5310,
  15355,
  6329,
  15355,
  6330,
  15355,
  6339,
  15355,
  6362,
  15353,
  6410,
  15351,
  6472,
  15349,
  6572,
  15344,
  6688,
  15337,
  6835,
  15323,
  6985,
  15309,
  7142,
  15287,
  7220,
  15260,
  7277,
  15226,
  7310,
  15188,
  7326,
  15142,
  7318,
  15090,
  7285,
  15036,
  7239,
  14976,
  7177,
  14914,
  7045,
  14849,
  6892,
  14782,
  6736,
  14714,
  6581,
  14645,
  6433,
  14576,
  6293,
  14506,
  6164,
  14438,
  5946,
  14369,
  5733,
  14270,
  5540,
  14140,
  5369,
  14014,
  5216,
  13892,
  5043,
  15357,
  5483,
  15357,
  5484,
  15357,
  5496,
  15357,
  5528,
  15356,
  5597,
  15354,
  5692,
  15351,
  5835,
  15347,
  6011,
  15339,
  6195,
  15328,
  6317,
  15314,
  6446,
  15293,
  6566,
  15268,
  6668,
  15235,
  6746,
  15197,
  6796,
  15152,
  6811,
  15101,
  6790,
  15046,
  6748,
  14985,
  6673,
  14921,
  6583,
  14854,
  6479,
  14785,
  6371,
  14714,
  6259,
  14643,
  6149,
  14571,
  5946,
  14499,
  5750,
  14428,
  5567,
  14358,
  5401,
  14242,
  5250,
  14109,
  5111,
  13980,
  4870,
  13856,
  4657,
  15359,
  4555,
  15359,
  4557,
  15358,
  4573,
  15358,
  4633,
  15357,
  4715,
  15355,
  4841,
  15353,
  5061,
  15349,
  5216,
  15342,
  5391,
  15331,
  5577,
  15318,
  5770,
  15299,
  5967,
  15274,
  6150,
  15243,
  6223,
  15206,
  6280,
  15161,
  6310,
  15111,
  6317,
  15055,
  6300,
  14994,
  6262,
  14928,
  6208,
  14860,
  6141,
  14788,
  5994,
  14715,
  5838,
  14641,
  5684,
  14566,
  5529,
  14492,
  5384,
  14418,
  5247,
  14346,
  5121,
  14216,
  4892,
  14079,
  4682,
  13948,
  4496,
  13822,
  4330,
  15359,
  3498,
  15359,
  3501,
  15359,
  3520,
  15359,
  3598,
  15358,
  3719,
  15356,
  3860,
  15355,
  4137,
  15351,
  4305,
  15344,
  4563,
  15334,
  4809,
  15321,
  5116,
  15303,
  5273,
  15280,
  5418,
  15250,
  5547,
  15214,
  5653,
  15170,
  5722,
  15120,
  5761,
  15064,
  5763,
  15002,
  5733,
  14935,
  5673,
  14865,
  5597,
  14792,
  5504,
  14716,
  5400,
  14640,
  5294,
  14563,
  5185,
  14486,
  5041,
  14410,
  4841,
  14335,
  4655,
  14191,
  4482,
  14051,
  4325,
  13918,
  4183,
  13790,
  4012,
  15360,
  2282,
  15360,
  2285,
  15360,
  2306,
  15360,
  2401,
  15359,
  2547,
  15357,
  2748,
  15355,
  3103,
  15352,
  3349,
  15345,
  3675,
  15336,
  4020,
  15324,
  4272,
  15307,
  4496,
  15285,
  4716,
  15255,
  4908,
  15220,
  5086,
  15178,
  5170,
  15128,
  5214,
  15072,
  5234,
  15010,
  5231,
  14943,
  5206,
  14871,
  5166,
  14796,
  5102,
  14718,
  4971,
  14639,
  4833,
  14559,
  4687,
  14480,
  4541,
  14402,
  4401,
  14315,
  4268,
  14167,
  4142,
  14025,
  3958,
  13888,
  3747,
  13759,
  3556,
  15360,
  923,
  15360,
  925,
  15360,
  946,
  15360,
  1052,
  15359,
  1214,
  15357,
  1494,
  15356,
  1892,
  15352,
  2274,
  15346,
  2663,
  15338,
  3099,
  15326,
  3393,
  15309,
  3679,
  15288,
  3980,
  15260,
  4183,
  15226,
  4325,
  15185,
  4437,
  15136,
  4517,
  15080,
  4570,
  15018,
  4591,
  14950,
  4581,
  14877,
  4545,
  14800,
  4485,
  14720,
  4411,
  14638,
  4325,
  14556,
  4231,
  14475,
  4136,
  14395,
  3988,
  14297,
  3803,
  14145,
  3628,
  13999,
  3465,
  13861,
  3314,
  13729,
  3177,
  15360,
  263,
  15360,
  264,
  15360,
  272,
  15360,
  325,
  15359,
  407,
  15358,
  548,
  15356,
  780,
  15352,
  1144,
  15347,
  1580,
  15339,
  2099,
  15328,
  2425,
  15312,
  2795,
  15292,
  3133,
  15264,
  3329,
  15232,
  3517,
  15191,
  3689,
  15143,
  3819,
  15088,
  3923,
  15025,
  3978,
  14956,
  3999,
  14882,
  3979,
  14804,
  3931,
  14722,
  3855,
  14639,
  3756,
  14554,
  3645,
  14470,
  3529,
  14388,
  3409,
  14279,
  3289,
  14124,
  3173,
  13975,
  3055,
  13834,
  2848,
  13701,
  2658,
  15360,
  49,
  15360,
  49,
  15360,
  52,
  15360,
  75,
  15359,
  111,
  15358,
  201,
  15356,
  283,
  15353,
  519,
  15348,
  726,
  15340,
  1045,
  15329,
  1415,
  15314,
  1795,
  15295,
  2173,
  15269,
  2410,
  15237,
  2649,
  15197,
  2866,
  15150,
  3054,
  15095,
  3140,
  15032,
  3196,
  14963,
  3228,
  14888,
  3236,
  14808,
  3224,
  14725,
  3191,
  14639,
  3146,
  14553,
  3088,
  14466,
  2976,
  14382,
  2836,
  14262,
  2692,
  14103,
  2549,
  13952,
  2409,
  13808,
  2278,
  13674,
  2154,
  15360,
  4,
  15360,
  4,
  15360,
  4,
  15360,
  13,
  15359,
  33,
  15358,
  59,
  15357,
  112,
  15353,
  199,
  15348,
  302,
  15341,
  456,
  15331,
  628,
  15316,
  827,
  15297,
  1082,
  15272,
  1332,
  15241,
  1601,
  15202,
  1851,
  15156,
  2069,
  15101,
  2172,
  15039,
  2256,
  14970,
  2314,
  14894,
  2348,
  14813,
  2358,
  14728,
  2344,
  14640,
  2311,
  14551,
  2263,
  14463,
  2203,
  14376,
  2133,
  14247,
  2059,
  14084,
  1915,
  13930,
  1761,
  13784,
  1609,
  13648,
  1464,
  15360,
  0,
  15360,
  0,
  15360,
  0,
  15360,
  3,
  15359,
  18,
  15358,
  26,
  15357,
  53,
  15354,
  80,
  15348,
  97,
  15341,
  165,
  15332,
  238,
  15318,
  326,
  15299,
  427,
  15275,
  529,
  15245,
  654,
  15207,
  771,
  15161,
  885,
  15108,
  994,
  15046,
  1089,
  14976,
  1170,
  14900,
  1229,
  14817,
  1266,
  14731,
  1284,
  14641,
  1282,
  14550,
  1260,
  14460,
  1223,
  14370,
  1174,
  14232,
  1116,
  14066,
  1050,
  13909,
  981,
  13761,
  910,
  13623,
  839
]);
let _n = null;
function Lh() {
  return _n === null && (_n = new Il(Dh, 32, 32, 1030, 1016), _n.minFilter = 1006, _n.magFilter = 1006, _n.wrapS = 1001, _n.wrapT = 1001, _n.generateMipmaps = !1, _n.needsUpdate = !0), _n;
}
class Uh {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer~Options} [parameters] - The configuration parameter.
   */
  constructor(e = {}) {
    const {
      canvas: t = sl(),
      context: i = null,
      depth: r = !0,
      stencil: s = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: d = "default",
      failIfMajorPerformanceCaveat: u = !1,
      reversedDepthBuffer: f = !1
    } = e;
    this.isWebGLRenderer = !0;
    let p;
    if (i !== null) {
      if (typeof WebGLRenderingContext < "u" && i instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      p = i.getContextAttributes().alpha;
    } else
      p = a;
    const x = /* @__PURE__ */ new Set([
      1033,
      1031,
      1029
    ]), v = /* @__PURE__ */ new Set([
      1009,
      1014,
      1012,
      1020,
      1017,
      1018
    ]), m = new Uint32Array(4), h = new Int32Array(4);
    let T = null, E = null;
    const A = [], D = [];
    this.domElement = t, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled.
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const y = this;
    let P = !1;
    this._outputColorSpace = Ft;
    let O = 0, M = 0, S = null, L = -1, z = null;
    const H = new _t(), q = new _t();
    let K = null;
    const Y = new Qe(0);
    let te = 0, W = t.width, Q = t.height, re = 1, Me = null, ke = null;
    const et = new _t(0, 0, W, Q), je = new _t(0, 0, W, Q);
    let st = !1;
    const V = new po();
    let X = !1, ne = !1;
    const Se = new bt(), ue = new G(), Ne = new _t(), xt = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let Ve = !1;
    function at() {
      return S === null ? re : 1;
    }
    let w = i;
    function He(_, U) {
      return t.getContext(_, U);
    }
    try {
      const _ = {
        alpha: !0,
        depth: r,
        stencil: s,
        antialias: o,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: d,
        failIfMajorPerformanceCaveat: u
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r181"), t.addEventListener("webglcontextlost", ee, !1), t.addEventListener("webglcontextrestored", Z, !1), t.addEventListener("webglcontextcreationerror", xe, !1), w === null) {
        const U = "webgl2";
        if (w = He(U, _), w === null)
          throw He(U) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (_) {
      throw _("WebGLRenderer: " + _.message), _;
    }
    let We, lt, _e, ut, Te, Fe, b, g, F, $, j, k, be, ce, Ae, ve, J, se, Pe, Ce, he, Ue, C, de;
    function ae() {
      We = new Gu(w), We.init(), Ue = new yh(w, We), lt = new Du(w, We, e, Ue), _e = new Mh(w, We), lt.reversedDepthBuffer && f && _e.buffers.depth.setReversed(!0), ut = new Hu(w), Te = new lh(), Fe = new bh(w, We, _e, Te, lt, Ue, ut), b = new Uu(y), g = new zu(y), F = new Yl(w), C = new Ru(w, F), $ = new Vu(w, F, ut, C), j = new Xu(w, $, F, ut), Pe = new Wu(w, lt, Fe), ve = new Lu(Te), k = new oh(y, b, g, We, lt, C, ve), be = new Rh(y, Te), ce = new dh(), Ae = new xh(We), se = new Cu(y, b, g, _e, j, p, l), J = new vh(y, j, lt), de = new Ph(w, ut, lt, _e), Ce = new Pu(w, We, ut), he = new ku(w, We, ut), ut.programs = k.programs, y.capabilities = lt, y.extensions = We, y.properties = Te, y.renderLists = ce, y.shadowMap = J, y.state = _e, y.info = ut;
    }
    ae();
    const oe = new wh(y, w);
    this.xr = oe, this.getContext = function() {
      return w;
    }, this.getContextAttributes = function() {
      return w.getContextAttributes();
    }, this.forceContextLoss = function() {
      const _ = We.get("WEBGL_lose_context");
      _ && _.loseContext();
    }, this.forceContextRestore = function() {
      const _ = We.get("WEBGL_lose_context");
      _ && _.restoreContext();
    }, this.getPixelRatio = function() {
      return re;
    }, this.setPixelRatio = function(_) {
      _ !== void 0 && (re = _, this.setSize(W, Q, !1));
    }, this.getSize = function(_) {
      return _.set(W, Q);
    }, this.setSize = function(_, U, N = !0) {
      if (oe.isPresenting) {
        Oe("WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      W = _, Q = U, t.width = Math.floor(_ * re), t.height = Math.floor(U * re), N === !0 && (t.style.width = _ + "px", t.style.height = U + "px"), this.setViewport(0, 0, _, U);
    }, this.getDrawingBufferSize = function(_) {
      return _.set(W * re, Q * re).floor();
    }, this.setDrawingBufferSize = function(_, U, N) {
      W = _, Q = U, re = N, t.width = Math.floor(_ * N), t.height = Math.floor(U * N), this.setViewport(0, 0, _, U);
    }, this.getCurrentViewport = function(_) {
      return _.copy(H);
    }, this.getViewport = function(_) {
      return _.copy(et);
    }, this.setViewport = function(_, U, N, B) {
      _.isVector4 ? et.set(_.x, _.y, _.z, _.w) : et.set(_, U, N, B), _e.viewport(H.copy(et).multiplyScalar(re).round());
    }, this.getScissor = function(_) {
      return _.copy(je);
    }, this.setScissor = function(_, U, N, B) {
      _.isVector4 ? je.set(_.x, _.y, _.z, _.w) : je.set(_, U, N, B), _e.scissor(q.copy(je).multiplyScalar(re).round());
    }, this.getScissorTest = function() {
      return st;
    }, this.setScissorTest = function(_) {
      _e.setScissorTest(st = _);
    }, this.setOpaqueSort = function(_) {
      Me = _;
    }, this.setTransparentSort = function(_) {
      ke = _;
    }, this.getClearColor = function(_) {
      return _.copy(se.getClearColor());
    }, this.setClearColor = function() {
      se.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return se.getClearAlpha();
    }, this.setClearAlpha = function() {
      se.setClearAlpha(...arguments);
    }, this.clear = function(_ = !0, U = !0, N = !0) {
      let B = 0;
      if (_) {
        let I = !1;
        if (S !== null) {
          const ie = S.texture.format;
          I = x.has(ie);
        }
        if (I) {
          const ie = S.texture.type, fe = v.has(ie), ge = se.getClearColor(), me = se.getClearAlpha(), Re = ge.r, Le = ge.g, Ee = ge.b;
          fe ? (m[0] = Re, m[1] = Le, m[2] = Ee, m[3] = me, w.clearBufferuiv(w.COLOR, 0, m)) : (h[0] = Re, h[1] = Le, h[2] = Ee, h[3] = me, w.clearBufferiv(w.COLOR, 0, h));
        } else
          B |= w.COLOR_BUFFER_BIT;
      }
      U && (B |= w.DEPTH_BUFFER_BIT), N && (B |= w.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), w.clear(B);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", ee, !1), t.removeEventListener("webglcontextrestored", Z, !1), t.removeEventListener("webglcontextcreationerror", xe, !1), se.dispose(), ce.dispose(), Ae.dispose(), Te.dispose(), b.dispose(), g.dispose(), j.dispose(), C.dispose(), de.dispose(), k.dispose(), oe.dispose(), oe.removeEventListener("sessionstart", Zs), oe.removeEventListener("sessionend", js), Un.stop();
    };
    function ee(_) {
      _.preventDefault(), sa("WebGLRenderer: Context Lost."), P = !0;
    }
    function Z() {
      sa("WebGLRenderer: Context Restored."), P = !1;
      const _ = ut.autoReset, U = J.enabled, N = J.autoUpdate, B = J.needsUpdate, I = J.type;
      ae(), ut.autoReset = _, J.enabled = U, J.autoUpdate = N, J.needsUpdate = B, J.type = I;
    }
    function xe(_) {
      gt("WebGLRenderer: A WebGL context could not be created. Reason: ", _.statusMessage);
    }
    function Ie(_) {
      const U = _.target;
      U.removeEventListener("dispose", Ie), ct(U);
    }
    function ct(_) {
      tt(_), Te.remove(_);
    }
    function tt(_) {
      const U = Te.get(_).programs;
      U !== void 0 && (U.forEach(function(N) {
        k.releaseProgram(N);
      }), _.isShaderMaterial && k.releaseShaderCache(_));
    }
    this.renderBufferDirect = function(_, U, N, B, I, ie) {
      U === null && (U = xt);
      const fe = I.isMesh && I.matrixWorld.determinant() < 0, ge = Qo(_, U, N, B, I);
      _e.setMaterial(B, fe);
      let me = N.index, Re = 1;
      if (B.wireframe === !0) {
        if (me = $.getWireframeAttribute(N), me === void 0) return;
        Re = 2;
      }
      const Le = N.drawRange, Ee = N.attributes.position;
      let Xe = Le.start * Re, nt = (Le.start + Le.count) * Re;
      ie !== null && (Xe = Math.max(Xe, ie.start * Re), nt = Math.min(nt, (ie.start + ie.count) * Re)), me !== null ? (Xe = Math.max(Xe, 0), nt = Math.min(nt, me.count)) : Ee != null && (Xe = Math.max(Xe, 0), nt = Math.min(nt, Ee.count));
      const pt = nt - Xe;
      if (pt < 0 || pt === 1 / 0) return;
      C.setup(I, B, ge, N, me);
      let mt, ot = Ce;
      if (me !== null && (mt = F.get(me), ot = he, ot.setIndex(mt)), I.isMesh)
        B.wireframe === !0 ? (_e.setLineWidth(B.wireframeLinewidth * at()), ot.setMode(w.LINES)) : ot.setMode(w.TRIANGLES);
      else if (I.isLine) {
        let we = B.linewidth;
        we === void 0 && (we = 1), _e.setLineWidth(we * at()), I.isLineSegments ? ot.setMode(w.LINES) : I.isLineLoop ? ot.setMode(w.LINE_LOOP) : ot.setMode(w.LINE_STRIP);
      } else I.isPoints ? ot.setMode(w.POINTS) : I.isSprite && ot.setMode(w.TRIANGLES);
      if (I.isBatchedMesh)
        if (I._multiDrawInstances !== null)
          Hi("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."), ot.renderMultiDrawInstances(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount, I._multiDrawInstances);
        else if (We.get("WEBGL_multi_draw"))
          ot.renderMultiDraw(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount);
        else {
          const we = I._multiDrawStarts, ft = I._multiDrawCounts, Ke = I._multiDrawCount, zt = me ? F.get(me).bytesPerElement : 1, Qn = Te.get(B).currentProgram.getUniforms();
          for (let Gt = 0; Gt < Ke; Gt++)
            Qn.setValue(w, "_gl_DrawID", Gt), ot.render(we[Gt] / zt, ft[Gt]);
        }
      else if (I.isInstancedMesh)
        ot.renderInstances(Xe, pt, I.count);
      else if (N.isInstancedBufferGeometry) {
        const we = N._maxInstanceCount !== void 0 ? N._maxInstanceCount : 1 / 0, ft = Math.min(N.instanceCount, we);
        ot.renderInstances(Xe, pt, ft);
      } else
        ot.render(Xe, pt);
    };
    function an(_, U, N) {
      _.transparent === !0 && _.side === 2 && _.forceSinglePass === !1 ? (_.side = 1, _.needsUpdate = !0, ji(_, U, N), _.side = 0, _.needsUpdate = !0, ji(_, U, N), _.side = 2) : ji(_, U, N);
    }
    this.compile = function(_, U, N = null) {
      N === null && (N = _), E = Ae.get(N), E.init(U), D.push(E), N.traverseVisible(function(I) {
        I.isLight && I.layers.test(U.layers) && (E.pushLight(I), I.castShadow && E.pushShadow(I));
      }), _ !== N && _.traverseVisible(function(I) {
        I.isLight && I.layers.test(U.layers) && (E.pushLight(I), I.castShadow && E.pushShadow(I));
      }), E.setupLights();
      const B = /* @__PURE__ */ new Set();
      return _.traverse(function(I) {
        if (!(I.isMesh || I.isPoints || I.isLine || I.isSprite))
          return;
        const ie = I.material;
        if (ie)
          if (Array.isArray(ie))
            for (let fe = 0; fe < ie.length; fe++) {
              const ge = ie[fe];
              an(ge, N, I), B.add(ge);
            }
          else
            an(ie, N, I), B.add(ie);
      }), E = D.pop(), B;
    }, this.compileAsync = function(_, U, N = null) {
      const B = this.compile(_, U, N);
      return new Promise((I) => {
        function ie() {
          if (B.forEach(function(fe) {
            Te.get(fe).currentProgram.isReady() && B.delete(fe);
          }), B.size === 0) {
            I(_);
            return;
          }
          setTimeout(ie, 10);
        }
        We.get("KHR_parallel_shader_compile") !== null ? ie() : setTimeout(ie, 10);
      });
    };
    let Qt = null;
    function Jo(_) {
      Qt && Qt(_);
    }
    function Zs() {
      Un.stop();
    }
    function js() {
      Un.start();
    }
    const Un = new _o();
    Un.setAnimationLoop(Jo), typeof self < "u" && Un.setContext(self), this.setAnimationLoop = function(_) {
      Qt = _, oe.setAnimationLoop(_), _ === null ? Un.stop() : Un.start();
    }, oe.addEventListener("sessionstart", Zs), oe.addEventListener("sessionend", js), this.render = function(_, U) {
      if (U !== void 0 && U.isCamera !== !0) {
        gt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (P === !0) return;
      if (_.matrixWorldAutoUpdate === !0 && _.updateMatrixWorld(), U.parent === null && U.matrixWorldAutoUpdate === !0 && U.updateMatrixWorld(), oe.enabled === !0 && oe.isPresenting === !0 && (oe.cameraAutoUpdate === !0 && oe.updateCamera(U), U = oe.getCamera()), _.isScene === !0 && _.onBeforeRender(y, _, U, S), E = Ae.get(_, D.length), E.init(U), D.push(E), Se.multiplyMatrices(U.projectionMatrix, U.matrixWorldInverse), V.setFromProjectionMatrix(Se, 2e3, U.reversedDepth), ne = this.localClippingEnabled, X = ve.init(this.clippingPlanes, ne), T = ce.get(_, A.length), T.init(), A.push(T), oe.enabled === !0 && oe.isPresenting === !0) {
        const ie = y.xr.getDepthSensingMesh();
        ie !== null && Or(ie, U, -1 / 0, y.sortObjects);
      }
      Or(_, U, 0, y.sortObjects), T.finish(), y.sortObjects === !0 && T.sort(Me, ke), Ve = oe.enabled === !1 || oe.isPresenting === !1 || oe.hasDepthSensing() === !1, Ve && se.addToRenderList(T, _), this.info.render.frame++, X === !0 && ve.beginShadows();
      const N = E.state.shadowsArray;
      J.render(N, _, U), X === !0 && ve.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const B = T.opaque, I = T.transmissive;
      if (E.setupLights(), U.isArrayCamera) {
        const ie = U.cameras;
        if (I.length > 0)
          for (let fe = 0, ge = ie.length; fe < ge; fe++) {
            const me = ie[fe];
            Qs(B, I, _, me);
          }
        Ve && se.render(_);
        for (let fe = 0, ge = ie.length; fe < ge; fe++) {
          const me = ie[fe];
          Js(T, _, me, me.viewport);
        }
      } else
        I.length > 0 && Qs(B, I, _, U), Ve && se.render(_), Js(T, _, U);
      S !== null && M === 0 && (Fe.updateMultisampleRenderTarget(S), Fe.updateRenderTargetMipmap(S)), _.isScene === !0 && _.onAfterRender(y, _, U), C.resetDefaultState(), L = -1, z = null, D.pop(), D.length > 0 ? (E = D[D.length - 1], X === !0 && ve.setGlobalState(y.clippingPlanes, E.state.camera)) : E = null, A.pop(), A.length > 0 ? T = A[A.length - 1] : T = null;
    };
    function Or(_, U, N, B) {
      if (_.visible === !1) return;
      if (_.layers.test(U.layers)) {
        if (_.isGroup)
          N = _.renderOrder;
        else if (_.isLOD)
          _.autoUpdate === !0 && _.update(U);
        else if (_.isLight)
          E.pushLight(_), _.castShadow && E.pushShadow(_);
        else if (_.isSprite) {
          if (!_.frustumCulled || V.intersectsSprite(_)) {
            B && Ne.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Se);
            const fe = j.update(_), ge = _.material;
            ge.visible && T.push(_, fe, ge, N, Ne.z, null);
          }
        } else if ((_.isMesh || _.isLine || _.isPoints) && (!_.frustumCulled || V.intersectsObject(_))) {
          const fe = j.update(_), ge = _.material;
          if (B && (_.boundingSphere !== void 0 ? (_.boundingSphere === null && _.computeBoundingSphere(), Ne.copy(_.boundingSphere.center)) : (fe.boundingSphere === null && fe.computeBoundingSphere(), Ne.copy(fe.boundingSphere.center)), Ne.applyMatrix4(_.matrixWorld).applyMatrix4(Se)), Array.isArray(ge)) {
            const me = fe.groups;
            for (let Re = 0, Le = me.length; Re < Le; Re++) {
              const Ee = me[Re], Xe = ge[Ee.materialIndex];
              Xe && Xe.visible && T.push(_, fe, Xe, N, Ne.z, Ee);
            }
          } else ge.visible && T.push(_, fe, ge, N, Ne.z, null);
        }
      }
      const ie = _.children;
      for (let fe = 0, ge = ie.length; fe < ge; fe++)
        Or(ie[fe], U, N, B);
    }
    function Js(_, U, N, B) {
      const { opaque: I, transmissive: ie, transparent: fe } = _;
      E.setupLightsView(N), X === !0 && ve.setGlobalState(y.clippingPlanes, N), B && _e.viewport(H.copy(B)), I.length > 0 && Zi(I, U, N), ie.length > 0 && Zi(ie, U, N), fe.length > 0 && Zi(fe, U, N), _e.buffers.depth.setTest(!0), _e.buffers.depth.setMask(!0), _e.buffers.color.setMask(!0), _e.setPolygonOffset(!1);
    }
    function Qs(_, U, N, B) {
      if ((N.isScene === !0 ? N.overrideMaterial : null) !== null)
        return;
      E.state.transmissionRenderTarget[B.id] === void 0 && (E.state.transmissionRenderTarget[B.id] = new jn(1, 1, {
        generateMipmaps: !0,
        type: We.has("EXT_color_buffer_half_float") || We.has("EXT_color_buffer_float") ? 1016 : 1009,
        minFilter: 1008,
        samples: 4,
        stencilBuffer: s,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: Ze.workingColorSpace
      }));
      const ie = E.state.transmissionRenderTarget[B.id], fe = B.viewport || H;
      ie.setSize(fe.z * y.transmissionResolutionScale, fe.w * y.transmissionResolutionScale);
      const ge = y.getRenderTarget(), me = y.getActiveCubeFace(), Re = y.getActiveMipmapLevel();
      y.setRenderTarget(ie), y.getClearColor(Y), te = y.getClearAlpha(), te < 1 && y.setClearColor(16777215, 0.5), y.clear(), Ve && se.render(N);
      const Le = y.toneMapping;
      y.toneMapping = 0;
      const Ee = B.viewport;
      if (B.viewport !== void 0 && (B.viewport = void 0), E.setupLightsView(B), X === !0 && ve.setGlobalState(y.clippingPlanes, B), Zi(_, N, B), Fe.updateMultisampleRenderTarget(ie), Fe.updateRenderTargetMipmap(ie), We.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Xe = !1;
        for (let nt = 0, pt = U.length; nt < pt; nt++) {
          const mt = U[nt], { object: ot, geometry: we, material: ft, group: Ke } = mt;
          if (ft.side === 2 && ot.layers.test(B.layers)) {
            const zt = ft.side;
            ft.side = 1, ft.needsUpdate = !0, ea(ot, N, B, we, ft, Ke), ft.side = zt, ft.needsUpdate = !0, Xe = !0;
          }
        }
        Xe === !0 && (Fe.updateMultisampleRenderTarget(ie), Fe.updateRenderTargetMipmap(ie));
      }
      y.setRenderTarget(ge, me, Re), y.setClearColor(Y, te), Ee !== void 0 && (B.viewport = Ee), y.toneMapping = Le;
    }
    function Zi(_, U, N) {
      const B = U.isScene === !0 ? U.overrideMaterial : null;
      for (let I = 0, ie = _.length; I < ie; I++) {
        const fe = _[I], { object: ge, geometry: me, group: Re } = fe;
        let Le = fe.material;
        Le.allowOverride === !0 && B !== null && (Le = B), ge.layers.test(N.layers) && ea(ge, U, N, me, Le, Re);
      }
    }
    function ea(_, U, N, B, I, ie) {
      _.onBeforeRender(y, U, N, B, I, ie), _.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse, _.matrixWorld), _.normalMatrix.getNormalMatrix(_.modelViewMatrix), I.onBeforeRender(y, U, N, B, _, ie), I.transparent === !0 && I.side === 2 && I.forceSinglePass === !1 ? (I.side = 1, I.needsUpdate = !0, y.renderBufferDirect(N, U, B, I, _, ie), I.side = 0, I.needsUpdate = !0, y.renderBufferDirect(N, U, B, I, _, ie), I.side = 2) : y.renderBufferDirect(N, U, B, I, _, ie), _.onAfterRender(y, U, N, B, I, ie);
    }
    function ji(_, U, N) {
      U.isScene !== !0 && (U = xt);
      const B = Te.get(_), I = E.state.lights, ie = E.state.shadowsArray, fe = I.state.version, ge = k.getParameters(_, I.state, ie, U, N), me = k.getProgramCacheKey(ge);
      let Re = B.programs;
      B.environment = _.isMeshStandardMaterial ? U.environment : null, B.fog = U.fog, B.envMap = (_.isMeshStandardMaterial ? g : b).get(_.envMap || B.environment), B.envMapRotation = B.environment !== null && _.envMap === null ? U.environmentRotation : _.envMapRotation, Re === void 0 && (_.addEventListener("dispose", Ie), Re = /* @__PURE__ */ new Map(), B.programs = Re);
      let Le = Re.get(me);
      if (Le !== void 0) {
        if (B.currentProgram === Le && B.lightsStateVersion === fe)
          return na(_, ge), Le;
      } else
        ge.uniforms = k.getUniforms(_), _.onBeforeCompile(ge, y), Le = k.acquireProgram(ge, me), Re.set(me, Le), B.uniforms = ge.uniforms;
      const Ee = B.uniforms;
      return (!_.isShaderMaterial && !_.isRawShaderMaterial || _.clipping === !0) && (Ee.clippingPlanes = ve.uniform), na(_, ge), B.needsLights = tl(_), B.lightsStateVersion = fe, B.needsLights && (Ee.ambientLightColor.value = I.state.ambient, Ee.lightProbe.value = I.state.probe, Ee.directionalLights.value = I.state.directional, Ee.directionalLightShadows.value = I.state.directionalShadow, Ee.spotLights.value = I.state.spot, Ee.spotLightShadows.value = I.state.spotShadow, Ee.rectAreaLights.value = I.state.rectArea, Ee.ltc_1.value = I.state.rectAreaLTC1, Ee.ltc_2.value = I.state.rectAreaLTC2, Ee.pointLights.value = I.state.point, Ee.pointLightShadows.value = I.state.pointShadow, Ee.hemisphereLights.value = I.state.hemi, Ee.directionalShadowMap.value = I.state.directionalShadowMap, Ee.directionalShadowMatrix.value = I.state.directionalShadowMatrix, Ee.spotShadowMap.value = I.state.spotShadowMap, Ee.spotLightMatrix.value = I.state.spotLightMatrix, Ee.spotLightMap.value = I.state.spotLightMap, Ee.pointShadowMap.value = I.state.pointShadowMap, Ee.pointShadowMatrix.value = I.state.pointShadowMatrix), B.currentProgram = Le, B.uniformsList = null, Le;
    }
    function ta(_) {
      if (_.uniformsList === null) {
        const U = _.currentProgram.getUniforms();
        _.uniformsList = gr.seqWithValue(U.seq, _.uniforms);
      }
      return _.uniformsList;
    }
    function na(_, U) {
      const N = Te.get(_);
      N.outputColorSpace = U.outputColorSpace, N.batching = U.batching, N.batchingColor = U.batchingColor, N.instancing = U.instancing, N.instancingColor = U.instancingColor, N.instancingMorph = U.instancingMorph, N.skinning = U.skinning, N.morphTargets = U.morphTargets, N.morphNormals = U.morphNormals, N.morphColors = U.morphColors, N.morphTargetsCount = U.morphTargetsCount, N.numClippingPlanes = U.numClippingPlanes, N.numIntersection = U.numClipIntersection, N.vertexAlphas = U.vertexAlphas, N.vertexTangents = U.vertexTangents, N.toneMapping = U.toneMapping;
    }
    function Qo(_, U, N, B, I) {
      U.isScene !== !0 && (U = xt), Fe.resetTextureUnits();
      const ie = U.fog, fe = B.isMeshStandardMaterial ? U.environment : null, ge = S === null ? y.outputColorSpace : S.isXRRenderTarget === !0 ? S.texture.colorSpace : Si, me = (B.isMeshStandardMaterial ? g : b).get(B.envMap || fe), Re = B.vertexColors === !0 && !!N.attributes.color && N.attributes.color.itemSize === 4, Le = !!N.attributes.tangent && (!!B.normalMap || B.anisotropy > 0), Ee = !!N.morphAttributes.position, Xe = !!N.morphAttributes.normal, nt = !!N.morphAttributes.color;
      let pt = 0;
      B.toneMapped && (S === null || S.isXRRenderTarget === !0) && (pt = y.toneMapping);
      const mt = N.morphAttributes.position || N.morphAttributes.normal || N.morphAttributes.color, ot = mt !== void 0 ? mt.length : 0, we = Te.get(B), ft = E.state.lights;
      if (X === !0 && (ne === !0 || _ !== z)) {
        const Ut = _ === z && B.id === L;
        ve.setState(B, _, Ut);
      }
      let Ke = !1;
      B.version === we.__version ? (we.needsLights && we.lightsStateVersion !== ft.state.version || we.outputColorSpace !== ge || I.isBatchedMesh && we.batching === !1 || !I.isBatchedMesh && we.batching === !0 || I.isBatchedMesh && we.batchingColor === !0 && I.colorTexture === null || I.isBatchedMesh && we.batchingColor === !1 && I.colorTexture !== null || I.isInstancedMesh && we.instancing === !1 || !I.isInstancedMesh && we.instancing === !0 || I.isSkinnedMesh && we.skinning === !1 || !I.isSkinnedMesh && we.skinning === !0 || I.isInstancedMesh && we.instancingColor === !0 && I.instanceColor === null || I.isInstancedMesh && we.instancingColor === !1 && I.instanceColor !== null || I.isInstancedMesh && we.instancingMorph === !0 && I.morphTexture === null || I.isInstancedMesh && we.instancingMorph === !1 && I.morphTexture !== null || we.envMap !== me || B.fog === !0 && we.fog !== ie || we.numClippingPlanes !== void 0 && (we.numClippingPlanes !== ve.numPlanes || we.numIntersection !== ve.numIntersection) || we.vertexAlphas !== Re || we.vertexTangents !== Le || we.morphTargets !== Ee || we.morphNormals !== Xe || we.morphColors !== nt || we.toneMapping !== pt || we.morphTargetsCount !== ot) && (Ke = !0) : (Ke = !0, we.__version = B.version);
      let zt = we.currentProgram;
      Ke === !0 && (zt = ji(B, U, I));
      let Qn = !1, Gt = !1, Ai = !1;
      const ht = zt.getUniforms(), Nt = we.uniforms;
      if (_e.useProgram(zt.program) && (Qn = !0, Gt = !0, Ai = !0), B.id !== L && (L = B.id, Gt = !0), Qn || z !== _) {
        _e.buffers.depth.getReversed() && _.reversedDepth !== !0 && (_._reversedDepth = !0, _.updateProjectionMatrix()), ht.setValue(w, "projectionMatrix", _.projectionMatrix), ht.setValue(w, "viewMatrix", _.matrixWorldInverse);
        const Ot = ht.map.cameraPosition;
        Ot !== void 0 && Ot.setValue(w, ue.setFromMatrixPosition(_.matrixWorld)), lt.logarithmicDepthBuffer && ht.setValue(
          w,
          "logDepthBufFC",
          2 / (Math.log(_.far + 1) / Math.LN2)
        ), (B.isMeshPhongMaterial || B.isMeshToonMaterial || B.isMeshLambertMaterial || B.isMeshBasicMaterial || B.isMeshStandardMaterial || B.isShaderMaterial) && ht.setValue(w, "isOrthographic", _.isOrthographicCamera === !0), z !== _ && (z = _, Gt = !0, Ai = !0);
      }
      if (I.isSkinnedMesh) {
        ht.setOptional(w, I, "bindMatrix"), ht.setOptional(w, I, "bindMatrixInverse");
        const Ut = I.skeleton;
        Ut && (Ut.boneTexture === null && Ut.computeBoneTexture(), ht.setValue(w, "boneTexture", Ut.boneTexture, Fe));
      }
      I.isBatchedMesh && (ht.setOptional(w, I, "batchingTexture"), ht.setValue(w, "batchingTexture", I._matricesTexture, Fe), ht.setOptional(w, I, "batchingIdTexture"), ht.setValue(w, "batchingIdTexture", I._indirectTexture, Fe), ht.setOptional(w, I, "batchingColorTexture"), I._colorsTexture !== null && ht.setValue(w, "batchingColorTexture", I._colorsTexture, Fe));
      const Yt = N.morphAttributes;
      if ((Yt.position !== void 0 || Yt.normal !== void 0 || Yt.color !== void 0) && Pe.update(I, N, zt), (Gt || we.receiveShadow !== I.receiveShadow) && (we.receiveShadow = I.receiveShadow, ht.setValue(w, "receiveShadow", I.receiveShadow)), B.isMeshGouraudMaterial && B.envMap !== null && (Nt.envMap.value = me, Nt.flipEnvMap.value = me.isCubeTexture && me.isRenderTargetTexture === !1 ? -1 : 1), B.isMeshStandardMaterial && B.envMap === null && U.environment !== null && (Nt.envMapIntensity.value = U.environmentIntensity), Nt.dfgLUT !== void 0 && (Nt.dfgLUT.value = Lh()), Gt && (ht.setValue(w, "toneMappingExposure", y.toneMappingExposure), we.needsLights && el(Nt, Ai), ie && B.fog === !0 && be.refreshFogUniforms(Nt, ie), be.refreshMaterialUniforms(Nt, B, re, Q, E.state.transmissionRenderTarget[_.id]), gr.upload(w, ta(we), Nt, Fe)), B.isShaderMaterial && B.uniformsNeedUpdate === !0 && (gr.upload(w, ta(we), Nt, Fe), B.uniformsNeedUpdate = !1), B.isSpriteMaterial && ht.setValue(w, "center", I.center), ht.setValue(w, "modelViewMatrix", I.modelViewMatrix), ht.setValue(w, "normalMatrix", I.normalMatrix), ht.setValue(w, "modelMatrix", I.matrixWorld), B.isShaderMaterial || B.isRawShaderMaterial) {
        const Ut = B.uniformsGroups;
        for (let Ot = 0, Br = Ut.length; Ot < Br; Ot++) {
          const In = Ut[Ot];
          de.update(In, zt), de.bind(In, zt);
        }
      }
      return zt;
    }
    function el(_, U) {
      _.ambientLightColor.needsUpdate = U, _.lightProbe.needsUpdate = U, _.directionalLights.needsUpdate = U, _.directionalLightShadows.needsUpdate = U, _.pointLights.needsUpdate = U, _.pointLightShadows.needsUpdate = U, _.spotLights.needsUpdate = U, _.spotLightShadows.needsUpdate = U, _.rectAreaLights.needsUpdate = U, _.hemisphereLights.needsUpdate = U;
    }
    function tl(_) {
      return _.isMeshLambertMaterial || _.isMeshToonMaterial || _.isMeshPhongMaterial || _.isMeshStandardMaterial || _.isShadowMaterial || _.isShaderMaterial && _.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return O;
    }, this.getActiveMipmapLevel = function() {
      return M;
    }, this.getRenderTarget = function() {
      return S;
    }, this.setRenderTargetTextures = function(_, U, N) {
      const B = Te.get(_);
      B.__autoAllocateDepthBuffer = _.resolveDepthBuffer === !1, B.__autoAllocateDepthBuffer === !1 && (B.__useRenderToTexture = !1), Te.get(_.texture).__webglTexture = U, Te.get(_.depthTexture).__webglTexture = B.__autoAllocateDepthBuffer ? void 0 : N, B.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(_, U) {
      const N = Te.get(_);
      N.__webglFramebuffer = U, N.__useDefaultFramebuffer = U === void 0;
    };
    const nl = w.createFramebuffer();
    this.setRenderTarget = function(_, U = 0, N = 0) {
      S = _, O = U, M = N;
      let B = !0, I = null, ie = !1, fe = !1;
      if (_) {
        const me = Te.get(_);
        if (me.__useDefaultFramebuffer !== void 0)
          _e.bindFramebuffer(w.FRAMEBUFFER, null), B = !1;
        else if (me.__webglFramebuffer === void 0)
          Fe.setupRenderTarget(_);
        else if (me.__hasExternalTextures)
          Fe.rebindTextures(_, Te.get(_.texture).__webglTexture, Te.get(_.depthTexture).__webglTexture);
        else if (_.depthBuffer) {
          const Ee = _.depthTexture;
          if (me.__boundDepthTexture !== Ee) {
            if (Ee !== null && Te.has(Ee) && (_.width !== Ee.image.width || _.height !== Ee.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            Fe.setupDepthRenderbuffer(_);
          }
        }
        const Re = _.texture;
        (Re.isData3DTexture || Re.isDataArrayTexture || Re.isCompressedArrayTexture) && (fe = !0);
        const Le = Te.get(_).__webglFramebuffer;
        _.isWebGLCubeRenderTarget ? (Array.isArray(Le[U]) ? I = Le[U][N] : I = Le[U], ie = !0) : _.samples > 0 && Fe.useMultisampledRTT(_) === !1 ? I = Te.get(_).__webglMultisampledFramebuffer : Array.isArray(Le) ? I = Le[N] : I = Le, H.copy(_.viewport), q.copy(_.scissor), K = _.scissorTest;
      } else
        H.copy(et).multiplyScalar(re).floor(), q.copy(je).multiplyScalar(re).floor(), K = st;
      if (N !== 0 && (I = nl), _e.bindFramebuffer(w.FRAMEBUFFER, I) && B && _e.drawBuffers(_, I), _e.viewport(H), _e.scissor(q), _e.setScissorTest(K), ie) {
        const me = Te.get(_.texture);
        w.framebufferTexture2D(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_CUBE_MAP_POSITIVE_X + U, me.__webglTexture, N);
      } else if (fe) {
        const me = U;
        for (let Re = 0; Re < _.textures.length; Re++) {
          const Le = Te.get(_.textures[Re]);
          w.framebufferTextureLayer(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0 + Re, Le.__webglTexture, N, me);
        }
      } else if (_ !== null && N !== 0) {
        const me = Te.get(_.texture);
        w.framebufferTexture2D(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_2D, me.__webglTexture, N);
      }
      L = -1;
    }, this.readRenderTargetPixels = function(_, U, N, B, I, ie, fe, ge = 0) {
      if (!(_ && _.isWebGLRenderTarget)) {
        gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let me = Te.get(_).__webglFramebuffer;
      if (_.isWebGLCubeRenderTarget && fe !== void 0 && (me = me[fe]), me) {
        _e.bindFramebuffer(w.FRAMEBUFFER, me);
        try {
          const Re = _.textures[ge], Le = Re.format, Ee = Re.type;
          if (!lt.textureFormatReadable(Le)) {
            gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!lt.textureTypeReadable(Ee)) {
            gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          U >= 0 && U <= _.width - B && N >= 0 && N <= _.height - I && (_.textures.length > 1 && w.readBuffer(w.COLOR_ATTACHMENT0 + ge), w.readPixels(U, N, B, I, Ue.convert(Le), Ue.convert(Ee), ie));
        } finally {
          const Re = S !== null ? Te.get(S).__webglFramebuffer : null;
          _e.bindFramebuffer(w.FRAMEBUFFER, Re);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(_, U, N, B, I, ie, fe, ge = 0) {
      if (!(_ && _.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let me = Te.get(_).__webglFramebuffer;
      if (_.isWebGLCubeRenderTarget && fe !== void 0 && (me = me[fe]), me)
        if (U >= 0 && U <= _.width - B && N >= 0 && N <= _.height - I) {
          _e.bindFramebuffer(w.FRAMEBUFFER, me);
          const Re = _.textures[ge], Le = Re.format, Ee = Re.type;
          if (!lt.textureFormatReadable(Le))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
          if (!lt.textureTypeReadable(Ee))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
          const Xe = w.createBuffer();
          w.bindBuffer(w.PIXEL_PACK_BUFFER, Xe), w.bufferData(w.PIXEL_PACK_BUFFER, ie.byteLength, w.STREAM_READ), _.textures.length > 1 && w.readBuffer(w.COLOR_ATTACHMENT0 + ge), w.readPixels(U, N, B, I, Ue.convert(Le), Ue.convert(Ee), 0);
          const nt = S !== null ? Te.get(S).__webglFramebuffer : null;
          _e.bindFramebuffer(w.FRAMEBUFFER, nt);
          const pt = w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return w.flush(), await al(w, pt, 4), w.bindBuffer(w.PIXEL_PACK_BUFFER, Xe), w.getBufferSubData(w.PIXEL_PACK_BUFFER, 0, ie), w.deleteBuffer(Xe), w.deleteSync(pt), ie;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(_, U = null, N = 0) {
      const B = Math.pow(2, -N), I = Math.floor(_.image.width * B), ie = Math.floor(_.image.height * B), fe = U !== null ? U.x : 0, ge = U !== null ? U.y : 0;
      Fe.setTexture2D(_, 0), w.copyTexSubImage2D(w.TEXTURE_2D, N, 0, 0, fe, ge, I, ie), _e.unbindTexture();
    };
    const il = w.createFramebuffer(), rl = w.createFramebuffer();
    this.copyTextureToTexture = function(_, U, N = null, B = null, I = 0, ie = null) {
      ie === null && (I !== 0 ? (Hi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."), ie = I, I = 0) : ie = 0);
      let fe, ge, me, Re, Le, Ee, Xe, nt, pt;
      const mt = _.isCompressedTexture ? _.mipmaps[ie] : _.image;
      if (N !== null)
        fe = N.max.x - N.min.x, ge = N.max.y - N.min.y, me = N.isBox3 ? N.max.z - N.min.z : 1, Re = N.min.x, Le = N.min.y, Ee = N.isBox3 ? N.min.z : 0;
      else {
        const Yt = Math.pow(2, -I);
        fe = Math.floor(mt.width * Yt), ge = Math.floor(mt.height * Yt), _.isDataArrayTexture ? me = mt.depth : _.isData3DTexture ? me = Math.floor(mt.depth * Yt) : me = 1, Re = 0, Le = 0, Ee = 0;
      }
      B !== null ? (Xe = B.x, nt = B.y, pt = B.z) : (Xe = 0, nt = 0, pt = 0);
      const ot = Ue.convert(U.format), we = Ue.convert(U.type);
      let ft;
      U.isData3DTexture ? (Fe.setTexture3D(U, 0), ft = w.TEXTURE_3D) : U.isDataArrayTexture || U.isCompressedArrayTexture ? (Fe.setTexture2DArray(U, 0), ft = w.TEXTURE_2D_ARRAY) : (Fe.setTexture2D(U, 0), ft = w.TEXTURE_2D), w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL, U.flipY), w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL, U.premultiplyAlpha), w.pixelStorei(w.UNPACK_ALIGNMENT, U.unpackAlignment);
      const Ke = w.getParameter(w.UNPACK_ROW_LENGTH), zt = w.getParameter(w.UNPACK_IMAGE_HEIGHT), Qn = w.getParameter(w.UNPACK_SKIP_PIXELS), Gt = w.getParameter(w.UNPACK_SKIP_ROWS), Ai = w.getParameter(w.UNPACK_SKIP_IMAGES);
      w.pixelStorei(w.UNPACK_ROW_LENGTH, mt.width), w.pixelStorei(w.UNPACK_IMAGE_HEIGHT, mt.height), w.pixelStorei(w.UNPACK_SKIP_PIXELS, Re), w.pixelStorei(w.UNPACK_SKIP_ROWS, Le), w.pixelStorei(w.UNPACK_SKIP_IMAGES, Ee);
      const ht = _.isDataArrayTexture || _.isData3DTexture, Nt = U.isDataArrayTexture || U.isData3DTexture;
      if (_.isDepthTexture) {
        const Yt = Te.get(_), Ut = Te.get(U), Ot = Te.get(Yt.__renderTarget), Br = Te.get(Ut.__renderTarget);
        _e.bindFramebuffer(w.READ_FRAMEBUFFER, Ot.__webglFramebuffer), _e.bindFramebuffer(w.DRAW_FRAMEBUFFER, Br.__webglFramebuffer);
        for (let In = 0; In < me; In++)
          ht && (w.framebufferTextureLayer(w.READ_FRAMEBUFFER, w.COLOR_ATTACHMENT0, Te.get(_).__webglTexture, I, Ee + In), w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER, w.COLOR_ATTACHMENT0, Te.get(U).__webglTexture, ie, pt + In)), w.blitFramebuffer(Re, Le, fe, ge, Xe, nt, fe, ge, w.DEPTH_BUFFER_BIT, w.NEAREST);
        _e.bindFramebuffer(w.READ_FRAMEBUFFER, null), _e.bindFramebuffer(w.DRAW_FRAMEBUFFER, null);
      } else if (I !== 0 || _.isRenderTargetTexture || Te.has(_)) {
        const Yt = Te.get(_), Ut = Te.get(U);
        _e.bindFramebuffer(w.READ_FRAMEBUFFER, il), _e.bindFramebuffer(w.DRAW_FRAMEBUFFER, rl);
        for (let Ot = 0; Ot < me; Ot++)
          ht ? w.framebufferTextureLayer(w.READ_FRAMEBUFFER, w.COLOR_ATTACHMENT0, Yt.__webglTexture, I, Ee + Ot) : w.framebufferTexture2D(w.READ_FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_2D, Yt.__webglTexture, I), Nt ? w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER, w.COLOR_ATTACHMENT0, Ut.__webglTexture, ie, pt + Ot) : w.framebufferTexture2D(w.DRAW_FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_2D, Ut.__webglTexture, ie), I !== 0 ? w.blitFramebuffer(Re, Le, fe, ge, Xe, nt, fe, ge, w.COLOR_BUFFER_BIT, w.NEAREST) : Nt ? w.copyTexSubImage3D(ft, ie, Xe, nt, pt + Ot, Re, Le, fe, ge) : w.copyTexSubImage2D(ft, ie, Xe, nt, Re, Le, fe, ge);
        _e.bindFramebuffer(w.READ_FRAMEBUFFER, null), _e.bindFramebuffer(w.DRAW_FRAMEBUFFER, null);
      } else
        Nt ? _.isDataTexture || _.isData3DTexture ? w.texSubImage3D(ft, ie, Xe, nt, pt, fe, ge, me, ot, we, mt.data) : U.isCompressedArrayTexture ? w.compressedTexSubImage3D(ft, ie, Xe, nt, pt, fe, ge, me, ot, mt.data) : w.texSubImage3D(ft, ie, Xe, nt, pt, fe, ge, me, ot, we, mt) : _.isDataTexture ? w.texSubImage2D(w.TEXTURE_2D, ie, Xe, nt, fe, ge, ot, we, mt.data) : _.isCompressedTexture ? w.compressedTexSubImage2D(w.TEXTURE_2D, ie, Xe, nt, mt.width, mt.height, ot, mt.data) : w.texSubImage2D(w.TEXTURE_2D, ie, Xe, nt, fe, ge, ot, we, mt);
      w.pixelStorei(w.UNPACK_ROW_LENGTH, Ke), w.pixelStorei(w.UNPACK_IMAGE_HEIGHT, zt), w.pixelStorei(w.UNPACK_SKIP_PIXELS, Qn), w.pixelStorei(w.UNPACK_SKIP_ROWS, Gt), w.pixelStorei(w.UNPACK_SKIP_IMAGES, Ai), ie === 0 && U.generateMipmaps && w.generateMipmap(ft), _e.unbindTexture();
    }, this.initRenderTarget = function(_) {
      Te.get(_).__webglFramebuffer === void 0 && Fe.setupRenderTarget(_);
    }, this.initTexture = function(_) {
      _.isCubeTexture ? Fe.setTextureCube(_, 0) : _.isData3DTexture ? Fe.setTexture3D(_, 0) : _.isDataArrayTexture || _.isCompressedArrayTexture ? Fe.setTexture2DArray(_, 0) : Fe.setTexture2D(_, 0), _e.unbindTexture();
    }, this.resetState = function() {
      O = 0, M = 0, S = null, _e.reset(), C.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  /**
   * Defines the coordinate system of the renderer.
   *
   * In `WebGLRenderer`, the value is always `WebGLCoordinateSystem`.
   *
   * @type {WebGLCoordinateSystem|WebGPUCoordinateSystem}
   * @default WebGLCoordinateSystem
   * @readonly
   */
  get coordinateSystem() {
    return 2e3;
  }
  /**
   * Defines the output color space of the renderer.
   *
   * @type {SRGBColorSpace|LinearSRGBColorSpace}
   * @default SRGBColorSpace
   */
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = Ze._getDrawingBufferColorSpace(e), t.unpackColorSpace = Ze._getUnpackColorSpace();
  }
}
const Ih = ["expanded", "compact"], Fh = ["expand", "collapse", "expand_collapse", "collapse_expand"], Nh = ["expanded", "compact", "both", "none"], Oh = ["linear", "easeInOutCubic", "easeOutCubic", "easeInCubic"], qa = /^[0-9]+(\.[0-9]+)?%?$/;
function jt(n, e, t) {
  for (const i of Object.keys(n))
    if (!e.has(i))
      throw new Error(`Unknown key ${JSON.stringify(i)} in ${t}`);
}
function Jt(n, e) {
  if (n === null || typeof n != "object" || Array.isArray(n))
    throw new Error(`${e} must be an object`);
  return n;
}
function Ct(n, e, { min: t, max: i, gt: r, lt: s } = {}) {
  if (typeof n != "number" || !Number.isFinite(n))
    throw new Error(`${e} must be a finite number`);
  if (t !== void 0 && n < t) throw new Error(`${e} must be >= ${t}`);
  if (i !== void 0 && n > i) throw new Error(`${e} must be <= ${i}`);
  if (r !== void 0 && n <= r) throw new Error(`${e} must be > ${r}`);
  if (s !== void 0 && n >= s) throw new Error(`${e} must be < ${s}`);
  return n;
}
function Kn(n, e, t) {
  if (Ct(n, e, t), !Number.isInteger(n)) throw new Error(`${e} must be an integer`);
  return n;
}
function Sn(n, e) {
  if (typeof n != "string") throw new Error(`${e} must be a string`);
  return n;
}
function Ya(n, e) {
  if (typeof n != "boolean") throw new Error(`${e} must be a boolean`);
  return n;
}
function Er(n, e, t) {
  if (!e.includes(n))
    throw new Error(`${t} must be one of ${e.join(", ")} (got ${JSON.stringify(n)})`);
  return n;
}
function Bh(n) {
  if (n === void 0) return { width: 1920, height: 1080 };
  const e = Jt(n, "size");
  return jt(e, /* @__PURE__ */ new Set(["width", "height"]), "size"), {
    width: e.width === void 0 ? 1920 : Kn(e.width, "size.width", { min: 1 }),
    height: e.height === void 0 ? 1080 : Kn(e.height, "size.height", { min: 1 })
  };
}
function zh(n) {
  if (n === void 0) return "100%";
  if (typeof n == "number") return Ct(n, "camera.distance");
  if (typeof n == "string") {
    if (!qa.test(n.trim()))
      throw new Error(`camera.distance string must match ${qa} (got ${JSON.stringify(n)})`);
    return n;
  }
  throw new Error("camera.distance must be a number or string");
}
function Gh(n) {
  if (n === void 0)
    return { gap: 1920, distance: "100%", angle: 60, elevation: 0, fov: 39.6 };
  const e = Jt(n, "camera");
  return jt(e, /* @__PURE__ */ new Set(["gap", "distance", "angle", "elevation", "fov"]), "camera"), {
    gap: e.gap === void 0 ? 1920 : Ct(e.gap, "camera.gap", { min: 0 }),
    distance: zh(e.distance),
    angle: e.angle === void 0 ? 60 : Ct(e.angle, "camera.angle"),
    elevation: e.elevation === void 0 ? 0 : Ct(e.elevation, "camera.elevation"),
    fov: e.fov === void 0 ? 39.6 : Ct(e.fov, "camera.fov", { gt: 0, lt: 180 })
  };
}
function Vh(n) {
  if (n === void 0) return null;
  const e = Jt(n, "transition");
  if (jt(e, /* @__PURE__ */ new Set(["kind", "duration", "wait", "fps", "easing"]), "transition"), e.kind === void 0) throw new Error("transition.kind is required");
  return {
    kind: Er(e.kind, Fh, "transition.kind"),
    duration: e.duration === void 0 ? 3 : Ct(e.duration, "transition.duration", { gt: 0 }),
    wait: e.wait === void 0 ? 1 : Ct(e.wait, "transition.wait", { min: 0 }),
    fps: e.fps === void 0 ? 30 : Kn(e.fps, "transition.fps", { min: 1 }),
    easing: e.easing === void 0 ? "easeInOutCubic" : Er(e.easing, Oh, "transition.easing")
  };
}
function kh(n) {
  if (n === void 0)
    return { width: null, height: null, fps: null, frames: null, first_hold: 10, last_hold: 10 };
  const e = Jt(n, "video");
  jt(e, /* @__PURE__ */ new Set(["width", "height", "fps", "frames", "first_hold", "last_hold"]), "video");
  const t = (i, r, s) => i == null ? null : Kn(i, r, s);
  return {
    width: t(e.width, "video.width", { min: 1 }),
    height: t(e.height, "video.height", { min: 1 }),
    fps: t(e.fps, "video.fps", { min: 1 }),
    frames: t(e.frames, "video.frames", { min: 1 }),
    first_hold: e.first_hold === void 0 ? 10 : Kn(e.first_hold, "video.first_hold", { min: 0 }),
    last_hold: e.last_hold === void 0 ? 10 : Kn(e.last_hold, "video.last_hold", { min: 0 })
  };
}
function Hh(n) {
  if (n === void 0) return { color: "#ffffff", opacity: 0, reflectivity: 0.1 };
  const e = Jt(n, "floor");
  return jt(e, /* @__PURE__ */ new Set(["color", "opacity", "reflectivity"]), "floor"), {
    color: e.color === void 0 ? "#ffffff" : Sn(e.color, "floor.color"),
    opacity: e.opacity === void 0 ? 0 : Ct(e.opacity, "floor.opacity", { min: 0, max: 1 }),
    reflectivity: e.reflectivity === void 0 ? 0.1 : Ct(e.reflectivity, "floor.reflectivity", { min: 0, max: 1 })
  };
}
function Wh(n) {
  if (n === void 0) return { width: 0, color: "#f2f2f2" };
  const e = Jt(n, "edge");
  return jt(e, /* @__PURE__ */ new Set(["width", "color"]), "edge"), {
    width: e.width === void 0 ? 0 : Ct(e.width, "edge.width", { min: 0 }),
    color: e.color === void 0 ? "#f2f2f2" : Sn(e.color, "edge.color")
  };
}
function yo(n, e) {
  if (n === void 0) return null;
  const t = Jt(n, e);
  jt(t, /* @__PURE__ */ new Set(["size", "color", "font", "fill_color", "border_color"]), e);
  const i = {};
  return t.size !== void 0 && (i.size = Ct(t.size, `${e}.size`, { gt: 0 })), t.color !== void 0 && (i.color = Sn(t.color, `${e}.color`)), t.font !== void 0 && (i.font = Sn(t.font, `${e}.font`)), t.fill_color !== void 0 && (i.fill_color = Sn(t.fill_color, `${e}.fill_color`)), t.border_color !== void 0 && (i.border_color = Sn(t.border_color, `${e}.border_color`)), i;
}
function Xh(n) {
  if (n === void 0) return null;
  const e = Jt(n, "caption_fade");
  return jt(e, /* @__PURE__ */ new Set(["window", "stagger", "stagger_frames"]), "caption_fade"), {
    window: e.window === void 0 ? 0.9 : Ct(e.window, "caption_fade.window", { gt: 0, max: 1 }),
    stagger: e.stagger === void 0 ? 0.3 : Ct(e.stagger, "caption_fade.stagger", { min: 0, lt: 1 }),
    // Issue 309: per-caption back->front step in transition FRAMES; overrides `stagger`.
    stagger_frames: e.stagger_frames === void 0 || e.stagger_frames === null ? null : Kn(e.stagger_frames, "caption_fade.stagger_frames", { min: 0 })
  };
}
function qh(n, e) {
  if (n === void 0) return null;
  const t = Jt(n, e);
  if (jt(t, /* @__PURE__ */ new Set(["text", "show_in", "style"]), e), t.text === void 0) throw new Error(`${e}.text is required`);
  return {
    text: Sn(t.text, `${e}.text`),
    show_in: t.show_in === void 0 ? "expanded" : Er(t.show_in, Nh, `${e}.show_in`),
    style: yo(t.style, `${e}.style`)
  };
}
function Yh(n, e) {
  if (n === void 0) return 1;
  if (typeof n == "number") return Ct(n, e, { min: 0, max: 1 });
  const t = Jt(n, e);
  return jt(t, /* @__PURE__ */ new Set(["expanded", "compact"]), e), {
    expanded: t.expanded === void 0 ? 1 : Ct(t.expanded, `${e}.expanded`, { min: 0, max: 1 }),
    compact: t.compact === void 0 ? 1 : Ct(t.compact, `${e}.compact`, { min: 0, max: 1 })
  };
}
function $h(n, e) {
  const t = `slides[${e}]`, i = Jt(n, t);
  if (jt(i, /* @__PURE__ */ new Set(["src", "gap", "opacity", "caption"]), t), i.src === void 0) throw new Error(`${t}.src is required`);
  let r = null;
  return i.gap !== void 0 && i.gap !== null && (r = Ct(i.gap, `${t}.gap`, { min: 0 })), {
    src: Sn(i.src, `${t}.src`),
    gap: r,
    opacity: Yh(i.opacity, `${t}.opacity`),
    caption: qh(i.caption, `${t}.caption`)
  };
}
function Ms(n, e) {
  const t = n.opacity;
  return t !== null && typeof t == "object" ? e === "expanded" ? t.expanded : t.compact : Number(t);
}
function Eo(n) {
  const e = Jt(n, "scene");
  if (jt(e, /* @__PURE__ */ new Set([
    "$schema",
    "version",
    "view",
    "size",
    "camera",
    "transition",
    "floor",
    "edge",
    "background",
    "juicy",
    "captions",
    "video",
    "caption_defaults",
    "caption_fade",
    "slides"
  ]), "scene"), e.version !== void 0 && e.version !== 1)
    throw new Error(`version must be 1 (got ${JSON.stringify(e.version)})`);
  if (e.slides === void 0) throw new Error("slides is required");
  if (!Array.isArray(e.slides) || e.slides.length < 1)
    throw new Error("slides must be a non-empty array");
  return {
    version: 1,
    view: e.view === void 0 ? "expanded" : Er(e.view, Ih, "view"),
    size: Bh(e.size),
    camera: Gh(e.camera),
    transition: Vh(e.transition),
    floor: Hh(e.floor),
    edge: Wh(e.edge),
    background: e.background === void 0 ? "#ffffff" : Sn(e.background, "background"),
    juicy: e.juicy === void 0 ? !1 : Ya(e.juicy, "juicy"),
    // Issue 332: global captions toggle (default true → preserves prior stacked-with-captions
    // behavior). false skips all caption plates and drops slides onto the floor.
    captions: e.captions === void 0 ? !0 : Ya(e.captions, "captions"),
    video: kh(e.video),
    caption_defaults: yo(e.caption_defaults, "caption_defaults"),
    caption_fade: Xh(e.caption_fade),
    slides: e.slides.map((i, r) => $h(i, r))
  };
}
function Kh(n, e, t) {
  if (typeof n == "string") {
    const r = { src: n };
    return t.caption && (r.caption = { text: "", show_in: "expanded" }), r;
  }
  if (n === null || typeof n != "object" || Array.isArray(n))
    throw new Error(`makeScene: slides[${e}] must be a string URL or an object`);
  const i = {};
  if (n.src === void 0) throw new Error(`makeScene: slides[${e}].src is required`);
  return i.src = n.src, n.gap !== void 0 && n.gap !== null && (i.gap = n.gap), n.opacity !== void 0 && (i.opacity = n.opacity), n.caption !== void 0 && (i.caption = typeof n.caption == "string" ? { text: n.caption, show_in: "expanded" } : n.caption), i;
}
function To(n, e = {}) {
  if (!Array.isArray(n) || n.length < 1)
    throw new Error("makeScene: pass a non-empty array of slide URLs or slide objects");
  if (e === null || typeof e != "object" || Array.isArray(e))
    throw new Error("makeScene: opts must be an object");
  const t = /* @__PURE__ */ new Set([
    "baseUrl",
    "gap",
    "size",
    "camera",
    "transition",
    "view",
    "background",
    "captions",
    "floor",
    "edge",
    "juicy",
    "caption_defaults",
    "caption_fade",
    "video"
  ]);
  for (const o of Object.keys(e))
    if (!t.has(o)) throw new Error(`makeScene: unknown option ${JSON.stringify(o)}`);
  const i = e.captions === !0, r = { version: 1, slides: n.map((o, l) => Kh(o, l, { caption: i })) };
  e.size !== void 0 && (Array.isArray(e.size) ? r.size = { width: e.size[0], height: e.size[1] } : r.size = e.size), (e.camera !== void 0 || e.gap !== void 0) && (r.camera = { ...e.camera ?? {} }, e.gap !== void 0 && (r.camera.gap = e.gap)), e.transition !== void 0 && (r.transition = typeof e.transition == "string" ? { kind: e.transition } : e.transition), e.view !== void 0 && (r.view = e.view), e.background !== void 0 && (r.background = e.background), typeof e.captions == "boolean" && (r.captions = e.captions), e.floor !== void 0 && (r.floor = e.floor), e.edge !== void 0 && (r.edge = e.edge), e.juicy !== void 0 && (r.juicy = e.juicy), e.caption_defaults !== void 0 && (r.caption_defaults = e.caption_defaults), e.caption_fade !== void 0 && (r.caption_fade = e.caption_fade), e.video !== void 0 && (r.video = e.video);
  const s = Eo(r), a = e.baseUrl ?? (typeof document < "u" ? document.baseURI : void 0);
  if (a)
    for (const o of s.slides) o.src = Ao(o.src, a);
  return s;
}
function Ao(n, e) {
  if (n.startsWith("data:") || !e) return n;
  try {
    return new URL(n, e).href;
  } catch {
    return n;
  }
}
async function wo(n, e = {}) {
  let t, i = e.baseUrl;
  if (typeof n == "string") {
    const s = new URL(n, e.baseUrl ?? (typeof location < "u" ? location.href : void 0));
    i = s.href;
    const a = await fetch(s.href);
    if (!a.ok) throw new Error(`Failed to fetch scene ${s.href}: ${a.status}`);
    t = await a.json();
  } else
    t = n;
  const r = Eo(t);
  for (const s of r.slides)
    s.src = Ao(s.src, i);
  return r;
}
const Tr = 3, $a = 0.85, Zh = 0.98, jh = 0.9, Jh = 0.3, Qh = 0, ep = 0.1 * 4 / 3, Co = 0.75, tp = 0.75, np = ep * Co, ip = 0.02;
function rp(n) {
  return n.size.height * n.edge.width;
}
function Fs(n) {
  const e = n.caption_defaults;
  return e && e.size !== null && e.size !== void 0 ? Number(e.size) : Math.max(8, n.size.height * np);
}
function sp(n) {
  const e = n.caption_defaults;
  return e && e.fill_color ? e.fill_color : n.edge.color;
}
function ap(n) {
  const e = n.caption_defaults;
  return e && e.border_color ? e.border_color : n.edge.color;
}
function Ns(n) {
  return Fs(n) / Co;
}
function op(n) {
  return -(n.size.height / 2) + Ns(n) / 2;
}
function Os(n) {
  return n.captions ? Ns(n) : 0;
}
function lp(n) {
  return -(n.size.width / 2 + Qh * Fs(n));
}
function Fr(n) {
  return n.slides.map((e) => e.gap === null || e.gap === void 0 ? n.camera.gap : e.gap);
}
function Bs(n, e) {
  const t = n.slides.length;
  if (t <= 1) return 0;
  if (e === "compact") return (t - 1) * Tr;
  const i = Fr(n);
  let r = 0;
  for (let s = 1; s < i.length; s++) r += i[s];
  return r;
}
function cp(n) {
  const e = n.length;
  if (e === 0) return [];
  let t = 0;
  for (let r = 1; r < e; r++) t += n[r];
  const i = [0];
  for (let r = 1; r < e; r++) i.push(i[i.length - 1] + n[r]);
  return i.map((r) => r - t);
}
const Ka = (n, e) => [n[0] - e[0], n[1] - e[1], n[2] - e[2]], pi = (n, e) => n[0] * e[0] + n[1] * e[1] + n[2] * e[2], Za = (n, e) => [
  n[1] * e[2] - n[2] * e[1],
  n[2] * e[0] - n[0] * e[2],
  n[0] * e[1] - n[1] * e[0]
];
function ms(n) {
  const e = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]) || 1;
  return [n[0] / e, n[1] / e, n[2] / e];
}
function dp(n, e) {
  if (typeof n == "number") return n;
  const t = String(n).trim();
  return t.endsWith("%") ? parseFloat(t.slice(0, -1)) / 100 * e : parseFloat(t);
}
function Ro(n, e) {
  const t = n.camera, r = [0, 0, -Bs(n, "expanded") / 2], s = t.angle * Math.PI / 180, a = t.elevation * Math.PI / 180, o = ms([
    -Math.sin(s) * Math.cos(a),
    Math.sin(a),
    Math.cos(s) * Math.cos(a)
  ]), l = [-o[0], -o[1], -o[2]], c = [0, 1, 0];
  let d = Za(l, c);
  d = Math.abs(pi(l, c)) < 0.999 ? ms(d) : [1, 0, 0];
  const u = ms(Za(d, l)), f = t.fov * Math.PI / 180, p = e || n.size.width / n.size.height, x = 2 * Math.atan(Math.tan(f / 2) / p), v = Math.tan(f / 2), m = Math.tan(x / 2), h = n.size.width / 2, T = n.size.height / 2, E = cp(Fr(n)), A = Os(n), D = -T, y = A - T, P = A + T, O = n.captions ? [D] : [], M = [], S = [];
  for (const V of E) {
    const X = Ka([0, A, V], r);
    S.push([pi(X, d), pi(X, l)]);
    for (const ne of [-h, h])
      for (const Se of [y, P, ...O]) {
        const ue = Ka([ne, Se, V], r);
        M.push([pi(ue, d), pi(ue, u), pi(ue, l)]);
      }
  }
  const L = (V, X) => {
    let ne = 1 / 0, Se = -1 / 0, ue = 0;
    for (const [Ne, xt, Ve] of M) {
      const at = Ve + V, w = (Ne - X) / (at * v);
      ne = Math.min(ne, w), Se = Math.max(Se, w), ue = Math.max(ue, Math.abs(xt / (at * m)));
    }
    return [ne, Se, ue];
  }, z = (V, X) => {
    const ne = S.map(([ue, Ne]) => (ue - X) / ((Ne + V) * v));
    if (ne.length < 2) return 0;
    let Se = 0;
    for (let ue = 0; ue < ne.length - 1; ue++) Se += Math.abs(ne[ue + 1] - ne[ue]);
    return Se / (ne.length - 1);
  }, H = (V) => {
    let X = -h * 8, ne = h * 8;
    for (let Se = 0; Se < 64; Se++) {
      const ue = 0.5 * (X + ne), [Ne, xt] = L(V, ue);
      Ne + xt > 0 ? X = ue : ne = ue;
    }
    return 0.5 * (X + ne);
  };
  let q = 0, K = 0;
  for (const [V, X] of M)
    q = Math.max(q, Math.abs(V)), K = Math.max(K, Math.abs(X));
  const Y = Math.max(q / ($a * v), K / ($a * m));
  let te = Y * 0.1, W = Y * 20, Q = Y;
  for (let V = 0; V < 80; V++) {
    Q = 0.5 * (te + W);
    const X = H(Q), [ne, Se] = L(Q, X);
    0.5 * (ne + 1 + (1 - Se)) - z(Q, X) > 0 ? W = Q : te = Q;
  }
  Q = 0.5 * (te + W);
  let re = Y * 0.05, Me = Y * 40;
  for (let V = 0; V < 80; V++) {
    const X = 0.5 * (re + Me), [, , ne] = L(X, 0);
    ne > Zh ? re = X : Me = X;
  }
  Q = Math.max(Q, 0.5 * (re + Me));
  const ke = H(Q), et = Math.max(1, Q * 5e-3), je = [
    r[0] + d[0] * ke,
    r[1] + d[1] * ke,
    r[2] + d[2] * ke
  ];
  return { position: [
    je[0] + o[0] * Q,
    je[1] + o[1] * Q,
    je[2] + o[2] * Q
  ], target: je, fov: t.fov, near: et };
}
function Po(n, e) {
  const t = n.camera, i = Bs(n, "compact"), s = [0, Os(n), -i / 2];
  let a = !1, o = 90;
  if (typeof t.distance == "string") {
    const u = t.distance.trim();
    if (u.endsWith("%")) {
      a = !0;
      const f = parseFloat(u.slice(0, -1));
      isNaN(f) || (o = f);
    }
  }
  let l;
  if (a) {
    const u = t.fov * Math.PI / 180, f = e || n.size.width / n.size.height, p = 2 * Math.atan(Math.tan(u / 2) / f), x = o / 100, v = n.size.width / (2 * Math.tan(u / 2) * x), m = n.size.height / (2 * Math.tan(p / 2) * x);
    l = Math.max(v, m) + i / 2;
  } else
    l = dp(t.distance, n.size.width);
  const c = Math.max(1, l * 5e-3);
  return { position: [s[0], s[1], s[2] + l], target: s, fov: t.fov, near: c };
}
function Do(n, e) {
  if (e = Math.max(0, Math.min(1, e)), n === "linear") return e;
  if (n === "easeInCubic") return e * e * e;
  if (n === "easeOutCubic") {
    const t = 1 - e;
    return 1 - t * t * t;
  }
  if (n === "easeInOutCubic") {
    if (e < 0.5) return 4 * e * e * e;
    const t = -2 * e + 2;
    return 1 - t * t * t / 2;
  }
  throw new Error(`Unknown easing: ${JSON.stringify(n)}`);
}
function up(n, e) {
  const t = Math.max(0, Math.min(1, e)), i = Ms(n, "compact"), r = Ms(n, "expanded"), s = i + (r - i) * t;
  return Math.max(0, Math.min(1, s));
}
function bs(n, e) {
  const t = Math.max(0, Math.min(1, e));
  if (!n.captions) return n.slides.map(() => 0);
  const i = n.caption_fade, r = i ? i.window : jh, s = i ? i.stagger : Jh, a = n.slides.length, o = a > 1 ? a - 1 : 1;
  let l = s * r;
  if (i && i.stagger_frames !== null && i.stagger_frames !== void 0 && n.transition) {
    const d = Math.round(n.transition.duration * n.transition.fps);
    if (d > 0) {
      const u = i.stagger_frames / d;
      l = Math.min((a - 1) * u, r * 0.95);
    }
  }
  const c = Math.max(1e-6, r - l);
  return n.slides.map((d, u) => {
    const f = d.caption;
    if (!f || f.show_in === "none") return 0;
    if (f.show_in === "both") return 1;
    if (f.show_in === "compact") return 1 - t;
    const p = 1 - r + u / o * l;
    return Math.max(0, Math.min(1, (t - p) / c));
  });
}
function ja(n, e, t) {
  return [n[0] + (e[0] - n[0]) * t, n[1] + (e[1] - n[1]) * t, n[2] + (e[2] - n[2]) * t];
}
function fp(n, e, t) {
  return {
    position: ja(n.position, e.position, t),
    target: ja(n.target, e.target, t),
    fov: n.fov + (e.fov - n.fov) * t,
    near: n.near + (e.near - n.near) * t
  };
}
function hp(n, e, t, i) {
  const s = Fr(n).map((o) => Tr + (o - Tr) * i), a = n.slides.map((o) => up(o, i));
  return {
    camera: fp(e, t, i),
    gaps: s,
    opacities: a,
    captionOpacities: bs(n, i)
  };
}
function mi(n, e, t) {
  const i = Po(n, t), r = Ro(n, t);
  return hp(n, i, r, Math.max(0, Math.min(1, e)));
}
const xs = 4;
function pp(n, e) {
  const t = e?.size ?? 28, i = e?.color ?? "#222222", r = e?.plateHeight ?? t / 0.75, s = e?.edgeWidth ?? 0, a = e?.edgeColor ?? "#000000", o = e?.fillColor ?? a, l = e?.borderColor ?? a, c = 2, d = !e?.font, u = d ? '"Zalando Sans", system-ui, sans-serif' : `"${e.font}", system-ui, sans-serif`, f = d ? "500 expanded " : "", p = d ? 0.02 * t * c : 0, x = `${f}${t * c}px ${u}`, m = document.createElement("canvas").getContext("2d");
  m.font = x, p && "letterSpacing" in m && (m.letterSpacing = `${p}px`);
  const T = m.measureText(n).width / c + 2 * tp * t, E = r, A = Math.max(1, Math.round(T * c)), D = Math.max(1, Math.round(E * c)), y = document.createElement("canvas");
  y.width = A, y.height = D;
  const P = y.getContext("2d");
  P.fillStyle = o, P.fillRect(0, 0, A, D);
  const O = s * c;
  O > 0 && (P.lineWidth = O, P.strokeStyle = l, P.strokeRect(O / 2, O / 2, A - O, D - O)), P.font = x, p && "letterSpacing" in P && (P.letterSpacing = `${p}px`), P.textAlign = "center", P.textBaseline = "middle", P.fillStyle = i, P.fillText(n, A / 2, D / 2);
  const M = new mo(y);
  M.colorSpace = Ft, M.needsUpdate = !0;
  const S = new Yn({
    map: M,
    transparent: !0,
    depthTest: !1,
    side: 2,
    opacity: 1
  }), L = new rn(T, E);
  return { mesh: new Xt(L, S), material: S, worldWidth: T };
}
function mp(n, e) {
  return new Promise((t, i) => {
    n.load(
      e,
      (r) => {
        r.colorSpace = Ft, t(r);
      },
      void 0,
      (r) => i(new Error(`Failed to load texture: ${e} (${r?.message ?? r})`))
    );
  });
}
function xp(n) {
  if (typeof document > "u") return null;
  const e = n.image, t = e?.width ?? 0, i = e?.height ?? 0;
  if (!t || !i) return null;
  const r = Math.max(0, ip * i), s = Math.ceil(r * 3) + 1, a = document.createElement("canvas");
  a.width = t + s * 2, a.height = i + s * 2;
  const o = a.getContext("2d");
  if (!o) return null;
  typeof o.filter == "string" && (o.filter = `blur(${r}px)`), o.drawImage(e, s, s, t, i);
  const l = new mo(a);
  return l.colorSpace = Ft, l.needsUpdate = !0, { texture: l, padFrac: [(t + s * 2) / t, (i + s * 2) / i] };
}
class gp {
  /**
   * @param {HTMLElement} container
   * @param {object} scene normalized scene (from loadScene)
   */
  constructor(e, t) {
    this.container = e, this.scene = t, this.plates = [], this.captions = [], this.view = t.view, this._disposed = !1;
  }
  /** Build renderer, scene graph, camera, floor, and load all plate textures. */
  async init() {
    const e = this.scene.size.width / (this.scene.size.height || 1), t = this.container.clientWidth, i = this.container.clientHeight, r = t || this.scene.size.width, s = i || (t ? Math.round(t / e) : this.scene.size.height);
    return this.threeScene = new Ul(), this.threeScene.background = new Qe(this.scene.background), this.camera = new Zt(
      this.scene.camera.fov,
      r / s,
      1,
      1e6
    ), this.renderer = new Uh({ antialias: !0, alpha: !0, preserveDrawingBuffer: !0 }), this.renderer.setPixelRatio(typeof window < "u" ? window.devicePixelRatio : 1), this.renderer.setSize(r, s), this.container.appendChild(this.renderer.domElement), await this._buildPlates(), this._buildFloor(), await this._ensureCaptionFonts(), this._buildCaptions(), this.setView(this.view), this;
  }
  async _buildPlates() {
    const e = new Hl();
    e.setCrossOrigin("anonymous");
    const t = await Promise.all(this.scene.slides.map((a) => mp(e, a.src))), i = this.scene.floor.reflectivity, r = t.reduce((a, o) => Math.max(a, o.image.width), 0) || this.scene.size.width;
    this._texScale = this.scene.size.width / r;
    const s = this.scene.edge;
    this._edgeWidth = s.width > 0 ? rp(this.scene) : 0, this._edgeColor = s.color, t.forEach((a, o) => {
      const l = a.image.width * this._texScale, c = a.image.height * this._texScale, d = new rn(l, c), u = new Yn({
        map: a,
        side: 2,
        transparent: !0,
        depthWrite: !1,
        // prevents z-fighting with floor/reflections (issue 320)
        opacity: 1
      }), f = new Xt(d, u);
      f.renderOrder = o * xs, this.threeScene.add(f);
      let p = null;
      if (i > 0) {
        const v = xp(a), m = v ? v.texture : a, h = new Yn({
          map: m,
          side: 2,
          transparent: !0,
          depthWrite: !1,
          // must not occlude plates or floor (issue 320)
          opacity: i
        });
        p = new Xt(d.clone(), h), p.scale.y = -1, v && (p.scale.x = v.padFrac[0], p.scale.y = -v.padFrac[1]), p.renderOrder = -2, this.threeScene.add(p);
      }
      let x = null;
      this._edgeWidth > 0 && (x = this._makeBorder(l, c, this._edgeWidth, this._edgeColor), x.group.renderOrder = o * xs + 1, this.threeScene.add(x.group)), this.plates.push({
        mesh: f,
        reflection: p,
        border: x,
        width: l,
        height: c,
        slide: this.scene.slides[o]
      });
    });
  }
  /**
   * Build a rectangular border frame as 4 thin filled quads (top/bottom/left/right) sized
   * for a plate of (w, h) with the given thickness `t` and CSS color. Returns the parent
   * group (positioned per-frame) plus the four meshes/material so opacity can be tracked.
   * The frame is centered on the plate origin and sits flush with the plate edges.
   */
  _makeBorder(e, t, i, r) {
    const s = new Yn({
      color: new Qe(r),
      side: 2,
      transparent: !0,
      opacity: 1
    }), a = new Ui(), o = e / 2, l = t / 2, d = [
      { geo: new rn(e, i), x: 0, y: l - i / 2 },
      // top
      { geo: new rn(e, i), x: 0, y: -l + i / 2 },
      // bottom
      { geo: new rn(i, t - 2 * i), x: -o + i / 2, y: 0 },
      // left
      { geo: new rn(i, t - 2 * i), x: o - i / 2, y: 0 }
      // right
    ].map(({ geo: u, x: f, y: p }) => {
      const x = new Xt(u, s);
      return x.position.set(f, p, 0), a.add(x), x;
    });
    return { group: a, material: s, meshes: d };
  }
  /**
   * Ensure the default caption font is loaded before the caption canvases are drawn (issue 328).
   * Caption text is rasterized to a canvas at build time, so the font must be available first or
   * it falls back to a system font. The default font is "Zalando Sans" (the bundled vexy-stax
   * face) pulled from Google Fonts at wdth 125 / wght 500; explicit families are left to the host
   * page. Best-effort: in non-browser/offline contexts it resolves without blocking.
   */
  async _ensureCaptionFonts() {
    if (!(typeof document > "u" || !document.fonts || !(!this.scene.caption_defaults?.font && this.scene.slides.some((i) => i.caption && !i.caption.style?.font)))) {
      if (typeof document.getElementById == "function" && !document.getElementById("vexy-zalando-font")) {
        for (const [s, a, o] of [
          ["vexy-gf-preconnect", "https://fonts.googleapis.com", !1],
          ["vexy-gf-preconnect-static", "https://fonts.gstatic.com", !0]
        ])
          if (!document.getElementById(s)) {
            const l = document.createElement("link");
            l.id = s, l.rel = "preconnect", l.href = a, o && (l.crossOrigin = "anonymous"), document.head?.appendChild(l);
          }
        const i = document.createElement("link");
        i.id = "vexy-zalando-font", i.rel = "stylesheet", i.href = "https://fonts.googleapis.com/css2?family=Zalando+Sans:wdth,wght@125,500&display=swap";
        const r = new Promise((s) => {
          i.onload = s, i.onerror = s;
        });
        document.head?.appendChild(i), await r;
      }
      try {
        await document.fonts.load('500 expanded 32px "Zalando Sans"'), document.fonts.ready && await document.fonts.ready;
      } catch {
      }
    }
  }
  /** Build a caption sprite under each plate that declares one (best-effort). */
  _buildCaptions() {
    if (typeof document > "u" || !this.scene.captions) return;
    const e = this.scene.caption_defaults ?? null, t = Fs(this.scene), i = Ns(this.scene), r = this._edgeWidth, s = this._edgeColor, a = sp(this.scene), o = ap(this.scene);
    this.plates.forEach((l, c) => {
      const d = l.slide.caption;
      if (!d) return;
      const u = {
        ...e ?? {},
        ...d.style ?? {},
        size: d.style?.size ?? t,
        plateHeight: i,
        edgeWidth: r,
        edgeColor: s,
        fillColor: a,
        borderColor: o
      }, { mesh: f, material: p, worldWidth: x } = pp(d.text, u);
      f.renderOrder = c * xs + 2, this.threeScene.add(f), this.captions.push({ sprite: f, material: p, plateIndex: c, caption: d, worldWidth: x });
    });
  }
  _tallestHeight() {
    return this.plates.reduce((e, t) => Math.max(e, t.height), 0);
  }
  _buildFloor() {
    const e = this.plates.reduce((l, c) => Math.max(l, c.width), 0) || this.scene.size.width, t = Bs(this.scene, "expanded"), i = e * 4, r = t > 0 ? t + e * 2 : e * 2, s = new rn(i, r), a = new Yn({
      color: new Qe(this.scene.floor.color),
      transparent: !0,
      opacity: this.scene.floor.opacity,
      side: 2,
      depthWrite: !1
    }), o = new Xt(s, a);
    o.rotation.x = -Math.PI / 2, o.position.set(0, -this._tallestHeight() / 2, -t / 2), o.renderOrder = -1, this.threeScene.add(o), this.floor = o;
  }
  /**
   * Position plates (Z spacing + Y bottom-align), opacity, and camera for a view.
   * @param {"expanded"|"compact"} view
   */
  setView(e) {
    this.view = e;
    const t = e === "compact" ? this.plates.map(() => Tr) : Fr(this.scene), i = this.plates.map((o) => Ms(o.slide, e)), r = this.camera.aspect || void 0, s = e === "compact" ? Po(this.scene, r) : Ro(this.scene, r), a = e === "compact" ? 0 : 1;
    this._placePlates(t, i), this._placeCaptions(bs(this.scene, a)), this._applyPose(s);
  }
  /**
   * Apply a geometry.js FrameState (camera pose + per-plate gaps + per-slide
   * opacities) for the playable transition / scrollspy. `t` is the eased morph
   * factor (0=compact,1=expanded) used for caption fade.
   * @param {{camera:object, gaps:number[], opacities:number[]}} state
   * @param {number} t
   */
  applyFrameState(e, t) {
    this._placePlates(e.gaps, e.opacities);
    const i = e.captionOpacities ?? bs(this.scene, t);
    this._placeCaptions(i), this._applyPose(e.camera);
  }
  /** Lay out plates along Z (index 0 farthest), bottom-aligned, with opacities. */
  _placePlates(e, t) {
    const r = -this._tallestHeight() / 2, s = r, a = this.scene.floor.reflectivity, o = Os(this.scene);
    let l = 0;
    for (let d = 1; d < e.length; d++) l += e[d];
    let c = 0;
    this.plates.forEach((d, u) => {
      u > 0 && (c += e[u]);
      const f = -(l - c), p = r + o + d.height / 2, x = t[u];
      d.mesh.position.set(0, p, f), d.mesh.material.opacity = x, d.reflection && (d.reflection.position.set(0, 2 * s - p, f), d.reflection.material.opacity = x * a, d.reflection.visible = x * a > 1e-3), d.border && (d.border.group.position.set(0, p, f), d.border.material.opacity = x, d.border.group.visible = x > 1e-3);
    });
  }
  /**
   * Position each caption PLATE (issue 311; relayout issue 332) so its LEFT edge is at
   * captionAnchorX (the slide LEFT edge) and its VERTICAL CENTER is at captionPlateCenterY
   * (the plate sits on the floor, the slide stacked on top of it), at the slide plate's
   * current Z (captions recede with their plate). The caption mesh is centered geometry of
   * width `worldWidth`, so the mesh CENTER X is anchorX + worldWidth/2. The whole plate
   * (fill + border + text) fades with the per-frame opacity. opacities[plateIndex] == 0 →
   * fully invisible.
   * @param {number[]} opacities  per-slide opacity list (1:1 with this.plates)
   */
  _placeCaptions(e) {
    if (this.captions.length === 0) return;
    const t = lp(this.scene), i = op(this.scene);
    this.captions.forEach(({ sprite: r, material: s, plateIndex: a, worldWidth: o }) => {
      const l = this.plates[a], c = o ?? r.scale?.x ?? 0;
      r.position.set(t + c / 2, i, l.mesh.position.z);
      const d = e[a] ?? 0;
      s.opacity = d, r.visible = d > 1e-3;
    });
  }
  /** Apply a geometry.js pose (position/target/fov/near) to the three camera. */
  _applyPose(e) {
    this.camera.position.set(e.position[0], e.position[1], e.position[2]), this.camera.up.set(0, 1, 0), this.camera.lookAt(e.target[0], e.target[1], e.target[2]);
    const t = this.camera.aspect || this.scene.size.width / this.scene.size.height, i = e.fov * Math.PI / 360, r = 2 * Math.atan(Math.tan(i) / t);
    this.camera.fov = r * 180 / Math.PI, this.camera.near = e.near, this.camera.updateProjectionMatrix();
  }
  render() {
    this._disposed || this.renderer.render(this.threeScene, this.camera);
  }
  resize(e, t) {
    !e || !t || (this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t));
  }
  dispose() {
    this._disposed = !0, this.plates.forEach((e) => {
      e.mesh.geometry?.dispose(), e.mesh.material?.map?.dispose(), e.mesh.material?.dispose(), e.reflection && (e.reflection.geometry?.dispose(), e.reflection.material?.map !== e.mesh.material?.map && e.reflection.material?.map?.dispose(), e.reflection.material?.dispose()), e.border && (e.border.meshes.forEach((t) => t.geometry?.dispose()), e.border.material?.dispose());
    }), this.captions.forEach((e) => {
      e.sprite?.geometry?.dispose(), e.material?.map?.dispose(), e.material?.dispose();
    }), this.floor?.geometry?.dispose(), this.floor?.material?.dispose(), this.renderer?.dispose(), this.renderer?.domElement?.parentNode && this.renderer.domElement.parentNode.removeChild(this.renderer.domElement), this.plates = [], this.captions = [];
  }
}
const Lo = {
  expand: [[0, 1]],
  collapse: [[1, 0]],
  expand_collapse: [
    [0, 1],
    [1, 0]
  ],
  collapse_expand: [
    [1, 0],
    [0, 1]
  ]
};
function gs(n) {
  const e = Lo[n];
  if (!e) throw new Error(`Unknown transition kind: ${JSON.stringify(n)}`);
  return { startMorph: e[0][0], endMorph: e[e.length - 1][1] };
}
function Uo(n, { duration: e, wait: t }) {
  const i = Lo[n];
  if (!i) throw new Error(`Unknown transition kind: ${JSON.stringify(n)}`);
  const r = [];
  let s = 0;
  for (const [o, l] of i)
    e > 0 && r.push({ type: "move", start: o, end: l, seconds: e }), t > 0 && r.push({ type: "hold", start: l, end: l, seconds: t }), s += e + t;
  if (s <= 0) {
    const o = i[i.length - 1];
    r.push({ type: "hold", start: o[1], end: o[1], seconds: 0 }), s = 0;
  }
  let a = 0;
  for (const o of r) {
    const l = s > 0 ? a / s : 0;
    a += o.seconds;
    const c = s > 0 ? a / s : 1;
    o.from = l, o.to = c;
  }
  return { segments: r, totalSeconds: s };
}
function Io(n, e, t) {
  const { segments: i } = n, r = Math.max(0, Math.min(1, e));
  for (const s of i)
    if (r <= s.to || s === i[i.length - 1]) {
      if (s.type === "hold" || s.to === s.from) return s.end;
      const a = (r - s.from) / (s.to - s.from), o = t(Math.max(0, Math.min(1, a)));
      return s.start + (s.end - s.start) * o;
    }
  return i[i.length - 1].end;
}
function Ja(n, e, t = {}) {
  const i = n.transition, r = t.kind ?? i?.kind;
  if (!r) throw new Error("playTransition: no transition kind (scene.transition is null and no kind given)");
  const s = t.duration ?? i?.duration ?? 3, a = t.duration != null ? 0 : i?.wait ?? 0, o = i?.easing ?? "easeInOutCubic", l = Uo(r, { duration: s, wait: a }), c = t.clock?.now ?? (() => performance.now()), d = t.clock?.raf ?? (typeof requestAnimationFrame < "u" ? requestAnimationFrame : (A) => setTimeout(() => A(c()), 16)), u = t.clock?.caf ?? (typeof cancelAnimationFrame < "u" ? cancelAnimationFrame : (A) => clearTimeout(A));
  let f = null, p = !1, x, v;
  const m = new Promise((A, D) => {
    x = A, v = D;
  }), h = l.totalSeconds * 1e3, T = c(), E = () => {
    if (p) {
      v(new Error("transition cancelled"));
      return;
    }
    const A = c() - T, D = h > 0 ? Math.min(1, A / h) : 1, y = Io(l, D, (P) => Do(o, P));
    if (e(mi(n, y, t.aspect)), t.onProgress?.(D), D >= 1) {
      x();
      return;
    }
    f = d(E);
  };
  return f = d(E), {
    promise: m,
    cancel() {
      p = !0, f != null && u(f);
    }
  };
}
function Qa(n, e) {
  const t = n.height + e;
  if (t <= 0) return 0;
  const i = e - n.top;
  return Math.max(0, Math.min(1, i / t));
}
function _p() {
  if (typeof matchMedia != "function") return !1;
  try {
    return matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
function vp({ trigger: n, onProgress: e, reducedMotion: t, win: i } = {}) {
  if (!n) throw new Error("scrollspy: trigger element is required");
  if (typeof e != "function") throw new Error("scrollspy: onProgress callback is required");
  const r = i ?? (typeof window < "u" ? window : void 0);
  if (!r) throw new Error("scrollspy: no window available");
  const s = t ?? _p(), a = () => {
    const x = n.getBoundingClientRect(), v = Qa(x, r.innerHeight);
    e(v < 0.5 ? 0 : 1);
  };
  if (s) {
    a();
    const x = () => a();
    return r.addEventListener("scroll", x, { passive: !0 }), r.addEventListener("resize", x, { passive: !0 }), {
      disconnect() {
        r.removeEventListener("scroll", x), r.removeEventListener("resize", x);
      }
    };
  }
  let o = !1, l = null, c = -1;
  const d = () => {
    l = null;
    const x = n.getBoundingClientRect(), v = Qa(x, r.innerHeight);
    v !== c && (c = v, e(v));
  }, u = () => {
    l == null && (l = (r.requestAnimationFrame ?? ((x) => setTimeout(x, 16)))(d));
  }, f = () => {
    o && u();
  };
  let p = null;
  return typeof IntersectionObserver == "function" ? (p = new IntersectionObserver(
    (x) => {
      for (const v of x)
        o = v.isIntersecting, o && u();
    },
    { threshold: [0, 0.01, 0.99, 1] }
  ), p.observe(n)) : o = !0, r.addEventListener("scroll", f, { passive: !0 }), r.addEventListener("resize", f, { passive: !0 }), u(), {
    disconnect() {
      p?.disconnect(), r.removeEventListener("scroll", f), r.removeEventListener("resize", f), l != null && (r.cancelAnimationFrame ?? clearTimeout)(l);
    }
  };
}
const eo = {
  bottom: "left:50%;bottom:6%;transform:translateX(-50%);",
  top: "left:50%;top:6%;transform:translateX(-50%);",
  "bottom-left": "left:5%;bottom:6%;",
  "bottom-right": "right:5%;bottom:6%;",
  "top-left": "left:5%;top:6%;",
  "top-right": "right:5%;top:6%;",
  center: "left:50%;top:50%;transform:translate(-50%,-50%);"
};
let to = !1;
function Sp(n) {
  if (to || !n?.head) return;
  to = !0;
  const e = n.createElement("style");
  e.textContent = `
.vexy-stax-controls{position:absolute;z-index:5;display:flex;gap:8px;pointer-events:none}
.vexy-stax-controls button{
  pointer-events:auto;cursor:pointer;font:inherit;
  font-size:var(--vexy-btn-font,14px);font-weight:var(--vexy-btn-weight,600);letter-spacing:.01em;line-height:1;
  color:var(--vexy-btn-color,#000);
  background:var(--vexy-btn-bg,rgba(0,0,0,0.05));
  -webkit-backdrop-filter:blur(var(--vexy-btn-blur,10px));backdrop-filter:blur(var(--vexy-btn-blur,10px));
  border:var(--vexy-btn-border,1px solid rgba(0,0,0,0.08));
  border-radius:var(--vexy-btn-radius,999px);
  padding:var(--vexy-btn-pad,9px 18px);
  box-shadow:var(--vexy-btn-shadow,0 2px 10px rgba(0,0,0,0.06));
  transition:background .15s,transform .12s;
}
.vexy-stax-controls button:hover{background:var(--vexy-btn-bg-hover,rgba(0,0,0,0.10))}
.vexy-stax-controls button:active{transform:translateY(1px)}
`, n.head.appendChild(e);
}
function Mp(n, e, t = {}) {
  if (!e?.ownerDocument || !e.appendChild) return null;
  const i = e.ownerDocument;
  Sp(i);
  const r = t.type === "pair" ? "pair" : "toggle", s = t.explainLabel ?? "Explain", a = t.previewLabel ?? "Preview", o = t.position && eo[t.position] ? t.position : "bottom";
  e.style && typeof getComputedStyle == "function" && getComputedStyle(e).position === "static" && (e.style.position = "relative");
  const l = i.createElement("div");
  l.className = "vexy-stax-controls", l.setAttribute("style", eo[o] + (t.style ?? ""));
  const c = () => n._currentView === "compact";
  let d;
  if (r === "pair") {
    const f = i.createElement("button");
    f.type = "button", f.textContent = s, f.addEventListener("click", () => {
      c() && n.toggleView();
    });
    const p = i.createElement("button");
    p.type = "button", p.textContent = a, p.addEventListener("click", () => {
      c() || n.toggleView();
    }), l.append(f, p), d = () => {
    };
  } else {
    const f = i.createElement("button");
    f.type = "button", f.addEventListener("click", () => n.toggleView()), l.append(f), d = () => {
      f.textContent = c() ? s : a;
    }, d();
  }
  e.appendChild(l);
  const u = () => d();
  return e.addEventListener("viewchange", u), {
    el: l,
    update: d,
    destroy() {
      e.removeEventListener("viewchange", u), l.remove();
    }
  };
}
var zs = (n, e, t) => {
  if (!e.has(n))
    throw TypeError("Cannot " + t);
}, R = (n, e, t) => (zs(n, e, "read from private field"), t ? t.call(n) : e.get(n)), Ge = (n, e, t) => {
  if (e.has(n))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(n) : e.set(n, t);
}, wt = (n, e, t, i) => (zs(n, e, "write to private field"), e.set(n, t), t), bp = (n, e, t, i) => ({
  set _(r) {
    wt(n, e, r);
  },
  get _() {
    return R(n, e, i);
  }
}), qe = (n, e, t) => (zs(n, e, "access private method"), t), $e = new Uint8Array(8), fn = new DataView($e.buffer), Mt = (n) => [(n % 256 + 256) % 256], Je = (n) => (fn.setUint16(0, n, !1), [$e[0], $e[1]]), yp = (n) => (fn.setInt16(0, n, !1), [$e[0], $e[1]]), Fo = (n) => (fn.setUint32(0, n, !1), [$e[1], $e[2], $e[3]]), pe = (n) => (fn.setUint32(0, n, !1), [$e[0], $e[1], $e[2], $e[3]]), Ep = (n) => (fn.setInt32(0, n, !1), [$e[0], $e[1], $e[2], $e[3]]), Jn = (n) => (fn.setUint32(0, Math.floor(n / 2 ** 32), !1), fn.setUint32(4, n, !1), [$e[0], $e[1], $e[2], $e[3], $e[4], $e[5], $e[6], $e[7]]), Gs = (n) => (fn.setInt16(0, 2 ** 8 * n, !1), [$e[0], $e[1]]), cn = (n) => (fn.setInt32(0, 2 ** 16 * n, !1), [$e[0], $e[1], $e[2], $e[3]]), _s = (n) => (fn.setInt32(0, 2 ** 30 * n, !1), [$e[0], $e[1], $e[2], $e[3]]), Kt = (n, e = !1) => {
  let t = Array(n.length).fill(null).map((i, r) => n.charCodeAt(r));
  return e && t.push(0), t;
}, Ar = (n) => n && n[n.length - 1], Vs = (n) => {
  let e;
  for (let t of n)
    (!e || t.presentationTimestamp > e.presentationTimestamp) && (e = t);
  return e;
}, un = (n, e, t = !0) => {
  let i = n * e;
  return t ? Math.round(i) : i;
}, No = (n) => {
  let e = n * (Math.PI / 180), t = Math.cos(e), i = Math.sin(e);
  return [
    t,
    i,
    0,
    -i,
    t,
    0,
    0,
    0,
    1
  ];
}, Oo = No(0), Bo = (n) => [
  cn(n[0]),
  cn(n[1]),
  _s(n[2]),
  cn(n[3]),
  cn(n[4]),
  _s(n[5]),
  cn(n[6]),
  cn(n[7]),
  _s(n[8])
], Oi = (n) => !n || typeof n != "object" ? n : Array.isArray(n) ? n.map(Oi) : Object.fromEntries(Object.entries(n).map(([e, t]) => [e, Oi(t)])), bi = (n) => n >= 0 && n < 2 ** 32, St = (n, e, t) => ({
  type: n,
  contents: e && new Uint8Array(e.flat(10)),
  children: t
}), dt = (n, e, t, i, r) => St(
  n,
  [Mt(e), Fo(t), i ?? []],
  r
), Tp = (n) => {
  let e = 512;
  return n.fragmented ? St("ftyp", [
    Kt("iso5"),
    // Major brand
    pe(e),
    // Minor version
    // Compatible brands
    Kt("iso5"),
    Kt("iso6"),
    Kt("mp41")
  ]) : St("ftyp", [
    Kt("isom"),
    // Major brand
    pe(e),
    // Minor version
    // Compatible brands
    Kt("isom"),
    n.holdsAvc ? Kt("avc1") : [],
    Kt("mp41")
  ]);
}, ys = (n) => ({ type: "mdat", largeSize: n }), Ap = (n) => ({ type: "free", size: n }), _r = (n, e, t = !1) => St("moov", null, [
  wp(e, n),
  ...n.map((i) => Cp(i, e)),
  t ? sm(n) : null
]), wp = (n, e) => {
  let t = un(Math.max(
    0,
    ...e.filter((a) => a.samples.length > 0).map((a) => {
      const o = Vs(a.samples);
      return o.presentationTimestamp + o.duration;
    })
  ), As), i = Math.max(...e.map((a) => a.id)) + 1, r = !bi(n) || !bi(t), s = r ? Jn : pe;
  return dt("mvhd", +r, 0, [
    s(n),
    // Creation time
    s(n),
    // Modification time
    pe(As),
    // Timescale
    s(t),
    // Duration
    cn(1),
    // Preferred rate
    Gs(1),
    // Preferred volume
    Array(10).fill(0),
    // Reserved
    Bo(Oo),
    // Matrix
    Array(24).fill(0),
    // Pre-defined
    pe(i)
    // Next track ID
  ]);
}, Cp = (n, e) => St("trak", null, [
  Rp(n, e),
  Pp(n, e)
]), Rp = (n, e) => {
  let t = Vs(n.samples), i = un(
    t ? t.presentationTimestamp + t.duration : 0,
    As
  ), r = !bi(e) || !bi(i), s = r ? Jn : pe, a;
  return n.info.type === "video" ? a = typeof n.info.rotation == "number" ? No(n.info.rotation) : n.info.rotation : a = Oo, dt("tkhd", +r, 3, [
    s(e),
    // Creation time
    s(e),
    // Modification time
    pe(n.id),
    // Track ID
    pe(0),
    // Reserved
    s(i),
    // Duration
    Array(8).fill(0),
    // Reserved
    Je(0),
    // Layer
    Je(0),
    // Alternate group
    Gs(n.info.type === "audio" ? 1 : 0),
    // Volume
    Je(0),
    // Reserved
    Bo(a),
    // Matrix
    cn(n.info.type === "video" ? n.info.width : 0),
    // Track width
    cn(n.info.type === "video" ? n.info.height : 0)
    // Track height
  ]);
}, Pp = (n, e) => St("mdia", null, [
  Dp(n, e),
  Lp(n.info.type === "video" ? "vide" : "soun"),
  Up(n)
]), Dp = (n, e) => {
  let t = Vs(n.samples), i = un(
    t ? t.presentationTimestamp + t.duration : 0,
    n.timescale
  ), r = !bi(e) || !bi(i), s = r ? Jn : pe;
  return dt("mdhd", +r, 0, [
    s(e),
    // Creation time
    s(e),
    // Modification time
    pe(n.timescale),
    // Timescale
    s(i),
    // Duration
    Je(21956),
    // Language ("und", undetermined)
    Je(0)
    // Quality
  ]);
}, Lp = (n) => dt("hdlr", 0, 0, [
  Kt("mhlr"),
  // Component type
  Kt(n),
  // Component subtype
  pe(0),
  // Component manufacturer
  pe(0),
  // Component flags
  pe(0),
  // Component flags mask
  Kt("mp4-muxer-hdlr", !0)
  // Component name
]), Up = (n) => St("minf", null, [
  n.info.type === "video" ? Ip() : Fp(),
  Np(),
  zp(n)
]), Ip = () => dt("vmhd", 0, 1, [
  Je(0),
  // Graphics mode
  Je(0),
  // Opcolor R
  Je(0),
  // Opcolor G
  Je(0)
  // Opcolor B
]), Fp = () => dt("smhd", 0, 0, [
  Je(0),
  // Balance
  Je(0)
  // Reserved
]), Np = () => St("dinf", null, [
  Op()
]), Op = () => dt("dref", 0, 0, [
  pe(1)
  // Entry count
], [
  Bp()
]), Bp = () => dt("url ", 0, 1), zp = (n) => {
  const e = n.compositionTimeOffsetTable.length > 1 || n.compositionTimeOffsetTable.some((t) => t.sampleCompositionTimeOffset !== 0);
  return St("stbl", null, [
    Gp(n),
    Qp(n),
    em(n),
    tm(n),
    nm(n),
    im(n),
    e ? rm(n) : null
  ]);
}, Gp = (n) => dt("stsd", 0, 0, [
  pe(1)
  // Entry count
], [
  n.info.type === "video" ? Vp(
    mm[n.info.codec],
    n
  ) : Zp(
    gm[n.info.codec],
    n
  )
]), Vp = (n, e) => St(n, [
  Array(6).fill(0),
  // Reserved
  Je(1),
  // Data reference index
  Je(0),
  // Pre-defined
  Je(0),
  // Reserved
  Array(12).fill(0),
  // Pre-defined
  Je(e.info.width),
  // Width
  Je(e.info.height),
  // Height
  pe(4718592),
  // Horizontal resolution
  pe(4718592),
  // Vertical resolution
  pe(0),
  // Reserved
  Je(1),
  // Frame count
  Array(32).fill(0),
  // Compressor name
  Je(24),
  // Depth
  yp(65535)
  // Pre-defined
], [
  xm[e.info.codec](e),
  e.info.decoderConfig.colorSpace ? Xp(e) : null
]), kp = {
  bt709: 1,
  // ITU-R BT.709
  bt470bg: 5,
  // ITU-R BT.470BG
  smpte170m: 6
  // ITU-R BT.601 525 - SMPTE 170M
}, Hp = {
  bt709: 1,
  // ITU-R BT.709
  smpte170m: 6,
  // SMPTE 170M
  "iec61966-2-1": 13
  // IEC 61966-2-1
}, Wp = {
  rgb: 0,
  // Identity
  bt709: 1,
  // ITU-R BT.709
  bt470bg: 5,
  // ITU-R BT.470BG
  smpte170m: 6
  // SMPTE 170M
}, Xp = (n) => St("colr", [
  Kt("nclx"),
  // Colour type
  Je(kp[n.info.decoderConfig.colorSpace.primaries]),
  // Colour primaries
  Je(Hp[n.info.decoderConfig.colorSpace.transfer]),
  // Transfer characteristics
  Je(Wp[n.info.decoderConfig.colorSpace.matrix]),
  // Matrix coefficients
  Mt((n.info.decoderConfig.colorSpace.fullRange ? 1 : 0) << 7)
  // Full range flag
]), qp = (n) => n.info.decoderConfig && St("avcC", [
  // For AVC, description is an AVCDecoderConfigurationRecord, so nothing else to do here
  ...new Uint8Array(n.info.decoderConfig.description)
]), Yp = (n) => n.info.decoderConfig && St("hvcC", [
  // For HEVC, description is a HEVCDecoderConfigurationRecord, so nothing else to do here
  ...new Uint8Array(n.info.decoderConfig.description)
]), $p = (n) => {
  if (!n.info.decoderConfig)
    return null;
  let e = n.info.decoderConfig;
  if (!e.colorSpace)
    throw new Error("'colorSpace' is required in the decoder config for VP9.");
  let t = e.codec.split("."), i = Number(t[1]), r = Number(t[2]), o = (Number(t[3]) << 4) + (0 << 1) + Number(e.colorSpace.fullRange);
  return dt("vpcC", 1, 0, [
    Mt(i),
    // Profile
    Mt(r),
    // Level
    Mt(o),
    // Bit depth, chroma subsampling, full range
    Mt(2),
    // Colour primaries
    Mt(2),
    // Transfer characteristics
    Mt(2),
    // Matrix coefficients
    Je(0)
    // Codec initialization data size
  ]);
}, Kp = () => {
  let t = (1 << 7) + 1;
  return St("av1C", [
    t,
    0,
    0,
    0
  ]);
}, Zp = (n, e) => St(n, [
  Array(6).fill(0),
  // Reserved
  Je(1),
  // Data reference index
  Je(0),
  // Version
  Je(0),
  // Revision level
  pe(0),
  // Vendor
  Je(e.info.numberOfChannels),
  // Number of channels
  Je(16),
  // Sample size (bits)
  Je(0),
  // Compression ID
  Je(0),
  // Packet size
  cn(e.info.sampleRate)
  // Sample rate
], [
  _m[e.info.codec](e)
]), jp = (n) => {
  let e = new Uint8Array(n.info.decoderConfig.description);
  return dt("esds", 0, 0, [
    // https://stackoverflow.com/a/54803118
    pe(58753152),
    // TAG(3) = Object Descriptor ([2])
    Mt(32 + e.byteLength),
    // length of this OD (which includes the next 2 tags)
    Je(1),
    // ES_ID = 1
    Mt(0),
    // flags etc = 0
    pe(75530368),
    // TAG(4) = ES Descriptor ([2]) embedded in above OD
    Mt(18 + e.byteLength),
    // length of this ESD
    Mt(64),
    // MPEG-4 Audio
    Mt(21),
    // stream type(6bits)=5 audio, flags(2bits)=1
    Fo(0),
    // 24bit buffer size
    pe(130071),
    // max bitrate
    pe(130071),
    // avg bitrate
    pe(92307584),
    // TAG(5) = ASC ([2],[3]) embedded in above OD
    Mt(e.byteLength),
    // length
    ...e,
    pe(109084800),
    // TAG(6)
    Mt(1),
    // length
    Mt(2)
    // data
  ]);
}, Jp = (n) => {
  let e = 3840, t = 0;
  const i = n.info.decoderConfig?.description;
  if (i) {
    if (i.byteLength < 18)
      throw new TypeError("Invalid decoder description provided for Opus; must be at least 18 bytes long.");
    const r = ArrayBuffer.isView(i) ? new DataView(i.buffer, i.byteOffset, i.byteLength) : new DataView(i);
    e = r.getUint16(10, !0), t = r.getInt16(14, !0);
  }
  return St("dOps", [
    Mt(0),
    // Version
    Mt(n.info.numberOfChannels),
    // OutputChannelCount
    Je(e),
    pe(n.info.sampleRate),
    // InputSampleRate
    Gs(t),
    // OutputGain
    Mt(0)
    // ChannelMappingFamily
  ]);
}, Qp = (n) => dt("stts", 0, 0, [
  pe(n.timeToSampleTable.length),
  // Number of entries
  n.timeToSampleTable.map((e) => [
    // Time-to-sample table
    pe(e.sampleCount),
    // Sample count
    pe(e.sampleDelta)
    // Sample duration
  ])
]), em = (n) => {
  if (n.samples.every((t) => t.type === "key"))
    return null;
  let e = [...n.samples.entries()].filter(([, t]) => t.type === "key");
  return dt("stss", 0, 0, [
    pe(e.length),
    // Number of entries
    e.map(([t]) => pe(t + 1))
    // Sync sample table
  ]);
}, tm = (n) => dt("stsc", 0, 0, [
  pe(n.compactlyCodedChunkTable.length),
  // Number of entries
  n.compactlyCodedChunkTable.map((e) => [
    // Sample-to-chunk table
    pe(e.firstChunk),
    // First chunk
    pe(e.samplesPerChunk),
    // Samples per chunk
    pe(1)
    // Sample description index
  ])
]), nm = (n) => dt("stsz", 0, 0, [
  pe(0),
  // Sample size (0 means non-constant size)
  pe(n.samples.length),
  // Number of entries
  n.samples.map((e) => pe(e.size))
  // Sample size table
]), im = (n) => n.finalizedChunks.length > 0 && Ar(n.finalizedChunks).offset >= 2 ** 32 ? dt("co64", 0, 0, [
  pe(n.finalizedChunks.length),
  // Number of entries
  n.finalizedChunks.map((e) => Jn(e.offset))
  // Chunk offset table
]) : dt("stco", 0, 0, [
  pe(n.finalizedChunks.length),
  // Number of entries
  n.finalizedChunks.map((e) => pe(e.offset))
  // Chunk offset table
]), rm = (n) => dt("ctts", 0, 0, [
  pe(n.compositionTimeOffsetTable.length),
  // Number of entries
  n.compositionTimeOffsetTable.map((e) => [
    // Time-to-sample table
    pe(e.sampleCount),
    // Sample count
    pe(e.sampleCompositionTimeOffset)
    // Sample offset
  ])
]), sm = (n) => St("mvex", null, n.map(am)), am = (n) => dt("trex", 0, 0, [
  pe(n.id),
  // Track ID
  pe(1),
  // Default sample description index
  pe(0),
  // Default sample duration
  pe(0),
  // Default sample size
  pe(0)
  // Default sample flags
]), no = (n, e) => St("moof", null, [
  om(n),
  ...e.map(lm)
]), om = (n) => dt("mfhd", 0, 0, [
  pe(n)
  // Sequence number
]), zo = (n) => {
  let e = 0, t = 0, i = 0, r = 0, s = n.type === "delta";
  return t |= +s, s ? e |= 1 : e |= 2, e << 24 | t << 16 | i << 8 | r;
}, lm = (n) => St("traf", null, [
  cm(n),
  dm(n),
  um(n)
]), cm = (n) => {
  let e = 0;
  e |= 8, e |= 16, e |= 32, e |= 131072;
  let t = n.currentChunk.samples[1] ?? n.currentChunk.samples[0], i = {
    duration: t.timescaleUnitsToNextSample,
    size: t.size,
    flags: zo(t)
  };
  return dt("tfhd", 0, e, [
    pe(n.id),
    // Track ID
    pe(i.duration),
    // Default sample duration
    pe(i.size),
    // Default sample size
    pe(i.flags)
    // Default sample flags
  ]);
}, dm = (n) => dt("tfdt", 1, 0, [
  Jn(un(n.currentChunk.startTimestamp, n.timescale))
  // Base Media Decode Time
]), um = (n) => {
  let e = n.currentChunk.samples.map((v) => v.timescaleUnitsToNextSample), t = n.currentChunk.samples.map((v) => v.size), i = n.currentChunk.samples.map(zo), r = n.currentChunk.samples.map((v) => un(v.presentationTimestamp - v.decodeTimestamp, n.timescale)), s = new Set(e), a = new Set(t), o = new Set(i), l = new Set(r), c = o.size === 2 && i[0] !== i[1], d = s.size > 1, u = a.size > 1, f = !c && o.size > 1, p = l.size > 1 || [...l].some((v) => v !== 0), x = 0;
  return x |= 1, x |= 4 * +c, x |= 256 * +d, x |= 512 * +u, x |= 1024 * +f, x |= 2048 * +p, dt("trun", 1, x, [
    pe(n.currentChunk.samples.length),
    // Sample count
    pe(n.currentChunk.offset - n.currentChunk.moofOffset || 0),
    // Data offset
    c ? pe(i[0]) : [],
    n.currentChunk.samples.map((v, m) => [
      d ? pe(e[m]) : [],
      // Sample duration
      u ? pe(t[m]) : [],
      // Sample size
      f ? pe(i[m]) : [],
      // Sample flags
      // Sample composition time offsets
      p ? Ep(r[m]) : []
    ])
  ]);
}, fm = (n) => St("mfra", null, [
  ...n.map(hm),
  pm()
]), hm = (n, e) => dt("tfra", 1, 0, [
  pe(n.id),
  // Track ID
  pe(63),
  // This specifies that traf number, trun number and sample number are 32-bit ints
  pe(n.finalizedChunks.length),
  // Number of entries
  n.finalizedChunks.map((i) => [
    Jn(un(i.startTimestamp, n.timescale)),
    // Time
    Jn(i.moofOffset),
    // moof offset
    pe(e + 1),
    // traf number
    pe(1),
    // trun number
    pe(1)
    // Sample number
  ])
]), pm = () => dt("mfro", 0, 0, [
  // This value needs to be overwritten manually from the outside, where the actual size of the enclosing mfra box
  // is known
  pe(0)
  // Size
]), mm = {
  avc: "avc1",
  hevc: "hvc1",
  vp9: "vp09",
  av1: "av01"
}, xm = {
  avc: qp,
  hevc: Yp,
  vp9: $p,
  av1: Kp
}, gm = {
  aac: "mp4a",
  opus: "Opus"
}, _m = {
  aac: jp,
  opus: Jp
}, Nr = class {
}, Go = class extends Nr {
  constructor() {
    super(...arguments), this.buffer = null;
  }
}, Vo = class extends Nr {
  constructor(n) {
    if (super(), this.options = n, typeof n != "object")
      throw new TypeError("StreamTarget requires an options object to be passed to its constructor.");
    if (n.onData) {
      if (typeof n.onData != "function")
        throw new TypeError("options.onData, when provided, must be a function.");
      if (n.onData.length < 2)
        throw new TypeError(
          "options.onData, when provided, must be a function that takes in at least two arguments (data and position). Ignoring the position argument, which specifies the byte offset at which the data is to be written, can lead to broken outputs."
        );
    }
    if (n.chunked !== void 0 && typeof n.chunked != "boolean")
      throw new TypeError("options.chunked, when provided, must be a boolean.");
    if (n.chunkSize !== void 0 && (!Number.isInteger(n.chunkSize) || n.chunkSize < 1024))
      throw new TypeError("options.chunkSize, when provided, must be an integer and not smaller than 1024.");
  }
}, vm = class extends Nr {
  constructor(n, e) {
    if (super(), this.stream = n, this.options = e, !(n instanceof FileSystemWritableFileStream))
      throw new TypeError("FileSystemWritableFileStreamTarget requires a FileSystemWritableFileStream instance.");
    if (e !== void 0 && typeof e != "object")
      throw new TypeError("FileSystemWritableFileStreamTarget's options, when provided, must be an object.");
    if (e && e.chunkSize !== void 0 && (!Number.isInteger(e.chunkSize) || e.chunkSize <= 0))
      throw new TypeError("options.chunkSize, when provided, must be a positive integer");
  }
}, kn, xi, ko = class {
  constructor() {
    this.pos = 0, Ge(this, kn, new Uint8Array(8)), Ge(this, xi, new DataView(R(this, kn).buffer)), this.offsets = /* @__PURE__ */ new WeakMap();
  }
  /** Sets the current position for future writes to a new one. */
  seek(n) {
    this.pos = n;
  }
  writeU32(n) {
    R(this, xi).setUint32(0, n, !1), this.write(R(this, kn).subarray(0, 4));
  }
  writeU64(n) {
    R(this, xi).setUint32(0, Math.floor(n / 2 ** 32), !1), R(this, xi).setUint32(4, n, !1), this.write(R(this, kn).subarray(0, 8));
  }
  writeAscii(n) {
    for (let e = 0; e < n.length; e++)
      R(this, xi).setUint8(e % 8, n.charCodeAt(e)), e % 8 === 7 && this.write(R(this, kn));
    n.length % 8 !== 0 && this.write(R(this, kn).subarray(0, n.length % 8));
  }
  writeBox(n) {
    if (this.offsets.set(n, this.pos), n.contents && !n.children)
      this.writeBoxHeader(n, n.size ?? n.contents.byteLength + 8), this.write(n.contents);
    else {
      let e = this.pos;
      if (this.writeBoxHeader(n, 0), n.contents && this.write(n.contents), n.children)
        for (let r of n.children)
          r && this.writeBox(r);
      let t = this.pos, i = n.size ?? t - e;
      this.seek(e), this.writeBoxHeader(n, i), this.seek(t);
    }
  }
  writeBoxHeader(n, e) {
    this.writeU32(n.largeSize ? 1 : e), this.writeAscii(n.type), n.largeSize && this.writeU64(e);
  }
  measureBoxHeader(n) {
    return 8 + (n.largeSize ? 8 : 0);
  }
  patchBox(n) {
    let e = this.pos;
    this.seek(this.offsets.get(n)), this.writeBox(n), this.seek(e);
  }
  measureBox(n) {
    if (n.contents && !n.children)
      return this.measureBoxHeader(n) + n.contents.byteLength;
    {
      let e = this.measureBoxHeader(n);
      if (n.contents && (e += n.contents.byteLength), n.children)
        for (let t of n.children)
          t && (e += this.measureBox(t));
      return e;
    }
  }
};
kn = /* @__PURE__ */ new WeakMap();
xi = /* @__PURE__ */ new WeakMap();
var vr, Zn, Wi, Fi, Sr, Es, Sm = class extends ko {
  constructor(n) {
    super(), Ge(this, Sr), Ge(this, vr, void 0), Ge(this, Zn, new ArrayBuffer(2 ** 16)), Ge(this, Wi, new Uint8Array(R(this, Zn))), Ge(this, Fi, 0), wt(this, vr, n);
  }
  write(n) {
    qe(this, Sr, Es).call(this, this.pos + n.byteLength), R(this, Wi).set(n, this.pos), this.pos += n.byteLength, wt(this, Fi, Math.max(R(this, Fi), this.pos));
  }
  finalize() {
    qe(this, Sr, Es).call(this, this.pos), R(this, vr).buffer = R(this, Zn).slice(0, Math.max(R(this, Fi), this.pos));
  }
};
vr = /* @__PURE__ */ new WeakMap();
Zn = /* @__PURE__ */ new WeakMap();
Wi = /* @__PURE__ */ new WeakMap();
Fi = /* @__PURE__ */ new WeakMap();
Sr = /* @__PURE__ */ new WeakSet();
Es = function(n) {
  let e = R(this, Zn).byteLength;
  for (; e < n; )
    e *= 2;
  if (e === R(this, Zn).byteLength)
    return;
  let t = new ArrayBuffer(e), i = new Uint8Array(t);
  i.set(R(this, Wi), 0), wt(this, Zn, t), wt(this, Wi, i);
};
var Mm = 2 ** 24, bm = 2, Bi, Hn, Ni, bn, Wt, wr, Ts, ks, Ho, Hs, Wo, zi, Cr, Ws = class extends ko {
  constructor(n) {
    super(), Ge(this, wr), Ge(this, ks), Ge(this, Hs), Ge(this, zi), Ge(this, Bi, void 0), Ge(this, Hn, []), Ge(this, Ni, void 0), Ge(this, bn, void 0), Ge(this, Wt, []), wt(this, Bi, n), wt(this, Ni, n.options?.chunked ?? !1), wt(this, bn, n.options?.chunkSize ?? Mm);
  }
  write(n) {
    R(this, Hn).push({
      data: n.slice(),
      start: this.pos
    }), this.pos += n.byteLength;
  }
  flush() {
    if (R(this, Hn).length === 0)
      return;
    let n = [], e = [...R(this, Hn)].sort((t, i) => t.start - i.start);
    n.push({
      start: e[0].start,
      size: e[0].data.byteLength
    });
    for (let t = 1; t < e.length; t++) {
      let i = n[n.length - 1], r = e[t];
      r.start <= i.start + i.size ? i.size = Math.max(i.size, r.start + r.data.byteLength - i.start) : n.push({
        start: r.start,
        size: r.data.byteLength
      });
    }
    for (let t of n) {
      t.data = new Uint8Array(t.size);
      for (let i of R(this, Hn))
        t.start <= i.start && i.start < t.start + t.size && t.data.set(i.data, i.start - t.start);
      R(this, Ni) ? (qe(this, wr, Ts).call(this, t.data, t.start), qe(this, zi, Cr).call(this)) : R(this, Bi).options.onData?.(t.data, t.start);
    }
    R(this, Hn).length = 0;
  }
  finalize() {
    R(this, Ni) && qe(this, zi, Cr).call(this, !0);
  }
};
Bi = /* @__PURE__ */ new WeakMap();
Hn = /* @__PURE__ */ new WeakMap();
Ni = /* @__PURE__ */ new WeakMap();
bn = /* @__PURE__ */ new WeakMap();
Wt = /* @__PURE__ */ new WeakMap();
wr = /* @__PURE__ */ new WeakSet();
Ts = function(n, e) {
  let t = R(this, Wt).findIndex((o) => o.start <= e && e < o.start + R(this, bn));
  t === -1 && (t = qe(this, Hs, Wo).call(this, e));
  let i = R(this, Wt)[t], r = e - i.start, s = n.subarray(0, Math.min(R(this, bn) - r, n.byteLength));
  i.data.set(s, r);
  let a = {
    start: r,
    end: r + s.byteLength
  };
  if (qe(this, ks, Ho).call(this, i, a), i.written[0].start === 0 && i.written[0].end === R(this, bn) && (i.shouldFlush = !0), R(this, Wt).length > bm) {
    for (let o = 0; o < R(this, Wt).length - 1; o++)
      R(this, Wt)[o].shouldFlush = !0;
    qe(this, zi, Cr).call(this);
  }
  s.byteLength < n.byteLength && qe(this, wr, Ts).call(this, n.subarray(s.byteLength), e + s.byteLength);
};
ks = /* @__PURE__ */ new WeakSet();
Ho = function(n, e) {
  let t = 0, i = n.written.length - 1, r = -1;
  for (; t <= i; ) {
    let s = Math.floor(t + (i - t + 1) / 2);
    n.written[s].start <= e.start ? (t = s + 1, r = s) : i = s - 1;
  }
  for (n.written.splice(r + 1, 0, e), (r === -1 || n.written[r].end < e.start) && r++; r < n.written.length - 1 && n.written[r].end >= n.written[r + 1].start; )
    n.written[r].end = Math.max(n.written[r].end, n.written[r + 1].end), n.written.splice(r + 1, 1);
};
Hs = /* @__PURE__ */ new WeakSet();
Wo = function(n) {
  let t = {
    start: Math.floor(n / R(this, bn)) * R(this, bn),
    data: new Uint8Array(R(this, bn)),
    written: [],
    shouldFlush: !1
  };
  return R(this, Wt).push(t), R(this, Wt).sort((i, r) => i.start - r.start), R(this, Wt).indexOf(t);
};
zi = /* @__PURE__ */ new WeakSet();
Cr = function(n = !1) {
  for (let e = 0; e < R(this, Wt).length; e++) {
    let t = R(this, Wt)[e];
    if (!(!t.shouldFlush && !n)) {
      for (let i of t.written)
        R(this, Bi).options.onData?.(
          t.data.subarray(i.start, i.end),
          t.start + i.start
        );
      R(this, Wt).splice(e--, 1);
    }
  }
};
var ym = class extends Ws {
  constructor(n) {
    super(new Vo({
      onData: (e, t) => n.stream.write({
        type: "write",
        data: e,
        position: t
      }),
      chunked: !0,
      chunkSize: n.options?.chunkSize
    }));
  }
}, As = 1e3, Em = ["avc", "hevc", "vp9", "av1"], Tm = ["aac", "opus"], Am = 2082844800, wm = ["strict", "offset", "cross-track-offset"], ye, De, Rr, Ht, Rt, At, gi, vi, Xs, Wn, Xn, Gi, ws, Xo, Cs, qo, qs, Yo, Rs, $o, Ys, Ko, Mr, Ps, on, vn, $s, Zo, Vi, Pr, Dr, Ks, yi, Ki, br, Ds, Cm = class {
  constructor(n) {
    if (Ge(this, ws), Ge(this, Cs), Ge(this, qs), Ge(this, Rs), Ge(this, Ys), Ge(this, Mr), Ge(this, on), Ge(this, $s), Ge(this, Vi), Ge(this, Dr), Ge(this, yi), Ge(this, br), Ge(this, ye, void 0), Ge(this, De, void 0), Ge(this, Rr, void 0), Ge(this, Ht, void 0), Ge(this, Rt, null), Ge(this, At, null), Ge(this, gi, Math.floor(Date.now() / 1e3) + Am), Ge(this, vi, []), Ge(this, Xs, 1), Ge(this, Wn, []), Ge(this, Xn, []), Ge(this, Gi, !1), qe(this, ws, Xo).call(this, n), n.video = Oi(n.video), n.audio = Oi(n.audio), n.fastStart = Oi(n.fastStart), this.target = n.target, wt(this, ye, {
      firstTimestampBehavior: "strict",
      ...n
    }), n.target instanceof Go)
      wt(this, De, new Sm(n.target));
    else if (n.target instanceof Vo)
      wt(this, De, new Ws(n.target));
    else if (n.target instanceof vm)
      wt(this, De, new ym(n.target));
    else
      throw new Error(`Invalid target: ${n.target}`);
    qe(this, Rs, $o).call(this), qe(this, Cs, qo).call(this);
  }
  addVideoChunk(n, e, t, i) {
    if (!(n instanceof EncodedVideoChunk))
      throw new TypeError("addVideoChunk's first argument (sample) must be of type EncodedVideoChunk.");
    if (e && typeof e != "object")
      throw new TypeError("addVideoChunk's second argument (meta), when provided, must be an object.");
    if (t !== void 0 && (!Number.isFinite(t) || t < 0))
      throw new TypeError(
        "addVideoChunk's third argument (timestamp), when provided, must be a non-negative real number."
      );
    if (i !== void 0 && !Number.isFinite(i))
      throw new TypeError(
        "addVideoChunk's fourth argument (compositionTimeOffset), when provided, must be a real number."
      );
    let r = new Uint8Array(n.byteLength);
    n.copyTo(r), this.addVideoChunkRaw(
      r,
      n.type,
      t ?? n.timestamp,
      n.duration,
      e,
      i
    );
  }
  addVideoChunkRaw(n, e, t, i, r, s) {
    if (!(n instanceof Uint8Array))
      throw new TypeError("addVideoChunkRaw's first argument (data) must be an instance of Uint8Array.");
    if (e !== "key" && e !== "delta")
      throw new TypeError("addVideoChunkRaw's second argument (type) must be either 'key' or 'delta'.");
    if (!Number.isFinite(t) || t < 0)
      throw new TypeError("addVideoChunkRaw's third argument (timestamp) must be a non-negative real number.");
    if (!Number.isFinite(i) || i < 0)
      throw new TypeError("addVideoChunkRaw's fourth argument (duration) must be a non-negative real number.");
    if (r && typeof r != "object")
      throw new TypeError("addVideoChunkRaw's fifth argument (meta), when provided, must be an object.");
    if (s !== void 0 && !Number.isFinite(s))
      throw new TypeError(
        "addVideoChunkRaw's sixth argument (compositionTimeOffset), when provided, must be a real number."
      );
    if (qe(this, br, Ds).call(this), !R(this, ye).video)
      throw new Error("No video track declared.");
    if (typeof R(this, ye).fastStart == "object" && R(this, Rt).samples.length === R(this, ye).fastStart.expectedVideoChunks)
      throw new Error(`Cannot add more video chunks than specified in 'fastStart' (${R(this, ye).fastStart.expectedVideoChunks}).`);
    let a = qe(this, Mr, Ps).call(this, R(this, Rt), n, e, t, i, r, s);
    if (R(this, ye).fastStart === "fragmented" && R(this, At)) {
      for (; R(this, Xn).length > 0 && R(this, Xn)[0].decodeTimestamp <= a.decodeTimestamp; ) {
        let o = R(this, Xn).shift();
        qe(this, on, vn).call(this, R(this, At), o);
      }
      a.decodeTimestamp <= R(this, At).lastDecodeTimestamp ? qe(this, on, vn).call(this, R(this, Rt), a) : R(this, Wn).push(a);
    } else
      qe(this, on, vn).call(this, R(this, Rt), a);
  }
  addAudioChunk(n, e, t) {
    if (!(n instanceof EncodedAudioChunk))
      throw new TypeError("addAudioChunk's first argument (sample) must be of type EncodedAudioChunk.");
    if (e && typeof e != "object")
      throw new TypeError("addAudioChunk's second argument (meta), when provided, must be an object.");
    if (t !== void 0 && (!Number.isFinite(t) || t < 0))
      throw new TypeError(
        "addAudioChunk's third argument (timestamp), when provided, must be a non-negative real number."
      );
    let i = new Uint8Array(n.byteLength);
    n.copyTo(i), this.addAudioChunkRaw(i, n.type, t ?? n.timestamp, n.duration, e);
  }
  addAudioChunkRaw(n, e, t, i, r) {
    if (!(n instanceof Uint8Array))
      throw new TypeError("addAudioChunkRaw's first argument (data) must be an instance of Uint8Array.");
    if (e !== "key" && e !== "delta")
      throw new TypeError("addAudioChunkRaw's second argument (type) must be either 'key' or 'delta'.");
    if (!Number.isFinite(t) || t < 0)
      throw new TypeError("addAudioChunkRaw's third argument (timestamp) must be a non-negative real number.");
    if (!Number.isFinite(i) || i < 0)
      throw new TypeError("addAudioChunkRaw's fourth argument (duration) must be a non-negative real number.");
    if (r && typeof r != "object")
      throw new TypeError("addAudioChunkRaw's fifth argument (meta), when provided, must be an object.");
    if (qe(this, br, Ds).call(this), !R(this, ye).audio)
      throw new Error("No audio track declared.");
    if (typeof R(this, ye).fastStart == "object" && R(this, At).samples.length === R(this, ye).fastStart.expectedAudioChunks)
      throw new Error(`Cannot add more audio chunks than specified in 'fastStart' (${R(this, ye).fastStart.expectedAudioChunks}).`);
    let s = qe(this, Mr, Ps).call(this, R(this, At), n, e, t, i, r);
    if (R(this, ye).fastStart === "fragmented" && R(this, Rt)) {
      for (; R(this, Wn).length > 0 && R(this, Wn)[0].decodeTimestamp <= s.decodeTimestamp; ) {
        let a = R(this, Wn).shift();
        qe(this, on, vn).call(this, R(this, Rt), a);
      }
      s.decodeTimestamp <= R(this, Rt).lastDecodeTimestamp ? qe(this, on, vn).call(this, R(this, At), s) : R(this, Xn).push(s);
    } else
      qe(this, on, vn).call(this, R(this, At), s);
  }
  /** Finalizes the file, making it ready for use. Must be called after all video and audio chunks have been added. */
  finalize() {
    if (R(this, Gi))
      throw new Error("Cannot finalize a muxer more than once.");
    if (R(this, ye).fastStart === "fragmented") {
      for (let e of R(this, Wn))
        qe(this, on, vn).call(this, R(this, Rt), e);
      for (let e of R(this, Xn))
        qe(this, on, vn).call(this, R(this, At), e);
      qe(this, Dr, Ks).call(this, !1);
    } else
      R(this, Rt) && qe(this, Vi, Pr).call(this, R(this, Rt)), R(this, At) && qe(this, Vi, Pr).call(this, R(this, At));
    let n = [R(this, Rt), R(this, At)].filter(Boolean);
    if (R(this, ye).fastStart === "in-memory") {
      let e;
      for (let i = 0; i < 2; i++) {
        let r = _r(n, R(this, gi)), s = R(this, De).measureBox(r);
        e = R(this, De).measureBox(R(this, Ht));
        let a = R(this, De).pos + s + e;
        for (let o of R(this, vi)) {
          o.offset = a;
          for (let { data: l } of o.samples)
            a += l.byteLength, e += l.byteLength;
        }
        if (a < 2 ** 32)
          break;
        e >= 2 ** 32 && (R(this, Ht).largeSize = !0);
      }
      let t = _r(n, R(this, gi));
      R(this, De).writeBox(t), R(this, Ht).size = e, R(this, De).writeBox(R(this, Ht));
      for (let i of R(this, vi))
        for (let r of i.samples)
          R(this, De).write(r.data), r.data = null;
    } else if (R(this, ye).fastStart === "fragmented") {
      let e = R(this, De).pos, t = fm(n);
      R(this, De).writeBox(t);
      let i = R(this, De).pos - e;
      R(this, De).seek(R(this, De).pos - 4), R(this, De).writeU32(i);
    } else {
      let e = R(this, De).offsets.get(R(this, Ht)), t = R(this, De).pos - e;
      R(this, Ht).size = t, R(this, Ht).largeSize = t >= 2 ** 32, R(this, De).patchBox(R(this, Ht));
      let i = _r(n, R(this, gi));
      if (typeof R(this, ye).fastStart == "object") {
        R(this, De).seek(R(this, Rr)), R(this, De).writeBox(i);
        let r = e - R(this, De).pos;
        R(this, De).writeBox(Ap(r));
      } else
        R(this, De).writeBox(i);
    }
    qe(this, yi, Ki).call(this), R(this, De).finalize(), wt(this, Gi, !0);
  }
};
ye = /* @__PURE__ */ new WeakMap();
De = /* @__PURE__ */ new WeakMap();
Rr = /* @__PURE__ */ new WeakMap();
Ht = /* @__PURE__ */ new WeakMap();
Rt = /* @__PURE__ */ new WeakMap();
At = /* @__PURE__ */ new WeakMap();
gi = /* @__PURE__ */ new WeakMap();
vi = /* @__PURE__ */ new WeakMap();
Xs = /* @__PURE__ */ new WeakMap();
Wn = /* @__PURE__ */ new WeakMap();
Xn = /* @__PURE__ */ new WeakMap();
Gi = /* @__PURE__ */ new WeakMap();
ws = /* @__PURE__ */ new WeakSet();
Xo = function(n) {
  if (typeof n != "object")
    throw new TypeError("The muxer requires an options object to be passed to its constructor.");
  if (!(n.target instanceof Nr))
    throw new TypeError("The target must be provided and an instance of Target.");
  if (n.video) {
    if (!Em.includes(n.video.codec))
      throw new TypeError(`Unsupported video codec: ${n.video.codec}`);
    if (!Number.isInteger(n.video.width) || n.video.width <= 0)
      throw new TypeError(`Invalid video width: ${n.video.width}. Must be a positive integer.`);
    if (!Number.isInteger(n.video.height) || n.video.height <= 0)
      throw new TypeError(`Invalid video height: ${n.video.height}. Must be a positive integer.`);
    const e = n.video.rotation;
    if (typeof e == "number" && ![0, 90, 180, 270].includes(e))
      throw new TypeError(`Invalid video rotation: ${e}. Has to be 0, 90, 180 or 270.`);
    if (Array.isArray(e) && (e.length !== 9 || e.some((t) => typeof t != "number")))
      throw new TypeError(`Invalid video transformation matrix: ${e.join()}`);
    if (n.video.frameRate !== void 0 && (!Number.isInteger(n.video.frameRate) || n.video.frameRate <= 0))
      throw new TypeError(
        `Invalid video frame rate: ${n.video.frameRate}. Must be a positive integer.`
      );
  }
  if (n.audio) {
    if (!Tm.includes(n.audio.codec))
      throw new TypeError(`Unsupported audio codec: ${n.audio.codec}`);
    if (!Number.isInteger(n.audio.numberOfChannels) || n.audio.numberOfChannels <= 0)
      throw new TypeError(
        `Invalid number of audio channels: ${n.audio.numberOfChannels}. Must be a positive integer.`
      );
    if (!Number.isInteger(n.audio.sampleRate) || n.audio.sampleRate <= 0)
      throw new TypeError(
        `Invalid audio sample rate: ${n.audio.sampleRate}. Must be a positive integer.`
      );
  }
  if (n.firstTimestampBehavior && !wm.includes(n.firstTimestampBehavior))
    throw new TypeError(`Invalid first timestamp behavior: ${n.firstTimestampBehavior}`);
  if (typeof n.fastStart == "object") {
    if (n.video) {
      if (n.fastStart.expectedVideoChunks === void 0)
        throw new TypeError("'fastStart' is an object but is missing property 'expectedVideoChunks'.");
      if (!Number.isInteger(n.fastStart.expectedVideoChunks) || n.fastStart.expectedVideoChunks < 0)
        throw new TypeError("'expectedVideoChunks' must be a non-negative integer.");
    }
    if (n.audio) {
      if (n.fastStart.expectedAudioChunks === void 0)
        throw new TypeError("'fastStart' is an object but is missing property 'expectedAudioChunks'.");
      if (!Number.isInteger(n.fastStart.expectedAudioChunks) || n.fastStart.expectedAudioChunks < 0)
        throw new TypeError("'expectedAudioChunks' must be a non-negative integer.");
    }
  } else if (![!1, "in-memory", "fragmented"].includes(n.fastStart))
    throw new TypeError("'fastStart' option must be false, 'in-memory', 'fragmented' or an object.");
  if (n.minFragmentDuration !== void 0 && (!Number.isFinite(n.minFragmentDuration) || n.minFragmentDuration < 0))
    throw new TypeError("'minFragmentDuration' must be a non-negative number.");
};
Cs = /* @__PURE__ */ new WeakSet();
qo = function() {
  if (R(this, De).writeBox(Tp({
    holdsAvc: R(this, ye).video?.codec === "avc",
    fragmented: R(this, ye).fastStart === "fragmented"
  })), wt(this, Rr, R(this, De).pos), R(this, ye).fastStart === "in-memory")
    wt(this, Ht, ys(!1));
  else if (R(this, ye).fastStart !== "fragmented") {
    if (typeof R(this, ye).fastStart == "object") {
      let n = qe(this, qs, Yo).call(this);
      R(this, De).seek(R(this, De).pos + n);
    }
    wt(this, Ht, ys(!0)), R(this, De).writeBox(R(this, Ht));
  }
  qe(this, yi, Ki).call(this);
};
qs = /* @__PURE__ */ new WeakSet();
Yo = function() {
  if (typeof R(this, ye).fastStart != "object")
    return;
  let n = 0, e = [
    R(this, ye).fastStart.expectedVideoChunks,
    R(this, ye).fastStart.expectedAudioChunks
  ];
  for (let t of e)
    t && (n += 8 * Math.ceil(2 / 3 * t), n += 4 * t, n += 12 * Math.ceil(2 / 3 * t), n += 4 * t, n += 8 * t);
  return n += 4096, n;
};
Rs = /* @__PURE__ */ new WeakSet();
$o = function() {
  if (R(this, ye).video && wt(this, Rt, {
    id: 1,
    info: {
      type: "video",
      codec: R(this, ye).video.codec,
      width: R(this, ye).video.width,
      height: R(this, ye).video.height,
      rotation: R(this, ye).video.rotation ?? 0,
      decoderConfig: null
    },
    // The fallback contains many common frame rates as factors
    timescale: R(this, ye).video.frameRate ?? 57600,
    samples: [],
    finalizedChunks: [],
    currentChunk: null,
    firstDecodeTimestamp: void 0,
    lastDecodeTimestamp: -1,
    timeToSampleTable: [],
    compositionTimeOffsetTable: [],
    lastTimescaleUnits: null,
    lastSample: null,
    compactlyCodedChunkTable: []
  }), R(this, ye).audio && (wt(this, At, {
    id: R(this, ye).video ? 2 : 1,
    info: {
      type: "audio",
      codec: R(this, ye).audio.codec,
      numberOfChannels: R(this, ye).audio.numberOfChannels,
      sampleRate: R(this, ye).audio.sampleRate,
      decoderConfig: null
    },
    timescale: R(this, ye).audio.sampleRate,
    samples: [],
    finalizedChunks: [],
    currentChunk: null,
    firstDecodeTimestamp: void 0,
    lastDecodeTimestamp: -1,
    timeToSampleTable: [],
    compositionTimeOffsetTable: [],
    lastTimescaleUnits: null,
    lastSample: null,
    compactlyCodedChunkTable: []
  }), R(this, ye).audio.codec === "aac")) {
    let n = qe(this, Ys, Ko).call(
      this,
      2,
      // Object type for AAC-LC, since it's the most common
      R(this, ye).audio.sampleRate,
      R(this, ye).audio.numberOfChannels
    );
    R(this, At).info.decoderConfig = {
      codec: R(this, ye).audio.codec,
      description: n,
      numberOfChannels: R(this, ye).audio.numberOfChannels,
      sampleRate: R(this, ye).audio.sampleRate
    };
  }
};
Ys = /* @__PURE__ */ new WeakSet();
Ko = function(n, e, t) {
  let r = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350].indexOf(e), s = t, a = "";
  a += n.toString(2).padStart(5, "0"), a += r.toString(2).padStart(4, "0"), r === 15 && (a += e.toString(2).padStart(24, "0")), a += s.toString(2).padStart(4, "0");
  let o = Math.ceil(a.length / 8) * 8;
  a = a.padEnd(o, "0");
  let l = new Uint8Array(a.length / 8);
  for (let c = 0; c < a.length; c += 8)
    l[c / 8] = parseInt(a.slice(c, c + 8), 2);
  return l;
};
Mr = /* @__PURE__ */ new WeakSet();
Ps = function(n, e, t, i, r, s, a) {
  let o = i / 1e6, l = (i - (a ?? 0)) / 1e6, c = r / 1e6, d = qe(this, $s, Zo).call(this, o, l, n);
  return o = d.presentationTimestamp, l = d.decodeTimestamp, s?.decoderConfig && (n.info.decoderConfig === null ? n.info.decoderConfig = s.decoderConfig : Object.assign(n.info.decoderConfig, s.decoderConfig)), {
    presentationTimestamp: o,
    decodeTimestamp: l,
    duration: c,
    data: e,
    size: e.byteLength,
    type: t,
    // Will be refined once the next sample comes in
    timescaleUnitsToNextSample: un(c, n.timescale)
  };
};
on = /* @__PURE__ */ new WeakSet();
vn = function(n, e) {
  R(this, ye).fastStart !== "fragmented" && n.samples.push(e);
  const t = un(e.presentationTimestamp - e.decodeTimestamp, n.timescale);
  if (n.lastTimescaleUnits !== null) {
    let r = un(e.decodeTimestamp, n.timescale, !1), s = Math.round(r - n.lastTimescaleUnits);
    if (n.lastTimescaleUnits += s, n.lastSample.timescaleUnitsToNextSample = s, R(this, ye).fastStart !== "fragmented") {
      let a = Ar(n.timeToSampleTable);
      a.sampleCount === 1 ? (a.sampleDelta = s, a.sampleCount++) : a.sampleDelta === s ? a.sampleCount++ : (a.sampleCount--, n.timeToSampleTable.push({
        sampleCount: 2,
        sampleDelta: s
      }));
      const o = Ar(n.compositionTimeOffsetTable);
      o.sampleCompositionTimeOffset === t ? o.sampleCount++ : n.compositionTimeOffsetTable.push({
        sampleCount: 1,
        sampleCompositionTimeOffset: t
      });
    }
  } else
    n.lastTimescaleUnits = 0, R(this, ye).fastStart !== "fragmented" && (n.timeToSampleTable.push({
      sampleCount: 1,
      sampleDelta: un(e.duration, n.timescale)
    }), n.compositionTimeOffsetTable.push({
      sampleCount: 1,
      sampleCompositionTimeOffset: t
    }));
  n.lastSample = e;
  let i = !1;
  if (!n.currentChunk)
    i = !0;
  else {
    let r = e.presentationTimestamp - n.currentChunk.startTimestamp;
    if (R(this, ye).fastStart === "fragmented") {
      let s = R(this, Rt) ?? R(this, At);
      const a = R(this, ye).minFragmentDuration ?? 1;
      n === s && e.type === "key" && r >= a && (i = !0, qe(this, Dr, Ks).call(this));
    } else
      i = r >= 0.5;
  }
  i && (n.currentChunk && qe(this, Vi, Pr).call(this, n), n.currentChunk = {
    startTimestamp: e.presentationTimestamp,
    samples: []
  }), n.currentChunk.samples.push(e);
};
$s = /* @__PURE__ */ new WeakSet();
Zo = function(n, e, t) {
  const i = R(this, ye).firstTimestampBehavior === "strict", r = t.lastDecodeTimestamp === -1;
  if (i && r && e !== 0)
    throw new Error(
      `The first chunk for your media track must have a timestamp of 0 (received DTS=${e}).Non-zero first timestamps are often caused by directly piping frames or audio data from a MediaStreamTrack into the encoder. Their timestamps are typically relative to the age of thedocument, which is probably what you want.

If you want to offset all timestamps of a track such that the first one is zero, set firstTimestampBehavior: 'offset' in the options.
`
    );
  if (R(this, ye).firstTimestampBehavior === "offset" || R(this, ye).firstTimestampBehavior === "cross-track-offset") {
    t.firstDecodeTimestamp === void 0 && (t.firstDecodeTimestamp = e);
    let a;
    R(this, ye).firstTimestampBehavior === "offset" ? a = t.firstDecodeTimestamp : a = Math.min(
      R(this, Rt)?.firstDecodeTimestamp ?? 1 / 0,
      R(this, At)?.firstDecodeTimestamp ?? 1 / 0
    ), e -= a, n -= a;
  }
  if (e < t.lastDecodeTimestamp)
    throw new Error(
      `Timestamps must be monotonically increasing (DTS went from ${t.lastDecodeTimestamp * 1e6} to ${e * 1e6}).`
    );
  return t.lastDecodeTimestamp = e, { presentationTimestamp: n, decodeTimestamp: e };
};
Vi = /* @__PURE__ */ new WeakSet();
Pr = function(n) {
  if (R(this, ye).fastStart === "fragmented")
    throw new Error("Can't finalize individual chunks if 'fastStart' is set to 'fragmented'.");
  if (n.currentChunk) {
    if (n.finalizedChunks.push(n.currentChunk), R(this, vi).push(n.currentChunk), (n.compactlyCodedChunkTable.length === 0 || Ar(n.compactlyCodedChunkTable).samplesPerChunk !== n.currentChunk.samples.length) && n.compactlyCodedChunkTable.push({
      firstChunk: n.finalizedChunks.length,
      // 1-indexed
      samplesPerChunk: n.currentChunk.samples.length
    }), R(this, ye).fastStart === "in-memory") {
      n.currentChunk.offset = 0;
      return;
    }
    n.currentChunk.offset = R(this, De).pos;
    for (let e of n.currentChunk.samples)
      R(this, De).write(e.data), e.data = null;
    qe(this, yi, Ki).call(this);
  }
};
Dr = /* @__PURE__ */ new WeakSet();
Ks = function(n = !0) {
  if (R(this, ye).fastStart !== "fragmented")
    throw new Error("Can't finalize a fragment unless 'fastStart' is set to 'fragmented'.");
  let e = [R(this, Rt), R(this, At)].filter((o) => o && o.currentChunk);
  if (e.length === 0)
    return;
  let t = bp(this, Xs)._++;
  if (t === 1) {
    let o = _r(e, R(this, gi), !0);
    R(this, De).writeBox(o);
  }
  let i = R(this, De).pos, r = no(t, e);
  R(this, De).writeBox(r);
  {
    let o = ys(!1), l = 0;
    for (let d of e)
      for (let u of d.currentChunk.samples)
        l += u.size;
    let c = R(this, De).measureBox(o) + l;
    c >= 2 ** 32 && (o.largeSize = !0, c = R(this, De).measureBox(o) + l), o.size = c, R(this, De).writeBox(o);
  }
  for (let o of e) {
    o.currentChunk.offset = R(this, De).pos, o.currentChunk.moofOffset = i;
    for (let l of o.currentChunk.samples)
      R(this, De).write(l.data), l.data = null;
  }
  let s = R(this, De).pos;
  R(this, De).seek(R(this, De).offsets.get(r));
  let a = no(t, e);
  R(this, De).writeBox(a), R(this, De).seek(s);
  for (let o of e)
    o.finalizedChunks.push(o.currentChunk), R(this, vi).push(o.currentChunk), o.currentChunk = null;
  n && qe(this, yi, Ki).call(this);
};
yi = /* @__PURE__ */ new WeakSet();
Ki = function() {
  R(this, De) instanceof Ws && R(this, De).flush();
};
br = /* @__PURE__ */ new WeakSet();
Ds = function() {
  if (R(this, Gi))
    throw new Error("Cannot add new video or audio chunks after the file has been finalized.");
};
function Rm(n) {
  return new Promise((e, t) => {
    if (!n || typeof n.toBlob != "function") {
      t(new Error("canvasToPngBlob: canvas.toBlob unavailable in this environment"));
      return;
    }
    n.toBlob((i) => {
      i ? e(i) : t(new Error("canvasToPngBlob: toBlob produced no blob"));
    }, "image/png");
  });
}
function Pm() {
  return typeof MediaRecorder < "u" && typeof HTMLCanvasElement < "u" && typeof HTMLCanvasElement.prototype.captureStream == "function";
}
function Dm() {
  return typeof MediaRecorder > "u" || typeof MediaRecorder.isTypeSupported != "function" ? void 0 : ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm", "video/mp4"].find((e) => MediaRecorder.isTypeSupported(e));
}
async function io(n, e, t, i) {
  if (typeof VideoEncoder > "u") return !1;
  try {
    const { supported: r } = await VideoEncoder.isConfigSupported({
      codec: n,
      width: e,
      height: t,
      framerate: i
    });
    return !!r;
  } catch {
    return !1;
  }
}
async function Lm({ canvas: n, run: e, fps: t = 30 }) {
  if (!n) throw new Error("recordVideo: canvas is required");
  if (typeof e != "function") throw new Error("recordVideo: run() callback is required");
  if (typeof VideoEncoder < "u") {
    const i = n.width, r = n.height, s = "avc1.640028", a = "vp09.00.10.08", o = await io(s, i, r, t), l = !o && await io(a, i, r, t);
    if (o || l)
      return Um({ canvas: n, run: e, fps: t, useAvc: o });
  }
  if (Pm())
    return Im({ canvas: n, run: e, fps: t });
  throw new Error(
    "recordVideo: neither WebCodecs (VideoEncoder) nor MediaRecorder/captureStream is available in this environment"
  );
}
async function Um({ canvas: n, run: e, fps: t, useAvc: i }) {
  const r = n.width, s = n.height, a = i ? "avc1.640028" : "vp09.00.10.08", o = new Go(), l = new Cm({
    target: o,
    video: {
      codec: i ? "avc" : "vp9",
      width: r,
      height: s
    },
    // fastStart embeds the moov atom at the front for immediate seeking in players.
    fastStart: "in-memory"
  }), c = new VideoEncoder({
    output: (p, x) => {
      l.addVideoChunk(p, x);
    },
    error: (p) => {
      throw p;
    }
  });
  c.configure({
    codec: a,
    width: r,
    height: s,
    framerate: t,
    // H.264: signal avc1 bitstream (Annex-B not needed for mp4-muxer).
    ...i ? { avc: { format: "avc" } } : {}
  });
  let d = 0;
  const u = Math.round(1e6 / t);
  await e(() => {
    const p = d * u, x = new VideoFrame(n, { timestamp: p, duration: u });
    c.encode(x, { keyFrame: d % t === 0 }), x.close(), d += 1;
  }), await c.flush(), c.close(), l.finalize();
  const f = i ? "video/mp4" : "video/webm";
  return new Blob([o.buffer], { type: f });
}
async function Im({ canvas: n, run: e, fps: t }) {
  const i = n.captureStream(t), r = Dm(), s = new MediaRecorder(i, r ? { mimeType: r } : void 0), a = [];
  s.ondataavailable = (l) => {
    l.data && l.data.size > 0 && a.push(l.data);
  };
  const o = new Promise((l) => {
    s.onstop = () => l();
  });
  s.start();
  try {
    await e(() => {
      i.getVideoTracks?.()[0]?.requestFrame?.();
    });
  } finally {
    s.state !== "inactive" && s.stop();
  }
  return await o, i.getTracks?.().forEach((l) => l.stop()), new Blob(a, { type: s.mimeType || r || "video/webm" });
}
class jo {
  /**
   * @param {HTMLElement} container mount point for the three.js canvas
   * @param {object} scene normalized scene object (from loadScene)
   */
  constructor(e, t) {
    if (!e) throw new Error("VexyStax: container is required");
    if (!t || !Array.isArray(t.slides))
      throw new Error("VexyStax: scene must be a parsed scene object (use loadScene first)");
    this.container = e, this.scene = t, this.stage = new gp(e, t), this._ro = null, this._currentView = t.view === "compact" ? "compact" : "expanded", this._morphT = this._currentView === "compact" ? 0 : 1, this._clickToggle = null, this._controls = null, this._toggling = !1, this._ready = this.stage.init().then(() => (this.stage.render(), typeof ResizeObserver < "u" && (this._ro = new ResizeObserver((i) => {
      for (const r of i) {
        const s = r.contentRect?.width, a = r.contentRect?.height;
        s > 0 && a > 0 && (this.stage.resize(s, a), this.stage.render());
      }
    }), this._ro.observe(e)), this));
  }
  /** Resolves once textures are loaded and the initial view is rendered. */
  get ready() {
    return this._ready;
  }
  /** Position the deck + camera for a view and render a frame. */
  async setView(e) {
    return await this._ready, this.stage.setView(e), this.stage.render(), this._morphT = e === "compact" ? 0 : 1, this._setView_(e === "compact" ? "compact" : "expanded"), this;
  }
  /**
   * Apply an arbitrary morph factor `t` (0 = compact, 1 = expanded) and render. The
   * low-level scrub primitive behind scroll-driven stories (e.g. the scrollable demo
   * computes its own tent mapping and calls seek each scroll frame). Clamped to [0,1].
   */
  seek(e) {
    const t = Math.max(0, Math.min(1, Number(e) || 0));
    return this.stage.applyFrameState(mi(this.scene, t, this.stage.camera.aspect), t), this.stage.render(), this._morphT = t, this._setView_(t >= 0.5 ? "expanded" : "compact"), this;
  }
  /** Set `_currentView` and emit a "viewchange" CustomEvent on the container when it changes (343/344). */
  _setView_(e) {
    e !== this._currentView && (this._currentView = e, this.container?.dispatchEvent?.(new CustomEvent("viewchange", { detail: { view: e } })));
  }
  /** Resize the renderer/camera to the container (or explicit size). */
  resize(e, t) {
    const i = e ?? this.container.clientWidth, r = t ?? this.container.clientHeight;
    this.stage.resize(i, r), this.stage.render();
  }
  /**
   * Render the current view to a PNG Blob. `scale` re-renders at a higher
   * pixel size. (Animated transition export is a later story.)
   */
  async toImage({ scale: e = 1 } = {}) {
    await this._ready;
    const t = this.stage.renderer, i = t.domElement;
    let r = null;
    if (e !== 1) {
      i.width, i.height;
      const s = this.container.clientWidth || this.scene.size.width, a = this.container.clientHeight || this.scene.size.height, o = t.getPixelRatio();
      t.setPixelRatio(o * e), t.setSize(s, a, !1), r = () => {
        t.setPixelRatio(o), t.setSize(s, a, !1), this.stage.render();
      };
    }
    this.stage.render();
    try {
      return await Rm(i);
    } finally {
      r && r();
    }
  }
  // --- Render operations (SPEC.md §6.1) ------------------------------------
  /**
   * Play a transition (camera + spacing + opacity + caption fade morph) as an
   * animation, rendering each frame. Resolves when the animation finishes.
   *
   * @param {string} [kind] override scene.transition.kind
   * @param {object} [opts]
   * @param {(p:number)=>void} [opts.onProgress] global progress [0,1] per frame
   * @returns {Promise<this>}
   */
  async transition(e, t = {}) {
    await this._ready;
    const i = e ?? this.scene.transition?.kind;
    if (!i)
      throw new Error("VexyStax.transition: no kind given and scene.transition is null");
    const { startMorph: r } = gs(i);
    this.stage.applyFrameState(mi(this.scene, r, this.stage.camera.aspect), r), this.stage.render(), this._cancelTransition?.();
    const s = Ja(this.scene, (a) => {
      const o = this._morphFromGaps(a.gaps);
      this.stage.applyFrameState(a, o), this.stage.render();
    }, { kind: i, onProgress: t.onProgress, aspect: this.stage.camera.aspect, duration: t.duration });
    this._cancelTransition = s.cancel, this.container.dispatchEvent?.(new CustomEvent("transitionstart", { detail: { kind: i } }));
    try {
      await s.promise;
      const { endMorph: a } = gs(i);
      this._morphT = a, this._setView_(a >= 0.5 ? "expanded" : "compact"), this.container.dispatchEvent?.(new CustomEvent("transitionend", { detail: { kind: i } }));
    } finally {
      this._cancelTransition = null;
    }
    return this;
  }
  /**
   * Click-to-toggle (issue 342): fluently transition between the two views. If the deck is
   * currently expanded (or mid-morph past halfway), collapse to compact; otherwise expand.
   * Reuses the existing morph driver (a smooth `collapse`/`expand` leg) — never a snap. Safe to
   * call repeatedly: an in-flight toggle is ignored until it settles. Returns the played kind.
   */
  async toggleView() {
    if (await this._ready, this._toggling) return null;
    const t = this._currentView !== "compact" ? "collapse" : "expand";
    this._toggling = !0;
    try {
      this.scene.transition || (this.scene.transition = { kind: t, duration: 0.7, wait: 0, fps: 30, easing: "easeInOutCubic" }), await this.transition(t, { duration: 0.7 });
    } finally {
      this._toggling = !1;
    }
    return t;
  }
  /**
   * Enable click-to-toggle on the container (issue 342): a pointer click anywhere inside the
   * element fluently toggles compact↔expanded. ON by default for interactive containers (the
   * <vexy-stax> element + createStax) and layered ON TOP of scrollspy (scroll drives the morph;
   * a click still toggles). Idempotent. Pass to disableClickToggle() to opt out.
   */
  enableClickToggle() {
    if (this._clickToggle || !this.container?.addEventListener) return this;
    const e = (t) => {
      const i = t.target?.tagName;
      i && /^(BUTTON|A|INPUT|SELECT|TEXTAREA|LABEL)$/.test(i) || this.toggleView();
    };
    return this.container.addEventListener("click", e), this.container.style && !this.container.style.cursor && (this.container.style.cursor = "pointer"), this._clickToggle = { handler: e }, this;
  }
  /**
   * Add built-in control buttons over the deck (issue 343): a single relabeling toggle
   * ("Explain" → expand, "Preview" → compact) or a side-by-side pair. Frosted, bottom-centered by
   * default; themeable via `--vexy-btn-*` CSS custom properties on the element. Replaces any prior
   * controls. Pass `false` to remove them. Options: `{type:"toggle"|"pair", explainLabel,
   * previewLabel, position, style}`.
   */
  controls(e = {}) {
    return this._controls?.destroy(), this._controls = e === !1 ? null : Mp(this, this.container, e), this;
  }
  /** Remove the click-to-toggle handler (issue 342 opt-out). */
  disableClickToggle() {
    return this._clickToggle && (this.container.removeEventListener?.("click", this._clickToggle.handler), this._clickToggle = null), this;
  }
  /** Re-derive the morph factor t from a frame's gap[1] (for caption fade). */
  _morphFromGaps(e) {
    if (e.length < 2) return 0;
    const t = this.stage.scene.camera.gap, i = t - 3;
    return i <= 0 ? e[1] >= t ? 1 : 0 : Math.max(0, Math.min(1, (e[1] - 3) / i));
  }
  /**
   * Record the transition to a video Blob (WebCodecs preferred, MediaRecorder
   * fallback). Plays the full transition while capturing the canvas.
   * @param {object} [opts]
   * @param {string} [opts.kind] override scene.transition.kind
   * @returns {Promise<Blob>}
   */
  async toVideo(e = {}) {
    await this._ready;
    const t = e.kind ?? this.scene.transition?.kind;
    if (!t) throw new Error("VexyStax.toVideo: no kind given and scene.transition is null");
    const i = this.scene.video?.fps ?? this.scene.transition?.fps ?? 30, r = this.stage.renderer.domElement, s = this.scene.video?.first_hold ?? 10, a = this.scene.video?.last_hold ?? 10, { startMorph: o, endMorph: l } = gs(t), c = this.stage.camera.aspect;
    return Lm({
      canvas: r,
      fps: i,
      run: async (d) => {
        const u = mi(this.scene, o, c);
        this.stage.applyFrameState(u, o), this.stage.render();
        for (let x = 0; x < s; x++) d(u);
        await Ja(this.scene, (x) => {
          const v = this._morphFromGaps(x.gaps);
          this.stage.applyFrameState(x, v), this.stage.render(), d(x);
        }, { kind: t }).promise;
        const p = mi(this.scene, l, c);
        this.stage.applyFrameState(p, l), this.stage.render();
        for (let x = 0; x < a; x++) d(p);
      }
    });
  }
  /**
   * Drive the transition from scroll position over a trigger region (SPEC.md
   * §6.4). Maps scroll progress [0,1] to the morph; respects
   * prefers-reduced-motion (snaps to endpoints).
   *
   * @param {object} opts
   * @param {Element|string} opts.trigger element or selector for the scroll region
   * @param {string} [opts.kind] override scene.transition.kind
   * @param {boolean} [opts.reducedMotion] override prefers-reduced-motion
   * @returns {{disconnect:()=>void}}
   */
  scrollspy(e = {}) {
    const t = e.kind ?? this.scene.transition?.kind ?? "expand", i = typeof e.trigger == "string" ? document.querySelector(e.trigger) : e.trigger;
    if (!i) throw new Error("VexyStax.scrollspy: trigger element not found");
    const r = this.scene.transition?.easing ?? "easeInOutCubic", s = this.scene.transition?.duration ?? 3, a = this.scene.transition?.wait ?? 0, o = (l) => {
      const c = typeof e.map == "function" ? Math.max(0, Math.min(1, e.map(l))) : this._scrollMorph(t, l, r, s, a);
      this.stage.applyFrameState(mi(this.scene, c, this.stage.camera.aspect), c), this.stage.render();
    };
    return o(0), this._scrollspy?.disconnect?.(), this._scrollspy = vp({
      trigger: i,
      reducedMotion: e.reducedMotion,
      onProgress: o
    }), this._scrollspy;
  }
  /** Resolve scroll progress p to a morph factor via the transition timeline. */
  _scrollMorph(e, t, i, r, s) {
    const a = Uo(e, { duration: r, wait: s });
    return Io(a, t, (o) => Do(i, o));
  }
  /** Tear down the three.js stage, stop animations/scrollspy, remove the canvas. */
  destroy() {
    this._cancelTransition?.(), this._scrollspy?.disconnect?.(), this.disableClickToggle(), this._controls?.destroy(), this._controls = null, this._ro?.disconnect?.(), this._ro = null, this.stage?.dispose();
  }
}
const Fm = /* @__PURE__ */ new Set([
  "slides",
  "scene",
  "view",
  "mode",
  "trigger",
  "width",
  "height",
  "aspect",
  "baseUrl",
  "clickToggle"
]);
async function Om(n, e = {}) {
  const t = typeof n == "string" ? document.querySelector(n) : n;
  if (!t) throw new Error(`createStax: element not found (${String(n)})`);
  if (e === null || typeof e != "object") throw new Error("createStax: opts must be an object");
  e.width && (t.style.width = /^\d+$/.test(String(e.width)) ? `${e.width}px` : e.width), e.height && (t.style.height = /^\d+$/.test(String(e.height)) ? `${e.height}px` : e.height), e.aspect && (t.style.aspectRatio = String(e.aspect).trim().replace(/[:x]/i, " / ")), typeof t.style == "object" && (t.style.position = t.style.position || "relative", t.style.display = t.style.display || "block");
  const i = e.baseUrl ?? (typeof document < "u" ? document.baseURI : void 0);
  let r;
  if (e.slides) {
    const o = { baseUrl: i };
    for (const [l, c] of Object.entries(e))
      Fm.has(l) || (o[l] = c);
    r = To(e.slides, o);
  } else if (e.scene !== void 0)
    r = await wo(e.scene, { baseUrl: i });
  else
    throw new Error("createStax: provide `slides` (URLs) or `scene` (URL/object)");
  e.view && (r.view = e.view);
  const s = new jo(t, r);
  await s.ready;
  const a = e.mode ?? "static";
  if (a === "scrollspy") {
    const o = typeof e.trigger == "string" ? document.querySelector(e.trigger) : e.trigger ?? t;
    s.scrollspy({ trigger: o });
  } else a === "playable" && r.transition && s.transition().catch(() => {
  });
  if (e.clickToggle !== !1 && s.enableClickToggle(), e.buttons) {
    const o = typeof e.buttons == "object" ? e.buttons : { type: e.buttons === "pair" ? "pair" : "toggle" };
    s.controls({
      explainLabel: e.explainLabel,
      previewLabel: e.previewLabel,
      position: e.buttonsPosition,
      style: e.buttonStyle,
      ...o
    });
  }
  return s;
}
class Nm extends HTMLElement {
  static get observedAttributes() {
    return [
      "scene",
      "slides",
      "captions",
      "view",
      "mode",
      "trigger",
      "width",
      "height",
      "aspect",
      "click-toggle",
      "buttons",
      "explain-label",
      "preview-label",
      "buttons-position"
    ];
  }
  constructor() {
    super(), this._stax = null, this._config = null, this._mounting = !1;
  }
  /** Inline scene object (or JSON string); overrides the `scene`/`slides` attributes. */
  set config(e) {
    this._config = typeof e == "string" ? JSON.parse(e) : e, this.isConnected && this._mount();
  }
  get config() {
    return this._config;
  }
  /**
   * Scene-in-init (issue 342): assigning an OBJECT (or JSON string) sets the inline scene
   * (same as `config`), so `el.scene = {version:1, slides:[…]}` works at init. Assigning a
   * STRING URL is treated as the `scene` attribute (a URL to fetch). This makes the property
   * mirror the lines-nano-style "pass the data right in" ergonomics for the Web Component.
   */
  set scene(e) {
    if (e && typeof e == "object")
      this.config = e;
    else if (typeof e == "string") {
      const t = e.trim();
      t.startsWith("{") ? this.config = JSON.parse(t) : this.setAttribute("scene", e);
    }
  }
  get scene() {
    return this._config ?? this.getAttribute("scene");
  }
  /** The underlying VexyStax instance (null until mounted). */
  get instance() {
    return this._stax;
  }
  connectedCallback() {
    this.getAttribute("config") && !this._config && (this._config = JSON.parse(this.getAttribute("config"))), this.style.display = this.style.display || "block", this.style.position = this.style.position || "relative", this._applySize(), this._mount();
  }
  disconnectedCallback() {
    this._stax?.destroy(), this._stax = null;
  }
  attributeChangedCallback(e) {
    if (this.isConnected) {
      if (e === "width" || e === "height" || e === "aspect") {
        this._applySize(), this._stax?.resize();
        return;
      }
      if (e === "view") {
        this._stax?.setView(this.getAttribute("view") || "expanded");
        return;
      }
      if (e === "click-toggle") {
        this.getAttribute("click-toggle") === "false" ? this._stax?.disableClickToggle() : this._stax?.enableClickToggle();
        return;
      }
      this._mount();
    }
  }
  _applySize() {
    const e = this.getAttribute("width"), t = this.getAttribute("height");
    e && (this.style.width = /^\d+$/.test(e) ? `${e}px` : e), t && (this.style.height = /^\d+$/.test(t) ? `${t}px` : t);
    const i = this.getAttribute("aspect");
    i && i.trim() && (this.style.aspectRatio = i.trim().replace(/[:x]/i, " / "));
  }
  /**
   * Issue 701: an inline scene declared as a child `<script type="application/json">` (or
   * `application/vexy-scene+json`). This is the no-escaping way to "specify the full scene
   * right where you load the component" — drop the whole scene JSON inside the element instead
   * of pointing `scene` at a URL. Returns the parsed object (later normalized by loadScene), or
   * null when there is no such child. A `<script>` child is never rendered, so it is invisible.
   */
  _inlineScene() {
    if (typeof this.querySelector != "function") return null;
    const t = this.querySelector(
      'script[type="application/json"], script[type="application/vexy-scene+json"]'
    )?.textContent?.trim();
    if (!t) return null;
    try {
      return JSON.parse(t);
    } catch (i) {
      throw new Error(`<vexy-stax>: inline <script> scene is not valid JSON (${i.message})`);
    }
  }
  async _mount() {
    if (!this._mounting) {
      this._mounting = !0;
      try {
        this._stax?.destroy(), this._stax = null;
        const e = typeof document < "u" ? document.baseURI : void 0, t = this._config ?? this._inlineScene() ?? this.getAttribute("scene"), i = this.getAttribute("slides");
        let r;
        if (t)
          r = await wo(t, { baseUrl: e });
        else if (i && i.trim()) {
          const l = i.split(/\s+/).filter(Boolean), c = this.getAttribute("captions"), d = { baseUrl: e };
          c !== null && (d.captions = c !== "false"), r = To(l, d);
        } else
          return;
        const s = this.getAttribute("view") || r.view || "expanded";
        if (r.view = s, this._stax = new jo(this, r), await this._stax.ready, (this.getAttribute("mode") || "static") === "scrollspy") {
          const l = this.getAttribute("trigger"), c = l ? document.querySelector(l) : this;
          this._stax.scrollspy({ trigger: c });
        }
        this.getAttribute("click-toggle") !== "false" && this._stax?.enableClickToggle();
        const o = this.getAttribute("buttons");
        o !== null && o !== "false" && this._stax?.controls({
          type: o === "pair" ? "pair" : "toggle",
          explainLabel: this.getAttribute("explain-label") ?? void 0,
          previewLabel: this.getAttribute("preview-label") ?? void 0,
          position: this.getAttribute("buttons-position") ?? void 0
        }), this.dispatchEvent(new CustomEvent("ready", { detail: { instance: this._stax } }));
      } catch (e) {
        throw this.dispatchEvent(new CustomEvent("error", { detail: { error: e } })), e;
      } finally {
        this._mounting = !1;
      }
    }
  }
  // Convenience pass-throughs.
  setView(e) {
    return this._stax?.setView(e);
  }
  toImage(e) {
    return this._stax?.toImage(e);
  }
  transition(e, t) {
    return this._stax?.transition(e, t);
  }
  toVideo(e) {
    return this._stax?.toVideo(e);
  }
  scrollspy(e) {
    return this._stax?.scrollspy(e);
  }
  seek(e) {
    return this._stax?.seek(e);
  }
  /** Issue 342: fluently toggle compact↔expanded (the default click behavior, exposed). */
  toggleView() {
    return this._stax?.toggleView();
  }
}
typeof customElements < "u" && !customElements.get("vexy-stax") && customElements.define("vexy-stax", Nm);
export {
  jo as VexyStax,
  Nm as VexyStaxElement,
  Om as createStax,
  wo as loadScene,
  To as makeScene,
  Eo as parseScene
};
//# sourceMappingURL=vexy-stax.element.js.map
