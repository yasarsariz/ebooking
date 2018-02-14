// Copyright PHPTRAVELS Qasim Hussain

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

 //  ___  _  _  ___  _____  ___    _ __   __ ___  _     ___
 // | _ \| || || _ \|_   _|| _ \  /_\\ \ / /| __|| |   / __|
 // |  _/| __ ||  _/  | |  |   / / _ \\ V / | _| | |__ \__ \
 // |_|  |_||_||_|    |_|  |_|_\/_/ \_\\_/  |___||____||___/
 //    _                    _
 //   /_\   _ __  _ __     (_) ___
 //  / _ \ | '_ \| '_ \ _  | |(_-<
 // /_/ \_\| .__/| .__/(_)_/ |/__/
 //   ___  |_|   |_| _   |__/       _  _                      _     ____
 //  / __| ___  _ _ | |_  _ _  ___ | || | ___  _ _  ___ __ __/ |   |__ /
 // | (__ / _ \| ' \|  _|| '_|/ _ \| || |/ -_)| '_|(_-< \ V /| | _  |_ \
 //  \___|\___/|_||_|\__||_|  \___/|_||_|\___||_|  /__/  \_/ |_|(_)|___/


/*********************************
* @author Danish Jamil
* @Controller home
**********************************/
App.controller('home', function (page) {
	var appContent 		= $(page).find('.app-content');
	var appTopbar 		= $(page).find('.app-topbar');
	// var mainLogo		= $(page).find('.main-logo');

	var btnSearch 		= $(page).find('#btn-search'),
		btnBookings 	= $(page).find('#btn-bookings'),
		btnBlog 		= $(page).find('#btn-Blog'),
		btnHotels 		= $(page).find('#btn-Hotels'),
		btnExpediaHotels= $(page).find('#btn-Ean');
		btnTours 		= $(page).find('#btn-Tours'),
		btnCars 		= $(page).find('#btn-Cars'),
		btnCartrawler 		= $(page).find('#btn-Cartrawler'),
		btnFlightsdohop 		= $(page).find('#btn-Flightsdohop'),
		btnTravelstart 		= $(page).find('#btn-Travelstart'),
		btnOffers 		= $(page).find('#btn-Offers'),
		btnSettings 	= $(page).find('#btn-settings'),
		btnContactus 	= $(page).find('#btn-contactus'),
		btnSignout		= $(page).find('#btn-signout'),
		btnSignup		= $(page).find('#btn-signup'),
		btnSignin		= $(page).find('#btn-signin');
		modulesList		= $(page).find('#moduleslist');
		errorMsg		= $(page).find('#errorMsg');

	// Apply theme to topbar and buttons based on current settings.
	// if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	// else applyDefaultTheme ( $(page).find('.app-topbar') );
	// if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	console.log(get("loggedIn"));
	console.log(get("userId"));

	btnSignout.on('click', function(){
		set("loggedIn", false);
		btnSignout.hide();
		btnSignup.fadeIn();
		btnSignin.fadeIn();
	})

	$(page).find('li').on('click', function(){
		var pageName = $(this).data('target');
		if(pageName === "search"){
			App.load(pageName, modules);
		}else{
			App.load(pageName);
		}
	});

	var modules;

	var tiles = [];

	$(page).on('appShow', function(){
		try{
			Android.setText("HomePage");
			Android.hideProgress();
		}catch(ex){
			console.log(ex.message);
		}
		//Settings the base_url and api_url from config object located in index.html
		BASE_URL = config.url;
		APIKEY = config.apikey;
    	API_URL = BASE_URL + 'api';

    	var blazy = new Blazy();

    	loadModules();

    	if(get("loggedIn") == 'true'){
			btnSignup.hide();
			btnSignin.hide();
			btnSignout.show();
		}else{
			btnSignout.hide();
			btnSignup.show();
			btnSignin.show();
		}
	});

	function loadModules(){
		// Dynamic Tiles, Show hide tiles according to modules enabled on remote site
		$.ajax({
			url: API_URL + '/modulesinfo/list?appKey='+APIKEY,
			dataType: 'JSON',
			method: 'GET',
			success: function(data){
				console.log("loading modules...");
				console.log(data);
				checkError(data);
				modules = data.response;
				modules.forEach(function(item){
				var module = item.title;
				var modStatus = item.status;
				if(modStatus === false){
					$(page).find('#btn-'+module).hide();
				}else if(modStatus === true){
					$(page).find('#btn-'+module).css("display","block");
				}

				if(module == "coupons" && modStatus === true){
					set("couponsEnabled", true);
				}else{
					set("couponsEnabled", false);
				}

		});


				$('#tiles').fadeIn(1000);
			},
			error: function(error){
				console.log("Error loading modules...");
				console.log(error);
			}
		});
	}
});

/*********************************
* @author Danish Jamil
* @Controller searchPage
**********************************/
App.controller('search', function (page, modules) {
	console.log('search controller');
	var hotels 			= $(page).find('#Hotels');
	var expedia 		= $(page).find('#Ean');

	var btnSearch 		= hotels.find('#btnSearch');
	var adultsCount 	= hotels.find('#adults');
	var childrenCount 	= hotels.find('#children');
	var searchQuery 	= hotels.find('#searchQuery');
	var checkIn 		= hotels.find('#checkIn');
	var checkOut 		= hotels.find('#checkOut');

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	$(page).on('appShow', function () {
		initComponents();

		modules.forEach(function(item){
		var module = item.title;
		var modStatus = item.status;
		if(modStatus === false){
		$('#'+module+'Tab').remove();
		$('#'+module).remove();
		}

});

        $('ul.tabs').tabs();
        $('#search-panel').animate({opacity: 1}, 1000);

        try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
		//Seach tab checkin and checkout values
		checkinDate = new Date().toInputDateValue();
		checkoutDate = new Date().addDays(2).toInputDateValue();
		checkIn.val(checkinDate);
		checkOut.val(checkoutDate);

		//Expedia Search tab checkin and checkout values
		expedia.find('#checkIn').val(checkIn.val());
		expedia.find('#checkOut').val(checkOut.val());
		//Set Google places autocomplete for search expedia
		var input = /** @type {!HTMLInputElement} */
      		document.querySelector('.pac-input');
		var autocomplete = new google.maps.places.Autocomplete(input);
		input.setAttribute('placeholder', ''); //Remove auto place holder of google saying search location
		input.focus();
		//Tours tab date value
		$('#date').val(new Date().toInputDateValue());
	});

	btnSearch.on('click', function(){
		var searchData = {
			searching: 		searchQuery.val(),
			adults: 		adultsCount.val(),
			child: 			childrenCount.val(),
			checkin: 		pt.changeToDate(checkIn.val()),
			checkout: 		pt.changeToDate(checkOut.val())
		}
		console.log(searchData);
		if(searchData.checkin == '' || searchData.checkout == ''
			|| searchData.checkin.toLowerCase() == 'nan/nan/nan' || searchData.checkout.toLowerCase() == 'nan/nan/nan'){
			App.dialog({
			  title        : 'Error',
			  text         : 'Please fill in check in and check out dates.',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    checkIn.focus();
			  }
			});
		}else{
			App.load('hotels', searchData);
		}
	});

	//Expedia search
	expedia.find('#btnSearch').on('click', function(){
		var searchData = {
			searching: 		expedia.find('#searchQuery').val(),
			adults: 		expedia.find('#adults').val(),
			child: 			expedia.find('#children').val(),
			checkin: 		pt.changeToDate(expedia.find('#checkIn').val()),
			checkout: 		pt.changeToDate(expedia.find('#checkOut').val())
		}
		searchData.searching = searchData.searching.split("-", 1).toString();
		console.log(searchData);
		if(searchData.checkin == '' || searchData.checkout == ''
			|| searchData.checkin.toLowerCase() == 'nan/nan/nan' || searchData.checkout.toLowerCase() == 'nan/nan/nan'){
			App.dialog({
			  title        : 'Error',
			  text         : 'Please fill in check in and check out dates.',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    expedia.find('#checkIn').focus();
			  }
			});
		}else{
			App.load('expedia-hotels', searchData);
		}
	});

	$.ajax({
		url: API_URL + '/hotels/locations?appKey='+APIKEY,
		type: 'GET',
		dataType: 'json',
	})
	.done(function(result) {
		console.log("success");
		console.log(result);
		result.locations.forEach(function(item){
			$('#searchQuery').append('<option value="'+item.id+'">'+item.name+'</option>');
		});
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});


	$.ajax({
		url: API_URL + '/tours/locations?appKey='+APIKEY,
		dataType: 'JSON',
		method: 'GET',
		success: function(result){
			console.log("Tours Locations");
			console.log(result);
			result.locations.forEach(function(item){
				$('#location').append('<option value="'+item.id+'">'+item.name+'</option>');
			});
			for(i = 1; i <= result.maxGuests; i++){
				$('#guests').append('<option value="'+i+'">'+i+'</option>');
			}
		},
		error: function(error){
			console.log(error);
		}
	});

	//Fill in car locations
	$.ajax({
		url: API_URL + '/cars/locations?appKey='+APIKEY,
		type: 'GET',
		dataType: 'json',
	})
	.done(function(result) {
		console.log("success");
		console.log(result);
		result.response.pickupLocations.forEach(function(item){
			$('#carPickupLocations').append('<option value="'+item.id+'">'+item.name+'</option>');
		});

        result.response.dropoffLocations.forEach(function(item){
			$('#carDropoffLocations').append('<option value="'+item.id+'">'+item.name+'</option>');
		});
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

   	//Fill in car types
    $.ajax({
			url: API_URL + '/cars/carTypes?appKey='+APIKEY,
			type: 'GET',
			dataType: 'json'
		})
		.done(function(result) {
			console.log(result);
			result.response.forEach(function(item){
				$('#carTypes').append('<option value="'+item.id+'">'+item.name+'</option>');
			});

		})
		.fail(function() {
			App.dialog({
			  title        : 'Network Error',
			  text         : 'Looks like the connection is flaky. Try again in a bit',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    ('#carTypes').trigger('change');
			  }
			});
		})
		.always(function() {
			console.log("complete");
		});

	//Fill in tour types on location change
	$(page).find('#location').change(function(){
		var loc = $(this).val();
		console.log(loc);

		$.ajax({
			url: API_URL + '/tours/tourTypes',
			type: 'GET',
			dataType: 'json',
			data: {appKey: APIKEY,location: loc},
		})
		.done(function(result) {
			console.log(result);
			$('#tourTypes').empty();
			result.response.forEach(function(item){
				$('#tourTypes').append('<option value="'+item.name+'">'+item.name+'</option>');
			});

		})
		.fail(function() {
			App.dialog({
			  title        : 'Network Error',
			  text         : 'Looks like the connection is flaky. Try again in a bit',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    ('#location').trigger('change');
			  }
			});
		})
		.always(function() {
			console.log("complete");
		});

	});

	//Fill in tour types on location change
	$(page).find('#carPickupLocations').change(function(){
		var loc = $(this).val();
		console.log(loc);
		var txt = $("#carPickupLocations option[value="+loc+"]").text();
		console.log("====text====");
		console.log(txt);
		$("#carDropoffLocations").val(loc);
		$("#carDropoffLocations option[value="+loc+"]").remove();
		$("#carDropoffLocations option[value=0]").remove();
		$('#carDropoffLocations').prepend('<option value="'+loc+'" selected>'+txt+'</option>');

		// $.ajax({
		// 	url: API_URL + '/tours/tourTypes',
		// 	type: 'GET',
		// 	dataType: 'json',
		// 	data: {appKey: APIKEY,location: loc},
		// })
		// .done(function(result) {
		// 	console.log(result);
		// 	$('#tourTypes').empty();
		// 	result.response.forEach(function(item){
		// 		$('#tourTypes').append('<option value="'+item.name+'">'+item.name+'</option>');
		// 	});
		//
		// })
		// .fail(function() {
		// 	App.dialog({
		// 		title        : 'Network Error',
		// 		text         : 'Looks like the connection is flaky. Try again in a bit',
		// 		okButton     : 'Try Again',
		// 		cancelButton : 'Cancel'
		// 	}, function (tryAgain) {
		// 		if (tryAgain) {
		// 			('#location').trigger('change');
		// 		}
		// 	});
		// })
		// .always(function() {
		// 	console.log("complete");
		// });

	});




	$(page).find('#btnToursSearch').on('click', function(){
		console.log('clicked');
		var location 	= $('#location').val();
		var type 		= $('#tourTypes').val();
		var guests 		= $('#guests').val();
		var date 		= $('#date').val();
		var data = {
				location: location,
				tourType: type,
				adults: guests,
				date: date
			};
		if(location === null || date === ""){
			App.dialog({
			  title        : 'Error',
			  text         : 'Please input location and date.',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    $('#location').focus();
			  }
			});
		}else{
			App.load('tours', data);

		}

	});

	$(page).find('#btnCarsSearch').on('click', function(){
		console.log('clicked');
		var pickupLocation 			= $('#carPickupLocations').val();
		var dropoffLocation 			= $('#carDropoffLocations').val();
		var pickupTime 			= $('#pickupTime').val();
		var dropoffTime 			= $('#dropoffTime').val();
		var carType 			= $('#carTypes').val();
		var airportPickup 		= $('#airportPickup').val();
		var date 				= $('#Cars #date').val();
		var data = {
				pickupLocation: pickupLocation,
				dropoffLocation: dropoffLocation,
				pickupTime: pickupTime,
				dropoffTime: dropoffTime,
				ctype: carType,
				pickup: airportPickup,
				date: date
			};
		if(pickupLocation === null || date === ""){
			App.dialog({
			  title        : 'Error',
			  text         : 'Please input location and date.',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    $('#carPickupLocations').focus();
			  }
			});
		}else{
			App.load('cars', data);

		}

	});

});

