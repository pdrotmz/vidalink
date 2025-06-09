package com.vidalink.dto.profile;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public record UserProfileMultipartDTO(
        @JsonProperty("username") String username,
        @JsonProperty("email") String email
) {
    @JsonCreator
    public UserProfileMultipartDTO {}
}