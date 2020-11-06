$(document).ready(function () {
  let header_size = $("#header").height();
  let navbar_size = $("#navbar").height();
  let info_head_size = $(".info-block .info-head").height();

  // adjusts the size of banner container
  let refreshBannerConSize = () => {
    let orientation = $(window)[0].orientation;
    if ($(window).height() <= 654 || orientation % 180 === 0) {
      $(".banner-container").css("height", "auto");
    } else {
      $(".banner-container").css(
        "height",
        $(window).height() - (header_size + navbar_size + info_head_size)
      );
    }
  };

  refreshBannerConSize();

  // adjusts line height of speakers' details
  let refreshSpeakerDetailSizes = () => {
    let details = $("#speak .speak-info p:nth-of-type(2)");

    if ($(window).width() < 992) {
      details.css("height", "auto");
      return;
    }

    details.css("height", "auto");
    let websites = $("#speak .speak-info p:nth-of-type(4)");
    for (let i = 0; i < details.length; i += 2) {
      if (i == 6 && $(websites[7]).height() > $(websites[6]).height()) continue;
      let h1 = $(details[i]).height(),
        h2 = $(details[i + 1]).height();
      let max = h1 > h2 ? h1 : h2;
      $(details[i]).css("height", max);
      $(details[i + 1]).css("height", max);
    }
  };

  refreshSpeakerDetailSizes();

  // adjusts height of speaker name blocks per row
  let refreshSpeakerNameSizes = () => {
    let chairs = $(".speaker-name");
    chairs.css("height", "auto");

    if ($(window).width() < 768) return;

    for (let i = 0; i < chairs.length; i += 2) {
      let h1 = $(chairs[i]).height(),
        h2 = $(chairs[i + 1]).height();
      let max = h1 > h2 ? h1 : h2;
      $(chairs[i]).css("height", max + 36);
      $(chairs[i + 1]).css("height", max + 36);
    }
  };

  refreshSpeakerNameSizes();

  // adjusts height of committee chair blocks per row
  let refreshChairSizes = () => {
    let chairs = $(".chair");
    chairs.css("height", "auto");

    if ($(window).width() < 992) return;

    for (let i = 0; i < 6; i += 2) {
      let h1 = $(chairs[i]).height(), h2 = $(chairs[i + 1]).height();
      let max = h1 > h2 ? h1 : h2;
      $(chairs[i]).css("height", max);
      $(chairs[i + 1]).css("height", max);
    }
  };

  refreshChairSizes();

  let cardHeights = [
    [886, 483, 391, 537],
    [1008, 518, 535, 583],
    [576, 501, 535, 583],
  ];
  let refreshCollbarHeight = (i) => {
    let index;
    if ($(window).width() < 576) index = 0;
    else if ($(window).width() < 992) index = 1;
    else index = 2;
    let height = Math.max(
      cardHeights[index][i],
      $(window).height() - (header_size + navbar_size)
    );
    $("#coll-context").css("height", height);
  };

  // style properties for collapse bar contents
  let clickDisabled = false;
  $("#coll-context .d_card").hide();
  let collmenu = -1;
  let c_links = [$("#venue"), $("#pconf"), $("#spons"), $("#contc")];
  let cards = [$("#c_ven"), $("#c_prv"), $("#c_spn"), $("#c_con")];
  let toggleCollapseBar = (i) => {
    if (clickDisabled) return;

    $(".header-links ul li div").css("color", "#666");
    if ($("#coll-context").height() === 0) {
      refreshCollbarHeight(i);
      setTimeout(() => cards[i].show(200), 200);
      collmenu = i;
      c_links[i].css("color", "#333");
    } else {
      if (collmenu == i) {
        clickDisabled = true;
        $("#coll-context .d_card").hide(200);
        setTimeout(() => {
          $("#coll-context").css("height", "0");
          setTimeout(() => (clickDisabled = false), 500);
        }, 200);
        collmenu = -1;
      } else {
        cards[collmenu].hide(200);
        setTimeout(() => {
          refreshCollbarHeight(i);
          cards[i].show(200);
        }, 200);
        collmenu = i;
        c_links[i].css("color", "#333");
      }
    }
  };

  $("#venue").click(() => toggleCollapseBar(0));
  $("#pconf").click(() => toggleCollapseBar(1));
  $("#spons").click(() => toggleCollapseBar(2));
  $("#contc").click(() => toggleCollapseBar(3));

  // set hover colors for header links
  for (var i = 0; i < c_links.length; i++) {
    $(c_links[i]).hover(
      function () {
        $(this).css("color", "#333");
      },
      function () {
        $(this).css("color", "#666");
      }
    );
  }

  // collapse properties for contacts list
  let contacts = $("#c_con .contact-person");
  let expandContact = (index) => {
    for (let i = 0; i < contacts.length; i++) {
      if (index == i) {
        $(contacts[i]).removeClass("collapse-contact");
      } else {
        $(contacts[i]).addClass("collapse-contact");
      }
    }
  };
  for (let i = 0; i < contacts.length; i++) {
    $(contacts[i]).click(() => expandContact(i));
  }

  // window resized
  $(window).resize(function () {
    header_size = $("#header").height();
    navbar_size = $("#navbar").height();
    info_head_size = $(".info-block .info-head").height();

    setTimeout(() => {
      refreshBannerConSize();
      refreshSpeakerDetailSizes();
      refreshSpeakerNameSizes();
      refreshChairSizes();
    }, 500);

    // if collapse bar open, adjust height
    if ($("#coll-context").height() != 0) {
      refreshCollbarHeight(collmenu);
    }

    // set navbar links display type
    if ($(window).width() > 991) {
      $("nav .nav-links").css("display", "block");
      $("#hamburger").css("display", "none");
    } else {
      $("nav .nav-links").css("display", "none");
      $("#hamburger").css("display", "block");
    }
  });

  $(window).scroll(() => {
    // collapse collapse bar if open
    if ($("#coll-context").height() != 0) {
      if (
        $("#coll-context").height() ===
          $(window).height() - (header_size + navbar_size) ||
        $(window).scrollTop() >=
          header_size +
            $("#coll-context").height() +
            navbar_size -
            $(window).height() +
            96
      ) {
        window.scrollTo(0, 0);
        $("#coll-context .d_card").hide(200);
        setTimeout(() => {
          $("#coll-context").css("height", "0");
          setTimeout(() => window.scrollTo(0, 0), 500);
          for (let i = 0; i < c_links.length; i++)
            c_links[i].css("color", "#666");
        }, 200);

        return;
      }
    }

    // adjust navbar related styles based on scroll position
    if ($(window).scrollTop() >= header_size + $("#collbar").height()) {
      $("#navbar").addClass("fixed");
      $("#content-body").css("margin-top", navbar_size + "px");
      $("nav").css("background", "#333");
      $("#logo-iiests").css({
        background: 'url("images/logos/logo-iiests-white.png") no-repeat',
        "background-size": "auto 90%",
        "background-position": "50% 50%",
      });
      $("#hamburger").css({
        background: 'url("images/hamburger-white.png")',
        "background-size": "cover",
      });
      $("nav .logos span").css("color", "#ccc");
      $("nav .nav-links ul li div").css("color", "#ccc");
      $(".active").css("color", "#80ebff");
    } else {
      $("#navbar").removeClass("fixed");
      $("#content-body").css("margin-top", "0");
      $("nav").css("background", "white");
      $("#logo-iiests").css({
        background: 'url("images/logos/logo-iiests.png") no-repeat',
        "background-size": "auto 90%",
        "background-position": "50% 50%",
      });
      $("#hamburger").css({
        background: 'url("images/hamburger.png")',
        "background-size": "cover",
      });
      $("nav .logos span").css("color", "#333");
      if ($(window).width() > 991) {
        $("nav .nav-links ul li div").css("color", "#666");
        $(".active").css("color", "#333");
      } else {
        $("nav .nav-links ul li div").css("color", "#ccc");
        $(".active").css("color", "#80ebff");
      }
    }

    // display scroll to top button based on scroll position
    if ($(window).scrollTop() >= header_size) {
      $("#btn-top").css({
        opacity: ".75",
        visibility: "visible",
        transition: "all .75s ease-out",
      });
    } else {
      $("#btn-top").css({
        opacity: "0",
        visibility: "hidden",
      });
    }

    // select appropriate navbar link as active based on scroll position
    let reached =
      $(window).scrollTop() - navbar_size + ($(window).height() >> 1);
    let sec_tops = [];
    let sec_elems = [
      $("#info"),
      $("#about-icmc"),
      $("#speak"),
      $("#comm"),
      $("#trax"),
      $("#guide"),
      $("#reg"),
      $("#foot"),
    ];
    let sec_links = [
      $("#l_dates"),
      $("#l_about"),
      $("#l_speak"),
      $("#l_comm"),
      $("#l_trax"),
      $("#l_guide"),
      $("#l_reg"),
      $("#foot"),
    ];

    for (let i = 0; i < sec_elems.length; i++) {
      sec_tops[i] = sec_elems[i].position().top;
      sec_links[i].removeClass("active");
    }

    let index = -1;
    for (let i = 0; i < sec_tops.length - 1; i++) {
      if (reached < sec_tops[0]) break;
      if (reached >= sec_tops[i] && reached < sec_tops[i + 1]) {
        index = i;
        break;
      }
    }

    sec_links[index].addClass("active");
  });

  // banner countdown
  let countDownDate = new Date("Mar 2, 2021 11:00:00").getTime();
  let setCountdown = function () {
    let now = new Date().getTime();
    let dif = countDownDate - now;

    let days = Math.floor(dif / (1000 * 60 * 60 * 24));
    let hours = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("days").innerHTML = makeDoubleDigit(days);
    document.getElementById("hours").innerHTML = makeDoubleDigit(hours);
    document.getElementById("mins").innerHTML = makeDoubleDigit(mins);

    if (dif < 0) clearInterval(countdown);
  };

  let makeDoubleDigit = (num) => {
    return num.toString().length > 1 ? num : "0" + num;
  };

  setCountdown();
  let countdown = setInterval(() => {
    setCountdown();
  }, 60000);

  // click events

  $("#l_dates").click(() =>
    smoothScrollTo($("#info").position().top - navbar_size)
  );

  $("#l_about").click(() =>
    smoothScrollTo($("#about-icmc").position().top - navbar_size)
  );

  $("#l_speak").click(() =>
    smoothScrollTo($("#speak").position().top - navbar_size)
  );

  $("#l_comm").click(() =>
    smoothScrollTo($("#comm").position().top - navbar_size)
  );

  $("#l_trax").click(() =>
    smoothScrollTo($("#trax").position().top - navbar_size)
  );

  $("#l_guide").click(() =>
    smoothScrollTo($("#guide").position().top - navbar_size)
  );

  $("#l_reg").click(() =>
    smoothScrollTo($("#reg").position().top - navbar_size)
  );

  $("#btn-top").click(() => smoothScrollTo(0));

  let smoothScrollTo = (top) => {
    let delay = 0;
    if ($(window).width() < 992 && $("nav .nav-links").is(":visible")) {
      $("nav .nav-links").slideToggle(250);
      delay = 250;
    }

    setTimeout(() => {
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }, delay);
  };

  $("#hamburger").click(() => $("nav .nav-links").slideToggle(250));

  $(document).click((event) => {
    let e = $(event.target);

    // close dropdown if clicked elsewhere
    if ($(window).width() < 992 && $("nav .nav-links").is(":visible")) {
      if (e.parents(".nav-links").length === 0 && !e.is("#hamburger"))
        $("nav .nav-links").slideToggle(250);
    }

    // close collapsebar if clicked on navbar link
    if ($("#collbar").height() != 0) {
      if (e.parents(".nav-links").length != 0 || e.is("#hamburger")) {
        if (e.is("#hamburger")) $("nav .nav-links").slideToggle(0);

        window.scrollTo(0, 0);
        $("#coll-context .d_card").hide(200);
        setTimeout(() => {
          $("#coll-context").css("height", "0");
          window.scrollTo(0, 0);
          for (let i = 0; i < c_links.length; i++)
            c_links[i].css("color", "#666");
        }, 200);
      }
    }
  });
});
