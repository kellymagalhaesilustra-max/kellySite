/*
DearFlip-like jQuery plugin (dearflip-jquery-plugin.js)
Dependencies:
 - jQuery (>=3.0)
 - PDF.js (mozilla) as global `pdfjsLib` (or use image arrays instead of PDF)

Overview:
 - Creates a 3D flipbook with CSS 3D transforms
 - Accepts a PDF URL (rendered with PDF.js) OR an array of image URLs
 - Lazy-renders pages into canvases
 - Emits events/callbacks for page changes

Usage example (see bottom of file for init example + CSS snippet)
*/

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    root.dearFlip = factory(root.jQuery);
  }
}(this, function ($) {
  'use strict';

  var defaults = {
    width: 800,
    height: 520,
    pageGap: 8,
    startPage: 1,
    totalPages: null,    // if image array used you can pass length
    pdfUrl: null,        // if using PDF.js
    pdfData: null,       // PDF as ArrayBuffer
    images: null,        // array of image URLs OR null
    renderScale: 1.5,    // PDF render scale multiplier
    lazyRenderAhead: 2,  // how many pages ahead to render
    className: 'dearflip',
    onPageFlip: function (pageIndex) {},
  };

  function Plugin(element, options) {
    this.$el = $(element);
    this.opts = $.extend({}, defaults, options);
    this.current = Math.max(1, this.opts.startPage);
    this.pdf = null; // pdfjs document
    this.total = this.opts.totalPages || 0;
    this._init();
  }

  Plugin.prototype = {
    _init: function () {
      var self = this;
      self.$el.addClass(self.opts.className).css({ width: self.opts.width + 'px' });
      self._buildMarkup();

      if ((self.opts.pdfUrl || self.opts.pdfData) && window.pdfjsLib) {
        // Configurar worker do PDF.js se não estiver configurado
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
        }
        
        var pdfSource = self.opts.pdfData || self.opts.pdfUrl;
        console.log('Carregando PDF:', self.opts.pdfUrl ? 'URL' : 'ArrayBuffer');
        
        pdfjsLib.getDocument(pdfSource).promise.then(function (pdf) {
          console.log('PDF carregado com sucesso, páginas:', pdf.numPages);
          self.pdf = pdf;
          self.total = pdf.numPages;
          self._renderBook();
        }).catch(function (err) {
          console.error('Erro ao carregar PDF:', err);
          // Fallback para placeholder se PDF falhar
          self.total = 10;
          self._renderBook();
        });
      } else if (Array.isArray(self.opts.images) && self.opts.images.length) {
        self.total = self.opts.images.length;
        self._renderBook();
      } else if (self.total > 0) {
        self._renderBook();
      } else {
        console.warn('DearFlip: no pdfUrl or images provided and totalPages is not set.');
      }

      this._bindUI();
    },

    _buildMarkup: function () {
      var wrapper = $(
        '<div class="df-wrapper">' +
        '  <div class="df-book-stage">' +
        '    <div class="df-pages"></div>' +
        '  </div>' +
        '  <button class="df-btn df-prev" aria-label="previous">‹</button>' +
        '  <button class="df-btn df-next" aria-label="next">›</button>' +
        '</div>'
      );
      this.$el.empty().append(wrapper);
      this.$pages = this.$el.find('.df-pages');
    },

    _bindUI: function () {
      var self = this;
      this.$el.on('click', '.df-next', function () { self.next(); });
      this.$el.on('click', '.df-prev', function () { self.prev(); });
      // Optional: keyboard
      $(document).on('keydown.dearflip', function (e) {
        if (e.key === 'ArrowRight') self.next();
        if (e.key === 'ArrowLeft') self.prev();
      });
    },

    _renderBook: function () {
      var self = this;
      // Create page elements (two pages per spread: left & right)
      this.$pages.empty();

      for (var i = 1; i <= this.total; i++) {
        var $p = $('<div class="df-page" data-page="' + i + ''><div class="df-canvas-wrap"><canvas></canvas></div></div>');
        $p.css({ width: (self.opts.width / 2 - self.opts.pageGap / 2) + 'px', height: self.opts.height + 'px' });
        this.$pages.append($p);
      }

      // initial render around start page
      this._renderSurrounding(this.current);
      this._updateVisual();
    },

    _renderSurrounding: function (page) {
      var self = this;
      var start = Math.max(1, page - this.opts.lazyRenderAhead);
      var end = Math.min(this.total, page + this.opts.lazyRenderAhead);
      for (var p = start; p <= end; p++) {
        this._renderPage(p);
      }
    },

    _renderPage: function (pageNum) {
      var $page = this.$pages.find('.df-page[data-page="' + pageNum + '"]');
      if (!$page.length) return;
      if ($page.data('rendered')) return;
      var canvas = $page.find('canvas')[0];
      canvas.width = Math.floor((this.opts.width / 2) * this.opts.renderScale);
      canvas.height = Math.floor(this.opts.height * this.opts.renderScale);
      var ctx = canvas.getContext('2d');

      var drawImageToCanvas = function (img) {
        // Fit preserving aspect
        var iw = img.width, ih = img.height;
        var ratio = Math.min(canvas.width / iw, canvas.height / ih);
        var dw = Math.floor(iw * ratio);
        var dh = Math.floor(ih * ratio);
        var dx = Math.floor((canvas.width - dw) / 2);
        var dy = Math.floor((canvas.height - dh) / 2);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh);
        $page.data('rendered', true);
      };

      if (this.pdf) {
        var selfp = this;
        this.pdf.getPage(pageNum).then(function (page) {
          var viewport = page.getViewport({ scale: selfp.opts.renderScale });
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          var renderContext = { canvasContext: ctx, viewport: viewport };
          page.render(renderContext).promise.then(function () {
            $page.data('rendered', true);
            console.log('Página PDF renderizada:', pageNum);
          }).catch(function(err) {
            console.error('Erro ao renderizar página PDF:', pageNum, err);
            // Fallback para placeholder
            ctx.fillStyle = '#f3f3f3';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#999';
            ctx.font = '20px sans-serif';
            ctx.fillText('Erro na página ' + pageNum, 20, 40);
            $page.data('rendered', true);
          });
        }).catch(function(err) {
          console.error('Erro ao obter página PDF:', pageNum, err);
          // Fallback para placeholder
          ctx.fillStyle = '#f3f3f3';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#999';
          ctx.font = '20px sans-serif';
          ctx.fillText('Erro na página ' + pageNum, 20, 40);
          $page.data('rendered', true);
        });
      } else if (Array.isArray(this.opts.images) && this.opts.images[pageNum - 1]) {
        var img = new Image();
        img.onload = function () { drawImageToCanvas(img); };
        img.onerror = function () { console.warn('Could not load image', self.opts.images[pageNum - 1]); };
        img.src = this.opts.images[pageNum - 1];
      } else {
        // placeholder
        ctx.fillStyle = '#f3f3f3';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#999';
        ctx.font = '20px sans-serif';
        ctx.fillText('Page ' + pageNum, 20, 40);
        $page.data('rendered', true);
      }
    },

    _updateVisual: function () {
      // Manage 3D spread positioning. Each page is a half-spread; even pages right side etc.
      var self = this;
      var pages = this.$pages.find('.df-page');
      pages.removeClass('df-left df-right df-open df-flipped df-current');

      pages.each(function (i, el) {
        var $p = $(el);
        var pnum = parseInt($p.attr('data-page'), 10);
        if (pnum < self.current) {
          $p.addClass('df-flipped');
        }
        if (pnum % 2 === 0) $p.addClass('df-right'); else $p.addClass('df-left');
        if (pnum === self.current) $p.addClass('df-current');
      });

      // call callback
      try { this.opts.onPageFlip(this.current); } catch (e) {}
    },

    goTo: function (pageNum) {
      pageNum = Math.max(1, Math.min(this.total, pageNum));
      this.current = pageNum;
      this._renderSurrounding(pageNum);
      this._updateVisual();
    },

    next: function () {
      if (this.current < this.total) this.goTo(this.current + 1);
    },

    prev: function () {
      if (this.current > 1) this.goTo(this.current - 1);
    },

    destroy: function () {
      this.$el.removeClass(this.opts.className).empty();
      $(document).off('keydown.dearflip');
      this.$el.removeData('dearflip');
    }
  };

  // jQuery plugin wrapper
  $.fn.dearFlip = function (optionsOrMethod) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
      var instance = $(this).data('dearflip');
      if (!instance) {
        if (typeof optionsOrMethod === 'object' || !optionsOrMethod) {
          instance = new Plugin(this, optionsOrMethod || {});
          $(this).data('dearflip', instance);
        } else {
          $.error('DearFlip: plugin not initialized yet');
        }
      } else {
        if (typeof optionsOrMethod === 'string' && typeof instance[optionsOrMethod] === 'function') {
          instance[optionsOrMethod].apply(instance, args);
        } else if (typeof optionsOrMethod === 'object') {
          $.extend(instance.opts, optionsOrMethod);
        }
      }
    });
  };

  return Plugin;
}));

