import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import SetupLuna from '@/views/SetupLuna.vue'
import StartGame from '@/views/StartGame.vue'
import TurnPlayer from '@/views/TurnPlayer.vue'
import TurnBot from '@/views/TurnBot.vue'
import EndOfRound from '@/views/EndOfRound.vue'
import EndOfGame from '@/views/EndOfGame.vue'
import StandaloneScoring from '@/views/StandaloneScoring.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/setupLuna',
    name: 'SetupLuna',
    component: SetupLuna
  },
  {
    path: '/startGame',
    name: 'StartGame',
    component: StartGame
  },
  {
    path: '/round/:round/turn/:turn/player/:player',
    name: 'TurnPlayer',
    component: TurnPlayer
  },
  {
    path: '/round/:round/turn/:turn/bot/:bot',
    name: 'TurnBot',
    component: TurnBot
  },
  {
    path: '/round/:round/end',
    name: 'EndOfRound',
    component: EndOfRound
  },
  {
    path: '/endOfGame',
    name: 'EndOfGame',
    component: EndOfGame
  },
  {
    path: '/scoring',
    name: 'StandaloneScoring',
    component: StandaloneScoring
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')