/**
 * @Controller {Blog}
 */
App.controller('blog', function(page){

	var progress 	= $(page).find('.progress');
	var posts 		= $(page).find('#posts');
	var appContent 	= $(page).find('.app-content');
	// var post 		= $(page).find('.post');
	var container 	= $(page).find('.container');
	//Posts keep all posts in context
	var postsArray 	= [];

	container.hide();

	var bLazy;

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	$(page).on('appShow', function(){
		initImageLoading();
		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
		bLazy = new Blazy({src: 'src', container: '.app-content'});
	});

	var offset = 1;
	var moreAvailable = true;
	var loading = false;
	var threshold = 10;

	setTimeout(function(){loadMorePosts();}, 1000);
	console.log(appContent.scrollTop() + ' ' + posts.height() + ' ' + appContent.height());
	appContent.scroll(function(){
		if(appContent.scrollTop() > (posts.height() - appContent.height()))
	    {
	        if(!loading && moreAvailable){
	        	loadMorePosts();
	        }
	    }
	});

	//Remove post li item from posts to use as a template for multiple posts.
	var postTemp = posts.find('.post').remove();

	function loadMorePosts(){
		progress.show();
		loading = true;

		$.ajax({
			url: API_URL + "/blog/list",
			type: "GET",
			dataType: "json",
			data: {'appKey':APIKEY,'offset':offset, 'threshold':threshold},
			success: function(result, status, xhr){
				progress.hide();
				container.show();
				loading = false;
				offset++;
				console.log(result);

				if(result.response.posts.length > 0){
					//Get posts array to use in on click function below to load the post page
					postsArray = postsArray.concat(result.response.posts);

					result.response.posts.forEach(function(post){
						var p = postTemp.clone(true);
						p.attr('data-id', post.id);
						p.find('img').attr('src', post.thumbnail);
						p.find('.title').html(post.title);
						p.find('.desc').html(pt.stripHtml(post.description.trimToLength(100)));
						posts.append(p);
					});
				}else{
					appContent.append('<p>No results found...</p>');
				}
				bLazy.revalidate();
			},
			error: function(xhr, status, error){
				console.log(status + ' ' + error);
				progress.hide();
				moreAvailable = false;
				loading = false;
			}
		});

	}//loadMorePosts function ends here

	$(page).on('click', '.post', function(){
		var id = $(this).data('id');
		var post = findInArray(postsArray, "id", id);
		App.load('post', post);
	});
});

App.controller('post', function(page, post){
	console.log(post);

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	var postElem = $(page).find('#post');

	$(page).on('appShow', function(){
		postElem.find('img').attr('src', post.thumbnail);
		postElem.find('h5').html(post.title);
		postElem.find('p').html(pt.stripHtml(post.description));
		// postElem.append(temp);
		initImageLoading();
		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
	});
});

App.controller('my-bookings', function(page){
	var invoiceNo 	= $(page).find('#invoiceNo');
	var invoiceCode = $(page).find('#invoiceCode');
	var viewInvoice = $(page).find('#viewInvoice');

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	$(page).on('appShow', function(){
		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
	});

	viewInvoice.on('click', view);

	function view(){
		if(invoiceNo.val() == '' || invoiceCode.val() == ''){
			console.log('empty');
		}else{
			$.ajax({
				url: API_URL + '/invoice/info',
				dataType: 'json',
				method: 'GET',
				data: {
					'appKey': APIKEY,
					'invoiceno': invoiceNo.val(),
					'invoicecode': invoiceCode.val()
				},
				success: function(data){
					console.log(data);
					if(data.response.error){
						App.dialog({
						  title        : 'Error',
						  text         : data.response.error,
						  okButton     : 'OK'
						}, function (tryAgain) {
						  if (tryAgain) {

						  }
						});
					}else{
						App.load('invoice', data.response);
					}
				},
				error: function(error){
					console.log(error);
				}
			})
		}
	}
	// function viewInvoice(){
	// 	console.log('clicked' + invoiceNo.val() + '  ' + invoiceCode.val());
	// }
});

/*********************************
* @author Danish Jamil
* @Controller hotels
**********************************/
App.controller('hotels', function(page, mData){
	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	//Variables
	var progress 	= $(page).find('.progress'); progress.hide();
	var mainContainer = $(page).find('.row'); mainContainer.hide();
	var hotels 		= $(page).find('#Hotels');
	var appContent 	= $(page).find('.app-content');
	var hotelItems  = $(page).find('.hotel');
	var bLazy;

	//Variable for loadMoreHotels
	var offset = 1;
	var moreAvailable = true;
	var loading = false;
	var params, url;

	//Check if params are sent. Then the parent page is search page.
	if(Object.keys(mData).length === 0){
		params = {
			offset: offset
		}
		url = API_URL + '/hotels/list?appKey='+APIKEY;
		console.log(mData);

	}else{
		params = mData;
		params.offset = offset;
		url = API_URL + '/hotels/search?appKey='+APIKEY;
	}

	//Load hotels after one second to reduce the delay in page loading.
	setTimeout(function(){loadMoreHotels();}, 1000);

	//On scroll load more hotels
	//Check the height of appContent and hotels
	appContent.on('scroll', function(){
		console.log(appContent.scrollTop());
	    console.log(hotels.height() - appContent.height());
		if(appContent.scrollTop() >= (hotels.height() - appContent.height()))
	    {

	        if(!loading && moreAvailable){
	        	loadMoreHotels();
	        }
	    }
	});

	//Set Android Interface for Back key support
	//Initialize Lazy Load with scroller
	$(page).on('appShow', function(){
		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
		bLazy = new Blazy({container: '.app-content'});

		// //Set Google places autocomplete for search expedia
		// var input = /** @type {!HTMLInputElement} */
  //     		document.querySelector('.google');
		// var autocomplete = new google.maps.places.Autocomplete(input);
		// // input.setAttribute('placeholder', ''); //Remove auto place holder of google saying search location
		// // input.focus();
		// var iframe = '<iframe width="100%" height="315" frameborder="0" '+
		// 		' scrolling="no" marginheight="0" marginwidth="0"></iframe>';
		// google.maps.event.addListener(autocomplete, "place_changed", function(){
		// 	console.log(autocomplete.getPlace());
		// 	var src = '//maps.google.com/maps?q=' +
		// 		encodeURIComponent(autocomplete.getPlace().formatted_address) +'&output=embed';
		// 	iframe = $(iframe);
		// 	iframe.attr('src', src);
		// 	if(!$(page).find('iframe').length)
		// 		$(page).find('#map').append(iframe);
		// })

	});

	//Hotel template variables
	var $temp = $(page).find('.hotel').remove();
	var $star = $temp.find('.material-icons').remove();

	function loadMoreHotels(){
		progress.show();
		loading = true;
		params.offset = offset;
		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			data: params,
			success: function(result, status, xhr){
				progress.hide();
				mainContainer.show();
				loading = false;
				offset++;
				console.log(result);
				var testing = 'fdsafasdf';
				result.response.forEach(function(hotel){

					var $temp2 = $temp.clone(true);

					$temp2.attr('data-id', hotel.id);
					$temp2.find('.thumb')		.attr('data-src', hotel.thumbnail);
					$temp2.find('.title')		.html(hotel.title);
					$temp2.find('.location')	.html(hotel.location);
					$temp2.find('.price h4')	.html("<small>" + hotel.currCode + "</small> " + hotel.price);
					for(i = 0; i < hotel.starsCount; i++){
						$temp2.find('.stars').append($star.clone(true));
					}

					hotels.append($temp2);
				});

				if(get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme($(page).find('.btn'));

				bLazy.revalidate();
			},
			error: function(xhr, status, error){
				console.log('xhr: ' + xhr + ', status: ' + status + ', error: ' + error);
				progress.hide();
				moreAvailable = false;
				loading = false;
			}
		})
		.always(function(){
			progress.hide();
		});
	}

	$(page).on('click', '.hotel', function(){
		App.load('hotel', {id: $(this).data('id')});
	});
});

