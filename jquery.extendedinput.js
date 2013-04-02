/*
 * jQuery Extended Input Plugin 0.8
 *
 * This plugin is used for prototyping purposes; it allows you to quickly show and hide
 * HTML elements using generic patterns.
 *
 * www.wolfslittlestore.be
 * Copyright 2012, Wolf's Little Store
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

$(function(){

  /*
    Pattern: show a given HTML element with data attribute
  */

  $('[data-open-element]').click(function(e) {
    e.preventDefault();
    // Read data attribute
    var value = $(this).attr('data-open-element');

    // Open relevant box and add trigger class to hide box later
    $('[data-element-to-be-opened="' + value + '"]').removeClass('hide').addClass('opened-via-linked-box');
  });

  /*
    Pattern: show a given container based on radio choice
    This should be an HTML element with a data attribute of data-show with the same value as the checkbox id
  */

  $('input[type="radio"]').change(function() {
    // All radios will change, check which one is checked
    if ($(this).is(':checked')) {

      // Alternate method through data attribute
      var showId = 'div[data-show*="' + $(this).attr('id') + '"]';

      // Hide all linked data fields

        // Find out which data fields are linked
        var radioIDs= [];
        $(this).closest('ul, table').find('input[type="radio"]').each(function() {
          radioIDs.push(this.id);
        });

        $.each(radioIDs, function(index, val) {
          // Now hide all the ids in array
          $('div[data-show*='+val+']').addClass('hide')
        });

      // Except the one tied to radio id
      $(showId).removeClass('hide');
    }
  });

  /*
    Pattern: show a given container based checkbox choice
    This should be an HTML element with a data attribute of data-show with the same value as the checkbox id

    TBD update to bootstrap markup
  */

  $('input[type="checkbox"]').change(function() {

    // Alternate method through data attribute
    var showId = 'div[data-show="' + $(this).attr('id') + '"]';

    // Action on check/uncheck checkbox
    if ($(this).is(':checked')) {
      $(this).parent('li').find('.extendedInput').removeClass('hide');
      // Show the one tied to checkbox id
      $(showId).removeClass('hide');
    } else {
      $(this).parent('li').find('.extendedInput').addClass('hide');
      // Hide the one tied to checkbox id
      $(showId).addClass('hide');
    }
  });

  /*
    Pattern: show a given container based on a selected <option>
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
        $('div[data-show*='+val+']').addClass('hide')
      });

    // Except the one tied to data attribute
    var showId = 'div[data-show*="' + $(this).find('option:selected').attr('id') + '"]';
    $(showId).removeClass('hide');

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
      $('[data-toggle-element*='+val+']').addClass('hide')
    });
    
    // Except the one tied to data attribute
    var showData = '[data-toggle-element="' + $(this).attr('data-toggle-trigger') +  '"]';
    $(showData).removeClass('hide');

  });
  

});