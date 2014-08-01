function circleProgress() {
	$(".circle-progress").each(function(){
		var per = $(this).data("val"),
			deg = per / 100 * 360,
			iTimer = null,
			step = 0,
			n = deg / 20,
			_this = $(this);			
		if(per <= 50) {
			$(this).children(".round").removeClass("around").addClass("half");
			clearInterval(iTimer);
			setInterval(function(){
				if(step <= n) {
					step++;
					_this.find(".pie1").css({
			            '-webkit-transform': 'rotate(' + (step * -20) + 'deg)',
			            'transform': 'rotate(' + (step * -20) + 'deg)'
					});
				}else {
					clearInterval(iTimer);
				}
			},100);
		}
		else {
			$(this).children(".round").removeClass("half").addClass("around");
			clearInterval(iTimer);
			setInterval(function(){
				step++;
				if(step <= 9) {
					_this.find(".pie1").css({
			            '-webkit-transform': 'rotate(' + (step * -20) + 'deg)',
			            'transform': 'rotate(' + (step * -20) + 'deg)'
					});
				}else if(step > 9 && step <= n) {
					_this.children(".round").addClass('gl');
					_this.find(".pie2").css({
						'-webkit-transform': 'rotate(' + (step * -20) + 'deg)',
			            'transform': 'rotate(' + (step * -20) + 'deg)'
					});
				}else {
					clearInterval(iTimer);
				}
			},100);
		}
	});
}