/*********************************
* @author Danish Jamil
* @Controller hotel
**********************************/
App.controller('hotel', function(page, params){
	currentPage = "nothomepage";
	var swiperContainer = $(page).find('.swiper-container');
	var spinner 		= $(page).find('.loading-dialog');
	var row 			= $(page).find('.row'); row.hide();
	var checkIn 		= $(page).find('#checkIn');
	var checkOut 		= $(page).find('#checkOut');
	var appContent 		= $(page).find('.app-content');
	//Gallery object used to hold slide images for gallery use.
	var gallery;
	var bLazy;

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	// initLanguage();

	var mySwiper;

	$(page).on('appShow', function () {
		if(typeof mySwiper === "undefined"){
			//initialize swiper when document ready
			mySwiper = new Swiper (swiperContainer, {
			  // Optional parameters
			  direction: 'horizontal',
			  // scrollbar: '.swiper-scrollbar',
			  pagination: '.swiper-pagination',
			  autoplay: 5000,
			  // effect: 'coverflow',
			  preloadImages: false,
			  lazyLoading: true,
			  lazyLoadingInPrevNext: true
			});
		}
		initComponents();

		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}

		bLazy = new Blazy({src: 'src'});
	});

	$(page).on('appLayout', function(){
		console.log(appContent.width() + ' x ' + swiperContainer.height());
		swiperContainer.height(appContent.width() - (appContent.width()/3));
	});

	var data;
	var bookingData;

	$(page).find('#proceedBooking').on('click', function(){
		$('#proceedBookingModal').closeModal();
		bookingData.adults = $('#adults').val();
		bookingData.children = $('#children').val();
		proceedBooking(bookingData);
		// console.log('working');
	});
	$(page).find('#cancel').on('click', function(){
		$('#proceedBookingModal').closeModal();
	});

	$(page).on('click', '.btn-booknow', function(){
		var roomId 			= $(this).prop('id');
		var roomsCount 		= $('#'+roomId+'roomsCount').val();
		if(checkIn.val() == '' || checkOut.val() == ''){
			App.dialog({
			  title        : 'Error',
			  text         : 'Please fill in check in and check out dates.',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    checkIn.focus();
			  }
			});
		}else{
			var room = getRoomById(data.rooms, roomId);
			console.log(room);
			$('#proceedBookingModal').openModal();
		}
		bookingData = {
			'appKey': 		APIKEY,
			'hotelId': 		data.hotel.id,
			'roomId': 		roomId,
			'roomsCount': 	roomsCount,
			'checkIn': 		checkIn.val(),
			'checkOut': 	checkOut.val()
		}
		// console.log(checkIn + ' ' + checkOut);
		// console.log($('#adults').val());
		// console.log(roomsCount);
	});

	var roomsList 		= $(page).find('#roomsList');
	var amenities 		= $(page).find('#amenities');
	var overview		= $(page).find('#overview');
	var reviews			= $(page).find('#reviews');

	var sliderWrapper 	= $(page).find('.slideWrapper');
	var checkAvailability = $(page).find('#check');

	checkAvailability.on('click', function(){
		// fetchDetails(checkIn.val(), checkOut.val());
		console.log(pt.changeToDate(checkIn.val()) + ' ' + pt.changeToDate(checkOut.val()));
		if(checkIn.val() == '' || checkOut.val() == ''){
			App.dialog({
			  title        : 'Are you drunk?',
			  text         : 'Please fill in check in and check out dates.',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    // try again
			  }
			});
		}else{
			fetchDetails(pt.changeToDate(checkIn.val()), pt.changeToDate(checkOut.val()));
		}
	});

	function fetchDetails(checkin, checkout){
		row.hide();
		spinner.show();
		console.log(params);
		console.log(checkin +' '+ checkout);
		//Ajax call to fetch details of hotel and add to hotel details page.
		$.ajax({
			url: API_URL + '/hotels/hotelDetails',
			dataType: 'json',
			type: "GET",
			data: {
				'appKey': APIKEY,
				'id': params.id,
				'checkin': checkin,
				'checkout': checkout
			},
			success: function(result, status, xhr){
				console.log(result);
				spinner.hide();
				row.fadeIn(1000);
				data = result.response;
				var pageTitle 		= $(page).find('.app-title');
				pageTitle.html(data.hotel.title);
				//Putting sliderImages in gallery object to be used in kik viewer.
				gallery = data.hotel.sliderImages;
				//Add rooms from room template
				if(data.rooms){
					var $roomTemp = roomsList.find('li:first-child').remove();
					roomsList.empty();
					data.rooms.forEach(function(room){
						var r = $roomTemp.clone(true);
						r.find('img').attr('src', room.thumbnail);
						r.find('.title').html(room.title);
						//r.find('.desc').html(pt.stripHtml(room.desc));
						r.find('.desc').append('<br>');
						r.find('.desc').append(room.currCode + ' ' + room.Info.totalPrice);
						r.find('.desc').append('<br> <b>for ' + room.Info.stay + ' nights</b>');
						//Add options for roomsCount
						var optionTemp = r.find('.social select option').remove();
						for(i = 1; i <= room.maxQuantity; i++){
							var option = optionTemp.clone(true);
							option.text(i + ' rooms');
							option.val(i);
							r.find('.social select').append(option);
						}
						r.find('.social select').attr('id', room.id + 'roomsCount');
						r.find('.btn-booknow').attr('id', room.id);
						roomsList.append(r);
					});
				}

				//Create template of slide to be appended in swiper slider.
				var $slideTemp = $(page).find('.swiper-slide:first-child').remove();
				$(page).find('.swiper-wrapper').empty();
				data.hotel.sliderImages.forEach(function(image){
					//Clone slideTemp to a new a object to be appended.
					var $slide = $slideTemp.clone(true);
					$slide.find('.slide-image').attr('src', image.thumbImage);
					mySwiper.appendSlide($slide);
				});

				//Create amenities from amenity template
				if(data.hotel.amenities){
					//Create a template of amenity to be appended in amenities section
					var $amenityTemp = amenities.find('.icon-list-item:first-child').remove();
					amenities.empty();
					data.hotel.amenities.forEach(function(amenity){
						//Clone template of amenity to a new object to be appended in amenities section.
						var $a = $amenityTemp.clone(true);
						$a.find('img').attr('src', amenity.icon);
						$a.find('span').text(amenity.name);
						amenities.append($a);
					});
				}
				//Create template of overview to be appended in Overview section.
				var $overview = overview.find('.overview');

				$overview.find('.description').html(data.hotel.desc);
				//Create Payment Options List Item temp and clone it options count times.
				var $listItemTemp = $overview.find('#paymentOptions .list-item:first-child').remove();
				$overview.find('#paymentOptions').empty();
				data.hotel.paymentOptions.forEach(function(option){
					var $listItem = $listItemTemp.clone(true);
					$listItem.find('span').html(option.name);
					$overview.find('#paymentOptions').append($listItem);
				});
				//Set policy
				$overview.find('.policy').html(data.hotel.policy);
				$overview.find('iframe').remove();
				//Set location iframe
				setTimeout(function(){
					var locationIframe = $('<iframe />');
					locationIframe.addClass('hotelMap');
					locationIframe.attr('src',
						BASE_URL+'home/maps/'+data.hotel.latitude+'/'+data.hotel.longitude+'/hotels/'+data.hotel.id);
					$overview.find('.location').append(locationIframe);
				},3000)


				//Add reviews from .review template
				if(data.reviews){
					//Create reviews template
					var $reviewTemp = reviews.find('.review:first-child').remove();
					reviews.empty();
					data.reviews.forEach(function(review){
						var $r = $reviewTemp.clone(true);
						$r.find('.reviewer').html(review.review_name);
						$r.find('.stars').html(review.review_overall + '/10');
						$r.find('.date').html(review.review_date);
						$r.find('.comment').html(review.review_comment);
						reviews.append($r);
					});
				}
				if(data.reviews.length === 0){
					$(page).find('#reviewsTab').remove();
					$(page).find('#reviews').remove();
				}
				//If there are no rooms available, Show an error dialog and go back to previous page.
				if(data.rooms.length > 0){
					//Setting Check in and check out dates from response
					checkIn.val(data.rooms[0].Info.checkin);
					checkOut.val(data.rooms[0].Info.checkout);
				}else{
					App.dialog({
					  title        : 'No Rooms Available',
					  text         : 'There are no rooms available for this hotel between selected dates.',
					  okButton     : 'Go Back'
					}, function (tryAgain) {
					  if (tryAgain) {
					    App.back();
					  }
					});
				}
				// $('select').material_select();
				bLazy.revalidate();
				//Initialize tabs
				$('ul.tabs').tabs();
				//Apply theme to newly added buttons
				if(get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme($(page).find('.btn'));
			},
			error: function(xhr, status, error){
				console.log(error);
			}
		});
	}

	//Set on click event on slide-image to open gallery
	$(page).on('click', '.slide-image', function(){
		App.load('viewer',
			{
				urls: getGalleryUrls(gallery)
			}
		);
	});

	setTimeout(function(){fetchDetails(params.checkin, params.checkout);}, 1000);

});

