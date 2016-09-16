/**
 * File Preview
 */

/**
 * Contructor
 */
var filePreview = function() {
  this.fileElm = null;
  this.previewElm = null;
  this.fullpath = null;
  this.target = 'image_file';
  this.previewTarget = 'preview';
  this.hidden = 'path';
  var self = this;

  document.addEventListener('DOMContentLoaded', function() {
    self.fileElm = document.getElementById(self.target);
    self.previewElm = document.getElementById(self.previewTarget);
    self.fullpath = document.getElementById(self.hidden);
    self.bindEvent();
  }, false);
};

/**
 * catch file change event
 */
filePreview.prototype.bindEvent = function() {
  console.log('bindEvent');
  var self = this;
  this.fileElm.addEventListener('change', function() {
    var file = self.fileElm.files[0];
    if (!file.type.match(/(png|jpeg|jpg|gif|PNG|JPEG|JPG|GIF)$/)) return false;
    var fr  = new FileReader();
    fr.onload = function() {
      self.previewElm.src = fr.result;
      self.fullpath.value = fr.result;
    };
    fr.readAsDataURL(file);
  }, false);
};

if (!window.Matty) {
  /**
   * @class
   * Matty is parent class
   */
  window.Matty = new Object();
}

/**
 * generate instance
 */
window.Matty.filePreview = new filePreview();
