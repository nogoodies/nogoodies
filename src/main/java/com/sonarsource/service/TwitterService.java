package com.sonarsource.service;

import com.sonarsource.domain.Event;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;
import javax.annotation.PostConstruct;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import twitter4j.FilterQuery;
import twitter4j.HashtagEntity;
import twitter4j.StallWarning;
import twitter4j.Status;
import twitter4j.StatusDeletionNotice;
import twitter4j.StatusListener;
import twitter4j.TwitterStream;
import twitter4j.TwitterStreamFactory;
import twitter4j.conf.Configuration;
import twitter4j.conf.ConfigurationBuilder;


@Component
public class TwitterService {

    private static final String[] HASH_TAGS = {"sonarsource", "nogoodies", "shipit"};
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

                String text = status.getText();
                text = text != null && text.length() > 255 ? text.substring(0,254) : text;

                Set<String> hashtags = Arrays.stream(status.getHashtagEntities())
                    .map(HashtagEntity::getText)
                    .collect(Collectors.toSet());
                boolean hasAllHashtags = hashtags.stream().filter(t -> Arrays.stream(HASH_TAGS).anyMatch(u -> u.equalsIgnoreCase(t))).count() == 3;
                log.info("@" + status.getUser().getScreenName() + " - " + status.getText() + " - " + hasAllHashtags + " - " + status.isRetweet());
                if (status.isRetweet() || !hasAllHashtags) {
                    return;
                }

                Event event = new Event();
                event.setTime(ZonedDateTime.now());
                event.setOrigin("twitter");
                event.setUser(status.getUser().getScreenName());
                event.setUserId(String.valueOf(status.getUser().getId()));
                event.setTweetText(text);
                event.setTweetId(String.valueOf(status.getId()));
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
        tweetFilterQuery.track(Arrays.stream(HASH_TAGS).map(t -> "#" + t).toArray(String[]::new));
        twitterStream.filter(tweetFilterQuery);

        //twitterStream.sample();
        log.info("TwitterService listener starteeeeeeeeeeeed !");


    }
}