/*********************************
* @author Danish Jamil
* @Controller expedia-hotels
* Expedia hotels listing controller
**********************************/
App.controller('expedia-hotels', function(page, mData){
	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	//Variables
	var progress 	= $(page).find('.progress'); progress.hide();
	var mainContainer = $(page).find('.row'); mainContainer.hide();
	var hotels 		= $(page).find('#Hotels');
	var appContent 	= $(page).find('.app-content');
	var bLazy;

	//Variable for loadMoreHotels
	var offset = 1;
	var moreAvailable = true;
	var loading = false;
	var params, url;

	//Check if params are sent. Then the parent page is search page.
	if(Object.keys(mData).length === 0){
		params = {
			offset: offset,
			checkin: new Date().toInputDateValue(),
			checkout: new Date().addDays(2).toInputDateValue()
		}
		url = API_URL + '/expedia/list';
	}else{
		params = {
			location: mData.searching,
			adults: mData.adults,
			checkIn: mData.checkin,
			checkOut: mData.checkout,
		}
		url = API_URL + '/expedia/search';
	}

	//Load hotels after one second to reduce the delay in page loading.
	setTimeout(function(){loadMoreHotels();}, 1000);

	//On scroll load more hotels
	//Check the height of appContent and hotels
	appContent.scroll(function(){
		if(appContent.scrollTop() >= (hotels.height() - appContent.height()))
	    {
	        if(!loading && moreAvailable){
	        	loadMoreHotels();
	        }
	    }
	});

	//Set Android Interface for Back key support
	//Initialize Lazy Load with scroller
	$(page).on('appShow', function(){
		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
		bLazy = new Blazy({container: '.app-content'});
	});

	//Hotel template variables
	var $temp = $(page).find('.hotel').remove();
	var $star = $temp.find('.material-icons').remove();

	var cacheData;
	var callCount = 1;

	function loadMoreHotels(){
		progress.show();
		loading = true;
		//if call count is greater than 1 change the api call to listMore
		if(callCount > 1){
			url = API_URL + "/expedia/listMore";
		}

		if(typeof cacheData != "undefined"){
			$.extend(params, cacheData);
			console.log(params);
		}

		$.getJSON(url + "?" + $.param(params))
			.done(function(data){
				console.log(data);
				//Get main object from response
				var hotelListResponse = data.HotelListResponse;
				if(hotelListResponse.EanWsError){
					App.dialog({
					  title        : 'Error',
					  text         : hotelListResponse.EanWsError.presentationMessage,
					  okButton     : 'Try Again',
					  cancelButton : 'Cancel'
					}, function (tryAgain) {
					  if (tryAgain) {
					    App.back();
					  }
					});
				}
				//Increment callCount if call result was successfull.
				callCount++;
				//Store cache data to fetch next page
				//This data will be used to fetch next results array if available.
				cacheData = {
					cacheKey: 			hotelListResponse.cacheKey,
					cacheLocation: 		hotelListResponse.cacheLocation,
					customerSessionId: 	hotelListResponse.customerSessionId
				}
				//HotelList to iterate through and add hotels.

				try{
					var hotelsList = hotelListResponse.HotelList.HotelSummary;
					if(typeof hotelsList.length == "undefined"){
						var $temp2 = $temp.clone(true);

						$temp2.attr('data-id', 	hotelsList.hotelId);
						$temp2.find('.thumb')	.attr('data-src',
							'https://images.travelnow.com' + hotelsList.thumbNailUrl.replace('_t', '_b'));
						$temp2.find('.title')	.html(hotelsList.name);
						$temp2.find('.location').html(hotelsList.city);
						$temp2.find('.price h4').html("<small>" + hotelsList.rateCurrencyCode + "</small> " + hotelsList.lowRate);
						for(i = 0; i < hotelsList.hotelRating; i++){
							$temp2.find('.stars').append($star.clone(true));
						}

						hotels.append($temp2);
					}else{
						hotelsList.forEach(function(hotel){

							var $temp2 = $temp.clone(true);

							$temp2.attr('data-id', 	hotel.hotelId);
							$temp2.find('.thumb')	.attr('data-src',
								'https://images.travelnow.com' + hotel.thumbNailUrl.replace('_t', '_b'));
							$temp2.find('.title')	.html(hotel.name);
							$temp2.find('.location').html(hotel.city);
							$temp2.find('.price h4').html("<small>" + hotel.rateCurrencyCode + "</small> " + hotel.lowRate);
							for(i = 0; i < hotel.hotelRating; i++){
								$temp2.find('.stars').append($star.clone(true));
							}

							hotels.append($temp2);
						});
					}
				}catch(ex){
					console.log(ex);
				}

			})
			.fail(function(error){
				console.log(error);
				moreAvailable = false;
			})
			.always(function(){
				progress.hide();
				mainContainer.show();
				loading = false;

				if(get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme($(page).find('.btn'));

				bLazy.revalidate();
			});
	}

	$(page).on('click', '.hotel', function(){
		var parameters = {
			id : $(this).data('id'),
			customerSessionId: cacheData.customerSessionId,

		}
		App.load('expedia-hotel', {id: $(this).data('id')});
	});
});

/*********************************
* @author Danish Jamil
* @Controller hotel
**********************************/
App.controller('expedia-hotel', function(page, params){
	currentPage = "nothomepage";
	var swiperContainer = $(page).find('.swiper-container');
	var spinner 		= $(page).find('.preloader-wrapper');
	var row 			= $(page).find('.row'); row.hide();
	var checkIn 		= $(page).find('#checkIn');
	var checkOut 		= $(page).find('#checkOut');
	var appContent 		= $(page).find('.app-content');
	//Gallery object used to hold slide images for gallery use.
	var gallery;
	var bLazy;

	//Hotel details objects to keep track of hotel details and rooms.
	var hotelData, roomsData;

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	// initLanguage();

	var mySwiper;

	$(page).on('appShow', function () {
		if(typeof mySwiper === "undefined"){
			//initialize swiper when document ready
			mySwiper = new Swiper (swiperContainer, {
			  // Optional parameters
			  direction: 'horizontal',
			  // scrollbar: '.swiper-scrollbar',
			  pagination: '.swiper-pagination',
			  autoplay: 5000,
			  effect: 'fade',
			  preloadImages: false,
			  lazyLoading: true,
			  lazyLoadingInPrevNext: true
			});
		}
		initComponents();

		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
		if(params.checkin && params.checkout){
			checkIn.val(params.checkin);
			checkOut.val(params.checkout);
		}else{
			checkIn.val(new Date().toInputDateValue());
			checkOut.val(new Date().addDays(2).toInputDateValue());
		}

		bLazy = new Blazy({src: 'src'});
	});

	$(page).on('appLayout', function(){
		console.log(appContent.width() + ' x ' + swiperContainer.height());
		swiperContainer.height(appContent.width() - (appContent.width()/3));
	});

	var data;
	var bookingData;

	$(page).find('#proceedBooking').on('click', function(){
		bookingData.adults = $(page).find('#adults').val();
		bookingData.arrivalDate = checkIn.val();
		bookingData.departureDate = checkOut.val();

		$('#proceedBookingModal').closeModal();
		console.log(bookingData);
		App.load('expedia-booking', bookingData);
		// console.log('working');
	});
	$(page).find('#cancel').on('click', function(){
		$('#proceedBookingModal').closeModal();
	});

	$(page).on('click', '.btn-booknow', function(){
		var rateKey 			= $(this).attr('ratekey'),
			roomType 			= $(this).attr('roomtype'),
			rateCode 			= $(this).attr('ratecode'),
			total 				= $(this).attr('total'),
			hotelname 			= $(this).attr('hotelname'),
			roomname 			= $(this).attr('roomname'),
			hotelstars 			= $(this).attr('hotelstars'),
			roomtotal 			= $(this).attr('roomtotal'),
			currencycode  		= $(this).attr('currencycode'),
			tax 				= $(this).attr('tax'),
			thumbnail 			= $(this).attr('thumbnail');


		if(checkIn.val() == '' || checkOut.val() == ''){
			App.dialog({
			  title        : 'Error',
			  text         : 'Please fill in check in and check out dates.',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    checkIn.focus();
			  }
			});
		}else{
			bookingData = {
				hotelId: hotelData.HotelInformationResponse["@hotelId"],
				customerSessionId: hotelData.HotelInformationResponse.customerSessionId,
				checkIn: checkIn.val(),
				checkOut: checkOut.val(),
				rateKey: rateKey,
				roomType: roomType,
				rateCode: rateCode,
				total: total,
				hotelname: hotelname,
				roomname: roomname,
				hotelstars: hotelstars,
				roomtotal: roomtotal,
				currencycode: currencycode,
				tax: tax,
				thumbnail: thumbnail,
			}

			$('#proceedBookingModal').openModal();
		}

		// console.log(checkIn + ' ' + checkOut);
		// console.log($('#adults').val());
		// console.log(roomsCount);
	});

	var roomsList 		= $(page).find('#roomsList');
	var amenities 		= $(page).find('#amenities');
	var overview		= $(page).find('#overview');

	var sliderWrapper 	= $(page).find('.slideWrapper');
	var checkAvailability = $(page).find('#check');

	checkAvailability.on('click', function(){
		// fetchDetails(checkIn.val(), checkOut.val());
		console.log(pt.changeToDate(checkIn.val()) + ' ' + pt.changeToDate(checkOut.val()));
		if(checkIn.val() == '' || checkOut.val() == ''){
			App.dialog({
			  title        : 'Are you drunk?',
			  text         : 'Please fill in check in and check out dates.',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    // try again
			  }
			});
		}else{
			fetchDetails(pt.changeToDate(checkIn.val()), pt.changeToDate(checkOut.val()));
		}
	});

	function fetchDetails(checkin, checkout){
		row.hide();
		spinner.show();
		console.log(params);
		console.log(checkin +' '+ checkout);
		//Ajax call to fetch details of hotel and add to hotel details page.
		$.ajax({
			url: API_URL + '/expedia/hoteldetails',
			dataType: 'json',
			type: "GET",
			data: {
				'hotelId': params.id,
				'checkIn': pt.changeToDate(checkIn.val()),
				'checkOut': pt.changeToDate(checkOut.val())
			},
			success: function(result, status, xhr){
				console.log(result);
				spinner.hide();
				row.fadeIn(1000);
				data = result;
				//Keep track of response data.
				hotelData = result.response.hoteldata;
				roomsData = result.response.roomsdata;
				var pageTitle 		= $(page).find('.app-title');
				pageTitle.html(hotelData.HotelInformationResponse.HotelSummary.name);
				// Putting sliderImages in gallery object to be used in kik viewer.
				gallery = hotelData.HotelInformationResponse.HotelImages.HotelImage;
				// Add rooms from room template
				var $roomTemp = roomsList.find('li:first-child').remove();
				roomsList.empty();
				if(roomsData.HotelRoomAvailabilityResponse.HotelRoomResponse.length){
					roomsData.HotelRoomAvailabilityResponse.HotelRoomResponse.forEach(function(room){
						var r = $roomTemp.clone(true);
						r.find('img').attr('src', room.RoomImages.RoomImage[0].url);
						r.find('.title').html(room.RoomType.description);
						r.find('.desc').html(pt.stripHtml(room.RoomType.descriptionLong));
						r.find('.desc').append('<br>');
						r.find('.desc').append(room.RateInfos.RateInfo.ChargeableRateInfo["@currencyCode"] + ' ' +
							room.RateInfos.RateInfo.ChargeableRateInfo["@total"]);
						r.find('.desc').append(' <b>for ' + new Date(checkIn.val()).difference(checkOut.val()) + ' night(s)</b>');

						r.find('.btn-booknow').attr('ratekey', room.RateInfos.RateInfo.RoomGroup.Room.rateKey);
						r.find('.btn-booknow').attr('roomtype', room.RoomType["@roomCode"]);
						r.find('.btn-booknow').attr('ratecode', room.rateCode);
						r.find('.btn-booknow').attr('total', room.RateInfos.RateInfo.ChargeableRateInfo["@total"]);
						r.find('.btn-booknow').attr('hotelname', hotelData.HotelInformationResponse.HotelSummary.name);
						r.find('.btn-booknow').attr('roomname', room.RoomType.description);
						r.find('.btn-booknow').attr('hotelstars', hotelData.HotelInformationResponse.HotelSummary.hotelRating);
						r.find('.btn-booknow').attr('roomtotal', room.RateInfos.RateInfo.ChargeableRateInfo["@commissionableUsdTotal"]);
						r.find('.btn-booknow').attr('currencycode', room.RateInfos.RateInfo.ChargeableRateInfo["@currencyCode"]);
						r.find('.btn-booknow').attr('tax', room.RateInfos.RateInfo.taxRate);
						r.find('.btn-booknow').attr('thumbnail', hotelData.HotelInformationResponse.HotelImages.HotelImage[0].thumbnailUrl);

						roomsList.append(r);
					});
				}else{
					var room = roomsData.HotelRoomAvailabilityResponse.HotelRoomResponse;
					var r = $roomTemp.clone(true);
					if(room.RoomImages)
						r.find('img').attr('src', room.RoomImages.RoomImage.url);
					r.find('.title').html(room.RoomType.description);
					r.find('.desc').html(pt.stripHtml(room.RoomType.descriptionLong));
					r.find('.desc').append('<br>');
					r.find('.desc').append(room.RateInfos.RateInfo.ChargeableRateInfo["@currencyCode"] + ' ' +
						room.RateInfos.RateInfo.ChargeableRateInfo["@total"]);
					r.find('.desc').append(' <b>for ' + new Date(checkIn.val()).difference(checkOut.val()) + ' night(s)</b>');

					r.find('.btn-booknow').attr('ratekey', room.RateInfos.RateInfo.RoomGroup.Room.rateKey);
					r.find('.btn-booknow').attr('roomtype', room.RoomType["@roomCode"]);
					r.find('.btn-booknow').attr('ratecode', room.rateCode);
					r.find('.btn-booknow').attr('total', room.RateInfos.RateInfo.ChargeableRateInfo["@total"]);
					r.find('.btn-booknow').attr('hotelname', hotelData.HotelInformationResponse.HotelSummary.name);
					r.find('.btn-booknow').attr('roomname', room.RoomType.description);
					r.find('.btn-booknow').attr('hotelstars', hotelData.HotelInformationResponse.HotelSummary.hotelRating);
					r.find('.btn-booknow').attr('roomtotal', room.RateInfos.RateInfo.ChargeableRateInfo["@commissionableUsdTotal"]);
					r.find('.btn-booknow').attr('currencycode', room.RateInfos.RateInfo.ChargeableRateInfo["@currencyCode"]);
					r.find('.btn-booknow').attr('tax', room.RateInfos.RateInfo.taxRate);
					r.find('.btn-booknow').attr('thumbnail', hotelData.HotelInformationResponse.HotelImages.HotelImage[0].thumbnailUrl);

					roomsList.append(r);
				}

				//Create template of slide to be appended in swiper slider.
				var $slideTemp = $(page).find('.swiper-slide:first-child').remove();
				$(page).find('.swiper-wrapper').empty();
				var slideImages = hotelData.HotelInformationResponse.HotelImages.HotelImage;
				if(slideImages.length > 15){
					for(var i = 0; i < 15; i++){
						var $slide = $slideTemp.clone(true);
						$slide.find('.slide-image').attr('src', slideImages[i].url);
						mySwiper.appendSlide($slide);
					}
				}else{
					hotelData.HotelInformationResponse.HotelImages.HotelImage.forEach(function(image){
						//Clone slideTemp to a new a object to be appended.
						var $slide = $slideTemp.clone(true);
						$slide.find('.slide-image').attr('src', image.url);
						mySwiper.appendSlide($slide);
					});
				}
				//Create amenities from amenity template
				if(hotelData.HotelInformationResponse.PropertyAmenities){
					//Create a template of amenity to be appended in amenities section
					var $amenityTemp = amenities.find('.icon-list-item:first-child').remove();
					amenities.empty();
					hotelData.HotelInformationResponse.PropertyAmenities.PropertyAmenity.forEach(function(amenity){
						//Clone template of amenity to a new object to be appended in amenities section.
						var $a = $amenityTemp.clone(true);
						// $a.find('img').attr('src', amenity.icon);
						$a.find('span').text(amenity.amenity);
						amenities.append($a);
					});
				}
				//Create template of overview to be appended in Overview section.
				var $overview = overview.find('.overview');

				$overview.find('.description').html(pt.stripHtml(hotelData.HotelInformationResponse.HotelDetails.propertyDescription));

				//Set policy
				$overview.find('.policy').html(hotelData.HotelInformationResponse.HotelDetails.hotelPolicy);
				$overview.find('.location').empty();
				//Set location iframe
				var locationIframe = $('<iframe />');
				locationIframe.addClass('hotelMap');
				locationIframe.attr('src',
					BASE_URL+'home/maps/'+hotelData.HotelInformationResponse.HotelSummary.latitude+'/'+
					hotelData.HotelInformationResponse.HotelSummary.longitude+'/hotels/');
				$overview.find('.location').append(locationIframe);


				bLazy.revalidate();
				//Initialize tabs
				$('ul.tabs').tabs();
				//Apply theme to newly added buttons
				if(get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme($(page).find('.btn'));
			},
			error: function(xhr, status, error){
				console.log(error);
			}
		});
	}

	//Set on click event on slide-image to open gallery
	$(page).on('click', '.slide-image', function(){
		App.load('viewer',
			{
				urls: getExpediaGalleryUrls(gallery)
			}
		);
	});

	setTimeout(function(){fetchDetails(params.checkin, params.checkout);}, 1000);

});

/**
 * @param  {Page}
 * @param  {data}
 * @return {Nothing/It's a controller}
 */
