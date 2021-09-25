/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);

const trigElements = ['#section-01-trigger', '#section-02-trigger','#section-03-trigger', '#section-04-trigger', '#section-05-trigger'];
const targIDs = ['#sticky-header-01', '#sticky-header-02','#sticky-header-03', '#sticky-header-04', '#sticky-header-05'];
var controller = new ScrollMagic.Controller();
for (let j = 0; j < trigElements.length; j++) {
	var scene = new ScrollMagic.Scene({
		triggerElement: trigElements[j],
		triggerHook: 0.2 // when scrolled 90%
	})
	.setClassToggle(targIDs[j], "faded")
	.addTo(controller);
}
// Script for gallery

var dict = new Object();
const sets = ["Set-01", "Set-02","Set-03", "Set-04"];
var slideIndex = 1;

for (let i = 0; i < sets.length; i++) {
	dict[sets[i]] = slideIndex;
	showSlides(sets[i], slideIndex);
}



// Next/previous controls
function plusSlides(setName, n) {
  showSlides(setName, slideIndex += n);
}

// Thumbnail image controls
function currentSlide(setName, n) {
  showSlides(setName, slideIndex = n);
}

function showSlides(setName, n) {
  var i;
  var slides = document.getElementsByClassName(setName);
  var dots = document.getElementsByClassName(setName + "-demo");
  var captionText = document.getElementById(setName + "-caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

// Script for modal

function openModal(modalID) {
	// Get the modal
	var modal = document.getElementById(modalID);

	// Get the image and insert it inside the modal - use its "alt" text as a caption
	var img = document.getElementById(modalID + "-img");
	var modalImg = document.getElementById(modalID + "-full-img");
	var captionText = document.getElementById(modalID + "-caption");
	modal.classList.add("show");
	modalImg.src = img.src;
	captionText.innerHTML = img.alt;
	
}

function closeModal(modalID) {
// Get the <span> element that closes the modal
var span = document.getElementById(modalID + "-close");
var modal = document.getElementById(modalID);
var modalImg = document.getElementById(modalID + "-full-img");
// When the user clicks on <span> (x), close the modal
  modal.classList.remove("show");

}

window.onclick = function(event) {
  if (event.target.classList[0] == "modal") {
    event.target.classList.remove("show");
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});