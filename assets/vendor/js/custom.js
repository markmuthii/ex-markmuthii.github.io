$(window).ready(function(){
	progressBar();

	var $form = $('#mc-update-list-form');
	var messagesArea = $('#mc-text');
	if($form.length > 0){
		$('form input[type="submit"]').bind('click', (event) => {
			if (event) event.preventDefault();

			var fName = $('#mc-blog-update-MERGE1').val();
			var email = $('#mc-blog-update-MERGE0').val();

			var validateResult = validateMCForm(fName, email);

			if(validateResult == 'valid'){
				subscribeMCForm($form, messagesArea);
			}else{
				$('#mc-text-legal').html('');
				$('#mc-gdpr').html('');
				messagesArea.html(validateResult);
			}


		})
	}
});

// function blogUpdateList() {
// 	var fName = $('#mc-blog-update-MERGE1').val();
// 	var email = $('#mc-blog-update-MERGE0').val();
// 	var $form = $('#mc-update-list-form');
// 	var messagesArea = $('#mc-text');
// 	if($form.length > 0){
// 		$('form input[type="submit"]').bind('click', (event) => {
// 			if (event) event.preventDefault();
// 			var validateResult = validateMCForm(fName, email);

// 			if(validateResult == true){
// 				subscribeMCForm($form, messagesArea);
// 			}else{
// 				$('#mc-text-legal').html('');
// 				$('#mc-gdpr').html('');
// 				messagesArea.html(validateResult);
// 				fName = '';
// 				email = '';
// 			}

// 		})
// 	}

// }

function validateMCForm(fName, email) {
	var returnValue = 'valid';
	var emailValid = validateEmail(email);

	if(fName == '' && email == ''){
		returnValue = '<span class="text-danger">Please fill in your name<br>Please fill in your email address</span>';
	}else if (fName == '' && email != '' && emailValid){
		returnValue = '<span class="text-danger">Please fill in your name</span>';
	}else if(email == '' && fName != ''){
		returnValue = '<span class="text-danger">Please fill in your email</span>';
	}else if (email != '' && fName != '' && !emailValid){
		returnValue = '<span class="text-danger">Please use a valid email</span>';
	}


	return returnValue;
}

function subscribeMCForm($form, msgArea) {
	$('#mc-update-list-subscribe').val('Adding you to list...');
	$.ajax({
		type: 	$form.attr('method'),
		url:  	$form.attr('action'),
		data: 	$form.serialize(),
		cache: 	false,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		error: (err) => {
			msgArea.html('<span class="text-danger">Something is wrong. Please check your connection and try again</span>');
			$('#mc-update-list-subscribe').val('Try Again');
		},
		success: (data) => {
			
			if(data.result == 'success') {
				// $('#formBody').html('');
				$('#mc-text-legal').html('');
				$('#mc-gdpr').html('');
				$('#mc-text').html('<span class="text-success" style="font-size: 20px;"><i class="material-icons">done_all</i> Thank you for signing up!<br>To finalize the process, I have sent you a confirmation link in your email.<br>Check it out');
				$('#mc-update-list-subscribe').val('Already Subscribed. Woohoo!').prop('disabled', true);
			}else{
				$('#mc-text-legal').html('');
				$('#mc-gdpr').html('');
				$('#mc-text').html('<span class="text-danger">Something went wrong:<br>' + data.msg + '</span>');
				$('#mc-update-list-subscribe').val('Try Again');
			}
		} 
	});
}

function validateEmail(email) {

	var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

	if(email.match(emailRegex)) {
		return true;
	}
	return false;
}

function progressBar() {
	$(window).scroll(function(){
		var docHeight 		= $(document).height();
		var winHeight 		= $(window).height();
		var disToTop  		= $(window).scrollTop();
		var percentScroll = disToTop/(docHeight - winHeight) * 100;
		$('#progress-bar').css({
			'width' : percentScroll + '%'
		});
	});
}



