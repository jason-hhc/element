function broadcast(componentName, eventName, params) {
  if(this.$children){
    for(var i =0;i<this.$children.length;i++){
      var name = child.$options.componentName;
      if (name === componentName) {
        this.$children[i].$emit.apply(this.$children[i], [eventName].concat(params));
      } else {
        broadcast.apply(this.$children[i], [componentName, eventName].concat([params]));
      }
    }
  }
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
