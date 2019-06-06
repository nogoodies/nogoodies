package com.sonarsource.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Event.
 */
@Entity
@Table(name = "event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "jhi_time", nullable = false)
    private ZonedDateTime time;

    @Column(name = "jhi_user")
    private String user;

    @NotNull
    @Column(name = "origin", nullable = false)
    private String origin;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "tweet_text")
    private String tweetText;

    @Column(name = "tweet_id")
    private String tweetId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public Event time(ZonedDateTime time) {
        this.time = time;
        return this;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public String getUser() {
        return user;
    }

    public Event user(String user) {
        this.user = user;
        return this;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getOrigin() {
        return origin;
    }

    public Event origin(String origin) {
        this.origin = origin;
        return this;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getUserId() {
        return userId;
    }

    public Event userId(String userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTweetText() {
        return tweetText;
    }

    public Event tweetText(String tweetText) {
        this.tweetText = tweetText;
        return this;
    }

    public void setTweetText(String tweetText) {
        this.tweetText = tweetText;
    }

    public String getTweetId() {
        return tweetId;
    }

    public Event tweetId(String tweetId) {
        this.tweetId = tweetId;
        return this;
    }

    public void setTweetId(String tweetId) {
        this.tweetId = tweetId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Event)) {
            return false;
        }
        return id != null && id.equals(((Event) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Event{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", user='" + getUser() + "'" +
            ", origin='" + getOrigin() + "'" +
            ", userId='" + getUserId() + "'" +
            ", tweetText='" + getTweetText() + "'" +
            ", tweetId='" + getTweetId() + "'" +
            "}";
    }
}
