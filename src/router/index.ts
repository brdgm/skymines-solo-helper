import { RouteRecordRaw } from 'vue-router'
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
import createRouter from "brdgm-commons/src/util/router/createRouter"

const LOCALSTORAGE_KEY = process.env.VUE_APP_LOCALSTORAGE_KEY_PREFIX + "route"

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

export default createRouter(routes, LOCALSTORAGE_KEY, 'AppHome')