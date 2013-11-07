/*
 * jQuery Extended Input Plugin 1.0
 *
 * This plugin is used for prototyping purposes; it allows you to quickly show and hide
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
      Use data-open-element and data-element-to-be-opened attributes with the same values to show a hidden HTML element.
    */

    $('[data-open-element]').click(function(e) {
      e.preventDefault();
      // Read data attribute
      var value = $(this).attr('data-open-element');

      // Open relevant box and add trigger class to hide box later
      $('[data-element-to-be-opened="' + value + '"]').removeClass(settings.hideClass).addClass('opened-via-linked-box');
    });

    /*
      Pattern: close a given HTML element with data attribute
      Use data-close-element and data-element-to-be-closed attributes with the same values to hide a visible HTML element.
    */
    
    $('[data-close-element]').click(function(e) {
      e.preventDefault();
      // Read data attribute
      var value = $(this).attr('data-close-element');

      // Close relevant box
      $('[data-element-to-be-closed="' + value + '"]').addClass(settings.hideClass).addClass('opened-via-linked-box');
    });
    

    /*
      Pattern: toggle a given HTML element with data attribute
      Use data-toggle-element and data-element-to-be-toggle attributes with the same values to hide a visible HTML element.
    */

    $('[data-toggle-element]').click(function(e) {
      e.preventDefault();
      // Read data attribute
      var value = $(this).attr('data-toggle-element');

      // Toggle relevant box
      if ($('[data-element-to-be-toggled="' + value + '"]').is(':visible')) {
          $('[data-element-to-be-toggled="' + value + '"]').addClass(settings.hideClass);
      } else {
          $('[data-element-to-be-toggled="' + value + '"]').removeClass(settings.hideClass);
      }
    });

    /*
      Pattern: show a given HTML element based on radio button state

      This should be an HTML element with a data attribute of data-show with the same value as the radio id
      e.g. <input type="radio" id="hello"> shows <div data-show="hello" class="hide"> when it gets selected
    */

    $('input[type="radio"]').change(function() {
      // All radios will change, check which one is checked
      if ($(this).is(':checked')) {

        // Find out which container is linked to this radio button
        var showId = '[data-show*="' + $(this).attr('id') + '"]';

        // Hide all linked data fields

          // Find out which data fields are linked
          var radioIDs= [];
          $(this).closest('ul, ol, table, div').find('input[type="radio"]').each(function() {
            radioIDs.push(this.id);
          });

          $.each(radioIDs, function(index, val) {
            // Now hide all the ids in array
            $('[data-show*='+val+']').addClass(settings.hideClass);
          });

        // Except the one tied to radio id
        $(showId).removeClass(settings.hideClass);
      }
    });

    /*
      Pattern: show a given HTML element based on checkbox state
      This should be an HTML element with a data attribute of data-show with the same value as the checkbox id
    */

    $('input[type="checkbox"]').change(function() {

      // Alternate method through data attribute
      var showId = '[data-show="' + $(this).attr('id') + '"]';

      // Action on check/uncheck checkbox
      if ($(this).is(':checked')) {
        $(showId).removeClass(settings.hideClass);
      } else {
        $(showId).addClass(settings.hideClass);
      }
    });

    /*
      Pattern: show a given HTML element based on a selected <option>
    */

    $('select').change(function(e) {

      // Hide all linked data fields

        // Find out which data fields are linked
        var selectOptionIDs= [];
        $(this).find('option').each(function() {
          selectOptionIDs.push(this.id);
        });
  
        $.each(selectOptionIDs, function(index, val) {
          // Now hide all the ids in array
          $('[data-show*='+val+']').addClass(settings.hideClass);
        });

      // Except the one tied to data attribute
      var showId = '[data-show*="' + $(this).find('option:selected').attr('id') + '"]';
      $(showId).removeClass(settings.hideClass);

    });

    /*
      Data toggle
      Toggles between 2 sets of data using 2 links as controls
    */

    $('[data-toggle="true"] a').click(function(e) {

      e.preventDefault();

      // Manage active state
      $(this).siblings('a').removeClass('active');
      $(this).addClass('active');

      // Store our references
      var data = [];
      $(this).parent().find('a[data-toggle-trigger]').each(function() {
        data.push($(this).attr('data-toggle-trigger'));
      });

      // Hide all referenced fields
      $.each(data, function(index, val) {
        $('[data-toggle-element*='+val+']').addClass(settings.hideClass);
      });
  
      // Except the one tied to data attribute
      var showData = '[data-toggle-element="' + $(this).attr('data-toggle-trigger') +  '"]';
      $(showData).removeClass(settings.hideClass);

    });

  };
})(jQuery);