App.controller('booking', function(page, data){
	var proceedButton 	= $(page).find("#proceed");
	var loginButton 	= $(page).find("#loginButton");
	var emailField 		= $(page).find("#username");
	var passwordField 	= $(page).find("#password");
	var couponCodeField = $(page).find("#couponCode");
	var applyCouponButton 	= $(page).find("#applyCoupon");
	var continueButton 	= $(page).find("#continue");
	console.log(data);

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	var proceed, loginBtn, applyCouponLadda, continueButtonLadda;

	$(page).on('appShow', function(){

		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
		$('ul.tabs').tabs();
		proceed = proceedButton.ladda();
		loginBtn = loginButton.ladda();
		applyCouponLadda = applyCouponButton.ladda();
		continueButtonLadda = continueButton.ladda();
	});

	var params = {}
	var url = API_URL;

	if(data.btype === "hotels"){
		params = {
			'userId': 			get("userId"),
			'itemid': 			data.bookingData.hotelId,
			'subitemid': 		data.bookingData.roomId,
			'roomscount': 		data.bookingData.roomsCount,
			'checkin': 			data.result.response.hotel.checkin,
			'checkout': 		data.result.response.hotel.checkout,
			'btype': 			data.btype,
			'extras': 			'',
			'bedscount': 		0,
		}
		url += '/hotels/invoice?appKey='+APIKEY;
	}else if(data.btype === "tours"){
		params = {
			userId: 			get("userId"),
			itemid: data.itemid,
			adults: data.adults,
			children: data.children,
			infant: data.infant,
			tdate: data.date,
			btype: data.btype,
		}
		url += '/tours/invoice?appKey='+APIKEY;
	}else if(data.btype === "cars"){
		params = {
			userId: get("userId"),
			itemid: data.itemid,
			cdate: data.cdate,
			btype: data.btype,
			pickuplocation:  data.pickuplocation,
			dropofflocation: 	data.dropofflocation,
			pickupTime:   data.pickupTime,
			dropoffTime:   data.dropoffTime
		}
		url += '/cars/invoice?appKey='+APIKEY;
	}

	console.log(get("loggedIn"));
	console.log(get("couponsEnabled"));

	if(get("couponsEnabled") == "true" && get("loggedIn") == "true"){
		$(page).find("#guestTab").remove();
		$(page).find("#guest").remove();
		$(page).find("#loginTab").remove();
		$(page).find("#login").remove();
		$("ul.tabs").tabs();
	}
	if(get("couponsEnabled") == "false" && get("loggedIn") == "true"){
		$(page).find(".skip").remove();
		$(page).find(".tabs").hide();
		$(page).find(".row").hide();
		$.extend(params, {userId: get("userId")});
		$("#preloader").show();
		console.log(params);

		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: params,
		})
		.done(function(res) {
			console.log("success");
			console.log(res);
			App.load('invoice', {url: res.response.url});
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
			$("#preloader").hide();
		});
		console.log("Logged In");
	}
	if(get("couponsEnabled") == "true" && get("loggedIn") == "false"){
		$(page).find("#continue").remove();
		$(page).find(".skip").remove();
	}
	if(get("couponsEnabled") == "false" && get("loggedIn") == "false"){
		$(page).find("#continue").remove();
		$(page).find(".skip").remove();
		$(page).find("#couponTab").remove();
		$(page).find("#coupon").remove();
		$("ul.tabs").tabs();
	}

	$(page).find(".skip").on("click", function(){
		$(this).text("Loading...");
		$.ajax({
			url: url,
			dataType: 'json',
			method: 'post',
			data: params,
			success: function(data){
				console.log(data);
				$(this).text("Done");
				App.load('invoice', {'url':data.response.url});
			},
			error: function(error){
				$(this).text("Done");
				console.log(error);
			}
		});
	});

	continueButton.on("click", function(){
		continueButtonLadda.ladda("start");
		$.ajax({
			url: url,
			dataType: 'json',
			method: 'post',
			data: params,
			success: function(data){
				console.log(data);
				continueButtonLadda.ladda("stop");
				App.load('invoice', {'url':data.response.url});
			},
			error: function(error){
				console.log(error);
				continueButtonLadda.ladda("stop");
			}
		});
	});

	applyCouponButton.on("click", function(){
		applyCouponLadda.ladda('start');
		$.ajax({
			url: API_URL + '/invoice/verifyCoupon',
			type: 'POST',
			dataType: 'json',
			data: {
				code: couponCodeField.val(),
				itemId: params.itemid,
				module: data.btype,
			},
		})
		.done(function(res) {
			applyCouponLadda.ladda("stop");
			console.log("success");
			console.log(res);
			if(res.response.status == "success"){
				applyCouponButton.text("Success");
				applyCouponButton.attr("data-color", "green");
				$.extend(params, {couponid: res.response.couponid});
				console.log(params);
				setTimeout(function() {
					applyCouponButton.text("Apply");
					applyCouponButton.attr("data-color", "blue");
				}, 3000);
				App.dialog({
					title: "Success",
					text: "10% discount discount has been applied. Please proceed booking.",
					okButton: "Ok"
				});
			}else if(res.response.status == "fail"){
				applyCouponButton.text("Failed");
				applyCouponButton.attr("data-color", "red");
				setTimeout(function() {
					applyCouponButton.text("Apply");
					applyCouponButton.attr("data-color", "blue");
				}, 3000);
			}else{
				App.dialog({
					title: "Error",
					text: "This coupon code is not applicable here.",
					okButton: "Try Again"
				});
			}
		})
		.fail(function(res) {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});

	})

	proceedButton.on('click', function(){
		proceed.ladda('start');
		console.log('Proceed Button Clicked');

		var guestData = {
			firstname: 		$('#firstName').val(),
			lastname: 		$('#lastName').val(),
			email: 			$('#email').val(),
			phone: 			$('#phone').val(),
			address: 			$('#address').val()
		}

		$.extend(params, guestData);

		if(params.firstname == '' || params.lastname == '' || params.email == '' || params.phone == '' || params.city == ''){
			proceed.ladda('stop');
			App.dialog({
			  title        : 'We won\'t let you go further',
			  text         : 'Please fill in all the blank fields.',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    // try again
			  }
			});
		}else{
			console.log(params);
			$.ajax({
				url: url,
				dataType: 'json',
				method: 'post',
				data: params,
				success: function(data){
					proceed.ladda('stop');
					console.log(data);
					App.load('invoice', {'url':data.response.url});
				},
				error: function(error){
					proceed.ladda('stop');
					console.log(error);
				}
			});
		}
	});
	loginButton.on("click", function(){
		loginBtn.ladda("start");
		$.ajax({
			url: API_URL + "/login/check?appKey="+APIKEY,
			type: 'POST',
			dataType: "json",
			data: {
				email: emailField.val(),
				password: passwordField.val()
			},
		})
		.done(function(res) {
			console.log(res);
			console.log("success");
			if(res.response == true){
				set("loggedIn", true);
				set("userId", res.userInfo.id);
				$.extend(params, {userId: res.userInfo.id});
				console.log(params);
				$.ajax({
					url: url,
					type: 'POST',
					dataType: 'json',
					data: params,
				})
				.done(function(res) {
					console.log("success");
					console.log(res);
					App.load('invoice', {url: res.response.url});
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});

			}else{
				App.dialog({
					title: "Error",
					text: "Username or Password is invalid",
					okButton: "Ok"
				});
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
			loginBtn.ladda("stop");
		});

	});
});

App.controller('expedia-booking', function(page, data){
	var firstName 	= $(page).find('#firstName'),
		lastName 	= $(page).find('#lastName'),
		email 	 	= $(page).find('#email'),
		address 	= $(page).find('#address'),
		phone	 	= $(page).find('#phone'),
		city 	 	= $(page).find('#city'),
		postalCode 	= $(page).find('#postalCode'),
		state 	 	= $(page).find('#state'),
		country 	= $(page).find('#country'),
		cardNumber 	= $(page).find('#cardNumber'),
		expiry 		= $(page).find('#expiry'),
		year 		= $(page).find('#year'),
		cardType 	= $(page).find('#cardType'),
		cardCvv 	= $(page).find('#cardCvv'),
		proceedButton 	= $(page).find('#proceed'),
		proceed;

	firstName.val('');
	lastName.val('');
	phone.val('');
	cardNumber.val('');
	cardCvv.val('');

	console.log(data);

	//Add months for card
	var months = [
		{value: 01, name: "January"},
		{value: 02, name: "February"},
		{value: 03, name: "March"},
		{value: 04, name: "April"},
		{value: 05, name: "May"},
		{value: 06, name: "June"},
		{value: 07, name: "July"},
		{value: 08, name: "August"},
		{value: 09, name: "September"},
		{value: 10, name: "October"},
		{value: 11, name: "November"},
		{value: 12, name: "December"}
	];
	//Add years for card
	var years = [];
	var currentYear = new Date().getFullYear();
	for(var i = 0; i < 15; i++){
		years.push(currentYear + i);
	}

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	$(page).on('appShow', function(){

		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}

		proceed = proceedButton.ladda();
	});

	//Get countries to fill countries dropdown
	$.get(API_URL + '/hotels/countries')
		.done(function(result){
			var response = result.response;
			//Add Countries
			var optTemp = country.find('option').remove();
			response.forEach(function(item){
				var opt = optTemp.clone(true);
				opt.text(item.name);
				opt.val(item.code)
				country.append(opt);
			});
			//Add months
			months.forEach(function(item){
				var opt = optTemp.clone(true);
				opt.text(item.name);
				opt.val(item.value);
				expiry.append(opt);
			});
			//Add years
			years.forEach(function(item){
				var opt = optTemp.clone(true);
				opt.val(item);
				opt.text(item);
				year.append(opt);
			})
		})
		.always(function(){
			$(page).find('.preloader-wrapper').hide();
		});

	$.get(API_URL + '/expedia/getCardTypes?' + $.param(data))
		.done(function(response){
			console.log(response);
			var optTemp = cardType.find('option').remove();
			response.HotelPaymentResponse.PaymentType.forEach(function(item){
				var opt = optTemp.clone(true);
				opt.val(item.code);
				opt.text(item.name);
				cardType.append(opt);
			});
		});

	proceedButton.on('click', function(){
		proceed.ladda('start');
		if(firstName.val() == '' || lastName.val() == '' || email.val() == '' || phone.val() == '' || city.val() == ''){
			proceed.ladda('stop');
			App.dialog({
			  title        : 'We won\'t let you go further',
			  text         : 'Please fill in all the blank fields.',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    // try again
			  }
			});
		}else{
			//Do Booking
			var params = {
				hotelId: 			data.hotelId,
				customerSessionId: 	data.customerSessionId,
				checkIn: 			pt.changeToDate(data.arrivalDate),
				checkOut: 			pt.changeToDate(data.departureDate),
				nights: 			new Date(data.arrivalDate).difference(data.departureDate),
				adults: 			data.adults,
				rateKey: 			data.rateKey,
				roomType: 			data.roomType,
				rateCode: 			data.rateCode,
				total: 				data.total,
				hotelname: 			data.hotelname,
				roomname: 			data.roomname,
				hotelstars: 		data.hotelstars,
				roomtotal: 			data.roomtotal,
				currency: 			data.currencycode,
				tax: 				data.tax,
				thumbnail: 			data.thumbnail,
				email: 				email.val(),
				firstName: 			firstName.val(),
				lastName: 			lastName.val(),
				phone: 				phone.val(),
				cardType: 			cardType.val(),
				cardNumber: 		cardNumber.val(),
				cvv: 				cardCvv.val(),
				cardExpirationMonth: expiry.val(),
				cardExpirationYear: year.val(),
				address: 			"travelnow",
				province: 			"WA",
				postalcode: 		"98004",
				city: 				"Seattle",
				country: 			"US",
			}
			console.log(params);

			$.ajax({
				url: API_URL + '/expedia/proceedBooking?appKey='+APIKEY,
				type: 'POST',
				dataType: 'json',
				data: params,
			})
			.done(function(response) {
				console.log(response);
				if(!response.HotelRoomReservationResponse.EanWsError){
					App.dialog({
					  title        : 'Booking Successfull',
					  text         : 'Hotel ' + response.HotelRoomReservationResponse.hotelName +
					  	' has been booked from ' + response.HotelRoomReservationResponse.arrivalDate +
					  	' to ' + response.HotelRoomReservationResponse.departureDate + '. Please check inbox to view/cancel booking.',
					  okButton     : 'Done',
					}, function (tryAgain) {
					  if (tryAgain) {
					    App.back('home');
					  }
					});
				}else{
					App.dialog({
					  title        : 'Error',
					  text         : response.HotelRoomReservationResponse.EanWsError.presentationMessage,
					  okButton     : 'Try Again',
					});
				}
			})
			.fail(function(error) {
				console.log(error);
			})
			.always(function() {
				console.log("complete");
				proceed.ladda('stop');
			});

		}
	});
});
/*********************************
* @author Danish Jamil
* @Controller invoice
**********************************/
App.controller('invoice', function(page, data){
	currentPage = "nothomepage";
	console.log(data);

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	$(page).on('appShow', function(){
		$('#invoiceContainer').append(
			'<iframe src="'+data.url+'" class="invoice" />'
		);

		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}

		$('iframe').load(function(){
			$(page).find('.progress').hide();
		});
	});
	$(page).on('appBack', function(){
		App.back('home', function(){

		});
	});
});

App.controller('flightsdohop', function(page){
	var username;
	$.ajax({
		url: API_URL + '/modulesinfo/dohop?appKey='+APIKEY,
		dataType: 'JSON',
		method: 'GET',
		success: function(data){
			console.log(data);
			username = data.response.username;
		},
		error: function(error){
		}
	});

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	$(page).on('appShow', function(){
		$('#flightsdohopContainer').append(
			'<iframe src="http://www.dohop.com/widget/2/?forms=flights&tabs=top&orientation=horizontal&border_color=808080&text_color=202020&background_color=D0D0D0&form_border_color=808080&form_text_color=000&form_background_color=&width=370&flang=en&whitelabel=http://whitelabel.dohop.com/w/'+username+'" class="invoice" />'
		);

		$('iframe').load(function(){
			$(page).find('.progress').hide();
		});
	});

});

App.controller('wegoflights', function(page){
	var username;
	$.ajax({
		url: API_URL + '/modulesinfo/wego?appKey='+APIKEY,
		dataType: 'JSON',
		method: 'GET',
		success: function(data){
			console.log(data);
			url = data.response.url;
		},
		error: function(error){
		}
	});

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	$(page).on('appShow', function(){
		$('#wegoflightsContainer').append(
			'<iframe src="'+url+'" class="invoice" />'
		);

		$('iframe').load(function(){
			$(page).find('.progress').hide();
		});
	});

});

App.controller('hotelscombined', function(page){
	var aid;
	var brandid;

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	$(page).on('appShow', function(){

		$.ajax({
			url: API_URL + '/modulesinfo/hotelscombined?appKey='+APIKEY,
			dataType: 'JSON',
			method: 'GET',
			success: function(data){
				console.log(data);
				aid = data.response.aid;
				brandid = data.response.brandID;
				$('#hotelscombinedContainer').append(
					'<iframe src="//brands.datahc.com/?a_aid='+aid+'&brandid='+brandid+'&languageCode=TR" class="invoice" />'

				);
			},
			error: function(error){
			}
		});



		$('iframe').load(function(){
			$(page).find('.progress').hide();
		});
	});

});

App.controller('cartrawler', function(page){
	var cid;
	var url;

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	$(page).on('appShow', function(){

		$.ajax({
			url: API_URL + '/modulesinfo/cartrawler?appKey='+APIKEY,
			dataType: 'JSON',
			method: 'GET',
			success: function(data){
				console.log(data);
				cid = data.response.cid;
				url = data.response.url;

				$('#cartrawlerContainer').append(
					"<script> var CT = { ABE: { Settings: { clientID: '"+cid+"' } } };"+
					"(function() { var cts = document.createElement('script'); cts.type = 'text/javascript';"+
					" cts.async = true;  cts.src = '"+url+"?' + new Date().getTime();"+
					" var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cts, s);"+
					"})();</script>"

				);

			},
			error: function(error){
			}
		});
		setTimeout(function(){
	$(page).find('.progress').hide();
},4000);


	});



});


