import React from 'react'

export class YouTubeControl extends React.Component {
  state = {
    abortController: null,
  }

  handleChange = (e) => {
    const value = JSON.parse(
      this.props.value || JSON.stringify({ snippet: {} })
    )

    const id = encodeURI(decodeURI(e.target.value))
      .replace(/^https:\/\/www\.youtube\.com\/watch\?v=/i, '')
      .replace(/^https:\/\/youtu\.be\//i, '')
      .split('&')[0]
      .split('?')[0]

    this.props.onChange(
      JSON.stringify({
        id,
        url: `https://youtu.be/${id}`,
        snippet: {},
        embed: `<iframe width="100%" height="420" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
      })
    )

    if (this.state.abortController) this.state.abortController.abort()
    const abortController = new AbortController()
    this.setState({ abortController })

    const apiKey = this.props.field.get(
      'apiKey',
      process.env.GATSBY_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY || ''
    )
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&maxResults=1&key=${apiKey}`,
      { signal: abortController.signal }
    )
      .then((response) => response.json())
      .then(({ errors, items }) => {
        if (errors || !items || !items.length) return

        const value = JSON.parse(
          this.props.value || JSON.stringify({ snippet: {} })
        )

        this.props.onChange(
          JSON.stringify({
            ...value,
            snippet: items[0].snippet,
          })
        )
      })
      .catch((e) => {
        console.error(e)
        this.props.onChange(JSON.stringify({ ...value, snippet: {} }))
      })
  }

  render() {
    const value = JSON.parse(
      this.props.value || JSON.stringify({ snippet: {} })
    )

    return (
      <input
        id={this.props.forId}
        className={this.props.classNameWrapper}
        value={value.id}
        onChange={this.handleChange}
      />
    )
  }
}

export function YouTubePreview(props) {
  const value = JSON.parse(props.value || JSON.stringify({ snippet: {} }))

  return !value.snippet.title ? null : (
    <div>
      <h3 style={{ margin: 0 }}>{value.snippet.title}</h3>
      <h5 style={{ opacity: 0.42, padding: 0, margin: '0 0 1rem 0' }}>
        Published at {new Date(value.snippet.publishedAt).toLocaleString()}
      </h5>
      <div dangerouslySetInnerHTML={{ __html: value.embed }} />
      <pre style={{ paddingTop: `1rem`, opacity: 0.7 }}>
        {value.snippet.description}
      </pre>
    </div>
  )
}
