<<<<<<< HEAD
(function() {
  var check_resize, decorate_links, formatTweet, render, templates;

  templates = {
    tweet: "<div class=\"span5 tweet\">\n	<p>{{{ text }}}</p>\n	<small>@<a href=\"http://twitter.com/{{ tweeted_by }}\">{{ tweeted_by }}</a></small>\n	{{#in_reply_to}}\n		<span>in reply to @<a href=\"{{in_reply_to}}\">{{in_reply_to}}</a></span>\n	{{/in_reply_to}}\n</div>"
  };

  render = function(templateName, values) {
    console.log("Rendering", templateName, "with values", values);
    return $($.mustache(templates[templateName], values));
  };

  formatTweet = function(tweet) {
    var data, twb, tweet_text;
    tweet_text = tweet.text.replace(/\b\S*\.[A-Za-z]{2,4}\S*\b/g, function(match) {
      return "<a href=\"" + match + "\">" + match + "</a>";
    });
    tweet_text = tweet_text.replace(/@\S*\b/g, function(match) {
      return "<a href=\"http://twitter.com/" + (match.slice(1)) + "\">" + match + "</a>";
    });
    tweet_text = tweet_text.replace(/#\S*\b/g, function(match) {
      return "<a href=\"http://twitter.com/#/!search/" + match + "\">" + match + "</a>";
    });
    twb = (typeof tweet.user === "function" ? tweet.user(tweet.from_user) : void 0) ? void 0 : tweet.user.screen_name;
    return data = {
      text: tweet_text,
      tweeted_by: twb,
      in_reply_to: tweet.in_reply_to_screen_name
    };
  };

  (function($) {
    return $.fn.scrollToElement = function(offset, speed) {
      if (speed == null) speed = 500;
      return $("body").animate({
        scrollTop: $(this).offset().top - offset
      }, speed);
    };
  })(jQuery);

  decorate_links = function() {
    return $("a").each(function() {
      if ($(this).attr("href")[0] === "#" && $(this).attr("href").length > 1) {
        return $(this).click(function() {
          if ($("#header.container").css("position") === "fixed") {
            return $($(this).attr("href")).scrollToElement(40);
          } else {
            return $($(this).attr("href")).scrollToElement(5);
          }
        });
      }
    });
  };

  check_resize = function() {
    if ($(window).width() <= 700 && $("ol.media-links").prev().attr("class" === "nav-links")) {
      return $("ol.media-links").insertBefore($("ol.nav-links"));
    } else if ($(window).width() > 700 && $("ol.nav-links").prev().attr("class" === "media-links")) {
      return $("ol.nav-links").insertBefore($("ol.media-links"));
    }
  };

  $(function() {
    check_resize();
    prettyPrint();
    $(window).resize(check_resize);
    return $.ajax({
      url: "https://api.twitter.com/1/statuses/user_timeline.json?include_rts=true&screen_name=Joshkunz&count=3",
      type: "GET",
      dataType: "jsonp",
      success: function(tweets) {
        var tweet, _i, _len;
        console.log(tweets);
        for (_i = 0, _len = tweets.length; _i < _len; _i++) {
          tweet = tweets[_i];
          render("tweet", formatTweet(tweet)).appendTo("#tweets-container");
        }
        return $("#tweets, #tweets-container").show(500);
      }
    });
  });

}).call(this);
=======
var checkResize, decorateLinks, fetchTweets, parseTweet;

parseTweet = function(tweet) {
  var twb, tweet_text;
  tweet_text = tweet.text.replace(/\b\S*\.[A-Za-z]{2,4}\S*\b/g, function(url) {
    return "<a href='" + url + "'>" + url + "</a>";
  });
  tweet_text = tweet_text.replace(/@\S*\b/g, function(username) {
    return "<a href='http://twitter.com/" + (username.slice(1)) + "'>" + username + "</a>";
  });
  tweet_text = tweet_text.replace(/#\S*\b/g, function(hashtag) {
    return "<a href='http://twitter.com/#!/search/" + hashtag + "'>" + hashtag + "</a>";
  });
  if (!(tweet.user != null)) {
    twb = tweet.from_user;
  } else {
    twb = tweet.user.screen_name;
  }
  return {
    text: tweet_text,
    tweeted_by: twb
  };
};

(function($) {
  return $.fn.scrollToElement = function(speed, offset) {
    console.log("Running scroll to:", this);
    return $("body").animate({
      scrollTop: $(this).offset().top - offset
    }, speed);
  };
})(jQuery);

decorateLinks = function() {
  return $("a").each(function() {
    if ($(this).attr("href")[0] === "#" && $(this).attr("href").length > 1) {
      return $(this).click(function() {
        var position;
        position = $($(this).attr("href"));
        if ($("#header.container").css("position" === "fixed")) {
          return position.scrollToElement(250, $("#header.container").height() + 10);
        } else {
          return position.scrollToElement(250, 5);
        }
      });
    }
  });
};

checkResize = function() {
  if ($(window).width() <= 700) {
    if ($("ol.media-links").prev().attr("class" === "nav-links")) {
      return $("ol.media-links").insertBefore($("ol.nav-links"));
    }
  } else if ($(window).width() > 700) {
    if ($("ol.nav-links").prev().attr("class" === "nav-links")) {
      return $("ol.nav-links").insertBefore($("ol.media-links"));
    }
  }
};

fetchTweets = function() {
  return $.ajax({
    url: "https://api.twitter.com/1/statuses/user_timeline.json?include_rts=true&screen_name=Joshkunz&count=5",
    type: "GET",
    dataType: "jsonp",
    success: function(tweets) {
      var tweet, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = tweets.length; _i < _len; _i++) {
        tweet = tweets[_i];
        $("#tweet-template").tmpl(parseTweet(tweet)).appendTo("#tweets");
        _results.push($("#tweets").show(500));
      }
      return _results;
    }
  });
};

$(function() {
  decorateLinks();
  checkResize();
  fetchTweets();
  return $(window).resize(checkResize);
});
>>>>>>> a3afa9b7111246cec69559b23182ceb813bb6890