App.controller('travelstart', function(page){
	var affid;
	var iframeid;


	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	$(page).on('appShow', function(){
		$.ajax({
			url: API_URL + '/modulesinfo/travelstart?appKey='+APIKEY,
			dataType: 'JSON',
			method: 'GET',
			success: function(data){
				console.log(data);
				affid = data.response.affid;
				iframeid = data.response.iframeID;

				$('#travelstartContainer').append(
					'<iframe id="'+iframeid+'" class="invoice" />'+
					"<script type='text/javascript' src='//www.travelstart.ae/resources/js/vendor/jquery.browser-0.0.8.min.js'></script>"+
					"<script type='text/javascript' src='//www.travelstart.ae/resources/js/jquery.ba-postmessage.min.js'></script>"+
					"<script type='text/javascript'> var travelstartIframeId = '"+iframeid+"';"+
					" var iframeUrl = '//www.travelstart.ae'; var logMessages = false; var showBanners = false;"+
					"   var affId = '"+affid+"'; var affCampaign = '';   var affCurrency = 'Default';"+
					" var height = '100%';  var width = '100%';  var language = ''; "+
					"   var iframe = $('#' + travelstartIframeId);  var iframeVersion = '10'; var autoSearch = false;"+
					" var affiliateIdExist = false;  var urlParams = {};  var alreadyExist = []; var iframeParams = [];"+
					"  var cpySource = ''; var match, pl = "+/\+/g+", search = "+/([^&=]+)=?([^&]*)/g+","+
					" decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); },"+
					" query  = window.location.search.substring(1); while (match = search.exec(query)){ "+
					"  urlParams[decode(match[1])] = decode(match[2]); } for (var key in urlParams){"+
					"  if (urlParams.hasOwnProperty(key)){ if (key == 'search' && urlParams[key] == 'true'){"+
					"  autoSearch = true;  }   if(	key == 'affId' || key == 'affid' || key == 'aff_id'){"+
					" affiliateIdExist = true ; } iframeParams.push(key + '=' + urlParams[key]);"+
					" alreadyExist.push(key); }  } if(!('show_banners' in alreadyExist)){"+
					" iframeParams.push('show_banners=' + showBanners); } if(!('log' in alreadyExist)){"+
					" iframeParams.push('log='  + logMessages);   } if(! affiliateIdExist){"+
					"  iframeParams.push('affId='  + '"+affid+"');  } if(! affiliateIdExist){"+
					"  iframeParams.push('language='  + language); } if(!('affCampaign' in alreadyExist)){"+
					"  iframeParams.push('affCampaign='  + affCampaign);  }"+
					" if(cpySource !== '' && !('cpySource' in alreadyExist)){"+
					" iframeParams.push('cpy_source='  + cpySource);  }"+
					" if(!('utm_source' in alreadyExist)){ iframeParams.push('utm_source=affiliate');"+
					"   } if(!('utm_medium' in alreadyExist)){ iframeParams.push('utm_medium='  + affId);"+
					"  } if(!('isiframe' in alreadyExist)){iframeParams.push('isiframe=true');  }"+
					"  if(!('landing_page' in alreadyExist)){ iframeParams.push('landing_page=false');"+
					"  } if (affCurrency.length == 3){ iframeParams.push('currency=' + affCurrency);"+
					"  } if(!('iframeVersion' in alreadyExist)){iframeParams.push('iframeVersion='  + iframeVersion);"+
					"  } if(!('host' in alreadyExist)){  iframeParams.push('host=' + window.location.href.split('?')[0]);"+
					"  } var newIframeUrl = iframeUrl + (autoSearch ? '/search-on-index?search=true' : '/search-on-index?search=false') + '&' + iframeParams.join('&');"+
					"  iframe.attr('src', newIframeUrl); function setIframeSize(newWidth, newHeight){ iframe.css('width', newWidth);"+
					"  iframe.width(newWidth); iframe.css('height', newHeight); iframe.height(newHeight);   } setIframeSize(width, height);"+
					"   $.receiveMessage(function(e, host){ if (logMessages){ $('#logs').text('RECEIVED *** ' + new Date() + ' *** ' + 'message=' + e.data + ' *** iframeUrl=' + newIframeUrl);"+
					"   } var dataElements = e.data.split('&'); if(dataElements && dataElements.length === 1) {"+
					"  setIframeSize(width, e.data + 'px');  } else { var elementKey = dataElements[0].split('=');"+
					"  var elementValue = dataElements[1].split('=');    if(elementKey[1] === 'resize') {"+
					"  setIframeSize(width, elementValue[1] + 'px');    }   if(elementKey[1] === 'deeplink') {"+
					"  window.location.replace(unescape(elementValue[1])); } } }, iframeUrl);	</script>"
				);

			},
			error: function(error){
			}
		});


		$('iframe').load(function(){
			$(page).find('.progress').hide();
		});
	});

});

App.controller('cars', function(page, mData){
	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	//Variables
	var progress 	= $(page).find('.progress'); progress.hide();
	var mainContainer = $(page).find('.row'); mainContainer.hide();
	var cars 		= $(page).find('#Cars');
	var appContent 	= $(page).find('.app-content');
	var hotelItems  = $(page).find('.hotel');
	var bLazy;

	//Variable for loadMoreHotels
	var offset = 1;
	var moreAvailable = true;
	var loading = false;
	var params, url;

	//Check if params are sent. Then the parent page is search page.
	if(Object.keys(mData).length === 0){
		params = {
			offset: offset,
		  appKey: APIKEY
		}
		url = API_URL + '/cars/list';
		console.log(mData);

	}else{
		params = mData;
		params.offset = offset;
		params.appKey = APIKEY;
		url = API_URL + '/cars/search';
	}

	//Load cars after one second to reduce the delay in page loading.
	setTimeout(function(){loadMoreCars();}, 1000);

	//On scroll load more cars
	//Check the height of appContent and cars
	appContent.on('scroll', function(){
		if(appContent.scrollTop() >= (cars.height() - appContent.height()))
	    {
	        if(!loading && moreAvailable){
	        	loadMoreCars();
	        }
	    }
	});

	//Set Android Interface for Back key support
	//Initialize Lazy Load with scroller
	$(page).on('appShow', function(){
		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
		bLazy = new Blazy({container: '.app-content'});
	});

	//Hotel template variables
	var $temp = $(page).find('.hotel').remove();
	var $star = $temp.find('.material-icons').remove();

	function loadMoreCars(){
		progress.show();
		loading = true;
		params.offset = offset;
		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			data: params,
			success: function(result, status, xhr){
				progress.hide();
				mainContainer.show();
				loading = false;
				offset++;
				console.log(result);
				var testing = 'fdsafasdf';
				if(offset == 1 && typeof result.response != 'undefined' && result.response.error.status){
					App.dialog({
					  title        : 'Error',
					  text         : 'No results found.',
					  okButton     : 'OK',
					}, function (tryAgain) {
					  if (tryAgain) {
					    App.back();
					  }
					});
				}
				result.response.forEach(function(car){

					var $temp2 = $temp.clone(true);

					$temp2.attr('data-id', car.id);
					$temp2.find('.thumb')		.attr('data-src', car.thumbnail);
					$temp2.find('.title')		.html(car.title);
					$temp2.find('.location')	.html(car.location);
					$temp2.find('.price h4')	.html("<small>" + car.currCode + "</small> " + car.price);
					for(i = 0; i < car.starsCount; i++){
						$temp2.find('.stars').append($star.clone(true));
					}

					cars.append($temp2);
				});

				if(get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme($(page).find('.btn'));

				bLazy.revalidate();
			},
			error: function(xhr, status, error){
				console.log('xhr: ' + xhr + ', status: ' + status + ', error: ' + error);
				progress.hide();
				moreAvailable = false;
				loading = false;
			}
		})
		.always(function(){
			progress.hide();
		});
	}
    console.log("cars controller");

	$(page).on('click', '.hotel', function(){
		App.load('car', {id: $(this).data('id'), getParams: mData});
	});
});

App.controller('car', function(page, params){
	currentPage = "nothomepage";
	var swiperContainer = $(page).find('.swiper-container');
	var spinner 		= $(page).find('.loading-dialog');
	var row 			= $(page).find('.row'); row.hide();
	var pickupDate 			= $(page).find('#pickupDate');
	var dropoffDate 			= $(page).find('#dropoffDate');
	var pickupLoc 			= $(page).find('#carPickupLocations');
	var dropoffLoc 			= $(page).find('#carDropoffLocations');
	var appContent 		= $(page).find('.app-content');
	var bookNowBtn 		= $(page).find('.btn-booknow');
	var priceDiv 		= $(page).find('.priceDiv');
    var pickupSelectedLocation = params.getParams.pickupLocation;
    var dropoffSelectedLocation = params.getParams.dropoffLocation;
    var selectedDate = params.getParams.date;

    //Hide booknow button if pickup and dropoff locations are not selected
    if(typeof pickupSelectedLocation == 'undefined' && typeof dropoffSelectedLocation == 'undefined'){
      bookNowBtn.hide();
    }else{
      bookNowBtn.show();
    }
	//Gallery object used to hold slide images for gallery use.
	var gallery;
	var bLazy;

	var car;

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	// initLanguage();

	var mySwiper;
    var pickupSelected = "";
    var dropoffSelected = "";
     var pickupTime = $(page).find("#pickupTime");
     var dropoffTime = $(page).find("#dropoffTime");
     pickupTime.val(params.getParams.pickupTime);
     dropoffTime.val(params.getParams.dropoffTime);
    //Fill in car locations
	$.ajax({
		url: API_URL + '/cars/locations?appKey='+APIKEY,
		type: 'GET',
		dataType: 'json',
        data: {
				'id': params.id
			}
	})
	.done(function(result) {
		result.response.pickupLocations.forEach(function(item){
		  if( pickupSelectedLocation ==  item.id){
		    pickupSelected = "selected";
		  }else{
		    pickupSelected = "";
		  }
			$('#carPickupLocations').append('<option value="'+item.id+'" '+pickupSelected+'>'+item.name+'</option>');
		});

        result.response.dropoffLocations.forEach(function(item){
          if(dropoffSelectedLocation ==  item.id){
		    dropoffSelected = "selected";
		  }else{
		    dropoffSelected = "";
		  }
			$('#carDropoffLocations').append('<option value="'+item.id+'" '+dropoffSelected+'>'+item.name+'</option>');
		});
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

    // end fill dropdown of locations

	$(page).on('appShow', function () {
		if(typeof mySwiper === "undefined"){
			//initialize swiper when document ready
			mySwiper = new Swiper (swiperContainer, {
			  // Optional parameters
			  direction: 'horizontal',
			  // scrollbar: '.swiper-scrollbar',
			  pagination: '.swiper-pagination',
			  autoplay: 5000,
			  // effect: 'coverflow',
			  preloadImages: false,
			  lazyLoading: true,
			  lazyLoadingInPrevNext: true
			});
		}
		initComponents();

		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}

		bLazy = new Blazy({src: 'src'});
	});

	$(page).on('appLayout', function(){
		console.log(appContent.width() + ' x ' + swiperContainer.height());
		swiperContainer.height(appContent.width() - (appContent.width()/3));
	});

	var data;
	var bookingData;

	$(page).on('click', '.btn-booknow', function(){
		console.log(data);

		if(pickupDate.val() == ''){
			App.dialog({
			  title        : 'Error',
			  text         : 'Please select Pickup Date.',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    pickupDate.focus();
			  }
			});
		}else{
			bookingData = {
				'itemid': 	data.response.car.id,
				'pickupDate': 	pickupDate.val(),
				'dropoffDate': 	dropoffDate.val(),
				'pickuplocation':  pickupLoc.val(),
				'dropofflocation': 	dropoffLoc.val(),
				'pickupTime': 	pickupTime.val(),
				'dropoffTime': 	dropoffTime.val(),
				'btype': 	"cars"
			}
			App.load('booking', bookingData);
		}

		// console.log(checkIn + ' ' + checkOut);
		// console.log($('#adults').val());
		// console.log(roomsCount);
	});

	var overview		= $(page).find('#overview');
	var booking			= $(page).find('#booking');

	var sliderWrapper 	= $(page).find('.slideWrapper');
	var changeDate = $(page).find('#changeDate');

	changeDate.on('click', function(){
		// fetchDetails(checkIn.val(), checkOut.val());
		console.log( pt.changeToDate( pickupDate.val() ) );
		if(pickupDate.val() == ''){
			App.dialog({
			  title        : 'Error',
			  text         : 'Please select a date to pickup.',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    // try again
			  }
			});
		}else{
		 var frmData = {'pickupLocation': $(page).find('#carPickupLocations').val(), 'dropoffLocation': $(page).find('#carDropoffLocations').val(), 'pickupDate' : pickupDate.val(), 'dropoffDate' : dropoffDate.val()};
	     var mData = {id: $(this).data('id'), getParams: frmData};
		 fetchDetails(mData);
		}
	});

	function fetchDetails(args){
		row.hide();
		spinner.show();
		console.log(args.getParams);
        var getParams = args.getParams;

        //var bookNowBtn 		= $(page).find('.btn-booknow');
		//Ajax call to fetch details of hotel and add to hotel details page.
		$.ajax({
			url: API_URL + '/cars/details',
			dataType: 'json',
			type: "GET",
			data: {
								'appKey': APIKEY,
								'id': params.id,
                'pickupLocation': getParams.pickupLocation,
                'dropoffLocation': getParams.dropoffLocation,
                'date': getParams.date
			},
			success: function(result, status, xhr){
				console.log(result);
				spinner.hide();
				row.fadeIn(1000);
				data = result;
				car = result.response.car;
				//Putting sliderImages in gallery object to be used in kik viewer.
				gallery = result.response.car.sliderImages;
				var pageTitle 		= $(page).find('.app-title');
				pageTitle.html(car.title);
				//Create template of slide to be appended in swiper slider.
				var $slideTemp = $(page).find('.swiper-slide:first-child').remove();
				$(page).find('.swiper-wrapper').empty();
				gallery.forEach(function(image){
					//Clone slideTemp to a new a object to be appended.
					var $slide = $slideTemp.clone(true);
					$slide.find('.slide-image').attr('src', image.thumbImage);
					mySwiper.appendSlide($slide);
				});

				$('#date').val( car.pickupDate.split('/').reverse().join('-') );
				console.log( car.pickupDate.split('/').reverse().join('-') );

				var currCode = result.response.car.currCode;
                if(result.response.car.carPrice < 1){
                bookNowBtn.hide();
                priceDiv.hide();
                }else{
                bookNowBtn.show();
                priceDiv.show();
                }

				booking.find('.price').text(currCode + " " + result.response.car.carPrice);
				booking.find('.tax').html('<small>Tax & VAT</small> ' + currCode + " " + result.response.car.taxAmount);
				booking.find('.deposit').html('<small>Deposit Now</small> ' + currCode + " " + result.response.car.totalDeposit);
				//Create template of overview to be appended in Overview section.
				var $overview = overview.find('.overview');

				$overview.find('.description').html(result.response.car.desc);
				//Create Payment Options List Item temp and clone it options count times.
				var $listItemTemp = $overview.find('#paymentOptions .list-item:first-child').remove();
				$overview.find('#paymentOptions').empty();
				result.response.car.paymentOptions.forEach(function(option){
					var $listItem = $listItemTemp.clone(true);
					$listItem.find('span').html(option.name);
					$overview.find('#paymentOptions').append($listItem);
				});
				//Set policy
				$overview.find('.policy').html(result.response.car.policy);
				$overview.find('iframe').remove();
				//Set location iframe
				var locationIframe = $('<iframe />');
				locationIframe.addClass('hotelMap');
				locationIframe.attr('src',
					BASE_URL+'home/maps/'+result.response.car.latitude+'/'+result.response.car.longitude+'/cars/'+result.response.car.id);
				$overview.find('.location').append(locationIframe);

				// $('select').material_select();
				bLazy.revalidate();
				//Initialize tabs
				$('ul.tabs').tabs();
				//Apply theme to newly added buttons
				if(get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme($(page).find('.btn'));
			},
			error: function(xhr, status, error){
				console.log(error);
			}
		});
	}

	//Set on click event on slide-image to open gallery
	$(page).on('click', '.slide-image', function(){
		App.load('viewer',
			{
				urls: getGalleryUrls(gallery)
			}
		);
	});

	setTimeout(function(){fetchDetails(params);}, 1000);

});

