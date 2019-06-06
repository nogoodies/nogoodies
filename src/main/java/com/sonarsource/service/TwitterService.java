package com.sonarsource.service;

import com.sonarsource.domain.Event;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import twitter4j.*;
import twitter4j.conf.Configuration;
import twitter4j.conf.ConfigurationBuilder;

import javax.annotation.PostConstruct;
import java.time.ZonedDateTime;


@Component
public class TwitterService {

    private final org.slf4j.Logger log = LoggerFactory.getLogger(TwitterService.class);

    private final EventService eventService;

    public TwitterService(EventService eventService) {
        this.eventService = eventService;
    }

    @PostConstruct
    public void init() {

        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setDebugEnabled(true)
            .setOAuthConsumerKey("o3DQRmk17Me4iX1ju6exHCOg1")
            .setOAuthConsumerSecret("OHD7t0HuZVhnkECDzbUcoshKpP489JK7pXDaGi7WTcU6w77NyP")
            .setOAuthAccessToken("1136654881849298944-l6MmHR50KSs28hoVvP19JjqFJX4CF8")
            .setOAuthAccessTokenSecret("ovUyVhvuneVphU6LG3Ung10wg845wuiWjW9VwTlHDqmvR");
        Configuration conf = cb.build();

        TwitterStream twitterStream = new TwitterStreamFactory(conf).getInstance();

        StatusListener listener = new StatusListener() {
            @Override
            public void onStatus(Status status) {
                log.info("@" + status.getUser().getScreenName() + " - " + status.getText());
                Event event = new Event();
                event.setTime(ZonedDateTime.now());
                event.setOrigin("twitter");
                event.setUser(status.getUser().getScreenName());
                event.setUserId(String.valueOf(status.getUser().getId()));
                event.setTweetText(status.getText());
                eventService.save(event);
            }

            @Override
            public void onDeletionNotice(StatusDeletionNotice statusDeletionNotice) {
                //System.out.println("Got a status deletion notice id:" + statusDeletionNotice.getStatusId());
            }

            @Override
            public void onTrackLimitationNotice(int numberOfLimitedStatuses) {
                log.info("Got track limitation notice:" + numberOfLimitedStatuses);
            }

            @Override
            public void onScrubGeo(long userId, long upToStatusId) {
                //System.out.println("Got scrub_geo event userId:" + userId + " upToStatusId:" + upToStatusId);
            }

            @Override
            public void onStallWarning(StallWarning warning) {
                log.info("Got stall warning:" + warning);
            }

            @Override
            public void onException(Exception ex) {
                ex.printStackTrace();
            }
        };

        twitterStream.addListener(listener);

        FilterQuery tweetFilterQuery = new FilterQuery();
        //tweetFilterQuery.language("fr");
        //tweetFilterQuery.track(new String[]{"sonarsource", "nogoodies", "climatechange"}); // OR on keywords
        twitterStream.filter(tweetFilterQuery);
        tweetFilterQuery.track(new String[]{"#sonarsource", "#nogoodies", "#shipit", "#climatechange"});

        //twitterStream.sample();
        log.info("TwitterService listener starteeeeeeeeeeeed !");



    }
}
