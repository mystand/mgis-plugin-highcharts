import Dashboard from '../components/dashboard/Dashboard'

export default {
  name: 'Справка',
  options: [],
  connects: {
    components: [
      { component: Dashboard, position: 'clientMenu' },
    ]
  }
}