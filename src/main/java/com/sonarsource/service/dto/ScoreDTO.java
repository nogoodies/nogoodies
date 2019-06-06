package com.sonarsource.service.dto;

import java.math.BigDecimal;

public class ScoreDTO {

    private String confName;
    private Long goodiesNotTaken;
    private Long co2Saved;
    private Double amountEuroGiven;
    private String charityOrganization;


    public ScoreDTO(){

    }

    public String getConfName() {
        return confName;
    }

    public void setConfName(String confName) {
        this.confName = confName;
    }

    public Long getGoodiesNotTaken() {
        return goodiesNotTaken;
    }

    public void setGoodiesNotTaken(Long goodiesNotTaken) {
        this.goodiesNotTaken = goodiesNotTaken;
    }

    public Long getCo2Saved() {
        return co2Saved;
    }

    public void setCo2Saved(Long co2Saved) {
        this.co2Saved = co2Saved;
    }

    public Double getAmountEuroGiven() {
        return amountEuroGiven;
    }

    public void setAmountEuroGiven(Double amountEuroGiven) {
        this.amountEuroGiven = amountEuroGiven;
    }

    public String getCharityOrganization() {
        return charityOrganization;
    }

    public void setCharityOrganization(String charityOrganization) {
        this.charityOrganization = charityOrganization;
    }

    @Override
    public String toString() {
        return "ScoreDTO{" +
            "confName='" + confName + '\'' +
            ", goodiesNotTaken=" + goodiesNotTaken +
            ", co2Saved=" + co2Saved +
            ", amountEuroGiven=" + amountEuroGiven +
            ", charityOrganization='" + charityOrganization + '\'' +
            '}';
    }
}
