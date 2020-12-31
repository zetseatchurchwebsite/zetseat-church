import CMS from 'netlify-cms-app'

import './cms-preview.css'

import { YouTubeControl, YouTubePreview } from './widgets/youtube'

CMS.registerWidget('youtube', YouTubeControl, YouTubePreview)
