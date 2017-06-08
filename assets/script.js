$(function() {
  "use strict";

  var body = $('body'),
    slider = $('.slider'),
    sliderUl = slider.find('> ul'),
    sliderCtrl = slider.find('> .controll .fa'),
    sliderTime = 500,
    sliderWait = 4000,
    autoRun;

  sliderUl.append('<li>' + sliderUl.find('> li').first().html() + '</li>');
  sliderUl.prepend('<li>' + sliderUl.find('> li').last().prev().html() + '</li>');

  function resetDimension() {
    slider.height(sliderUl.height());
    sliderUl.find('> li').width(slider.width());
    sliderUl.width(sliderUl.find('> li').width() * sliderUl.find('> li').length);
    sliderUl.find('> li').css('font-size', slider.width() * 0.13);
  }
  resetDimension();

  $(window).on('resize', function() {
    resetDimension();
  });

  function runSlider() {
    if (sliderUl.find('> li').hasClass('slider-active')) {
      sliderUl.animate({
        left: -sliderUl.find('> li').width() * $('.slider-active').index()
      }, sliderTime);
    }
  }
  runSlider();

  sliderCtrl.on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    if ($(this).hasClass('fa-chevron-left')) {
      if ($('.slider-active').prev().is(':first-of-type')) {
        $('.slider-active').prev().addClass('slider-active').siblings('li').removeClass('slider-active');
        sliderUl.css('left', -sliderUl.find('> li').width() * (sliderUl.find('> li').length - 1));
        sliderUl.find('> li').last().prev().addClass('slider-active').siblings('li').removeClass('slider-active');
      } else {
        $('.slider-active').prev().addClass('slider-active').siblings('li').removeClass('slider-active');
      }
    }
    if ($(this).hasClass('fa-chevron-right')) {
      if ($('.slider-active').next().is(':last-of-type')) {
        $('.slider-active').next().addClass('slider-active').siblings('li').removeClass('slider-active');
        sliderUl.css('left', 0);
        sliderUl.find('> li').first().next().addClass('slider-active').siblings('li').removeClass('slider-active');
      } else {
        $('.slider-active').next().addClass('slider-active').siblings('li').removeClass('slider-active');
      }
    }
    runSlider();
  });

  function autoRunSlider() {
    if (body.css('direction') === 'ltr') {
      autoRun = setInterval(function() {
        sliderCtrl.last().click();
      }, sliderWait);
    } else if (body.css('direction') === 'rtl') {
      autoRun = setInterval(function() {
        sliderCtrl.first().click();
      }, sliderWait);
    }
  }
  autoRunSlider();

  sliderCtrl.on('mouseenter', function() {
    clearInterval(autoRun);
  });
  sliderCtrl.on('mouseleave', function() {
    autoRunSlider();
  });
});

// Em An
// 12-4-2017
