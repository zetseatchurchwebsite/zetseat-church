import React, { useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { changeLocale } from 'gatsby-plugin-intl'
import { useLocalStorage } from 'react-use-storage'
import GatsbyImage from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'

import './language-preference.scss'

const LanguagePreference = () => {
  const [language, setLanguage] = useLocalStorage('language', 'en')

  useEffect(() => {
    const url = typeof window !== 'undefined' ? window.location.pathname : null

    setLanguage(url?.split('/')[1] || 'en')
  }, [])

  const data = useStaticQuery(graphql`
    query {
      ethiopia: file(relativePath: { eq: "images/flag/ethiopia.png" }) {
        childImageSharp {
          # Specify a fluid image and fragment
          # The default maxWidth is 800 pixels
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      usa: file(relativePath: { eq: "images/flag/united-states.png" }) {
        childImageSharp {
          # Specify a fluid image and fragment
          # The default maxWidth is 800 pixels
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  // const [lang, setlang] = useState(false);

  const changeLanguage = (lang: string) => {
    changeLocale(lang)
    // console.log(language)
  }

  return (
    <div className="language_switcher">
      <div className={'default-lang'}>
        <Flag
          data={
            language === 'en'
              ? data.usa.childImageSharp.fluid
              : data.ethiopia.childImageSharp.fluid
          }
        />
        <div className={'lang-code fg-blackish font-S'}>
          {language.toLocaleUpperCase() === 'AM' ? 'AM' : 'EN'}
        </div>
        <FontAwesomeIcon
          className={'option-arrow fg-blackish'}
          icon={faSortDown}
        />
      </div>
      <div className={'lang-preference-box'}>
        <div
          title={'Amharic'}
          className={'options margin-top-normal'}
          onClick={() => changeLanguage('am')}
        >
          <Flag data={data.ethiopia.childImageSharp.fluid} />
          <span className={'lang-code fg-blackish font-S'}>AM</span>
        </div>
        <div
          title={'English'}
          className={'options margin-top-normal'}
          onClick={() => changeLanguage('en')}
        >
          <Flag data={data.usa.childImageSharp.fluid} />
          <span className={'lang-code fg-blackish font-S'}>EN</span>
        </div>
      </div>
    </div>
  )
}

export default LanguagePreference

function Flag({ data }: { data: any }) {
  return (
    <div className={'lang-flag flag-right '}>
      <GatsbyImage fluid={data} />
    </div>
  )
}
