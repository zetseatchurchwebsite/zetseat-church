import React from 'react'
import { Block } from 'gerami'
import { FaClock, FaLocationArrow } from 'react-icons/fa'
import moment from 'moment'

import './event-card.scss'
import Anchor from '../../../shared/components/anchor/anchor'

type EventCardProps = {
  slug: string
  title: string
  happensOn: string
  location: string
  excerpt?: string | null
}

const EventCard: React.FC<EventCardProps> = ({
  slug,
  title,
  happensOn,
  location,
  excerpt,
}) => {
  return (
    <Anchor to={slug} className="event-card">
      <Block className="event-card-block">
        <h5>
          <div>{title}</div>
          <div className="subtitle font-M padding-top-normal">
            <small className="inline-block padding-right-normal">
              <small>
                <FaClock />
              </small>
            </small>
            {moment(new Date(happensOn)).format('MMMM D, YYYY')}

            <br />

            <small className="inline-block padding-right-normal">
              <small>
                <FaLocationArrow />
              </small>
            </small>
            {location}
          </div>
        </h5>
        <div className="subtitle padding-bottom-big">{excerpt}</div>
      </Block>
    </Anchor>
  )
}

export default EventCard
