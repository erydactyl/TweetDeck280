// ==UserScript==
// @name         TweetDeck Cramming
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Allow 280 characters in a Tweet sent from TweetDeck automatically
// @author       Erydactyl and Zemnmez
// @run-at       document-idle
// @match        https://tweetdeck.twitter.com/*
// @grant        *
// ==/UserScript==

var stopcondition = false;


interval = setInterval(function(){
    if (stopcondition==false) {
        if (/New Tweet/i.test (document.body.innerHTML) )        {
            TD.services.TwitterClient.prototype.makeTwitterCall = function(b, e, f, g, c, d, h) {
                c = c || function() {};
                d = d || function() {};
                b = this.request(b, {
                    method: f,
                    params: Object.assign(e, {
                        weighted_character_count: !0
                    }),
                    processor: g,
                    feedType: h
                });
                return b.addCallbacks(function(a) {
                    c(a.data);
                }, function(a) {
                    d(a.req, "", a.msg, a.req.errors);
                }), b;
            };


            twttrTxt = Object.assign({}, twttr.txt, {
                isInvalidTweet: function() {
                    return !1;
                },
                getTweetLength: function() {
                    return twttr.txt.getTweetLength.apply(this, arguments) - 140;
                }
            });
            stopcondition = true;
        }
    }

},500);
