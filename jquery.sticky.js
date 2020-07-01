/**
 * Sticky 1.0.0
 * https://github.com/AchalJ
 *
 * Copyright (c) 2020 Achal Jain
 *
 * Licensed under the MIT License
 */
(function(factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define( ['jquery'], factory );
	} else if ( typeof module === 'object' && module.exports ) {
		// Node/CommonJS
		module.exports = function ( root, jQuery ) {
			if ( jQuery === undefined ) {
				if ( typeof window !== 'undefined' ) {
					jQuery = require( 'jquery' );
				} else {
					jQuery = require( 'jquery' )( root );
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function($) {
	$.fn.sticky = function (options) {
		if ( 'string' === typeof options && 'destroy' === options ) {
			return this.each(function() {
				var $this = $(this);
				if ( $this.parent().hasClass( 'element-sticky--wrapper' ) ) {
					$this.unwrap();
					$this
						.removeClass( $this.data( 'sticky-class' ) )
						.removeAttr( 'data-sticky-class' )
						.removeAttr( 'style' );
				} else {
					throw Error( 'Cannot destroy before initializing sticky element.' );
				}
			});
		}

		var options = $.extend({
			offsetY: 0,
			zIndex: 99,
			outerWidth: false,
			cssClass: 'element-sticky'
		}, options);

		return this.each(function() {
			var $this = $(this);
			$this.attr( 'data-sticky-class', options.cssClass );

			var width = options.outerWidth ? $this.outerWidth() : $this.width(),
				height = $this.outerHeight(),
				marginTop = parseFloat( $this.css('margin-top') ),
				marginBottom = parseFloat( $this.css('margin-bottom') ),
				position = $this.prop('style').position,
				top = $this.prop('style').top,
				offsetTop = $this.offset().top;

			var offsetY = ! isNaN( parseFloat( options.offsetY ) ) ? parseFloat( options.offsetY ) : 0,
				cssClass = options.cssClass;

			$this.wrapAll('<div />').parent().addClass('element-sticky--wrapper').css({
				'height': height,
				'margin-bottom': ! isNaN( marginBottom ) ? marginBottom : 'auto',
			});

			$(window).on('scroll', function() {
				if ( ! $this.parent().hasClass('element-sticky--wrapper') ) {
					return;
				}
				var scrollY = $(window).scrollTop() + offsetY;
				scrollY += ! isNaN( marginTop ) ? marginTop : 0;
				if ( scrollY >= offsetTop ) {
					$this.css({
						position: 'fixed',
						top: offsetY + 'px',
						width: width + 'px'
					});
					if ( options.zIndex && ! isNaN( parseInt( options.zIndex ) ) ) {
						$this.css( 'z-index', parseInt( options.zIndex ) );
					}
					if ( ! $this.hasClass( cssClass ) ) {
						$this.addClass( cssClass );
					}
				} else {
					$this.css({
						position: '' !== position ? position : 'static',
						top: '' !== top ? top : offsetY + 'px'
					});
					if ( $this.hasClass( cssClass ) ) {
						$this.removeClass( cssClass );
					}
				}
			});
		});
	};
}));