package com.sonarsource.web.rest;

import com.sonarsource.domain.Event;
import com.sonarsource.service.EventService;
import com.sonarsource.service.dto.ScoreDTO;
import com.sonarsource.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * REST controller for managing {@link ScoreDTO}.
 */
@RestController
@RequestMapping("/api")
public class ScoreResource {

    private final Logger log = LoggerFactory.getLogger(ScoreResource.class);

    private static final String ENTITY_NAME = "score";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EventService eventService;

    public ScoreResource(EventService eventService) {
        this.eventService = eventService;
    }

    /**
     * {@code GET  /score} : get the current score.
     *
     * @return the {@link ScoreDTO} with status {@code 200 (OK)} and the list of events in body.
     */
    @GetMapping("/score")
    public ResponseEntity<ScoreDTO> getScore() {

        List<Event> events = eventService.findAll();

        ScoreDTO score = new ScoreDTO();
        score.setAmountEuroGiven(5.28D * events.size());
        score.setCharityOrganization("banana Inc.");
        score.setCo2Saved(Long.valueOf(events.size()));
        score.setConfName("SonarSource SHIP IT!");
        score.setGoodiesNotTaken(Long.valueOf(events.size()));

        return ResponseEntity.ok(score);
    }


}
