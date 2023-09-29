import { URL_CATEGORIES } from "@/commons/constants/apiUrl";
import useFetchList from "@/commons/hooks/useFetchList";
import SectionHeader from "@/components/commons/SectionHeader/SectionHeader";
import React, { useRef } from "react";
import {
  SectionContainer,
  StyledSlider,
  EventPublisher,
  EventDate,
  EventItem,
  EventContainer,
  EventName,
  EventDetail,
  EventDescription,
  EventBanner,
  SkeletonEventPublisher,
  SkeletonEventDate,
  SkeletonEventDescription,
  SkeletonEventName,
  SkeletonEventBanner,
} from "./styles";

const perPage = 6;

const UpcomingEvents = () => {
  const { data, loading } = useFetchList<UpcomingEvent>(URL_CATEGORIES, { perPage });
  const drag = useRef<boolean>(false);

  return (
    <SectionContainer>
      <SectionHeader>Upcoming Events</SectionHeader>
      {loading ? (
        <EventItem>
          <EventContainer>
            <SkeletonEventName variant="rectangular" />
            <SkeletonEventDescription variant="rectangular" />
            <EventDetail>
              <SkeletonEventPublisher variant="rectangular" />
              <SkeletonEventDate variant="rectangular" />
            </EventDetail>
          </EventContainer>
          <SkeletonEventBanner variant="rectangular" />
        </EventItem>
      ) : (
        <StyledSlider
          dots
          arrows
          autoplay={true}
          infinite={true}
          draggable={true}
          slidesToShow={1}
          beforeChange={() => (drag.current = true)}
          afterChange={() => (drag.current = false)}
        >
          {(getDataFake() || data).map(event => {
            return (
              <EventItem key={event.name}>
                <EventContainer>
                  <EventName>{event.name}</EventName>
                  <EventDescription>{event.description}</EventDescription>
                  <EventDetail>
                    <EventPublisher>{event.publisher}</EventPublisher>
                    <EventDate>{event.date}</EventDate>
                  </EventDetail>
                </EventContainer>
                <EventBanner src={event.cover} />
              </EventItem>
            );
          })}
        </StyledSlider>
      )}
    </SectionContainer>
  );
};

export default UpcomingEvents;

const getDataFake = (): UpcomingEvent[] => {
  const fakeUpcomingEvent: UpcomingEvent = {
    cover: "cover",
    name: "Name",
    description: "Discription",
    publisher: "Publisher",
    date: "Date",
  };
  return new Array(perPage)
    .fill(fakeUpcomingEvent)
    .map((item, index) => ({ ...item, id: item.id + 1, name: item.name + " " + (index + 1) }));
};
