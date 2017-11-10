var TopBar = {
  template: `
    <div class="top-bar" @click="toggleBar">
      <span class="top-bar__title">Im the top bar</span>
      <div class="top-bar__actions" v-show="!isMinimized">
        <i class="material-icons top-bar__toggle-icon">keyboard_arrow_up</i>
        <i class="material-icons top-bar__clear-icon" @click.stop="minimizeBar">clear</i>
      </div>
    </div>
  `,
  props: {
    isMinimized: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleBar () {
      if (!this.isMinimized) {
        this.$emit('toggle')
      } else {
        this.$emit('maximize')
      }
    },
    minimizeBar () {
      this.$emit('minimize')
    }
  }
}

var AppWidget = {
  components: {
    'top-bar': TopBar
  },
   template: `
    <div class="widget-wrapper" :class="classObject">
      <top-bar 
        @toggle="toggleWidget" 
        @minimize="minimizeBar" 
        @maximize="maximizeBar"
        :isMinimized="isMinimized"/>
      <h1>Hello</h1>
    </div>
   `,
   data () {
     return {
       active: false,
       isMinimized: false
     }
   },
   computed: {
    classObject () {
      return {
        active: this.active,
        minimized: this.isMinimized
      }
    }
   },
   methods: {
    toggleWidget () {
      this.active = !this.active
    },
    minimizeBar () {
      this.isMinimized = true
    },
    maximizeBar () {
      this.isMinimized = false
    }
   }
}



var vm = new Vue({
  el: '#app',
  components: {
    'app-widget': AppWidget
  }
})