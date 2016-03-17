# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
  page = $("title").text();
  $(".nav-right").removeClass("nav-selected");
  $(".nav-right").addClass("nav-unselected");
	
  if page == "About"
    $("#about-tab").addClass("nav-selected");
    $("#about-tab").removeClass("nav-unselected");

  if page == "Resume"
    $("#resume-tab").addClass("nav-selected");
    $("#resume-tab").removeClass("nav-unselected");

  if page == "Contact"
    $("#contact-tab").addClass("nav-selected");
    $("#contact-tab").removeClass("nav-unselected");
	
	
  $("#menu-icon").click ->
    if $(".nav-right").css("visibility") == "hidden" 
      $(".nav-right").css("visibility", "visible");
      $("#nav-menu").css("background-color", "white");	
    else
      $(".nav-right").css("visibility", "hidden");
      $("#nav-menu").css("background-color", "transparent");
		

