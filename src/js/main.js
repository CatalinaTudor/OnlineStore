$(document).ready(function() {

    $(".popup-with-form").magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',

        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function() {
                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });

    // Show or hide the search field
    $(".search").on("mousedown", function() {
        var inputField = $("#user-interaction").find("input");
        if ($(inputField).is(":visible")) {
            inputField.hide();
        } else {
            inputField.css('display','block');
        }
    });

    // calling the function for bxslider plugin

    $('.slider').bxSlider({
        mode: 'fade',
        captions: true,
        auto: true,
        controls: false,
        adaptiveHeight: false,
    });

    // carousel slider 

    var width = $(window).width();

    $('.carousel').bxSlider ({
    	slideWidth: 320,
        slideMargin: 0,
        moveSlides: 1,
        auto: true,
        pager: false,
        autoControls: false,
        minSlides: 6,
        maxSlides: (width < 430) ? 1:6,
    })
    
    // Individual item details

    $('.small-container ul').on("click", "li", function () {
        imgLink = $(this).attr('data-href'); 
        $(".big-container > img").attr('src', imgLink);
        $("li.active-icon").removeClass("active-icon");
        $(this).addClass("active-icon");
    }) 

    // Reveal the option that was made
    $("nav select").change(function() {
      window.location = $(this).find("option:selected").val();
    });
});
