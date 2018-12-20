const sqlite3 = require('sqlite3').verbose();

module.exports = {
  writeTweetResults: function(tweetContainer) {
    var db = new sqlite3.Database('./tweetsearch/db/tweetsearch.db', function(
      error
    ) {
      if (error) {
        console.error(error.message);
      }
      db.serialize(function() {
        db.run(
          'CREATE TABLE IF NOT EXISTS tweets (hashtag text, created_at blob, \
      id real PRIMARY KEY, id_str real, text text, truncated text, entities text, metadata text, \
      source text, in_reply_to_status_id text, \
      in_reply_to_status_id_str text, in_reply_to_status_user_id text, \
      in_reply_to_status_user_id_str text, \
      in_reply_to_status_screen_name text, user text, geo text, \
      coordinates text, place text, contributors text, retweeted_status text, \
      is_quote_status text, retweet_count text, favorite_count text, \
      favorited text, retweeted text, lang text)'
        );
        var insertstmt = db.prepare(
          'INSERT OR IGNORE INTO tweets VALUES (?, ?, ?, ?, ?, ?, ?, \
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        insertstmt.run(
          tweetContainer.hashtag,
          tweetContainer.created_at,
          tweetContainer.id,
          tweetContainer.id_str,
          tweetContainer.text,
          tweetContainer.truncated,
          tweetContainer.entities,
          tweetContainer.metadata,
          tweetContainer.source,
          tweetContainer.in_reply_to_status_id,
          tweetContainer.in_reply_to_status_id_str,
          tweetContainer.in_reply_to_status_user_id,
          tweetContainer.in_reply_to_status_id_str,
          tweetContainer.in_reply_to_status_screen_name,
          tweetContainer.user,
          tweetContainer.geo,
          tweetContainer.coordinates,
          tweetContainer.place,
          tweetContainer.contributors,
          tweetContainer.retweeted_status,
          tweetContainer.is_quote_status,
          tweetContainer.retweet_count,
          tweetContainer.favorite_count,
          tweetContainer.favorited,
          tweetContainer.retweeted,
          tweetContainer.lang
        );
        insertstmt.finalize();
      });

      db.close(function(error) {
        if (error) {
          return console.error(err.message);
        }
      });
    });
  },

  getTweets: function(hashtag) {
    var db = new sqlite3.Database('./tweetsearch/db/tweetsearch.db', function(
      error
    ) {
      if (error) {
        console.error(error.message);
      }

      var tweets = [];
      db.serialize(function() {
        db.all(
          "SELECT * FROM tweets WHERE hashtag = '" + hashtag + "'",
          function(error, row) {
            tweets.push(row);
          }
        );
      });
      return tweets;
    });
  }
};
