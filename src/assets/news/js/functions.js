( function( $ ) {
	"use strict";

	function Menu(){
		$( '#header .menu .icon-menu' ).click( function(){
			$('body').toggleClass( 'active-menu' );
			$('body').removeClass( 'active-news' );
		} );
		$( '#header .news .icon-txt' ).click( function(){
			$('body').toggleClass( 'active-news' );
			$('body').removeClass( 'active-menu' );
		} );

		$('#header .menu .main-menu li').each(function(){
			var _this = $(this);

			var count = _this.find('ul').length;
			if( count ){
				_this.addClass('bullet');
				$( '<i class="bullet-icon bz-down"></i>' ).insertAfter( _this.children( 'a' ) );
			}
		});

		$( '#header .menu .main-menu .bullet-icon' ).click( function(){
			if( $( '#header .menu .icon-menu' ).not( ':visible' ) ) {
				var parent = $( this ).parent();

				if( parent.hasClass( 'active-down' ) ) {
					$( this ).siblings( 'ul' ).stop( true, true ).slideUp();
				} else {
					$( this ).siblings( 'ul' ).stop( true, true ).slideDown();
				}
				parent.toggleClass( 'active-down' );
			}
		});
	}

	function Lightbox() {
		if( typeof $.fancybox == 'function' ) {
			$().fancybox({
				selector : '[data-fancybox]',
				loop     : false
			});
		}
	}

	$( document ).ready( function() {
		Menu();
		Lightbox();
	} );

	$(window).on('load', function(){});

} )( jQuery );