/* ------------------
   Usage example (HTML snippet - include this in your page)
   ------------------

<link rel="stylesheet" href="dearflip.css"> <!-- create CSS per snippet below -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://mozilla.github.io/pdf.js/build/pdf.js"></script> <!-- pdf.js -> exposes pdfjsLib -->
<script src="dearflip-jquery-plugin.js"></script>

<div id="my-flipbook"></div>

<script>
  $('#my-flipbook').dearFlip({
    pdfUrl: '/path/to/book.pdf',
    width: 900,
    height: 600,
    startPage: 1,
    renderScale: 1.2,
    onPageFlip: function (p) { console.log('flipped ->', p); }
  });
</script>

/* Minimal CSS (save as dearflip.css) */
/* Paste into a CSS file and refine visuals as you want */

/* .dearflip wrapper */
.dearflip { perspective: 2000px; position: relative; }
.dearflip .df-wrapper { position: relative; }
.dearflip .df-book-stage { overflow: visible; position: relative; transform-style: preserve-3d; }
.dearflip .df-pages { display: flex; flex-wrap: nowrap; align-items: stretch; justify-content: center; }
.dearflip .df-page { box-sizing: border-box; padding: 12px; transform-origin: left center; backface-visibility: hidden; transition: transform 650ms cubic-bezier(.2,.9,.3,1); position: relative; }
.dearflip .df-page.df-right { transform-origin: right center; }
.dearflip .df-page.df-flipped { transform: rotateY(-180deg); z-index: 1; }
.dearflip .df-page canvas { width: 100%; height: 100%; display: block; }
.dearflip .df-btn { position: absolute; top: 50%; transform: translateY(-50%); z-index: 999; background: rgba(0,0,0,0.4); color: #fff; border: none; font-size: 28px; width: 44px; height: 44px; border-radius: 50%; }
.dearflip .df-prev { left: 8px; }
.dearflip .df-next { right: 8px; }

/* Adjust more CSS to create a stacked 3D look: subtle shadows, page edges, gradients, etc. */
