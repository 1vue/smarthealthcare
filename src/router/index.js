import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import login from '@/components/login.vue'

import patienthome from '@/components/patient/patienthome.vue'
import docterhome from '@/components/docter/docterhome.vue'
import managerhome from '@/components/manager/managerhome.vue'



import patientWelcome from '@/components/patient/patientWelcome.vue'
import basedata from '@/components/patient/basedata.vue'
import findHistory from '@/components/patient/findHistory.vue'
import findDocters from '@/components/patient/findDocters.vue'
import checkReservation from '@/components/patient/checkReservation.vue'
import codesettings from '@/components/patient/codesettings'



import docterWelcome from '@/components/docter/docterWelcome.vue'
import docterBaseData from '@/components/docter/docterBaseData.vue'
import searchRecord from '@/components/docter/searchRecord.vue'
import docterCode from '@/components/docter/docterCode.vue'
import reservationDeal from '@/components/docter/reservationDeal.vue'

import getPatientData from '@/components/manager/getPatientData.vue'
import getDocterData from '@/components/manager/getDocterData.vue'
import getAllRecord from '@/components/manager/getAllRecord.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',

  },
  { path: '/login', component: login },

  {
    path: '/patienthome', component: patienthome,
    redirect: '/basedata',
    children: [

      { path: '/patientWelcome', component: patientWelcome },

      { path: '/basedata', component: basedata },
      { path: '/findHistory', component: findHistory },
      { path: '/findDocters', component: findDocters },
      { path: '/checkReservation', component: checkReservation },
      { path: '/codesettings', component: codesettings },
    ]

  },

  {
    path: '/docterhome', component: docterhome,
    redirect: '/docterBaseData',

    children: [
      { path: '/docterWelcome', component: docterWelcome },
      { path: '/docterBaseData', component: docterBaseData },
      { path: '/searchRecord', component: searchRecord },
      { path: '/docterCode', component: docterCode },
      { path: '/reservationDeal', component: reservationDeal },
    ]



  },
  {

    path: '/managerhome', component: managerhome,
    redirect: '/getPatientData',
    children: [


      { path: '/getPatientData', component: getPatientData },
      { path: '/getDocterData', component: getDocterData },
      { path: '/getAllRecord', component: getAllRecord },


    ]



  }



]

const router = new VueRouter({

  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login')
    next()
  const tokenvalue = window.sessionStorage.getItem('token')
  if (!tokenvalue)
    return next('/login')
  next()
})

export default router
