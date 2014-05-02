/*
 * jQuery Extended Input Plugin 2.1.2
 *
 * This plugin is used for prototyping purposes;
 * it allows you to quickly show, hide and toggle
 * HTML elements using generic patterns.
 *
 * www.wolfslittlestore.be
 * Copyright 2012, Wolf's Little Store
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function( $ ) {
  $.fn.extendedInput = function(options) {
  
    // Plugin settings
    var settings = $.extend( {
      hideClass         : 'hide'
    }, options);

    /*
      Pattern: show a given HTML element with data attribute
      Use data-open-element and data-element-to-be-opened attributes with the same values to show a hidden HTML element
    */
    
    $('[data-show]').on('click', function(e) {
      // If we are triggering a link with # prevent the default behavior of jumping to top of body
      if ($(this).attr('href') === '#') {
        e.preventDefault();
      }
      // Read data attribute
      var value = $(this).attr('data-show');

      // Open relevant box and add trigger class to hide box later
      $('[data-show="' + value + '"]').removeClass(settings.hideClass);
    });

    /*
      Pattern: close a given HTML element with data attribute
      Use data-close-element and data-element-to-be-closed attributes with the same values to hide a visible HTML element.
    */
    
    $('[data-hide]').on('click', function(e) {
      // If we are triggering a link with # prevent the default behavior of jumping to top of body
      if ($(this).attr('href') === '#') {
        e.preventDefault();
      }
      // Read data attribute
      var value = $(this).attr('data-hide');

      // Close relevant box but not yourself
      $(this).removeAttr('data-hide');
      $('[data-hide="' + value + '"]').addClass(settings.hideClass);
    });

    /*
      Pattern: hide a given HTML element on click
      Use the keyword "self"
    */
    
    $('[data-hide="self"]').on('click', function(e) {
      $(this).addClass(settings.hideClass);
    });

    /*
      Pattern: toggle a given HTML element with data attribute
      Use data-toggle-trigger and data-tiggke attributes with the same values to toggle an HTML element.
    */

    $('[data-toggle-trigger]').on('click', function(e) {

      // If we are triggering a link with # prevent the default behavior of jumping to top of body
      if ($(this).attr('href') === '#') {
        e.preventDefault();
      }

      // Read data attribute
      var value = $(this).attr('data-toggle-trigger');
      // Toggle relevant box
      if ($('[data-toggle="' + value + '"]').is(':visible')) {
          $('[data-toggle="' + value + '"]').addClass(settings.hideClass);
      } else {
          $('[data-toggle="' + value + '"]').removeClass(settings.hideClass);
      }
    });

    /*
      Pattern: show a given HTML element with a data-show attribute based on a selected <option>
    */

    $('select').change(function(e) {

      // Find out which data-show attributes are linked to options
      var linkedData= [];
      $(this).find('option').each(function() {
        linkedData.push($(this).attr('data-show'));
      });

      $.each(linkedData, function(index, val) {
        // Now hide all the linked data-show elements
        $('[data-show*='+val+']').addClass(settings.hideClass);
      });

      // Except the one tied to data attribute
      var showLinkedData = '[data-show="' + $(this).find('option:selected').attr('data-show') + '"]';
      $(showLinkedData).removeClass(settings.hideClass);

    });

    /*
      Data toggle group
      Toggles between multiple sets of data
    */

    $('[data-toggle-group="true"] a').click(function(e) {

      e.preventDefault();

      // Manage active state
      $(this).siblings('a').removeClass('active');
      $(this).addClass('active');

      // Store our references
      var data = [];
      $(this).parent().find('a[data-toggle-group-trigger]').each(function() {
        data.push($(this).attr('data-toggle-group-trigger'));
      });

      // Hide all referenced fields
      $.each(data, function(index, val) {
        $('[data-toggle-group-element*='+val+']').addClass(settings.hideClass);
      });
  
      // Except the one tied to data attribute
      var showData = '[data-toggle-group-element="' + $(this).attr('data-toggle-group-trigger') +  '"]';
      $(showData).removeClass(settings.hideClass);

    });

  };
})(jQuery);