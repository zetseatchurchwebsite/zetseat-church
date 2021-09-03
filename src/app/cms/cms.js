import CMS from 'netlify-cms-app'

import './cms-preview.css'

import { YouTubeControl, YouTubePreview } from './widgets/youtube'
import { AnchorControl, AnchorPreview } from './widgets/anchor'

CMS.registerWidget('youtube', YouTubeControl, YouTubePreview)
CMS.registerWidget('anchor', AnchorControl, AnchorPreview)
