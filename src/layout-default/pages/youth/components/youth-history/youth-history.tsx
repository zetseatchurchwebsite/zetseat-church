import React from 'react'
import AnotherSection from '../../../../components/another-section/another-section'
type AboutHistoryProps = {
  title: string
  description: string
}

const YouthHistory: React.FC<AboutHistoryProps> = ({ title, description }) => {
  return <AnotherSection align="left" title={title} description={description} />
}

export default YouthHistory
