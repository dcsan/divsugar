(function() {
  var DivSugar,
    __slice = Array.prototype.slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  DivSugar = {
    _initialize: function() {
      var updateTasks,
        _this = this;
      this.VERSION = '0.10';
      this.EPSILON = 0.0001;
      this.NUM_OF_DIGITS = 4;
      this.DEG_TO_RAD = Math.PI / 180;
      this.RAD_TO_DEG = 180 / Math.PI;
      this._id = 0;
      this._animations = [];
      this.rootTask = null;
      (function() {
        var div, requestAnimationFrame, userAgent;
        userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('safari') > -1 || userAgent.indexOf('chrome') > -1) {
          _this._prefix = 'webkit';
        } else if (userAgent.indexOf('firefox') > -1) {
          _this._prefix = 'moz';
        } else if (userAgent.indexOf('opera') > -1) {
          _this._prefix = 'o';
        } else if (userAgent.indexOf('msie') > -1) {
          _this._prefix = 'ms';
        } else {
          _this._prefix = null;
        }
        console.log("DivSugar: use '" + _this._prefix + "' as prefix");
        div = document.createElement('div');
        _this._transform = "-" + _this._prefix + "-transform";
        if (!(div.style[_this._transform] != null)) _this._transform = 'transform';
        console.log("DivSugar: use '" + _this._transform + "'");
        _this._transformStyle = "-" + _this._prefix + "-transform-style";
        if (!(div.style[_this._transformStyle] != null)) {
          _this._transformStyle = 'transform-style';
        }
        console.log("DivSugar: use '" + _this._transformStyle + "'");
        _this._transformOrigin = "-" + _this._prefix + "-transform-origin";
        if (!(div.style[_this._transformOrigin] != null)) {
          _this._transformOrigin = 'transform-origin';
        }
        console.log("DivSugar: use '" + _this._transformOrigin + "'");
        _this._perspective = "-" + _this._prefix + "-perspective";
        if (!(div.style[_this._perspective] != null)) {
          _this._perspective = 'perspective';
        }
        console.log("DivSugar: use '" + _this._perspective + "'");
        _this._perspectiveOrigin = "-" + _this._prefix + "-perspective-origin";
        if (!(div.style[_this._perspectiveOrigin] != null)) {
          _this._perspectiveOrigin = 'perspective-origin';
        }
        console.log("DivSugar: use '" + _this._perspectiveOrigin + "'");
        _this._animationName = "-" + _this._prefix + "-animation-name";
        if (!(div.style[_this._animationName] != null)) {
          _this._animationName = 'animation-name';
        }
        console.log("DivSugar: use '" + _this._animationName + "'");
        _this._animationDuration = "-" + _this._prefix + "-animation-duration";
        if (!(div.style[_this._animationDuration] != null)) {
          _this._animationDuration = 'animation-duration';
        }
        console.log("DivSugar: use '" + _this._animationDuration + "'");
        _this._animationTimingFunction = "-" + _this._prefix + "-animation-timing-function";
        if (!(div.style[_this._animationTimingFunction] != null)) {
          _this._animationTimingFunction = 'animation-timing-function';
        }
        console.log("DivSugar: use '" + _this._animationTimingFunction + "'");
        _this._animationDelay = "-" + _this._prefix + "-animation-delay";
        if (!(div.style[_this._animationDelay] != null)) {
          _this._animationDelay = 'animation-delay';
        }
        console.log("DivSugar: use '" + _this._animationDelay + "'");
        _this._animationIterationCount = "-" + _this._prefix + "-animation-iteration-count";
        if (!(div.style[_this._animationIterationCount] != null)) {
          _this._animationIterationCount = 'animation-iteration-count';
        }
        console.log("DivSugar: use '" + _this._animationIterationCount + "'");
        _this._animationDirection = "-" + _this._prefix + "-animation-direction";
        if (!(div.style[_this._animationDirection] != null)) {
          _this._animationDirection = 'animation-direction';
        }
        console.log("DivSugar: use '" + _this._animationDirection + "'");
        _this._animationFillMode = "-" + _this._prefix + "-animation-fill-mode";
        if (!(div.style[_this._animationFillMode] != null)) {
          _this._animationFillMode = 'animation-fill-mode';
        }
        console.log("DivSugar: use '" + _this._animationFillMode + "'");
        requestAnimationFrame = _this._prefix + 'RequestAnimationFrame';
        if (!(window[requestAnimationFrame] != null)) {
          requestAnimationFrame = 'requestAnimationFrame';
        }
        if (window[requestAnimationFrame] != null) {
          _this._requestAnimationFrame = function(callback) {
            return window[requestAnimationFrame](callback);
          };
          return console.log("DivSugar: use '" + requestAnimationFrame + "'");
        } else {
          _this._requestAnimationFrame = function(callback) {
            return window.setTimeout(callback, 1000 / 60);
          };
          return console.log("DivSugar: use 'setTimeout' instead of 'requestAnimationFrame'");
        }
      })();
      updateTasks = function() {
        var curTime, elapsedTime;
        curTime = (new Date()).getTime();
        elapsedTime = curTime - _this._lastUpdatedTime;
        _this._lastUpdatedTime = curTime;
        _this.rootTask.update(elapsedTime);
        return _this._requestAnimationFrame(updateTasks);
      };
      this._lastUpdatedTime = (new Date()).getTime();
      return this._requestAnimationFrame(updateTasks);
    },
    generateId: function() {
      return "_divsugar_id_" + (++this._id);
    },
    createScene: function() {
      var args, div, func, name, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      div = document.createElement('div');
      _ref = this._Scene;
      for (name in _ref) {
        func = _ref[name];
        div[name] = func;
      }
      div._initialize.apply(div, args);
      return div;
    },
    createSprite: function() {
      var args, div, func, name, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      div = document.createElement('div');
      _ref = this._Sprite;
      for (name in _ref) {
        func = _ref[name];
        div[name] = func;
      }
      div._initialize.apply(div, args);
      return div;
    },
    createTask: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return typeof result === "object" ? result : child;
      })(this._Task, args, function() {});
    },
    addCSSAnimation: function(name, animation) {
      var h, keyframe, nod, property, style, transform, value, w, x, y, _ref;
      this.removeCSSAnimation(name);
      style = document.createElement('style');
      style.innerHTML = "@-" + this._prefix + "-keyframes " + name + "{";
      nod = this.NUM_OF_DIGITS;
      for (keyframe in animation) {
        style.innerHTML += "" + keyframe + "{";
        transform = null;
        _ref = animation[keyframe];
        for (property in _ref) {
          value = _ref[property];
          switch (property) {
            case 'size':
              style.innerHTML += "width:" + (value[0].toFixed(nod)) + "px;height:" + (value[1].toFixed(nod)) + "px;";
              break;
            case 'visible':
              style.innerHTML += "visibility:" + (value ? 'visible' : 'hidden') + ";";
              break;
            case 'clip':
              style.innerHTML += "overflow:" + (value ? 'hidden' : 'visible') + ";";
              break;
            case 'opacity':
              style.innerHTML += "opacity:" + (value.toFixed(nod)) + ";";
              break;
            case 'image':
              if (!(value != null)) {
                style.innerHTML += 'background-color:transparent;';
                style.innerHTML += 'background-image:none;';
              } else if (value.charAt(0) === '#') {
                style.innerHTML += "background-color:" + value + ";";
                style.innerHTML += 'background-image:none;';
              } else {
                style.innerHTML += 'background-color:transparent;';
                style.innerHTML += "background-image:url(" + value + ");";
              }
              break;
            case 'imageClip':
              w = 1 / (value[2] - value[0]) * 100;
              h = 1 / (value[3] - value[1]) * 100;
              x = value[0] * w;
              y = value[1] * h;
              nod = DivSugar.NUM_OF_DIGITS;
              style.innerHTML += "background-position:" + (x.toFixed(nod)) + "% " + (y.toFixed(nod)) + "%;";
              style.innerHTML += "background-size:" + (w.toFixed(nod)) + "% " + (h.toFixed(nod)) + "%;";
              break;
            case 'transform':
              if (transform == null) transform = new DivSugar.Matrix();
              transform.set(value);
              break;
            case 'translate':
              if (transform == null) transform = new DivSugar.Matrix();
              transform.translate(value[0], value[1], value[2]);
              break;
            case 'rotate':
              if (transform == null) transform = new DivSugar.Matrix();
              transform.rotate(value[0], value[1], value[2]);
              break;
            case 'scale':
              if (transform == null) transform = new DivSugar.Matrix();
              transform.scale(value[0], value[1], value[2]);
          }
        }
        if (transform != null) {
          style.innerHTML += "" + this._transform + ":" + (transform.toCSSTransform()) + ";";
        }
        style.innerHTML += '}';
      }
      style.innerHTML += '}';
      document.head.appendChild(style);
      this._animations[name] = style;
      console.log("DivSugar: added css animation");
      return console.log(style.innerHTML);
    },
    removeCSSAnimation: function(name) {
      if (name in this._animations) {
        document.head.removeChild(this._animations[name]);
        return delete this._animations[name];
      }
    }
  };

  (window.DivSugar = DivSugar)._initialize();

  DivSugar.Vector = (function() {

    function Vector(x, y, z) {
      var vec;
      switch (arguments.length) {
        case 0:
          this.x = this.y = this.z = 0;
          break;
        case 1:
          vec = x;
          this.x = vec.x;
          this.y = vec.y;
          this.z = vec.z;
          break;
        default:
          this.x = x;
          this.y = y;
          this.z = z;
      }
    }

    Vector.prototype.set = function(x, y, z) {
      var vec;
      if (arguments.length === 1) {
        vec = x;
        this.x = vec.x;
        this.y = vec.y;
        this.z = vec.z;
      } else {
        this.x = x;
        this.y = y;
        this.z = z;
      }
      return this;
    };

    Vector.prototype.neg = function() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      return this;
    };

    Vector.prototype.add = function(vec) {
      this.x += vec.x;
      this.y += vec.y;
      this.z += vec.z;
      return this;
    };

    Vector.prototype.sub = function(vec) {
      this.x -= vec.x;
      this.y -= vec.y;
      this.z -= vec.z;
      return this;
    };

    Vector.prototype.mul = function(s) {
      this.x *= s;
      this.y *= s;
      this.z *= s;
      return this;
    };

    Vector.prototype.div = function(s) {
      var rs;
      rs = 1 / s;
      this.x *= rs;
      this.y *= rs;
      this.z *= rs;
      return this;
    };

    Vector.prototype.norm = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };

    Vector.prototype.sqNorm = function() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    };

    Vector.prototype.dist = function(vec) {
      return DivSugar.Vector._tmpVec1.set(this).sub(vec).norm();
    };

    Vector.prototype.sqDist = function(vec) {
      return DivSugar.Vector._tmpVec1.set(this).sub(vec).sqNorm();
    };

    Vector.prototype.dot = function(vec) {
      return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    };

    Vector.prototype.cross = function(vec) {
      return this.set(this.y * vec.z - this.z * vec.y, this.z * vec.x - this.x * vec.z, this.x * vec.y - this.y * vec.x);
    };

    Vector.prototype.normalize = function() {
      var norm;
      norm = this.norm();
      if (norm < DivSugar.EPSILON) {
        return this.set(DivSugar.Vector.X_UNIT);
      } else {
        return this.div(norm);
      }
    };

    Vector.prototype.rotateX = function(deg) {
      var cos, sin;
      sin = Math.sin(deg * DivSugar.DEG_TO_RAD);
      cos = Math.cos(deg * DivSugar.DEG_TO_RAD);
      return this.set(this.x, this.y * cos - this.z * sin, this.z * cos + this.y * sin);
    };

    Vector.prototype.rotateY = function(deg) {
      var cos, sin;
      sin = Math.sin(deg * DivSugar.DEG_TO_RAD);
      cos = Math.cos(deg * DivSugar.DEG_TO_RAD);
      return this.set(this.x * cos + this.z * sin, this.y, this.z * cos - this.x * sin);
    };

    Vector.prototype.rotateZ = function(deg) {
      var cos, sin;
      sin = Math.sin(deg * DivSugar.DEG_TO_RAD);
      cos = Math.cos(deg * DivSugar.DEG_TO_RAD);
      return this.set(this.x * cos - this.y * sin, this.y * cos + this.x * sin, this.z);
    };

    Vector.prototype.lerp = function(to, ratio) {
      var vec;
      if (ratio > 1 - DivSugar.EPSILON) {
        this.set(to);
      } else if (ratio >= DivSugar.EPSILON) {
        vec = DivSugar.Vector._tmpVec1;
        vec.set(to).mul(ratio);
        this.mul(1 - ratio).add(vec);
      }
      return this;
    };

    Vector.prototype.toLocal = function(mat) {
      var vec;
      vec = DivSugar.Vector._tmpVec1;
      vec.set(this.sub(mat.trans));
      return this.set(vec.dot(mat.xAxis) / mat.xAxis.sqNorm(), vec.dot(mat.yAxis) / mat.yAxis.sqNorm(), vec.dot(mat.zAxis) / mat.zAxis.sqNorm());
    };

    Vector.prototype.toGlobal = function(mat) {
      var vec1, vec2, vec3;
      vec1 = DivSugar.Vector._tmpVec1;
      vec2 = DivSugar.Vector._tmpVec2;
      vec3 = DivSugar.Vector._tmpVec3;
      vec1.set(mat.xAxis).mul(this.x);
      vec2.set(mat.yAxis).mul(this.y);
      vec3.set(mat.zAxis).mul(this.z);
      return this.set(vec1).add(vec2).add(vec3).add(mat.trans);
    };

    Vector.prototype.toLocal_noTrans = function(mat) {
      return this.set(this.dot(mat.xAxis) / mat.xAxis.sqNorm(), this.dot(mat.yAxis) / mat.yAxis.sqNorm(), this.dot(mat.zAxis) / mat.zAxis.sqNorm());
    };

    Vector.prototype.toGlobal_noTrans = function(mat) {
      var vec1, vec2, vec3;
      vec1 = DivSugar.Vector._tmpVec1;
      vec2 = DivSugar.Vector._tmpVec2;
      vec3 = DivSugar.Vector._tmpVec3;
      vec1.set(mat.xAxis).mul(this.x);
      vec2.set(mat.yAxis).mul(this.y);
      vec3.set(mat.zAxis).mul(this.z);
      return this.set(vec1).add(vec2).add(vec3);
    };

    Vector.prototype.equal = function(vec) {
      return this.x === vec.x && this.y === vec.y && this.z === vec.z;
    };

    Vector.prototype.toString = function() {
      return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    };

    return Vector;

  })();

  DivSugar.Vector.ZERO = new DivSugar.Vector(0, 0, 0);

  DivSugar.Vector.X_UNIT = new DivSugar.Vector(1, 0, 0);

  DivSugar.Vector.Y_UNIT = new DivSugar.Vector(0, 1, 0);

  DivSugar.Vector.Z_UNIT = new DivSugar.Vector(0, 0, 1);

  DivSugar.Vector._tmpVec1 = new DivSugar.Vector();

  DivSugar.Vector._tmpVec2 = new DivSugar.Vector();

  DivSugar.Vector._tmpVec3 = new DivSugar.Vector();

  DivSugar.Matrix = (function() {

    function Matrix(mat) {
      switch (arguments.length) {
        case 0:
          this.xAxis = new DivSugar.Vector(DivSugar.Vector.X_UNIT);
          this.yAxis = new DivSugar.Vector(DivSugar.Vector.Y_UNIT);
          this.zAxis = new DivSugar.Vector(DivSugar.Vector.Z_UNIT);
          this.trans = new DivSugar.Vector(DivSugar.Vector.ZERO);
          break;
        case 1:
          this.xAxis = new DivSugar.Vector(mat.xAxis);
          this.yAxis = new DivSugar.Vector(mat.yAxis);
          this.zAxis = new DivSugar.Vector(mat.zAxis);
          this.trans = new DivSugar.Vector(mat.trans);
          break;
        default:
          this.xAxis = new DivSugar.Vector(arguments[0], arguments[1], arguments[2]);
          this.yAxis = new DivSugar.Vector(arguments[3], arguments[4], arguments[5]);
          this.zAxis = new DivSugar.Vector(arguments[6], arguments[7], arguments[8]);
          this.trans = new DivSugar.Vector(arguments[9], arguments[10], arguments[11]);
      }
    }

    Matrix.prototype.set = function(mat) {
      if (arguments.length === 1) {
        this.xAxis.set(mat.xAxis);
        this.yAxis.set(mat.yAxis);
        this.zAxis.set(mat.zAxis);
        this.trans.set(mat.trans);
      } else {
        this.xAxis.set(arguments[0], arguments[1], arguments[2]);
        this.yAxis.set(arguments[3], arguments[4], arguments[5]);
        this.zAxis.set(arguments[6], arguments[7], arguments[8]);
        this.trans.set(arguments[9], arguments[10], arguments[11]);
      }
      return this;
    };

    Matrix.prototype.fromQuaternion = function(quat) {
      var quatW, quatX, quatY, quatZ, wx2, wy2, wz2, x2, xx2, xy2, xz2, y2, yy2, yz2, z2, zz2;
      quatX = quat.x;
      quatY = quat.y;
      quatZ = quat.z;
      quatW = quat.w;
      x2 = quatX + quatX;
      y2 = quatY + quatY;
      z2 = quatZ + quatZ;
      wx2 = quatW * x2;
      wy2 = quatW * y2;
      wz2 = quatW * z2;
      xx2 = quatX * x2;
      xy2 = quatX * y2;
      xz2 = quatX * z2;
      yy2 = quatY * y2;
      yz2 = quatY * z2;
      zz2 = quatZ * z2;
      this.set(1 - (yy2 + zz2), xy2 + wz2, xz2 - wy2, xy2 - wz2, 1 - (xx2 + zz2), yz2 + wx2, xz2 + wy2, yz2 - wx2, 1 - (xx2 + yy2), 0, 0, 0);
      return this;
    };

    Matrix.prototype.orthonormalize = function() {
      var vec1, vec2, vec3;
      vec1 = DivSugar.Matrix._tmpVec1;
      vec2 = DivSugar.Matrix._tmpVec2;
      vec3 = DivSugar.Matrix._tmpVec3;
      vec3.set(this.zAxis).normalize();
      vec1.set(this.yAxis).cross(this.zAxis).normalize();
      vec2.set(vec3).cross(vec1);
      this.xAxis.set(vec1);
      this.yAxis.set(vec2);
      this.zAxis.set(vec3);
      return this;
    };

    Matrix.prototype.translate = function(offsetX, offsetY, offsetZ) {
      var vec1, vec2, vec3;
      vec1 = DivSugar.Matrix._tmpVec1;
      vec2 = DivSugar.Matrix._tmpVec2;
      vec3 = DivSugar.Matrix._tmpVec3;
      vec1.set(this.xAxis).mul(offsetX);
      vec2.set(this.yAxis).mul(offsetY);
      vec3.set(this.zAxis).mul(offsetZ);
      this.trans.add(vec1).add(vec2).add(vec3);
      return this;
    };

    Matrix.prototype.rotate = function(rotateX, rotateY, rotateZ) {
      var cos, mat, sin;
      if (rotateX !== 0) {
        sin = Math.sin(rotateX * DivSugar.DEG_TO_RAD);
        cos = Math.cos(rotateX * DivSugar.DEG_TO_RAD);
        mat = DivSugar.Matrix._tmpMat1;
        mat.set(1, 0, 0, 0, cos, sin, 0, -sin, cos, 0, 0, 0).toGlobal(this);
        this.set(mat);
      }
      if (rotateY !== 0) {
        sin = Math.sin(rotateY * DivSugar.DEG_TO_RAD);
        cos = Math.cos(rotateY * DivSugar.DEG_TO_RAD);
        mat = DivSugar.Matrix._tmpMat1;
        mat.set(cos, 0, -sin, 0, 1, 0, sin, 0, cos, 0, 0, 0).toGlobal(this);
        this.set(mat);
      }
      if (rotateZ !== 0) {
        sin = Math.sin(rotateZ * DivSugar.DEG_TO_RAD);
        cos = Math.cos(rotateZ * DivSugar.DEG_TO_RAD);
        mat = DivSugar.Matrix._tmpMat1;
        mat.set(cos, sin, 0, -sin, cos, 0, 0, 0, 1, 0, 0, 0).toGlobal(this);
        this.set(mat);
      }
      return this;
    };

    Matrix.prototype.scale = function(scaleX, scaleY, scaleZ) {
      this.xAxis.mul(scaleX);
      this.yAxis.mul(scaleY);
      this.zAxis.mul(scaleZ);
      return this;
    };

    Matrix.prototype.slerp = function(to, ratio) {
      var quat1, quat2, vec;
      if (ratio > 1 - DivSugar.EPSILON) {
        this.set(to);
      } else if (ratio >= DivSugar.EPSILON) {
        vec = DivSugar.Matrix._tmpVec1;
        quat1 = DivSugar.Matrix._tmpQuat1;
        quat2 = DivSugar.Matrix._tmpQuat2;
        quat1.fromMatrix(this);
        quat2.fromMatrix(to);
        vec.set(this.trans).lerp(to.trans, ratio);
        this.fromQuaternion(quat1.slerp(quat2, ratio));
        this.trans.set(vec);
      }
      return this;
    };

    Matrix.prototype.slerp_noTrans = function(to, ratio) {
      var quat1, quat2;
      if (ratio > 1 - DivSugar.EPSILON) {
        this.set(to);
        this.trans.set(DivSugar.Vector.ZERO);
      } else if (ratio >= DivSugar.EPSILON) {
        quat1 = DivSugar.Matrix._tmpQuat1;
        quat2 = DivSugar.Matrix._tmpQuat2;
        quat1.fromMatrix(this);
        quat2.fromMatrix(to);
        this.fromQuaternion(quat1.slerp(quat2, ratio));
      } else {
        this.trans.set(DivSugar.Vector.ZERO);
      }
      return this;
    };

    Matrix.prototype.toLocal = function(mat) {
      var rsqXA, rsqYA, rsqZA, vec;
      vec = DivSugar.Matrix._tmpVec1;
      rsqXA = 1 / mat.xAxis.sqNorm();
      rsqYA = 1 / mat.yAxis.sqNorm();
      rsqZA = 1 / mat.zAxis.sqNorm();
      vec.set(this.trans).sub(mat.trans);
      this.set(this.xAxis.dot(mat.xAxis) * rsqXA, this.xAxis.dot(mat.yAxis) * rsqYA, this.xAxis.dot(mat.zAxis) * rsqZA, this.yAxis.dot(mat.xAxis) * rsqXA, this.yAxis.dot(mat.yAxis) * rsqYA, this.yAxis.dot(mat.zAxis) * rsqZA, this.zAxis.dot(mat.xAxis) * rsqXA, this.zAxis.dot(mat.yAxis) * rsqYA, this.zAxis.dot(mat.zAxis) * rsqZA, vec.dot(mat.xAxis) * rsqXA, vec.dot(mat.yAxis) * rsqYA, vec.dot(mat.zAxis) * rsqZA);
      return this;
    };

    Matrix.prototype.toGlobal = function(mat) {
      this.xAxis.toGlobal_noTrans(mat);
      this.yAxis.toGlobal_noTrans(mat);
      this.zAxis.toGlobal_noTrans(mat);
      this.trans.toGlobal(mat);
      return this;
    };

    Matrix.prototype.toLocal_noTrans = function(mat) {
      var rsqXA, rsqYA, rsqZA;
      rsqXA = 1 / mat.xAxis.sqNorm();
      rsqYA = 1 / mat.yAxis.sqNorm();
      rsqZA = 1 / mat.zAxis.sqNorm();
      this.set(this.xAxis.dot(mat.xAxis) * rsqXA, this.xAxis.dot(mat.yAxis) * rsqYA, this.xAxis.dot(mat.zAxis) * rsqZA, this.yAxis.dot(mat.xAxis) * rsqXA, this.yAxis.dot(mat.yAxis) * rsqYA, this.yAxis.dot(mat.zAxis) * rsqZA, this.zAxis.dot(mat.xAxis) * rsqXA, this.zAxis.dot(mat.yAxis) * rsqYA, this.zAxis.dot(mat.zAxis) * rsqZA, 0, 0, 0);
      return this;
    };

    Matrix.prototype.toGlobal_noTrans = function(mat) {
      this.xAxis.toGlobal_noTrans(mat);
      this.yAxis.toGlobal_noTrans(mat);
      this.zAxis.toGlobal_noTrans(mat);
      this.trans.set(DivSugar.Vector.ZERO);
      return this;
    };

    Matrix.prototype.lookAt = function(from, to, up) {
      this.zAxis.set(from).sub(to).normalize();
      this.xAxis.set(up).cross(this.zAxis).normalize();
      this.yAxis.set(this.zAxis).cross(this.xAxis);
      this.trans.set(from);
      return this;
    };

    Matrix.prototype.equal = function(mat) {
      return this.xAxis.equal(mat.xAxis) && this.yAxis.equal(mat.yAxis) && this.zAxis.equal(mat.zAxis) && this.trans.equal(mat.trans);
    };

    Matrix.prototype.toString = function() {
      return "(" + (this.xAxis.toString()) + ", " + (this.yAxis.toString()) + ", " + (this.zAxis.toString()) + ", " + (this.trans.toString()) + ")";
    };

    Matrix.prototype.toCSSTransform = function() {
      var nod;
      nod = DivSugar.NUM_OF_DIGITS;
      return 'matrix3d(' + ("" + (this.xAxis.x.toFixed(nod)) + ", " + (this.xAxis.y.toFixed(nod)) + ", " + (this.xAxis.z.toFixed(nod)) + ", 0, ") + ("" + (this.yAxis.x.toFixed(nod)) + ", " + (this.yAxis.y.toFixed(nod)) + ", " + (this.yAxis.z.toFixed(nod)) + ", 0, ") + ("" + (this.zAxis.x.toFixed(nod)) + ", " + (this.zAxis.y.toFixed(nod)) + ", " + (this.zAxis.z.toFixed(nod)) + ", 0, ") + ("" + (this.trans.x.toFixed(nod)) + ", " + (this.trans.y.toFixed(nod)) + ", " + (this.trans.z.toFixed(nod)) + ", 1)");
    };

    return Matrix;

  })();

  DivSugar.Matrix.UNIT = new DivSugar.Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0);

  DivSugar.Matrix._tmpVec1 = new DivSugar.Vector();

  DivSugar.Matrix._tmpVec2 = new DivSugar.Vector();

  DivSugar.Matrix._tmpVec3 = new DivSugar.Vector();

  DivSugar.Matrix._tmpMat1 = new DivSugar.Matrix();

  DivSugar.Quaternion = (function() {

    function Quaternion(x, y, z, w) {
      var quat;
      switch (arguments.length) {
        case 0:
          this.x = this.y = this.z = this.w = 0;
          break;
        case 1:
          quat = x;
          this.x = quat.x;
          this.y = quat.y;
          this.z = quat.z;
          this.w = quat.w;
          break;
        default:
          this.x = x;
          this.y = y;
          this.z = z;
          this.w = w;
      }
    }

    Quaternion.prototype.set = function(x, y, z, w) {
      var quat;
      if (arguments.length === 1) {
        quat = x;
        this.x = quat.x;
        this.y = quat.y;
        this.z = quat.z;
        this.w = quat.w;
      } else {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
      }
      return this;
    };

    Quaternion.prototype.fromMatrix = function(mat) {
      var k, matXAxis, matYAxis, matZAxis, root, scale, trace;
      matXAxis = mat.xAxis;
      matYAxis = mat.yAxis;
      matZAxis = mat.zAxis;
      trace = matXAxis.x + matYAxis.y + matZAxis.z;
      if (trace > 0) {
        root = Math.sqrt(trace + 1);
        scale = 0.5 / root;
        this.set((matYAxis.z - matZAxis.y) * scale, (matZAxis.x - matXAxis.z) * scale, (matXAxis.y - matYAxis.x) * scale, root * 0.5);
      } else {
        k = matYAxis.y > matXAxis.x ? (matZAxis.z > matYAxis.y ? 2 : 1) : (matZAxis.z > matXAxis.x ? 2 : 0);
        switch (k) {
          case 0:
            root = Math.sqrt(matXAxis.x - (matYAxis.y + matZAxis.z) + 1);
            scale = root !== 0 ? 0.5 / root : root;
            this.set(root * 0.5, (matXAxis.y + matYAxis.x) * scale, (matZAxis.x + matXAxis.z) * scale, (matYAxis.z - matZAxis.y) * scale);
            break;
          case 1:
            root = Math.sqrt(matYAxis.y - (matZAxis.z + matXAxis.x) + 1);
            scale = root !== 0 ? 0.5 / root : root;
            this.set((matXAxis.y + matYAxis.x) * scale, root * 0.5, (matYAxis.z + matZAxis.y) * scale, (matZAxis.x - matXAxis.z) * scale);
            break;
          default:
            root = Math.sqrt(matZAxis.z - (matXAxis.x + matYAxis.y) + 1);
            scale = root !== 0 ? 0.5 / root : root;
            this.set((matZAxis.x + matXAxis.z) * scale, (matYAxis.z + matZAxis.y) * scale, root * 0.5, (matXAxis.y - matYAxis.x) * scale);
        }
      }
      return this;
    };

    Quaternion.prototype.slerp = function(to, ratio) {
      var cosOmega, omega, quat, scale0, scale1, sinOmega;
      if (ratio > 1 - DivSugar.EPSILON) {
        this.set(to);
      } else if (ratio >= DivSugar.EPSILON) {
        quat = DivSugar.Quaternion._tmpQuat1;
        cosOmega = this.x * to.x + this.y * to.y + this.z * to.z + this.w * to.w;
        if (cosOmega < 0) {
          cosOmega = -cosOmega;
          quat.set(-to.x, -to.y, -to.z, -to.w);
        } else {
          quat.set(to);
        }
        if (cosOmega >= 1) {
          this.set(to);
        } else {
          omega = Math.acos(cosOmega > 1 ? 1 : cosOmega);
          sinOmega = Math.sin(omega);
          scale0 = Math.sin(omega * (1 - ratio)) / sinOmega;
          scale1 = Math.sin(omega * ratio) / sinOmega;
          this.set(this.x * scale0 + quat.x * scale1, this.y * scale0 + quat.y * scale1, this.z * scale0 + quat.z * scale1, this.w * scale0 + quat.w * scale1);
        }
      }
      return this;
    };

    Quaternion.prototype.equal = function(quat) {
      return this.x === quat.x && this.y === quat.y && this.z === quat.z && this.w === quat.w;
    };

    Quaternion.prototype.toString = function() {
      return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
    };

    return Quaternion;

  })();

  DivSugar.Quaternion._tmpQuat1 = new DivSugar.Quaternion();

  DivSugar.Matrix._tmpQuat1 = new DivSugar.Quaternion();

  DivSugar.Matrix._tmpQuat2 = new DivSugar.Quaternion();

  DivSugar._Scene = {
    _initialize: function(id) {
      this.id = id != null ? id : null;
      this.style.margin = '0px';
      this.style.padding = '0px';
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.style[DivSugar._transformStyle] = 'preserve-3d';
      this.style[DivSugar._transformOrigin] = '0% 0%';
      this.style[DivSugar._perspectiveOrigin] = '50% 50%';
      this.setPerspective(1000);
      this.setSize(100, 100);
      this.setPosition(0, 0);
      this.setVisible(true);
      this.setClip(true);
      this.setOpacity(1);
      this.setImage('#0000ff');
      return this.setImageClip(0, 0, 1, 1);
    },
    getPerspective: function() {
      return this._perspective;
    },
    setPerspective: function(perspective) {
      this._perspective = perspective;
      this.style[DivSugar._perspective] = "" + (perspective.toFixed(DivSugar.NUM_OF_DIGITS)) + "px";
      return this;
    },
    getWidth: function() {
      return this._width;
    },
    getHeight: function() {
      return this._height;
    },
    getViewWidth: function() {
      return this._viewWidth;
    },
    getViewHeight: function() {
      return this._viewHeight;
    },
    setSize: function(width, height, viewWidth, viewHeight) {
      var nod, sx, sy, x, y;
      if (viewWidth == null) viewWidth = width;
      if (viewHeight == null) viewHeight = height;
      this._width = width;
      this._height = height;
      this._viewWidth = viewWidth;
      this._viewHeight = viewHeight;
      x = (width - viewWidth) / 2;
      y = (height - viewHeight) / 2;
      sx = width / viewWidth;
      sy = height / viewHeight;
      nod = DivSugar.NUM_OF_DIGITS;
      this.style.width = "" + (viewWidth.toFixed(nod)) + "px";
      this.style.height = "" + (viewHeight.toFixed(nod)) + "px";
      this.style[DivSugar._transform] = "translate(" + (x.toFixed(nod)) + "px, " + (y.toFixed(nod)) + "px) scale(" + (sx.toFixed(nod)) + ", " + (sy.toFixed(nod)) + ")";
      this.setImageClip(this._imageClipU1, this._imageClipV1, this._imageClipU2, this._imageClipV2);
      return this;
    },
    getPositionX: function() {
      return this._positionX;
    },
    getPositionY: function() {
      return this._positionY;
    },
    setPosition: function(x, y) {
      this._positionX = x;
      this._positionY = y;
      this.style.left = "" + (x.toFixed(DivSugar.NUM_OF_DIGITS)) + "px";
      this.style.top = "" + (y.toFixed(DivSugar.NUM_OF_DIGITS)) + "px";
      return this;
    },
    getVisible: function() {
      return this._visible;
    },
    setVisible: function(visible) {
      this._visible = visible;
      this.style.visibility = visible ? 'visible' : 'hidden';
      return this;
    },
    getClip: function() {
      return this._clip;
    },
    setClip: function(clip) {
      this._clip = clip;
      this.style.overflow = clip ? 'hidden' : 'visible';
      return this;
    },
    getOpacity: function() {
      return this._opacity;
    },
    setOpacity: function(opacity) {
      this._opacity = opacity;
      this.style.opacity = opacity.toFixed(DivSugar.NUM_OF_DIGITS);
      return this;
    },
    getImage: function() {
      return this._image;
    },
    setImage: function(image) {
      this._image = image;
      if (!(image != null)) {
        this.style.backgroundColor = null;
        this.style.backgroundImage = null;
      } else if (image.charAt(0) === '#') {
        this.style.backgroundColor = image;
        this.style.backgroundImage = null;
      } else {
        this.style.backgroundColor = null;
        this.style.backgroundImage = "url(" + image + ")";
      }
      return this;
    },
    getImageClipU1: function() {
      return this._imageClipU1;
    },
    getImageClipV1: function() {
      return this._imageClipV1;
    },
    getImageClipU2: function() {
      return this._imageClipU2;
    },
    getImageClipV2: function() {
      return this._imageClipV2;
    },
    setImageClip: function(u1, v1, u2, v2) {
      var h, nod, w, x, y;
      this._imageClipU1 = u1;
      this._imageClipV1 = v1;
      this._imageClipU2 = u2;
      this._imageClipV2 = v2;
      w = 1 / (u2 - u1) * 100;
      h = 1 / (v2 - v1) * 100;
      x = u1 * w;
      y = v1 * h;
      nod = DivSugar.NUM_OF_DIGITS;
      this.style.backgroundPosition = "" + (x.toFixed(nod)) + "% " + (y.toFixed(nod)) + "%";
      this.style.backgroundSize = "" + (w.toFixed(nod)) + "% " + (h.toFixed(nod)) + "%";
      return this;
    }
  };

  DivSugar._Sprite = {
    _initialize: function(id) {
      this.id = id != null ? id : null;
      this.style.margin = '0px';
      this.style.padding = '0px';
      this.style.position = 'absolute';
      this.style[DivSugar._transformStyle] = 'preserve-3d';
      this.style[DivSugar._transformOrigin] = '0% 0%';
      this._transform = new DivSugar.Matrix();
      this.setSize(100, 100);
      this.setPosition(0, 0, 0);
      this.setVisible(true);
      this.setClip(false);
      this.setOpacity(1);
      this.setImage(null);
      this.setImageClip(0, 0, 1, 1);
      return this.stopCSSAnimation();
    },
    getWidth: function() {
      return this._width;
    },
    getHeight: function() {
      return this._height;
    },
    setSize: function(width, height) {
      this._width = width;
      this._height = height;
      this.style.width = "" + (width.toFixed(DivSugar.NUM_OF_DIGITS)) + "px";
      this.style.height = "" + (height.toFixed(DivSugar.NUM_OF_DIGITS)) + "px";
      this.setImageClip(this._imageClipU1, this._imageClipV1, this._imageClipU2, this._imageClipV2);
      return this;
    },
    getPositionX: function() {
      return this._transform.trans.x;
    },
    getPositionY: function() {
      return this._transform.trans.y;
    },
    getPositionZ: function() {
      return this._transform.trans.z;
    },
    getPosition: function(vec) {
      vec.x = this._transform.trans.x;
      vec.y = this._transform.trans.y;
      vec.z = this._transform.trans.z;
      return this;
    },
    setPosition: function(x, y, z) {
      var vec;
      if (arguments.length === 1) {
        vec = x;
        this._transform.trans.set(vec);
      } else {
        this._transform.trans.x = x;
        this._transform.trans.y = y;
        this._transform.trans.z = z;
      }
      this.style[DivSugar._transform] = this._transform.toCSSTransform();
      return this;
    },
    getTransform: function(mat) {
      mat.set(this._transform);
      return this;
    },
    setTransform: function(mat) {
      this._transform.set(mat);
      this.style[DivSugar._transform] = this._transform.toCSSTransform();
      return this;
    },
    getVisible: DivSugar._Scene.getVisible,
    setVisible: DivSugar._Scene.setVisible,
    getClip: DivSugar._Scene.getClip,
    setClip: DivSugar._Scene.setClip,
    getOpacity: DivSugar._Scene.getOpacity,
    setOpacity: DivSugar._Scene.setOpacity,
    getImage: DivSugar._Scene.getImage,
    setImage: DivSugar._Scene.setImage,
    getImageClipU1: DivSugar._Scene.getImageClipU1,
    getImageClipV1: DivSugar._Scene.getImageClipV1,
    getImageClipU2: DivSugar._Scene.getImageClipU2,
    getImageClipV2: DivSugar._Scene.getImageClipV2,
    setImageClip: DivSugar._Scene.setImageClip,
    getCSSAnimation: function() {
      return this._cssAnimation;
    },
    playCSSAnimation: function(name, duration, timing, delay, count, direction, fill) {
      if (timing == null) timing = 'ease';
      if (delay == null) delay = 0;
      if (count == null) count = 1;
      if (direction == null) direction = 'normal';
      if (fill == null) fill = 'both';
      this._cssAnimation = name;
      this.style[DivSugar._animationName] = name;
      this.style[DivSugar._animationDuration] = "" + (duration.toFixed(DivSugar.NUM_OF_DIGITS)) + "s";
      this.style[DivSugar._animationTimingFunction] = timing;
      this.style[DivSugar._animationDirection] = "" + (delay.toFixed(DivSugar.NUM_OF_DIGITS)) + "s";
      this.style[DivSugar._animationIterationCount] = count;
      this.style[DivSugar._animationDirection] = direction;
      this.style[DivSugar._animationFillMode] = fill;
      return this;
    },
    stopCSSAnimation: function(name) {
      this._cssAnimation = null;
      this.style[DivSugar._animationName] = 'none';
      return this;
    },
    translate: function(offsetX, offsetY, offsetZ) {
      this._transform.translate(offsetX, offsetY, offsetZ);
      this.style[DivSugar._transform] = this._transform.toCSSTransform();
      return this;
    },
    rotate: function(rotateX, rotateY, rotateZ) {
      this._transform.rotate(rotateX, rotateY, rotateZ);
      this.style[DivSugar._transform] = this._transform.toCSSTransform();
      return this;
    },
    scale: function(scaleX, scaleY, scaleZ) {
      this._transform.scale(scaleX, scaleY, scaleZ);
      this.style[DivSugar._transform] = this._transform.toCSSTransform();
      return this;
    }
  };

  DivSugar._Task = (function() {

    function _Task(id) {
      this.id = id;
      this.update = __bind(this.update, this);
      this.active = true;
      this.onUpdate = null;
      this.onDestroy = null;
      this._parent = null;
      this._children = [];
    }

    _Task.prototype.getParent = function() {
      return this._parent;
    };

    _Task.prototype.update = function(elapsedTime) {
      var child, _i, _len, _ref, _results;
      if (this.active) {
        if (typeof this.onUpdate === "function") this.onUpdate(elapsedTime);
        _ref = this._children;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          _results.push(child.update(elapsedTime));
        }
        return _results;
      }
    };

    _Task.prototype.destroy = function() {
      var child, _i, _len, _ref, _ref2, _results;
      if (typeof this.onDestroy === "function") this.onDestroy();
      if ((_ref = this._parent) != null) _ref.removeChild(this);
      _ref2 = this._children;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        child = _ref2[_i];
        _results.push(child.destroy());
      }
      return _results;
    };

    _Task.prototype.appendChild = function(task) {
      this.removeChild(task);
      this._children.push(task);
      return task._parent = this;
    };

    _Task.prototype.removeChild = function(task) {
      var i;
      i = this._children.indexOf(task);
      if (i > -1) {
        this._children.splice(i, 1);
        task._parent = null;
      }
      return this;
    };

    _Task.prototype.getTaskById = function(id) {
      var child, task, _i, _len, _ref;
      if (this.id === id) {
        return this;
      } else {
        _ref = this._children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          task = child.getTaskById(id);
          if (task != null) return task;
        }
        return null;
      }
    };

    return _Task;

  })();

  DivSugar.rootTask = DivSugar.createTask('root');

}).call(this);
