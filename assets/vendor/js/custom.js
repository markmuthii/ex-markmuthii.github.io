$(window).ready(function(){
	$(window).scroll(function(){
		var docHeight 		= $(document).height();
		var winHeight 		= $(window).height();
		var disToTop  		= $(window).scrollTop();
		var percentScroll = disToTop/(docHeight - winHeight) * 100;
		$('#progress-bar').css({
			'width' : percentScroll + '%'
		});
	});
});



