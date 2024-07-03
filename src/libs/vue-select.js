import Vue from 'vue'
import vSelect from 'vue-select'

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
  Deselect: {
    render: h => h('iconify', { props: { size: '14', icon: 'tabler:trash-x' } }),
  },
  OpenIndicator: {
    render: h => h('iconify', { props: { size: '15', icon: 'tabler:circle-chevron-down' }, class: 'open-indicator' }),
  },
})

Vue.component(vSelect)