/**
 * @Controller Theme Controller
 */
App.controller('theme', function(page){

	var appTopbar = $(page).find('.app-topbar');
	var themeList = $(page).find('#themeList');
	var spanColor = $(page).find('span.color');
	var topbarCb  = $(page).find('#topbarCb');
	var buttonsCb = $(page).find('#buttonsCb');
	var themeSwitch = $(page).find('#themeSwitch');

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );

	$(page).on('appShow', function(){
		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
	});

	spanColor.addClass(get(Global.KEY_THEME));

	// (window.localStorage.getItem('themeTopbar'))?topbarCb.prop('checked', 'checked'):topbarCb.removeAttr('checked');
	if(get(Global.KEY_THEME_TOPBAR) == 'true'){
		topbarCb.prop('checked', 'checked');
	}else{
		topbarCb.prop('checked', '');
	}
	if(get(Global.KEY_THEME_BUTTONS) == 'true'){
		buttonsCb.prop('checked', 'checked');
	}else{
		buttonsCb.prop('checked', '');
	}
	if(window.localStorage.getItem(Global.KEY_THEME_ENABLED) == 'true'){
		themeSwitch.prop('checked', 'checked');
	}else{
		themeSwitch.prop('checked', '');
	}

	topbarCb.change(function(event){set(Global.KEY_THEME_TOPBAR, '' + this.checked + '');
	console.log(window.localStorage.getItem('themeTopbar'))});
	buttonsCb.change(function(event){set(Global.KEY_THEME_BUTTONS, '' + this.checked + '');
	console.log(window.localStorage.getItem('themeButtons'))});

	themeList.on('change', function(){
		appTopbar.removeClass(getTheme());
		spanColor.removeClass(getTheme());
		changeTheme($(this).val());
		appTopbar.addClass(getTheme());
		spanColor.addClass(getTheme());
	});
	themeSwitch.on('change', function(){
		window.localStorage.setItem('themeEnabled', '' + this.checked + '');
	});
	themeList.children('option').each(function(){
		// console.log(getTheme());
		if($(this).val() == getTheme()){
			$(this).attr('selected', 'selected');
		}
		// console.log($(this).val());
	});
});



App.controller('contact-us', function(page, data){
	var btnSend = $(page).find('#send'),
	send;

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );


	$(page).on('appShow', function(){
		initComponents();
		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
		send = btnSend.ladda();
	});

	var contactInfo;

	$.ajax({
		url: API_URL + '/contact/info?appKey='+APIKEY,
		type: 'GET',
		dataType: 'json',
	})
	.done(function(result) {
		console.log("success");
		console.log(result);
		contactInfo = result.response;
		$('#map').html('<iframe width="100%" height="315" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="//maps.google.com/maps?q=' + encodeURIComponent(pt.stripHtml(result.response.contact_address)) +'&output=embed"></iframe>');
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});



	btnSend.on('click', function(){
		send.ladda('start');

		var name = $('#name').val();
		var email = $('#email').val();
		var subject = $('#subject').val();
		var message = $('#message').val();

		var params = {
			name: name,
			email: email,
			subject: subject,
			message: message,
			sendto: contactInfo.contact_email
		}

		console.log(params);

		$.ajax({
			url: API_URL + '/contact/send?appKey='+APIKEY,
			type: 'POST',
			dataType: 'json',
			data: params,
		})
		.done(function(res) {
			console.log("success");
			console.log(res);
			if(res.response.sent === true){
				App.dialog({
				  title        : 'Success',
				  text         : 'Message Sent',
				  okButton     : 'Done',
				});
			}else{
				App.dialog({
				  title        : 'Are you nuts?',
				  text         : 'Enter valid email.',
				  okButton     : 'Ok, I\'m Sorry!',
				});
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
			send.ladda('stop');
		});

	});
});

/**
 * @Controller Special Offers
 */
App.controller('offers', function(page){
	currentPage = false;
	var progress 			= $(page).find('.progress');
	var offersContainer		= $(page).find('#offers');
	var offersList			= $(page).find('ul.offers');
	var appContent 			= $(page).find('.app-content');
	var offerItem			= $(page).find('.offer-item');
  var mainContainer = $(page).find('.row'); mainContainer.hide();
	var offersArray = [];

	var bLazy;
	var offset = 1;
	var moreAvailable = true;
	var loading = false;

	$(page).on('appShow', function(){
		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
		bLazy = new Blazy({src: 'src', container: '.app-content'});
	});

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	offerItem.height(appContent.width() / 1.5);

	$(page).on('touchstart', '.offer-item', function(ev){
		$(this).addClass('active');
	});
	$(page).on('touchend', '.offer-item', function(ev){
		$(this).removeClass('active');
	});
	$(page).on('click', '.offer-item', function(ev){
		var id = $(this).data('id');
		var offer = findInArray(offersArray, "id", id);
		App.load('offer', offer);

	});

	$(page).on('appLayout', function(){
		console.log(appContent.width() + ' : ' + (appContent.width() / 1.5) );
		offerItem.height(appContent.width() / 1.5);
	});
	var offerTemp = offerItem.remove();
	setTimeout(function(){
		$.ajax({
			url: API_URL + '/offers/list?appKey='+APIKEY,
			dataType: 'json',
			method: 'GET',
			success: function(result){
				console.log(result);
				if(result.response){
					offersArray = result.response;
					$('.progress').hide();
					offersArray.forEach(function(item){
						var offer = offerTemp.clone(true);
						offer.attr('data-id', item.id);
						offer.find('.thumb').attr('src', item.thumbnail);
						offer.find('h5').html(item.title);
						offer.find('.price h4').html('<small>' + item.currCode + '</small> ' + item.price);
						offersList.append(offer);
						// console.log(item);
					});
					bLazy.revalidate();
					console.log('Blazy revalidated');
				}
			},
			error: function(error){
				console.log(error);
			}
		})
	}, 1000);

	appContent.on('scroll', function(){
		console.log(appContent.scrollTop());
	    console.log(offersContainer.height() - appContent.height());
		if(appContent.scrollTop() >= (offersContainer.height() - appContent.height()))
	    {

	        if(!loading && moreAvailable){
	        	loadMoreOffers();
	        }
	    }
	});

	function loadMoreOffers(){
		progress.show();
		loading = true;
		$.ajax({
			url: API_URL + '/offers/list?appKey='+APIKEY,
			type: "GET",
			dataType: "json",
			data: {offset: offset},
			success: function(result, status, xhr){
				progress.hide();
				mainContainer.show();
				loading = false;
				offset++;
				console.log(result);
				var testing = 'fdsafasdf';
				offersArray = result.response;
					$('.progress').hide();
					if(offersArray == null){
						moreAvailable = false;
						loading = false;
					}else{
					offersArray.forEach(function(item){
						var offer = offerTemp.clone(true);
						offer.attr('data-id', item.id);
						offer.find('.thumb').attr('src', item.thumbnail);
						offer.find('h5').html(item.title);
						offer.find('.price h4').html('<small>' + item.currCode + '</small> ' + item.price);
						offersList.append(offer);
						// console.log(item);
					});
				}

				if(get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme($(page).find('.btn'));

				bLazy.revalidate();
			},
			error: function(xhr, status, error){
				console.log('xhr: ' + xhr + ', status: ' + status + ', error: ' + error);
				progress.hide();
				moreAvailable = false;
				loading = false;
			}
		})
		.always(function(){
			progress.hide();
		});
	}

});

/**
 * @Controller OfferDetailsPage
 */
App.controller('offer', function(page, data){
	var sendButton 	= $(page).find('#send');
	var name 		= $(page).find('#name');
	var phone 		= $(page).find('#phone');
	var message 	= $(page).find('#message');
	var bLazy;

	console.log(data);

	$(page).on('appShow', function(){
		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
		bLazy = new Blazy({src: 'src'});
	});

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	// if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	sendButton.on('click', function(){
		if(name.val() == '' || phone.val() == '' || message.val() == ''){
			App.dialog({
			  title        : 'Error',
			  text         : 'All fields are necessary.',
			  okButton     : 'OK'
			}, function (tryAgain) {
			  if (tryAgain) {

			  }
			});
		}else{
			$(this).text("Sending");
			$.ajax({
				url: API_URL + '/offers/sendMessage?appKey='+APIKEY,
				method: "POST",
				dataType: 'json',
				data: {
					name: name.val(),
					phone: phone.val(),
					message: message.val(),
					toemail: data.email
				},
				success: function(data){
					console.log(data);
					sendButton.text("Sent");
					setTimeout(function(){sendButton.text("Send");}, 2000);
					if(data.response == "Email Sent"){
						App.dialog({
						  title        : 'Success',
						  text         : 'Your message has been sent successfully.',
						  okButton     : 'OK'
						}, function (tryAgain) {
						  if (tryAgain) {
						    name.val('');
						    phone.val('');
						    message.val('');
						  }
						});
					}
				},
				error: function(err){
					console.log(err);
				}
			});
		}
	}); // Send Button on click ends here

	//set details data in offer sent from offers page
	var details = $(page).find('.details');
	details.find('img').attr('src', data.thumbnail);
	details.find('.expiry').html(data.fullExpiryDate);
	details.find('.title').html(data.title);
	details.find('.desc').html(data.desc);

	$(page).find('.contact').find('.call').attr('href', 'tel:' + data.phone);

	if(data.offerForever){
		$(page).find('.validity-container').hide();
	}

});

