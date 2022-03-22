import React from 'react'

// foodboot
const Users = React.lazy(() => import('./views/users/Users'))

const Clients = React.lazy(() => import('./views/clients/Clients'))
const CreateClient = React.lazy(() => import('./views/clients/clients/Create-Client'))
const EditClient = React.lazy(() => import('./views/clients/clients/Edit-Client'))
const ViewClient = React.lazy(() => import('./views/clients/clients/View-Client'))

const Profile = React.lazy(() => import('./views/profile/Profile'))
const EditProfile = React.lazy(() => import('./views/profile/Edit-Profile'))

const MealPlans = React.lazy(() => import('./views/meal-plans/Meal-Plans'))
const UpdateMealPlan = React.lazy(() => import('./views/meal-plans/meal-plans/Update-Meal-Plan'))
const ViewMealPlan = React.lazy(() => import('./views/meal-plans/meal-plans/View-Meal-Plan'))

const NutritionFacts = React.lazy(() => import('./views/nutrition-facts/Nutrition-Facts'))

const Analytics = React.lazy(() => import('./views/analytics/Analytics'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const LoadCalendar = React.lazy(() => import('./views/calendar/Load-Calendar'))
const PersonalCalendar = React.lazy(() => import('./views/calendar/Personal-Calendar'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/users', name: 'Users', component: Users },

  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/edit-profile', name: 'Edit Profile', component: EditProfile },


  { path: '/clients', name: 'Clients', component: Clients, exact: true },
  { path: '/clients/create-client', name: 'Create Client', component: CreateClient },
  { path: '/clients/edit-client', name: 'Edit Client', component: EditClient },
  { path: '/clients/view-client', name: 'View Client', component: ViewClient },

  { path: '/meal-plans', name: 'Meal Plans', component: MealPlans, exact: true },
  { path: '/meal-plans/update-meal-plan', name: 'Update Meal Plan', component: UpdateMealPlan },
  { path: '/meal-plans/view-meal-plan', name: 'View Meal Plan', component: ViewMealPlan },

  { path: '/nutrition-facts', name: 'Nutrition Facts', component: NutritionFacts },
  { path: '/analytics', name: 'Analytics', component: Analytics },


  { path: '/calendar', name: 'Calendar', component: LoadCalendar },
  { path: '/personal-calendar', name: 'Calendar', component: PersonalCalendar },
]

export default routes
