/* eslint-disable */

import React from 'react'
import { parse } from 'rss-to-json'

export class AnchorControl extends React.Component {
  handleChange = (e) => {
    const url = e.target.value

    this.props.onChange(JSON.stringify({ url, mp3: '' }))

    parse('https://anchor.fm/s/690cdca8/podcast/rss')
      .then(({ items }) => {
        const episode = items.find(
          (item) =>
            item.link === url &&
            item.enclosures.length &&
            item.enclosures[0].url
        )
        if (episode) {
          this.props.onChange(
            JSON.stringify({ url, mp3: episode.enclosures[0].url })
          )
        } else {
          this.props.onChange(JSON.stringify({ url, mp3: '' }))
        }
      })
      .catch((e) => {
        console.error(e)
        this.props.onChange(JSON.stringify({ url, mp3: '' }))
      })
  }

  render() {
    const value = JSON.parse(
      this.props.value || JSON.stringify({ url: '', mp3: '' })
    )

    return (
      <>
        <input
          id={this.props.forId}
          className={this.props.classNameWrapper}
          value={value.url}
          onChange={this.handleChange}
          type="url"
        />

        <AnchorPreview value={JSON.stringify(value)} />
      </>
    )
  }
}

export function AnchorPreview(props) {
  const value = JSON.parse(props.value || JSON.stringify({ url: '', mp3: '' }))

  return !value.mp3 ? (
    <div style={{ padding: '1rem' }}>
      Episode not found. Please update the Anchor.fm link.
    </div>
  ) : (
    <div style={{ padding: '1rem' }}>
      <audio controls src={value.mp3}>
        Your browser does not support the <code>audio</code> element.
      </audio>
    </div>
  )
}