App.controller('tours', function(page, data){
	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	var appContent 		= $(page).find('.app-content');
	var toursContainer = $(page).find('#toursContainer');
	toursContainer.hide();

	var loading = true;
	var moreAvailable = false;

	var bLazy;

	console.log(data);

	$(page).on('appShow', function(){
		initComponents();
		console.log('appShow event has been triggered of toursPage');
		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
		bLazy = new Blazy({container: '.app-content'});
	});


	appContent.scroll(function(){
		if(appContent.scrollTop() >= (toursContainer.height() - appContent.height()))
	    {
	        if(!loading && moreAvailable){
	        	loadMoreTours();
	        }
	    }
	});

	var offset = 1;
	var url = API_URL + '/tours/list';
	var params = {appKey: APIKEY, offset: offset};


	//tour template variables
	var $temp = $(page).find('.tour').remove();
	var $star = $temp.find('.material-icons').remove();

	setTimeout(function(){loadMoreTours();}, 1000);

	function loadMoreTours(){
		loading = true;
		$('.progress').show();

		params = {appKey: APIKEY, offset: offset};

		if(data.location){
			url = API_URL + '/tours/search';
			params = {
				appKey: APIKEY,
				offset: offset,
				location: data.location,
				tourType: data.tourType,
				adults: data.adults,
				date: data.date
			}
			console.log(params);
		}

		$.ajax({
			url: url,
			dataType: 'JSON',
			method: 'GET',
			data: params,
			success: function(data){
				console.log(data);

				$('.progress').hide();
				toursContainer.show();

				if(!data.response.length == 0){
					data.response.forEach(function(item){
						var $temp2 = $temp.clone(true);

						$temp2.attr('data-id', item.id);
						$temp2.attr('data-date', data.date);
						$temp2.find('.thumb')		.attr('data-src', item.thumbnail);
						$temp2.find('.title')		.html(item.title);
						$temp2.find('.location')	.html(item.location);
						$temp2.find('.price h4')	.html("<small>" + item.currCode + "</small> " + item.price);
						for(i = 0; i < item.starsCount; i++){
							$temp2.find('.stars').append($star.clone(true));
						}

						toursContainer.append($temp2);
					});
				}
				initComponents();
				loading = false;
				moreAvailable = true;
				offset++;
				bLazy.revalidate();
				if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );
			},
			error: function(error){
				console.log(error);
			}
		});
	}

	//Get tour id and date of clicked tour and send it to tour single page
	$(page).on('click', '.tour', function(){
		App.load('tour', {id: $(this).data('id'), date: $(this).data('date')});
	})

});

App.controller('tour', function(page, data){
	var swiperContainer = $(page).find('.swiper-container');
	var appContent 		= $(page).find('.app-content');
	var mainContainer 	= $(page).find('#tourDetailsContainer'); mainContainer.hide();
	console.log(data);

	var bLazy;

	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	var mySwiper;

	$(page).on('appShow', function(){
		console.log('appShow event has been triggered of tourDetailsPage');

		mySwiper = new Swiper (swiperContainer, {
		  // Optional parameters
		  // If we need pagination
    		pagination: '.swiper-pagination',
		  	direction: 'horizontal',
		  	autoplay: 5000,
			// effect: 'coverflow',
			preloadImages: false,
			lazyLoading: true,
			lazyLoadingInPrevNext: true
		  	// loop: true
		  	// scrollbar: '.swiper-scrollbar'
		});
		bLazy = new Blazy({src: 'src'});
		initComponents();
		$('ul.tabs').tabs();

		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}
		console.log(mySwiper);
	});

	$(page).on('appLayout', function(){
		console.log(appContent.width() + ' x ' + swiperContainer.height());
		swiperContainer.height(appContent.width() - (appContent.width()/3));
	});

	//Swiper slide template to be added in slide using appendSlide function of Swiper
	var $swiperSlide = $(page).find('.swiper-wrapper > .swiper-slide').remove();
	var gallery;
	setTimeout(function(){
		$.ajax({
			url: API_URL + '/tours/details',
			method: 'GET',
			dataType: 'JSON',
			data: {appKey: APIKEY, id: data.id},
			success: function(data){
				console.log(data.response);
				gallery = data.response.tour.sliderImages;
				data.response.tour.sliderImages.forEach(function(item){
					var $slide = $swiperSlide.clone(true);
					$slide.find('img').attr('src', item.fullImage);
					$slide.find('img').addClass('b-lazy');
					mySwiper.appendSlide($slide);
				});

				var pageTitle 		= $(page).find('.app-title');
				pageTitle.html(data.response.tour.title);

				$(page).find('#description').find('.desc').html(data.response.tour.desc);

	            var body = $(page).find('table tbody');
	            var row1 = body.find('tr:first-child');
	            var row2 = body.find('tr:nth-child(2)');
	            var row3 = body.find('tr:nth-child(3)');
	            var row4 = body.find('tr:nth-child(4)');

	            //Set row1 data of table body
	            row1.find('td:first-child').html('Adults '+data.response.tour.currSymbol + data.response.tour.perAdultPrice);

	            var optTemp = row1.find('td:nth-child(2) > select > option').remove();

	           	for(i = 1; i <= data.response.tour.maxAdults; i++){
	           		var opt = optTemp.clone(true);
	           		opt.val(i);
	           		opt.text(i);
	           		row1.find('select').append(opt);
	           	}

	           	row1.find('td:nth-child(3)').text(data.response.tour.currSymbol+ '' + data.response.tour.adultPrice + ' ' + data.response.tour.currCode);

	           	//Set row2 data of table body
	           	row2.find('td:first-child').text('Children '+data.response.tour.currSymbol + data.response.tour.perChildPrice);

	           	for(i = 1; i <= data.response.tour.maxChild; i++){
	           		var opt = optTemp.clone(true);
	           		opt.val(i);
	           		opt.text(i);
	           		row2.find('select').append(opt);
	           	}

	           	row2.find('td:nth-child(3)').text(data.response.tour.currSymbol+ '' + data.response.tour.childPrice + ' ' + data.response.tour.currCode);

	           	//Set row3 data of table body
	           	row3.find('td:first-child').text('Infants '+data.response.tour.currSymbol + data.response.tour.perInfantPrice);

	           	for(i = 1; i <= data.response.tour.maxInfant; i++){
	            	var opt = optTemp.clone(true);
	           		opt.val(i);
	           		opt.text(i);
	           		row3.find('select').append(opt);
	            }

	            row3.find('td:nth-child(3)').text(data.response.tour.currSymbol+ '' + data.response.tour.infantPrice + ' ' + data.response.tour.currCode);

				//Set row4 data of table body
				//Set the date to input[type="date"] format yyyy-mm-dd
				var dateInput = data.response.tour.date.split('/').reverse().join('-');

				row4.find('#date').val(dateInput);

				// Inclusions start here
				var inclusions = $(page).find('#inclusions');
				var listItemTemp = inclusions.find('div').remove();

				data.response.tour.inclusions.forEach(function(item){
					var listItem = listItemTemp.clone(true);
					listItem.find('span').text(item.name);
					listItem.find('i').addClass('green-text');
					inclusions.append(listItem);
				});

				//Set exclusions data
				var exclusions = $(page).find('#exclusions');

				data.response.tour.exclusions.forEach(function(item){
					var listItem = listItemTemp.clone(true);
					listItem.find('span').text(item.name);
					listItem.find('i').addClass('red-text');
					exclusions.append(listItem);
				});

				//Set reviews data
				var reviewTemp = $(page).find('#reviews .card-panel').remove();
				data.response.reviews.forEach(function(item){
					var review = reviewTemp.clone(true);
					review.find('.reviewer').text(item.review_by);
					review.find('.rating').text(item.rating + '/10');
					review.find('.date').text(item.review_date);
					review.find('.comment').text(item.review_comment);
					$(page).find('#reviews').append(review);
				});

				$('.preloader-wrapper').hide();

				mainContainer.fadeIn(1000);

				$('ul.tabs').tabs();
				bLazy.revalidate();
				if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );
			},
			error: function(error){
				console.log(error);
				$('.preloader-wrapper').hide();
				$(page).append('<h5>Error loading details. Error: '+ error.response.error +'</h5>');
			}
		});//End of ajax call
	}, 1000);//End of timeout function

	$(page).find('#btnBookNow').on('click', function(){
		var adultsCount 	= $('#adultsCount').val();
		var childrenCount 	= $('#childrenCount').val();
		var infantsCount 	= $('#infantsCount').val();
		console.log(adultsCount + '' + childrenCount + '' + infantsCount);

		var params = {
				itemid: data.id,
				adults: adultsCount,
				children: childrenCount,
				infant: infantsCount,
				date: pt.changeToDate($('#date').val()),
				btype: 'tours'
			}
		App.load('booking', params);

	});

	//Set on click event on slide-image to open gallery
	$(page).on('click', '.slide-image', function(){
		App.load('viewer',
			{
				urls: getGalleryUrls(gallery)
			}
		);
	});

});

App.controller('signup', function(page){
	var signupButton = $(page).find("#signup");
	var signupLadda;
	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	$(page).on('appShow', function(){
		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}

		signupLadda = signupButton.ladda();
	});

	signupButton.on('click', function(){
		var params = {
			first_name: 		$('#firstName').val(),
			last_name: 		$('#lastName').val(),
			email: 			$('#email').val(),
			password: 		$('#password').val(),
			phone: 			$('#phone').val(),
			address: 			$('#address').val()
		}
		if(params.firstname == '' || params.lastname == '' ||
			params.email == '' || params.email == '' ||
			params.phone == '' || params.address == ''){

			App.dialog({
			  title        : 'We won\'t let you go further',
			  text         : 'Please fill in all the blank fields.',
			  okButton     : 'Try Again',
			  cancelButton : 'Cancel'
			}, function (tryAgain) {
			  if (tryAgain) {
			    // try again
			  }
			});
		}else{
			console.log(params);
			signupLadda.ladda('start');
			$.ajax({
				url: API_URL + '/login/signup?appKey='+APIKEY,
				type: 'POST',
				dataType: "json",
				data: params,
			})
			.done(function(res) {
				console.log("success");
				console.log(res);
				if(res.response == true){
					App.dialog({
						title: "Success",
						text: "Signup is complete, Please check your inbox for confirmation.",
						okButton: "Ok"
					},function(){
						App.back();
					});
				}else if(res.response == false){
					App.dialog({
						title: "Error",
						text: res.error.msg,
						okButton: "Ok"
					},function(){

					});
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
				signupLadda.ladda('stop');
			});

		}
	});
});

App.controller('login', function(page){
	var signinButton 	= $(page).find("#loginButton");
	var emailField 		= $(page).find("#username");
	var passwordField 	= $(page).find("#password");
	var signinLadda;
	// Apply theme to topbar and buttons based on current settings.
	if( get(Global.KEY_THEME_TOPBAR)  == 'true') applyTheme( $(page).find('.app-topbar') );
	else applyDefaultTheme ( $(page).find('.app-topbar') );
	if( get(Global.KEY_THEME_BUTTONS) == 'true') applyTheme( $(page).find('.btn') );

	$(page).on('appShow', function(){
		try{
			Android.setText("NotHomePage");
		}catch(ex){
			console.log(ex.message);
		}

		signinLadda = signinButton.ladda();
	});

	signinButton.on('click', function(){
		signinLadda.ladda("start");
		$.ajax({
			url: API_URL + "/login/check?appKey="+APIKEY,
			type: 'POST',
			dataType: "json",
			data: {
				email: emailField.val(),
				password: passwordField.val()
			},
		})
		.done(function(res) {
			console.log(res);
			console.log("success");
			if(res.response == true){
				set("userId", res.userInfo.id);
				set("loggedIn", true);
				App.back();
			}else{
				App.dialog({
					title: "Error",
					text: "Username or Password is invalid",
					okButton: "Ok"
				});
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
			signinLadda.ladda("stop");
		});
	})
});

function proceedBooking(bookingData){
	console.log(bookingData);
	$('.preloader-wrapper').show();
	$.ajax({
		url: API_URL + '/hotels/book?appKey='+APIKEY,
		method: 'GET',
		dataType: 'json',
		data: bookingData,
		success: function(result){
			$('.preloader-wrapper').hide();
			console.log(result);
			var data = {'bookingData':bookingData, 'result': result};
			data.btype = 'hotels';
			App.load('booking', data);
		},
		error: function(error){
			$('.preloader-wrapper').hide();
			console.log(error);
		}
	});
}


/**
 * @param  {rooms array}
 * @param  {room id to match with this array}
 * @return {Room}
 */
function getRoomById(rooms, id){
	var r = null;
	rooms.forEach(function(room){
		// console.log(room.id);
		// console.log(id.toString());
		if(room.id == id.toString()){
			r = room;
		}
	});
	return r;
}


function getGalleryUrls(sliderImages){
	var urls = [];
	sliderImages.forEach(function(img){
		urls.push(img.fullImage);
		// console.log(urls);
	});
	return urls;
}

function getExpediaGalleryUrls(sliderImages){
	var urls = [];
	sliderImages.forEach(function(img){
		urls.push(img.url);
		// console.log(urls);
	});
	return urls;
}

/**
 * @param  {viewer}
 * @param  {PhotoViewer}
 * @return {null}
 */
App.controller('viewer', function (page, data) {
  	var photoViewer = new PhotoViewer(page, data.urls);
});

function findInArray(objectsArray, key, valueToSearch){
	for(i = 0; i < objectsArray.length; i++){
		// console.log(objectsArray[i]);
		if(objectsArray[i][key] == valueToSearch){
			return objectsArray[i];
		}
	}
	return null;
}

function checkError(data){

	if(data.error.status){
		modulesList.hide();
		errorMsg.show();
		errorMsg.html(data.error.msg);
	}
}

function upperCaseFirst(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
