'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = watch;
exports.unwatch = unwatch;
exports.destroy = destroy;
var isMonitoring = false;
var isScrolling = false;
var watchers = new Set();

function onScroll(e) {
  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(update);
  }
}

function update() {
  isScrolling = false;
  watchers.forEach(function (cb) {
    return cb();
  });
}

function start() {
  if (!isMonitoring) {
    window.addEventListener('scroll', onScroll);
    isMonitoring = true;
  }
}

function stop() {
  if (isMonitoring) {
    watchers.clear();
    window.removeEventListener('scroll', onScroll);
    isMonitoring = false;
  }
}

function watch(cb) {
  if (!isMonitoring) start();
  watchers.add(cb);
}

function unwatch(cb) {
  watchers.delete(cb);
  if (!watchers.size) stop();
}

function destroy() {
  stop();
}