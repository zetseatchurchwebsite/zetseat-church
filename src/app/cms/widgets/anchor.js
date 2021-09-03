import React from 'react'
const { parse } = require('rss-to-json')

export class AnchorControl extends React.Component {
  state = {
    rssData: null,
    abortController: null,
  }

  async handlechange(e) {
    const rss = 'https://anchor.fm/s/690cdca8/podcast/rss'
    await parse(rss).then((res) => {
      this.state.rssData = res
    })

    this.state.rssData.items.map((data, key) => {
      if (data.link === this.props.value) {
        this.props.onChange(
          JSON.stringify({
            title: data.title,
            description: data.description,
            link: data.link,
            author: data.author,
            url: data.enclosures.url,
          })
        )
      }
    })
    if (this.state.abortController) this.state.abortController.abort()
    const abortController = new AbortController()
    this.setState({ abortController })
  }
  render() {
    return <input value={value} onChange={this.handlechange} />
  }
}
export function AnchorPreview(props) {
  const value = JSON.parse(props.value)
  return !value ? null : (
    <div>
      <h3 style={{ margin: 0 }}>Zetseat Podcast Episode Anchor Link</h3>
      <h5 style={{ opacity: 0.62, padding: 0, margin: '0 0 1rem 0' }}>
        {value}
      </h5>
    </div>
  )
}
