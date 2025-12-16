import React from 'react'
import { Link } from 'react-router-dom'
import { getFullDay } from '../common/date'

const AboutUser = ({ className, bio, social_links, joinedAt }) => {
  return (
    <div className={"md:w-[90%] md:mt-7 " + className}>

      <p className='text-xl leading-7'>{bio.length ? bio : "No bio available."}</p>

      <div className='flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-dark-grey'>
        {
          Object.keys(social_links).map((key, i) => {
            let link = social_links[key]
            return (
              link ? <Link key={i} to={link}
                target="_blank"><i className={"ri-" + (key != 'website' ? key + "-fill" : "-global-line") + " text-xl"}></i>
              </Link> : " "
            )
          })
        }
      </div>
      <p className='text-dark-grey text-xl leading-7'>Joined on {getFullDay(joinedAt)}</p>

    </div>
  )
}

export default AboutUser
