import $ from 'jquery'; 
$(function () {
    debugger
    'use strict';
    // Start navbar 
    (function () {
      // Add class active when the user clicks the lis of the menu
      $('.nav .list li').on('click', 'a', function () {
        $(this).parent().addClass('active').siblings().removeClass('active');
      });
      var openCategories = $('.nav #open-categories'),
          categories = $('.drop-down');
      // Toggle categories on clicking
      openCategories.on('click', function () {
        $("#" + $(this).data('dropdown')).toggleClass('show');
        // When the user clicks the window if the categories is not the target, close it.
        $(window).on('mouseup', function (e) {
          if (categories.hasClass('show') && !categories.is(e.target) && categories.has(e.target).length === 0 && !openCategories.is(e.target)) {console.log("d");
            categories.removeClass('show');
          }
        });
      });
      // Toggle menu, This will be shown in Extra small screens only
      $('.nav .toggle-nav').on('click', function () {
        $("#" + $(this).data('toggle')).slideToggle(300);
      });
    }());
  });